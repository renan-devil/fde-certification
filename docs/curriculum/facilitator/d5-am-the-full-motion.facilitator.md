# Day 5 morning: the full motion. Facilitator guide

*AI 50%: drafted by Claude from OSS engagement records, disguised per the program guide's confidentiality protocol; validated by the trainer.* Trainer: Renan. 9:00 to 12:00. Deck: `D5 AM - Deck - The full motion.dc.html` (content in `D5 AM - Deck content.md`). Handouts: `D5 AM - Case pack A - Plastics compounder.md` (teams 1 to 3), `D5 AM - Case pack B - Sock manufacturer.md` (teams 4 and 5), `D5 AM - Exercises.md` (readout template).

**Confidentiality.** Both cases are real OSS engagements, disguised: names, sites and people replaced; financial figures scaled by a constant factor (0.85) and rounded; dates shifted; the investor relationship and internal politics left out; gains framed as throughput. Never confirm or deny which company a case comes from. Keep this guide and the scale factor away from participants.

## Objectives

By noon every team has run the full motion on a real case: diagnostic, sizing with assumptions and ranges, a validation protocol, a ninety-day plan with gates, and a steering committee readout under questions.

## Run sheet

| Time | Block | Notes |
|---|---|---|
| 9:00 | Stand-up and brief (deck slides 1 to 8) | Fifteen minutes. Hand out the case packs at 9:10. |
| 9:15 | Case work | Two hours. Calls at 9:45 (problem statement written?), 10:30 (sizing checked by the Verifier?), 11:00 (slides frozen at 11:15). |
| 11:15 | Rehearsal | Fifteen minutes, inside each team. |
| 11:30 | Steering committees | Two rooms in parallel if you have a second facilitator; otherwise ten minutes per team in plenary, cases alternating. |
| 12:00 | Lunch | |

You play the steering committee. Questions to ask every team are below; ask at least one counting-rule question.

## Case A, the compounder: model answer

**Diagnostic.** The problem is not "planning" but sequence-blind scheduling of MTO families: the ERP plans with one standard setup per work center while real changeovers range from 25 minutes to five hours by sequence. Nobody measures setups, so the cost is invisible. Hypothesis tree: (1) sequence-dependent changeovers on MTO families (high prior); (2) lot sizing and order release (medium); (3) planner capacity (low; Tom says so himself). The first unknown to close: measured setup time, predicted against actual.

**Sizing at Site North.** Changeover lever: a sequence-aware scheduler typically saves a third or more of MTO changeover time. 36% of 1,800 h ≈ 650 h a year; at 1,000 kg per hour and €0.55 per kg, about €360K a year if the extra output sells (MTO customers want shorter lead times: needs sales confirmation). Low case 20% (€200K); high 45% (€445K). Second path: yield on the scheduled 15 to 20% of production up by 15 to 30%. Strong teams spot that the two paths overlap (freed changeover time is what raises yield per scheduled hour) and do not add them.

**Four sites.** Only with conditions: Site East's missing routings must be captured first; Site South needs a planner; Site West has no data. A group figure of €5M to €7M a year is defensible as a hypothesis, not a promise.

**Validation.** Glen's sentence is the key: there is no baseline. Week one: start measuring predicted against actual setup time per work center, and freeze a baseline of changeover hours per order line by family, normalized for mix, before go-live. Without it, the gain will be argued forever.

**Plan.** Weeks 1 to 2: measure setups, freeze baseline, capture Priya's sequence rules; weeks 3 to 6: schedule the worst MTO families (15 to 20% of output) with the planners; weeks 6 to 10: extend, reconcile monthly with Glen; week 12: gate to Site East with a routing-capture template. Kill criterion: if measured setup savings on scheduled families are below 15% by week 8, stop the rollout.

### What really happened (for the 13:30 debrief)

