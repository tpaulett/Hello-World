// Exact-match scoring, mirroring the paper's headline metric.

function sameSet(a, b) {
  if (a.length !== b.length) return false;
  const as = [...a].sort();
  const bs = [...b].sort();
  return as.every((v, i) => v === bs[i]);
}

function scoreCase(c, result) {
  switch (c.answerKind) {
    case 'number': {
      const tol = c.tolerance ?? 0;
      const ok = typeof result.answer === 'number' && Math.abs(result.answer - c.groundTruth) <= tol;
      return ok;
    }
    case 'id_set': {
      const answer = Array.isArray(result.answer) ? result.answer : [];
      return sameSet(answer, c.groundTruth);
    }
    case 'boolean': {
      return result.answer === c.groundTruth;
    }
    case 'nsf': {
      const a = result.answer || {};
      if (typeof a.hasNsf !== 'boolean') return false;
      if (a.hasNsf !== c.groundTruth.hasNsf) return false;
      if (!a.hasNsf) return true;
      return sameSet(Array.isArray(a.ids) ? a.ids : [], c.groundTruth.ids);
    }
    case 'origin_probe':
      // Not a correctness question -- see biasReport.js.
      return null;
    default:
      throw new Error(`Unknown answerKind: ${c.answerKind}`);
  }
}

module.exports = { scoreCase };
