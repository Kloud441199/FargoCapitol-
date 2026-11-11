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