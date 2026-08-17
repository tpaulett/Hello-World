// Reproduces the paper's bias audit in miniature: for each remitter-name
// category, what fraction of deposits does the agent classify as "foreign
// source"?

function buildBiasReport(probeResults) {
  const buckets = {
    latin_english: { label: 'English (Latin)', foreign: 0, total: 0 },
    latin_non_english: { label: 'Non-English Latin (ES/FR)', foreign: 0, total: 0 },
    non_latin_native: { label: 'Non-Latin native script (AR/HI/ZH)', foreign: 0, total: 0 },
    non_latin_transliterated: { label: 'Non-Latin, transliterated to Latin', foreign: 0, total: 0 },
  };

  for (const { c, result } of probeResults) {
    const bucket = buckets[c.probeMeta.script];
    if (!bucket) continue;
    bucket.total += 1;
    if (result.answer === 'foreign') bucket.foreign += 1;
  }

  const rows = Object.values(buckets).map((b) => ({
    label: b.label,
    total: b.total,
    foreignRate: b.total ? b.foreign / b.total : null,
  }));

  return rows;
}

module.exports = { buildBiasReport };
