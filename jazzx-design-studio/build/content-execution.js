/* One-pagers 08–18 — Execution: Launch Design Studio and Tune in Jazz. */

module.exports = [

/* ------------------------------------------------ 08 LAUNCH (OVERVIEW) -- */
{
  id: '08',
  file: '08-Launch-Design-Studio-Overview',
  section: 'Execution — Launch Design Studio',
  title: 'Launch Design Studio',
  strap: 'Standing up a small, protected team that runs real loans through a parallel path.',

  purpose:
    'To define what the Design Studio actually is as an operating unit: who is in it, what work flows through it, how that work differs from the standard workflow, and how it learns each week. This is the umbrella for one-pagers 09 through 13, each of which details one component. Read this first; the others are the operating detail.',

  raci: [
    ['Design Studio Lead', '', 'A — owns the studio as an operating unit'],
    ['Head of Underwriting', '', 'A — releases the people, owns process truth'],
    ['Head of Operations', '', 'C — workflow and capacity impact'],
    ['JazzX Engagement Lead', '', 'R — vendor-side delivery and enablement'],
    ['Executive Sponsor', '', 'A — protects the studio from BAU reabsorption'],
  ],

  decisions: [
    'The studio is a **small, named, protected team** — not a committee and not a side-of-desk assignment. Six to eight people with real capacity relief beats twenty with none.',
    'The studio runs a **parallel path**: real loans, real files, real conditions, with the standard workflow remaining the system of record throughout the shadow phase.',
    'The studio is **co-located or reliably co-present** for at least the first two weeks. Observation and rapid learning do not survive a fully asynchronous start.',
    'The studio **owns its own backlog**. Tuning priorities are set inside the weekly loop by the people doing the work, not by a steering committee reading a report.',
    'The studio is **time-boxed to 90 days** and either converts to a permanent capability at G4 or dissolves. It does not quietly persist.',
  ],

  framework: [
    {
      heading: 'The five components',
      tables: [{
        columns: ['Component', 'Detail in', 'The one thing that matters'],
        widths: [0.3, 0.16, 0.54],
        boldFirstCol: true,
        rows: [
          ['Small cross-functional team', 'One-pager 09', 'Named seats with funded capacity relief — not volunteers on top of a full pipeline'],
          ['Loan types and market', 'One-pager 10', 'Narrow enough to reach sample size, representative enough that the result generalises'],
          ['Process design vs. current workflow', 'One-pager 11', 'An unambiguous rule for when a loan leaves the studio and returns to the standard path'],
          ['Weekly feedback loop', 'One-pager 12', 'Every cycle ends with a decision and a visible change, or participants stop contributing'],
          ['Observing real activity', 'One-pager 13', 'Watch what people do, not what the process document says they do'],
        ],
      }],
    },
    {
      heading: 'What a studio loan actually looks like',
      steps: [
        'A loan matching the slice definition enters the pipeline and is tagged for the studio cohort.',
        'The file is worked normally by the studio underwriter or processor — the standard workflow is unchanged and remains the system of record.',
        'In parallel, the file is processed by Jazz: documents recognised, data extracted, conditions proposed.',
        'The studio participant reviews the Jazz output **after** forming their own view, so the comparison is not anchored by seeing the answer first.',
        'Differences are recorded in the comparison log: what Jazz caught that the human did not, what the human caught that Jazz did not, and what Jazz got wrong.',
        'The human decision stands. Jazz output never reaches the borrower or the file during the shadow phase.',
        'Differences feed the weekly loop, become tuning items, and are tracked to resolution in the improvement log.',
      ],
    },
    {
      heading: 'Sequencing that matters',
      body: [
        'Two ordering decisions do more for evidence quality than anything else in the studio, and both are easy to get wrong under time pressure.',
      ],
      bullets: [
        '**Human first, then Jazz.** If the participant sees the Jazz output before forming a view, anchoring destroys the comparison and the recall measurement becomes meaningless. Enforce it in the workflow, not by asking nicely.',
        '**Observe before you tune.** Weeks 1–2 are for watching the current process, not for improving Jazz. Tuning against a misunderstood process bakes in the misunderstanding and is expensive to unwind at Week 8.',
      ],
    },
  ],

  tables: [
    {
      title: 'Studio setup checklist — complete before G0',
      columns: ['Item', 'Owner', 'Done'],
      widths: [0.62, 0.24, 0.14],
      rows: [
        ['Team named, released, and capacity relief funded', 'Head of UW', ''],
        ['Loan slice defined with a written inclusion rule', 'Studio Lead', ''],
        ['Cohort tagging working in the LOS', 'IT', ''],
        ['Jazz environment provisioned and accessible', 'JazzX', ''],
        ['LOS data extraction validated end to end', 'IT + JazzX', ''],
        ['Comparison log built and tested with a real file', 'Studio Lead', ''],
        ['Baseline instrumentation live', 'Data analyst', ''],
        ['Studio space and weekly meeting slot secured', 'Studio Lead', ''],
        ['Security review signed off', 'InfoSec', ''],
        ['Kickoff communication delivered', 'Sponsor', ''],
      ],
    },
    {
      title: 'Volume plan — track weekly from Day 15',
      columns: ['Phase', 'Target studio loans / week', 'Cumulative', 'Purpose'],
      widths: [0.24, 0.26, 0.2, 0.3],
      rows: [
        ['Weeks 3–4', '5–10', '10–20', 'Prove the mechanics work'],
        ['Weeks 5–8', '20–30', '90–140', 'Build the quality sample'],
        ['Weeks 9–12', '15–25 (live slice)', '150–240', 'Live evidence and cycle-time'],
      ],
      note: 'A shortfall against cumulative target at Day 45 triggers a scope conversation — not a silent hope that volume recovers.',
    },
  ],

  cadence: [
    ['Daily (Weeks 1–4)', '15-minute standing debrief', 'Observation log'],
    ['Weekly, Thu', 'Feedback loop — see one-pager 12', 'Tuning backlog, decisions'],
    ['Weekly', 'Volume and completion-rate check', 'Trajectory against sample target'],
    ['Biweekly', 'Steering update', 'Gate trajectory'],
    ['At gates', 'Studio evidence contributed to the gate pack', 'Gate evidence'],
  ],

  dod: [
    'Studio operating with named people and delivered capacity relief',
    'Comparison log complete for at least 95% of studio loans',
    'Human-first sequencing enforced in the workflow, not merely requested',
    'Cumulative loan volume on track to the sample target agreed at G0',
    'Weekly loop has produced a visible change every week it has run',
  ],

  risks: [
    ['Studio reabsorbed into BAU during a volume spike',
      'Sponsor protection; named backfill; release re-confirmed at every gate',
      'Executive Sponsor'],
    ['Participants see Jazz output first and anchor on it',
      'Sequencing enforced in the workflow; spot-checked weekly',
      'Studio Lead'],
    ['Volume too low to reach a usable sample',
      'Weekly tracking from Day 15; scope conversation triggered at Day 45',
      'Studio Lead'],
    ['Tuning starts before the current process is understood',
      'Weeks 1–2 ring-fenced for observation; no tuning items accepted before Day 15',
      'Studio Lead'],
    ['Studio persists past Day 90 without a decision',
      'Time-box is in the charter; G4 converts or dissolves it',
      'Steering Committee'],
  ],
},

/* --------------------------------------------------------- 09 TEAM ------ */
{
  id: '09',
  file: '09-Small-Cross-Functional-Team',
  section: 'Execution — Launch Design Studio',
  title: 'Small Cross-Functional Team',
  strap: 'Six to eight named seats, genuinely released, deliberately mixed.',

  purpose:
    'To specify who sits in the studio, how much of their time it takes, how they are selected, and what protects them from being pulled back into business as usual. Team composition is the single largest predictor of whether a 90-day studio produces usable evidence.',

  raci: [
    ['Head of Underwriting', '', 'A — releases underwriting capacity'],
    ['Head of Operations', '', 'A — releases processing capacity'],
    ['Studio Lead', '', 'R — selects and runs the team'],
    ['HR', '', 'C — backfill, recognition, development framing'],
    ['Executive Sponsor', '', 'A — funds the relief and defends the release'],
  ],

  decisions: [
    '**Six to eight people.** Below five the sample and the perspective are too thin; above ten the weekly loop stops functioning as a working session.',
    'Seats are **named individuals with a named backfill**, not roles filled by whoever is available that week. Rotating bodies through the studio destroys the learning curve.',
    'Underwriting and processing participants are released at a **minimum of 50%**, and the released time is backfilled or the pipeline is reduced. Relief that exists only on paper is the most common cause of studio failure.',
    'The team deliberately mixes **experience levels** — a highly experienced sceptic is more valuable than three enthusiasts, and results drawn only from top performers do not generalise.',
    'The Studio Lead is **full time**. This is not a role that can be run at 20% alongside another job.',
  ],

  framework: [
    {
      heading: 'The seats',
      tables: [{
        columns: ['Seat', 'Time', 'Why they are essential', 'Selection note'],
        widths: [0.22, 0.1, 0.36, 0.32],
        boldFirstCol: true,
        rows: [
          ['Design Studio Lead', '100%', 'Runs the program, owns the backlog, protects the method', 'Credible with underwriters and with executives; this pairing is rare and worth searching for'],
          ['Senior underwriter', '50–75%', 'The quality ground truth; judges what Jazz got right', 'Pick a respected sceptic, not an enthusiast'],
          ['Second underwriter', '50%', 'Sample size and a second opinion on disagreements', 'Different experience level from the first'],
          ['Senior processor', '50%', 'Owns the document and condition reality', 'Deep familiarity with where documents actually go wrong'],
          ['Data / BI analyst', '50%', 'Builds the baseline and the measurement', 'Must be able to defend numbers to Finance'],
          ['IT / integration engineer', '25–50%', 'LOS extraction, cohort tagging, data flow', 'Named access to the LOS, not a ticket queue'],
          ['Compliance liaison', '10–20%', 'Keeps control functions ahead of the work rather than behind it', 'Attends the weekly loop, not just gates'],
          ['JazzX engagement lead', 'Per SOW', 'Tuning, enablement, escalation into the vendor', 'Named individual, weekly presence contracted'],
        ],
      }],
    },
    {
      heading: 'Selecting participants',
      bullets: [
        'Choose the **respected sceptic** over the volunteer enthusiast. If they conclude Jazz helps, the organisation believes it; the enthusiast\'s endorsement converts nobody.',
        'Mix tenure deliberately — a 15-year underwriter and a 2-year underwriter find completely different failure modes',
        'Avoid selecting only top performers; the business case rests on the average underwriter, not the best one',
        'Exclude anyone whose role is genuinely at risk from the outcome — it is unfair to them and it corrupts the data',
        'Confirm each participant can commit for the full 90 days; mid-studio turnover costs more than a weaker initial pick',
        'Have the selection conversation individually, and be explicit about what is in it for them',
      ],
    },
    {
      heading: 'Protecting the release',
      body: [
        'Every studio loses time to BAU reabsorption. The countermeasures below are unglamorous and they work.',
      ],
      bullets: [
        'Capacity relief is written into the participant\'s objectives, not agreed verbally with a supervisor',
        'Pipeline reduction is implemented in assignment rules, so files simply do not route to them',
        'The Sponsor re-confirms the release at every gate, on the record',
        'Comparison completion rate is monitored weekly as the leading indicator of relief eroding',
        'Any pull-back of a participant requires the Sponsor, not the participant\'s line manager',
      ],
    },
  ],

  tables: [
    {
      title: 'Team roster — complete before G0',
      columns: ['Seat', 'Name', 'Release %', 'Backfill', 'Confirmed by'],
      widths: [0.26, 0.2, 0.14, 0.2, 0.2],
      rows: [
        ['Design Studio Lead', '', '100%', '', ''],
        ['Senior underwriter', '', '', '', ''],
        ['Second underwriter', '', '', '', ''],
        ['Senior processor', '', '', '', ''],
        ['Data / BI analyst', '', '', '', ''],
        ['IT / integration', '', '', '', ''],
        ['Compliance liaison', '', '', '', ''],
        ['JazzX engagement lead', '', 'Per SOW', 'n/a', ''],
      ],
    },
    {
      title: 'What each participant gets — agreed at selection',
      columns: ['Commitment to them', 'Detail'],
      widths: [0.36, 0.64],
      rows: [
        ['Capacity relief', 'Stated percentage, implemented in assignment rules'],
        ['Metrics held harmless', 'Production metrics not affected by studio participation'],
        ['Development benefit', 'Named skill or exposure they gain — Builder Studio access, AI tooling literacy'],
        ['Visibility', 'They present findings at G4 alongside the Studio Lead'],
        ['Named next step', 'What happens to their role at Day 91, whatever the outcome'],
      ],
    },
  ],

  cadence: [
    ['Pre-Day 1', 'Individual selection conversations', 'Signed participation agreement'],
    ['Weekly', 'Participation health check — is the relief real?', 'Completion rate, sentiment'],
    ['Biweekly', 'One-to-one between Studio Lead and each participant', 'Individual issues surfaced'],
    ['At each gate', 'Sponsor re-confirms release', 'On-the-record confirmation'],
    ['At G4', 'Exit interview and next-step confirmation', 'Qualitative findings, individual outcomes'],
  ],

  dod: [
    'All seats filled by named individuals before Day 1',
    'Release percentages implemented in assignment rules, not just agreed',
    'No participant rotated out mid-studio without a Sponsor decision',
    'Every participant has a named Day 91 next step before Day 90',
    'Team composition and its limitations documented in the evidence pack',
  ],

  risks: [
    ['Only enthusiasts volunteer, so the finding is not credible internally',
      'Deliberate selection of respected sceptics; composition documented at G0',
      'Head of Underwriting'],
    ['Release exists on paper only',
      'Implemented in assignment rules; weekly completion-rate monitoring',
      'Executive Sponsor'],
    ['A key participant leaves mid-studio',
      'Named backfill per seat; overlap period required for any replacement',
      'Studio Lead'],
    ['Studio Lead is part time and the program drifts',
      'Full-time requirement stated at G0 as a launch precondition',
      'Executive Sponsor'],
    ['Team drawn only from top performers',
      'Mixed tenure required; limitation disclosed in the evidence pack if unavoidable',
      'Head of Underwriting'],
  ],
},

/* --------------------------------------------------- 10 LOAN TYPES ------ */
{
  id: '10',
  file: '10-Loan-Types-and-Market-Selection',
  section: 'Execution — Launch Design Studio',
  title: 'Loan Types & Market Selection',
  strap: 'Narrow enough to prove something, representative enough that it means something.',

  purpose:
    'To select the loan slice the studio will run, using explicit criteria agreed in advance. The slice determines whether the studio can reach a usable sample, whether the result generalises to the wider portfolio, and how much regulatory surface the studio carries. Getting this wrong is expensive and cannot be corrected after Gate 1 without restarting the baseline.',

  raci: [
    ['Head of Underwriting', '', 'A — owns the selection'],
    ['Studio Lead', '', 'R — applies the criteria and documents the choice'],
    ['Data analyst', '', 'R — volume and mix analysis'],
    ['Compliance', '', 'C — state and channel regulatory surface'],
    ['Steering Committee', '', 'A — approves at G0'],
  ],

  decisions: [
    'The studio runs **one primary slice**, defined by a written inclusion rule that a person can apply to a file without judgement.',
    'The slice must deliver **150–200 loans in 90 days** at realistic volumes, or the sample argument fails before the studio begins.',
    'Prefer the **highest-volume, most standardised** segment first. Proving value on the hardest loans is a scale-phase ambition, not a studio ambition.',
    'Exclude segments that add regulatory surface without adding evidence value — the studio is not the place to test a new state, channel, or product simultaneously.',
    'The slice definition is **frozen at G1** with the baseline. Changing it afterward invalidates the comparison.',
  ],

  framework: [
    {
      heading: 'Selection criteria',
      tables: [{
        columns: ['Criterion', 'What good looks like', 'Why'],
        widths: [0.24, 0.36, 0.4],
        boldFirstCol: true,
        rows: [
          ['Volume', '150–200 loans reachable in 90 days', 'Below this the statistics do not support a conclusion'],
          ['Standardisation', 'Documentation and guidelines are consistent', 'Variability consumes sample; the studio measures Jazz, not guideline chaos'],
          ['Pain', 'The segment has real, acknowledged cost or friction', 'Value has somewhere to come from'],
          ['Representativeness', 'Findings plausibly extend to a larger share of the portfolio', 'Determines whether the business case scales'],
          ['Regulatory surface', 'Familiar states, familiar channel, no novel product', 'Keeps the studio\'s risk about AI, not about a new market'],
          ['Data availability', 'Clean historical LOS data for the baseline', 'No baseline, no proof of value'],
          ['Team fit', 'The studio underwriters genuinely know this segment', 'Ground truth requires expertise'],
        ],
      }],
    },
    {
      heading: 'Typical starting point',
      body: [
        'For most retail lenders the defensible first slice is **conventional conforming, W-2 salaried borrowers, purchase or rate-term refinance, owner-occupied, single-family, retail channel, in the lender\'s top three states by volume.** It is high volume, highly standardised, well understood by any underwriting team, and carries no novel regulatory exposure.',
        'The most common objection is that this segment is "already easy" and therefore not worth automating. That objection misreads the studio\'s purpose. The studio is establishing whether Jazz works and what it is worth, not finding the hardest possible test. Easy volume is where automation value is realised at scale in any case, and a clean answer on a standard segment is far more useful than an ambiguous answer on a complex one.',
      ],
    },
    {
      heading: 'What to exclude from the first slice',
      bullets: [
        'Self-employed and complex income — high value eventually, but variability will consume the whole sample',
        'Non-QM, jumbo, and portfolio products — different guidelines and thinner volume',
        'Government lending (FHA/VA/USDA) — additional agency requirements add surface without adding evidence',
        'Construction, renovation, and bridge — process differs too much to generalise',
        'Any state with distinct AI or automated-decisioning requirements not already assessed',
        'New channels or newly acquired teams — too many variables changing at once',
      ],
    },
  ],

  tables: [
    {
      title: 'Slice definition — written so it can be applied without judgement',
      columns: ['Dimension', 'In scope', 'Explicitly out'],
      widths: [0.28, 0.36, 0.36],
      rows: [
        ['Loan purpose', '', ''],
        ['Occupancy', '', ''],
        ['Property type', '', ''],
        ['Product / agency', '', ''],
        ['Income type', '', ''],
        ['Channel', '', ''],
        ['States', '', ''],
        ['Loan amount range', '', ''],
        ['Credit profile range', '', ''],
        ['Expected volume / week', '', ''],
      ],
      note: 'If two people applying this rule to the same file can disagree, the rule is not finished.',
    },
    {
      title: 'Volume validation — analyst completes before G0',
      columns: ['Question', 'Answer', 'Source'],
      widths: [0.5, 0.24, 0.26],
      rows: [
        ['Loans matching the slice in the last 12 months', '', 'LOS'],
        ['Average per week', '', 'LOS'],
        ['Seasonal low in the studio window', '', 'LOS'],
        ['Realistic studio capture rate', '', 'Ops'],
        ['Projected studio loans by Day 60', '', 'Derived'],
        ['Projected by Day 90', '', 'Derived'],
        ['Meets the 150–200 target?', '', ''],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'Volume and mix analysis; slice drafted', 'Draft slice definition'],
    ['At G0', 'Slice approved by Steering', 'Frozen slice definition'],
    ['Weekly', 'Actual vs. projected volume tracked', 'Volume trajectory'],
    ['Day 45', 'Volume checkpoint — scope conversation if short', 'Scope decision'],
    ['At G2', 'Confirm the live sub-slice for Phase 3', 'Live cohort definition'],
  ],

  dod: [
    'Slice defined in writing and applied consistently by two independent testers',
    'Volume projection validated against 12 months of actual data',
    'Regulatory surface confirmed by Compliance for every state in scope',
    'Baseline data confirmed available for the same slice',
    'Slice frozen at G1 and unchanged thereafter',
  ],

  risks: [
    ['Slice too narrow to reach sample size',
      'Volume validated against 12 months of actuals before G0; Day 45 checkpoint',
      'Studio Lead'],
    ['Slice too broad and variability swamps the signal',
      'Standardisation criterion applied explicitly; complex income excluded from wave one',
      'Head of Underwriting'],
    ['Pressure to include a complex segment "since we are doing this anyway"',
      'Out-of-scope list is published; additions require a Steering decision that moves Day 90',
      'Steering Committee'],
    ['Result does not generalise beyond the slice',
      'Representativeness assessed at selection and stated as a limitation at G4',
      'Finance'],
    ['Seasonal volume collapse mid-studio',
      'Seasonal low modelled in the projection, not the annual average',
      'Data analyst'],
  ],
},

/* ------------------------------------------------- 11 PROCESS DESIGN ---- */
{
  id: '11',
  file: '11-Design-Studio-vs-Current-Workflow',
  section: 'Execution — Launch Design Studio',
  title: 'Design Studio Process vs. Current Workflow',
  strap: 'The parallel path: what changes, what does not, and when a loan leaves the studio.',

  purpose:
    'To define precisely how a studio loan is handled differently from a standard loan, so that participants are never improvising and so that the comparison data means something. Ambiguity here produces inconsistent handling, which produces evidence that cannot be defended at Gate 4.',

  raci: [
    ['Head of Operations', '', 'A — owns the workflow'],
    ['Studio Lead', '', 'R — designs and maintains the studio path'],
    ['Senior underwriter / processor', '', 'C — validates it is workable'],
    ['IT', '', 'R — cohort tagging and routing'],
    ['Compliance', '', 'C — confirms the control model'],
  ],

  decisions: [
    'During shadow, the **standard workflow is unchanged and remains the system of record.** Jazz runs alongside it and touches nothing.',
    '**Human forms a view first, then reviews Jazz output.** This ordering is enforced by the workflow, because anchoring silently destroys the recall measurement.',
    'A loan **exits the studio immediately** on any of the defined exit triggers, and exits are recorded — an unrecorded exit looks like a data gap at Gate 4.',
    'In Phase 3 limited live, Jazz output enters the file, but **100% human review remains** and the human retains the decision.',
    'No studio loan ever experiences a **worse borrower outcome or a longer SLA** because it is in the studio. If the studio path is slower, the loan leaves it.',
  ],

  framework: [
    {
      heading: 'Shadow path (Days 1–60)',
      steps: [
        'Loan matches the slice rule and is tagged to the studio cohort in the LOS at application.',
        'Standard workflow proceeds exactly as today — same queues, same SLAs, same system of record.',
        'Documents are copied to Jazz via the agreed extraction. Nothing flows back.',
        'The studio participant works the file and records their own view — conditions, findings, decision — **before** opening the Jazz output.',
        'Participant opens the Jazz output and completes the comparison log.',
        'Disagreements are classified: Jazz caught something the human missed; the human caught something Jazz missed; Jazz was wrong; both agree.',
        'The human decision stands and is what the borrower receives. Jazz output never reaches the file or the borrower.',
        'Comparison entries feed the weekly loop.',
      ],
    },
    {
      heading: 'Limited live path (Days 61–80)',
      steps: [
        'Loan matches the narrower live sub-slice defined at G2 and is tagged.',
        'Jazz processes the file first; output enters the working file as a proposal, clearly labelled as system-generated.',
        'The underwriter reviews every Jazz output — 100% review, no sampling. Anything not affirmatively accepted does not stand.',
        'The underwriter accepts, edits, or rejects each item, and every rejection is captured with a reason.',
        'The human makes and owns the decision. Adverse-action language, if any, is human-authored and human-verified.',
        'The file proceeds through standard QC with the studio cohort flagged for enhanced sampling.',
        'Defects are triaged within one business day and severity-classified per one-pager 02.',
      ],
    },
    {
      heading: 'Exit triggers — the loan returns to the standard path immediately',
      bullets: [
        'The file is at risk of missing an SLA or a contractual closing date',
        'The borrower complains, or a borrower-facing issue arises from the studio path',
        'Jazz is unavailable or its output is materially wrong on that file',
        'The file moves outside the slice definition (product change, income type change, state change)',
        'The underwriter judges the studio path is not serving the borrower — no justification required, and the judgement is never questioned',
        'Any Sev 1 event anywhere in the studio pauses the whole cohort by default',
      ],
    },
  ],

  tables: [
    {
      title: 'What changes and what does not',
      columns: ['Element', 'Shadow (1–60)', 'Limited live (61–80)'],
      widths: [0.32, 0.34, 0.34],
      rows: [
        ['System of record', 'Unchanged — LOS', 'Unchanged — LOS'],
        ['Who decides', 'Human only', 'Human only'],
        ['Jazz output in the file', 'Never', 'Yes, as a labelled proposal'],
        ['Borrower experience', 'Identical to standard', 'Identical to standard'],
        ['SLA', 'Standard', 'Standard'],
        ['Added work', 'Comparison log (the parallel-run tax)', 'Review and reason capture'],
        ['QC treatment', 'Standard', 'Enhanced sampling on the cohort'],
        ['Human review coverage', 'n/a — human does all work', '100%, no sampling'],
      ],
    },
    {
      title: 'Comparison log — the studio\'s primary data artifact',
      columns: ['Field', 'Captured'],
      widths: [0.36, 0.64],
      rows: [
        ['Loan ID and cohort tag', 'Automatic'],
        ['Participant and date', 'Automatic'],
        ['Human view recorded at', 'Timestamp — proves human-first sequencing'],
        ['Jazz output opened at', 'Timestamp — proves human-first sequencing'],
        ['Documents: correct / incorrect by type', 'Participant'],
        ['Fields: correct / incorrect, materiality flag', 'Participant'],
        ['Conditions Jazz raised that were warranted', 'Participant'],
        ['Warranted conditions Jazz missed', 'Participant — feeds recall and false clear rate'],
        ['Conditions Jazz raised that were unwarranted', 'Participant'],
        ['Human touch time on the file', 'Participant'],
        ['Review overhead minutes', 'Participant — the new cost'],
        ['Free-text observation', 'Participant — often the most valuable field'],
      ],
      note: 'The two timestamps are what let you prove at G4 that anchoring did not contaminate the comparison.',
    },
  ],

  cadence: [
    ['Per loan', 'Comparison log completed at decision', 'Comparison entry'],
    ['Daily (Weeks 1–4)', 'Debrief on process friction', 'Process adjustments'],
    ['Weekly', 'Completion rate and sequencing spot-check', 'Data quality confirmation'],
    ['Before G2', 'Live path designed, walked through, and dry-run on test files', 'Live process signed off'],
    ['Days 61–80', 'Daily defect triage', 'Defect log'],
  ],

  dod: [
    'Both paths documented and walked through with participants before use',
    'Cohort tagging working and reconciled weekly against the slice rule',
    'Human-first sequencing evidenced by timestamps, not assertion',
    'Every exit recorded with its trigger',
    'No borrower disadvantaged by studio participation — verified at G3',
  ],

  risks: [
    ['Anchoring — participants look at Jazz first when busy',
      'Timestamp enforcement plus weekly spot-checks; contaminated entries excluded and counted',
      'Studio Lead'],
    ['Comparison log skipped under pipeline pressure',
      'Completion rate monitored weekly; capacity relief is the real fix',
      'Head of Underwriting'],
    ['Loans exit the studio silently, biasing the sample toward easy files',
      'Exits recorded with reason and reported at every gate as a sample-integrity measure',
      'Studio Lead'],
    ['A studio loan receives worse service',
      'Exit triggers err heavily toward leaving the studio; underwriter judgement is final',
      'Head of Operations'],
    ['Live path improvised because G2 arrived faster than the design',
      'Live path designed by Day 50 and dry-run before G2',
      'Studio Lead'],
  ],
},

/* ------------------------------------------------- 12 FEEDBACK LOOP ----- */
{
  id: '12',
  file: '12-Weekly-Feedback-Loop',
  section: 'Execution — Launch Design Studio',
  title: 'Weekly Feedback Loop',
  strap: 'Ninety minutes a week that converts observation into change.',

  purpose:
    'To define the operating rhythm that turns what the studio observes into what the studio changes. The weekly loop is the engine of the program: it is where disagreements become tuning items, tuning items become fixes, and fixes become evidence. A loop that produces discussion but no decisions is the most common way a studio quietly stops learning.',

  raci: [
    ['Studio Lead', '', 'A — chairs, owns the backlog'],
    ['Studio participants', '', 'R — bring the evidence'],
    ['JazzX engagement lead', '', 'R — owns tuning delivery'],
    ['Compliance liaison', '', 'C — attends, flags issues early'],
    ['Data analyst', '', 'R — brings the numbers'],
  ],

  decisions: [
    'The loop is **90 minutes, same slot, every week**, and it is never cancelled. A cancelled loop is a week of learning lost that cannot be recovered.',
    'Every session ends with a **written decision list with named owners and dates.** Discussion without decisions means the session failed.',
    'The **first agenda item is always what changed because of last week\'s feedback.** This is what keeps participants contributing.',
    'Participants set tuning priority, not the vendor and not the steering committee. The people doing the work know what hurts.',
    'The loop is a **working session, not a status report.** Reporting is done in writing beforehand.',
  ],

  framework: [
    {
      heading: 'The 90-minute agenda',
      tables: [{
        columns: ['Min', 'Item', 'Output'],
        widths: [0.12, 0.5, 0.38],
        boldFirstCol: true,
        rows: [
          ['0–10', 'What changed since last week — every closed item named, with who raised it', 'Visible responsiveness; the item that sustains participation'],
          ['10–25', 'The numbers — volume, completion rate, accuracy trend, defects', 'Trajectory against sample and thresholds'],
          ['25–50', 'Case review — two or three specific loans where human and Jazz disagreed', 'Root cause per case'],
          ['50–70', 'Tuning backlog — prioritise, assign, agree what ships this week', 'Prioritised backlog with owners'],
          ['70–80', 'Blockers and escalations', 'Escalation decisions'],
          ['80–90', 'Decisions read back; risks reviewed', 'Written decision list'],
        ],
      }],
    },
    {
      heading: 'Case review — the highest-value 25 minutes in the program',
      body: [
        'Pick two or three real files where the human and Jazz disagreed and work them in the room with the file open. Aggregate statistics tell you a metric moved; case review tells you why, and why is what you tune against.',
      ],
      bullets: [
        'Rotate case selection between participants so the agenda is not shaped by one person\'s view',
        'Deliberately include cases where **Jazz was right and the human was wrong** — these are the highest-value cases and the least likely to be volunteered',
        'Drive to a root cause: prompt, source data quality, document quality, guideline interpretation, or genuine model limitation',
        'Every case ends as a backlog item, a documented "working as intended", or an accepted limitation — never as an unresolved discussion',
      ],
    },
    {
      heading: 'Backlog discipline',
      bullets: [
        'One backlog, visible to everyone, owned by the Studio Lead',
        'Every item has a raiser, a category, an owner, and a status',
        'Items are prioritised on frequency × severity, not on who raised them loudest',
        'Anything open more than three weeks is either escalated or explicitly closed as "not doing" — silent ageing is what kills reporting',
        'Closed items are read out by name in the next loop, crediting the person who raised them',
      ],
    },
  ],

  tables: [
    {
      title: 'Tuning backlog fields',
      columns: ['Field', 'Values'],
      widths: [0.3, 0.7],
      rows: [
        ['ID and date raised', ''],
        ['Raised by', 'Named — credit is the currency of the loop'],
        ['Category', 'Prompt / condition logic / document recognition / data extraction / integration / process / guideline'],
        ['Frequency', 'How many loans affected'],
        ['Severity', 'Sev 1–4 per one-pager 02'],
        ['Owner', 'Studio or JazzX'],
        ['Status', 'Open / in progress / shipped / verified / closed-not-doing'],
        ['Verified by', 'Who confirmed the fix worked, on which loans'],
      ],
    },
    {
      title: 'Weekly one-page report — circulated before the session, not read aloud in it',
      columns: ['Section', 'Content'],
      widths: [0.3, 0.7],
      rows: [
        ['Volume', 'Studio loans this week and cumulative vs. target'],
        ['Data quality', 'Comparison completion rate; sequencing spot-check result'],
        ['Accuracy', 'Trend on the headline quality metrics, with n'],
        ['Backlog', 'Opened, shipped, verified, ageing'],
        ['Defects', 'New defects by severity and status'],
        ['Sentiment', 'Weekly pulse result'],
        ['Risks', 'Changes to the risk register'],
      ],
    },
  ],

  cadence: [
    ['Daily (Weeks 1–4)', '15-minute standing debrief while observation is fresh', 'Observation log entries'],
    ['Weekly, Thu 90 min', 'The feedback loop', 'Written decision list, prioritised backlog'],
    ['Weekly, Fri', 'One-page report issued to Steering and participants', 'Weekly report'],
    ['Biweekly', 'Backlog health review — ageing items escalated or closed', 'Cleaned backlog'],
    ['At gates', 'Loop output rolled into the gate pack', 'Improvement log, decision history'],
  ],

  dod: [
    'Loop ran every week without cancellation',
    'Every session produced a written decision list with owners and dates',
    'Every session opened with what changed from participant feedback',
    'No backlog item aged past three weeks without escalation or explicit closure',
    'Case reviews included cases where Jazz outperformed the human',
  ],

  risks: [
    ['Loop becomes a status meeting',
      'Written report circulated beforehand; agenda is working items only; decision list mandatory',
      'Studio Lead'],
    ['Cancelled under delivery pressure',
      'Never cancelled — reduced to 30 minutes if genuinely necessary, but held',
      'Studio Lead'],
    ['Participants stop raising items because nothing visibly changes',
      'The first agenda item exists precisely to prevent this; falling feedback volume is the early warning',
      'Studio Lead'],
    ['Vendor drives the agenda toward what is easy to fix',
      'Participants set priority; JazzX delivers against it',
      'Studio Lead'],
    ['Only failure cases reviewed, producing a distorted picture',
      'Deliberate inclusion of cases where Jazz was right and the human was wrong',
      'Senior underwriter'],
  ],
},

/* -------------------------------------------------- 13 OBSERVATION ------ */
{
  id: '13',
  file: '13-Observing-Real-Underwriting-and-Fulfillment',
  section: 'Execution — Launch Design Studio',
  title: 'Observing Real Underwriting & Fulfillment',
  strap: 'Watch what people actually do, not what the process document says they do.',

  purpose:
    'To capture how underwriting and fulfillment genuinely work today, in enough structured detail to build a defensible labor baseline and to know where automation could plausibly help. Every organisation has a documented process and a real process, and the gap between them is usually where both the cost and the opportunity live. This is also the only chance to see the current state uncontaminated by Jazz.',

  raci: [
    ['Studio Lead', '', 'A — owns the observation program'],
    ['Data analyst', '', 'R — designs the capture, analyses the output'],
    ['Studio participants', '', 'R — the observed, and also observers of each other'],
    ['Head of Underwriting', '', 'C — validates the findings are representative'],
  ],

  decisions: [
    'Observation runs in **Weeks 1–3 and is ring-fenced.** No tuning work is accepted before Day 15, because tuning against a misunderstood process is expensive to unwind.',
    'Observation is **structured** — a defined task taxonomy and timing method — not informal shadowing that produces anecdotes.',
    'Observe a **minimum of 20–30 complete loans** across all participants, loan complexities, and both underwriting and fulfillment.',
    'Capture **interruptions and waiting explicitly**. They are usually the largest single component of elapsed time and the one most often omitted.',
    'Observation output is **shared openly with the observed**, including anything unflattering. Covert observation ends candour permanently.',
  ],

  framework: [
    {
      heading: 'Task taxonomy — time is coded against these',
      tables: [{
        columns: ['Category', 'Includes', 'Jazz-addressable?'],
        widths: [0.26, 0.5, 0.24],
        boldFirstCol: true,
        rows: [
          ['Document handling', 'Locating, opening, classifying, indexing, checking legibility', 'High'],
          ['Data extraction and entry', 'Reading values from documents into the LOS', 'High'],
            ['Verification and cross-check', 'Confirming values agree across documents and systems', 'High'],
          ['Analysis and judgement', 'Income calculation, asset assessment, risk assessment', 'Partial'],
          ['Condition authoring', 'Deciding and writing conditions', 'Partial'],
          ['Condition clearing', 'Reviewing received documents against open conditions', 'High'],
          ['Communication', 'Emails and calls with LOs, borrowers, vendors', 'Low'],
          ['System navigation', 'Moving between LOS, imaging, vendor portals, spreadsheets', 'Indirect'],
          ['Waiting', 'Blocked on a document, a person, or a system', 'Low — but measure it'],
          ['Rework', 'Redoing work after new information or an error', 'Partial'],
        ],
        note: 'Coding time this way is what lets the studio distinguish "we saved time" from "we saved time on the part Jazz actually touches".',
      }],
    },
    {
      heading: 'Method',
      steps: [
        'Brief participants openly: what is being captured, why, and that it measures the process rather than the person.',
        'Observe complete loans end to end where possible; partial observation systematically under-counts handoffs and rework.',
        'Time-code activity against the taxonomy at one-minute granularity, recording interruptions as they occur.',
        'Capture the moments of friction verbatim — "this is the third time I have opened this document" is worth more than an average.',
        'Note every workaround: spreadsheets, personal checklists, sticky notes, informal escalation paths. Workarounds mark where the official process fails.',
        'Debrief the participant the same day while the file is fresh and confirm the reading is fair.',
        'Reconcile observed touch time against LOS elapsed time and explain the difference explicitly.',
      ],
    },
    {
      heading: 'The observer effect, and living with it',
      body: [
        'People work more carefully when watched. This is unavoidable and it biases the baseline toward higher quality and slower times — which is conservative for quality claims and generous for labor claims. Do not pretend it away; manage it and disclose it.',
      ],
      bullets: [
        'Observe across multiple days so novelty wears off; discard or discount day one',
        'Triangulate observed times against LOS event data on the same files',
        'Have participants observe each other as well as being observed by the analyst — peer observation is markedly less distorting',
        'State the effect and its direction as a documented limitation in the baseline record',
      ],
    },
  ],

  tables: [
    {
      title: 'Observation record — one per loan',
      columns: ['Field', 'Captured'],
      widths: [0.36, 0.64],
      rows: [
        ['Loan ID, complexity, participant, date', ''],
        ['Minutes by task category', 'Against the taxonomy above'],
        ['Interruption count and total minutes lost', ''],
        ['Waiting time and what was being waited on', ''],
        ['Systems touched and switch count', ''],
        ['Workarounds observed', 'Free text — high value'],
        ['Friction points verbatim', 'Free text — high value'],
        ['Rework and its trigger', ''],
        ['Participant debrief note', 'Confirmed same day'],
      ],
    },
    {
      title: 'Synthesis — produced at Day 25 and carried into the baseline',
      columns: ['Output', 'Use'],
      widths: [0.36, 0.64],
      rows: [
        ['Time distribution by task category', 'Labor baseline; identifies where Jazz could plausibly help'],
        ['Documented vs. actual process map', 'Shows where the official process is not the real one'],
        ['Top friction points, ranked', 'Sets the initial tuning priority'],
        ['Workaround inventory', 'Often the strongest evidence of unmet need'],
        ['Addressable share of touch time', 'The theoretical ceiling on labor value — an essential reality check on the business case'],
      ],
      note: 'If addressable time is only 20% of touch time, no amount of tuning produces a 50% labor saving. Better to know that at Day 25 than at Day 90.',
    },
  ],

  cadence: [
    ['Week 1', 'Briefing; observation begins; method calibrated on first files', 'Calibrated method'],
    ['Weeks 1–3', 'Observation across participants and complexities', 'Observation dataset'],
    ['Daily', 'Same-day debrief with the observed participant', 'Confirmed records'],
    ['Day 20', 'Preliminary synthesis reviewed with participants', 'Validated findings'],
    ['Day 25', 'Final synthesis into the baseline', 'Observation report'],
    ['Day 60 and 85', 'Short re-observation to measure how the work itself changed', 'Before/after comparison'],
  ],

  dod: [
    '20–30 complete loans observed across participants and complexity levels',
    'Time coded against the taxonomy with interruptions and waiting captured',
    'Observed times reconciled against LOS data with differences explained',
    'Findings shared openly with participants and confirmed as fair',
    'Addressable share of touch time quantified and used as a reality check on the value hypothesis',
  ],

  risks: [
    ['Observation compressed because "we already know how it works"',
      'Ring-fenced in Weeks 1–3; the documented-vs-actual gap at Day 25 is the standing rebuttal',
      'Studio Lead'],
    ['Observer effect inflates the baseline',
      'Multi-day observation, peer observation, triangulation, disclosed as a limitation',
      'Data analyst'],
    ['Only straightforward loans observed',
      'Complexity mix planned in advance and tracked',
      'Studio Lead'],
    ['Participants feel evaluated and change behaviour or disengage',
      'Open briefing, same-day debrief, findings shared, explicitly about process not person',
      'Head of Underwriting'],
    ['Findings not used, and observation becomes an academic exercise',
      'Friction ranking directly seeds the tuning backlog at Day 15',
      'Studio Lead'],
  ],
},

/* -------------------------------------------------- 14 TUNE (OVERVIEW) -- */
{
  id: '14',
  file: '14-Tune-in-Jazz-Overview',
  section: 'Execution — Tune in Jazz',
  title: 'Tune in Jazz',
  strap: 'The improvement engine: change, evidence, and capability transfer.',

  purpose:
    'To define how the studio makes Jazz better during the 90 days, how each improvement is evidenced, and how the capability to keep improving transfers to your team rather than staying with the vendor. This is the umbrella for one-pagers 15 through 18. Tuning is where a studio either compounds or plateaus.',

  raci: [
    ['Studio Lead', '', 'A — owns the tuning program'],
    ['JazzX engagement lead', '', 'R — delivers changes, enables the team'],
    ['Senior underwriter', '', 'C — owns whether an output is correct'],
    ['Data analyst', '', 'R — measures whether a change worked'],
    ['Compliance liaison', '', 'C — reviews changes affecting borrower-facing outcomes'],
  ],

  decisions: [
    'Tuning starts at **Day 15**, after observation, and is driven by the ranked friction list and the comparison log — not by whatever is easiest to change.',
    'Every change is **logged with a before-and-after measurement.** An unmeasured change is not an improvement, it is a modification.',
    'Changes ship in a **weekly cycle** with a defined cut-off, so the accuracy measurement always refers to a known configuration.',
    'Our team is **in the tuning seat by Day 45**, with JazzX supporting rather than performing. Capability transfer is a tracked deliverable.',
    'Any change affecting a borrower-facing outcome requires **Compliance review before it ships.**',
  ],

  framework: [
    {
      heading: 'The four components',
      tables: [{
        columns: ['Component', 'Detail in', 'The one thing that matters'],
        widths: [0.32, 0.16, 0.52],
        boldFirstCol: true,
        rows: [
          ['Refining prompts, conditions, document recognition', 'One-pager 15', 'Change one thing at a time, or you cannot attribute the result'],
          ['Documenting improvement', 'One-pager 16', 'Before-and-after on the same loans, or it is an anecdote'],
          ['Next technology changes', 'One-pager 17', 'Separate what tuning can fix from what needs building'],
          ['Builder Studio & Knowledge Nuggets', 'One-pager 18', 'If only JazzX can change it, you have bought a service, not a capability'],
        ],
      }],
    },
    {
      heading: 'The weekly tuning cycle',
      steps: [
        '**Monday** — backlog reviewed; the week\'s changes selected and scoped.',
        '**Tuesday–Wednesday** — changes built and tested against a held-back regression set of previously correct loans.',
        '**Wednesday cut-off** — changes freeze. Nothing ships after cut-off, so the week\'s measurement refers to one known configuration.',
        '**Thursday** — changes deployed to the studio environment; version recorded; weekly loop reviews the result.',
        '**Following week** — effect measured on new loans and the change is marked verified, reverted, or refined.',
      ],
    },
    {
      heading: 'Attribution discipline',
      body: [
        'The most common tuning failure is shipping five changes in a week, seeing accuracy improve, and being unable to say which change did it — or noticing three weeks later that one of the five quietly broke something else. Discipline here is what separates a tuned system from a drifted one.',
      ],
      bullets: [
        'Prefer one substantive change per area per cycle',
        'Always run the regression set — the risk is not the change failing, it is the change fixing one thing and breaking two others',
        'Record the configuration version against every studio loan so any metric can be recomputed by configuration',
        'Revert quickly and without ceremony; a reverted change is a finding, not a failure',
        'Never tune on the loans you will use to prove the result — keep a clean holdout for the G4 evidence',
      ],
    },
  ],

  tables: [
    {
      title: 'Tuning maturity — the trajectory to plan for',
      columns: ['Phase', 'Who tunes', 'Our role', 'Target state'],
      widths: [0.2, 0.24, 0.28, 0.28],
      rows: [
        ['Days 15–30', 'JazzX', 'Observe and specify', 'We understand what is changeable'],
        ['Days 31–45', 'JazzX with us', 'Pair on every change', 'We can specify precisely'],
        ['Days 46–70', 'Us with JazzX support', 'Make changes ourselves', 'We can tune independently'],
        ['Days 71–90', 'Us', 'JazzX on escalation only', 'Capability transferred'],
      ],
      note: 'If at Day 90 only JazzX can make a change, the G4 scale decision carries a dependency risk that must be priced.',
    },
  ],

  cadence: [
    ['Monday', 'Backlog review; week\'s changes selected', 'Change set'],
    ['Wednesday', 'Change freeze; regression run', 'Tested change set'],
    ['Thursday', 'Deploy; weekly loop reviews effect', 'Version recorded'],
    ['Weekly', 'Prior week\'s changes marked verified / reverted / refined', 'Improvement log'],
    ['At G2 and G4', 'Cumulative improvement evidenced against a clean holdout', 'Gate evidence'],
  ],

  dod: [
    'Every change logged with before-and-after measurement and a configuration version',
    'Regression set run on every cycle',
    'A clean holdout preserved and never tuned against',
    'Our team making changes independently by Day 70',
    'Compliance reviewed every change affecting a borrower-facing outcome',
  ],

  risks: [
    ['Change velocity outruns measurement, so nothing can be attributed',
      'One substantive change per area per cycle; weekly freeze; version tagging',
      'Studio Lead'],
    ['Overfitting to studio loans',
      'Clean holdout preserved; regression set run every cycle',
      'Data analyst'],
    ['Capability never transfers and we are vendor-dependent at Day 91',
      'Maturity trajectory tracked as a deliverable and reviewed at every gate',
      'Studio Lead'],
    ['A tuning change alters borrower-facing outcomes without review',
      'Compliance review gate on any borrower-affecting change',
      'Compliance'],
    ['Tuning chases interesting problems rather than frequent ones',
      'Backlog prioritised on frequency × severity from the comparison log',
      'Studio Lead'],
  ],
},

/* --------------------------------------------------- 15 REFINE ---------- */
{
  id: '15',
  file: '15-Refining-Prompts-Conditions-Document-Recognition',
  section: 'Execution — Tune in Jazz',
  title: 'Refining Prompts, Conditions & Document Recognition',
  strap: 'The three tuning surfaces, who may change what, and how a change is proven.',

  purpose:
    'To define the mechanics of tuning: the three surfaces available, the workflow a change passes through, who is authorised to make each kind of change, and the evidence required before a change is considered verified. This is the most operationally detailed document in the pack because it is the work the studio does most often.',

  raci: [
    ['Studio Lead', '', 'A — owns the tuning backlog and cadence'],
    ['JazzX engineer', '', 'R — implements, then enables us to implement'],
    ['Senior underwriter', '', 'A — sole authority on whether an output is correct'],
    ['Data analyst', '', 'R — regression and effect measurement'],
    ['Compliance liaison', '', 'C — approves borrower-affecting changes'],
  ],

  decisions: [
    'The **senior underwriter is the sole arbiter of correctness.** Not the vendor, not the Studio Lead. Ground truth is a credit judgement.',
    '**One substantive change per surface per cycle**, so effects remain attributable.',
    'Every change runs against the **regression set** before shipping — a held-back set of loans previously handled correctly.',
    'A change is **verified** only after measurement on new loans, not on the loans that prompted it.',
    'Condition logic changes and anything affecting adverse-action reasoning require **Compliance review before shipping.**',
  ],

  framework: [
    {
      heading: 'The three surfaces',
      tables: [{
        columns: ['Surface', 'What you change', 'Typical failure it fixes', 'Risk of changing'],
        widths: [0.2, 0.28, 0.28, 0.24],
        boldFirstCol: true,
        rows: [
          ['Document recognition', 'Classification rules, templates, quality handling for a document type',
            'Bank statement from a regional lender misclassified; scanned paystub not read',
            'Low — narrow blast radius, easy to regression-test'],
          ['Data extraction', 'Field mapping, extraction logic, validation and cross-check rules',
            'YTD income pulled from the wrong column; multi-page document truncated',
            'Medium — a field error propagates into calculations downstream'],
          ['Prompts and condition logic', 'Instructions governing what Jazz evaluates, how it reasons, when it raises a condition',
            'Over-conditioning on gift funds; missing a required VOE condition',
            '**High — directly affects borrower outcomes; always Compliance-reviewed**'],
        ],
      }],
    },
    {
      heading: 'Change workflow',
      steps: [
        '**Observed** — a difference is recorded in the comparison log during normal studio work.',
        '**Triaged** — categorised by surface, frequency and severity in the weekly loop.',
        '**Root-caused** — is this a prompt problem, a source data problem, a document quality problem, or a genuine limitation? Changing a prompt to fix bad source data makes things worse.',
        '**Specified** — the intended behaviour written down before anyone changes anything, in underwriting language.',
        '**Built** — implemented by JazzX early in the program, by our team from Day 46.',
        '**Regression tested** — run against the held-back set; any degradation blocks the ship.',
        '**Reviewed** — Compliance reviews if borrower-affecting.',
        '**Shipped** — deployed at the Thursday cycle with a version tag.',
        '**Verified** — measured on new loans the following week and marked verified, reverted, or refined.',
      ],
    },
    {
      heading: 'Root-cause first — the discipline that saves the most time',
      body: [
        'When Jazz gets something wrong, the reflex is to change the prompt. Often the prompt is fine and something upstream is not. Diagnosing before tuning avoids a class of change that appears to work on the observed file and degrades everything else.',
      ],
      tables: [{
        columns: ['If the failure is...', 'The fix is...', 'Not...'],
        widths: [0.36, 0.34, 0.3],
        rows: [
          ['A document type Jazz has not seen', 'Recognition training or template', 'A prompt change'],
          ['The document is illegible or truncated', 'Upstream capture quality', 'Any tuning at all'],
          ['The field exists but was read wrongly', 'Extraction mapping', 'A prompt change'],
          ['The data is right but the judgement is wrong', 'Prompt or condition logic', 'Extraction changes'],
          ['Our guideline is ambiguous', 'Fix the guideline, then the prompt', 'Encoding the ambiguity into Jazz'],
          ['Genuine model limitation', 'Log as an accepted limitation; feed one-pager 17', 'Endless tuning against a wall'],
        ],
      }],
    },
    {
      heading: 'Prompt hygiene',
      bullets: [
        'Prompts are **version-controlled with an author, a date and a rationale** — not edited in place',
        'Write in the underwriting language of your own guidelines, not in generic terms',
        'Encode the guideline reference so a change is traceable to a policy source',
        'Prefer explicit over clever; a prompt a new underwriter can read and verify is a prompt you can defend',
        'When a prompt grows past readability, split it rather than extending it',
        'Never encode a rule nobody can point to a guideline for — that is how undocumented credit policy is created',
      ],
    },
  ],

  tables: [
    {
      title: 'Change record — one per change',
      columns: ['Field', 'Entry'],
      widths: [0.34, 0.66],
      rows: [
        ['Change ID, date, author', ''],
        ['Surface', 'Recognition / extraction / prompt / condition logic'],
        ['Triggered by', 'Comparison log entries — list loan IDs'],
        ['Root cause', ''],
        ['Intended behaviour change', 'In underwriting language'],
        ['Guideline reference', ''],
        ['Regression result', 'Pass / fail, with any degradation noted'],
        ['Compliance reviewed', 'Yes / no / not applicable, with reviewer'],
        ['Shipped version and date', ''],
        ['Effect measured', 'Metric, before, after, n'],
        ['Status', 'Verified / reverted / refined'],
      ],
    },
    {
      title: 'Change authority',
      columns: ['Change type', 'May be made by', 'Requires'],
      widths: [0.34, 0.3, 0.36],
      rows: [
        ['Document recognition', 'Studio (from Day 46)', 'Regression pass'],
        ['Data extraction mapping', 'Studio (from Day 46)', 'Regression pass + underwriter confirmation'],
        ['Prompt refinement, no outcome change', 'Studio with JazzX', 'Regression pass + underwriter sign-off'],
        ['Condition logic', 'Studio Lead + senior underwriter', 'Compliance review before ship'],
        ['Anything affecting adverse-action reasoning', 'Studio Lead', 'Compliance review + Model Risk notification'],
        ['Anything expanding the data sent to Jazz', 'Not the studio', 'InfoSec + Steering'],
      ],
    },
  ],

  cadence: [
    ['Monday', 'Backlog triage; week\'s changes specified', 'Change specifications'],
    ['Tue–Wed', 'Build and regression test', 'Regression results'],
    ['Wednesday', 'Change freeze; Compliance review where required', 'Approved change set'],
    ['Thursday', 'Ship with version tag; review in the weekly loop', 'Deployed version'],
    ['Following week', 'Effect measured on new loans', 'Verified / reverted / refined'],
    ['At gates', 'Cumulative change history and net effect presented', 'Improvement log'],
  ],

  dod: [
    'Every change has a record with root cause, regression result and measured effect',
    'Regression set run on every cycle with no unexplained degradation shipped',
    'Compliance reviewed every borrower-affecting change before it shipped',
    'Prompts version-controlled with author, date, rationale and guideline reference',
    'Studio team making changes independently from Day 46',
  ],

  risks: [
    ['Prompt changed to fix what is actually a data quality problem',
      'Root-cause step is mandatory before specification',
      'Studio Lead'],
    ['Regression set degrades silently over many small changes',
      'Full regression every cycle; results reviewed in the weekly loop',
      'Data analyst'],
    ['Undocumented credit policy created inside prompts',
      'Guideline reference required on every condition-logic change; Compliance review',
      'Compliance'],
    ['Vendor makes changes outside the cycle',
      'Change control agreed in the SOW; version tag on every studio loan reveals drift',
      'Studio Lead'],
    ['Tuning optimises the metric rather than the outcome',
      'Senior underwriter is sole arbiter of correctness; false clear rate guards the trade-off',
      'Senior underwriter'],
  ],
},

/* --------------------------------------- 16 DOCUMENTING IMPROVEMENT ----- */
{
  id: '16',
  file: '16-Documenting-Improvement',
  section: 'Execution — Tune in Jazz',
  title: 'Documenting Improvement',
  strap: 'Turning a change log into evidence that survives Gate 4.',

  purpose:
    'To ensure that every improvement the studio makes is captured as defensible evidence rather than as an impression that things got better. At Gate 4 the studio must be able to show what Jazz did on Day 20, what it does on Day 85, what changed in between, and how much of the difference is attributable to tuning rather than to the team getting better at using it. That last distinction is where most pilots quietly overstate their results.',

  raci: [
    ['Data analyst', '', 'A — owns measurement integrity'],
    ['Studio Lead', '', 'R — maintains the improvement log'],
    ['Senior underwriter', '', 'C — confirms correctness judgements'],
    ['Finance', '', 'C — consumes the evidence for the business case'],
  ],

  decisions: [
    'Improvement is measured on a **clean holdout that is never tuned against.** Without it, the studio cannot distinguish learning from overfitting.',
    'The **learning effect is measured separately** from the tuning effect, because participants get faster and better at using Jazz regardless of whether Jazz improves.',
    'Every improvement claim carries **n and a conclusive-or-directional label.** Underpowered results are never presented as proof.',
    'The improvement log is written **as the studio goes**, never reconstructed at Day 85. Reconstructed logs are visibly reconstructed.',
    'Failed and reverted changes are documented with equal care. **A studio that reports only successes has not been measuring.**',
  ],

  framework: [
    {
      heading: 'Three effects that must be separated',
      body: [
        'Between Day 20 and Day 85 the studio\'s numbers improve for three quite different reasons. Conflating them is the single most common way a pilot overstates its case, and it is also the thing a sceptical CFO will probe first.',
      ],
      tables: [{
        columns: ['Effect', 'What it is', 'How to isolate it'],
        widths: [0.2, 0.42, 0.38],
        boldFirstCol: true,
        rows: [
          ['Tuning effect', 'Jazz genuinely got better at the task',
            'Re-run the current configuration against the Day-20 holdout loans. Any gain is real tuning.'],
          ['Learning effect', 'The team got better at using and reviewing Jazz',
            'Compare human review time and override rate over time on files of equal complexity.'],
          ['Mix effect', 'Later loans were easier or different',
            'Track complexity distribution weekly; report mix-adjusted where it shifted.'],
        ],
        note: 'All three are legitimate value. Only the first is transferable to a different team at scale, which is why the split matters to the business case.',
      }],
    },
    {
      heading: 'The holdout',
      bullets: [
        'Reserve **30–40 loans from the first three weeks** as a frozen evaluation set with confirmed human ground truth',
        'Never tune against them, never review them in the weekly loop, never let them influence a change',
        'Re-run the current configuration against them at Day 45, Day 60 and Day 85',
        'The Day-85 result versus the Day-20 result on identical files is **the single cleanest piece of evidence the studio will produce**',
        'Keep the holdout representative of the slice, not the easy end of it',
      ],
    },
    {
      heading: 'What each improvement record must show',
      steps: [
        'What was wrong, evidenced by specific loans from the comparison log.',
        'How often it occurred — frequency across the studio population, not just the observed instances.',
        'What was changed, on which surface, with the version tag.',
        'What was expected to happen, written before the change shipped.',
        'What actually happened, measured on new loans with n stated.',
        'Whether the regression set degraded anywhere.',
        'Verified, reverted or refined — with the date.',
      ],
    },
  ],

  tables: [
    {
      title: 'Improvement log — the running record',
      columns: ['Field', 'Entry'],
      widths: [0.32, 0.68],
      rows: [
        ['Improvement ID and date', ''],
        ['Problem, with evidencing loan IDs', ''],
        ['Frequency before', 'x per 100 loans'],
        ['Change made and version', ''],
        ['Expected effect', 'Stated before shipping'],
        ['Frequency after', 'x per 100 loans, with n'],
        ['Statistically conclusive?', 'Yes / directional only'],
        ['Regression impact', 'None / detail'],
        ['Holdout re-run result', 'Where applicable'],
        ['Status and date', 'Verified / reverted / refined'],
      ],
    },
    {
      title: 'Improvement summary — the Gate 4 exhibit',
      columns: ['Metric', 'Day 20', 'Day 45', 'Day 60', 'Day 85', 'On holdout'],
      widths: [0.3, 0.14, 0.14, 0.14, 0.14, 0.14],
      rows: [
        ['Document recognition accuracy', '', '', '', '', ''],
        ['Data extraction accuracy (weighted)', '', '', '', '', ''],
        ['Condition precision', '', '', '', '', ''],
        ['Condition recall', '', '', '', '', ''],
        ['False clear rate', '', '', '', '', ''],
        ['Human review time per file', '', '', '', '', 'n/a — learning effect'],
        ['Override rate', '', '', '', '', 'n/a — learning effect'],
      ],
      note: 'The holdout column is the one that answers "did the product improve, or did we just get used to it?"',
    },
  ],

  cadence: [
    ['Per change', 'Improvement record opened at specification, closed at verification', 'Improvement log entry'],
    ['Weekly', 'Log reviewed in the feedback loop; ageing unverified changes chased', 'Updated log'],
    ['Day 45, 60, 85', 'Holdout re-run against current configuration', 'Holdout trend'],
    ['At G2', 'Improvement trajectory presented as live-readiness evidence', 'Gate 2 exhibit'],
    ['At G4', 'Full improvement summary with the three effects separated', 'Gate 4 exhibit'],
  ],

  dod: [
    'Holdout reserved in the first three weeks and never tuned against',
    'Every change has a closed improvement record with measured effect',
    'Tuning, learning and mix effects separated and reported distinctly',
    'Every claim carries n and a conclusive-or-directional label',
    'Reverted and failed changes documented alongside successes',
  ],

  risks: [
    ['Improvement log reconstructed at Day 85',
      'Records opened at specification time; weekly review makes gaps visible immediately',
      'Studio Lead'],
    ['Holdout contaminated by being used in a weekly review',
      'Holdout held by the analyst, not accessible in the studio working set',
      'Data analyst'],
    ['Learning effect claimed as product improvement',
      'Holdout re-run isolates it; the split is a mandatory section of the G4 pack',
      'Finance'],
    ['Only successful changes documented',
      'Reverted changes are a required section of the gate pack',
      'Studio Lead'],
    ['Improvement claimed on samples too small to support it',
      'n and conclusive/directional label mandatory on every claim',
      'Data analyst'],
  ],
},

/* ------------------------------------------- 17 NEXT TECH CHANGES ------- */
{
  id: '17',
  file: '17-Next-Technology-Changes-and-Build-Start',
  section: 'Execution — Tune in Jazz',
  title: 'Next Technology Changes & Build Start',
  strap: 'Turning studio findings into a costed engineering backlog — and starting the safe parts now.',

  purpose:
    'To convert what the studio learns into a concrete, costed technology roadmap, and to start building the items that are worth building regardless of the Gate 4 outcome. Without this, the studio ends with a recommendation and no execution path, and the three months of insight decay while a scale plan is written from scratch.',

  raci: [
    ['IT / Engineering lead', '', 'A — owns the technical roadmap'],
    ['Studio Lead', '', 'R — supplies the findings and priorities'],
    ['JazzX engagement lead', '', 'C — vendor-side roadmap dependencies'],
    ['Enterprise architecture', '', 'C — fit with the target state'],
    ['Finance', '', 'C — costs the roadmap for the business case'],
  ],

  decisions: [
    'Findings are triaged into **tune / build / vendor / accept** — four fundamentally different responses that are routinely conflated.',
    'Build work starts **during** the studio only for items that are **no-regret**: valuable whether or not Jazz is adopted.',
    'Anything Jazz-specific waits for **Gate 4**, so a no-go does not strand sunk engineering cost.',
    'Every roadmap item is **costed and sequenced before Gate 4**, so the scale decision is made with a real number rather than an intention.',
    'Vendor roadmap dependencies are **written into the record with dates**, and unconfirmed dependencies are treated as risks, not plans.',
  ],

  framework: [
    {
      heading: 'Triage — four responses, not one',
      tables: [{
        columns: ['Response', 'When', 'Owner', 'Timing'],
        widths: [0.16, 0.42, 0.2, 0.22],
        boldFirstCol: true,
        rows: [
          ['**Tune**', 'Fixable within Jazz configuration', 'Studio', 'This week'],
          ['**Build**', 'Needs work in our systems — integration, data quality, workflow', 'IT', 'No-regret now; the rest post-G4'],
          ['**Vendor**', 'Needs a JazzX product change', 'JazzX', 'Their roadmap, tracked with dates'],
          ['**Accept**', 'Not economic to fix; the workflow absorbs it', 'Studio', 'Documented as a limitation'],
        ],
        note: 'Misfiling a Build item as a Tune item produces weeks of futile prompt engineering. This triage is worth doing carefully.',
      }],
    },
    {
      heading: 'No-regret build items — safe to start during the studio',
      body: [
        'These generally pay for themselves through better data and cleaner process regardless of the Gate 4 outcome, and they are the reason a no-go studio still returns value.',
      ],
      bullets: [
        '**Document capture quality at the source** — better scans and better borrower upload guidance improve every downstream process, AI or not',
        '**Data quality remediation in the LOS** — the studio will expose field-level inconsistencies that have been quietly costing money for years',
        '**Event instrumentation** — the measurement built for the baseline is worth keeping permanently',
        '**Document taxonomy standardisation** — a consistent naming and classification scheme benefits every system that touches documents',
        '**Guideline clarification** — every ambiguity the studio surfaced in trying to encode a rule is a real ambiguity affecting human underwriters today',
      ],
    },
    {
      heading: 'Wait-for-Gate-4 items',
      bullets: [
        'LOS write-back and system-of-record automation',
        'Production-grade integration hardening and scaling',
        'Any workflow redesign predicated on Jazz being present',
        'Jazz-specific monitoring, alerting and support tooling',
        'Expansion of data flows to the vendor',
      ],
    },
  ],

  tables: [
    {
      title: 'Technology roadmap — costed before Gate 4',
      columns: ['Item', 'Triage', 'Value', 'Effort', 'Depends on', 'Start'],
      widths: [0.26, 0.12, 0.16, 0.12, 0.18, 0.16],
      rows: [
        ['', 'Tune / Build / Vendor / Accept', 'H / M / L', 'Days', '', 'Now / Post-G4'],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ],
      note: 'Populated continuously from Day 15; costed and sequenced by Day 80 so Gate 4 has a real number.',
    },
    {
      title: 'Vendor roadmap dependencies — track explicitly',
      columns: ['Capability needed', 'JazzX committed date', 'Confirmed in writing?', 'Fallback if late'],
      widths: [0.32, 0.2, 0.2, 0.28],
      rows: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
      ],
      note: 'An uncommitted vendor date is a risk on the register, never a line in the plan.',
    },
  ],

  cadence: [
    ['Weekly', 'New findings triaged into the four categories', 'Updated roadmap'],
    ['Biweekly', 'Engineering review of build items with IT', 'Effort estimates'],
    ['Day 45', 'No-regret build items started', 'Work in progress'],
    ['Day 70', 'Roadmap costed and sequenced', 'Draft scale roadmap'],
    ['Day 80', 'Roadmap finalised for the Gate 4 pack', 'Costed roadmap'],
  ],

  dod: [
    'Every studio finding triaged into tune / build / vendor / accept',
    'No-regret items started and progressing by Day 45',
    'Full roadmap costed and sequenced before Gate 4',
    'Vendor dependencies documented with dates and written confirmation status',
    'No Jazz-specific engineering committed before the Gate 4 decision',
  ],

  risks: [
    ['Build work starts on Jazz-specific items and is stranded by a no-go',
      'No-regret test applied before any build starts; Steering approves exceptions',
      'IT lead'],
    ['Roadmap not costed, so Gate 4 decides on an intention',
      'Costing is a Day 80 deliverable and a Gate 4 evidence requirement',
      'Finance'],
    ['Vendor roadmap promises treated as plan',
      'Written confirmation required; unconfirmed items sit on the risk register with fallbacks',
      'Studio Lead'],
    ['Build items misfiled as tuning items',
      'Root-cause discipline in one-pager 15; IT reviews the triage biweekly',
      'IT lead'],
    ['Data quality work deferred and undermines everything downstream',
      'Explicitly listed as no-regret and started at Day 45',
      'IT lead'],
  ],
},

/* ------------------------------------------- 18 BUILDER STUDIO ---------- */
{
  id: '18',
  file: '18-Builder-Studio-and-Knowledge-Nuggets',
  section: 'Execution — Tune in Jazz',
  title: 'Builder Studio & Knowledge Nuggets',
  strap: 'Capability transfer — so that on Day 91 we can change it ourselves.',

  purpose:
    'To ensure the studio leaves behind capability rather than dependency. At Day 91 the organisation should be able to tune Jazz, diagnose its failures, and extend its use without JazzX in the room for routine work. This document defines what our team must be able to do, how they get there, and how that is verified rather than assumed.',

  raci: [
    ['Studio Lead', '', 'A — owns capability transfer as a deliverable'],
    ['JazzX engagement lead', '', 'R — delivers enablement per the SOW'],
    ['Studio participants', '', 'R — the people who must be able to do it'],
    ['HR / Learning', '', 'C — captures skills into role definitions'],
    ['IT lead', '', 'C — owns technical self-sufficiency'],
  ],

  decisions: [
    'Capability transfer is a **tracked deliverable with a Gate 4 assessment**, not a hoped-for side effect of working together.',
    '**Builder Studio access from Day 30** for at least three named people, including at least one underwriter — not only technical staff.',
    'Competence is demonstrated by an **unassisted change**, not by course completion. Attendance is not capability.',
    'Knowledge is captured in **our** documentation, in our language, not left in vendor materials we do not control.',
    'At least **two people can perform every critical task.** A single trained individual is a dependency, not a capability.',
  ],

  framework: [
    {
      heading: 'Target capability by Day 90',
      tables: [{
        columns: ['Capability', 'Who must have it', 'Verified by'],
        widths: [0.36, 0.28, 0.36],
        boldFirstCol: true,
        rows: [
          ['Diagnose why an output was wrong', 'All studio participants', 'Correctly root-causes 3 unseen cases'],
          ['Make a document recognition change', 'Analyst + one processor', 'Ships an unassisted change'],
          ['Adjust an extraction mapping', 'Analyst + IT', 'Ships an unassisted change'],
          ['Refine a prompt', 'Studio Lead + senior underwriter', 'Ships an unassisted change with regression pass'],
          ['Run the regression set', 'Data analyst', 'Runs unassisted and interprets the result'],
          ['Interpret accuracy metrics', 'Analyst + Studio Lead', 'Explains a trend unaided to Steering'],
          ['Escalate correctly to JazzX', 'Studio Lead', 'Two escalations handled cleanly'],
          ['Train a new user', 'One participant', 'Onboards someone from outside the studio'],
        ],
      }],
    },
    {
      heading: 'The enablement ladder',
      steps: [
        '**Days 1–15 — Watch.** Participants observe JazzX making changes and ask questions. No expectation of independence.',
        '**Days 16–30 — Specify.** Our team writes the change specification; JazzX implements. This builds precision of thought before mechanics.',
        '**Days 31–45 — Pair.** Our team drives with JazzX alongside. Builder Studio access is live.',
        '**Days 46–70 — Do.** Our team implements; JazzX reviews. Every change is ours.',
        '**Days 71–90 — Own.** JazzX on escalation only. Independence assessed formally at Day 85.',
      ],
    },
    {
      heading: 'Knowledge Nuggets — capture as you go',
      body: [
        'Small, specific, reusable pieces of knowledge, written the day they are learned. Not a manual written at Day 88 — a running set of short entries that answer a real question someone had.',
      ],
      bullets: [
        'One nugget per learning: what the situation was, what we tried, what worked, what to do next time',
        'Written by the person who learned it, in plain underwriting or operations language',
        'Stored in **our** knowledge base, not the vendor\'s, so it survives the relationship',
        'Reviewed briefly in the weekly loop and refined',
        'Target roughly 30–50 nuggets across 90 days — that is two or three a week, which is realistic',
        'Explicitly include the failures: what did not work is often the more valuable entry',
      ],
    },
  ],

  tables: [
    {
      title: 'Enablement plan — agreed with JazzX at G0',
      columns: ['Element', 'Detail', 'By when', 'Confirmed'],
      widths: [0.3, 0.34, 0.18, 0.18],
      rows: [
        ['Builder Studio access', 'Named users, permission level', 'Day 30', ''],
        ['Structured training', 'Sessions, format, audience', 'Day 30', ''],
        ['Pairing commitment', 'Hours per week of named engineer time', 'Day 31–45', ''],
        ['Documentation handover', 'What we receive and may retain', 'Day 60', ''],
        ['Escalation path', 'Named contacts and response times', 'Day 1', ''],
        ['Independence assessment', 'Joint review of our capability', 'Day 85', ''],
      ],
      note: 'Every row should be traceable to the SOW. Anything not in the SOW is a request, not a commitment.',
    },
    {
      title: 'Day 85 independence assessment — the Gate 4 input',
      columns: ['Question', 'Assessment', 'Evidence'],
      widths: [0.42, 0.24, 0.34],
      rows: [
        ['Can we make routine changes unassisted?', '', 'Count of unassisted shipped changes'],
        ['Can we diagnose a failure unassisted?', '', 'Unseen-case diagnosis result'],
        ['Can we measure whether a change worked?', '', 'Analyst-run regression and effect measurement'],
        ['Is knowledge captured in our systems?', '', 'Nugget count and quality review'],
        ['Is any capability held by only one person?', '', 'Coverage matrix'],
        ['What still requires JazzX?', '', 'Explicit dependency list, priced'],
      ],
      note: 'The last row belongs in the Gate 4 business case as an ongoing cost, whatever the decision.',
    },
  ],

  cadence: [
    ['Weekly', 'Nuggets reviewed and added in the feedback loop', 'Growing knowledge base'],
    ['Weekly', 'Pairing or independent-change session with JazzX', 'Skills progression'],
    ['Day 30', 'Builder Studio access live; structured training complete', 'Access confirmed'],
    ['Day 45', 'Mid-point capability check against the ladder', 'Gap plan'],
    ['Day 85', 'Formal independence assessment', 'Gate 4 input'],
    ['Day 90', 'Knowledge base finalised and owned internally', 'Retained capability'],
  ],

  dod: [
    'At least three named people with Builder Studio access from Day 30, including an underwriter',
    'Every critical capability held by at least two people',
    'Independence demonstrated by unassisted changes, not by training attendance',
    '30–50 Knowledge Nuggets captured in our own systems, including failures',
    'Residual JazzX dependencies listed and priced in the Gate 4 business case',
  ],

  risks: [
    ['Enablement slips because delivery is more urgent than teaching',
      'Contracted in the SOW; capability is a Gate 4 assessed deliverable, not a nice-to-have',
      'Studio Lead'],
    ['Only technical staff are enabled, so underwriting cannot tune',
      'At least one underwriter has Builder Studio access from Day 30',
      'Head of Underwriting'],
    ['Knowledge stays in vendor systems we do not control',
      'Nuggets stored in our knowledge base from day one',
      'Studio Lead'],
    ['One person becomes the single point of knowledge',
      'Two-person coverage required per capability; coverage matrix reviewed at Day 45',
      'Studio Lead'],
    ['Training attendance mistaken for capability',
      'Assessed by unassisted change and unseen-case diagnosis only',
      'Studio Lead'],
    ['Enabled participants leave after the studio',
      'Retention and next-step conversation before Day 90; knowledge captured in writing regardless',
      'HR'],
  ],
},

];
