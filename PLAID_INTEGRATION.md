# Plaid API Integration

A quick Node.js/Express integration with the Plaid API for bank account authentication and financial data access.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your Plaid credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Plaid credentials:
- Get your `PLAID_CLIENT_ID` and `PLAID_SECRET` from https://dashboard.plaid.com/
- Set `PLAID_ENV` to `sandbox` (testing), `development`, or `production`

```
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox
PORT=3000
```

### 3. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

Server will run on `http://localhost:3000`

## API Endpoints

### POST /create-link-token
Creates a Plaid Link token for the frontend to use.

**Request:**
```json
{
  "userId": "user-123"
}
```

**Response:**
```json
{
  "link_token": "link-sandbox-...",
  "expiration": "2024-05-20T12:34:56Z"
}
```

### POST /exchange-token
Exchanges a public token from Plaid Link for an access token.

**Request:**
```json
{
  "public_token": "public-sandbox-...",
  "userId": "user-123"
}
```

**Response:**
```json
{
  "access_token": "access-sandbox-...",
  "item_id": "item-id"
}
```

### POST /get-accounts
Retrieves all linked accounts for an access token.

**Request:**
```json
{
  "access_token": "access-sandbox-..."
}
```

**Response:**
```json
{
  "accounts": [
    {
      "account_id": "account-id",
      "balances": {
        "available": 100.00,
        "current": 110.00
      },
      "mask": "0000",
      "name": "Checking Account",
      "official_name": "Premium Checking",
      "subtype": "checking",
      "type": "depository"
    }
  ],
  "institution": "chase"
}
```

### POST /get-transactions
Retrieves transactions for an access token within a date range.

**Request:**
```json
{
  "access_token": "access-sandbox-...",
  "start_date": "2024-01-01",
  "end_date": "2024-05-06"
}
```

**Response:**
```json
{
  "transactions": [...],
  "total_transactions": 25
}
```

### POST /get-auth
Retrieves bank account details (account and routing numbers).

**Request:**
```json
{
  "access_token": "access-sandbox-..."
}
```

**Response:**
```json
{
  "accounts": [...],
  "numbers": {
    "ach": [
      {
        "account": "1234567890",
        "routing": "021000021"
      }
    ],
    "eft": [...],
    "international_iban": [...]
  }
}
```

## Testing with Sandbox

Use Plaid's sandbox credentials to test without real bank accounts:

1. Use test usernames like `user_good`
2. Use any password
3. Use test institutions from Plaid docs

## Next Steps

- Add a frontend using Plaid Link SDK
- Store access tokens in a database
- Implement refresh token handling
- Add webhook support for real-time updates
- Implement error handling and logging
