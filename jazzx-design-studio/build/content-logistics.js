/* One-pagers 02–07 — Logistics: Production Readiness and Define Proof of Value. */

module.exports = [

/* ------------------------------------------------------ 02 GOVERNANCE ---- */
{
  id: '02',
  file: '02-Governance-Structure',
  section: 'Logistics — Production Readiness',
  title: 'Governance Structure',
  strap: 'Who decides what, how fast, and who can stop the program.',

  purpose:
    'To establish the decision-making body for the Design Studio before it is needed, so that questions of authority are settled in advance rather than negotiated in the middle of a live issue. Governance here has two jobs: move ordinary decisions quickly enough that the studio does not stall, and ensure the decisions that carry regulatory or borrower risk are made by people accountable for them.',

  raci: [
    ['Executive Sponsor', '', 'A — chairs Steering, owns go / no-go'],
    ['Design Studio Lead', '', 'R — chairs Working Group, runs escalation'],
    ['Model Risk / Validation', '', 'C — standing member, holds a block right'],
    ['Compliance / Legal', '', 'C — standing member, holds a block right'],
    ['Information Security', '', 'C — consulted at G0 and on any data-scope change'],
    ['Third-Party Risk', '', 'C — owns the vendor relationship record'],
    ['JazzX Engagement Lead', '', 'C — attends Working Group, not Steering votes'],
  ],

  decisions: [
    'Governance is **three-tier**: a Steering Committee that decides at gates, a Working Group that decides weekly, and Control Functions that advise continuously and can block.',
    'Control functions hold a **block right, not a vote**. They cannot direct the studio, but Compliance or Model Risk can prevent a gate from advancing, and that block is recorded in writing with its remediation condition.',
    'Any decision not explicitly reserved to Steering is delegated to the Working Group. **Silence delegates downward**, so the studio never waits for permission that no one was required to give.',
    'Jazz is entered into the **model inventory** at G0 and tiered before shadow processing begins, regardless of whether it is classified as a model or a tool.',
    'JazzX attends the Working Group as a delivery partner but is **not present for gate votes or for any discussion of vendor viability**.',
  ],

  framework: [
    {
      heading: 'The three tiers',
      tables: [{
        columns: ['Body', 'Members', 'Meets', 'Decides'],
        widths: [0.2, 0.28, 0.14, 0.38],
        boldFirstCol: true,
        rows: [
          ['Steering Committee',
            ['Exec Sponsor (chair)', 'Head of UW', 'Head of Ops', 'CRO or delegate', 'Finance', 'Studio Lead'],
            'Biweekly + every gate',
            ['Gate outcomes (Advance / Extend / Stop)', 'Scope changes that move Day 90', 'Budget beyond approved SOW', 'Authorisation to run live on real borrowers', 'The G4 go / no-go']],
          ['Design Studio Working Group',
            ['Studio Lead (chair)', 'Lead underwriter', 'Lead processor', 'Data/IT analyst', 'JazzX engagement lead'],
            'Weekly',
            ['Tuning priorities and the tuning backlog', 'Process adjustments inside the studio', 'Which loans enter the studio', 'Defect severity classification', 'Everything not reserved above']],
          ['Control Functions',
            ['Model Risk', 'Compliance / Legal', 'InfoSec', 'Third-Party Risk', 'QC'],
            'At gates + on call',
            ['Whether a control is adequate', 'Whether a gate may advance (block right)', 'Whether a data scope change is permitted', 'Adverse-action and disclosure posture']],
        ],
      }],
    },
    {
      heading: 'Decision rights — what does not need to escalate',
      body: [
        'The most common way a studio stalls is that everything feels like it needs the sponsor. This matrix is the antidote: if a decision appears in the Working Group column, it is made in the weekly meeting and recorded, full stop.',
      ],
      tables: [{
        columns: ['Decision', 'Made by', 'Escalates only if'],
        widths: [0.4, 0.24, 0.36],
        rows: [
          ['Change a prompt, condition rule or document template', 'Working Group', 'It changes what is disclosed to a borrower'],
          ['Add or remove a loan from the studio cohort', 'Studio Lead', 'It changes the agreed slice definition'],
          ['Reclassify a defect severity', 'Working Group', 'Severity 1 — automatic Steering notification'],
          ['Adjust the weekly operating rhythm', 'Studio Lead', 'Never'],
          ['Change a baseline metric definition', 'Steering', 'Always — after G1 lock, effectively never'],
          ['Expand the data set sent to JazzX', 'InfoSec + Steering', 'Always'],
          ['Move a loan from shadow to live handling', 'Steering', 'Always — this is the G2 authorisation'],
          ['Pause the studio', 'Any control function', 'Immediate; Steering convenes within 24 hours'],
        ],
      }],
    },
    {
      heading: 'Model risk and third-party risk fit',
      body: [
        'Jazz is a third-party AI system that influences credit decisions. Whether or not it meets your institution\'s formal definition of a model, treat it as one for the duration of the studio — the cost of doing so is a week of documentation, and the cost of not doing so is discovering at G4 that the evidence is not admissible to your own risk committee.',
      ],
      bullets: [
        '**Inventory entry at G0** — Jazz recorded with owner, purpose, tier, and the decisions it influences',
        '**Tiering before shadow** — the tier drives validation depth; a system touching credit decisions is rarely low tier',
        '**Validation approach agreed at G0** — what evidence Model Risk will require at G2 and G4, specified in advance so the studio collects it as it goes',
        '**Explainability requirement stated up front** — if a Jazz output contributes to a denial, the reason must be articulable in adverse-action terms',
        '**Third-party record** — SOC 2 or equivalent, data flows, subprocessors, exit provisions and data-return terms',
        '**Human-in-the-loop control documented** — the studio\'s core control through Day 80 is that a qualified human makes every decision; this must be a documented control, not an informal habit',
      ],
    },
    {
      heading: 'If you do not have a model risk function',
      body: [
        'Smaller lenders often will not. Do not skip the discipline — compress it. Appoint a named individual (typically the credit policy owner) as **accountable reviewer**, and require three artifacts before G2: a written description of what Jazz does and does not decide, a test result set against known-outcome loans, and a documented fallback procedure for when Jazz is unavailable or wrong. That is the minimum defensible package.',
      ],
    },
  ],

  tables: [
    {
      title: 'Escalation ladder and response times',
      columns: ['Severity', 'Definition', 'Route', 'Response'],
      widths: [0.14, 0.4, 0.22, 0.24],
      boldFirstCol: true,
      rows: [
        ['Sev 1', 'Borrower harmed or potentially harmed; regulatory exposure; data incident', 'Studio Lead → Sponsor + Compliance immediately', 'Studio pauses by default; Steering within 24h'],
        ['Sev 2', 'Systematic quality failure; Jazz materially wrong on a class of loans', 'Studio Lead → Working Group + Model Risk', 'Triage within 1 business day'],
        ['Sev 3', 'Isolated error, tuning issue, process friction', 'Working Group backlog', 'Next weekly cycle'],
        ['Sev 4', 'Enhancement request or observation', 'Improvement log', 'Reviewed at gate'],
      ],
    },
    {
      title: 'Charter — to be completed and signed at G0',
      columns: ['Item', 'To fill in'],
      widths: [0.38, 0.62],
      rows: [
        ['Steering quorum', 'Sponsor + one control function + Studio Lead (suggested minimum)'],
        ['Working Group quorum', 'Studio Lead + lead underwriter (suggested minimum)'],
        ['Decision record location', ''],
        ['Standing block-right holders', ''],
        ['Sponsor delegate when unavailable', ''],
        ['Studio pause authority', ''],
        ['Charter review date', ''],
      ],
    },
  ],

  cadence: [
    ['Weekly, Thu', 'Working Group — tuning, blockers, defect triage', 'Decision log, tuning backlog'],
    ['Biweekly', 'Steering — gate trajectory, risks, decisions reserved to Steering', 'Decision record'],
    ['At each gate', 'Gate review with control functions present and evidence circulated 48h ahead', 'Advance / Extend / Stop, recorded'],
    ['On Sev 1', 'Emergency Steering within 24 hours', 'Pause / resume determination'],
    ['Day 45', 'Governance health check — is anything routinely escalating that should be delegated?', 'Charter amendment if needed'],
  ],

  dod: [
    'Charter signed by the Executive Sponsor before Day 1',
    'Named individuals in every governance seat, with named delegates',
    'Jazz entered in the model inventory and tiered before the first shadow loan',
    'Decision rights matrix published to the studio team and visibly used',
    'Every gate outcome recorded in writing, including any dissent',
  ],

  risks: [
    ['Governance becomes a reporting ritual rather than a decision body',
      'Every meeting must produce at least one recorded decision or be cancelled',
      'Executive Sponsor'],
    ['Control functions engage only at G2 and block late',
      'Standing membership from Day 0; validation evidence requirements stated at G0',
      'CRO'],
    ['Vendor is in the room for decisions about the vendor',
      'JazzX excluded from gate votes and viability discussion by charter',
      'Studio Lead'],
    ['Sponsor unavailable and decisions queue',
      'Named delegate with full authority; decisions do not wait for a calendar',
      'Steering Committee'],
    ['Jazz classified as "just a tool" to avoid model governance',
      'Classification decision documented and reviewed by Model Risk at G0, not assumed',
      'CRO'],
  ],
},

/* -------------------------------------------------- 03 COMMUNICATIONS ---- */
{
  id: '03',
  file: '03-Borrower-and-Internal-Communications',
  section: 'Logistics — Production Readiness',
  title: 'Borrower & Internal Communications',
  strap: 'What we say, to whom, at which phase — and what we never say.',

  purpose:
    'To control the narrative for two audiences whose reactions determine whether the studio survives: borrowers, whose trust and regulatory protections are engaged the moment AI touches a real decision, and staff, whose cooperation the studio depends on and whose fears will be filled by rumor if not filled by us. This document sets the posture for each phase and provides the actual language.',

  raci: [
    ['Studio Lead', '', 'R — owns the plan and its execution'],
    ['Compliance / Legal', '', 'A — approves all borrower-facing language'],
    ['Marketing / Communications', '', 'R — drafts and distributes'],
    ['HR', '', 'C — owns the employment-impact narrative'],
    ['Head of Underwriting', '', 'C — delivers internal messages to the front line'],
    ['Executive Sponsor', '', 'A — owns external and press posture'],
  ],

  decisions: [
    'During **shadow (Days 1–60) there is no change to the borrower experience**, no borrower-facing disclosure is triggered, and no borrower is told anything different. The loan is decided by a human exactly as before.',
    'At **limited live (Day 61) borrower-facing posture activates**, and the disclosure decision is made by Compliance at G2 — not by the studio and not by marketing.',
    'Internal communication begins **before** external, and begins **before Day 1**. Staff learn about this from their leadership, not from a vendor logo on a screen.',
    'The employment question is answered **explicitly and early**. We state the 90-day commitment on headcount in writing rather than allowing the absence of a statement to be read as a threat.',
    'No press, no case study, no vendor co-marketing, and no LinkedIn posts about the studio before G4. This is contractual with JazzX, not a request.',
  ],

  framework: [
    {
      heading: 'Borrower communications — the compliance spine',
      body: [
        'The obligations below are the ones that most often surprise lenders adopting AI in origination. Compliance owns the final determination; the studio\'s job is to surface these early enough that the answer is not rushed at Day 58.',
      ],
      bullets: [
        '**Adverse action (ECOA / Reg B).** If a Jazz output contributes to a denial or a less-favourable term, the notice must state the specific principal reasons. "The model said so" is not a reason. Before any live denial can involve Jazz, the studio must demonstrate that Jazz\'s contribution can be expressed in adverse-action language.',
        '**Fair lending.** Disparate impact is assessed on outcomes, not intent. The studio should be sampling live-phase outcomes by protected class from Day 61, not constructing the analysis at Day 88.',
        '**UDAAP.** Any borrower-facing statement about speed or automation that the process does not reliably deliver is a potential unfair or deceptive practice. Avoid marketing the studio to borrowers entirely.',
        '**State-level AI disclosure.** An expanding patchwork of state requirements around automated decision-making and consumer notice. Compliance confirms applicability for the states in the selected slice at G0, not at G2.',
        '**Servicing and downstream.** Confirm nothing in the studio alters investor, MI, or agency representations for loans in the cohort.',
      ],
    },
    {
      heading: 'Internal communications — answer the real question',
      body: [
        'Every underwriter and processor hears "AI pilot" and asks one question. If leadership does not answer it in the first message, the team answers it for themselves, and the answer they invent is always worse than the truth. Address it in the kickoff message, by name.',
      ],
      bullets: [
        'State the headcount commitment for the 90 days plainly, and only commit to what is actually true',
        'Explain that shadow mode **adds** work before it removes any, and say what capacity relief is being provided',
        'Be explicit that studio participants are not being evaluated on whether they agree with Jazz — dissent is the data we need',
        'Name the feedback channel and demonstrate in week one that it changes something',
        'Never describe the studio as "seeing if we still need underwriters." Even as a joke, it ends candid feedback permanently',
      ],
    },
    {
      heading: 'Message matrix',
      tables: [{
        columns: ['Audience', 'Phase', 'Message', 'Channel / Owner'],
        widths: [0.2, 0.16, 0.42, 0.22],
        boldFirstCol: true,
        rows: [
          ['Studio team', 'Pre-Day 1', 'What we are testing, why you, what changes for you, what does not, how to raise a problem', 'In person / Studio Lead'],
          ['Wider originations', 'Week 1', 'A small team is testing an AI tool in parallel; no change to your work; here is where to ask', 'Team meeting / Head of UW'],
          ['All staff', 'Week 1', 'Brief, factual, includes the headcount statement', 'Email / Sponsor'],
          ['Studio team', 'Weekly', 'What we learned, what changed because you flagged it', 'Weekly loop / Studio Lead'],
          ['Loan officers', 'Pre-Day 61', 'Your loans in this slice now touch a new workflow; here is what to tell a borrower who asks', 'Briefing / Ops'],
          ['Borrowers', 'Day 61+', 'Posture determined by Compliance at G2 — default is no proactive change', 'Per Compliance'],
          ['All staff', 'Day 90+', 'What we found and what happens next — including if the answer is no', 'Email / Sponsor'],
        ],
      }],
    },
  ],

  tables: [
    {
      title: 'Holding statements — agree the wording before you need it',
      columns: ['Situation', 'Response posture'],
      widths: [0.32, 0.68],
      rows: [
        ['Borrower asks: "Did a computer decide my loan?"',
          '"No. Your loan was reviewed and decided by one of our underwriters. We do use technology to help organise and check documents, the same way we always have." — accurate only while a human decides every file, which is why this is true through Day 80.'],
        ['Borrower asks why their file was slower / faster',
          'Answer on the facts of their file. Never attribute either outcome to the pilot.'],
        ['Staff member asks: "Is this replacing my job?"',
          'Direct answer, consistent with the written headcount commitment. Escalate to HR if the honest answer is uncertain — an evasive answer is worse than a hard one.'],
        ['Loan officer asks about their pipeline',
          '"A defined slice is in the studio. Your loans are handled to the same standards and the same SLAs." Escalate exceptions.'],
        ['Press or industry analyst enquiry',
          'No comment on the pilot; route to Communications. Nothing on the record before G4.'],
        ['Regulator or auditor asks during exam',
          'Route to Compliance immediately. Provide the governance charter and the human-in-the-loop control documentation — do not improvise.'],
      ],
    },
    {
      title: 'Communications risk register — the three phrases to ban',
      columns: ['Never say', 'Because', 'Say instead'],
      widths: [0.28, 0.42, 0.3],
      rows: [
        ['"AI-powered underwriting"', 'Implies automated decisioning we are not doing and may trigger disclosure obligations', '"Technology that helps our underwriters"'],
        ['"Faster approvals guaranteed"', 'A promise the studio cannot keep; UDAAP exposure', 'Nothing — do not market the pilot to borrowers'],
        ['"We are seeing how much we can automate"', 'Ends candid staff feedback the day it is said', '"We are testing where this actually helps"'],
      ],
    },
  ],

  cadence: [
    ['Pre-Day 1', 'Studio team briefing and all-staff note', 'Kickoff message sent'],
    ['Weekly', 'Studio team update in the feedback loop — including what changed from their input', 'Visible response to feedback'],
    ['Biweekly', 'Wider originations update — short, factual, no hype', 'Team meeting note'],
    ['Before G2', 'Compliance determination on borrower disclosure posture', 'Written posture decision'],
    ['Before Day 61', 'Loan officer and ops briefing for the live slice', 'Briefing delivered, FAQ issued'],
    ['After G4', 'Outcome communication to all staff, whatever the outcome', 'Closing message'],
  ],

  dod: [
    'Every borrower-facing word approved by Compliance before use',
    'Headcount commitment issued in writing before Day 1',
    'Holding statements agreed and distributed before Day 61',
    'Adverse-action articulability demonstrated before any live denial involves Jazz',
    'No external communication about the studio before G4',
    'Closing communication issued even if the decision is no-go — especially if it is',
  ],

  risks: [
    ['Rumor outruns the official message',
      'Internal comms precede Day 1; named channel for questions; visible weekly response',
      'Head of Underwriting'],
    ['A borrower-facing disclosure obligation is discovered at Day 58',
      'Compliance determination scheduled at G0 and confirmed at G2, not at go-live',
      'Compliance'],
    ['Vendor publishes a case study or logo before G4',
      'Contractual publicity restriction in the SOW; confirmed in writing at kickoff',
      'Executive Sponsor'],
    ['Staff stop reporting Jazz errors because it feels disloyal to the program',
      'Dissent framed as the deliverable; celebrate the first significant error a team member finds',
      'Studio Lead'],
    ['Enthusiastic exec describes the pilot externally at a conference',
      'Sponsor holds the external posture and briefs the exec team on the embargo',
      'Executive Sponsor'],
  ],
},

/* ------------------------------------------------ 04 CHANGE MANAGEMENT --- */
{
  id: '04',
  file: '04-Change-Management',
  section: 'Logistics — Production Readiness',
  title: 'Change Management',
  strap: 'Getting underwriters and processors to use it, tell the truth about it, and keep doing so.',

  purpose:
    'To manage the human side of the studio, where most AI pilots actually fail. The technology risk in a 90-day studio is modest and well understood; the adoption risk is not. This document addresses the parallel-run tax, the accountability question, and the specific resistance patterns that appear when experienced credit professionals are asked to work alongside a system that appears to second-guess them.',

  raci: [
    ['Head of Underwriting', '', 'A — owns adoption in the front line'],
    ['Studio Lead', '', 'R — runs the change plan'],
    ['HR / People', '', 'C — employment narrative, capacity relief'],
    ['Team leads / supervisors', '', 'R — daily reinforcement'],
    ['Studio participants', '', 'R — the change happens through them'],
  ],

  decisions: [
    'The **parallel-run tax is real and is funded.** Shadow mode means doing parts of the work twice. Studio participants receive documented capacity relief; we do not ask for the studio on top of a full pipeline.',
    'Studio participants are **not measured on agreement with Jazz.** Their production metrics are held harmless for the studio period, and disagreement is treated as the primary deliverable.',
    'The **accountability question is answered before Day 61**: when Jazz is wrong and a human approved it, the human is not penalised provided they followed the documented review process.',
    'Adoption is **measured**, not assumed. Usage, feedback volume, and sentiment are tracked weekly as leading indicators of studio validity.',
    'Participation in the studio is a **development opportunity with a named benefit** to the participant, stated at selection.',
  ],

  framework: [
    {
      heading: 'The four resistance patterns and what actually works',
      tables: [{
        columns: ['Pattern', 'Sounds like', 'Root cause', 'Counter-move'],
        widths: [0.18, 0.26, 0.24, 0.32],
        boldFirstCol: true,
        rows: [
          ['Expertise threat', '"It does not understand a self-employed borrower."',
            'Identity is bound to hard-won judgement',
            'Put them in the tuning seat. An underwriter who has corrected the system owns the result rather than resisting it.'],
          ['Trust deficit', '"It was wrong on that file last week."',
            'One salient error outweighs fifty silent successes',
            'Publish accuracy openly, including failures. Log every reported error visibly and show the fix.'],
          ['Workload resentment', '"I do not have time for this on top of my pipeline."',
            'Entirely legitimate — shadow adds work',
            'Fund the capacity relief. This is the single highest-leverage intervention available.'],
          ['Blame anxiety', '"If I approve what it flagged and it is wrong, whose fault is it?"',
            'Unanswered accountability',
            'Answer it in writing before Day 61 and have the Head of UW say it out loud.'],
        ],
      }],
    },
    {
      heading: 'The parallel-run tax',
      body: [
        'This deserves its own treatment because underestimating it corrupts the evidence. In shadow mode the underwriter does their normal work **and** reviews what Jazz produced **and** records where it differed. Realistically that is an added 15–25% of touch time per studio loan in the early weeks, falling as familiarity grows.',
        'If that time is not funded, participants will rush the comparison step. The studio will then produce quality data that reflects rushed humans rather than the system — and the G2 accuracy read will be wrong in a direction nobody can detect. Fund the relief, and record the actual added time as a studio metric in its own right, because it is a real cost that belongs in the business case.',
      ],
    },
    {
      heading: 'Adoption plan by phase',
      tables: [{
        columns: ['Phase', 'Change objective', 'Intervention'],
        widths: [0.24, 0.34, 0.42],
        boldFirstCol: true,
        rows: [
          ['Pre-Day 1', 'Awareness and safety',
            ['Selection conversation with each participant', 'Written headcount commitment', 'Metrics held harmless confirmed in writing']],
          ['Days 1–30', 'Familiarity, not yet performance',
            ['Hands-on training with real files', 'Daily 15-minute debrief', 'Explicit permission to be slow while learning']],
          ['Days 31–60', 'Ownership through tuning',
            ['Participants drive the tuning backlog', 'Visible fixes from their feedback', 'Peer demonstration between participants']],
          ['Days 61–80', 'Operating under live conditions',
            ['Accountability statement issued', 'Supervisor reinforcement', 'Rapid defect triage so trust is not lost to a slow fix']],
          ['Days 81–90', 'Capture and transition',
            ['Structured exit interviews with every participant', 'Participants co-present findings at G4', 'Named next step for each participant']],
        ],
      }],
    },
  ],

  tables: [
    {
      title: 'Adoption metrics — leading indicators of studio validity',
      columns: ['Metric', 'How measured', 'Healthy signal', 'Warning'],
      widths: [0.26, 0.28, 0.22, 0.24],
      rows: [
        ['Comparison completion rate', 'Studio loans with a recorded human-vs-Jazz comparison', '> 95%', 'Falling — capacity problem'],
        ['Feedback volume', 'Items raised per participant per week', 'Steady or rising', 'Drops to zero — disengagement, not perfection'],
        ['Error reports', 'Jazz errors flagged by participants', 'Consistent flow', 'Zero for a week — nobody is looking'],
        ['Time-to-fix', 'Days from participant report to resolved or explained', '< 7 days', '> 14 days kills reporting'],
        ['Participant sentiment', 'One-question weekly pulse', 'Stable or improving', 'Sharp drop after any process change'],
        ['Voluntary use', 'Once optional, do they still use it?', 'Rising in Phase 3', 'The most honest metric available'],
      ],
    },
    {
      title: 'Accountability statement — to be signed by the Head of Underwriting before Day 61',
      columns: ['Question', 'Answer to be confirmed'],
      widths: [0.42, 0.58],
      rows: [
        ['If Jazz is wrong and I followed the review process, am I at fault?', 'No — documented process followed means no individual fault'],
        ['If I override Jazz and I am right, does that count against me?', 'No — overrides are expected and are studio data'],
        ['If I override Jazz and I am wrong, what happens?', 'Normal QC process, unchanged from today'],
        ['Does my studio work affect my production metrics?', 'No — held harmless for the studio period'],
        ['Who do I tell when something looks wrong?', ''],
        ['What happens to my role after Day 90?', ''],
      ],
    },
  ],

  cadence: [
    ['Daily (Phase 1)', '15-minute debrief — friction, surprises, errors', 'Observation log'],
    ['Weekly', 'Participant pulse plus feedback review in the weekly loop', 'Sentiment trend, tuning backlog'],
    ['Biweekly', 'Supervisor check-in with each participant, one to one', 'Individual concerns surfaced early'],
    ['At G2', 'Readiness conversation — does the team feel safe going live?', 'Go / no-go input from the front line'],
    ['At G4', 'Exit interviews with every participant', 'Qualitative findings for the evidence pack'],
  ],

  dod: [
    'Capacity relief documented and actually delivered, not merely promised',
    'Metrics-held-harmless commitment issued in writing before Day 1',
    'Accountability statement signed and communicated before Day 61',
    'Adoption metrics tracked weekly with at least one intervention triggered by them',
    'Every participant interviewed at exit and their input represented at G4',
  ],

  risks: [
    ['Capacity relief promised but not delivered under volume pressure',
      'Sponsor re-confirms release at every gate; comparison completion rate is the early warning',
      'Executive Sponsor'],
    ['Participants tell the studio what it wants to hear',
      'Dissent explicitly framed as the deliverable; anonymous channel available; watch for feedback volume falling',
      'Studio Lead'],
    ['Best performers selected, so results do not generalise',
      'Deliberate mix of experience levels; documented in the evidence pack as a limitation',
      'Head of Underwriting'],
    ['Adoption collapses after one visible Jazz failure',
      'Fast, visible triage; publish accuracy including failures from week one so no single error is a surprise',
      'Studio Lead'],
    ['Studio participants return to BAU at Day 91 with no recognition',
      'Named next step and recognition agreed at selection, delivered at close',
      'HR'],
  ],
},

/* ---------------------------------------------------- 05 DEFINE VALUE ---- */
{
  id: '05',
  file: '05-Define-What-Value-Looks-Like',
  section: 'Logistics — Define Proof of Value',
  title: 'Define What Value Looks Like',
  strap: 'Labor, quality and cycle-time — defined precisely enough to survive a finance review.',

  purpose:
    'To define, before any measurement begins, exactly what "better" means and how each measure is computed. Vague value definitions are the most common reason a technically successful pilot fails to convert into a funded program: the studio produces improvement that nobody agreed in advance would count. Every metric here has a precise definition, a data source, and a named trap.',

  raci: [
    ['Finance / FP&A', '', 'A — owns the definitions that enter the business case'],
    ['Studio Lead', '', 'R — assembles and maintains the metric set'],
    ['Head of Underwriting', '', 'C — validates operational realism'],
    ['QC / Quality', '', 'C — owns quality definitions'],
    ['Data / BI analyst', '', 'R — implements the measurement'],
  ],

  decisions: [
    'Value is measured in **three families — labor, quality, cycle-time — plus a guardrail set** that must not degrade. A gain in one family purchased by a loss in a guardrail is not value.',
    'Labor is measured as **touch time per loan by role**, never as headcount. The studio measures work; decisions about staffing are explicitly out of scope.',
    'Quality distinguishes **false clears from false conditions.** They are not symmetric — a missed condition creates repurchase and credit exposure, while an unnecessary condition creates friction and cost. They get separate thresholds.',
    'All value is reported **net of cost**: license, integration, and the review overhead the workflow adds.',
    'Any metric that cannot be computed from an auditable source is **descriptive only** and cannot carry the business case.',
  ],

  framework: [
    {
      heading: 'Family 1 — Labor',
      tables: [{
        columns: ['Metric', 'Precise definition', 'Source', 'The trap'],
        widths: [0.2, 0.34, 0.18, 0.28],
        boldFirstCol: true,
        rows: [
          ['Underwriter touch time', 'Sum of active minutes on a file by an underwriter, from first open to final decision, excluding waiting', 'Observation + LOS event log', 'Elapsed time is not touch time. Measuring elapsed inflates the apparent gain enormously.'],
          ['Processor touch time', 'Active minutes spent gathering, chasing and indexing documents', 'Observation + LOS', 'Chasing borrowers is often the real cost and is not affected by Jazz.'],
          ['Touches per loan', 'Count of discrete human interactions with the file', 'LOS event log', 'A "touch" needs one definition applied identically before and after.'],
          ['Condition clearing effort', 'Active minutes clearing conditions after initial decision', 'Observation', 'Frequently larger than the initial underwrite and frequently forgotten.'],
          ['Review overhead', 'Minutes spent reviewing Jazz output — the new cost the workflow adds', 'Studio log', 'Omitting this overstates net labor value. It must appear as a negative.'],
        ],
      }],
    },
    {
      heading: 'Family 2 — Quality',
      tables: [{
        columns: ['Metric', 'Precise definition', 'Source', 'The trap'],
        widths: [0.2, 0.34, 0.18, 0.28],
        boldFirstCol: true,
        rows: [
          ['Document recognition accuracy', 'Correctly classified documents ÷ total documents', 'Studio comparison log', 'Easy documents dominate the mix and flatter the average. Report by document type.'],
          ['Data extraction accuracy', 'Correctly extracted fields ÷ total fields, weighted by materiality', 'Comparison log', 'An unweighted average lets a correct ZIP code offset a wrong income figure.'],
          ['Condition precision', 'Conditions raised by Jazz that a human agrees were warranted', 'UW review', 'High precision alone can hide poor recall.'],
          ['Condition recall', 'Warranted conditions Jazz raised ÷ all warranted conditions', 'UW review', 'The one that matters for credit risk, and the harder one to measure.'],
          ['False clear rate', 'Files where Jazz raised no issue but a human found a material one', 'Comparison log', '**The most important quality metric in the pack.** Low frequency, high severity.'],
          ['Post-close defect rate', 'QC-identified defects per 100 closed loans', 'QC', 'Lags by weeks — will be thin inside 90 days; state it as directional.'],
          ['Rework rate', 'Files requiring a re-decision or re-work after initial decision', 'LOS', 'Definition drifts easily between teams.'],
        ],
      }],
    },
    {
      heading: 'Family 3 — Cycle-time',
      body: [
        'One structural caveat governs this entire family, and it should be stated at every gate: **shadow mode cannot measure cycle-time improvement.** While humans make every decision, actual elapsed time is unchanged by definition. Through Day 60 the studio can only measure the components of cycle time and model the effect. Genuine cycle-time evidence exists only from the Phase 3 limited-live period — which is precisely why Gate 3 exists and why the live phase cannot be dropped when the schedule tightens.',
      ],
      tables: [{
        columns: ['Metric', 'Precise definition', 'Source', 'The trap'],
        widths: [0.2, 0.34, 0.18, 0.28],
        boldFirstCol: true,
        rows: [
          ['Application to CTC', 'Calendar days from complete application to clear-to-close', 'LOS', 'Dominated by borrower response time, which Jazz does not change.'],
          ['Decision turn time', 'Business hours from file assignment to initial decision', 'LOS', 'The segment Jazz most plausibly affects — measure it separately.'],
          ['Condition turn time', 'Hours from document receipt to condition cleared', 'LOS', 'Business hours, not calendar hours, or weekends distort everything.'],
          ['Queue / dwell time', 'Time a file sits unworked', 'LOS', 'Reveals capacity effects a touch-time metric hides.'],
          ['Time in touch vs. waiting', 'Ratio of active work to elapsed', 'Derived', 'The honest frame for what automation can and cannot compress.'],
        ],
      }],
    },
    {
      heading: 'Guardrails — must not degrade',
      body: [
        'These are not success metrics. They are the conditions under which a labor or cycle-time gain counts as value at all. A breach of any guardrail is a Gate blocker regardless of how strong the headline numbers are.',
      ],
      bullets: [
        'Credit quality — no increase in material defects or exception rates',
        'Fair lending — no adverse pattern in outcomes by protected class in the live cohort',
        'Borrower experience — no increase in complaints or in documents requested from the borrower',
        'Employee experience — no sustained decline in studio participant sentiment',
        'Investor and agency compliance — no findings attributable to the studio workflow',
        'Data security — zero incidents involving borrower data in the Jazz pipeline',
      ],
    },
  ],

  tables: [
    {
      title: 'Value hypothesis — state it before measuring, then test it',
      columns: ['Family', 'Hypothesis to fill in at G0', 'Primary metric', 'Believed because'],
      widths: [0.16, 0.34, 0.24, 0.26],
      rows: [
        ['Labor', 'Jazz reduces underwriter touch time per loan by ___%', 'UW touch time', ''],
        ['Quality', 'Jazz raises condition recall to ___% with no rise in false clears', 'False clear rate', ''],
        ['Cycle-time', 'Jazz reduces decision turn time by ___ hours', 'Decision turn time', ''],
        ['Cost', 'Net cost per loan falls by $___ after license and review overhead', 'Net cost per loan', ''],
      ],
      note: 'Writing the hypothesis down before measurement is what converts a demo into an experiment.',
    },
    {
      title: 'Net value calculation — the only number Finance will actually use',
      columns: ['Line', 'Basis'],
      widths: [0.5, 0.5],
      rows: [
        ['Labor minutes saved per loan × fully loaded cost per minute', 'Studio measurement'],
        ['Less: review overhead minutes × cost per minute', 'Studio measurement — do not omit'],
        ['Less: license cost per loan at studio volume and at scale volume', 'Contract'],
        ['Less: amortised integration and run cost', 'IT estimate'],
        ['Plus: quality benefit (avoided defect / repurchase exposure)', 'QC + Credit, modelled and flagged as modelled'],
        ['Plus: capacity value (loans absorbed without added headcount)', 'Finance, only if capacity is actually constrained'],
        ['**= Net value per loan**', 'Carried to the G4 business case'],
      ],
    },
  ],

  cadence: [
    ['At G0', 'Definitions locked and signed by Finance', 'Metric dictionary v1'],
    ['Weekly', 'Metric review — are the numbers being captured, are definitions holding?', 'Data quality note'],
    ['At G1', 'Baseline values populated against these definitions', 'Locked baseline'],
    ['At G2 and G3', 'Comparison against baseline on identical definitions', 'Gate evidence'],
    ['At G4', 'Net value per loan computed and defended to Finance', 'Business case'],
  ],

  dod: [
    'Every metric has a written definition, a named source, and a named owner',
    'Finance has signed the definitions before baseline capture begins',
    'Review overhead is included as a cost line, not quietly excluded',
    'Guardrails defined with explicit breach conditions',
    'The shadow-mode cycle-time caveat is stated in writing at every gate',
  ],

  risks: [
    ['Definitions drift between baseline and comparison',
      'Metric dictionary version-controlled and locked at G1; any change invalidates comparison and requires Steering',
      'Finance'],
    ['Elapsed time substituted for touch time because it is easier to pull',
      'Data source named per metric at G0; analyst attests to source at G1',
      'Data analyst'],
    ['Only headline metrics reported; guardrails quietly dropped',
      'Guardrails are a mandatory section of every gate pack',
      'Compliance'],
    ['Quality measured only where measurement is easy',
      'False clear rate is a mandatory metric even though it is the hardest to capture',
      'QC'],
    ['Value claimed gross, ignoring review overhead and license cost',
      'Finance owns the net calculation and presents it at G4, not the studio',
      'Finance'],
  ],
},

/* ------------------------------------------------------- 06 BASELINE ----- */
{
  id: '06',
  file: '06-Baseline-Targets-and-Success-Thresholds',
  section: 'Logistics — Define Proof of Value',
  title: 'Baseline, Targets & Success Thresholds',
  strap: 'Capturing "before" defensibly, and setting the bar before you can see where the ball landed.',

  purpose:
    'To produce a baseline that will survive scrutiny from Finance, Risk, and an auditor, and to set the thresholds that define success before results are visible. This is the highest-risk document in the pack: a baseline cannot be reconstructed after Jazz has begun influencing the workflow, and a threshold set after seeing the data is not a threshold.',

  raci: [
    ['Finance / FP&A', '', 'A — attests the baseline'],
    ['Data / BI analyst', '', 'R — builds and validates the capture'],
    ['Head of Underwriting', '', 'A — attests operational representativeness'],
    ['Studio Lead', '', 'R — runs the observation and assembly'],
    ['QC', '', 'C — quality baseline'],
    ['Executive Sponsor', '', 'A — signs the thresholds before G2'],
  ],

  decisions: [
    'The baseline is **locked at Gate 1 (Day 30)** and is never revised afterward using post-Jazz data. Errors found later are documented as limitations, not corrected retroactively.',
    'The baseline is drawn from the **same loan slice, same team, and same season** as the comparison period, or the mix difference is explicitly adjusted for and disclosed.',
    'Thresholds are set at **three levels — Minimum, Target, Stretch** — and are signed by the Sponsor **before Gate 2 evidence exists**.',
    'Where the sample cannot support a statistical claim, the result is reported as **directional** and labelled as such. The studio does not present underpowered findings as proof.',
    'Paired comparison is used wherever shadow mode allows it, because it is dramatically more efficient than comparing separate groups.',
  ],

  framework: [
    {
      heading: 'Four sources, triangulated',
      body: [
        'No single source is sufficient. LOS timestamps are complete but measure elapsed time rather than effort; observation measures effort accurately but covers few loans. Use them together and reconcile the difference explicitly.',
      ],
      tables: [{
        columns: ['Source', 'Gives you', 'Sample', 'Weakness'],
        widths: [0.22, 0.3, 0.16, 0.32],
        boldFirstCol: true,
        rows: [
          ['LOS event log', 'Cycle time, touches, queue time, volumes', 'All loans, 12 months', 'Elapsed only; event definitions may have changed historically'],
          ['Structured observation', 'True touch time by task', '20–30 loans', 'Small sample; observer effect inflates care'],
          ['QC file review', 'Defect and quality baseline', 'Standard QC sample', 'Lags; sampling may not match the studio slice'],
          ['Participant time diary', 'Task mix and interruption load', '2 weeks, all participants', 'Self-reported; use for structure, not for headline numbers'],
        ],
      }],
    },
    {
      heading: 'Sample size — what 90 days can and cannot prove',
      body: [
        'Be honest about this at G0 rather than discovering it at G4. For rate-type metrics compared across separate groups, the sample sizes required to detect small differences are far larger than a 90-day studio produces. The table below assumes a 20% baseline rate, 5% significance, 80% power.',
      ],
      tables: [{
        columns: ['Difference to detect', 'Loans needed per arm', 'Feasible in 90 days?'],
        widths: [0.36, 0.3, 0.34],
        rows: [
          ['20% → 5% (large)', '≈ 75', 'Yes'],
          ['20% → 10% (moderate)', '≈ 200', 'Only at reasonable volume'],
          ['20% → 15% (small)', '≈ 900', 'No — report as directional'],
        ],
        note: 'Indicative two-proportion sizing. Have the analyst recompute using your actual baseline rates at G0.',
      }],
      bullets: [
        '**Use paired comparison wherever possible.** Because shadow runs Jazz on the same loans the humans work, most quality metrics are paired rather than independent — the same file has both a human and a Jazz result. Paired designs typically need a fraction of the sample, and this single design choice does more for the studio\'s statistical power than any increase in volume.',
        '**Target 150–200 shadow loans** as the working plan for the slice, and confirm against the analyst\'s recomputed numbers at G0.',
        '**Cycle-time cannot be paired** — it is measured only in the Phase 3 live period, on a smaller sample, and will almost always be directional rather than conclusive. Plan the narrative for that now.',
      ],
    },
    {
      heading: 'Mix and seasonality — the silent baseline killer',
      body: [
        'A baseline taken in one month and a comparison taken two months later differ in more than Jazz. Purchase-refi mix, investor guidelines, staffing levels, volume pressure, and month-end effects all move the metrics. Before locking, the analyst produces a mix comparison and either shows the periods are comparable or states the adjustment applied.',
      ],
      bullets: [
        'Compare loan purpose, occupancy, channel, borrower income type and document complexity across periods',
        'Prefer a 12-month baseline window over a 1-month window where data allows, to average out seasonality',
        'Flag any guideline, staffing or system change inside the window as a documented limitation',
        'Where mix differs materially, report the metric both raw and mix-adjusted',
      ],
    },
  ],

  tables: [
    {
      title: 'Baseline record — populate and lock at G1',
      columns: ['Metric', 'Baseline value', 'n', 'Source', 'Window'],
      widths: [0.3, 0.18, 0.1, 0.22, 0.2],
      rows: [
        ['Underwriter touch time / loan', '', '', '', ''],
        ['Processor touch time / loan', '', '', '', ''],
        ['Touches per loan', '', '', '', ''],
        ['Decision turn time', '', '', '', ''],
        ['Condition turn time', '', '', '', ''],
        ['Application to CTC', '', '', '', ''],
        ['Document recognition accuracy', '', '', '', ''],
        ['Condition precision / recall', '', '', '', ''],
        ['False clear rate', '', '', '', ''],
        ['Rework rate', '', '', '', ''],
        ['Post-close defect rate', '', '', '', ''],
        ['Complaints per 100 loans', '', '', '', ''],
      ],
    },
    {
      title: 'Threshold structure — signed before G2 evidence exists',
      columns: ['Level', 'Meaning', 'Consequence if not met'],
      widths: [0.18, 0.46, 0.36],
      rows: [
        ['**Minimum**', 'Below this the studio has failed on that metric', 'Blocks the gate; triggers Extend or Stop'],
        ['**Target**', 'The level the business case assumes', 'Go remains possible but the business case is re-run at the actual number'],
        ['**Stretch**', 'Materially better than the business case', 'Accelerates scale scope and funding'],
      ],
      note: 'Set Minimum for every metric. Target and Stretch are only required for the metrics carrying the business case.',
    },
    {
      title: 'Threshold register — fill in at G0, sign before G2',
      columns: ['Metric', 'Baseline', 'Minimum', 'Target', 'Stretch'],
      widths: [0.32, 0.17, 0.17, 0.17, 0.17],
      rows: [
        ['Underwriter touch time / loan', '', '', '', ''],
        ['Decision turn time', '', '', '', ''],
        ['Document recognition accuracy', '', '', '', ''],
        ['Condition recall', '', '', '', ''],
        ['False clear rate', '', 'No worse than baseline', '', ''],
        ['Net cost per loan', '', '', '', ''],
      ],
      note: 'False clear rate is a guardrail: its Minimum is "no worse than baseline", never an improvement target traded against speed.',
    },
  ],

  cadence: [
    ['Days 1–10', 'Instrumentation built; historical extract validated', 'Data quality report'],
    ['Days 5–25', 'Structured observation across participants and loan types', 'Observation dataset'],
    ['Day 25', 'Baseline assembled; mix comparison produced', 'Draft baseline'],
    ['Day 28', 'Review with Finance, UW and QC; challenge session', 'Issues resolved or documented'],
    ['Day 30', 'Baseline attested and locked at G1', 'Signed baseline record'],
    ['Before G2', 'Thresholds signed by the Sponsor', 'Signed threshold register'],
  ],

  dod: [
    'Baseline locked, dated, and attested by Finance and Head of Underwriting',
    'Sample size and detectable difference stated per metric, not assumed',
    'Mix comparison produced and any adjustment disclosed',
    'Known limitations written down at lock time rather than discovered at G4',
    'Thresholds signed before Gate 2 evidence is visible, with the signature dated',
  ],

  risks: [
    ['Baseline never locks because the data is imperfect',
      'Time-boxed to Phase 1; lock with a documented-limitations clause rather than pursuing perfection',
      'Executive Sponsor'],
    ['Thresholds set after seeing results',
      'Signature is dated and held by Finance; unsigned thresholds block G2',
      'Finance'],
    ['Historical LOS events defined differently than today',
      'Analyst validates event definitions across the window before use',
      'Data analyst'],
    ['Observer effect inflates baseline care and therefore baseline quality',
      'Observe across several days; triangulate against LOS and QC rather than relying on observation alone',
      'Studio Lead'],
    ['Underpowered result presented as proof at G4',
      'Every metric reported with n and a conclusive/directional label',
      'Finance'],
    ['Sample too small because studio volume was optimistic',
      'Volume tracked weekly from Day 15; shortfall triggers a scope conversation at Day 45, not Day 85',
      'Studio Lead'],
  ],
},

/* --------------------------------------------------------- 07 GO/NO-GO --- */
{
  id: '07',
  file: '07-Go-No-Go-Decision-Criteria',
  section: 'Logistics — Define Proof of Value',
  title: 'Go / No-Go Decision Criteria',
  strap: 'The decision rule, written and signed before anyone can see the answer.',

  purpose:
    'To define the rule by which the Day 90 decision is made, in advance, so that the decision is an application of agreed criteria rather than an argument. This document also pre-commits what each outcome triggers, because a decision with no consequence attached is not a decision, and a no-go that nobody planned for quietly becomes a drift into indefinite pilot.',

  raci: [
    ['Executive Sponsor', '', 'A — makes the call'],
    ['Steering Committee', '', 'R — assesses evidence, records dissent'],
    ['Finance', '', 'R — owns the business case'],
    ['Compliance / Model Risk', '', 'C — hold a block right on any go'],
    ['Studio Lead', '', 'R — presents evidence, does not vote'],
    ['JazzX', '', 'Not present for the decision'],
  ],

  decisions: [
    'There are **four outcomes, not two**: Scale, Narrow, Extend, Stop. Framing the decision as a binary is what produces indefinite pilots.',
    'The criteria are **signed before Gate 2** and are not amended afterward. If circumstances genuinely change, amendment requires a Steering decision recorded before the evidence is reviewed.',
    'Must-pass criteria are **absolute**. No weighted score, however strong, overrides a failed must-pass.',
    'Every outcome has a **pre-committed consequence** — budget, scope and timeline — agreed at G0.',
    '**Extend is capped at one use, for a maximum of 60 days,** with a written statement of what will be different. A second extension is a Stop.',
  ],

  framework: [
    {
      heading: 'Must-pass criteria — any failure blocks a go',
      tables: [{
        columns: ['#', 'Criterion', 'Evidence', 'Owner'],
        widths: [0.07, 0.42, 0.33, 0.18],
        boldFirstCol: true,
        rows: [
          ['1', 'No unremediated borrower-impacting defect attributable to the studio workflow', 'Defect log with resolution status', 'QC'],
          ['2', 'False clear rate no worse than baseline', 'Comparison log with n and confidence', 'QC'],
          ['3', 'Compliance sign-off for continued production use', 'Written sign-off', 'Compliance'],
          ['4', 'Model risk validation requirements satisfied to the tier agreed at G0', 'Validation memo', 'Model Risk'],
          ['5', 'Adverse-action articulability demonstrated for any Jazz-influenced denial', 'Worked examples', 'Compliance'],
          ['6', 'No adverse fair lending pattern in the live cohort', 'Outcome analysis by protected class', 'Compliance'],
          ['7', 'Zero unresolved security or data incidents', 'InfoSec confirmation', 'InfoSec'],
          ['8', 'Vendor viability and contract terms acceptable at scale', 'Third-party risk assessment', 'Third-Party Risk'],
        ],
      }],
    },
    {
      heading: 'Weighted scorecard — applied only after all must-pass criteria clear',
      tables: [{
        columns: ['Dimension', 'Weight', 'Scored on', 'Score 1–5'],
        widths: [0.28, 0.12, 0.44, 0.16],
        boldFirstCol: true,
        rows: [
          ['Labor value', '25%', 'Net touch-time reduction per loan against threshold', ''],
          ['Quality value', '25%', 'Condition recall and recognition accuracy against threshold', ''],
          ['Cycle-time value', '15%', 'Decision turn time in the live period against threshold', ''],
          ['Economics', '15%', 'Net cost per loan and payback period at scale volume', ''],
          ['Operational fit', '10%', 'Can operations absorb this without heroics?', ''],
          ['Team capability', '5%', 'Can we tune and operate Jazz without JazzX in the room?', ''],
          ['Scale readiness', '5%', 'Is the path from slice to portfolio credible and costed?', ''],
        ],
        note: 'Weighted score ≥ 3.5 supports Scale; 2.5–3.5 indicates Narrow or Extend; < 2.5 indicates Stop.',
      }],
    },
    {
      heading: 'The four outcomes and what each triggers',
      tables: [{
        columns: ['Outcome', 'When', 'Pre-committed consequence'],
        widths: [0.16, 0.36, 0.48],
        boldFirstCol: true,
        rows: [
          ['**Scale**', 'All must-pass clear; weighted ≥ 3.5',
            ['Scale budget released to the pre-agreed figure', 'Program team stood up within 30 days', 'Next loan-type wave selected', 'Studio converts to a permanent capability']],
          ['**Narrow**', 'Must-pass clear; value concentrated in part of the slice',
            ['Production use continues only where value was proven', 'Contract right-sized to the narrower scope', 'Re-decision date set within 6 months']],
          ['**Extend**', 'Evidence genuinely inconclusive, not disappointing',
            ['One extension only, maximum 60 days', 'Written statement of what will be different', 'Incremental funding only', 'Second extension is not available']],
          ['**Stop**', 'Any must-pass fails, or weighted < 2.5',
            ['Production use ends on a defined date', 'Contract exit and data return executed per SOW', 'Findings written up and published internally', 'Team returns to BAU with recognition']],
        ],
      }],
    },
    {
      heading: 'Decision hygiene',
      bullets: [
        'Evidence pack circulated **48 hours** before the decision meeting; no new material introduced in the room',
        'Studio Lead presents and answers questions but does not vote — the builder does not grade the build',
        'JazzX is not present and does not see the evidence pack before the decision',
        'Dissent is recorded by name in the decision record, whatever the outcome',
        'The decision is minuted the same day and communicated to all staff within one week',
        'A Stop is written up and circulated as a legitimate, valuable outcome — a studio that cannot produce a no-go was never producing evidence',
      ],
    },
  ],

  tables: [
    {
      title: 'Decision record — completed in the G4 meeting',
      columns: ['Field', 'Entry'],
      widths: [0.38, 0.62],
      rows: [
        ['Date and attendees', ''],
        ['Must-pass results (8 of 8?)', ''],
        ['Weighted score', ''],
        ['Outcome (Scale / Narrow / Extend / Stop)', ''],
        ['Rationale in three sentences', ''],
        ['Dissent recorded (by name)', ''],
        ['Consequence triggered', ''],
        ['Next review date', ''],
        ['Sponsor signature', ''],
      ],
    },
    {
      title: 'Pre-commitment — agreed at G0, before anyone is invested in the answer',
      columns: ['If the outcome is', 'We have already agreed to'],
      widths: [0.24, 0.76],
      rows: [
        ['Scale', 'A scale budget envelope of $___ and a named program owner'],
        ['Narrow', 'A contract structure that permits a reduced scope without penalty'],
        ['Extend', 'An incremental funding limit of $___ and a hard stop date'],
        ['Stop', 'Contract exit terms, data return within ___ days, and no reputational cost to the team'],
      ],
      note: 'If the Stop row cannot be filled in at G0, the organisation is not running a studio — it is running a rollout with a pilot label.',
    },
  ],

  cadence: [
    ['At G0', 'Criteria drafted; pre-commitments agreed and funded', 'Draft criteria'],
    ['Before G2', 'Criteria and thresholds signed by the Sponsor, dated', 'Signed decision rule'],
    ['At G3', 'Dry run of the decision against interim evidence', 'Gaps in evidence identified with time to fix'],
    ['G4 − 48h', 'Evidence pack circulated', 'Pack issued'],
    ['At G4', 'Decision made, recorded, consequence triggered', 'Signed decision record'],
    ['G4 + 7 days', 'Outcome communicated to all staff', 'Closing communication'],
  ],

  dod: [
    'Criteria signed and dated before Gate 2 evidence was available',
    'All four outcomes pre-costed and pre-agreed at G0, including Stop',
    'Every must-pass criterion has a named owner and a named evidence artifact',
    'Decision recorded with rationale and any dissent, same day',
    'Consequence actually triggered within the committed timeframe',
  ],

  risks: [
    ['Criteria are softened once results are visible',
      'Signed and dated in advance, held by Finance; amendment requires a recorded Steering decision before evidence review',
      'Executive Sponsor'],
    ['Sunk cost drives a go despite a failed must-pass',
      'Must-pass criteria are absolute by charter; control functions hold a block right',
      'CRO'],
    ['Extend used repeatedly, creating an indefinite pilot',
      'One extension, 60 days maximum, written difference statement required',
      'Steering Committee'],
    ['Evidence pack arrives in the room and cannot be scrutinised',
      '48-hour rule; no new material admitted in the meeting',
      'Studio Lead'],
    ['A no-go is treated as a team failure and nobody says it',
      'Stop is pre-framed as a valid outcome; recognition committed regardless of result',
      'Executive Sponsor'],
    ['Vendor pressure applied late in the decision window',
      'JazzX excluded from the decision and from the evidence pack; commercial conversations paused during G4 week',
      'Executive Sponsor'],
  ],
},

];
