/* One-pagers 27–28 — Logistics: Production Readiness (security and access). */

module.exports = [

/* -------------------------------------------------- 27 SECURITY REVIEW -- */
{
  id: '27',
  file: '27-Security-Review',
  section: 'Logistics — Production Readiness',
  title: 'Security Review',
  strap: 'The longest-lead dependency in the whole programme. Start it before the contract is signed.',

  purpose:
    'To get the security review completed in time to start on Day 1, without cutting anything that matters. In most lenders this review is the single longest-lead item in the studio — routinely six to ten weeks — and it is largely outside the studio team\'s control. Treating it as a Phase 0 formality is the most reliable way to lose a month before the programme has begun.',

  raci: [
    ['Information Security', '', 'A — owns the review and the decision'],
    ['Third-Party Risk', '', 'R — vendor assessment'],
    ['IT / integration engineer', '', 'R — our side of the architecture'],
    ['Studio Lead', '', 'R — drives the schedule and unblocks'],
    ['Privacy / Data Protection', '', 'C — personal data assessment'],
    ['Procurement', '', 'C — contractual security obligations'],
  ],

  decisions: [
    'The review **starts before the SOW is countersigned.** Vendor documentation can be requested and assessed under NDA while commercial terms are still being negotiated.',
    'The review is **scoped to what the studio actually does** — a narrow, read-only, non-production-writing integration — rather than to a hypothetical full deployment. Reviewing the eventual scale architecture delays the studio by weeks and assesses a design that does not exist yet.',
    'Workstreams run **in parallel**, not in sequence. Vendor posture, data flow assessment, and our own integration review have different owners and no dependency on each other.',
    '**Conditional approval with compensating controls** is an acceptable outcome and should be actively sought where a finding does not bear on the studio\'s actual data flows.',
    'Any change to data scope, or any approval of write-back at G2, triggers a **re-review** — scoped to the delta, not a restart.',
  ],

  framework: [
    {
      heading: 'Three parallel workstreams',
      tables: [{
        columns: ['Workstream', 'Assesses', 'Owner', 'Typical duration'],
        widths: [0.24, 0.34, 0.2, 0.22],
        boldFirstCol: true,
        rows: [
          ['Vendor security posture', 'JazzX\'s own controls: SOC 2 Type II, pen test results, vulnerability management, personnel security, subprocessors',
            'Third-Party Risk', '3–6 weeks, mostly waiting on documents'],
          ['Data flow and privacy', 'What personal data leaves us, why, where it goes, how long it is held, lawful basis and any privacy assessment required',
            'InfoSec + Privacy', '2–4 weeks'],
          ['Our integration', 'The trigger, the extraction path, credentials, network exposure, logging, and the read-only property',
            'InfoSec + IT', '2–3 weeks'],
        ],
        note: 'Run all three from day one. Sequencing them is what turns a six-week review into a twelve-week one.',
      }],
    },
    {
      heading: 'Document pack — request on day one',
      body: [
        'Most of the elapsed time in a vendor security review is waiting for documents. Request everything at once, with a deadline, rather than discovering a gap in week four.',
      ],
      bullets: [
        'SOC 2 Type II report (current, with any bridge letter) — or ISO 27001 certificate and statement of applicability',
        'Most recent penetration test summary and remediation status',
        'Architecture and data flow diagrams for the services we will use',
        'Subprocessor list, including any third-party model providers',
        'Data location, retention and deletion practices',
        'Encryption in transit and at rest, and key management approach',
        'Access control model — who at the vendor can access customer data, and how that access is logged',
        'Incident response process and notification commitments',
        'Business continuity and disaster recovery plans, with test results',
        'Personnel security: background checks, training, offboarding',
        'AI-specific: training data practices, model hosting, whether customer data leaves their environment for inference',
      ],
    },
    {
      heading: 'Compressing without cutting',
      steps: [
        '**Start under NDA before signature.** Nothing about assessing a security posture requires an executed SOW.',
        '**Scope to the studio\'s real architecture** — read-only, no write-back, a named narrow data set, a fixed 90-day period. Say this explicitly in the review request so the reviewer is not assessing an imagined production rollout.',
        '**Pre-brief InfoSec on the gate model** so they understand that G2 is a second, narrower decision point and they are not being asked to approve everything now.',
        '**Assign a single named coordinator** on our side. Reviews stall in handoffs far more often than in analysis.',
        '**Escalate document delays commercially.** A vendor slow to produce a SOC 2 during a sales process will not be faster later; make it a scope obligation (one-pager 24).',
        '**Seek conditional approval** where a finding is real but does not touch the studio\'s data flows, with the condition attached to G2 rather than blocking Day 1.',
      ],
    },
    {
      heading: 'Common blockers, pre-empted',
      tables: [{
        columns: ['Blocker', 'Pre-empt by'],
        widths: [0.38, 0.62],
        rows: [
          ['SOC 2 is out of date or scoped to different services', 'Ask for scope and period on day one; a bridge letter may suffice'],
          ['Subprocessor list includes an unassessed model provider', 'Ask specifically about third-party model providers — this is the fourth-party risk regulators focus on'],
          ['Customer data leaves the vendor environment for inference', 'Ask directly and early; the answer changes the whole assessment'],
          ['No answer on training-data use', 'Resolve contractually (one-pager 25) as well as technically'],
          ['Our own integration design is not final', 'Review the design, not the code; design is stable long before build completes'],
          ['Reviewer assumes production scale and full write access', 'State the studio architecture and its 90-day limit explicitly in the request'],
        ],
      }],
    },
  ],

  tables: [
    {
      title: 'Review tracker — status visible weekly from Day −45',
      columns: ['Item', 'Owner', 'Requested', 'Received', 'Status'],
      widths: [0.34, 0.16, 0.16, 0.16, 0.18],
      rows: [
        ['SOC 2 Type II', '', '', '', ''],
        ['Penetration test summary', '', '', '', ''],
        ['Data flow diagram', '', '', '', ''],
        ['Subprocessor list', '', '', '', ''],
        ['Encryption and key management', '', '', '', ''],
        ['Vendor access control model', '', '', '', ''],
        ['Incident response and notification', '', '', '', ''],
        ['BCP / DR with test results', '', '', '', ''],
        ['Training data practices', '', '', '', ''],
        ['Our integration design review', '', '', '', ''],
        ['Privacy assessment', '', '', '', ''],
      ],
    },
    {
      title: 'Approval record',
      columns: ['Field', 'Entry'],
      widths: [0.38, 0.62],
      rows: [
        ['Scope approved', 'Read-only, 90 days, named data classes, no write-back'],
        ['Outcome', 'Approved / conditionally approved / not approved'],
        ['Conditions and their due dates', ''],
        ['Compensating controls required', ''],
        ['Findings accepted as residual risk', ''],
        ['Risk acceptance signed by', ''],
        ['Re-review triggers', 'Data scope change; write-back approval at G2; scale decision at G4'],
        ['Approval date and expiry', ''],
      ],
    },
  ],

  cadence: [
    ['Day −45', 'Review initiated under NDA; full document pack requested', 'Review open'],
    ['Weekly', 'Tracker reviewed; delays escalated commercially', 'Status'],
    ['Day −14', 'Findings consolidated; conditions negotiated', 'Draft outcome'],
    ['Day −7', 'Approval or conditional approval issued', 'Signed approval'],
    ['At G2', 'Re-review of the delta if write-back or new data classes are proposed', 'Delta approval'],
    ['At G4', 'Full review refreshed for production scale', 'Scale approval'],
  ],

  dod: [
    'Review started before SOW countersignature',
    'All three workstreams run in parallel with a single named coordinator',
    'Approval scoped explicitly to the studio architecture and its 90-day limit',
    'Conditions and compensating controls documented with owners and dates',
    'Re-review triggers agreed in advance so G2 is not a surprise',
  ],

  risks: [
    ['Review starts after signature and consumes the first month',
      'Initiated under NDA at Day −45; treated as the critical path in one-pager 01',
      'Studio Lead'],
    ['Reviewer assesses a production-scale architecture that does not exist',
      'Studio architecture and 90-day scope stated explicitly in the review request',
      'InfoSec'],
    ['Vendor slow to produce documents',
      'Full pack requested on day one with a deadline; delivery made a scope obligation',
      'Procurement'],
    ['Third-party model provider discovered late as an unassessed fourth party',
      'Subprocessor and model-provider question asked explicitly in the first request',
      'Third-Party Risk'],
    ['Approval granted for the studio and assumed to cover scale',
      'Approval scoped and dated; re-review triggers named at approval time',
      'InfoSec'],
    ['Write-back approved at G2 without security involvement',
      'Re-review is a stated precondition of any write-back decision (one-pager 20)',
      'InfoSec'],
  ],
},

/* --------------------------------------------------- 28 ACCESS CONTROLS - */
{
  id: '28',
  file: '28-Access-Controls',
  section: 'Logistics — Production Readiness',
  title: 'Access Controls',
  strap: 'Who can see borrower data, who can change behaviour, and who turns it all off on Day 91.',

  purpose:
    'To define access on both sides of the relationship: what our people can do in Jazz, what Jazz can reach in our systems, and — the question most often left unasked — which individuals at the vendor can read our borrowers\' documents, and whether we can see that they did. It also covers the least glamorous and most frequently skipped control in any pilot: deprovisioning everything when the studio ends.',

  raci: [
    ['Information Security', '', 'A — owns the access model'],
    ['IT / identity team', '', 'R — provisioning and deprovisioning'],
    ['Studio Lead', '', 'R — requests and reviews studio access'],
    ['Head of Underwriting', '', 'C — role definitions for studio users'],
    ['Third-Party Risk', '', 'C — vendor-side access terms'],
    ['Compliance', '', 'C — segregation of duties'],
  ],

  decisions: [
    'Access is **least privilege, named-account, MFA-enforced.** No shared credentials, no generic studio logins, no exceptions for convenience.',
    'The right to **use** Jazz and the right to **change** how Jazz behaves are separate roles. An underwriter reviewing output does not thereby get to alter condition logic.',
    '**Vendor-side access is enumerated, logged and auditable.** We know which JazzX individuals can read our borrower data, and we can obtain a record of when they did.',
    'Our systems grant Jazz **read-only access** technically, not by policy. Any write attempt is a tripwire that pauses the studio (one-pager 22).',
    '**Deprovisioning is a dated deliverable at Day 90**, executed whatever the Gate 4 outcome, with evidence.',
  ],

  framework: [
    {
      heading: 'Role model for the studio',
      tables: [{
        columns: ['Role', 'Can', 'Cannot', 'Held by'],
        widths: [0.2, 0.3, 0.28, 0.22],
        boldFirstCol: true,
        rows: [
          ['Studio user', 'View Jazz output for cohort loans; record comparison data',
            'Change any configuration, prompt or mapping',
            'Underwriters, processors'],
          ['Tuner', 'Change prompts, condition logic, recognition and mappings in the studio environment',
            'Approve their own borrower-affecting change; access non-cohort loans',
            'Studio Lead, senior underwriter, analyst'],
          ['Analyst', 'Export metrics and comparison data; run regression and holdout sets',
            'Change configuration',
            'Data / BI analyst'],
          ['Administrator', 'Manage users and entitlements',
            'Tune, or view borrower documents without a business reason',
            'IT, one named deputy'],
          ['Auditor / observer', 'Read-only view of configuration, change log and metrics',
            'Anything else',
            'Compliance, Model Risk, InfoSec'],
        ],
        note: 'The auditor role is worth creating even if nobody uses it weekly — it is what lets a control function verify rather than take our word at a gate.',
      }],
    },
    {
      heading: 'Vendor-side access — the question nobody asks',
      body: [
        'During the studio, JazzX engineers will need to see real output to diagnose problems, and some of that output contains borrower data. This is legitimate and necessary; what is not acceptable is for it to be unbounded, unlogged, or unknown to us.',
      ],
      bullets: [
        '**Enumerate the individuals** at JazzX who can access our tenant and our data, by name and role',
        '**Require logging** of vendor access to customer data, and the right to obtain those logs on request',
        '**Prefer just-in-time access** — support access granted for a defined window on a defined issue, rather than standing entitlement',
        '**Ask where inference happens.** If our documents leave the vendor environment for a third-party model provider, that is a different risk conversation (one-pager 27)',
        '**Offboarding on their side** — when a named individual leaves the engagement or the company, their access ends; make this a contractual obligation',
        '**No production data in vendor demos**, ever — state it explicitly, because it happens',
      ],
    },
    {
      heading: 'What Jazz can reach in our systems',
      steps: [
        'A **service identity**, not a person\'s account, and not one shared with another integration.',
        '**Read-only by permission**, enforced by the grant itself rather than by an application-layer promise.',
        '**Scoped to the cohort** where the platform allows it — the studio has no need to reach loans outside the slice.',
        '**Credentials rotated** on a defined schedule, with a named owner and expiry alerting (one-pager 22).',
        '**Network path restricted** — allow-listed, encrypted, and logged at the boundary.',
        '**Every call logged** with enough detail to reconstruct what was accessed for any loan.',
        '**A kill switch** — one named action that severs the integration immediately, tested before Day 1.',
      ],
    },
    {
      heading: 'Segregation of duties',
      bullets: [
        'The person who **makes** a borrower-affecting tuning change is not the person who **approves** it (one-pager 15)',
        'The person who administers access does not also tune',
        'The analyst who measures whether a change worked is independent of whoever made it',
        'Control functions have read access without needing to ask the studio for it',
        'No individual holds every role — if the studio is small enough that this is difficult, document the exception and compensate with logging and review',
      ],
    },
  ],

  tables: [
    {
      title: 'Access register — reviewed at every gate',
      columns: ['Name', 'Role', 'System', 'Granted', 'Last reviewed', 'Revoked'],
      widths: [0.2, 0.16, 0.16, 0.16, 0.16, 0.16],
      rows: [
        ['', 'Studio user / Tuner / Analyst / Admin / Auditor', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
      ],
      note: 'Include vendor-side individuals in the same register. One list, not two, is what makes the review meaningful.',
    },
    {
      title: 'Day 90 deprovisioning checklist — executed whatever the outcome',
      columns: ['Action', 'Owner', 'Evidence', 'Done'],
      widths: [0.42, 0.18, 0.24, 0.16],
      rows: [
        ['Studio user accounts disabled', 'IT', 'Access report', ''],
        ['Tuner and admin entitlements revoked', 'IT', 'Access report', ''],
        ['Service identity disabled or scoped down', 'IT', 'Config evidence', ''],
        ['Credentials and keys rotated or destroyed', 'IT', 'Key inventory', ''],
        ['Vendor-side access terminated', 'Third-Party Risk', 'Written confirmation', ''],
        ['Network allow-list entries removed', 'IT', 'Firewall record', ''],
        ['Data deletion requested and certified', 'InfoSec', 'Certificate of deletion', ''],
        ['Access register closed and archived', 'InfoSec', 'Archived register', ''],
      ],
      note: 'On a Scale outcome this becomes a re-provisioning exercise against the production role model — not a decision to leave studio access in place indefinitely.',
    },
  ],

  cadence: [
    ['Pre-G0', 'Role model defined; access provisioned; kill switch tested', 'Access live'],
    ['Weekly', 'New access requests reviewed against the role model', 'Register updated'],
    ['At each gate', 'Full access review — is anyone holding access they no longer need?', 'Reviewed register'],
    ['Monthly', 'Vendor access logs requested and reviewed', 'Vendor access report'],
    ['Day 90', 'Deprovisioning executed with evidence', 'Completed checklist'],
  ],

  dod: [
    'Named accounts with MFA; no shared credentials anywhere in the studio',
    'Use and change rights held as separate roles',
    'Vendor-side individuals enumerated and their access logged and obtainable',
    'Read-only enforced technically, with a tested kill switch',
    'Access reviewed at every gate and fully deprovisioned by Day 90 with evidence',
  ],

  risks: [
    ['Shared studio login created for convenience early on',
      'Named accounts from day one; a shared credential is a Sev 2 finding',
      'InfoSec'],
    ['Vendor access to borrower data is unbounded and unlogged',
      'Enumerated individuals, logged access, just-in-time where possible, contractual offboarding',
      'Third-Party Risk'],
    ['Read-only is a policy statement rather than a permission grant',
      'Enforced in the grant; write attempts monitored as a tripwire',
      'InfoSec'],
    ['Access persists after Day 90 because nobody owned the shutdown',
      'Deprovisioning is a dated deliverable with named owners and evidence',
      'IT lead'],
    ['One person holds every role in a small studio',
      'Segregation documented; exceptions compensated with logging and independent review',
      'Compliance'],
    ['Production borrower data used in a vendor demo',
      'Prohibited explicitly in the SOW and restated at kickoff',
      'Third-Party Risk'],
  ],
},

];
