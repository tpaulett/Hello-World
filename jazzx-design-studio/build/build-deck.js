#!/usr/bin/env node
/**
 * Executive summary deck for the JazzX Design Studio 90-day framework.
 *
 *   NODE_PATH=<...>/node_modules node build/build-deck.js [outPath]
 *
 * Motif: the gate chip (G0–G4) in amber, repeated across the deck — the
 * framework's organising idea is that the program is gated, not calendared.
 */

const path = require('path');
const pptxgen = require('pptxgenjs');

const NAVY = '0E3A4F';
const NAVY_D = '072735';
const TEAL = '1B6B7C';
const TEAL_L = '3E8FA3';
const ICE = 'E8F1F4';
const ICE_D = 'D3E3E8';
const AMBER = 'F2A33C';
const WHITE = 'FFFFFF';
const INK = '13232B';
const MUTED = '5F7079';

const HEAD = 'Cambria';
const BODY = 'Calibri';

const W = 13.3, H = 7.5, M = 0.55;
const CW = W - M * 2;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Design Studio Program Office';
pres.title = 'JazzX Design Studio — 90-Day Framework';

/* --------------------------------------------------------------- helpers */

const shadow = () => ({ type: 'outer', color: '0E3A4F', blur: 10, offset: 2, angle: 90, opacity: 0.10 });

function slide(dark = false) {
  const s = pres.addSlide();
  s.background = { color: dark ? NAVY : WHITE };
  return s;
}

/** Title block. No rule, no stripe — whitespace does the separating. */
function title(s, text, sub, dark = false) {
  s.addText(text, {
    x: M, y: 0.42, w: CW, h: 0.72, margin: 0,
    fontFace: HEAD, fontSize: 32, bold: true,
    color: dark ? WHITE : NAVY, valign: 'middle',
  });
  if (sub) {
    s.addText(sub, {
      x: M, y: 1.16, w: CW, h: 0.42, margin: 0,
      fontFace: BODY, fontSize: 14, italic: true,
      color: dark ? TEAL_L : MUTED, valign: 'middle',
    });
  }
}

function card(s, o) {
  s.addShape(pres.ShapeType.roundRect, {
    x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.08,
    fill: { color: o.fill || ICE },
    line: { color: o.line || ICE_D, width: 1 },
    shadow: o.flat ? undefined : shadow(),
  });
}

/** The motif: a numbered/lettered disc. */
function disc(s, o) {
  s.addShape(pres.ShapeType.ellipse, {
    x: o.x, y: o.y, w: o.d, h: o.d,
    fill: { color: o.fill || AMBER },
    line: { color: o.fill || AMBER, width: 0 },
  });
  s.addText(o.label, {
    x: o.x, y: o.y, w: o.d, h: o.d, margin: 0,
    fontFace: HEAD, fontSize: o.size || 13, bold: true,
    color: o.color || NAVY, align: 'center', valign: 'middle',
  });
}

function txt(s, text, o) {
  s.addText(text, {
    margin: 0, fontFace: o.head ? HEAD : BODY,
    fontSize: o.size || 12, color: o.color || INK,
    bold: o.bold, italic: o.italic, align: o.align || 'left',
    valign: o.valign || 'top', lineSpacingMultiple: o.lsm,
    x: o.x, y: o.y, w: o.w, h: o.h,
  });
}

function bullets(s, items, o) {
  s.addText(items.map((t, i) => ({
    text: t,
    options: { bullet: true, breakLine: i < items.length - 1 },
  })), {
    x: o.x, y: o.y, w: o.w, h: o.h, margin: 0,
    fontFace: BODY, fontSize: o.size || 11.5, color: o.color || INK,
    paraSpaceAfter: o.gap === undefined ? 5 : o.gap, valign: 'top',
  });
}

/* ================================================================ SLIDE 1 */
{
  const s = slide(true);
  s.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: W, h: H, fill: { color: NAVY } });

  txt(s, 'JazzX Design Studio', { x: M, y: 1.75, w: 9.6, h: 0.9, head: true, size: 44, bold: true, color: WHITE });
  txt(s, 'A 90-Day Implementation Framework', { x: M, y: 2.68, w: 9.6, h: 0.6, head: true, size: 26, color: TEAL_L });
  txt(s,
    'From studio launch to a defensible go / no-go decision — gated, shadow-first, and measured against a baseline locked before anything changes.',
    { x: M, y: 3.55, w: 9.2, h: 0.9, size: 14.5, color: 'BCD3DB', lsm: 1.25 });

  ['G0', 'G1', 'G2', 'G3', 'G4'].forEach((g, i) => {
    disc(s, { x: M + i * 0.86, y: 5.15, d: 0.62, label: g, size: 13 });
  });
  txt(s, 'Five gates. Each one a decision, not a checkpoint.',
    { x: M, y: 5.95, w: 8, h: 0.3, size: 11.5, italic: true, color: TEAL_L });

  txt(s, 'Prepared for the lender programme team  ·  Confidential — no external circulation before G4',
    { x: M, y: 6.72, w: CW, h: 0.3, size: 10, color: '7C99A4' });

  s.addNotes('Lender-side framework. Shadow-first: Jazz runs in parallel on real loans while humans decide everything, graduating to a narrow live slice only after Gate 2.');
}

