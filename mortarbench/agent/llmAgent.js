// Multi-vendor LLM-backed agent. Uses fetch directly (no SDKs) so
// `npm run benchmark:llm` / `--vendor` can swap in a real model for the
// rule-based baseline and reproduce the eval against actual model behavior,
// including the bias probe. Each vendor just needs its API key in the
// environment -- nothing else to install.

function buildPrompt(c) {
  const statement = JSON.stringify(c.transactions, null, 2);
  const ulad = JSON.stringify(c.ulad, null, 2);
  return `You are a mortgage underwriting assistant. Given the bank statement transactions and the applicant's ULAD-style profile below, answer the question.

Bank statement transactions:
${statement}

Applicant profile (ULAD):
${ulad}

Question: ${c.question}

Respond with ONLY a JSON object of the form:
{"answer": <your answer - a number, boolean, string, or array of transaction ids as appropriate for the question>, "confidence": <integer 1-5, how confident you are this answer is correct>, "rationale": "<one sentence>"}`;
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`No JSON object found in model response: ${text.slice(0, 200)}`);
  return JSON.parse(match[0]);
}

async function postJson(url, headers, body) {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`HTTP ${res.status}: ${errBody.slice(0, 300)}`);
  }
  return res.json();
}

async function callAnthropic(prompt, apiKey, model) {
  const data = await postJson(
    'https://api.anthropic.com/v1/messages',
    { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
    { model, max_tokens: 512, messages: [{ role: 'user', content: prompt }] }
  );
  return (data.content || []).map((b) => b.text || '').join('');
}

// OpenAI and DeepSeek both speak the same chat-completions schema.
function makeOpenAiCompatibleCaller(url) {
  return async function call(prompt, apiKey, model) {
    const data = await postJson(
      url,
      { authorization: `Bearer ${apiKey}` },
      { model, max_tokens: 512, messages: [{ role: 'user', content: prompt }] }
    );
    return data.choices?.[0]?.message?.content || '';
  };
}

async function callGemini(prompt, apiKey, model) {
  const data = await postJson(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {},
    { contents: [{ parts: [{ text: prompt }] }] }
  );
  const parts = data.candidates?.[0]?.content?.parts || [];
  return parts.map((p) => p.text || '').join('');
}

// One entry per vendor: which env var holds the key, which env var can
// override the model, a sane default model, and the API-shaped caller.
// Model defaults are deliberately overridable -- vendor lineups move fast,
// so `MORTARBENCH_<VENDOR>_MODEL` always wins over the hardcoded default.
const VENDOR_DEFS = {
  anthropic: {
    label: 'Claude (Anthropic)',
    aliases: ['claude'],
    envKey: 'ANTHROPIC_API_KEY',
    modelEnvVar: 'MORTARBENCH_ANTHROPIC_MODEL',
    defaultModel: 'claude-sonnet-5',
    call: callAnthropic,
  },
  openai: {
    label: 'ChatGPT (OpenAI)',
    aliases: ['chatgpt', 'gpt'],
    envKey: 'OPENAI_API_KEY',
    modelEnvVar: 'MORTARBENCH_OPENAI_MODEL',
    defaultModel: 'gpt-4o',
    call: makeOpenAiCompatibleCaller('https://api.openai.com/v1/chat/completions'),
  },
  gemini: {
    label: 'Gemini (Google)',
    aliases: ['google'],
    envKey: 'GEMINI_API_KEY',
    modelEnvVar: 'MORTARBENCH_GEMINI_MODEL',
    defaultModel: 'gemini-2.5-flash',
    call: callGemini,
  },
  deepseek: {
    label: 'DeepSeek',
    aliases: [],
    envKey: 'DEEPSEEK_API_KEY',
    modelEnvVar: 'MORTARBENCH_DEEPSEEK_MODEL',
    defaultModel: 'deepseek-chat',
    call: makeOpenAiCompatibleCaller('https://api.deepseek.com/chat/completions'),
  },
};

const VENDOR_KEYS = Object.keys(VENDOR_DEFS);

function resolveVendorKey(name) {
  const n = String(name).toLowerCase();
  if (VENDOR_DEFS[n]) return n;
  for (const [key, def] of Object.entries(VENDOR_DEFS)) {
    if (def.aliases.includes(n)) return key;
  }
  return null;
}

function createAgent(vendorKey) {
  const def = VENDOR_DEFS[vendorKey];
  if (!def) throw new Error(`Unknown vendor: ${vendorKey}. Known: ${VENDOR_KEYS.join(', ')}`);
  const apiKey = process.env[def.envKey];
  const model = process.env[def.modelEnvVar] || def.defaultModel;

  async function answerCase(c) {
    if (!apiKey) throw new Error(`${def.envKey} is not set.`);
    const text = await def.call(buildPrompt(c), apiKey, model);
    const parsed = extractJson(text);
    return { answer: parsed.answer, confidence: parsed.confidence, rationale: parsed.rationale };
  }

  return { vendorKey, label: def.label, model, envKey: def.envKey, hasKey: Boolean(apiKey), answerCase };
}

module.exports = { VENDOR_KEYS, VENDOR_DEFS, resolveVendorKey, createAgent };
