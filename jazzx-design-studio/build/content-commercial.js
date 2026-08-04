/* One-pagers 23–26 — Logistics: Commercial Alignment. */

module.exports = [

/* ------------------------------------------------ 23 COST & TIMELINE ---- */
{
  id: '23',
  file: '23-Cost-and-Timeline',
  section: 'Logistics — Commercial Alignment',
  title: 'Cost & Timeline',
  strap: 'What the 90 days actually costs, and why scale pricing is negotiated before you know the answer.',

  purpose:
    'To establish the true cost of the studio — not just the vendor invoice — and to structure payment and timeline so that commercial terms reinforce the gate model rather than undermining it. The most consequential decision in this document is when scale pricing gets agreed, because the moment the studio proves value your negotiating position collapses.',

  raci: [
    ['Finance / FP&A', '', 'A — owns the cost model and the business case'],
    ['Procurement / Vendor Management', '', 'R — negotiates and holds the paper'],
    ['Executive Sponsor', '', 'A — approves the envelope'],
    ['Studio Lead', '', 'C — validates what is actually needed'],
    ['IT lead', '', 'C — internal integration cost'],
    ['Head of Underwriting', '', 'C — internal labour cost of capacity relief'],
  ],

  decisions: [
    '**Scale pricing is agreed before Gate 2**, while the answer is still unknown. Negotiating it after a successful studio means negotiating from the weakest position you will ever hold.',
    'The studio is priced as a **fixed fee**, not time and materials. Fixed fee moves delivery risk to the party that controls delivery and stops the budget conversation from consuming the weekly loop.',
    'Payment milestones are **tied to gates, not calendar dates**, so that commercial incentives and evidence requirements point the same direction.',
    'The cost model includes **internal cost** — capacity relief, IT effort, opportunity cost. Reporting only the vendor fee understates the studio by a wide margin and produces a business case Finance will not defend.',
    'Every Gate 4 outcome has a **pre-agreed budget consequence**, including Stop. An outcome with no number attached is not a decision (see one-pager 07).',
  ],

  framework: [
    {
      heading: 'The leverage window',
      body: [
        'A vendor\'s pricing for a full rollout is never better than it is before the pilot succeeds. During the studio you hold a credible alternative — stop — and the vendor holds an unconverted opportunity. At Day 91, if the evidence is good, you hold an internal expectation of scale, a team that has learned the product, and integration work already done. Every one of those is a reason the price goes up.',
        'The countermeasure is simple and costs nothing: agree scale pricing as part of the studio contract, contingent on a go decision, with a validity period that extends past Gate 4. If the vendor will not price scale before the studio, that is itself useful information about how the relationship will run.',
      ],
      bullets: [
        'Scale pricing agreed at contract signature, valid through **Gate 4 plus 90 days**',
        'Priced across a **volume range**, so the number does not depend on a forecast nobody can make yet',
        'Includes the run-rate cost of support, enablement and any per-loan or per-seat component',
        'Includes the cost of a **Narrow** outcome — a reduced scope should not carry full-scope pricing',
        'No exclusivity, no auto-renewal, and no minimum commitment that outlives the decision',
      ],
    },
    {
      heading: 'Pricing structures compared',
      tables: [{
        columns: ['Structure', 'How it works', 'Use when', 'Risk to us'],
        widths: [0.18, 0.28, 0.26, 0.28],
        boldFirstCol: true,
        rows: [
          ['Fixed fee', 'One price for a defined 90-day scope', '**The studio default**', 'Scope must be tight or every request becomes a change order'],
          ['Time & materials', 'Billed against hours consumed', 'Genuinely undefined discovery work', 'Budget becomes a weekly conversation; delivery risk sits with us'],
          ['Per loan', 'Priced per loan processed', 'Scale phase, once volume is known', 'At studio volume the unit price is meaningless and usually punitive'],
          ['Subscription + services', 'Platform fee plus implementation', 'Long-term relationship already decided', 'Commits before the evidence exists — avoid for a studio'],
        ],
        note: 'Fixed fee for the studio, with scale priced separately and in advance, is the structure that keeps the gate model honest.',
      }],
    },
    {
      heading: 'The cost nobody puts in the model',
      body: [
        'The vendor invoice is frequently the smaller half. If the business case only nets against the licence, it will not survive a Finance review, and worse, it will overstate the value in a way that is discovered after the scale commitment.',
      ],
      tables: [{
        columns: ['Cost line', 'Basis', 'Often missed because'],
        widths: [0.28, 0.34, 0.38],
        rows: [
          ['JazzX fixed fee', 'Contract', '—'],
          ['Capacity relief', 'Released FTE × fully loaded cost × 90 days', 'It feels like existing headcount rather than a studio cost'],
          ['Backfill or pipeline reduction', 'Overtime, contractor, or deferred volume', 'The cost lands in another cost centre'],
          ['IT integration effort', 'Engineer days × loaded rate', 'Absorbed into a run-the-bank budget'],
          ['Studio Lead', '1.0 FTE for a quarter', 'Frequently a senior person whose time is expensive'],
          ['Control function time', 'InfoSec, Compliance, Model Risk, Procurement', 'Spread thin across many people'],
          ['Review overhead in ops', 'The parallel-run tax (one-pager 04)', 'Measured by the studio but left out of the cost model'],
          ['Opportunity cost', 'What the team would otherwise have delivered', 'Uncomfortable, but Finance will ask'],
        ],
      }],
    },
    {
      heading: 'Timeline commitments — what a date actually means',
      bullets: [
        'The 90 days are **gate-driven**; contractual dates should reference gates, not fixed calendar days',
        'A gate that extends does **not** automatically trigger additional vendor fees — build this in, or Extend becomes financially punitive and the gate stops being honest',
        'Vendor dependency dates (one-pager 01) are contractual obligations with named consequences, not aspirations',
        'Our own dependencies — security review, environment access, data extraction — are equally binding, and slippage on our side should not create a vendor claim if it was caused by their late input',
        'One extension of up to 60 days is priced in advance so the Extend outcome is available without renegotiation',
      ],
    },
  ],

  tables: [
    {
      title: 'Cost model — complete before G0, refresh at G4',
      columns: ['Line', 'Studio (90 days)', 'At scale (annual)'],
      widths: [0.44, 0.28, 0.28],
      rows: [
        ['JazzX fees', '', ''],
        ['Internal labour — studio team', '', ''],
        ['Backfill / pipeline reduction', '', ''],
        ['IT integration and run cost', '', ''],
        ['Control function time', '', ''],
        ['Review overhead in operations', '', ''],
        ['Contingency', '', ''],
        ['**Total cost**', '', ''],
        ['Loans processed', '', ''],
        ['**Cost per loan**', '', ''],
      ],
      note: 'The scale column is an estimate at G0 and a defended figure at G4. Both are needed — the G0 version is what tells you whether the studio is worth running at all.',
    },
    {
      title: 'Payment schedule tied to gates',
      columns: ['Milestone', 'Trigger', '% of fee'],
      widths: [0.34, 0.42, 0.24],
      rows: [
        ['Mobilisation', 'Contract signature; environment provisioned', ''],
        ['G1 — baseline locked', 'Extraction working; shadow processing live', ''],
        ['G2 — live authorised', 'Accuracy evidence delivered; enablement on track', ''],
        ['G3 — live period complete', 'Live slice operating; defects triaged', ''],
        ['G4 — decision', 'Evidence pack delivered; independence assessment complete', ''],
      ],
      note: 'Holding a meaningful final tranche to G4 keeps vendor attention on evidence quality and enablement through the last month, which is exactly when both usually slip.',
    },
    {
      title: 'Budget pre-commitment by outcome — agreed at G0',
      columns: ['Outcome', 'Budget consequence', 'Approved by'],
      widths: [0.2, 0.54, 0.26],
      rows: [
        ['Scale', 'Scale envelope of $___ released within 30 days', ''],
        ['Narrow', 'Reduced-scope pricing applies without renegotiation', ''],
        ['Extend', 'Incremental limit of $___ for up to 60 days', ''],
        ['Stop', 'No further spend; exit and data return costs of $___ funded', ''],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'Cost model built; scale pricing negotiated; envelope approved', 'Signed commercials'],
    ['Monthly', 'Actual vs. budget, including internal cost', 'Cost tracking'],
    ['At each gate', 'Payment milestone assessed against evidence, not calendar', 'Payment release'],
    ['Day 70', 'Scale cost model refreshed with real studio data', 'Defensible scale figure'],
    ['At G4', 'Full cost presented alongside value; outcome consequence triggered', 'Business case'],
  ],

  dod: [
    'Scale pricing agreed and valid through G4 plus 90 days, before Gate 2',
    'Fixed-fee studio scope with change control, not time and materials',
    'Payments tied to gate evidence rather than calendar dates',
    'Internal cost tracked with the same rigour as vendor cost',
    'Every G4 outcome carrying a pre-approved budget number, including Stop',
  ],

  risks: [
    ['Scale pricing negotiated after a successful studio',
      'Agreed at contract signature with a validity window past G4; a refusal to price is a signal in itself',
      'Procurement'],
    ['Business case built on vendor fee alone and fails Finance review',
      'Finance owns the cost model and includes internal cost from G0',
      'Finance'],
    ['Extend becomes financially punitive so the gate is not taken honestly',
      'Extension priced in advance as part of the original contract',
      'Executive Sponsor'],
    ['Scope creep converted into change orders that erode the fixed fee',
      'Tight scope definition (one-pager 24) with named deliverables and change control',
      'Procurement'],
    ['Auto-renewal or minimum commitment survives a no-go',
      'No auto-renewal, no minimum, termination for convenience — checked at MSA level (one-pager 26)',
      'Legal'],
    ['Internal cost is invisible so the studio looks cheaper than it is',
      'Capacity relief and IT effort tracked as studio cost lines from Day 1',
      'Finance'],
  ],
},

/* ------------------------------------------------------------ 24 SCOPE -- */
{
  id: '24',
  file: '24-Commercial-Scope-Definition',
  section: 'Logistics — Commercial Alignment',
  title: 'Commercial Scope Definition',
  strap: 'Named deliverables with quantities and acceptance — because "support as required" is not a scope.',

  purpose:
    'To define what JazzX is contractually obliged to deliver, what we are obliged to provide, and how either party knows a deliverable is complete. This is distinct from the studio\'s operational scope: one-pager 10 defines which loans the studio runs, while this document defines what the vendor owes us. Vague scope is the single most common source of mid-studio friction, and it is entirely preventable at contract stage.',

  raci: [
    ['Procurement / Vendor Management', '', 'A — owns the scope schedule'],
    ['Studio Lead', '', 'R — specifies what is actually needed'],
    ['IT lead', '', 'C — technical deliverables and dependencies'],
    ['Finance', '', 'C — links scope to price'],
    ['Legal', '', 'C — acceptance and remedy language'],
    ['JazzX Engagement Lead', '', 'C — commits on the vendor side'],
  ],

  decisions: [
    'Every deliverable has a **named quantity and an acceptance criterion.** "Reasonable support", "best efforts" and "as required" are removed from the document.',
    '**People are named**, not roled. A commitment to "a solutions engineer" is a commitment to nobody; the studio depends on continuity of the individual who learns our guidelines.',
    'Enablement is a **contracted deliverable with acceptance**, not a courtesy. If it is not in scope with a test, it will be the first thing to slip (see one-pager 18).',
    '**Our obligations are in scope too.** A one-sided scope lets delivery failures be attributed to us without evidence, and lets our own slippage go unmanaged.',
    'Anything not listed is **out of scope and priced separately** — stated explicitly rather than left to inference.',
  ],

  framework: [
    {
      heading: 'JazzX deliverables — the minimum specification',
      tables: [{
        columns: ['Deliverable', 'Quantity / specification', 'Accepted when'],
        widths: [0.28, 0.36, 0.36],
        boldFirstCol: true,
        rows: [
          ['Environment', 'Dedicated studio environment, provisioned by Day −7', 'Our team can log in and process a test loan end to end'],
          ['Integration support', 'Named engineer, ___ hours/week through Day 30', 'Extraction working and reconciled on real files'],
          ['Tuning engineer', 'Named individual, ___ hours/week, Days 15–90', 'Weekly cycle delivered without slippage'],
          ['Builder Studio access', '___ named users, live by Day 30, including one underwriter', 'Our users can make and ship a change'],
          ['Structured enablement', '___ sessions, defined syllabus, by Day 30', 'Independence assessment passed at Day 85 (one-pager 18)'],
          ['Audit-grade output logging', 'Live by Day 45', 'Any output reconstructible for any studio loan'],
          ['Model change notification', 'Written notice ___ days before any model change', 'Notice actually received before a change lands'],
          ['Documentation', 'Configuration, prompts, mappings — retainable by us', 'Held in our systems, readable without vendor tooling'],
          ['Escalation', 'Named contacts, defined response times', 'Two escalations handled within the stated times'],
          ['Exit support', 'Data return and deletion within ___ days of notice', 'Certificate of deletion received'],
        ],
      }],
    },
    {
      heading: 'Our obligations — equally binding',
      bullets: [
        'Named studio team released and available from Day 1 (one-pager 09)',
        'Environment and network access for the vendor within the agreed security envelope',
        'Data extraction from our side working to the agreed specification by Day 10',
        'Named decision-makers available for gate reviews within the scheduled window',
        'Test data and a defined set of representative loan files for initial configuration',
        'Timely security review completion — with the caveat that our review cannot be delayed by their late documentation',
      ],
    },
    {
      heading: 'Explicitly out of scope',
      body: [
        'Naming these prevents the most common mid-studio dispute, which is not about what was promised but about what was assumed.',
      ],
      bullets: [
        'Production-grade hosting, availability guarantees, or SLAs beyond the studio support model (one-pager 22)',
        'Custom development beyond configuration and tuning within the product',
        'Integration with any system other than those named in the scope schedule',
        'Write-back to our system of record unless separately approved at G2 (one-pager 20)',
        'Training for users outside the named studio team',
        'Historical reprocessing beyond the agreed holdout and regression sets',
        'Any commitment on model performance — the studio exists to measure it, not to have it warranted',
      ],
    },
    {
      heading: 'Change control',
      steps: [
        'A change request is raised in writing by either party, with the reason and the deliverable affected.',
        'The Studio Lead assesses whether it is genuinely new scope or a clarification of existing scope — most requests are the latter, and clarifications are not chargeable.',
        'Genuine scope changes are priced against the agreed rate card before any work begins.',
        'Anything that moves a gate date requires a Steering decision (one-pager 02), not just a commercial agreement.',
        'The change register is reviewed at every gate so cumulative drift is visible rather than discovered at the end.',
      ],
    },
  ],

  tables: [
    {
      title: 'Named individuals — the continuity that actually matters',
      columns: ['Role', 'Named individual', 'Commitment', 'Replacement terms'],
      widths: [0.26, 0.24, 0.24, 0.26],
      rows: [
        ['Engagement lead', '', '', 'Notice + handover overlap'],
        ['Integration engineer', '', '', ''],
        ['Tuning engineer', '', '', ''],
        ['Enablement lead', '', '', ''],
      ],
      note: 'Require a handover overlap for any replacement. A new engineer who has not learned our condition taxonomy costs weeks that the 90 days do not have.',
    },
    {
      title: 'Scope change register',
      columns: ['Change', 'Raised by', 'New scope or clarification?', 'Price', 'Gate impact'],
      widths: [0.28, 0.16, 0.24, 0.14, 0.18],
      rows: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'Scope schedule agreed with quantities and acceptance criteria', 'Signed scope'],
    ['Weekly', 'Deliverable status reviewed in the working group', 'Delivery tracking'],
    ['Biweekly', 'Change register reviewed', 'Drift visibility'],
    ['At each gate', 'Deliverables accepted or formally not accepted', 'Acceptance record'],
    ['At G4', 'Final acceptance and any outstanding obligations recorded', 'Closeout'],
  ],

  dod: [
    'Every deliverable carrying a quantity and an acceptance criterion',
    'Named individuals with replacement and handover terms',
    'Our obligations documented alongside theirs',
    'Out-of-scope list explicit rather than implied',
    'Change register reviewed at every gate with no undisclosed cumulative drift',
  ],

  risks: [
    ['"Support as required" language leaves the vendor commitment unenforceable',
      'Quantities and acceptance criteria on every line; Legal reviews for vague terms before signature',
      'Procurement'],
    ['Key vendor individual replaced mid-studio',
      'Named individuals with notice and handover overlap terms',
      'Procurement'],
    ['Enablement slips because it is not a contracted deliverable',
      'In scope with acceptance tied to the Day 85 independence assessment',
      'Studio Lead'],
    ['Clarifications repriced as change orders',
      'Studio Lead assesses new-scope vs. clarification before any pricing conversation',
      'Studio Lead'],
    ['Our own late delivery becomes the vendor\'s defence for missing theirs',
      'Our obligations documented and tracked with the same discipline',
      'Studio Lead'],
    ['Vendor asked to warrant model performance, which they cannot and should not',
      'Performance is measured by the studio, not warranted; stated as out of scope',
      'Legal'],
  ],
},

/* -------------------------------------------------------------- 25 SOW -- */
{
  id: '25',
  file: '25-Statement-of-Work',
  section: 'Logistics — Commercial Alignment',
  title: 'Statement of Work (SOW)',
  strap: 'The studio-specific terms that a standard implementation SOW will not contain.',

  purpose:
    'To specify what the SOW must contain for a 90-day AI studio, as distinct from a normal software implementation. A studio has three properties an implementation does not: it is designed to be capable of failing, it produces evidence rather than a system, and it is meant to leave capability behind. Each of those needs a clause that standard templates omit.',

  raci: [
    ['Procurement / Vendor Management', '', 'A — owns the SOW'],
    ['Legal', '', 'A — drafts and approves terms'],
    ['Studio Lead', '', 'R — supplies the operational substance'],
    ['IT lead', '', 'C — technical and data terms'],
    ['InfoSec', '', 'C — data handling and security obligations'],
    ['Executive Sponsor', '', 'A — signs'],
  ],

  decisions: [
    '**Intellectual property in what we build is ours.** Prompts, condition mappings, configurations and tuning artifacts derived from our guidelines and our data must not be vendor IP, or the capability transfer in one-pager 18 is illusory.',
    'The SOW contains an **explicit no-go path** — termination at G4 with no penalty, defined data return and deletion, and no residual commitment.',
    '**Publicity is restricted until Gate 4**, and reference use requires separate written consent. This is contractual, not a request.',
    '**Model change notification** is a contractual obligation with a notice period. A silent model upgrade mid-studio invalidates the comparison the studio exists to produce.',
    '**Our borrower data is not used to train** models serving other customers, without exception and without an opt-out buried in a policy document.',
  ],

  framework: [
    {
      heading: 'The three clauses standard templates miss',
      tables: [{
        columns: ['Clause', 'Why a studio needs it', 'What happens without it'],
        widths: [0.24, 0.38, 0.38],
        boldFirstCol: true,
        rows: [
          ['**IP in tuning artifacts**',
            'Prompts and condition mappings encode our credit policy, developed by our underwriters',
            'The capability we spent 90 days building cannot be taken to another vendor or operated independently — the enablement was theatre'],
          ['**Model change notification**',
            'The studio measures a system; if the system changes silently, the measurement is void',
            'Accuracy shifts mid-studio with no attributable cause; the improvement log (one-pager 16) becomes unreliable and Gate 4 evidence is unsound'],
          ['**Clean no-go exit**',
            'The studio is designed to be capable of producing a Stop',
            'Stop carries a financial or contractual penalty, so the gate stops being honest and the pilot drifts into a rollout'],
        ],
      }],
    },
    {
      heading: 'SOW checklist',
      body: [
        'Work through this before signature. Items marked with an asterisk are the ones most often missing from a vendor\'s standard template.',
      ],
      bullets: [
        'Scope schedule with quantities and acceptance criteria (one-pager 24)',
        'Named individuals with replacement and handover terms *',
        'Fixed fee, payment milestones tied to gates *',
        'Scale pricing, contingent on a go decision, valid past G4 *',
        'Extension pricing agreed in advance *',
        'IP: pre-existing IP stays with each party; **artifacts derived from our data and guidelines are ours** *',
        'Data handling: classes, purpose limitation, retention period, deletion, certificate of deletion',
        '**No training on our data** for models serving other customers *',
        'Model change notification with a defined notice period *',
        'Subprocessors listed, with notice and objection rights on change',
        'Security obligations aligned to the review (one-pager 27) and access controls (one-pager 28)',
        'Support model appropriate to a studio, not production (one-pager 22)',
        'Publicity and reference restriction until G4, then by written consent only *',
        'Termination for convenience with a short notice period *',
        'Exit: data return and deletion within a defined window, at no additional charge *',
        'No auto-renewal, no minimum volume, no exclusivity *',
        'Governing law, dispute resolution, limitation of liability (see one-pager 26 if under an MSA)',
      ],
    },
    {
      heading: 'IP — the clause worth spending time on',
      body: [
        'Over 90 days your underwriters will encode a meaningful amount of credit policy into prompts and condition mappings. That work product is a translation of your guidelines, produced by your people, using your data. If the SOW leaves it as vendor IP or is silent, three things follow: you cannot take it elsewhere, you may not be able to inspect it, and the "capability transfer" the studio was measuring becomes a dependency you have paid to create.',
      ],
      bullets: [
        'Pre-existing platform IP remains the vendor\'s — this is reasonable and should not be contested',
        'Configurations, prompts, condition mappings and tuning artifacts developed for us are **ours**, or at minimum licensed to us perpetually, irrevocably and transferably',
        'We can export them in a readable form at any time, without charge and without notice',
        'They are not used for other customers without our written consent',
        'On exit, we retain them regardless of the reason for termination',
      ],
    },
  ],

  tables: [
    {
      title: 'Data terms — complete before signature',
      columns: ['Term', 'Position'],
      widths: [0.38, 0.62],
      rows: [
        ['Data classes transferred', 'Per one-pager 20; enumerated, not open-ended'],
        ['Purpose limitation', 'Studio use only; no secondary use'],
        ['Training on our data', '**Prohibited** for models serving other customers'],
        ['Retention period', ''],
        ['Deletion on request', 'Within ___ days, with certificate'],
        ['Data return format', 'Readable without vendor tooling'],
        ['Subprocessors', 'Listed; notice and objection on change'],
        ['Location of processing', ''],
        ['Breach notification', 'Within ___ hours'],
        ['Regulatory examination access', 'Per one-pager 26'],
      ],
    },
    {
      title: 'Signature readiness',
      columns: ['Check', 'Owner', 'Cleared'],
      widths: [0.56, 0.26, 0.18],
      rows: [
        ['Scope schedule complete with acceptance criteria', 'Studio Lead', ''],
        ['IP position secured on tuning artifacts', 'Legal', ''],
        ['No-training-on-our-data confirmed in writing', 'Legal', ''],
        ['Model change notification clause present', 'Studio Lead', ''],
        ['Scale and extension pricing agreed', 'Procurement', ''],
        ['Clean exit path with no penalty', 'Legal', ''],
        ['Publicity restriction to G4', 'Sponsor', ''],
        ['Security obligations aligned to the review', 'InfoSec', ''],
        ['Named individuals with handover terms', 'Procurement', ''],
      ],
    },
  ],

  cadence: [
    ['Pre-G0', 'SOW drafted, reviewed against the checklist, signed', 'Executed SOW'],
    ['At G0', 'Obligations extracted into the studio tracker', 'Deliverable tracking'],
    ['At each gate', 'Deliverables accepted; obligations reviewed', 'Acceptance record'],
    ['On any model change notice', 'Impact on comparison assessed before the change lands', 'Impact assessment'],
    ['At G4', 'Exit or scale provisions triggered per the decision', 'Closeout or scale SOW'],
  ],

  dod: [
    'IP in tuning artifacts secured to us before any tuning begins',
    'Written confirmation that our data does not train models for other customers',
    'Model change notification clause with a workable notice period',
    'Clean no-go exit with defined data return and no penalty',
    'Publicity restricted until G4',
    'Every SOW obligation tracked as a studio deliverable, not filed and forgotten',
  ],

  risks: [
    ['Tuning artifacts are vendor IP, making capability transfer illusory',
      'IP position secured before signature and before any tuning starts',
      'Legal'],
    ['A silent model change invalidates the studio comparison',
      'Contractual notification with notice period; configuration version logged per loan (one-pager 16)',
      'Studio Lead'],
    ['Our borrower data used to train models for other customers',
      'Explicit prohibition in the SOW; confirmed in writing, not inferred from a policy page',
      'Legal'],
    ['Exit carries penalty or unclear data return, so Stop becomes expensive',
      'Termination for convenience; defined return and deletion at no charge',
      'Legal'],
    ['Vendor publishes the engagement before a decision exists',
      'Publicity restriction to G4, then written consent only',
      'Executive Sponsor'],
    ['Standard vendor template signed under time pressure',
      'Checklist worked through before signature; the studio does not start without it',
      'Procurement'],
  ],
},

/* -------------------------------------------------------------- 26 MSA -- */
{
  id: '26',
  file: '26-Master-Services-Agreement',
  section: 'Logistics — Commercial Alignment',
  title: 'Master Services Agreement (MSA)',
  strap: 'The durable terms underneath the SOW — written for an AI vendor handling borrower data in a regulated business.',

  purpose:
    'To set the terms that outlive the studio. The SOW covers 90 days; the MSA governs the relationship for years and is the document that matters if something goes wrong, if JazzX is acquired, or if a regulator asks how a third party influencing credit decisions is controlled. Negotiate it once, properly, before the studio — renegotiating an MSA after a successful pilot is the worst possible timing.',

  raci: [
    ['Legal', '', 'A — owns the agreement'],
    ['Procurement / Vendor Management', '', 'R — negotiates'],
    ['Third-Party Risk', '', 'A — vendor risk assessment and ongoing oversight'],
    ['InfoSec', '', 'C — security and incident terms'],
    ['Compliance', '', 'C — regulatory examination and record-keeping'],
    ['CRO / Executive Sponsor', '', 'A — approves the risk position'],
  ],

  decisions: [
    'The MSA is negotiated **before the studio**, not after. Signing a thin agreement to start quickly and fixing it later means fixing it from a position of dependence.',
    '**Regulatory examination access** is required. As a lender, our supervisors can examine our third-party service providers, and the agreement must not obstruct that.',
    '**AI-specific terms are added** — training data use, model change notification, output ownership, explainability support. A general software MSA does not cover a system influencing credit decisions.',
    '**Change of control triggers our rights**, not just notice. AI vendors are acquired frequently, and an acquirer may have a different data posture.',
    'Liability is proportionate to the **data and decisions at stake**, not to the fee. A cap set at 12 months of a studio fee is meaningless against a borrower data incident.',
  ],

  framework: [
    {
      heading: 'AI-specific terms a general MSA will not contain',
      tables: [{
        columns: ['Term', 'Position to take', 'Why it matters here'],
        widths: [0.24, 0.38, 0.38],
        boldFirstCol: true,
        rows: [
          ['Training data use', 'Our data is never used to train models serving other customers',
            'Borrower data and our encoded credit policy are the two things we cannot allow to leak into a competitor\'s tooling'],
          ['Model change notification', 'Written notice before any material model change, with a defined period',
            'Model behaviour is the thing we are measuring and later relying on; silent change is unmanageable risk'],
          ['Output ownership', 'Outputs generated on our data are ours',
            'Conditions and extractions become part of the loan file and the record'],
          ['Explainability support', 'Vendor supports our ability to articulate reasons for any output influencing a decision',
            'Adverse action requires specific principal reasons (one-pager 03); we cannot satisfy that alone'],
          ['Performance warranties', 'None sought on accuracy; warranties on availability and security instead',
            'Accuracy is measured by the studio; a warranty here would be unenforceable theatre'],
          ['Model provenance', 'Disclosure of underlying models and any third-party model providers',
            'Their subprocessor is our fourth party, and our regulators treat it as ours'],
        ],
      }],
    },
    {
      heading: 'Regulated-lender terms',
      bullets: [
        '**Regulatory examination access** — our supervisors may examine the vendor\'s books and records relating to services provided to us; the vendor cooperates at no charge',
        '**Audit rights** — we may audit security and data handling annually and after any incident',
        '**Record retention** — the vendor retains records for the period our regulations require, not their default',
        '**Business continuity and resilience** — tested plans, with results shared',
        '**Subcontracting** — no subcontracting of material services without consent; subprocessors disclosed and change-notified',
        '**Insurance** — cyber and professional liability at levels proportionate to the data held',
        '**Incident notification** — within a defined number of hours, with our right to notify borrowers and regulators as required',
        '**Exit and transition assistance** — the vendor supports orderly transition even on termination for cause, and cannot hold data hostage',
      ],
    },
    {
      heading: 'Change of control — the term people skip',
      body: [
        'AI companies get acquired. An acquirer may have different data practices, different subprocessors, different jurisdictions, or may be a competitor. Notice alone is not protection; the agreement should give us a decision.',
      ],
      bullets: [
        'Written notice of any change of control within a defined period',
        'A **termination right** exercisable for a window after notice, without penalty',
        'Data return and deletion obligations survive the change and bind the acquirer',
        'No assignment of the agreement without our consent where the assignee is a competitor',
        'Continuity of the named individuals for a transition period, or a right to terminate',
      ],
    },
    {
      heading: 'Liability — sizing the cap to the risk',
      body: [
        'Vendors default to a cap of fees paid, often 12 months. For a 90-day studio that is a small number set against borrower data and credit decisions. Two carve-outs matter more than the headline cap.',
      ],
      bullets: [
        '**Data breach and confidentiality** — uncapped or capped at a level reflecting the data, not the fee',
        '**IP indemnity** — the vendor indemnifies us for claims that their model or its training infringes third-party rights; this is a live risk in generative AI and is frequently excluded',
        'Gross negligence and wilful misconduct excluded from the cap as standard',
        'Regulatory fines attributable to vendor failure addressed explicitly rather than left ambiguous',
      ],
    },
  ],

  tables: [
    {
      title: 'MSA negotiation checklist',
      columns: ['Term', 'Our position', 'Agreed'],
      widths: [0.36, 0.46, 0.18],
      rows: [
        ['Training on our data', 'Prohibited', ''],
        ['Model change notification', 'Written, ___ days notice', ''],
        ['Output ownership', 'Ours', ''],
        ['Explainability support', 'Required', ''],
        ['Regulatory examination access', 'Required, no charge', ''],
        ['Audit rights', 'Annual and post-incident', ''],
        ['Subprocessors', 'Disclosed; consent on material change', ''],
        ['Data location', 'Defined; change requires consent', ''],
        ['Incident notification', 'Within ___ hours', ''],
        ['Breach / confidentiality liability', 'Carved out of the cap', ''],
        ['IP indemnity', 'Vendor indemnifies', ''],
        ['Change of control', 'Notice + termination right', ''],
        ['Termination for convenience', 'Permitted, ___ days notice', ''],
        ['Exit and transition assistance', 'Required, including on termination for cause', ''],
        ['Insurance', 'Cyber and professional liability at $___', ''],
      ],
    },
    {
      title: 'Third-party risk record',
      columns: ['Item', 'Status'],
      widths: [0.44, 0.56],
      rows: [
        ['Vendor tier / criticality rating', ''],
        ['SOC 2 Type II or equivalent reviewed', ''],
        ['Financial viability assessed', ''],
        ['Concentration risk considered', ''],
        ['Subprocessor / fourth-party map', ''],
        ['Business continuity plan reviewed', ''],
        ['Exit plan documented', ''],
        ['Ongoing monitoring cadence set', ''],
        ['Next review date', ''],
      ],
      note: 'Vendor viability at scale is a must-pass criterion at Gate 4 (one-pager 07). This record is the evidence for it.',
    },
  ],

  cadence: [
    ['Pre-G0', 'MSA negotiated and executed before the SOW', 'Executed MSA'],
    ['At G0', 'Third-party risk record completed and tiered', 'Vendor risk assessment'],
    ['On any notice', 'Model change, subprocessor change, or change of control assessed', 'Impact assessment'],
    ['At G4', 'Viability and terms reassessed for scale', 'Must-pass evidence'],
    ['Annually', 'Vendor review, audit rights exercised as appropriate', 'Ongoing oversight'],
  ],

  dod: [
    'MSA executed before the studio begins, not retrofitted after',
    'Training-on-our-data prohibition and model change notification both present',
    'Regulatory examination access secured',
    'Breach liability and IP indemnity carved out of a fee-based cap',
    'Change of control giving us a termination right, not merely notice',
    'Third-party risk record complete and feeding the Gate 4 viability criterion',
  ],

  risks: [
    ['Thin agreement signed to start quickly, renegotiated from dependence later',
      'MSA executed before the SOW; the studio does not start without it',
      'Legal'],
    ['General software MSA used, missing every AI-specific term',
      'AI terms checklist applied explicitly; Legal briefed that this is not a standard SaaS purchase',
      'Legal'],
    ['Liability capped at studio fees against borrower-data exposure',
      'Breach and confidentiality carved out; cap sized to data, not fee',
      'Legal'],
    ['Vendor acquired mid-relationship by a party with a different data posture',
      'Change of control triggers notice and a termination right',
      'Third-Party Risk'],
    ['Regulator cannot examine a third party influencing credit decisions',
      'Examination access secured contractually before any production use',
      'Compliance'],
    ['IP infringement claim arising from model training excluded from indemnity',
      'Vendor IP indemnity negotiated explicitly; a refusal is a material risk finding',
      'Legal'],
  ],
},

];