/* ================================================================ SLIDE 2 */
{
  const s = slide();
  title(s, 'What this studio has to produce', 'Three outputs. Everything in the framework serves one of them.');

  const items = [
    ['1', 'A defensible number',
      'What Jazz is worth per loan, net of licence, integration and the review overhead the new workflow adds — computed by Finance, not by the studio.'],
    ['2', 'A decision nobody can relitigate',
      'Criteria signed before the evidence exists, must-pass conditions that no score can override, and a pre-costed consequence for every outcome including Stop.'],
    ['3', 'A capability we keep',
      'A team that can tune, diagnose and extend Jazz on Day 91 without the vendor in the room — or a priced dependency we entered with our eyes open.'],
  ];

  items.forEach(([n, h, b], i) => {
    const x = M + i * (CW / 3 + 0.06) - i * 0.06;
    const w = (CW - 0.6) / 3;
    const xx = M + i * (w + 0.3);
    card(s, { x: xx, y: 1.95, w, h: 3.55 });
    disc(s, { x: xx + 0.35, y: 2.3, d: 0.72, label: n, size: 20 });
    txt(s, h, { x: xx + 0.35, y: 3.2, w: w - 0.7, h: 0.5, head: true, size: 17, bold: true, color: NAVY });
    txt(s, b, { x: xx + 0.35, y: 3.78, w: w - 0.7, h: 1.5, size: 12, color: INK, lsm: 1.2 });
  });

  txt(s, 'A studio that cannot produce a credible no-go was never producing evidence.',
    { x: M, y: 5.95, w: CW, h: 0.4, size: 14, italic: true, color: TEAL, head: true });

  s.addNotes('The third output is the one most pilots skip and most regret at scale.');
}

/* ================================================================ SLIDE 3 */
{
  const s = slide();
  title(s, 'The gate model', 'Each gate is a scheduled decision with three outcomes: Advance, Extend, or Stop.');

  const gates = [
    ['G0', 'Day 0', 'Are we able to start?', ['Team named and released', 'Security signed off', 'Governance chartered', 'Slice selected']],
    ['G1', 'Day 30', 'Do we know what "before" looks like?', ['Baseline locked', '60+ loans observed', 'Attested by Underwriting']],
    ['G2', 'Day 60', 'Accurate enough to touch a live loan?', ['Shadow accuracy vs. thresholds', 'Tuning change log', 'Compliance sign-off']],
    ['G3', 'Day 80', 'Does it hold up in production?', ['Live quality + cycle-time', 'Zero open borrower defects', 'Ops readiness']],
    ['G4', 'Day 90', 'Scale, narrow, extend or stop?', ['Full evidence pack', 'Business case', 'Costed scale plan']],
  ];

  const w = (CW - 4 * 0.22) / 5;
  gates.forEach(([g, d, q, ev], i) => {
    const x = M + i * (w + 0.22);
    card(s, { x, y: 1.9, w, h: 3.6, fill: i === 1 || i === 4 ? ICE : 'F5F9FA' });
    disc(s, { x: x + w / 2 - 0.31, y: 2.15, d: 0.62, label: g });
    txt(s, d, { x, y: 2.86, w, h: 0.26, size: 11, bold: true, color: TEAL, align: 'center' });
    txt(s, q, { x: x + 0.18, y: 3.2, w: w - 0.36, h: 0.85, head: true, size: 12.5, bold: true, color: NAVY, align: 'center' });
    bullets(s, ev, { x: x + 0.2, y: 4.1, w: w - 0.36, h: 1.4, size: 10, color: MUTED, gap: 4 });
  });

  txt(s, 'G1 and G4 are the two that cannot be compressed: a baseline cannot be rebuilt after the fact, and a decision without pre-signed criteria is an argument.',
    { x: M, y: 5.75, w: CW, h: 0.5, size: 12.5, italic: true, color: MUTED });
}

