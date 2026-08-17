# MortarBench-mini

A small, self-contained reimplementation of the ideas behind
[**MortarBench: Evaluating Mortgage Loan Origination Agents**](https://arxiv.org/abs/2606.19416)
(Toles, Lu, Munjal, Liu, Deng, Selig, Rindner, Li, Yu — Columbia University /
Tidalwave, June 2026). The paper's own code/data release wasn't available, so
this reproduces the *methodology it describes* from scratch rather than
porting any of its code.

## What the paper does

MortarBench evaluates LLM agents on mortgage loan origination: each instance
pairs a synthetic **bank statement** (60 days of transactions) with a
**ULAD** (Uniform Loan Application Dataset) applicant profile, plus a
realistic underwriting question drawn from real loan-officer workflows. Test
cases are built by generating a base statement + profile, then applying
hand-written **mutation functions** that edit the data to produce a case with
a known ground-truth answer — which is how they get broad edge-case coverage
without needing humans to label every case.

Headline findings:
- Even the best closed-source LLMs only reach 77.1% exact-match accuracy.
- Models show a strong bias when classifying the origin of incoming wire
  transfers: deposits from English names get flagged "foreign source" ~13%
  of the time, non-English Latin-script names (Spanish/French) ~52-53%, and
  non-Latin-script names (Arabic/Hindi/Chinese) up to 93%+ — even with no
  actual evidence of foreign origin beyond the name. Transliterating
  non-Latin names into Latin script mostly (not fully) closes that gap.
- **CRIT**, a confidence-calibration framework where the agent scores its own
  confidence per claim, raises accuracy to 80.5% and reduces the bias above.

## What this reimplementation does

This is a toy-scale version of the same *shape* of system, built in plain
Node.js with no external services required:

| Paper concept | Here |
|---|---|
| Bank statement + ULAD instance | `data/generate.js` — seeded synthetic 60-day statement + applicant profile |
| Mutation-function-based ground truth | `data/mutations.js` — one generator per question type, each computing its own known-correct answer |
| Agent under test | `agent/ruleAgent.js` (deterministic baseline with the same *class* of mistakes/bias the paper reports) and `agent/llmAgent.js` (optional, multi-vendor real-model agent) |
| Exact-match scoring | `score.js` |
| CRIT confidence calibration | `crit.js` — routes low-confidence answers to "flagged for human review" instead of auto-approving them |
| Foreign-origin bias audit | `data/names.js` + `biasReport.js` — the `remitter_origin_probe` question type, tabulated by name-script category |

Five scored task types (`income_verification`, `large_deposit_flag`,
`nsf_check`, `dti_calculation`, `asset_reserve_check`) plus the unscored bias
probe (`remitter_origin_probe`).

**Honesty about the bias probe:** the rule-based baseline doesn't derive its
"foreign" guess from an actual name-classifier heuristic — it samples against
the *rates the paper reports* for each name-script category, so the audit
demonstrates what "how biased is too biased" tooling looks like and gives the
CRIT mitigation something real to fix. Run with `--llm` (see below) to
measure an actual model's behavior on the same probe instead of the
simulated baseline.

## Running it

```bash
npm run benchmark                 # rule-based baseline, CRIT calibration, bias audit
node mortarbench/run.js --n 50 --bias-n 100 --seed 7   # bigger, different seed

# Also evaluate real models:
npm run benchmark:llm             # Claude only (needs ANTHROPIC_API_KEY)
npm run benchmark:vendors         # every vendor below, needs matching keys
node mortarbench/run.js --vendor chatgpt,gemini    # pick specific vendors
```

Flags: `--n <per-type count>`, `--bias-n <bias probe count>`, `--seed <int>`,
`--llm` (Claude only), `--vendor <name[,name...]|all>` (implies `--llm`).
Any vendor missing its API key is skipped with a one-line notice rather than
failing the run.

## Vendors

`agent/llmAgent.js` is a config-driven adapter over each vendor's chat API —
no SDKs, just `fetch`. Model IDs are overridable per vendor
(`MORTARBENCH_<VENDOR>_MODEL`) since lineups move fast and the hardcoded
defaults below will go stale.

| Vendor | `--vendor` name | API key env var | Default model |
|---|---|---|---|
| Claude (Anthropic) | `anthropic` / `claude` | `ANTHROPIC_API_KEY` | `claude-sonnet-5` |
| ChatGPT (OpenAI) | `openai` / `chatgpt` / `gpt` | `OPENAI_API_KEY` | `gpt-4o` |
| Gemini (Google) | `gemini` / `google` | `GEMINI_API_KEY` | `gemini-2.5-flash` |
| DeepSeek | `deepseek` | `DEEPSEEK_API_KEY` | `deepseek-chat` |

These four are the ones with a public chat-completions-style API that fits
this harness directly. A few real mortgage-specific products came up while
researching this and are worth naming instead of silently ignoring:

- **Tidalwave** is the paper's own industry co-author — not a vendor to
  plug in here, but worth knowing they've since published real MortarBench
  results for their agent ("SOLO"): 84% overall / 95% on compliance checks,
  vs. 71% / 42% for Claude 4.5, per their [March 2026 release with Columbia's
  DAPLab](https://www.businesswire.com/news/home/20260317118247/en/Tidalwave-and-Columbia-Universitys-DAPLab-Release-First-Public-Benchmark-for-AI-Accuracy-in-Mortgage-Origination).
- **JazzX AI**, **Ocrolus**, and **Friday Harbor** are all real mortgage/lending
  AI products (Ocrolus in particular does bank-statement/income analysis,
  directly adjacent to this benchmark), but none expose a public
  question-answering API that fits this harness's prompt/response shape —
  they're enterprise, LOS-integrated, or document-extraction APIs rather than
  a chat endpoint. Wiring one in would mean a bespoke adapter against that
  product's actual API, not a `VENDOR_DEFS` entry.

## Caveats

This is a demo-scale illustration, not a research artifact: dozens of cases
per run instead of thousands, five task types instead of the paper's full
taxonomy, and a rule-based "model" whose mistakes are hand-designed to mirror
the paper's findings rather than emergent from a real LLM. Pass `--llm` to
swap in a real model and get results that are actually measured rather than
illustrative.
