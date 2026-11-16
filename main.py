from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, func, or_
from sqlalchemy.dialects.postgresql import INET
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timezone
from urllib.request import Request as URLRequest, urlopen
import ipaddress
import json
import os

# --- 1. SETUP DATABASE ---
# DATABASE_URL must be configured in the hosting provider's environment.
# Never keep database credentials in source code or provide a hardcoded fallback.
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is not set")

# Normalize PostgreSQL URLs for SQLAlchemy's psycopg 3 driver.
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)
elif DATABASE_URL.startswith("postgresql+psycopg://"):
    pass
else:
    raise RuntimeError("DATABASE_URL must use a PostgreSQL connection URL")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- 2. DATABASE MODELS ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, index=True)
    full_name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="user")
    balance = Column(Float, default=0.0)
    last_login_ip = Column(INET)
    last_login_city = Column(String)
    last_login_region = Column(String)
    last_login_country = Column(String)
    last_login_ip_latitude = Column(Float)
    last_login_ip_longitude = Column(Float)
    last_login_at = Column(DateTime(timezone=True))

Base.metadata.create_all(bind=engine)

# --- 3. SECURITY SETUP ---
SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET environment variable is not set")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)
def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# --- 4. FASTAPI APP & CORS ---
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 5. SCHEMAS ---
class UserSignup(BaseModel):
    email: str
    username: str
    password: str
    full_name: str

class UserLogin(BaseModel):
    identifier: str
    password: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 6. API ROUTES ---
@app.post("/api/auth/signup")
def signup(user: UserSignup, db: Session = Depends(get_db)):
    if len(user.password.encode("utf-8")) > 72:
        raise HTTPException(status_code=400, detail="Password must be 72 bytes or fewer")

    email = user.email.strip().lower()
    username = user.username.strip().lower()

    if not username or not username.replace("_", "").replace("-", "").isalnum():
        raise HTTPException(status_code=400, detail="Username may contain only letters, numbers, underscores, and hyphens")

    existing = db.query(User).filter(
        or_(func.lower(User.email) == email, func.lower(User.username) == username)
    ).first()
    if existing:
        if existing.email.lower() == email:
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=400, detail="Username already taken")

    new_user = User(
        email=email,
        username=username,
        full_name=user.full_name.strip(),
        hashed_password=get_password_hash(user.password),
        role="user"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = jwt.encode(
        {"sub": new_user.email, "role": new_user.role},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return {
        "token": token,
        "user": {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username,
            "full_name": new_user.full_name,
            "role": new_user.role,
            "cash_balance": new_user.balance
        }
    }

def get_login_ip(request: Request):
    # Uvicorn proxy-header handling supplies the client address behind Render.
    candidate = request.client.host if request.client else None
    try:
        parsed = ipaddress.ip_address(candidate) if candidate else None
        if not parsed or parsed.is_private or parsed.is_loopback or parsed.is_reserved:
            return None
        return parsed
    except ValueError:
        return None

def lookup_ip_location(ip):
    if not ip:
        return {}
    try:
        req = URLRequest(
            "https://ipapi.co/" + str(ip) + "/json/",
            headers={"User-Agent": "FargoCapitol/1.0"}
        )
        with urlopen(req, timeout=2.5) as response:
            data = json.loads(response.read().decode("utf-8"))
        if data.get("error"):
            return {}
        return {
            "city": data.get("city"),
            "region": data.get("region"),
            "country": data.get("country_name"),
            "latitude": data.get("latitude"),
            "longitude": data.get("longitude"),
        }
    except Exception:
        # Geolocation outages must never block a valid login.
        return {}

@app.post("/api/auth/login")
def login(user: UserLogin, request: Request, db: Session = Depends(get_db)):
    identifier = user.identifier.strip().lower()
    db_user = db.query(User).filter(
        or_(
            func.lower(User.email) == identifier,
            func.lower(User.username) == identifier
        )
    ).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email/username or password")

    login_ip = get_login_ip(request)
    location = lookup_ip_location(login_ip)
    db_user.last_login_ip = str(login_ip) if login_ip else None
    db_user.last_login_city = location.get("city")
    db_user.last_login_region = location.get("region")
    db_user.last_login_country = location.get("country")
    db_user.last_login_ip_latitude = location.get("latitude")
    db_user.last_login_ip_longitude = location.get("longitude")
    db_user.last_login_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_user)

    token = jwt.encode({"sub": db_user.email, "role": db_user.role}, SECRET_KEY, algorithm=ALGORITHM)

    return {
        "token": token,
        "user": {
            "id": db_user.id,
            "email": db_user.email,
            "username": db_user.username,
            "full_name": db_user.full_name,
            "role": db_user.role,
            "cash_balance": db_user.balance
        }
    }

# --- 7. SERVE FRONTEND FILES ---
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# 1. Serve the API routes first (they are already defined above this)

# 2. Serve the HTML files explicitly
@app.get("/")
@app.head("/")
def read_index():
    return FileResponse("index.html")

@app.get("/login.html")
@app.head("/login.html")
def read_login():
    return FileResponse("login.html")

@app.get("/signup.html")
@app.head("/signup.html")
def read_signup():
    return FileResponse("signup.html")

@app.get("/dashboard.html")
@app.head("/dashboard.html")
def read_dashboard():
    return FileResponse("dashboard.html")

@app.get("/faq.html")
@app.head("/faq.html")
def read_faq():
    return FileResponse("faq.html")

@app.get("/wsc-logo.png")
@app.head("/wsc-logo.png")
def read_logo():
    return FileResponse("wsc-logo.png")

# 3. Mount the CSS and JS folders
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/js", StaticFiles(directory="js"), name="js")