/* ================================================================ SLIDE 4 */
{
  const s = slide();
  title(s, 'Ninety days, five phases', 'Gated, not calendar-driven — a phase that has not met its gate does not advance because the date arrived.');

  const ph = [
    ['0', 'Mobilize', '−14 to 0', 'Team, governance, security review, slice selection, baseline instrumentation'],
    ['1', 'Observe & Baseline', 'Days 1–30', 'Structured observation of real work; shadow starts ~Day 15; baseline locked'],
    ['2', 'Shadow & Tune', 'Days 31–60', 'Volume shadow processing; weekly tuning cycle; accuracy tracked to threshold'],
    ['3', 'Limited Live', 'Days 61–80', 'Narrow slice live with 100% human review; comms activated; defect triage'],
    ['4', 'Evidence & Decision', 'Days 81–90', 'Evidence pack, business case, costed scale plan, G4 decision'],
  ];

  const w = (CW - 4 * 0.2) / 5;
  ph.forEach(([n, name, days, body], i) => {
    const x = M + i * (w + 0.2);
    const dark = i === 3;
    card(s, { x, y: 2.05, w, h: 3.0, fill: dark ? NAVY : ICE, line: dark ? NAVY : ICE_D });
    disc(s, { x: x + 0.22, y: 2.28, d: 0.5, label: n, size: 15 });
    txt(s, name, { x: x + 0.8, y: 2.3, w: w - 1, h: 0.48, head: true, size: 13.5, bold: true, color: dark ? WHITE : NAVY, valign: 'middle' });
    txt(s, days, { x: x + 0.22, y: 2.92, w: w - 0.44, h: 0.28, size: 11.5, bold: true, color: dark ? AMBER : TEAL });
    txt(s, body, { x: x + 0.22, y: 3.3, w: w - 0.44, h: 1.9, size: 11, color: dark ? 'C9DDE4' : INK, lsm: 1.2 });
    if (i < 4) {
      s.addShape(pres.ShapeType.triangle, {
        x: x + w + 0.045, y: 3.42, w: 0.12, h: 0.2,
        fill: { color: TEAL_L }, line: { color: TEAL_L, width: 0 }, rotate: 90,
      });
    }
  });

  txt(s, 'Phase 3 is the only place genuine cycle-time evidence exists — which is why it is the phase to protect when the schedule tightens.',
    { x: M, y: 5.4, w: CW, h: 0.5, size: 13, italic: true, color: TEAL, head: true });
}

/* ================================================================ SLIDE 5 */
{
  const s = slide();
  title(s, 'Shadow first, then a narrow live slice', 'The human decides every loan through Day 80. That is the studio\'s primary control.');

  const colW = (CW - 0.45) / 2;

  card(s, { x: M, y: 1.95, w: colW, h: 3.9, fill: ICE });
  txt(s, 'SHADOW', { x: M + 0.4, y: 2.2, w: colW - 0.8, h: 0.35, head: true, size: 20, bold: true, color: NAVY });
  txt(s, 'Days 1–60', { x: M + 0.4, y: 2.6, w: colW - 0.8, h: 0.3, size: 12.5, bold: true, color: TEAL });
  bullets(s, [
    'Jazz processes real loans in parallel; output never reaches the file or the borrower',
    'Human forms a view first, then reviews Jazz — enforced by timestamp, because anchoring destroys the measurement',
    'Differences recorded in the comparison log — the studio\'s primary data artifact',
    'Borrower experience and SLAs identical to today',
  ], { x: M + 0.4, y: 3.05, w: colW - 0.8, h: 2.6, size: 12, gap: 8 });

  const x2 = M + colW + 0.45;
  card(s, { x: x2, y: 1.95, w: colW, h: 3.9, fill: NAVY, line: NAVY });
  txt(s, 'LIMITED LIVE', { x: x2 + 0.4, y: 2.2, w: colW - 0.8, h: 0.35, head: true, size: 20, bold: true, color: WHITE });
  txt(s, 'Days 61–80  ·  authorised at G2', { x: x2 + 0.4, y: 2.6, w: colW - 0.8, h: 0.3, size: 12.5, bold: true, color: AMBER });
  bullets(s, [
    'Jazz output enters the file as a clearly labelled proposal',
    '100% human review — no sampling; nothing stands unless affirmatively accepted',
    'Every rejection captured with a reason; adverse-action language stays human-authored',
    'Enhanced QC sampling on the cohort; defects triaged within one business day',
  ], { x: x2 + 0.4, y: 3.05, w: colW - 0.8, h: 2.6, size: 12, color: 'CFE1E7', gap: 8 });

  txt(s, 'A loan leaves the studio immediately if an SLA is at risk, a borrower is affected, or the underwriter simply judges it is not serving the file — no justification required.',
    { x: M, y: 6.1, w: CW, h: 0.5, size: 12.5, italic: true, color: MUTED });
}

