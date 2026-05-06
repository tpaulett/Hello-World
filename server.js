const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const useMockMode = process.env.USE_MOCK_MODE === 'true';
let plaidClient;

if (!useMockMode) {
  const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
  const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET,
      },
    },
  });
  plaidClient = new PlaidApi(configuration);
}

const mockPlaid = require('./mock-plaid');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Store access tokens (in production, use a database)
const accessTokens = {};

// Create Link Token - used by Plaid Link UI
app.post('/create-link-token', async (req, res) => {
  try {
    const { userId } = req.body;

    if (useMockMode) {
      const result = await mockPlaid.createLinkToken(userId);
      return res.json(result);
    }

    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId || 'user-id' },
      client_name: 'Plaid Integration',
      language: 'en',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
    });

    res.json({
      link_token: response.data.link_token,
      expiration: response.data.expiration,
    });
  } catch (error) {
    console.error('Error creating link token:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Exchange public token for access token
app.post('/exchange-token', async (req, res) => {
  try {
    const { public_token, userId } = req.body;

    if (useMockMode) {
      const result = await mockPlaid.exchangeToken(public_token, userId);
      return res.json(result);
    }

    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Store the access token (in production, save to database)
    if (userId) {
      accessTokens[userId] = accessToken;
    }

    res.json({
      access_token: accessToken,
      item_id: itemId,
    });
  } catch (error) {
    console.error('Error exchanging token:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get accounts for a user
app.post('/get-accounts', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (useMockMode) {
      const result = await mockPlaid.getAccounts(access_token);
      return res.json({
        accounts: result.accounts,
        institution: result.item.institution_id,
      });
    }

    const response = await plaidClient.accountsGet({
      access_token,
    });

    res.json({
      accounts: response.data.accounts,
      institution: response.data.item.institution_id,
    });
  } catch (error) {
    console.error('Error getting accounts:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get transactions
app.post('/get-transactions', async (req, res) => {
  try {
    const { access_token, start_date, end_date } = req.body;

    if (useMockMode) {
      const result = await mockPlaid.getTransactions(
        access_token,
        start_date || '2024-01-01',
        end_date || new Date().toISOString().split('T')[0]
      );
      return res.json(result);
    }

    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: start_date || '2024-01-01',
      end_date: end_date || new Date().toISOString().split('T')[0],
    });

    res.json({
      transactions: response.data.transactions,
      total_transactions: response.data.total_transactions,
    });
  } catch (error) {
    console.error('Error getting transactions:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get auth (account and routing numbers)
app.post('/get-auth', async (req, res) => {
  try {
    const { access_token } = req.body;

    if (useMockMode) {
      const result = await mockPlaid.getAuth(access_token);
      return res.json({
        accounts: result.accounts,
        numbers: result.numbers,
      });
    }

    const response = await plaidClient.authGet({
      access_token,
    });

    res.json({
      accounts: response.data.accounts,
      numbers: response.data.numbers,
    });
  } catch (error) {
    console.error('Error getting auth:', error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get available mock users (only in mock mode)
app.get('/mock-users', (req, res) => {
  if (!useMockMode) {
    return res.status(400).json({ error: 'Mock mode is not enabled' });
  }
  res.json(mockPlaid.getAvailableUsers());
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', mode: useMockMode ? 'mock' : 'production' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const mode = useMockMode ? '📚 MOCK MODE (no Plaid API needed)' : '🔌 PRODUCTION MODE (real Plaid API)';
  console.log(`Plaid integration server running on port ${PORT}`);
  console.log(`Mode: ${mode}`);
  if (useMockMode) {
    console.log(`Available users: user_good, user_multi_account`);
  }
});
