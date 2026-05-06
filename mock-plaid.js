// Mock Plaid service for testing without real credentials
const mockAccounts = {
  user_good: [
    {
      account_id: 'acc_001',
      name: 'Checking Account',
      official_name: 'Premium Checking',
      type: 'depository',
      subtype: 'checking',
      mask: '1234',
      balances: {
        available: 5250.50,
        current: 5500.00,
        limit: null,
        iso_currency_code: 'USD',
      },
    },
    {
      account_id: 'acc_002',
      name: 'Savings Account',
      official_name: 'High Yield Savings',
      type: 'depository',
      subtype: 'savings',
      mask: '5678',
      balances: {
        available: 12000.00,
        current: 12000.00,
        limit: null,
        iso_currency_code: 'USD',
      },
    },
  ],
  user_multi_account: [
    {
      account_id: 'acc_101',
      name: 'Checking',
      official_name: 'Business Checking',
      type: 'depository',
      subtype: 'checking',
      mask: '0001',
      balances: {
        available: 25000,
        current: 25000,
        limit: null,
        iso_currency_code: 'USD',
      },
    },
    {
      account_id: 'acc_102',
      name: 'Savings',
      official_name: 'Business Savings',
      type: 'depository',
      subtype: 'savings',
      mask: '0002',
      balances: {
        available: 100000,
        current: 100000,
        limit: null,
        iso_currency_code: 'USD',
      },
    },
    {
      account_id: 'acc_103',
      name: 'Credit Card',
      official_name: 'Business Credit Card',
      type: 'credit',
      subtype: 'credit card',
      mask: '0003',
      balances: {
        available: 50000,
        current: 12500,
        limit: 50000,
        iso_currency_code: 'USD',
      },
    },
  ],
};

const mockTransactions = {
  user_good: [
    { name: 'Starbucks Coffee', merchant_name: 'Starbucks', date: '2024-05-06', amount: 5.45 },
    { name: 'Whole Foods', merchant_name: 'Whole Foods Market', date: '2024-05-05', amount: 78.23 },
    { name: 'Netflix Subscription', merchant_name: 'Netflix', date: '2024-05-04', amount: 15.99 },
    { name: 'Shell Gas Station', merchant_name: 'Shell Oil', date: '2024-05-03', amount: 45.00 },
    { name: 'Amazon Purchase', merchant_name: 'Amazon.com', date: '2024-05-02', amount: 32.99 },
    { name: 'Chipotle', merchant_name: 'Chipotle Mexican Grill', date: '2024-05-01', amount: 12.50 },
    { name: 'Paycheck Deposit', merchant_name: 'Employer Inc', date: '2024-04-30', amount: -2500.00 },
    { name: 'Rent Payment', merchant_name: 'Landlord LLC', date: '2024-04-28', amount: 1500.00 },
    { name: 'Electricity Bill', merchant_name: 'Electric Company', date: '2024-04-25', amount: 125.75 },
    { name: 'Gym Membership', merchant_name: 'Planet Fitness', date: '2024-04-20', amount: 45.00 },
  ],
  user_multi_account: [
    { name: 'Office Supplies', merchant_name: 'Staples', date: '2024-05-06', amount: 125.99 },
    { name: 'Internet Service', merchant_name: 'Comcast', date: '2024-05-05', amount: 89.99 },
    { name: 'Software License', merchant_name: 'Adobe', date: '2024-05-04', amount: 599.99 },
    { name: 'Client Refund', merchant_name: 'Client Corp', date: '2024-05-03', amount: -500.00 },
  ],
};

const mockAuth = {
  user_good: [
    { account_id: 'acc_001', routing: '021000021', account: 'xxxx1234' },
    { account_id: 'acc_002', routing: '021000021', account: 'xxxx5678' },
  ],
  user_multi_account: [
    { account_id: 'acc_101', routing: '021000021', account: 'xxxx0001' },
    { account_id: 'acc_102', routing: '021000021', account: 'xxxx0002' },
    { account_id: 'acc_103', routing: '021000021', account: 'xxxx0003' },
  ],
};

// Generate mock token from username
function generateMockToken(username) {
  return `mock-${Buffer.from(username).toString('base64')}-${Date.now()}`;
}

// Parse username from mock token
function parseUsername(token) {
  try {
    if (!token.startsWith('mock-')) return null;
    const parts = token.split('-');
    return Buffer.from(parts[1], 'base64').toString();
  } catch {
    return null;
  }
}

module.exports = {
  createLinkToken: async (userId) => {
    return {
      link_token: `link-mock-${Date.now()}`,
      expiration: new Date(Date.now() + 3600000).toISOString(),
    };
  },

  exchangeToken: async (publicToken, userId) => {
    // Extract username from public token (passed from UI)
    const username = publicToken.replace('public-mock-', '');
    const accessToken = generateMockToken(username);

    return {
      access_token: accessToken,
      item_id: `item-mock-${Date.now()}`,
    };
  },

  getAccounts: async (accessToken) => {
    const username = parseUsername(accessToken);
    if (!username || !mockAccounts[username]) {
      throw new Error('Invalid access token');
    }

    return {
      accounts: mockAccounts[username],
      item: {
        institution_id: 'mock_bank',
      },
    };
  },

  getTransactions: async (accessToken, startDate, endDate) => {
    const username = parseUsername(accessToken);
    if (!username || !mockTransactions[username]) {
      throw new Error('Invalid access token');
    }

    const transactions = mockTransactions[username];
    return {
      transactions,
      total_transactions: transactions.length,
    };
  },

  getAuth: async (accessToken) => {
    const username = parseUsername(accessToken);
    if (!username || !mockAuth[username]) {
      throw new Error('Invalid access token');
    }

    const accounts = mockAccounts[username];
    const numbers = mockAuth[username];

    return {
      accounts,
      numbers: {
        ach: numbers,
        eft: [],
        international_iban: [],
      },
    };
  },

  getAvailableUsers: () => {
    return Object.keys(mockAccounts).map(username => ({
      username,
      password: 'pass_good',
      description: {
        user_good: 'Standard account with checking & savings',
        user_multi_account: 'Account with checking, savings, and credit card',
      }[username],
    }));
  },
};