/* ================================================================ SLIDE 6 */
{
  const s = slide();
  title(s, 'Scope: one narrow slice', 'Narrow enough to reach a usable sample, standard enough that the result generalises.');

  card(s, { x: M, y: 1.95, w: 4.05, h: 3.9, fill: NAVY, line: NAVY });
  txt(s, '150–200', { x: M + 0.35, y: 2.35, w: 3.35, h: 1.1, head: true, size: 60, bold: true, color: AMBER });
  txt(s, 'loans through shadow', { x: M + 0.35, y: 3.45, w: 3.35, h: 0.35, size: 14, bold: true, color: WHITE });
  txt(s, 'Below this the statistics do not support a conclusion. Volume is validated against 12 months of actuals before G0 and tracked weekly from Day 15.',
    { x: M + 0.35, y: 3.95, w: 3.35, h: 1.6, size: 12, color: 'C9DDE4', lsm: 1.2 });

  const x2 = M + 4.35;
  const cw2 = (CW - 4.35 - 0.35) / 2;

  card(s, { x: x2, y: 1.95, w: cw2, h: 3.9 });
  txt(s, 'Typical first slice', { x: x2 + 0.32, y: 2.22, w: cw2 - 0.64, h: 0.35, head: true, size: 16, bold: true, color: NAVY });
  bullets(s, [
    'Conventional conforming',
    'W-2 salaried borrowers',
    'Purchase or rate-term refinance',
    'Owner-occupied, single-family',
    'Retail channel',
    'Top three states by volume',
  ], { x: x2 + 0.32, y: 2.72, w: cw2 - 0.64, h: 3, size: 12.5, gap: 7 });

  const x3 = x2 + cw2 + 0.35;
  card(s, { x: x3, y: 1.95, w: cw2, h: 3.9, fill: 'F7F9FA' });
  txt(s, 'Deliberately excluded', { x: x3 + 0.32, y: 2.22, w: cw2 - 0.64, h: 0.35, head: true, size: 16, bold: true, color: NAVY });
  bullets(s, [
    'Self-employed / complex income',
    'Non-QM, jumbo, portfolio',
    'Government lending (FHA/VA/USDA)',
    'Construction and renovation',
    'States with distinct AI rules',
    'New channels or new teams',
  ], { x: x3 + 0.32, y: 2.72, w: cw2 - 0.64, h: 3, size: 12.5, color: MUTED, gap: 7 });

  txt(s, 'The objection that this segment is "already easy" misreads the purpose: the studio establishes whether Jazz works and what it is worth — not how hard a test it can survive.',
    { x: M, y: 6.1, w: CW, h: 0.5, size: 12.5, italic: true, color: MUTED });
}

/* ================================================================ SLIDE 7 */
{
  const s = slide();
  title(s, 'A small, protected team', 'Six to eight named seats with funded capacity relief — not volunteers on top of a full pipeline.');

  const seats = [
    ['Design Studio Lead', '100%', 'Full time. Not a 20% role.'],
    ['Senior underwriter', '50–75%', 'A respected sceptic, not an enthusiast'],
    ['Second underwriter', '50%', 'Different tenure — finds different failures'],
    ['Senior processor', '50%', 'Owns document and condition reality'],
    ['Data / BI analyst', '50%', 'Must defend numbers to Finance'],
    ['IT / integration', '25–50%', 'Named LOS access, not a ticket queue'],
    ['Compliance liaison', '10–20%', 'Weekly, not just at gates'],
    ['JazzX engagement lead', 'Per SOW', 'Named individual, contracted presence'],
  ];

  const w = (CW - 3 * 0.24) / 4;
  seats.forEach(([role, pct, note], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = M + col * (w + 0.24), y = 2.0 + row * 1.72;
    card(s, { x, y, w, h: 1.5, fill: row === 0 ? ICE : 'F7F9FA' });
    txt(s, role, { x: x + 0.24, y: y + 0.2, w: w - 0.48, h: 0.5, head: true, size: 13, bold: true, color: NAVY });
    txt(s, pct, { x: x + 0.24, y: y + 0.72, w: w - 0.48, h: 0.26, size: 12, bold: true, color: TEAL });
    txt(s, note, { x: x + 0.24, y: y + 1.0, w: w - 0.48, h: 0.42, size: 10.5, color: MUTED, lsm: 1.1 });
  });

  txt(s, 'Capacity relief that exists only on paper is the single most common cause of studio failure — shadow mode adds 15–25% touch time per loan before it removes any.',
    { x: M, y: 5.65, w: CW, h: 0.5, size: 12.5, italic: true, color: TEAL, head: true });
}

