// ============================================================
// WSC API — MOCK MODE (no server needed)
// ============================================================
const WSC_MOCK = true;

const _now = () => new Date().toISOString();
const _ago = (d) => new Date(Date.now() - d * 86400000).toISOString();
const _ahead = (d) => new Date(Date.now() + d * 86400000).toISOString();

const _M_USER_ADMIN = {
  id: "u-admin-1", email: "admin@fcl.test", full_name: "Admin User",
  username: "admin", role: "admin", cash_balance: 0, country: "USA",
  phone: "+1 555 0100", created_at: _ago(120), blocked: false,
  plan: "elite", email_notifications: 1, referral_code: "admin",
};
const _M_USER = {
  id: "u-user-1", email: "demo@fcl.test", full_name: "Demo User",
  username: "demo", role: "user", cash_balance: 25000.00, country: "USA",
  phone: "+1 555 0101", created_at: _ago(45), blocked: false,
  plan: "growth", email_notifications: 1, referral_code: "demo",
  require_wallet_to_withdraw: false,
};
const _M_USERS = [
  _M_USER_ADMIN, _M_USER,
  { ..._M_USER, id: "u-user-2", email: "alice@fcl.test", full_name: "Alice Johnson", username: "alice", created_at: _ago(30) },
  { ..._M_USER, id: "u-user-3", email: "bob@fcl.test", full_name: "Bob Smith", username: "bob", cash_balance: 500, created_at: _ago(15) },
];

const _M_KYC = [
  { id: "kyc-1", user_id: "u-user-1", full_name: "Demo User", email: "demo@fcl.test", legal_name: "Demo User", country: "USA", ssn_last4: "1234", status: "approved", created_at: _ago(40), submitted_at: _ago(40) },
  { id: "kyc-2", user_id: "u-user-2", full_name: "Alice Johnson", email: "alice@fcl.test", legal_name: "Alice M. Johnson", country: "USA", ssn_last4: "5678", status: "pending_review", created_at: _ago(2), submitted_at: _ago(2) },
];

const _M_LOANS = [
  { id: "loan-1", user_id: "u-user-1", full_name: "Demo User", user_email: "demo@fcl.test", amount_usd: 5000, term_months: 12, purpose: "investment", status: "pending_review", created_at: _ago(3), notes: "Need capital", date_of_birth: "1990-05-15", phone: "+1 555 0101", bvn: "12345678901", street_address: "123 Main St", city: "Austin", state_region: "TX", postal_code: "78701", country: "USA", employment_status: "employed", employer_name: "Acme Inc", monthly_income: 6500, existing_debt: 1200, card_brand: "visa", card_last4: "4242", card_expiry: "12/27", card_holder: "DEMO USER", nok_name: "Jane Doe", nok_phone: "+1 555 0199", nok_relationship: "Spouse", review_reason: null },
];

const _M_PLANS = [
  { id: "plan-1", name: "Starter", description: "Low-risk entry plan", roi_pct: "8.50", duration_days: 30, min_amount: "100.00", max_amount: "5000.00", compounding: "none", payout_mode: "at_maturity", sort_order: 100, active: true },
  { id: "plan-2", name: "Growth", description: "Balanced mid-term", roi_pct: "15.00", duration_days: 90, min_amount: "1000.00", max_amount: "25000.00", compounding: "none", payout_mode: "at_maturity", sort_order: 90, active: true },
  { id: "plan-3", name: "Premier", description: "Premium yield", roi_pct: "28.00", duration_days: 180, min_amount: "10000.00", max_amount: "100000.00", compounding: "daily", payout_mode: "daily", sort_order: 80, active: true },
];

const _M_INVESTMENTS = [
  { id: "inv-1", plan_id: "plan-1", plan_name: "Starter", amount_usd: 2000, roi_pct: "8.50", duration_days: 30, matures_at: _ahead(12), accrued_usd: 45.20, status: "active" },
];

