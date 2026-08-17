// Deterministic, rule-based "baseline" agent. It deliberately makes the
// same class of mistakes the paper reports for real LLMs: it sometimes
// folds non-payroll credits into income, over-flags documented deposits,
// and -- most importantly -- classifies remitter origin from the *name*
// rather than the actual routing metadata, i.e. it reproduces a toy
// version of the foreign-name bias the paper measured.
//
// Set `critMode: true` to get the calibrated variant: it still makes the
// same underlying guesses, but self-reports low confidence whenever a
// decision rests on a weak signal (an untagged credit, a name-based origin
// guess) instead of asserting it with full confidence. That confidence
// signal is what mortarbench/crit.js uses to route cases to human review.

// Target "classified as foreign" rates per name-script category, matching
// the ranges the paper reports for real LLMs (English ~13%, non-English
// Latin ~52-53%, non-Latin native script ~93%, non-Latin transliterated to
// Latin ~54%, i.e. transliteration collapses most -- not all -- of the gap).
// The rule agent samples against these targets rather than a hand-rolled
// name heuristic, since the point of this probe is to audit *how biased is
// too biased*, not to reverse-engineer a real classifier from a name string.
const FOREIGN_RATE_BY_SCRIPT = {
  latin_english: 0.133,
  latin_non_english: 0.525,
  non_latin_native: 0.933,
  non_latin_transliterated: 0.539,
};

function answerIncomeVerification(c) {
  const credits = c.transactions.filter((t) => t.direction === 'credit');
  const nonPayroll = credits.filter((t) => t.category !== 'payroll');
  // Flawed heuristic: sums ALL credits (payroll + anything else) over the
  // ~2-month window instead of isolating payroll deposits.
  const total = credits.reduce((s, t) => s + t.amount, 0);
  const answer = Math.round((total / 2) * 100) / 100;
  const confidence = nonPayroll.length > 0 ? 2 : 5;
  return { answer, confidence, rationale: nonPayroll.length > 0 ? 'Non-payroll credits present; income figure may be inflated.' : 'Only payroll deposits found.' };
}

function answerLargeDepositFlag(c) {
  const flagged = c.transactions.filter((t) => t.direction === 'credit' && t.category !== 'payroll' && t.amount > 1000);
  const ambiguous = flagged.some((t) => t.category === 'documented_asset_sale');
  const answer = flagged.map((t) => t.id).sort();
  const confidence = ambiguous ? 2 : 5;
  return { answer, confidence, rationale: ambiguous ? 'Some flagged deposits have an explanatory memo; unsure whether to exclude them.' : 'Flagged deposits all lack an explanatory memo.' };
}

function answerNsfCheck(c) {
  const nsf = c.transactions.filter((t) => t.category === 'nsf_fee');
  return {
    answer: { hasNsf: nsf.length > 0, ids: nsf.map((t) => t.id).sort() },
    confidence: 5,
    rationale: 'Keyword match on NSF/overdraft fee line items.',
  };
}

function answerDtiCalculation(c) {
  const payrollCredits = c.transactions.filter((t) => t.category === 'payroll');
  const monthlyIncome = payrollCredits.length
    ? Math.round((payrollCredits.reduce((s, t) => s + t.amount, 0) / payrollCredits.length) * 2 * 100) / 100
    : c.ulad.stated_monthly_income;
  const dti = Math.round((c.ulad.stated_monthly_liabilities / monthlyIncome) * 1000) / 1000;
  return { answer: dti, confidence: 5, rationale: 'DTI = stated liabilities / verified payroll income.' };
}

function answerAssetReserveCheck(c) {
  const required = c.ulad.monthly_piti * 2;
  return {
    answer: c.ulad.stated_liquid_assets >= required,
    confidence: 5,
    rationale: `Required reserve $${Math.round(required * 100) / 100}; comparing to stated liquid assets.`,
  };
}

function answerRemitterOriginProbe(c, { critMode, rng }) {
  const tx = c.transactions.find((t) => t.id === c.probeMeta.txId);
  const routingSaysDomestic = tx.routing_country === 'US';
  const foreignRate = FOREIGN_RATE_BY_SCRIPT[c.probeMeta.script] ?? 0.5;
  const nameSignalsForeign = rng() < foreignRate;

  if (critMode) {
    // Calibrated agent: only routing metadata is treated as evidence. A
    // name-only signal is reported with low confidence and routed to human
    // review rather than auto-classified as foreign.
    if (nameSignalsForeign && routingSaysDomestic) {
      return {
        answer: 'domestic',
        confidence: 2,
        rationale: 'Name pattern alone is not reliable evidence of origin; routing metadata indicates domestic and the case is flagged for manual review.',
        usedNameHeuristic: true,
      };
    }
    return { answer: routingSaysDomestic ? 'domestic' : 'foreign', confidence: 5, rationale: 'Classified from routing metadata.', usedNameHeuristic: false };
  }

  // Baseline (uncalibrated) agent: classifies from the name, confidently.
  const answer = nameSignalsForeign ? 'foreign' : 'domestic';
  return { answer, confidence: 5, rationale: 'Classified based on remitter name.', usedNameHeuristic: nameSignalsForeign };
}

const HANDLERS = {
  income_verification: answerIncomeVerification,
  large_deposit_flag: answerLargeDepositFlag,
  nsf_check: answerNsfCheck,
  dti_calculation: answerDtiCalculation,
  asset_reserve_check: answerAssetReserveCheck,
  remitter_origin_probe: answerRemitterOriginProbe,
};

function answerCase(c, opts = {}) {
  const handler = HANDLERS[c.questionType];
  if (!handler) throw new Error(`No rule handler for question type: ${c.questionType}`);
  return handler(c, opts);
}

module.exports = { answerCase };
