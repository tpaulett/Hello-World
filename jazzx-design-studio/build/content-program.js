/* One-pager 01 — the program spine that every other document hangs off. */

module.exports = [{
  id: '01',
  file: '01-Master-90-Day-Plan',
  section: 'Program',
  title: 'Master 90-Day Plan',
  strap: 'The gated sequence from studio launch to a defensible go / no-go decision.',

  purpose:
    'This document is the single source of truth for what happens when during the 90-day Design Studio, what must be true to move from one phase to the next, and what the program will deliberately not attempt. Every other one-pager in this pack plugs into a gate defined here. If a proposed activity does not serve a gate on this page, it is out of scope for the 90 days.',

  raci: [
    ['Executive Sponsor', '', 'A — owns the go / no-go'],
    ['Design Studio Lead', '', 'R — runs the program day to day'],
    ['JazzX Engagement Lead', '', 'R — owns vendor-side delivery'],
    ['Head of Underwriting', '', 'C — owns process and quality truth'],
    ['Model Risk / Compliance', '', 'C — owns control adequacy'],
    ['Steering Committee', '', 'I — informed biweekly, decides at gates'],
  ],

  decisions: [
    'The studio runs **shadow-first**: Jazz processes real loans in parallel while humans make every decision, and only graduates to limited live production after Gate 2.',
    'The program is **gated, not calendar-driven**. A phase that has not met its gate criteria does not advance because the date arrived; it extends, descopes, or stops.',
    'The **baseline is locked at Gate 1 (Day 30)** and is never revised afterward using post-Jazz data. A studio that cannot lock a baseline cannot produce a proof of value.',
    'The go / no-go decision rule is written and signed **before** Gate 2 results are visible, to prevent the threshold from moving to fit the outcome.',
    'Scope is one narrow loan-type slice. Breadth is explicitly deferred to a post-studio scale phase.',
  ],

  framework: [
    {
      heading: 'The gate model',
      body: [
        'Five gates structure the 90 days. Each gate is a scheduled decision with named attendees, pre-circulated evidence, and only three possible outcomes: **Advance**, **Extend** (with a stated number of days and what will be different), or **Stop**. "Advance with concerns" is not an outcome — a concern either blocks the gate or is logged as a risk and the gate advances cleanly.',
      ],
      tables: [{
        columns: ['Gate', 'Day', 'Question it answers', 'Evidence required'],
        widths: [0.1, 0.1, 0.36, 0.44],
        boldFirstCol: true,
        rows: [
          ['G0', 'Day 0', 'Are we able to start?',
            ['Team named and released from BAU', 'Security review signed off', 'Governance body chartered', 'Loan slice selected', 'Baseline instrumentation live']],
          ['G1', 'Day 30', 'Do we know what "before" looks like?',
            ['Locked baseline for labor, quality and cycle-time', 'Minimum 60 observed loans', 'Signed baseline attestation from Underwriting']],
          ['G2', 'Day 60', 'Is Jazz accurate enough to touch a live loan?',
            ['Shadow accuracy vs. thresholds by metric', 'Tuning change log', 'Compliance sign-off for limited live', 'Borrower comms posture agreed']],
          ['G3', 'Day 80', 'Does it hold up in production?',
            ['Live slice quality and cycle-time delta', 'Zero unremediated borrower-impacting defects', 'Ops readiness confirmation']],
          ['G4', 'Day 90', 'Do we scale, stop, or extend?',
            ['Full evidence pack', 'Business case with baseline-to-live comparison', 'Scale plan and its cost', 'Decision against pre-signed criteria']],
        ],
      }],
    },
    {
      heading: 'Phases and the work inside them',
      tables: [{
        columns: ['Phase', 'Days', 'Core work', 'Owns'],
        widths: [0.22, 0.12, 0.48, 0.18],
        boldFirstCol: true,
        rows: [
          ['0 — Mobilize', '−14 to 0',
            ['Charter governance; name and release the team; complete security and third-party risk review; select the loan slice; stand up baseline capture; agree comms posture'],
            'Studio Lead'],
          ['1 — Observe & Baseline', '1–30',
            ['Structured observation of real underwriting and fulfillment; time-and-motion capture; Jazz begins shadow processing ~Day 15; baseline assembled and locked'],
            'Studio Lead + UW'],
          ['2 — Shadow at volume & Tune', '31–60',
            ['Volume shadow processing; weekly tuning of prompts, conditions and document recognition; improvement log maintained; accuracy tracked against thresholds'],
            'Studio + JazzX'],
          ['3 — Limited Live', '61–80',
            ['Narrow slice runs live with 100% human review; borrower and internal comms activated; defect triage in-cycle; ops absorbs the new workflow'],
            'Ops + Studio'],
          ['4 — Evidence & Decision', '81–90',
            ['Evidence pack assembled; business case built; scale plan costed; G4 decision run against pre-signed criteria'],
            'Sponsor'],
        ],
      }],
    },
    {
      heading: 'Critical path',
      body: [
        'Four items carry the whole program. Slippage anywhere else is absorbable; slippage here moves Day 90.',
      ],
      steps: [
        '**Security and third-party risk review** (Phase 0). The longest-lead dependency in most lenders and the one least under the studio\'s control. Start it before the SOW is countersigned if procurement allows.',
        '**Data extraction from the LOS into Jazz** (Phase 0–1). Shadow processing cannot begin without it, and every downstream day of evidence is lost one-for-one.',
        '**Baseline lock** (Gate 1). Cannot be recovered retrospectively once Jazz is influencing the workflow. If Phase 1 slips, extend Phase 1 rather than compressing it.',
        '**Compliance sign-off for limited live** (Gate 2). Needs to be socialised from Day 30, not requested at Day 58.',
      ],
    },
    {
      heading: 'Explicitly out of scope for 90 days',
      body: [
        'Naming these up front is what protects the timeline. Each is a legitimate ambition deferred to the scale phase, not a rejection.',
      ],
      bullets: [
        'Broad loan-type coverage beyond the selected slice',
        'Full LOS write-back and system-of-record automation',
        'Removing the human reviewer from any live decision',
        'Integration with marketing, pricing, or servicing systems',
        'Headcount reduction — the studio measures labor, it does not act on it',
        'Custom model development beyond configuration and tuning within Jazz',
      ],
    },
  ],

  tables: [
    {
      title: 'Week-by-week plan',
      columns: ['Week', 'Milestone', 'Gate'],
      widths: [0.14, 0.66, 0.2],
      boldFirstCol: true,
      rows: [
        ['Pre −2/−1', 'Governance chartered, team named, security review submitted, loan slice selected', '→ G0'],
        ['W1', 'Kickoff; observation begins; baseline capture instrumented', ''],
        ['W2', 'Observation continues; LOS extraction validated; first Jazz test loans', ''],
        ['W3', 'Shadow processing begins at low volume; weekly feedback loop starts', ''],
        ['W4', 'Baseline assembled, reviewed, attested and locked', '→ G1'],
        ['W5–W6', 'Shadow volume ramps; first full tuning cycles; improvement log live', ''],
        ['W7', 'Mid-phase accuracy read; compliance engagement for live authorisation', ''],
        ['W8', 'Accuracy vs. thresholds assessed; live-readiness pack assembled', '→ G2'],
        ['W9', 'Limited live begins on narrow slice; borrower and internal comms activated', ''],
        ['W10–W11', 'Live operation; defect triage; ops absorption; cycle-time measured', ''],
        ['W12', 'Live slice performance reviewed', '→ G3'],
        ['W13', 'Evidence pack, business case and scale plan; decision', '→ G4'],
      ],
      note: 'Days are relative to kickoff (Day 1), so the calendar can shift without re-cutting the plan.',
    },
    {
      title: 'Dependencies on JazzX',
      columns: ['Dependency', 'Needed by', 'Consequence if late'],
      widths: [0.4, 0.2, 0.4],
      rows: [
        ['Environment provisioned and accessible', 'Day −7', 'Kickoff slips one-for-one'],
        ['LOS data extraction working end to end', 'Day 10', 'Shadow start slips; evidence days lost'],
        ['Named tuning engineer available weekly', 'Day 15', 'Tuning cycle stretches; G2 at risk'],
        ['Builder Studio access for our team', 'Day 30', 'Capability transfer fails; vendor dependence at Day 91'],
        ['Audit-grade output logging', 'Day 45', 'Cannot evidence quality at G2 or satisfy compliance'],
      ],
    },
  ],

  cadence: [
    ['Daily (W1–4)', 'Observation debrief — 15 minutes, studio team only', 'Observation log entries'],
    ['Weekly, Thu', 'Feedback loop — findings, tuning decisions, blockers', 'Tuning backlog, improvement log'],
    ['Biweekly', 'Steering committee — progress against gates, risks, decisions needed', 'Decision record'],
    ['At each gate', 'Gate review — evidence pre-circulated 48 hours ahead', 'Advance / Extend / Stop'],
    ['Monthly', 'Executive readout — one page, no deck', 'Sponsor briefing'],
  ],

  dod: [
    'All five gates held on the record with a documented Advance / Extend / Stop outcome',
    'Baseline locked and attested before any Jazz output influenced a live decision',
    'Go / no-go criteria signed before Gate 2 evidence was visible',
    'Evidence pack complete enough that someone outside the studio can audit the conclusion',
    'A costed scale plan exists whether the answer is go or no-go',
  ],

  risks: [
    ['Gates become rubber stamps under delivery pressure',
      'Written outcomes with named dissent; Compliance attends every gate and can block',
      'Executive Sponsor'],
    ['Scope creep from adjacent teams who want their loan type included',
      'Out-of-scope list is published and enforced; additions require a steering decision that moves Day 90',
      'Steering Committee'],
    ['Baseline never locks because "the data is not clean yet"',
      'Baseline is time-boxed to Phase 1 with a documented-limitations clause rather than perfection',
      'Executive Sponsor'],
    ['Vendor dependency at Day 91 — we can operate Jazz but not change it',
      'Builder Studio enablement is a tracked deliverable, not an optional extra',
      'Studio Lead'],
    ['Team pulled back into BAU during peak volume',
      'Named seats with backfill agreed at G0; sponsor re-confirms release at each gate',
      'Executive Sponsor'],
  ],
}];
