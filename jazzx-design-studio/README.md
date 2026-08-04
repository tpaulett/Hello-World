# JazzX Design Studio — 90-Day Implementation Framework

A lender-side framework for standing up a 90-day Design Studio with JazzX: 29 one-pagers
plus an executive summary deck.

**Posture:** written from the perspective of the lender adopting JazzX (JazzX is the vendor).
**Operating mode:** shadow-first — Jazz runs in parallel on real loans while humans make every
decision, graduating to a narrow live slice only after Gate 2.

## Deliverables

| File | What it is |
|---|---|
| `JazzX-Design-Studio-Executive-Summary.pptx` | 15-slide exec deck — gate model, scope, measurement, decision rule, asks |
| `one-pagers/*.docx` | 29 one-pagers, each 4–6 pages |

## The gate model

The program is gated, not calendar-driven. A phase that has not met its gate does not advance
because the date arrived — it extends, descopes, or stops.

| Gate | Day | Question |
|---|---|---|
| G0 | 0 | Are we able to start? |
| G1 | 30 | Do we know what "before" looks like? |
| G2 | 60 | Is Jazz accurate enough to touch a live loan? |
| G3 | 80 | Does it hold up in production? |
| G4 | 90 | Scale, narrow, extend or stop? |

## The pack

Every one-pager uses the same eight sections: Purpose · Owner & RACI · Decisions this document
makes · The framework · Artifacts & templates · Cadence · Definition of done · Risks & escalation.

**Program**
- `01` Master 90-Day Plan

**Logistics — Commercial Alignment**
- `23` Cost & Timeline
- `24` Commercial Scope Definition
- `25` Statement of Work (SOW)
- `26` Master Services Agreement (MSA)

**Logistics — Production Readiness**
- `02` Governance Structure
- `03` Borrower & Internal Communications
- `04` Change Management
- `27` Security Review
- `28` Access Controls

**Logistics — Define Proof of Value**
- `05` Define What Value Looks Like
- `06` Baseline, Targets & Success Thresholds
- `07` Go / No-Go Decision Criteria

**Execution — Launch Design Studio**
- `08` Launch Design Studio (overview)
- `09` Small Cross-Functional Team
- `10` Loan Types & Market Selection
- `11` Design Studio Process vs. Current Workflow
- `12` Weekly Feedback Loop
- `13` Observing Real Underwriting & Fulfillment

**Execution — Tune in Jazz**
- `14` Tune in Jazz (overview)
- `15` Refining Prompts, Conditions & Document Recognition
- `16` Documenting Improvement
- `17` Next Technology Changes & Build Start
- `18` Builder Studio & Knowledge Nuggets

**Technology — Use Current Integrations**
- `19` Enabling Users to Trigger Loans to Jazz
- `20` LOS Data Extraction & the Write-Back Decision
- `21` MU (Conditions Management) Integration
- `29` Minimizing Custom Development

**Technology — Deploy Technology Changes**
- `22` Minimum-Change Deployment to Production

## Assumptions

These are stated so they can be corrected rather than silently inherited:

- The loan slice is left as a **decision template** with selection criteria, filled in at G0.
- Roles are named by function, not by person.
- Days are relative (Day 1 = kickoff), so the calendar can shift without re-cutting the plan.
- Governance assumes an existing model risk / third-party risk function; `02` includes a
  fallback for lenders without one.
- Sample sizing works to **150–200 shadow loans**; `06` shows the math so it can be flexed.
- The LOS is treated as **platform-neutral** — `20` is organised around capabilities and
  decision criteria rather than named vendor APIs.
- **MU** is the internal conditions management system. `21` keeps it the sole system of
  record for conditions throughout.
- **Write-back is an open question**, not a foregone conclusion. `20` frames it as a
  decision to be taken at G2 with a default answer of no.
- Commercial documents (`23`–`26`) are written as **negotiating positions and checklists**,
  not as legal drafting. Legal owns the language; these set out what to insist on and why.

## Rebuilding

Content is data, layout is code. Adding a one-pager means adding an object to a `content-*.js`
file — the renderer is never touched.

```
build/render.js            shared one-pager template (docx)
build/content-program.js   one-pager 01
build/content-logistics.js one-pagers 02–07
build/content-execution.js one-pagers 08–18
build/content-technology.js one-pagers 19–22, 29
build/content-commercial.js one-pagers 23–26
build/content-readiness.js  one-pagers 27–28
build/build.js             renders all one-pagers to one-pagers/
build/build-deck.js        renders the executive deck (pptxgenjs)
```

```bash
npm install docx pptxgenjs
node build/build.js        # -> one-pagers/*.docx
node build/build-deck.js   # -> JazzX-Design-Studio-Executive-Summary.pptx
```