- The scheduler went into full run at the lead plant. About 15% of its production was under active scheduling at the time of the last review, expanding.
- Changeover hours saved on MTO: about 650 a year in the base case, 36% of MTO changeover time.
- Yield improved by 15 to 30% on the scheduled items. The annual value was projected at about €220K, by multiplying four months of actuals by 3.5. **It was not yet validated over twelve months**, and the baseline for yield had not been documented before go-live.
- The next priority became exactly what Glen would have asked for: tracking predicted against actual setup time per work center.
- At the second site, missing line routings blocked the rollout; the team built a manual capture template to fill them.
- The group-level gains model, built from the lead plant's actuals and the sites' own labor data, pointed to about €6.5M a year across the vinyl business at steady state.
- Lessons: the result is real and the method worked; the gain is contestable because the baseline was not frozen in week one; run-rate projections must be labeled as such; master data gaps decide the speed of replication.

## Case B, the sock manufacturer: model answer

**Diagnostic.** The real problem is detection latency, not the defect rate: 60% of defects are found when 100% of the cost is spent. Controls are uniform on a non-uniform system (Unit 1 and Unit 2 get the same protocol). Knowledge of settings that work is tacit. Root cause analysis is slow because quality, machine, yarn and maintenance data are disconnected. The absenteeism makes human-only control fragile.

**Sizing.** Weighted cost of detection today: 40% × 65% + 60% × 100% ≈ 86% of production cost spent on a defect when found; on €4.7M to €6.0M of scrap, about €4.0M to €5.1M. Shifting half of the late-found defects upstream (for example 35% caught before or at the start of knitting at about 5% cost, 5% after knitting at 65%, 60% at boarding and final inspection at 100%) brings the weighted cost to about 65%: **€0.9M to €1.2M a year**. Teams may choose another split if they show it. Faster root cause analysis that removes 2 points of defect rate: **€1.2M to €2.0M a year**. Inspection capacity redeployed by smarter, risk-based sampling: frame it as resilience against 80 daily absences and as more inspection where it matters, **never as fewer people**. Teams that write a headcount reduction get a counting-rule and a protocol question.

**Pilot.** One block of 96 machines in Unit 2 (stable, OEE about 95%: a cleaner signal to learn from), not Unit 1 where the pain is highest; say why. Phase 0, four weeks, no sensors: extract defect logs and orders, link yarn lots to defects, clean the defect taxonomy. Phase 1: map what the machine maker's PLCs and sensors already provide; cost each sensor type; go or no-go if hardware exceeds about €1.3K per machine. Phase 2: live test with alerts, measure detection latency (hours to minutes) and false-positive rate (the history of the failed project). Weekly one-hour steering with the quality or production director.

### What really happened (for the 13:30 debrief)

- The team found that the plant's quality effort was real and well organized: "not a motivation problem, an architecture problem".
- It named detection latency as the hidden KPI that drives quality cost, and noted it was not tracked.
- The estimated levers were €0.9M to €1.2M (earlier detection) and €1.2M to €2.0M (faster root cause analysis) a year, plus the inspection lever, all to be refined jointly; the methodological note said so on the first page.
- The proposal sequenced data before sensors: a four-week data foundation with no new hardware, then a sensor and architecture playbook costed per machine, then a live test on one block of 96 machines.
- The next step agreed was an economics validation of the setup cost as the pilot's go or no-go, not a sensor rollout.
- Lessons: frame by the client's operating constraint (absenteeism, resilience); respect the scar of the failed sensor project by measuring false positives from day one; pick the pilot perimeter for signal quality, not only for pain.

## Questions for every steering committee

1. "What is your baseline, and who computes it?"
2. "Which of your numbers is a run-rate, and which is realized?"
3. "What would make you stop at week four?"
4. Case A: "Glen says he has never found a scheduling gain in his numbers. Why will this one be different?"
5. Case B: "Selin wants a sensor on every machine now. Why not?"

## Grid for feedback (no marks)

| Dimension | What good looks like |
|---|---|
| Answer first | The governing thought on slide 1, with a number and a condition |
| Sizing | Assumptions table, low and high, overlaps removed, throughput framing |
| Validation | A baseline the controller can compute, frozen before go-live |
| Plan | Gates with kill criteria; Monday's first action is concrete |
| Under questions | Concedes what it does not know, and says how it will find out |
