// A small stand-in for the paper's CRIT idea: use the agent's own per-answer
// confidence score to decide which answers to auto-approve vs. route to a
// human underwriter, instead of accepting every answer at face value.

const AUTO_APPROVE_THRESHOLD = 3; // confidence >= this is auto-approved

function calibrate(evalResults) {
  const scored = evalResults.filter((r) => r.correct !== null);
  const total = scored.length;
  const rawCorrect = scored.filter((r) => r.correct).length;

  const autoApproved = scored.filter((r) => r.result.confidence >= AUTO_APPROVE_THRESHOLD);
  const flagged = scored.filter((r) => r.result.confidence < AUTO_APPROVE_THRESHOLD);
  const autoApprovedCorrect = autoApproved.filter((r) => r.correct).length;

  return {
    total,
    rawAccuracy: total ? rawCorrect / total : null,
    autoApprovedCount: autoApproved.length,
    autoApprovedAccuracy: autoApproved.length ? autoApprovedCorrect / autoApproved.length : null,
    flaggedCount: flagged.length,
    flaggedAccuracy: flagged.length ? flagged.filter((r) => r.correct).length / flagged.length : null,
    coverage: total ? autoApproved.length / total : null,
  };
}

module.exports = { calibrate, AUTO_APPROVE_THRESHOLD };
