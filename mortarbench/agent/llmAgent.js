// Optional LLM-backed agent. Uses fetch directly against the Anthropic
// Messages API (no extra dependency) so `npm run benchmark:llm` can swap in
// a real model for the rule-based baseline and reproduce the eval against
// actual model behavior, including the bias probe.

const MODEL = process.env.MORTARBENCH_MODEL || 'claude-sonnet-5';
const API_URL = 'https://api.anthropic.com/v1/messages';

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

async function answerCase(c) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not set; cannot run the LLM agent. Omit --llm to use the rule-based baseline.');
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 512,
      messages: [{ role: 'user', content: buildPrompt(c) }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${body.slice(0, 300)}`);
  }

  const data = await res.json();
  const text = (data.content || []).map((b) => b.text || '').join('');
  const parsed = extractJson(text);
  return {
    answer: parsed.answer,
    confidence: parsed.confidence,
    rationale: parsed.rationale,
    usedNameHeuristic: undefined,
  };
}

module.exports = { answerCase, MODEL };