/* ================================================================ SLIDE 8 */
{
  const s = slide();
  title(s, 'What we measure', 'Three value families, plus a guardrail set that must not degrade.');

  const fams = [
    ['Labor', TEAL, ['Underwriter touch time per loan', 'Processor touch time', 'Touches per loan', 'Condition clearing effort', 'Review overhead — the new cost'],
      'Touch time, never headcount. Elapsed time is not touch time.'],
    ['Quality', TEAL, ['Document recognition accuracy', 'Data extraction accuracy, weighted', 'Condition precision and recall', 'False clear rate', 'Rework and post-close defects'],
      'False clears and false conditions are not symmetric. Separate thresholds.'],
    ['Cycle-time', TEAL, ['Decision turn time', 'Condition turn time', 'Application to CTC', 'Queue / dwell time', 'Touch vs. waiting ratio'],
      'Shadow cannot measure this. Only Phase 3 produces real evidence.'],
  ];

  const w = (CW - 2 * 0.3) / 3;
  fams.forEach(([name, c, items, caution], i) => {
    const x = M + i * (w + 0.3);
    card(s, { x, y: 1.9, w, h: 3.3 });
    txt(s, name, { x: x + 0.3, y: 2.12, w: w - 0.6, h: 0.4, head: true, size: 19, bold: true, color: NAVY });
    bullets(s, items, { x: x + 0.3, y: 2.62, w: w - 0.6, h: 1.7, size: 11.5, gap: 5 });
    txt(s, caution, { x: x + 0.3, y: 4.42, w: w - 0.6, h: 0.65, size: 10.5, italic: true, color: TEAL, lsm: 1.15 });
  });

  card(s, { x: M, y: 5.4, w: CW, h: 1.35, fill: NAVY, line: NAVY });
  txt(s, 'GUARDRAILS — must not degrade', { x: M + 0.35, y: 5.58, w: 4, h: 0.3, head: true, size: 12.5, bold: true, color: AMBER });
  txt(s, 'Credit quality  ·  Fair lending  ·  Borrower complaints  ·  Employee sentiment  ·  Investor & agency compliance  ·  Data security',
    { x: M + 0.35, y: 5.96, w: CW - 0.7, h: 0.55, size: 12, color: WHITE });
  txt(s, 'A breach blocks the gate regardless of how strong the headline numbers are.',
    { x: M + 4.6, y: 5.58, w: CW - 4.95, h: 0.3, size: 11.5, italic: true, color: '9FBECA', align: 'right' });
}

/* ================================================================ SLIDE 9 */
{
  const s = slide(true);
  title(s, 'The baseline is the critical path', 'Not the integration. Not the tuning.', true);

  txt(s, 'A baseline cannot be reconstructed after Jazz begins influencing the workflow.',
    { x: M, y: 2.12, w: 11.2, h: 0.95, head: true, size: 24, bold: true, color: WHITE, lsm: 1.15 });

  const items = [
    ['Locked at G1', 'Day 30, attested by Finance and Underwriting, never revised afterward using post-Jazz data'],
    ['Four sources', 'LOS events, structured observation, QC review, participant time diary — triangulated, never one alone'],
    ['Paired where possible', 'Shadow runs Jazz on the same loans humans work, so most quality metrics are paired — far more powerful than comparing separate groups'],
    ['Honest about power', 'Detecting a 20%→15% shift needs ~900 loans per arm. Report what the sample supports and label the rest directional'],
  ];

  const w = (CW - 3 * 0.28) / 4;
  items.forEach(([h, b], i) => {
    const x = M + i * (w + 0.28);
    card(s, { x, y: 3.4, w, h: 2.55, fill: '11475C', line: '1E5C74', flat: true });
    txt(s, h, { x: x + 0.28, y: 3.62, w: w - 0.56, h: 0.6, head: true, size: 15, bold: true, color: AMBER });
    txt(s, b, { x: x + 0.28, y: 4.24, w: w - 0.56, h: 1.6, size: 11.5, color: 'C9DDE4', lsm: 1.2 });
  });

  txt(s, 'If Phase 1 slips, extend Phase 1 — never compress it.',
    { x: M, y: 6.2, w: CW, h: 0.4, head: true, size: 15, italic: true, color: TEAL_L });
}

