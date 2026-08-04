/* One-pagers 19–22 — Technology: Use Current Integrations, Deploy Technology Changes. */

module.exports = [

/* ------------------------------------------------------ 19 TRIGGER ------ */
{
  id: '19',
  file: '19-Enabling-Users-to-Trigger-Loans-to-Jazz',
  section: 'Technology — Use Current Integrations',
  title: 'Enabling Users to Trigger Loans to Jazz',
  strap: 'How a loan gets into the studio — and why letting people choose is the fastest way to ruin the evidence.',

  purpose:
    'To define how loans enter Jazz: what causes a loan to be sent, who is entitled to send it, what is sent, and what happens when the send fails. The trigger looks like a minor piece of plumbing and is in fact the mechanism that determines whether the studio\'s sample is representative. Get it wrong and every accuracy number the studio produces is measuring the wrong population.',

  raci: [
    ['IT / integration engineer', '', 'R — builds the trigger'],
    ['Studio Lead', '', 'A — owns cohort integrity'],
    ['Head of Operations', '', 'C — workflow fit and user experience'],
    ['InfoSec', '', 'A — approves what data leaves our systems'],
    ['Data analyst', '', 'R — monitors cohort composition'],
    ['JazzX engagement lead', '', 'C — receiving-side contract'],
  ],

  decisions: [
    'The primary trigger is **rule-based auto-enrolment** against the slice definition, not user choice. Manual selection introduces selection bias that cannot be corrected afterward and cannot be detected in the output.',
    'A **manual trigger exists but is the exception**, is entitled to named users, and every manual send is flagged in the cohort so its effect on the sample can be measured and, if necessary, excluded.',
    'The trigger fires at a **single defined workflow milestone**, identical for every loan, so that what Jazz receives is comparable across the cohort.',
    'The payload is the **minimum data required** for the studio\'s use case. Expanding it is an InfoSec and Steering decision, never an engineering convenience.',
    'Every send is **logged, idempotent and reversible** — we can prove what was sent, re-send safely, and withdraw a loan from the studio.',
  ],

  framework: [
    {
      heading: 'Why manual triggering breaks the studio',
      body: [
        'This is the single most consequential point in this document. If an underwriter chooses which loans go to Jazz, they will choose — entirely reasonably — the loans where they expect it to help, or the ones they find interesting, or the ones that are not urgent. The resulting cohort is not the slice; it is a self-selected subset with unknown properties.',
        'The damage is invisible. Accuracy numbers still compute, the sample size target is still met, and nothing in the output reveals the bias. At Gate 4 the evidence describes a population that does not exist in production, and there is no way to correct for it after the fact because the selection rule lived in people\'s heads.',
      ],
      bullets: [
        'Auto-enrol every loan matching the slice rule — the rule is the population, so the cohort is the population',
        'Where a manual send is genuinely needed, flag it and report manual-send share at every gate',
        'Track cohort composition weekly against the slice definition; drift is a data-integrity issue, not a curiosity',
        'Report exits alongside sends — a cohort that auto-enrols fairly but loses hard loans to exits is biased just the same (see one-pager 11)',
      ],
    },
    {
      heading: 'Trigger models',
      tables: [{
        columns: ['Model', 'How it fires', 'Use for', 'Risk'],
        widths: [0.2, 0.28, 0.24, 0.28],
        boldFirstCol: true,
        rows: [
          ['Rule-based auto-enrolment', 'Loan matching the slice rule reaches the trigger milestone and is sent automatically',
            '**The studio default** — all shadow volume',
            'Needs the slice rule to be machine-applicable; ambiguity in the rule becomes ambiguity in the cohort'],
          ['Manual, entitled user', 'Named user sends a specific loan from the existing workflow',
            'Exceptions, re-sends, test files',
            'Selection bias if it becomes the primary path; must be flagged and measured'],
          ['Batch / backfill', 'A set of historical or queued loans sent together',
            'Holdout construction, regression runs',
            'Must never mix with the live cohort in reporting'],
          ['Event-driven re-send', 'New document arrives on a loan already in the studio',
            'Condition clearing use case',
            'Duplicate handling and versioning must be explicit'],
        ],
      }],
    },
    {
      heading: 'Choosing the trigger milestone',
      body: [
        'Every loan must enter Jazz at the same point in the workflow, or the comparison is between files at different stages of completeness. Pick one and hold it for the whole studio; changing it mid-studio invalidates the comparison in the same way changing a metric definition does.',
      ],
      tables: [{
        columns: ['Candidate milestone', 'Jazz sees', 'Trade-off'],
        widths: [0.3, 0.32, 0.38],
        rows: [
          ['Application submitted', 'Very little — few documents', 'Too early; Jazz has nothing to work with and looks worse than it is'],
          ['Initial document set received', 'The core package', '**Usually the right choice** — enough to be useful, early enough to affect the work'],
          ['File assigned to underwriter', 'Everything the underwriter sees', 'Cleanest human-vs-Jazz comparison; slightly later in the process'],
          ['Conditions issued', 'The full picture plus human judgement', 'Too late to measure the initial underwrite; useful only for the clearing use case'],
        ],
        note: 'The clearing use case may justify a second trigger on document arrival — treat that as a separate, explicitly defined trigger, not a variation of the first.',
      }],
    },
    {
      heading: 'What must be true of every send',
      steps: [
        '**Entitled** — the trigger runs under a service identity or a named entitled user; no shared credentials.',
        '**Minimal** — the payload carries only the data classes agreed with InfoSec, and the agreed list is enforced in code rather than by convention.',
        '**Logged** — who or what triggered it, when, which loan, which payload version, and the receipt Jazz returned.',
        '**Idempotent** — re-sending the same loan does not create a duplicate cohort entry or double-count in any metric.',
        '**Reversible** — a loan can be withdrawn from the studio, with the withdrawal and its reason recorded.',
        '**Fail-safe** — if Jazz is unavailable or the send fails, the standard workflow is entirely unaffected and the loan is flagged for exclusion or retry, never silently dropped.',
      ],
    },
  ],

  tables: [
    {
      title: 'Trigger design record — complete before G0',
      columns: ['Item', 'Decision'],
      widths: [0.4, 0.6],
      rows: [
        ['Primary trigger model', 'Rule-based auto-enrolment (recommended)'],
        ['Trigger milestone', ''],
        ['Machine-applicable slice rule confirmed?', ''],
        ['Manual trigger permitted?', 'Yes — entitled users only, flagged in cohort'],
        ['Named entitled users', ''],
        ['Payload data classes (InfoSec-approved)', ''],
        ['Second trigger for document arrival?', ''],
        ['Retry policy on failure', ''],
        ['Withdrawal / exit mechanism', ''],
        ['Cohort tag location in our systems', ''],
      ],
    },
    {
      title: 'Trigger health metrics — reported weekly',
      columns: ['Metric', 'Healthy', 'Why it matters'],
      widths: [0.32, 0.22, 0.46],
      rows: [
        ['Send success rate', '> 99%', 'Failed sends silently shrink the sample'],
        ['Auto vs. manual share', '> 95% auto', 'The bias indicator — a rising manual share is a red flag'],
        ['Cohort match to slice rule', '100%', 'Drift means the population is not what the evidence claims'],
        ['Time from trigger to Jazz output', 'Tracked', 'Sets whether the output is available when the human works the file'],
        ['Duplicate sends', '0', 'Double counting corrupts every rate metric'],
        ['Withdrawals and reasons', 'Tracked', 'Sample-integrity evidence for Gate 4'],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'Trigger built and tested end to end on real files', 'Working trigger'],
    ['Day 1', 'Auto-enrolment live; first cohort loans flowing', 'Cohort populated'],
    ['Weekly', 'Trigger health metrics reviewed in the feedback loop', 'Health report'],
    ['Weekly', 'Cohort reconciled against the slice rule', 'Drift check'],
    ['At each gate', 'Manual-send share and withdrawal log presented as sample-integrity evidence', 'Gate evidence'],
  ],

  dod: [
    'Auto-enrolment covering the full slice, with the rule implemented in code',
    'Manual sends entitled, flagged, and under 5% of cohort volume',
    'Every send logged with payload version and receipt',
    'Trigger failure never affects the standard workflow',
    'Cohort reconciles to the slice rule every week with drift investigated',
  ],

  risks: [
    ['Manual selection becomes the primary path and biases the sample invisibly',
      'Auto-enrolment as default; manual share reported at every gate with a 5% threshold',
      'Studio Lead'],
    ['Trigger milestone changed mid-studio',
      'Frozen at G1 with the baseline; change requires a Steering decision and invalidates prior comparison',
      'Steering Committee'],
    ['Payload quietly expands as engineers add "useful" fields',
      'Data classes enforced in code and reviewed by InfoSec; expansion is a Steering decision',
      'InfoSec'],
    ['Failed sends reduce the sample without anyone noticing',
      'Send success rate monitored weekly; failures reconciled against expected volume',
      'Data analyst'],
    ['Duplicate sends double-count in accuracy metrics',
      'Idempotency enforced at the trigger; duplicate count reported weekly',
      'IT lead'],
  ],
},

/* --------------------------------------------- 20 EXTRACTION / WRITEBACK - */
{
  id: '20',
  file: '20-LOS-Data-Extraction-and-the-Write-Back-Decision',
  section: 'Technology — Use Current Integrations',
  title: 'LOS Data Extraction & the Write-Back Decision',
  strap: 'Reading out is settled and needs designing. Writing back is open and needs deciding.',

  purpose:
    'To design how loan data and documents move from the LOS into Jazz, and to frame the open question of whether anything moves back. These are deliberately treated as two separate problems: extraction is an engineering exercise with known patterns, while write-back changes the control model of the entire studio and is therefore a governance decision that engineering should not make by default.',

  raci: [
    ['IT / integration engineer', '', 'R — designs and builds extraction'],
    ['Enterprise architecture', '', 'C — fit with the target state'],
    ['InfoSec', '', 'A — approves data classes and transport'],
    ['Studio Lead', '', 'R — frames the write-back decision'],
    ['Steering Committee', '', 'A — decides on write-back at G2'],
    ['Compliance / Model Risk', '', 'C — control implications of write-back'],
  ],

  decisions: [
    'Extraction is **read-only for the whole shadow phase**. This is not a technical limitation; it is the studio\'s primary control, and it is what makes "a human decides every loan" evidenceable rather than merely asserted.',
    'The write-back question is **decided at Gate 2**, using the criteria in this document, and the default answer is no.',
    'Where write-back is approved, it goes **no further than a review queue**. Jazz never writes directly to a system-of-record field during the 90 days.',
    'Extraction fidelity is **measured, not assumed.** What Jazz received is reconciled against what we hold, because pipeline defects masquerade as model defects and waste weeks of tuning.',
    'Design is organised around **capabilities and questions**, not a named platform, so it survives an LOS change or a multi-platform environment.',
  ],

  framework: [
    {
      heading: 'Part 1 — Extraction: what moves and how',
      tables: [{
        columns: ['Data class', 'Examples', 'Sensitivity', 'Note'],
        widths: [0.22, 0.34, 0.16, 0.28],
        boldFirstCol: true,
        rows: [
          ['Documents', 'Paystubs, W-2s, bank statements, VOE, appraisal', 'High', 'The core payload; fidelity matters more than anything else here'],
          ['Loan data fields', 'Loan amount, purpose, occupancy, property, product', 'Medium', 'Needed for Jazz to reason in context'],
          ['Borrower data', 'Income figures, employment, assets, liabilities', 'High', 'Minimise aggressively — send what the use case needs'],
          ['Workflow events', 'Assignment, milestone dates, status changes', 'Low', 'Needed for cycle-time measurement more than for Jazz itself'],
          ['Conditions', 'Open conditions and their status', 'Medium', 'Sourced from MU rather than the LOS — see one-pager 21'],
        ],
        note: 'Anything not on this list is not sent. Adding a class is an InfoSec and Steering decision.',
      }],
    },
    {
      heading: 'Extraction patterns — choose on coupling and auditability',
      tables: [{
        columns: ['Pattern', 'How it works', 'Choose when', 'Watch for'],
        widths: [0.16, 0.28, 0.28, 0.28],
        rows: [
          ['API pull', 'Jazz-side or middleware calls our API on trigger', 'We have a stable service layer', 'Rate limits; auth token lifecycle'],
          ['Event push', 'We publish an event and push the payload', 'We already have an event backbone', 'Delivery guarantees; replay on failure'],
          ['Batch export', 'Scheduled export of a cohort', 'Volume is low and latency tolerance is high', 'Latency makes output arrive after the human has finished'],
          ['File drop', 'Documents landed in a monitored secure location', 'Simplest path for document-heavy payloads', 'Weakest audit trail; needs manifest reconciliation'],
          ['Direct DB read', 'Read replica queried directly', 'No service layer exists', '**Highest coupling** — avoid; it makes every schema change a studio outage'],
        ],
        note: 'For an in-house LOS, the pattern that minimises long-term coupling usually beats the one that is fastest to stand up — the studio lasts 90 days, the coupling lasts years.',
      }],
    },
    {
      heading: 'Fidelity — the defect class that looks like a model failure',
      body: [
        'The most common "Jazz got it wrong" finding in an early studio is not a model problem at all. It is a truncated PDF, a page dropped in transfer, an image downsampled past legibility, or a multi-page document split incorrectly. These present exactly like reasoning failures and absorb enormous tuning effort before anyone checks the pipeline.',
      ],
      bullets: [
        '**Reconcile every send**: page count, file size and checksum for documents; field count for data',
        'Sample-audit visually — open what Jazz received, not what we think we sent, at least weekly in the first month',
        'Preserve original resolution; never let a transfer step re-compress documents',
        'Log a manifest per loan so any disputed output can be traced to exactly what was available',
        'Make "pipeline defect" an explicit root-cause category in the tuning workflow (one-pager 15), and check it first',
      ],
    },
    {
      heading: 'Part 2 — The write-back decision',
      body: [
        'Write-back is not a bigger version of extraction. It changes what the studio is. While data flows one way, the claim "a qualified human made every decision and Jazz influenced nothing without review" is structurally true and easy to evidence. Once Jazz writes into systems that carry the loan forward, that claim depends on process discipline rather than architecture — and process discipline is exactly what an auditor will probe.',
      ],
      tables: [{
        columns: ['Level', 'What it means', 'Control implication', 'Studio position'],
        widths: [0.1, 0.3, 0.32, 0.28],
        boldFirstCol: true,
        rows: [
          ['L0', 'No write-back. Jazz output viewed in Jazz only',
            'Strongest. Architecture guarantees the control',
            '**Default for Days 1–60**'],
          ['L1', 'Human reads Jazz output and keys it in manually',
            'Strong. Human is unambiguously the author',
            'Acceptable at any time; measure the keying cost as review overhead'],
          ['L2', 'Jazz writes to a staging area or review queue; nothing is live until a human accepts',
            'Adequate if acceptance is affirmative, logged, and nothing defaults to accepted',
            '**Ceiling for the 90 days**, if approved at G2'],
          ['L3', 'Jazz writes directly to system-of-record fields',
            'Weak during a studio. Provenance, reversibility and audit trail all become bespoke build',
            'Deferred past G4'],
        ],
      }],
    },
    {
      heading: 'What must be true before any write-back is approved',
      steps: [
        '**Provenance on every field** — the record shows the value originated from Jazz, and who accepted it.',
        '**Affirmative acceptance** — nothing becomes live by timeout, default or bulk action.',
        '**Reversibility** — any Jazz-originated value can be reverted with the prior value intact.',
        '**No silent overwrite** — Jazz never replaces a human-entered value without surfacing the conflict.',
        '**Audit trail** sufficient to reconstruct, for any loan, what Jazz proposed and what a human did about it.',
        '**Compliance and Model Risk sign-off** specifically on write-back, separate from the G2 live authorisation.',
        '**A removal path** — if the answer at G4 is no-go, the write path can be disabled without leaving orphaned data in the system of record.',
      ],
    },
  ],

  tables: [
    {
      title: 'Extraction design record — complete before G0',
      columns: ['Item', 'Decision'],
      widths: [0.42, 0.58],
      rows: [
        ['Extraction pattern chosen', ''],
        ['Why this pattern (coupling / auditability)', ''],
        ['Data classes approved by InfoSec', ''],
        ['Transport and encryption', ''],
        ['Credential and key rotation owner', ''],
        ['Reconciliation method per send', ''],
        ['Retention: how long Jazz holds our data', ''],
        ['Deletion and data-return on exit', ''],
        ['Latency target from trigger to output', ''],
      ],
    },
    {
      title: 'Write-back decision record — completed at G2',
      columns: ['Question', 'Answer'],
      widths: [0.46, 0.54],
      rows: [
        ['Is write-back required to prove the value hypothesis?', 'If no, the decision is L0 and the rest of this table is moot'],
        ['Which level is proposed (L1 / L2 / L3)?', ''],
        ['Which fields or objects specifically?', ''],
        ['Provenance mechanism', ''],
        ['Acceptance mechanism (affirmative, logged)', ''],
        ['Reversibility mechanism', ''],
        ['Conflict handling with human-entered values', ''],
        ['Compliance sign-off', ''],
        ['Model Risk sign-off', ''],
        ['Removal path if G4 is no-go', ''],
        ['Steering decision and date', ''],
      ],
      note: 'The first row is the one that matters. Write-back is frequently proposed to save keying time — that is a scale-phase efficiency, not studio evidence, and it can be measured as review overhead at L1 instead.',
    },
  ],

  cadence: [
    ['Pre-G0', 'Extraction designed, built, validated end to end', 'Working extraction'],
    ['Weekly (Month 1)', 'Visual fidelity audit of what Jazz actually received', 'Fidelity report'],
    ['Weekly', 'Reconciliation exceptions reviewed in the feedback loop', 'Pipeline defect log'],
    ['Day 45', 'Write-back position drafted with evidence for or against', 'Draft decision'],
    ['At G2', 'Write-back decision made by Steering', 'Signed decision record'],
    ['At G4', 'Extraction and any write-back assessed for scale readiness and cost', 'Roadmap input'],
  ],

  dod: [
    'Extraction working, reconciled per send, with fidelity audited visually in month one',
    'Data classes enforced in code and approved by InfoSec',
    'Pipeline defect established as the first-checked root cause in the tuning workflow',
    'Write-back decision made explicitly at G2 rather than arrived at by default',
    'Any approved write-back at L2 or below, with provenance, reversibility and a removal path',
  ],

  risks: [
    ['Pipeline defects tuned as if they were model defects',
      'Reconciliation on every send; visual audit weekly; pipeline checked first in root-cause',
      'IT lead'],
    ['Write-back happens incrementally by engineering convenience',
      'L0 default stated at G0; any write path requires a Steering decision',
      'Steering Committee'],
    ['Direct database coupling chosen for speed and inherited permanently',
      'Coupling assessed by architecture at G0; the 90-day saving is weighed against multi-year cost',
      'Enterprise architecture'],
    ['Data sent expands beyond the approved classes',
      'Enforced in code, reviewed by InfoSec, payload version logged per send',
      'InfoSec'],
    ['Vendor retains borrower data after a no-go',
      'Retention, deletion and data-return terms agreed in the SOW and verified at exit',
      'Third-Party Risk'],
    ['Latency means Jazz output arrives after the underwriter has finished',
      'Latency target set at G0 and monitored; a late output is an excluded comparison, not a slow one',
      'IT lead'],
  ],
},

/* ------------------------------------------------------ 21 MU ----------- */
{
  id: '21',
  file: '21-MU-Conditions-Management-Integration',
  section: 'Technology — Use Current Integrations',
  title: 'MU (Conditions Management) Integration',
  strap: 'Where Jazz output actually lands — and the one line that must not be crossed.',

  purpose:
    'To define how Jazz interacts with MU, our internal conditions management system. This is the highest-value integration in the studio because conditions are the concrete form Jazz\'s judgement takes: a condition raised, missed or wrongly cleared is the unit in which quality is measured and in which borrowers experience the result. It is also the integration closest to the borrower, which is why it carries the studio\'s brightest line.',

  raci: [
    ['Head of Underwriting', '', 'A — owns condition policy and taxonomy'],
    ['IT / integration engineer', '', 'R — builds the integration'],
    ['Senior underwriter', '', 'A — sole arbiter of whether a condition is correct'],
    ['Studio Lead', '', 'R — sequencing and scope'],
    ['Compliance', '', 'C — borrower-facing implications, adverse action'],
    ['MU system owner', '', 'C — system of record integrity'],
  ],

  decisions: [
    '**MU remains the single system of record for conditions.** Jazz never becomes a second source of truth, and no condition exists in Jazz that MU does not know about.',
    '**No Jazz-originated condition is ever issued to a borrower without affirmative human acceptance.** This is the studio\'s brightest line and it does not move for convenience, volume or velocity.',
    'The integration is built in **two stages, read before write**: MU conditions flow into Jazz first (low risk, immediate value for condition clearing), and Jazz proposals flow to MU only into a review queue, only if approved at G2.',
    'Every condition in MU carries **provenance** — Jazz-originated, human-originated, or both — because without it the Gate 4 attribution evidence cannot be assembled.',
    'The **condition taxonomy mapping is the real work.** It is owned by Underwriting, not by engineering, and it is completed before the integration is built.',
  ],

  framework: [
    {
      heading: 'Two surfaces, two different risk profiles',
      tables: [{
        columns: ['Surface', 'Direction', 'Value', 'Risk', 'Sequence'],
        widths: [0.22, 0.16, 0.24, 0.22, 0.16],
        boldFirstCol: true,
        rows: [
          ['Conditions into Jazz', 'MU → Jazz',
            'High — enables the condition clearing use case, which is often larger than the initial underwrite',
            'Low — read-only, no borrower exposure',
            '**Stage 1, from Day 1**'],
          ['Proposals into MU', 'Jazz → MU',
            'Medium — saves keying, but the underwriter must review either way',
            'High — closest point to the borrower; adverse-action implications',
            'Stage 2, only if approved at G2'],
        ],
      }],
    },
    {
      heading: 'The condition lifecycle and where Jazz can plug in',
      steps: [
        '**Proposed** — a condition is identified as necessary. *Jazz can contribute here; a proposal is not an action.*',
        '**Reviewed** — an underwriter accepts, edits or rejects. *The mandatory human step. Nothing passes this point without affirmative acceptance.*',
        '**Issued** — the condition becomes live and is communicated to the borrower or loan officer. *Jazz never reaches this stage directly.*',
        '**Documents received** — the borrower supplies evidence.',
        '**Assessed** — received documents are evaluated against the open condition. *The highest-value place for Jazz, and it requires reading conditions out of MU.*',
        '**Cleared or re-conditioned** — an underwriter decides. *Human step, unchanged.*',
      ],
    },
    {
      heading: 'Taxonomy mapping — where the effort actually goes',
      body: [
        'Jazz reasons about conditions in its own terms; MU records them as codes with defined meanings, and those meanings encode years of accumulated credit policy. The mapping between them is not a lookup table someone produces in an afternoon — it is a policy exercise that repeatedly surfaces genuine ambiguity in our own condition definitions.',
        'Treat that as a benefit. Every ambiguity found while mapping is an ambiguity that has been quietly affecting human underwriters all along, and resolving it is a no-regret improvement whatever happens at Gate 4 (see one-pager 17).',
      ],
      bullets: [
        'Underwriting owns the mapping; engineering implements it',
        'Map at the level of **meaning**, not string similarity — two conditions with similar names may have different evidentiary requirements',
        'Record an explicit "no equivalent" outcome rather than forcing a match; a forced mapping produces confidently wrong output',
        'Version the mapping and treat a change to it as a tuning change under one-pager 15, with regression',
        'Log every ambiguity discovered during mapping as a guideline clarification item',
      ],
    },
    {
      heading: 'Conflict and duplication rules',
      tables: [{
        columns: ['Situation', 'Rule'],
        widths: [0.42, 0.58],
        rows: [
          ['Jazz proposes a condition already open in MU', 'Suppress the proposal; log the match as a Jazz agreement, which is useful precision evidence'],
          ['Jazz proposes a condition a human already rejected on this loan', 'Suppress and log; repeated occurrences are a tuning item'],
          ['Jazz proposes a condition with no taxonomy mapping', 'Route to the review queue as unmapped; never guess a code'],
          ['A condition is cleared in MU while Jazz still shows it open', 'MU wins; Jazz state is refreshed. MU is the system of record, always'],
          ['Jazz and the underwriter disagree on whether a condition is warranted', 'The underwriter decides; the disagreement is recorded in the comparison log as studio data'],
          ['MU is unavailable', 'The studio path degrades to read-only; no queued proposals accumulate silently'],
        ],
      }],
    },
  ],

  tables: [
    {
      title: 'Integration design record',
      columns: ['Item', 'Stage 1 (read)', 'Stage 2 (propose)'],
      widths: [0.36, 0.32, 0.32],
      rows: [
        ['Approved at', 'G0', 'G2 or not at all'],
        ['Direction', 'MU → Jazz', 'Jazz → MU review queue'],
        ['Data in scope', 'Open conditions, status, codes', 'Proposed conditions with rationale'],
        ['Interface pattern', '', ''],
        ['Refresh frequency / trigger', '', ''],
        ['Provenance recorded', 'n/a', 'Required'],
        ['Acceptance mechanism', 'n/a', 'Affirmative, logged, never defaulted'],
        ['Borrower exposure', 'None', 'None before human acceptance'],
        ['Removal path if no-go', '', ''],
      ],
    },
    {
      title: 'Condition-level metrics — the studio\'s core quality evidence',
      columns: ['Metric', 'Definition', 'Feeds'],
      widths: [0.28, 0.42, 0.3],
      rows: [
        ['Condition precision', 'Jazz-proposed conditions an underwriter agrees were warranted', 'One-pager 05 quality family'],
        ['Condition recall', 'Warranted conditions Jazz proposed ÷ all warranted conditions', 'One-pager 05; the credit-risk metric'],
        ['False clear rate', 'Loans where Jazz raised nothing but a human found a material issue', 'Must-pass criterion at G4'],
        ['Clearing accuracy', 'Received documents correctly assessed against the open condition', 'The Stage 1 value case'],
        ['Duplicate suppression rate', 'Proposals suppressed as already open', 'Agreement evidence'],
        ['Unmapped proposal rate', 'Proposals with no taxonomy equivalent', 'Mapping completeness'],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'Taxonomy mapping drafted by Underwriting', 'Mapping v1'],
    ['Pre-G0', 'Stage 1 read integration built and validated', 'Conditions flowing into Jazz'],
    ['Weekly', 'Mapping gaps and unmapped proposals reviewed', 'Mapping updates, guideline items'],
    ['Weekly', 'Condition-level metrics reported', 'Quality trend'],
    ['Day 45', 'Stage 2 position drafted with evidence', 'Draft recommendation'],
    ['At G2', 'Stage 2 decision by Steering with Compliance sign-off', 'Decision record'],
  ],

  dod: [
    'MU remains the sole system of record for conditions throughout',
    'Taxonomy mapping complete, owned by Underwriting, versioned and regression-tested',
    'No Jazz-originated condition issued to any borrower without affirmative human acceptance',
    'Provenance recorded on every condition touched by the studio',
    'Condition-level metrics available weekly and feeding the Gate 4 evidence pack',
  ],

  risks: [
    ['A Jazz-proposed condition reaches a borrower without human acceptance',
      'Architectural separation — proposals land in a review queue with no path to issuance; acceptance is affirmative and logged',
      'Head of Underwriting'],
    ['Two sources of truth for conditions emerge',
      'MU wins by rule in every conflict; Jazz state is refreshed from MU, never the reverse',
      'MU system owner'],
    ['Taxonomy mapping done by engineering on string similarity',
      'Owned by Underwriting; unmapped is a valid and expected outcome',
      'Head of Underwriting'],
    ['Mapping ambiguities papered over rather than escalated',
      'Every ambiguity logged as a guideline clarification item and reported at gates',
      'Head of Underwriting'],
    ['Stage 2 built early because it is the interesting problem',
      'Stage 2 is gated at G2 by charter; Stage 1 delivers most of the value and all of the clearing use case',
      'Studio Lead'],
    ['Provenance omitted, making Gate 4 attribution impossible',
      'Provenance is a build requirement for Stage 1 as well as Stage 2',
      'IT lead'],
  ],
},

/* ---------------------------------------------------- 22 DEPLOY --------- */
{
  id: '22',
  file: '22-Minimum-Change-Deployment-to-Production',
  section: 'Technology — Deploy Technology Changes',
  title: 'Minimum-Change Deployment to Production',
  strap: 'Every change we make is permanent if the answer at Day 90 is no.',

  purpose:
    'To define how the studio reaches production with the smallest possible permanent footprint. The studio needs real loans, which means real production data, which means real integration — while simultaneously needing to leave almost nothing behind if the Gate 4 answer is no. This document resolves that tension deliberately rather than letting engineering convenience resolve it by accident.',

  raci: [
    ['IT / Engineering lead', '', 'A — owns the deployment and its footprint'],
    ['Enterprise architecture', '', 'C — coupling and target-state fit'],
    ['InfoSec', '', 'A — production data access approval'],
    ['Studio Lead', '', 'R — holds the minimum-change discipline'],
    ['Steering Committee', '', 'A — approves any exception'],
    ['Head of Operations', '', 'C — support model and incident impact'],
  ],

  decisions: [
    'The governing test for every proposed change is: **would we keep this if Jazz went away tomorrow?** Yes means build it; no means find the smallest reversible version.',
    'The studio deploys **additively**. No changes to the LOS schema, no changes to the credit decision path, no new system of record, no modification of existing workflow logic.',
    'Production access is **read-only and narrowly scoped**, which is what allows real-loan evidence without a production-grade write integration.',
    'Every change carries a **stated removal cost and removal path**, recorded before it is built, so Gate 4 knows the stranded cost of a no-go.',
    'Production-grade hardening is **explicitly deferred to the scale phase.** The studio is not a soft launch and should not be engineered as one.',
  ],

  framework: [
    {
      heading: 'The three tiers of change',
      tables: [{
        columns: ['Tier', 'Meaning', 'Approval', 'Examples'],
        widths: [0.18, 0.28, 0.18, 0.36],
        boldFirstCol: true,
        rows: [
          ['**Configure**', 'Existing capability, new settings. Reversible in minutes',
            'IT lead',
            ['Cohort tag on existing fields', 'Entitlements for studio users', 'Monitoring and alert rules']],
          ['**Build — no-regret**', 'New work we would keep regardless of the Jazz outcome',
            'IT lead',
            ['Document capture quality improvements', 'Event instrumentation for the baseline', 'Data quality remediation', 'Document taxonomy standardisation']],
          ['**Build — Jazz-specific**', 'New work that is worthless if we stop',
            '**Steering, by exception only**',
            ['The trigger and extraction path', 'Any write-back mechanism', 'Jazz-specific monitoring']],
        ],
        note: 'Jazz-specific build is unavoidable — the studio cannot run without a trigger and an extraction path. The discipline is keeping that list short, reversible, and explicitly costed rather than allowing it to grow quietly.',
      }],
    },
    {
      heading: 'Resolving the real-data tension',
      body: [
        'The studio needs production loans; minimum-change argues against production integration. These are reconciled by separating read access from write capability rather than by separating production from non-production.',
      ],
      bullets: [
        '**Read from production, write nowhere.** A narrow, audited, read-only path carries the full evidentiary value of real loans while requiring none of the safeguards a write path demands.',
        '**No synthetic or masked data for the primary cohort.** Masking degrades documents in exactly the ways that break document recognition, and the resulting accuracy numbers would not transfer.',
        '**A non-production environment for regression and testing.** The holdout and regression runs (one-pager 16) do not need production; only the live cohort does.',
        '**Blast radius of zero.** If every studio component fails simultaneously, the standard workflow is unaffected. That property is what makes a lightweight support model defensible.',
      ],
    },
    {
      heading: 'Deliberately not building during the studio',
      body: [
        'Publishing this list is what keeps the footprint small. Each item is a legitimate scale-phase requirement, deferred rather than rejected.',
      ],
      bullets: [
        'High availability, failover, and production SLAs for the Jazz path',
        'LOS write-back and system-of-record automation (see one-pager 20)',
        'Auto-issuance of conditions to borrowers (see one-pager 21)',
        'Workflow redesign predicated on Jazz being present',
        'Self-service onboarding and user administration beyond the studio team',
        'Performance optimisation beyond the agreed latency target',
        'Integration with pricing, marketing, servicing, or post-close systems',
        'Bulk historical reprocessing beyond the holdout and regression sets',
      ],
    },
    {
      heading: 'Support model — define what "broken" means',
      body: [
        'The studio is not production-critical, and pretending otherwise imports a support burden the value does not yet justify. Say so explicitly, so that when something breaks at 6pm the response is proportionate and pre-agreed.',
      ],
      tables: [{
        columns: ['Failure', 'Impact', 'Response'],
        widths: [0.3, 0.34, 0.36],
        rows: [
          ['Jazz unavailable', 'Studio loans process normally without comparison data', 'Next business day; affected loans flagged for exclusion'],
          ['Trigger failing', 'Cohort under-fills', 'Same business day — sample is at risk'],
          ['Extraction degraded (partial documents)', '**Silent quality corruption**', 'Immediate — this is the one that misleads rather than merely stopping'],
          ['MU read failing', 'Clearing use case unavailable', 'Next business day'],
          ['Any borrower-facing impact', 'Sev 1 per one-pager 02', 'Immediate; studio pauses by default'],
        ],
        note: 'Degraded extraction outranks total failure. An outage is visible and self-correcting; partial data quietly produces wrong evidence.',
      }],
    },
  ],

  tables: [
    {
      title: 'Change register — every change recorded before it is built',
      columns: ['Change', 'Tier', 'Keep if Jazz goes away?', 'Removal path', 'Removal cost'],
      widths: [0.28, 0.14, 0.18, 0.22, 0.18],
      rows: [
        ['', 'Config / No-regret / Jazz-specific', 'Yes / No', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ],
      note: 'Totalled at Day 80 and carried into the Gate 4 pack as the stranded cost of a no-go — a number the decision is entitled to know.',
    },
    {
      title: 'Minimum viable monitoring',
      columns: ['Signal', 'Alerts when', 'Owner'],
      widths: [0.34, 0.4, 0.26],
      rows: [
        ['Trigger send success rate', 'Below 99% over a day', 'IT'],
        ['Extraction reconciliation exceptions', 'Any mismatch in page or field count', 'IT'],
        ['Time from trigger to Jazz output', 'Beyond the agreed latency target', 'IT'],
        ['Cohort fill rate vs. plan', 'Weekly shortfall against the sample trajectory', 'Studio Lead'],
        ['Auth and credential expiry', '14 days before expiry', 'IT'],
        ['Any write attempt (should be zero)', 'Immediately, always', 'InfoSec'],
      ],
      note: 'The last row is a tripwire, not a metric. During shadow it should never fire, and if it does, the studio pauses.',
    },
  ],

  cadence: [
    ['Pre-G0', 'Change register populated; production read access approved', 'Approved footprint'],
    ['Pre-G0', 'Deployment executed; blast radius verified by test', 'Working studio path'],
    ['Weekly', 'Change register reviewed — anything added without approval?', 'Footprint control'],
    ['Weekly', 'Monitoring signals reviewed in the feedback loop', 'Operational health'],
    ['Day 80', 'Removal cost totalled for the Gate 4 pack', 'Stranded-cost figure'],
    ['Post-G4', 'Either hardening begins, or removal executes to the recorded path', 'Scale or clean exit'],
  ],

  dod: [
    'Zero changes to the LOS schema, the credit decision path, or existing workflow logic',
    'Production access read-only, narrowly scoped, and audited',
    'Blast radius verified by test — studio failure does not affect the standard workflow',
    'Every change in the register with a removal path and a costed removal',
    'The not-building list published and enforced',
    'Removal cost presented at G4 as an input to the decision',
  ],

  risks: [
    ['Minimum change erodes as convenient additions accumulate',
      'Change register reviewed weekly; Jazz-specific build requires Steering approval by exception',
      'IT lead'],
    ['Studio engineered as a soft launch and acquires production obligations',
      'Support model and non-goals stated at G0; the not-building list is published',
      'Head of Operations'],
    ['Read-only intent not enforced technically',
      'Write attempts monitored as a tripwire that pauses the studio; permissions grant read only',
      'InfoSec'],
    ['Degraded extraction goes unnoticed and corrupts evidence',
      'Reconciliation exceptions alert on any mismatch; ranked above total outage in the support model',
      'IT lead'],
    ['Stranded cost of a no-go is unknown at the decision',
      'Removal cost recorded per change as it is built, totalled at Day 80',
      'Finance'],
    ['Removal never happens after a no-go and the footprint persists',
      'Removal path recorded before build; execution is a tracked post-G4 deliverable',
      'IT lead'],
  ],
},

];
