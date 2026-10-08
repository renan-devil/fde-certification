# Day 3 morning: plant systems and data. Facilitator guide

*AI 50%: drafted by Claude from the FDE School curriculum and OSS field material, validated by the trainer.* Trainer: Nicolas. 9:00 to 12:00. Deck: `D3 AM - Deck - Plant systems and data.dc.html` (26 slides; content in `D3 AM - Deck content.md`). Handout: `D3 AM - Exercises.md`.

## Objectives

By noon every participant can:

1. Place any plant system on the ISA-95 levels and say what data it holds.
2. Distinguish master data, transactions, time series and tacit knowledge, and how each fails.
3. Name a source of truth per data object and the reconciliation that keeps it honest.
4. Choose the least invasive integration pattern and climb the access ladder.
5. Respect the IT/OT boundary, secrets hygiene and labor-law constraints on operator data.

## Context from Days 1 and 2

Renan's handover note lists each team's charter scope. Every team should have "rules capture with Corinne", "feasibility checker (v1)" and "reliable pipeline (v2)" in scope. Use those words: this morning's map is the plumbing of their own charter.

## Do not reveal

- **Corinne's overrides help** (Day 4).
- **The 14 April logger upgrade broke the export format** (Day 4 lab). The landscape sheet mentions the upgrade; reward teams that circle it as a likely lie. Do not say what changed.

## Run sheet

| Time | Slides | Block | Notes |
|---|---|---|---|
| 9:00 | | Stand-up | Ten minutes. Roles rotate. |
| 9:10 | 1 to 10 | The systems of a plant | 30 minutes, laptops closed. |
| 9:40 | 11 to 14 | Source of truth and ontology | 20 minutes. |
| 10:00 | 15 | Exercise 1 | 35 minutes. Calls at 10:15 and 10:30. |
| 10:35 | | Break | Ten minutes. Pin two maps on the wall. |
| 10:45 | 16 to 22 | Integration and security | 20 minutes. |
| 11:05 | 23 | Exercise 2 | 35 minutes. |
| 11:40 | 24 | Nadia role-play | Two teams, five minutes each, then the room comments. |
| 11:55 | 25 to 26 | Close | Five minutes. |

## Slide notes

**Slide 2.** Five systems (SAP, LineLog, PI, the lab database, MaintPro), two spreadsheets (Corinne's plan, the lab's tracking file) and one head (Corinne's, plus Jean-Pierre's notebooks). Let the room count.

**Slide 6.** Draw the pyramid on the whiteboard. Mark where Plant Pulse v0 got its data: level 3, from a logger export. Ask: "Where would you look to check that M07 really has micro-stops?" Level 1 and 2, through the historian. M07 is not connected to PI: that is a finding.

**Slide 8.** Use the ERP's 60-minute changeover as the master-data example. It is the root of this afternoon's lab.

**Slide 10.** The divergence between official and real is the most reliable predictor of where a deployment breaks. Field story: a predictive tool trained on ERP confirmations that were booked in batches on Monday mornings learned that the plant only produced on Mondays.

**Slide 12.** Insist on "reconciled to ERP monthly". A source of truth without a reconciliation is a belief.

**Slides 13 and 14.** The ontology slides set up the afternoon. Nicolas will reuse the same types in the lab's `CLAUDE.md`.

**Slide 19.** If anyone in the room has OT experience, ask them for a story. The rule is absolute: no write to levels 1 and 2.

**Slide 20.** The works-council point surprises engineers. In France, a tool that can be used to monitor individual operators requires informing and consulting the CSE beforehand. Marc's fear of monitoring on Day 4 is also a legal fact.

**Slide 22.** Play the 2022 story with some feeling: Nadia still gets asked why the quality dashboard stopped.

## Exercise 1, model answer

**Map, by level.** Level 4: SAP ECC (group IT). Level 3: LineLog (production), Access lab database (quality), MaintPro (maintenance), Corinne's workbook (planning). Level 2: WinCC screens. Level 1: S7 PLCs. Historian (PI) spans levels 2 and 3, maintenance-owned, three lines only. Tacit: Corinne, Jean-Pierre's notebooks.

**Flows Plant Pulse needs.**

| Flow | From | Frequency, format | Sender |
|---|---|---|---|
| Shift output, changeovers, stops | LineLog export | Daily CSV on the shared folder | Automatic; production owns it |
| Orders, promise dates, deliveries | SAP | Weekly extract (rung 1), nightly file (rung 2) | Nadia, via group IT |
| Next week's schedule | Corinne's workbook | Friday export, then daily | Corinne |
| Changeover rules | Interviews and notebooks, then the rules file | Versioned in the repository, edited with Corinne | Corinne, co-owner |
| Line signals for M07 micro-stops | Not available: M07 not on PI | Ask maintenance to connect M07 | Bruno, automation |

**Source of truth.**

| Data object | Source of truth | Reconcile against | Owner | How it can be wrong |
|---|---|---|---|---|
| Order and promise date | SAP | Customer confirmations | Sales administration | Promise dates moved without a trace |
| Next week's real schedule | Corinne's workbook | SAP plan, LineLog actuals | Corinne | Overwritten copies, macros, versions v46 and v47 |
| Output and scrap | LineLog | SAP production confirmations, monthly, 2% tolerance | Production | Manual entry, unit errors, the 14 April upgrade |
| Changeover time between two products | Rules file built with Corinne | LineLog changeover minutes | Corinne | Today it is only in her head; SAP says 60 minutes for everything |
| Line capability | Rules file | Maintenance (screw types) | Corinne and maintenance | Implicit: "everyone knows M04 cannot run glass" |
| Why a machine stopped | MaintPro for failures; LineLog for stops | PI where connected | Maintenance | Micro-stops are never entered |

**The three likeliest lies.** The LineLog export after the 14 April upgrade; SAP's changeover master data; MaintPro's silence on micro-stops (and M07 has no historian to contradict it).

## Exercise 2, model answer

| Source | This week | Next | Earned by |
|---|---|---|---|
| LineLog | Rung 2: read access to the shared export folder | Rung 3 not needed | First Plant Pulse numbers match the controller's within 2% |
| SAP | Rung 1: a weekly extract of orders and deliveries sent by Nadia | Rung 2: a nightly file from group IT | Charter signed, security notes reviewed by group security |
| Corinne's workbook | Rung 1: Friday export by Corinne | Rung 2: a scheduled copy to the share | Corinne uses v1 for one Friday plan |
| PI | None this week | Rung 3: read-only PI web API from the DMZ for M01, M02, M05 | v2 in daily use; maintenance agrees to connect M07 |

**Nadia's conditions, one line each.** Owner: Corinne for the rules, the plant controller for the numbers, Nadia's technician for the app, named in the charter. Read-only: file share only until week 6, no credentials to SAP. EU and approved tools: hosting in an EU region, under the organizers' approved accounts; the group review starts this week in parallel. Runbook: delivered before the first daily user, reviewed with her technician. Kill switch: the app reads a folder Nadia controls; removing the share permission stops it.

**What wins the role-play.** Leading with the owner question before she asks it. Offering something in return: the reconciliation report between LineLog and SAP that Nadia has wanted for two years. **What loses it:** "it's just a prototype", asking for a VPN on day three, mentioning a personal API key.

## Close

Slide 25, then the card. Remind teams that the afternoon builds on the ontology slides.
