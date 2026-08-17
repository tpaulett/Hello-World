// Synthetic bank-statement + ULAD-lite applicant profile generator.
//
// Mirrors the two data objects at the center of MortarBench: a JSON list of
// bank transactions over a review window, and a standardized applicant
// profile (a simplified stand-in for the industry ULAD form). Everything
// here is generated from scratch with a seeded RNG -- no data from the
// paper is used or required.

const { randInt, choice } = require('../rng');

const EMPLOYERS = ['Acme Logistics', 'Northwind Health', 'Bluepeak Systems', 'Harbor Retail Group'];
const REVIEW_DAYS = 60;

let txCounter = 0;
function nextTxId() {
  txCounter += 1;
  return `tx_${String(txCounter).padStart(5, '0')}`;
}

function isoDate(daysAgo) {
  const d = new Date('2026-06-01T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

// Builds a baseline 60-day statement with recurring payroll, rent, and
// everyday spending -- a "clean" applicant with no edge cases yet.
function baseStatement(rng, applicantName, monthlyIncome) {
  const employer = choice(rng, EMPLOYERS);
  const transactions = [];

  // Bi-weekly payroll deposits (2-3 over the window), consistent amount.
  const payAmount = Math.round((monthlyIncome / 2) * 100) / 100;
  for (let day = 55; day >= 0; day -= 14) {
    transactions.push({
      id: nextTxId(),
      date: isoDate(day),
      description: `${employer} PAYROLL DEPOSIT`,
      counterparty_name: employer,
      counterparty_name_script: 'latin_english',
      category: 'payroll',
      direction: 'credit',
      amount: payAmount,
    });
  }

  // Monthly rent debit.
  for (let day = 58; day >= 0; day -= 30) {
    transactions.push({
      id: nextTxId(),
      date: isoDate(day),
      description: 'RENT PAYMENT - Harborview Apartments',
      counterparty_name: 'Harborview Apartments',
      counterparty_name_script: 'latin_english',
      category: 'housing',
      direction: 'debit',
      amount: Math.round(monthlyIncome * 0.28 * 100) / 100,
    });
  }

  // Everyday spending noise.
  const merchants = ['Whole Foods', 'Shell Gas', 'Netflix', 'Amazon', 'Chipotle', 'Con Edison', 'Verizon Wireless'];
  const count = randInt(rng, 10, 16);
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: nextTxId(),
      date: isoDate(randInt(rng, 0, REVIEW_DAYS - 1)),
      description: choice(rng, merchants),
      counterparty_name: null,
      counterparty_name_script: null,
      category: 'spending',
      direction: 'debit',
      amount: Math.round((randInt(rng, 5, 200) + rng()) * 100) / 100,
    });
  }

  transactions.sort((a, b) => (a.date < b.date ? -1 : 1));

  const ulad = {
    applicant_name: applicantName,
    stated_employer: employer,
    stated_monthly_income: monthlyIncome,
    stated_monthly_liabilities: Math.round(monthlyIncome * randInt(rng, 8, 20) / 100),
    stated_liquid_assets: Math.round(monthlyIncome * randInt(rng, 2, 8)),
    loan_amount: Math.round(monthlyIncome * 12 * randInt(rng, 3, 5)),
    monthly_piti: Math.round(monthlyIncome * 0.30 * 100) / 100,
  };

  return { transactions, ulad, employer, payAmount };
}

module.exports = { baseStatement, isoDate, nextTxId, REVIEW_DAYS, EMPLOYERS };