/* =============================================================== SLIDE 10 */
{
  const s = slide();
  title(s, 'The weekly loop', 'Ninety minutes that convert observation into change. Never cancelled.');

  const ag = [
    ['0–10', 'What changed', 'Every item closed since last week, named with who raised it. This is what keeps people contributing.'],
    ['10–25', 'The numbers', 'Volume, completion rate, accuracy trend, defects — trajectory against sample and thresholds.'],
    ['25–50', 'Case review', 'Two or three real loans where human and Jazz disagreed, worked with the file open. The highest-value 25 minutes in the program.'],
    ['50–70', 'Tuning backlog', 'Prioritise on frequency × severity, assign owners, agree what ships this week.'],
    ['70–90', 'Blockers, then decisions read back', 'A session that produces discussion but no written decision list has failed.'],
  ];

  ag.forEach(([mins, h, b], i) => {
    const y = 1.95 + i * 0.92;
    card(s, { x: M, y, w: CW, h: 0.8, fill: i % 2 ? 'F7F9FA' : ICE, flat: true });
    txt(s, mins, { x: M + 0.25, y: y + 0.05, w: 0.95, h: 0.7, head: true, size: 14, bold: true, color: TEAL, align: 'center', valign: 'middle' });
    txt(s, h, { x: M + 1.35, y: y + 0.05, w: 2.9, h: 0.7, head: true, size: 13.5, bold: true, color: NAVY, valign: 'middle' });
    txt(s, b, { x: M + 4.4, y: y + 0.05, w: CW - 4.7, h: 0.7, size: 12, color: INK, valign: 'middle', lsm: 1.1 });
  });

  txt(s, 'Deliberately include the cases where Jazz was right and the human was wrong — the highest-value cases, and the least likely to be volunteered.',
    { x: M, y: 6.62, w: CW, h: 0.4, size: 12.5, italic: true, color: MUTED });
}

/* =============================================================== SLIDE 11 */
{
  const s = slide();
  title(s, 'Tuning — and the capability we keep', 'If only JazzX can change it at Day 91, we bought a service, not a capability.');

  const steps = [
    ['Days 1–15', 'Watch', 'JazzX makes changes; we observe and ask. No expectation of independence.'],
    ['Days 16–30', 'Specify', 'We write the change specification; JazzX implements. Builds precision before mechanics.'],
    ['Days 31–45', 'Pair', 'We drive with JazzX alongside. Builder Studio access live for 3+ named people.'],
    ['Days 46–70', 'Do', 'We implement; JazzX reviews. Every change is ours.'],
    ['Days 71–90', 'Own', 'JazzX on escalation only. Independence formally assessed at Day 85.'],
  ];

  const w = (CW - 4 * 0.2) / 5;
  steps.forEach(([d, name, b], i) => {
    const x = M + i * (w + 0.2);
    const hot = i >= 3;
    card(s, { x, y: 2.0, w, h: 2.75, fill: hot ? NAVY : ICE, line: hot ? NAVY : ICE_D });
    txt(s, d, { x: x + 0.24, y: 2.22, w: w - 0.48, h: 0.28, size: 11, bold: true, color: hot ? AMBER : TEAL });
    txt(s, name, { x: x + 0.24, y: 2.54, w: w - 0.48, h: 0.42, head: true, size: 19, bold: true, color: hot ? WHITE : NAVY });
    txt(s, b, { x: x + 0.24, y: 3.04, w: w - 0.48, h: 1.5, size: 11, color: hot ? 'C9DDE4' : INK, lsm: 1.2 });
  });

  card(s, { x: M, y: 5.0, w: CW, h: 1.5, fill: 'F7F9FA' });
  txt(s, 'Measurement discipline', { x: M + 0.35, y: 5.2, w: 3.2, h: 0.32, head: true, size: 14, bold: true, color: NAVY });
  bullets(s, [
    'One substantive change per surface per cycle — or the effect cannot be attributed',
    'Weekly freeze, version tag on every studio loan, full regression set every cycle',
  ], { x: M + 3.7, y: 5.2, w: 4.3, h: 1.1, size: 11.5, gap: 4 });
  bullets(s, [
    'A clean holdout of 30–40 early loans, never tuned against',
    'Re-run at Day 45, 60, 85 — the only way to separate real improvement from us getting used to it',
  ], { x: M + 8.2, y: 5.2, w: CW - 8.55, h: 1.1, size: 11.5, gap: 4 });
}

