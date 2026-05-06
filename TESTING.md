# Testing the Plaid Integration

## Quick Start

### Option A: Mock Mode (Easiest - No Plaid Account Needed!) ⭐

```bash
cp .env.example .env
npm install
npm start
```

The `.env` defaults to `USE_MOCK_MODE=true` — just run it! No Plaid credentials required.

### Option B: Real Plaid Sandbox

1. Create free account at https://dashboard.plaid.com/
2. Get your `PLAID_CLIENT_ID` and `PLAID_SECRET`
3. Edit `.env`:
   ```
   USE_MOCK_MODE=false
   PLAID_CLIENT_ID=your_id
   PLAID_SECRET=your_secret
   PLAID_ENV=sandbox
   ```
4. Start: `npm install && npm start`

## Testing Methods

### Method 0: Mock Mode - No API Credentials Required ⭐

In mock mode, the web UI shows a simple dropdown to select test accounts:

1. Open `http://localhost:3000`
2. Click "Connect with Plaid"
3. Select a test account from the prompt:
   - `user_good` - Standard account (checking + savings)
   - `user_multi_account` - Multiple accounts (checking, savings, credit card)
4. Instantly see mock data for accounts, transactions, and routing numbers

**Mock Mode Benefits:**
- ✅ Zero setup - just `npm install && npm start`
- ✅ No Plaid account needed
- ✅ Instant testing
- ✅ Perfect for development and demos
- ✅ Same API endpoints as production

**To disable mock mode:**
```
USE_MOCK_MODE=false
```

---

### Method 1: Web UI (With Real Plaid API)

Open `http://localhost:3000` in your browser:

1. Click "Connect with Plaid"
2. Sign in with sandbox credentials:
   - **Username**: `user_good`
   - **Password**: `pass_good` (or any password)
   - **2FA**: `1234` (if prompted)
3. Select a test institution (e.g., Chase, Bank of America)
4. View your connected accounts and transactions

**Sandbox Test Institutions:**
- `chase` - Chase Bank
- `bofa` - Bank of America
- `wells` - Wells Fargo
- `citi` - Citibank

### Method 2: Postman (For API Testing)

**Import the collection:**
1. Open Postman: https://www.postman.com/download/
2. Go to File → Import
3. Select `postman-collection.json` from this repo
4. Set environment variables:
   - `base_url`: `http://localhost:3000`
   - `access_token`: (filled after exchange)
   - `public_token`: (filled after Link flow)

**Testing flow:**
1. Click "Create Link Token" to get a link token
2. Copy the `link_token` from the response
3. Visit `http://localhost:3000` and paste it or use the UI flow
4. After authenticating, copy the `public_token`
5. In Postman, paste it in the `public_token` variable
6. Click "Exchange Token" to get an `access_token`
7. Use the `access_token` with other endpoints:
   - Get Accounts
   - Get Transactions
   - Get Auth (Routing Numbers)

### Method 3: cURL (For Quick Testing)

```bash
# 1. Create link token
curl -X POST http://localhost:3000/create-link-token \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-123"}'

# 2. After using Plaid Link UI to get public_token, exchange it
curl -X POST http://localhost:3000/exchange-token \
  -H "Content-Type: application/json" \
  -d '{"public_token": "public-sandbox-...", "userId": "user-123"}'

# 3. Get accounts
curl -X POST http://localhost:3000/get-accounts \
  -H "Content-Type: application/json" \
  -d '{"access_token": "access-sandbox-..."}'

# 4. Get transactions
curl -X POST http://localhost:3000/get-transactions \
  -H "Content-Type: application/json" \
  -d '{"access_token": "access-sandbox-...", "start_date": "2024-01-01", "end_date": "2024-05-06"}'

# 5. Get auth info
curl -X POST http://localhost:3000/get-auth \
  -H "Content-Type: application/json" \
  -d '{"access_token": "access-sandbox-..."}'
```

## Test Scenarios

### Scenario 1: Multiple Accounts
- Username: `user_multi_account`
- Password: `pass_good`
- Result: Account with checking, savings, and credit card

### Scenario 2: No Transactions
- Username: `user_empty_transactions`
- Password: `pass_good`
- Result: Account with no transaction history

### Scenario 3: Custom Amount Testing
- Username: `user_custom_login`
- Password: `pass_good`
- Result: Allows custom mock transaction amounts

### Scenario 4: Error Cases
- Username: `user_error`
- Password: `pass_good`
- Result: Returns sample error responses

## Sandbox vs. Production

| Feature | Sandbox | Production |
|---------|---------|-----------|
| **Cost** | Free | Per transaction |
| **Real Data** | Mock data | Real bank data |
| **Setup** | Instant | Requires approval |
| **Testing** | Full | Limited (ethical testing only) |

- Sandbox is perfect for development and testing
- Use production only with real bank credentials and proper compliance

## Troubleshooting

**"Invalid Plaid credentials" error:**
- Check `.env` has correct `PLAID_CLIENT_ID` and `PLAID_SECRET`
- Verify `PLAID_ENV=sandbox`

**"Link token expired" error:**
- Link tokens expire after 1 hour
- Request a fresh one from `/create-link-token`

**CORS errors when calling from browser:**
- Ensure server is running on `http://localhost:3000`
- Check CORS middleware is enabled in `server.js`

**"Access token invalid or expired":**
- Access tokens typically last 30 days
- Exchange a new public token to get a fresh access token

## Next Steps

- Store tokens securely in a database
- Implement token refresh logic
- Set up webhooks for real-time updates
- Add error handling and retry logic
- Implement user authentication
