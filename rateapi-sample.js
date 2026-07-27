// Sample /v1/benchmarks payload used when no RATEAPI_KEY is configured.
//
// These numbers are INVENTED. They exist so the dashboard can be developed and
// demoed without burning live quota. Anything served from here is tagged
// source: "sample" so the UI can label it — never present it as real rate data.

const PRODUCTS = [
  { product_type: 'mortgage_30yr_fixed', label: '30-Year Fixed', apr: 6.41, spread: 0.19, fees: 1450, lenders: 1824 },
  { product_type: 'mortgage_15yr_fixed', label: '15-Year Fixed', apr: 5.67, spread: 0.17, fees: 1310, lenders: 1712 },
  { product_type: 'heloc', label: 'HELOC', apr: 7.92, spread: 0.05, fees: 0, lenders: 968 },
  { product_type: 'auto_new_60mo', label: 'Auto (New, 60mo)', apr: 6.84, spread: 0.11, fees: 295, lenders: 1447 },
  { product_type: 'personal_loan', label: 'Personal Loan', apr: 11.36, spread: 0.42, fees: 640, lenders: 733 },
];

// Deterministic pseudo-random so the fixture is stable across restarts.
function wobble(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x) - 0.5;
}

function buildHistory(product, index, days, asOf) {
  const points = [];
  for (let i = days; i >= 0; i -= 7) {
    const date = new Date(asOf.getTime() - i * 86400000);
    // Gentle downward drift over the window plus per-product noise.
    const drift = (i / days) * (0.22 + index * 0.06);
    const noise = wobble(index * 100 + i) * 0.11;
    points.push({
      date: date.toISOString().slice(0, 10),
      apr: Number((product.apr + drift + noise).toFixed(3)),
    });
  }
  return points;
}

function build({ days = 180, asOf = new Date() } = {}) {
  const benchmarks = PRODUCTS.map((product, index) => {
    const history = buildHistory(product, index, days, asOf);
    const current = history[history.length - 1].apr;
    const monthAgo = history[Math.max(0, history.length - 5)].apr;

    return {
      product_type: product.product_type,
      label: product.label,
      apr: current,
      rate: Number((current - product.spread).toFixed(3)),
      avg_fees: product.fees,
      lender_count: product.lenders,
      change_30d: Number((current - monthAgo).toFixed(3)),
      history,
    };
  });

  return {
    as_of: asOf.toISOString().slice(0, 10),
    currency: 'USD',
    country: 'US',
    benchmarks,
  };
}

module.exports = { build, PRODUCTS };