/* =============================================================== SLIDE 12 */
{
  const s = slide();
  title(s, 'The Day 90 decision', 'Four outcomes, not two. Criteria signed before the evidence exists.');

  card(s, { x: M, y: 1.9, w: 5.1, h: 4.3, fill: ICE });
  txt(s, 'Eight must-pass criteria', { x: M + 0.32, y: 2.12, w: 4.46, h: 0.36, head: true, size: 16, bold: true, color: NAVY });
  txt(s, 'Absolute. No weighted score, however strong, overrides a failure.',
    { x: M + 0.32, y: 2.5, w: 4.46, h: 0.36, size: 11, italic: true, color: TEAL });
  bullets(s, [
    'No unremediated borrower-impacting defect',
    'False clear rate no worse than baseline',
    'Compliance sign-off for production use',
    'Model risk validation satisfied to tier',
    'Adverse-action articulability demonstrated',
    'No adverse fair lending pattern',
    'Zero unresolved security incidents',
    'Vendor viability acceptable at scale',
  ], { x: M + 0.32, y: 2.94, w: 4.46, h: 3.1, size: 11.5, gap: 5 });

  const x2 = M + 5.45;
  const w2 = (CW - 5.45 - 0.3) / 2;
  const outs = [
    ['Scale', 'All must-pass clear, weighted ≥ 3.5', 'Budget released to the pre-agreed figure; team stood up in 30 days', NAVY, true],
    ['Narrow', 'Value concentrated in part of the slice', 'Production use continues only where value was proven; contract right-sized', ICE, false],
    ['Extend', 'Genuinely inconclusive, not disappointing', 'One use only, 60 days maximum, written statement of what will differ', ICE, false],
    ['Stop', 'Any must-pass fails, or weighted < 2.5', 'Defined end date, contract exit, findings published, team recognised', 'F7F9FA', false],
  ];
  outs.forEach(([name, when, cons, fill, dark], i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = x2 + col * (w2 + 0.3), y = 1.9 + row * 2.2;
    card(s, { x, y, w: w2, h: 2.0, fill, line: dark ? NAVY : ICE_D });
    txt(s, name, { x: x + 0.28, y: y + 0.18, w: w2 - 0.56, h: 0.4, head: true, size: 19, bold: true, color: dark ? WHITE : NAVY });
    txt(s, when, { x: x + 0.28, y: y + 0.62, w: w2 - 0.56, h: 0.34, size: 11, bold: true, color: dark ? AMBER : TEAL, lsm: 1.1 });
    txt(s, cons, { x: x + 0.28, y: y + 1.02, w: w2 - 0.56, h: 0.85, size: 11, color: dark ? 'C9DDE4' : INK, lsm: 1.15 });
  });

  txt(s, 'If the Stop row cannot be costed at G0, the organisation is not running a studio — it is running a rollout with a pilot label.',
    { x: M, y: 6.42, w: CW, h: 0.4, size: 12.5, italic: true, color: TEAL, head: true });
}

/* =============================================================== SLIDE 13 */
{
  const s = slide();
  title(s, 'What will actually go wrong', 'The five failure modes worth designing against now.');

  const risks = [
    ['Capacity relief exists on paper only', 'Participants rush the comparison step; the quality data reflects hurried humans, and the G2 read is wrong in a direction nobody can detect.', 'Implemented in assignment rules; comparison completion rate watched weekly'],
    ['The baseline never locks', '"The data is not clean yet" becomes permanent, and at Day 90 there is nothing to compare against.', 'Time-boxed to Phase 1; lock with documented limitations rather than chasing perfection'],
    ['Thresholds move to fit the result', 'The decision becomes an argument about what counts as success.', 'Signed and dated before G2 evidence exists; held by Finance'],
    ['Anchoring contaminates the comparison', 'Participants look at Jazz first when busy; recall measurement becomes meaningless.', 'Enforced by timestamp, spot-checked weekly, contaminated entries excluded'],
    ['Capability never transfers', 'At Day 91 only JazzX can change anything, and the scale decision carries an unpriced dependency.', 'Tracked deliverable with a formal Day 85 independence assessment'],
  ];

  risks.forEach(([h, why, mit], i) => {
    const y = 2.04 + i * 0.96;
    card(s, { x: M, y, w: CW, h: 0.86, fill: i % 2 ? 'F7F9FA' : ICE, flat: true });
    disc(s, { x: M + 0.22, y: y + 0.23, d: 0.4, label: String(i + 1), size: 12 });
    txt(s, h, { x: M + 0.78, y: y + 0.08, w: 3.15, h: 0.7, head: true, size: 12.5, bold: true, color: NAVY, valign: 'middle' });
    txt(s, why, { x: M + 4.05, y: y + 0.08, w: 4.5, h: 0.7, size: 10.8, color: INK, valign: 'middle', lsm: 1.08 });
    txt(s, mit, { x: M + 8.75, y: y + 0.08, w: CW - 9.05, h: 0.7, size: 10.8, italic: true, color: TEAL, valign: 'middle', lsm: 1.08 });
  });

  txt(s, 'Failure mode', { x: M + 0.78, y: 1.7, w: 3, h: 0.26, size: 10, bold: true, color: MUTED });
  txt(s, 'Why it matters', { x: M + 4.05, y: 1.7, w: 3, h: 0.26, size: 10, bold: true, color: MUTED });
  txt(s, 'Countermeasure', { x: M + 8.75, y: 1.7, w: 3, h: 0.26, size: 10, bold: true, color: MUTED });
}

