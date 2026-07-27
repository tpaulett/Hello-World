const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sample = require('./rateapi-sample');

const API_BASE = process.env.RATEAPI_BASE || 'https://api.rateapi.dev';
const API_KEY = process.env.RATEAPI_KEY;
const FORCE_SAMPLE = process.env.RATEAPI_SAMPLE === 'true';
const useSample = FORCE_SAMPLE || !API_KEY;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Only these reach the upstream API. Anything else the browser sends is dropped
// rather than forwarded blindly.
const PASSTHROUGH_PARAMS = ['product_type', 'state', 'amount', 'term', 'days', 'limit'];

function upstreamUrl(query) {
  const url = new URL('/v1/benchmarks', API_BASE);
  for (const key of PASSTHROUGH_PARAMS) {
    if (query[key] !== undefined && query[key] !== '') {
      url.searchParams.set(key, query[key]);
    }
  }
  return url;
}

app.get('/api/benchmarks', async (req, res) => {
  if (useSample) {
    return res.json({
      source: 'sample',
      reason: FORCE_SAMPLE ? 'RATEAPI_SAMPLE=true' : 'RATEAPI_KEY is not set',
      fetched_at: new Date().toISOString(),
      data: sample.build(),
    });
  }

  const url = upstreamUrl(req.query);

  try {
    const upstream = await fetch(url, {
      headers: {
        // The key lives here and only here. It is never sent to the browser.
        'X-API-Key': API_KEY,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(15000),
    });

    const body = await upstream.text();

    if (!upstream.ok) {
      console.error(`RateAPI ${upstream.status} for ${url.pathname}`);
      return res.status(upstream.status).json({
        error: `RateAPI returned ${upstream.status} ${upstream.statusText}`,
        detail: body.slice(0, 500),
      });
    }

    res.json({
      source: 'live',
      fetched_at: new Date().toISOString(),
      data: JSON.parse(body),
    });
  } catch (error) {
    console.error('RateAPI request failed:', error.message);
    res.status(502).json({
      error: 'Could not reach RateAPI',
      detail: error.message,
    });
  }
});

// Lets the UI show which mode it is in before it fetches anything.
app.get('/api/status', (req, res) => {
  res.json({
    mode: useSample ? 'sample' : 'live',
    key_configured: Boolean(API_KEY),
    api_base: API_BASE,
  });
});

const PORT = process.env.RATES_PORT || 3100;
app.listen(PORT, () => {
  console.log(`RateAPI dashboard on http://localhost:${PORT}/rates.html`);
  console.log(useSample
    ? '  Mode: SAMPLE DATA (set RATEAPI_KEY in .env for live rates)'
    : `  Mode: LIVE against ${API_BASE}`);
});
