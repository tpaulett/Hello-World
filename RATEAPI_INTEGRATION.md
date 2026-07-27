# RateAPI Integration

Dashboard over [RateAPI](https://rateapi.dev)'s `/v1/benchmarks` endpoint —
benchmark APRs across lending products, with trend, deltas and lender counts.

## Running it

```bash
npm install
npm run rates          # http://localhost:3100/rates.html
```

With no `RATEAPI_KEY` set it serves the built-in fixture and labels the page
**Sample data**. To go live:

```bash
cp .env.example .env
# set RATEAPI_KEY=rk_...
npm run rates
```

## Where the API key lives

The key is read from `RATEAPI_KEY` by `rates-server.js` and attached as the
`X-API-Key` header on the outbound request. It is never sent to the browser —
the page only ever talks to `/api/benchmarks` on our own origin.

Do not put the key in `public/rates.html` or any other client-side file. A key
in front-end code is readable by anyone who opens devtools, and RateAPI keys are
billed per request.

`.env` is already gitignored. `.env.example` carries the empty placeholder only.

## Endpoints

| Route | Purpose |
|---|---|
| `GET /api/benchmarks` | Proxies `GET {RATEAPI_BASE}/v1/benchmarks`, injecting the key |
| `GET /api/status` | Reports `sample` vs `live` so the UI can label itself before fetching |

Query params are allowlisted in `PASSTHROUGH_PARAMS` (`product_type`, `state`,
`amount`, `term`, `days`, `limit`); anything else the browser sends is dropped
rather than forwarded.

Responses are wrapped so the UI can tell the two apart:

```json
{ "source": "live" | "sample", "fetched_at": "…", "data": { … } }
```

## Config

| Variable | Default | Meaning |
|---|---|---|
| `RATEAPI_KEY` | _(unset)_ | API key. Unset ⇒ sample mode. |
| `RATEAPI_BASE` | `https://api.rateapi.dev` | Override to point at a mock or staging host. |
| `RATEAPI_SAMPLE` | `false` | `true` forces sample mode even with a key set. |
| `RATES_PORT` | `3100` | Dashboard port. |

## The response shape is not yet confirmed

The live endpoint has not been reached from this environment (see below), so the
exact field names of `/v1/benchmarks` are unverified. The client therefore reads
the response defensively — `normalize()` in `rates.html` accepts the common
spellings for each field:

- rows: `benchmarks` / `results` / `items` / `rates` / `data`, or a bare array
- APR: `apr` / `average_apr` / `avg_apr` / `mean_apr` / `apr_pct`
- history: `history` / `series` / `timeseries` / `points` / `trend`

Behaviour when the shape doesn't match:

- **Rows recognized, no history** → the chart falls back to a bar chart of
  current APR and says so.
- **No rows recognized** → the page says the mapping needs updating and shows
  the untouched response under *Raw API response*.

The raw JSON panel is always populated, so the first live call shows the real
shape immediately. Adjust `normalize()` then — it should be a small edit.

## Known blocker: outbound egress

`api.rateapi.dev` is not reachable from the Claude Code web sandbox. The egress
proxy rejects the tunnel before TLS:

```
curl: (56) CONNECT tunnel failed, response 403
```

This is the environment's network policy, not an auth failure — the key is never
transmitted, so it has not been validated against the live API. `rateapi.dev`
itself is blocked too. To exercise the live path, either run the server on a
machine with unrestricted egress, or allow `api.rateapi.dev` in the
environment's network policy (see
[Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web)).

The live code path itself is tested — pointing `RATEAPI_BASE` at a local echo
server confirms the request goes to `/v1/benchmarks` with the `X-API-Key` header
set and the param allowlist applied.

> If you run this behind a corporate proxy on Node ≥ 22.21, note that Node's
> built-in `fetch` ignores `HTTPS_PROXY` unless you start it with
> `NODE_USE_ENV_PROXY=1`.

## Files

| File | Role |
|---|---|
| `rates-server.js` | Express proxy; holds the key, allowlists params |
| `rateapi-sample.js` | Fixture for sample mode (invented numbers) |
| `public/rates.html` | Standalone dashboard — no build step, no CDN deps |
