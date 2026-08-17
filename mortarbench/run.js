#!/usr/bin/env node
// CLI entry point: generates a small MortarBench-style eval set, runs an
// agent over it, and prints an exact-match / CRIT-calibration / bias report.
//
// Usage:
//   node mortarbench/run.js                 rule-based baseline, default size
//   node mortarbench/run.js --n 20 --seed 7  20 cases per scored question type
//   node mortarbench/run.js --llm            also run the real LLM agent
//   npm run benchmark / npm run benchmark:llm

const { makeRng } = require('./rng');
const { GENERATORS } = require('./data/mutations');
const { scoreCase } = require('./score');
const { calibrate } = require('./crit');
const { buildBiasReport } = require('./biasReport');
const ruleAgent = require('./agent/ruleAgent');
const llmAgent = require('./agent/llmAgent');

const SCORED_TYPES = ['income_verification', 'large_deposit_flag', 'nsf_check', 'dti_calculation', 'asset_reserve_check'];

function parseArgs(argv) {
  const args = { n: 20, biasN: 40, seed: 42, llm: false, vendors: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--n') args.n = Number(argv[++i]);
    else if (argv[i] === '--bias-n') args.biasN = Number(argv[++i]);
    else if (argv[i] === '--seed') args.seed = Number(argv[++i]);
    else if (argv[i] === '--llm') args.llm = true;
    else if (argv[i] === '--vendor') {
      args.llm = true;
      args.vendors = argv[++i].split(',').map((s) => s.trim());
    }
  }
  return args;
}

function generateScoredCases(rng, n) {
  const cases = [];
  for (const type of SCORED_TYPES) {
    for (let i = 0; i < n; i++) cases.push(GENERATORS[type](rng));
  }
  return cases;
}

function generateBiasCases(rng, n) {
  const cases = [];
  for (let i = 0; i < n; i++) cases.push(GENERATORS.remitter_origin_probe(rng));
  return cases;
}

async function runAgent(cases, answerFn) {
  const results = [];
  for (const c of cases) {
    const result = await answerFn(c);
    const correct = scoreCase(c, result);
    results.push({ c, result, correct });
  }
  return results;
}

function pct(x) {
  return x === null || x === undefined ? '  n/a' : `${(x * 100).toFixed(1)}%`.padStart(6);
}

function printPerTypeAccuracy(results) {
  for (const type of SCORED_TYPES) {
    const subset = results.filter((r) => r.c.questionType === type);
    const correct = subset.filter((r) => r.correct).length;
    const acc = subset.length ? correct / subset.length : null;
    console.log(`  ${type.padEnd(24)} ${pct(acc)}  (${correct}/${subset.length})`);
  }
}

function printCritSummary(results) {
  const summary = calibrate(results);
  console.log(`  raw accuracy:            ${pct(summary.rawAccuracy)}  (n=${summary.total})`);
  console.log(`  auto-approved accuracy:  ${pct(summary.autoApprovedAccuracy)}  (n=${summary.autoApprovedCount}, coverage ${pct(summary.coverage)})`);
  console.log(`  flagged for review:      ${summary.flaggedCount} cases (accuracy if forced: ${pct(summary.flaggedAccuracy)})`);
  return summary;
}

function printBiasTable(rows, label) {
  console.log(`  ${label}`);
  for (const row of rows) {
    console.log(`    ${row.label.padEnd(38)} ${pct(row.foreignRate)} classified "foreign"  (n=${row.total})`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rng = makeRng(args.seed);

  console.log(`MortarBench-mini -- seed=${args.seed}, n/type=${args.n}, bias-n=${args.biasN}\n`);

  const scoredCases = generateScoredCases(rng, args.n);
  const biasCases = generateBiasCases(rng, args.biasN);

  console.log('== Baseline rule-based agent (uncalibrated) ==');
  const baselineResults = await runAgent(scoredCases, (c) => ruleAgent.answerCase(c, { critMode: false }));
  printPerTypeAccuracy(baselineResults);
  const baselineOverall = calibrate(baselineResults).rawAccuracy;
  console.log(`  overall exact-match accuracy: ${pct(baselineOverall)}\n`);

  console.log('== CRIT-calibrated rule-based agent ==');
  const critResults = await runAgent(scoredCases, (c) => ruleAgent.answerCase(c, { critMode: true }));
  printCritSummary(critResults);
  console.log();

  console.log('== Bias audit: remitter-origin classification by name category ==');
  const biasRng = makeRng(args.seed + 1);
  const baselineBias = await runAgent(biasCases, (c) => ruleAgent.answerCase(c, { critMode: false, rng: biasRng }));
  printBiasTable(buildBiasReport(baselineBias), 'baseline agent:');
  const critBias = await runAgent(biasCases, (c) => ruleAgent.answerCase(c, { critMode: true, rng: biasRng }));
  printBiasTable(buildBiasReport(critBias), 'CRIT-calibrated agent (flags name-only guesses for review instead of asserting "foreign"):');
  console.log();

  if (args.llm) {
    const requested = args.vendors ?? ['anthropic'];
    const vendorKeys = requested.includes('all') ? llmAgent.VENDOR_KEYS : requested;

    for (const requestedName of vendorKeys) {
      const vendorKey = llmAgent.resolveVendorKey(requestedName);
      if (!vendorKey) {
        console.log(`== Unknown vendor "${requestedName}" (known: ${llmAgent.VENDOR_KEYS.join(', ')}) ==\n`);
        continue;
      }
      const agent = llmAgent.createAgent(vendorKey);
      console.log(`== ${agent.label} (${agent.model}) ==`);
      if (!agent.hasKey) {
        console.log(`  skipped: ${agent.envKey} is not set\n`);
        continue;
      }
      try {
        const llmResults = await runAgent(scoredCases, agent.answerCase);
        printPerTypeAccuracy(llmResults);
        printCritSummary(llmResults);
        const llmBias = await runAgent(biasCases, agent.answerCase);
        printBiasTable(buildBiasReport(llmBias), 'bias audit:');
      } catch (err) {
        console.error(`  ${agent.label} failed: ${err.message}`);
      }
      console.log();
    }
  } else {
    console.log(`(pass --vendor <${llmAgent.VENDOR_KEYS.join('|')}|all> with the matching API key set to evaluate real models, or --llm for Claude alone)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