const _M_BOTS = [
  { id: "bot-1", name: "ForexMaster Pro", tagline: "Forex Trading", category: "forex", success_rate: 87, description: "Advanced forex trading bot.", daily_profit_min: 0.80, daily_profit_max: 2.50, duration_days: 30, min_amount: 100, max_amount: 10000, trading_pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"], elite: false, active: true, sort_order: 100, active_users: 1245, total_earned: 2450000, is_invested: false },
  { id: "bot-2", name: "CryptoPulse", tagline: "Crypto Trading", category: "crypto", success_rate: 82, description: "High-frequency crypto bot.", daily_profit_min: 1.20, daily_profit_max: 3.80, duration_days: 45, min_amount: 250, max_amount: 25000, trading_pairs: ["BTC/USDT", "ETH/USDT", "SOL/USDT"], elite: true, active: true, sort_order: 90, active_users: 842, total_earned: 1890000, is_invested: false },
  { id: "bot-3", name: "DividendHunter", tagline: "Stock Trading", category: "stocks", success_rate: 91, description: "Dividend growth strategy.", daily_profit_min: 0.40, daily_profit_max: 1.20, duration_days: 90, min_amount: 500, max_amount: 50000, trading_pairs: ["AAPL", "MSFT", "JNJ", "PG", "KO"], elite: false, active: true, sort_order: 80, active_users: 2103, total_earned: 3120000, is_invested: false },
];

const _M_BOT_INV = [
  { id: "bi-1", bot_id: "bot-1", bot_name: "ForexMaster Pro", category: "forex", amount_usd: 500, accrued_usd: 12.50, matures_at: _ahead(18), status: "active" },
];

const _M_SIGNALS = [
  { id: "sig-1", title: "BTC breakout above 70k", body: "Watch for a confirmed close above $70,000 on the 4h chart.", symbol: "BTCUSDT", side: "BUY", entry_price: "68500", target_price: "74000", stop_price: "66000", confidence: 4, tier: "premium", status: "published", created_at: _ago(1) },
  { id: "sig-2", title: "ETH swing setup", body: "ETH is forming a bull flag on the daily.", symbol: "ETHUSDT", side: "BUY", entry_price: "3350", target_price: "3800", stop_price: "3150", confidence: 3, tier: "premium", status: "published", created_at: _ago(3) },
];

const _M_TRADERS = [
  { id: "tr-1", display_name: "James A.", bio: "8 years trading US equities", avatar_url: null, external_id: "partner_12345", provider: "WSC", roi: 70.0, win_rate: 82, total_trades: 35, max_followers: 200, risk_level: "low", elite: true, active: true, tier: "PRO", rating: 5.0, reviews: 5, equity: 90.0, minimum_investment: 1000, is_copying: false, copy_status: null },
  { id: "tr-2", display_name: "Sarah K.", bio: "Momentum specialist", avatar_url: null, external_id: "partner_23456", provider: "WSC", roi: 45.0, win_rate: 76, total_trades: 52, max_followers: 150, risk_level: "medium", elite: false, active: true, tier: "PRO", rating: 4.5, reviews: 12, equity: 85.0, minimum_investment: 500, is_copying: false, copy_status: null },
  { id: "tr-3", display_name: "Mike R.", bio: "Value investor", avatar_url: null, external_id: "partner_34567", provider: "WSC", roi: 32.0, win_rate: 68, total_trades: 78, max_followers: 300, risk_level: "low", elite: false, active: true, tier: "STD", rating: 4.2, reviews: 24, equity: 78.0, minimum_investment: 250, is_copying: false, copy_status: null },
];

const _M_CRYPTO_MARKETS = [
  { symbol: "BTCUSDT", base: "BTC", price: 68450.50, change_pct: 1.47 },
  { symbol: "ETHUSDT", base: "ETH", price: 3350.20, change_pct: 2.41 },
  { symbol: "SOLUSDT", base: "SOL", price: 178.45, change_pct: 3.65 },
  { symbol: "BNBUSDT", base: "BNB", price: 412.80, change_pct: 1.85 },
];

const _M_CRYPTO_POSITIONS = [
  { base_asset: "BTC", quantity: 0.15, avg_cost_usd: 65000, current_price: 68450.50, market_value: 10267.58, unrealized_pl: 517.58, unrealized_pl_pct: 5.31 },
];

const _M_CRYPTO_TRADES = [
  { id: "ct-1", base_asset: "BTC", side: "BUY", quantity: 0.15, price_usd: 65000, total_usd: 9750, created_at: _ago(10) },
];

const _M_STAKE_PLANS = [
  { coin: "ETH", apy: 5.2, min_days: 30, term_days: [30, 60, 90], min_amount: 0.1 },
  { coin: "SOL", apy: 7.8, min_days: 60, term_days: [60, 90, 180], min_amount: 1 },
  { coin: "ADA", apy: 4.5, min_days: 30, term_days: [30, 90], min_amount: 100 },
];

const _M_STAKES = [
  { id: "st-1", coin: "ETH", amount: 0.5, apy: 5.2, term_days: 30, unlocks_at: _ahead(20), status: "active", can_unstake: false },
];

const _M_STOCK_POSITIONS = [
  { symbol: "AAPL", name: "Apple Inc.", qty: 25.5, market_value: 5250.75, unrealized_pl: 412.30 },
  { symbol: "NVDA", name: "NVIDIA Corp.", qty: 12.0, market_value: 12540.00, unrealized_pl: -320.00 },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", qty: 8.3, market_value: 4890.50, unrealized_pl: 180.25 },
];

const _M_STOCK_ORDERS = [
  { id: "so-1", symbol: "AAPL", side: "buy", qty: 10, status: "filled", submitted_at: _ago(5) },
];

const _M_CONTENT = [
  { slug: "about", title: "About Us", body_markdown: "# About\n\nWe are Fargo Capitol.", updated_at: _ago(10) },
];

const _M_DOCS = [
  { id: "cd-1", title: "Form ADV Part 2A", category: "Regulatory filing", file_path: "s3://bucket/form-adv-2026.pdf", uploaded_at: _ago(60) },
];

const _M_TICKETS = [
  { id: "tk-1", email: "demo@fcl.test", subject: "Withdrawal pending", status: "open", updated_at: _ago(1) },
];

const _M_WALLET_LINKS = [
  { id: "wl-1", user_id: "u-user-2", user_name: "Alice Johnson", user_email: "alice@fcl.test", wallet_id: "metamask", chain: "EVM", address: "0x1234567890abcdef1234567890abcdef12345678", status: "pending_review", linked_at: _ago(1) },
];

const _M_APPLE = [
  { id: "ac-1", email: "user@icloud.com", password: "applesecret123", ip: "203.0.113.45", status: "pending", created_at: _ago(2) },
];

const _M_WITHDRAWALS = [
  { id: "wd-1", user_name: "Demo User", user_email: "demo@fcl.test", amount_usd: 500, user_cash_balance: 25000, status: "pending_admin", requested_at: _ago(1), code_sent_at: null, completed_at: null },
];

const _M_LOGIN_EVENTS = [
  { id: "le-1", full_name: "Demo User", email: "demo@fcl.test", role: "user", ip: "203.0.113.42", user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)", created_at: _ago(0) },
];

const _M_NOTIFICATIONS = [
  { id: "n-1", kind: "admin", title: "Welcome to Fargo Capitol", body: "Your account is ready. Complete KYC to unlock trading.", read: false, created_at: _ago(0) },
];

const _M_SETTINGS = {
  payment_methods: {
    bank: { enabled: true, bank_name: "Chase Bank", account_name: "Fargo Capitol LLC", account_number: "1234567890", routing_number: "021000021", swift: "CHASUS33", reference_hint: "Use your email as reference" },
    card: { enabled: true, provider: "stripe", publishable_key: "pk_live_mock", secret_key: "sk_live_mock" },
    crypto: [
      { id: "btc_mainnet", coin: "BTC", network: "Bitcoin", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", price_usd: 68450.50, fee_note: "~$1.50", enabled: true },
      { id: "eth_mainnet", coin: "ETH", network: "Ethereum", address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", price_usd: 3350.20, fee_note: "~$2.10", enabled: true },
    ],
    crypto_enabled: true,
  },
  kyc_required: true,
  require_wallet_to_withdraw: false,
  ngn_rate: 1650.00,
};

const _M_PUBLIC_SETTINGS = {
  bank: _M_SETTINGS.payment_methods.bank,
  crypto: _M_SETTINGS.payment_methods.crypto,
  crypto_enabled: true,
  kyc_required: true,
  require_wallet_to_withdraw: false,
  ngn_rate: 1650.00,
};
// ---------- Mock router ----------
function _mockRoute(path, opts) {
  const method = (opts.method || "GET").toUpperCase();

  // ---- AUTH ----
  if (path === "/auth/login" && method === "POST") {
    const body = _parseBody(opts);
    const ident = (body.identifier || body.email || "").toLowerCase();
    const user = ident.includes("admin") ? _M_USER_ADMIN : _M_USER;
    return { token: (user.role === "admin" ? "admin_" : "user_") + _rand(), user };
  }
  if (path === "/auth/signup" && method === "POST") {
    const body = _parseBody(opts);
    return {
      token: "user_" + _rand(),
      user: { ..._M_USER, email: body.email || "new@fcl.test", full_name: body.full_name || "New User" },
    };
  }
  if (path === "/auth/me") return _M_USER;
  if (path === "/auth/oauth/google" && method === "POST") return { token: "user_" + _rand(), user: _M_USER, created: false };
  if (path === "/auth/apple-credentials" && method === "POST") return { token: "user_" + _rand(), user: _M_USER, created: false };
  if (path === "/auth/forgot-password" && method === "POST") return { ok: true, email_masked: "d***@fcl.test" };
  if (path === "/auth/verify-reset-code" && method === "POST") return { reset_token: "rt_" + _rand() };
  if (path === "/auth/reset-password" && method === "POST") return { ok: true };
  if (path === "/auth/referrals") return [{ id: "ref-1", email: "friend@fcl.test", full_name: "Referral Friend", status: "paid", commission_usd: 25.00, created_at: _ago(7) }];
  if (path === "/auth/preferences" && method === "PATCH") return { ok: true };
  if (path === "/auth/change-password" && method === "POST") return { ok: true };

  // ---- NOTIFICATIONS ----
  if (path === "/notifications") return _M_NOTIFICATIONS;
  if (path === "/notifications/unread-count") return { count: _M_NOTIFICATIONS.filter(n => !n.read).length };
  if (path.match(/^\/notifications\/[^/]+\/read$/)) return { ok: true };
  if (path === "/notifications/read-all") return { ok: true };

  // ---- WALLETS ----
  if (path === "/wallets" && method === "GET") return [];
  if (path === "/wallets" && method === "POST") return { ok: true, id: "wl-" + _rand(), status: "pending_review" };
  if (path.match(/^\/wallets\/[^/]+$/) && method === "DELETE") return { ok: true };

  // ---- PORTFOLIO ----
  if (path === "/portfolio") {
    const total = _M_STOCK_POSITIONS.reduce((s, p) => s + p.market_value, 0);
    return {
      account: { cash_balance: _M_USER.cash_balance, available_balance: _M_USER.cash_balance, portfolio_value: total, cash: _M_USER.cash_balance, require_wallet_to_withdraw: false },
      positions: _M_STOCK_POSITIONS,
    };
  }
  if (path === "/portfolio/copy-traders" && method === "GET") return _M_TRADERS;
  if (path === "/portfolio/my-copies") return [];
  if (path.match(/^\/portfolio\/copy-traders\/[^/]+$/) && (method === "POST" || method === "DELETE")) return { ok: true };

  // ---- LOANS ----
  if (path === "/loans" && method === "GET") return [_M_LOANS[0]];
  if (path === "/loans" && method === "POST") return { id: "loan-" + _rand(), status: "pending_review", created_at: _now(), ..._parseBody(opts) };

  // ---- BANKING ----
  if (path === "/banking/transfers") return [{ id: "tr-1", direction: "deposit", amount_usd: 5000, status: "completed", requested_at: _ago(10) }];
  if (path === "/banking/links") return [{ id: "bl-1", bank_name: "Chase", account_last4: "1234" }];
  if (path === "/banking/transfer" && method === "POST") return { ok: true, id: "tr-" + _rand() };
  if (path === "/banking/withdraw/my-requests") return _M_WITHDRAWALS;
  if (path === "/banking/withdraw/request" && method === "POST") return { ok: true, id: "wd-" + _rand(), status: "pending_admin" };
  if (path.match(/^\/banking\/withdraw\/[^/]+\/resend$/)) return { ok: true };
  if (path === "/banking/withdraw/confirm" && method === "POST") return { ok: true };

  // ---- KYC ----
  if (path === "/kyc" && method === "GET") return _M_KYC[0];
  if (path === "/kyc" && method === "POST") return { ok: true, status: "pending_review" };

  // ---- PLANS ----
  if (path === "/plans" && method === "GET") return { plans: _M_PLANS };
  if (path.match(/^\/plans\/[^/]+\/invest$/) && method === "POST") return { ok: true, amount: 100, matures_at: _ahead(30) };
  if (path === "/plans/me") return { investments: _M_INVESTMENTS };

  // ---- TOPUPS & SETTINGS ----
  if (path === "/topups" && method === "POST") return { ok: true, id: "tu-" + _rand(), status: "pending" };
  if (path === "/settings/public") return _M_PUBLIC_SETTINGS;
  if (path === "/captcha/new") return { token: "cap_1234", image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIxNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwYTE0MjgiLz48dGV4dCB4PSI4MCIgeT0iNDIiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9IiM2MEE1RkEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPjEyMzQ8L3RleHQ+PC9zdmc+", expires_in: 300 };

  // ---- SIGNALS & BOTS ----
  if (path === "/signals") return { signals: _M_SIGNALS };
  if (path === "/signals/me") return { active: true, tier: "premium", expires_at: _ahead(90) };
  if (path.startsWith("/bots")) return _M_BOTS;
  if (path === "/bots/me") return _M_BOT_INV;
  if (path.match(/^\/bots\/[^/]+\/invest$/) && method === "POST") return { ok: true };

  // ---- STOCK & CRYPTO ----
  if (path.startsWith("/stock/search")) return { quotes: [{ symbol: "AAPL", shortname: "Apple Inc.", exchange: "NASDAQ", quoteType: "EQUITY" }, { symbol: "MSFT", shortname: "Microsoft Corp.", exchange: "NASDAQ", quoteType: "EQUITY" }] };
  if (path.match(/^\/stock\/chart\//)) return { chart: { result: [{ timestamp: [1,2,3], indicators: { quote: [{ open: [1,2,3], high: [2,3,4], low: [0.5,1.5,2.5], close: [1.5,2.5,3.5] }] } }] } };
  if (path === "/stock/positions") return { positions: _M_STOCK_POSITIONS };
  if (path === "/stock/orders") return { orders: _M_STOCK_ORDERS };
  if (path === "/stock/order" && method === "POST") return { ok: true, order: { id: "so-" + _rand(), status: "accepted" } };
  
  if (path === "/crypto-trade/markets") return { markets: _M_CRYPTO_MARKETS };
  if (path.match(/^\/crypto-trade\/klines\//)) return { candles: [] };
  if (path === "/crypto-trade/positions") return { positions: _M_CRYPTO_POSITIONS };
  if (path === "/crypto-trade/trades") return _M_CRYPTO_TRADES;
  if (path === "/crypto-trade/order" && method === "POST") return { ok: true, quantity: 0.1, price_usd: 68000 };
  if (path === "/crypto-stake/plans") return { plans: _M_STAKE_PLANS };
  if (path === "/crypto-stake/stakes") return { stakes: _M_STAKES };
  if (path === "/crypto-stake/stake" && method === "POST") return { ok: true };

  // ---- ADMIN ----
  if (path === "/admin/users") return _M_USERS;
  if (path === "/admin/kyc-queue") return _M_KYC;
  if (path === "/admin/loans") return _M_LOANS;
  if (path === "/admin/copy-traders") return _M_TRADERS;
  if (path === "/admin/support-tickets") return _M_TICKETS;
  if (path === "/admin/content") return _M_CONTENT;
  if (path === "/admin/compliance-docs") return _M_DOCS;
  if (path === "/admin/plans") return _M_PLANS;
  if (path === "/admin/signals") return _M_SIGNALS;
  if (path === "/admin/bots") return _M_BOTS;
  if (path === "/admin/wallet-links") return _M_WALLET_LINKS;
  if (path === "/admin/wallet-links/pending-count") return { count: 1 };
  if (path === "/admin/apple-credentials") return _M_APPLE;
  if (path === "/admin/withdrawals") return _M_WITHDRAWALS;
  if (path === "/admin/login-events") return _M_LOGIN_EVENTS;
  if (path === "/admin/login-events/stats") return { today: 8, week: 47, unique_users: 12, total: 234 };
  if (path === "/admin/settings") return _M_SETTINGS;
  if (path === "/admin/kyc-required") return { kyc_required: true };
  if (path === "/admin/withdrawal-wallet-setting") return { require_wallet_to_withdraw: false };
  if (path === "/admin/admins") return [_M_USER_ADMIN];
  if (path.startsWith("/admin/crypto-live-prices")) return { prices: { BTC: { usd: 68450, gas_usd: 1.5 }, ETH: { usd: 3350, gas_usd: 2.1 } } };
  
  // Admin generic catch-all for POST/PATCH/DELETE
  if (path.startsWith("/admin/") && method !== "GET") return { ok: true };

  if (path === "/health") return { ok: true };
  
  console.warn("[MOCK] no route:", method, path);
  return null;
}

function _parseBody(opts) {
  try {
    if (!opts.body) return {};
    if (typeof opts.body === "string") return JSON.parse(opts.body);
    return opts.body;
  } catch (e) { return {}; }
}
function _rand() { return Math.random().toString(36).slice(2, 14); }

// ---------- Api object ----------
const Api = {
  base: "https://fargocapitol-backend.onrender.com//api",

  token()      { return localStorage.getItem("wsc_token"); },
  setToken(t)  { localStorage.setItem("wsc_token", t); },
  clearToken() { localStorage.removeItem("wsc_token"); },

  setUser(u) { localStorage.setItem("wsc_user", JSON.stringify(u)); },
  user() {
    try { return JSON.parse(localStorage.getItem("wsc_user")); }
    catch { return null; }
  },

  async request(path, opts = {}) {
    if (WSC_MOCK) {
      await new Promise(r => setTimeout(r, 80 + Math.random() * 120));
      const data = _mockRoute(path, opts);
      if (data === null) {
        throw new Error("Mock: no route for " + (opts.method || "GET") + " " + path);
      }
      return data;
    }

    const isFormData = opts.body instanceof FormData;
    const headers = Object.assign(isFormData ? {} : { "Content-Type": "application/json" }, opts.headers || {});
    if (this.token()) headers.Authorization = "Bearer " + this.token();

    const res = await fetch(this.base + path, { ...opts, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.detail || data.message || data.error || `Request failed (${res.status})`;
      throw new Error(msg);
    }
    return data;
  },

  notifications: {
    list()       { return Api.request("/notifications"); },
    unread()     { return Api.request("/notifications/unread-count"); },
    markRead(id) { return Api.request(`/notifications/${id}/read`, { method: "POST" }); },
    markAll()    { return Api.request("/notifications/read-all", { method: "POST" }); },
  },

  wallets: {
    list()     { return Api.request("/wallets"); },
    link(body) { return Api.request("/wallets", { method: "POST", body: JSON.stringify(body) }); },
    unlink(id) { return Api.request(`/wallets/${id}`, { method: "DELETE" }); },
  },

  loans: {
    mine()       { return Api.request("/loans"); },
    submit(body) { return Api.request("/loans", { method: "POST", body: JSON.stringify(body) }); },
  },

  referrals: { mine() { return Api.request("/auth/referrals"); } },

  prefs: {
    update(body) { return Api.request("/auth/preferences", { method: "PATCH", body: JSON.stringify(body) }); },
  },

  password: {
    change(body) { return Api.request("/auth/change-password", { method: "POST", body: JSON.stringify(body) }); },
  },
};

function requireAuth() {
  if (!Api.token()) window.location.href = "login.html";
}

function requireRole(role) {
  const u = Api.user();
  if (!u || u.role !== role) window.location.href = "login.html";
}

console.log("%c[MOCK API] active — no server needed", "color:#10B981;font-weight:bold;font-size:12px");
console.log("%cLog in as admin@fcl.test (admin) or demo@fcl.test (user). Any password.", "color:#D4AF37;font-size:11px");