/* =============================================================== SLIDE 14 */
{
  const s = slide();
  title(s, 'The framework pack', '22 one-pagers, each with purpose, RACI, decisions, framework, templates, cadence, definition of done and risks.');

  const groups = [
    ['Program', ['01  Master 90-Day Plan']],
    ['Logistics — Production Readiness', ['02  Governance Structure', '03  Borrower & Internal Communications', '04  Change Management']],
    ['Logistics — Define Proof of Value', ['05  Define What Value Looks Like', '06  Baseline, Targets & Thresholds', '07  Go / No-Go Decision Criteria']],
    ['Execution — Launch Studio', ['08  Launch Design Studio', '09  Small Cross-Functional Team', '10  Loan Types & Market Selection', '11  Studio vs. Current Workflow', '12  Weekly Feedback Loop', '13  Observing Real Underwriting']],
    ['Execution — Tune in Jazz', ['14  Tune in Jazz', '15  Refining Prompts & Recognition', '16  Documenting Improvement', '17  Next Technology Changes', '18  Builder Studio & Nuggets']],
    ['Technology — Integrate & Deploy', ['19  Triggering Loans to Jazz', '20  LOS Extraction & Write-Back', '21  MU Conditions Integration', '22  Minimum-Change Deployment']],
  ];

  const cols = [[0, 1], [2, 3], [4, 5]];
  const w = (CW - 2 * 0.3) / 3;
  cols.forEach((idxs, ci) => {
    const x = M + ci * (w + 0.3);
    let y = 1.95;
    idxs.forEach((gi) => {
      const [name, items] = groups[gi];
      const h = 0.68 + items.length * 0.28;
      card(s, { x, y, w, h, fill: ci === 2 ? ICE : 'F7F9FA' });
      txt(s, name, { x: x + 0.26, y: y + 0.16, w: w - 0.52, h: 0.34, head: true, size: 12.5, bold: true, color: TEAL });
      items.forEach((it, k) => {
        txt(s, it, { x: x + 0.26, y: y + 0.58 + k * 0.28, w: w - 0.52, h: 0.26, size: 11, color: NAVY });
      });
      y += h + 0.26;
    });
  });

  txt(s, 'Every template in the pack has fill-in fields rather than assumed answers — the slice, the roster, the thresholds and the decision rule are yours to set at G0.',
    { x: M, y: 6.32, w: CW, h: 0.4, size: 12.5, italic: true, color: MUTED });
}

/* =============================================================== SLIDE 15 */
{
  const s = slide(true);
  title(s, 'What we need to start', 'Eight decisions and one signature stand between here and Day 1.', true);

  const asks = [
    ['Named sponsor', 'One executive accountable for the go / no-go'],
    ['Team released', 'Six to eight seats with funded capacity relief'],
    ['Slice selected', 'Written inclusion rule, volume validated against 12 months'],
    ['Governance chartered', 'Steering, Working Group, control functions with block rights'],
    ['Security review started', 'The longest-lead dependency — start before the SOW is countersigned'],
    ['Baseline instrumented', 'Measurement live before the first shadow loan'],
    ['Thresholds drafted', 'Signed before G2 evidence exists'],
    ['Stop pre-costed', 'Exit terms and data return agreed while nobody is invested in the answer'],
  ];

  const w = (CW - 3 * 0.26) / 4;
  asks.forEach(([h, b], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = M + col * (w + 0.26), y = 2.15 + row * 1.75;
    card(s, { x, y, w, h: 1.52, fill: '11475C', line: '1E5C74', flat: true });
    txt(s, h, { x: x + 0.26, y: y + 0.2, w: w - 0.52, h: 0.42, head: true, size: 14, bold: true, color: AMBER });
    txt(s, b, { x: x + 0.26, y: y + 0.66, w: w - 0.52, h: 0.75, size: 11, color: 'C9DDE4', lsm: 1.15 });
  });

  ['G0', 'G1', 'G2', 'G3', 'G4'].forEach((g, i) => {
    disc(s, { x: M + i * 0.72, y: 5.95, d: 0.52, label: g, size: 11 });
  });
  txt(s, 'Gate 0 is the only one we control entirely. Everything after it is evidence.',
    { x: M + 4.1, y: 6.05, w: CW - 4.1, h: 0.35, size: 13, italic: true, color: TEAL_L, valign: 'middle' });

  s.addNotes('Close on the ask. G0 readiness is entirely within the lender\'s control; every later gate depends on evidence the studio has to earn.');
}

/* ------------------------------------------------------------------ save */
const out = process.argv[2] || path.join(__dirname, '..', 'JazzX-Design-Studio-Executive-Summary.pptx');
pres.writeFile({ fileName: out }).then(() => console.log('Deck written:', out));
