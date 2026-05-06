const express = require('express');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Store access tokens (in production, use a database)
const accessTokens = {};

// Create Link Token - used by Plaid Link UI
app.post('/create-link-token', async (req, res) => {
  try {
    const { userId } = req.body;

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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Plaid integration server running on port ${PORT}`);
});
