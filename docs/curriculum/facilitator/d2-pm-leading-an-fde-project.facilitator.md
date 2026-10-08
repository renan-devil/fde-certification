# Day 2 afternoon: leading an FDE project. Facilitator guide

*AI 50%: drafted by Claude from the FDE School curriculum and the Polymex data, validated by the trainer.* Trainer: Renan. 13:30 to 17:30. Deck: `D2 PM - Deck - Leading an FDE project.dc.html` (36 slides; content in `D2 PM - Deck content.md`). Handout: `D2 PM - Exercises.md`.

## Objectives

By 17:30 every participant can:

1. Name the six phases of an FDE engagement, with the exit criterion and the artifact of each.
2. Write a project charter with a perimeter, a target, a scope-out list, kill criteria per gate and named client roles.
3. Run the three governance rituals and apply the no-surprises rule.
4. Write a validation protocol that a plant controller can execute without the FDE in the room.
5. Apply the counting rules: recurring and one-time, gross and net, run-rate and realized, no double counting.

## Two things not to reveal today

1. **Corinne's overrides help.** Day 4. Teams will write "Corinne" as product owner; good. If one writes "replace the planner" in scope, ask who would then own the rules.
2. **The consolidation rumor.** Day 4. If a team asks what the group measures Hervé on, say: "Write it in your RAID log as an assumption to check."

## Run sheet

| Time | Slides | Block | Notes |
|---|---|---|---|
| 13:30 | 1 to 4 | Opening | Ten minutes. One team reads its governing thought from this morning. |
| 13:40 | 5 to 12 | The six-phase method | 25 minutes, laptops closed. |
| 14:05 | 13 to 17 | Scope and charter | 20 minutes. |
| 14:25 | 18 | Exercise 1, charter | 40 minutes. Calls at 14:45 (scope-out written?) and 15:00. |
| 15:05 | | Break | Fifteen minutes. Two teams pin their scope-out lists on the wall. |
| 15:20 | 19 to 23 | Governance | 15 minutes. |
| 15:35 | 24 to 31 | The gains validation protocol | 25 minutes. |
| 16:00 | 32 | Exercise 2, Ferralux | 15 minutes alone, on paper. Answer on the whiteboard at 16:15. |
| 16:15 | 33 to 34 | Exercise 3, protocol | 30 minutes to write; swap at 16:45; 15 minutes of controller test. |
| 17:00 | | Debrief | 15 minutes, slide 34 as the grid. |
| 17:15 | 35 to 36 | Close | Fifteen minutes, including the daily card. |

If you are late, compress slides 8 to 11 into one minute each (they are in the handout); never cut the controller test.

## Slide notes

### Opening and the method (slides 1 to 12)

**Slide 4.** Field story: a deployment where the model was excellent and the gain was never recognized, because the baseline was argued at month six. Nobody remembered the model.

**Slide 6.** Remind the room of the loop from Day 1, slide 32. The arrow from expand returns to find, not to embed: in an account you have already earned access.

**Slide 7.** The weeks overlap on purpose: deploy starts before build ends. Ask: "Which exit is the hardest to reach?" Usually "runs two weeks without the FDE touching it".

**Slide 8.** Night shift and weekend are not optional. At Polymex, the M04 weekend drift is invisible from the day shift.

**Slide 12.** The figure is OSS's own field experience, not a market statistic. Say so.

### Scope and charter (slides 13 to 17)

**Slide 15.** Read the APS example: Hervé told the COO he wants an APS. If APS selection is in your scope, you are now a procurement project. If it is explicitly out, your results can inform it.

**Slide 16.** The example kill criterion on the slide is the one we expect for Polymex. Teams may copy it; they must add the others.

**Slide 17.** Ask: "Who is the product owner at Polymex?" The right answer is Corinne, which is also the start of the Day 4 story.

### Exercise 1, model answer: the Polymex charter

| Section | Model answer |
|---|---|
| Problem statement | OTIF fell from 91% to 84% between September and April while retail orders grew from 12% to 31% of volume and weekly changeovers rose from about 41 to 78. We will establish by week 4 whether infeasible sequences, the order pattern or planning execution drive the loss, and act on the driver. |
| Target and date | By week 12: changeover share at extrusion from 10.3% (March) to 7.5% or less; OTIF on promise date from 84% to 90% or more; both computed by the plant controller. Leading indicator: plan adherence of the Friday plan, measured weekly. |
| Perimeter | Extrusion lines M01 to M07, all product families, the Polymex site only. |
| Scope in | Capture of the changeover and purge rules with Corinne; a schedule feasibility checker (Plant Pulse v1, Day 3); a reliable changeover and OEE pipeline (v2, Day 4); SMED workshops on the two worst transitions with maintenance; investigation of M07 micro-stops and M04 at weekends. |
| Scope out | APS selection (a group decision; our results inform it); planner staffing; ERP reconfiguration beyond a proposal for changeover master data; pricing and commercial terms; mixing and packing, which are not constraints. |
| Gains case | Freeing 2.8 points of availability is about 3,200 t a year. Low €0.3M a year: avoided overtime only (30% of €0.9M). Base €0.9M: avoided overtime plus 1,300 t on named retail orders at €447. High €1.7M: avoided overtime plus 3,200 t sold. Conditional on sales confirming named orders in writing. Cost to achieve: two FDEs for twelve weeks, the software, 20% of Corinne's time, two maintenance workshops. |
| Kill criteria | Week 2: no baseline agreed with the controller, escalate to Mireille. Week 4: sequencing and changeovers explain less than a third of the OTIF loss in the backtest, stop or re-scope. Week 8: Corinne does not use v1 for the Friday plan, re-scope with her. Week 12: gain below the low case, no expansion. |
| Roles | Sponsor: Hervé. Product owner: Corinne. Controller: Mireille's plant controller. IT owner: Nadia. Users: Corinne, the shift leaders, Marc on M04. |
| Governance | Weekly ops review on Tuesday; steering committee monthly with Hervé, Mireille, Nadia and the FDE lead; decision log and RAID log kept by the FDE lead. |

What to reward: a scope-out list that names the APS; a kill criterion at week 4 that could actually kill Hervé's theory or yours; Corinne as product owner.

What to challenge: targets without a date or without the controller; "improve OTIF" as a target; gains cases that ignore the sales condition.

### Governance (slides 19 to 23)

**Slide 21.** Field story: a pipeline outage discovered on Monday and told to the sponsor on Thursday. The outage was fixed in an hour; the trust took a month. Make the point that the delay, not the outage, was the failure.

**Slide 22.** The rows are Polymex rows on purpose: the logger change on 14 April is tomorrow's and Thursday's material. Do not explain it yet.

**Slide 23.** The assumption row carries the condition of the whole gains case. Ask who owns it: the sales director, not the FDE.

### The gains validation protocol (slides 24 to 31)

**Slide 25.** The sentence of the week. Write it on the whiteboard under this morning's fork.

**Slide 27.** Normalization is where teams fail. Make one participant say the formula aloud: normalized baseline = baseline rate × actual volume, by family. Then ask: "If retail orders keep growing, what happens to a baseline that does not normalize for the number of orders?" It flatters or punishes the project for the mix, not for the work.

**Slide 28.** Ask which type Polymex's main gain belongs to. Capacity release, valued through revenue enablement: the two hardest. Hence the protocol.

**Slide 30.** The six items are the template of Exercise 3.

### Exercise 2, model answer: Ferralux

| Item | Answer |
|---|---|
| Freed hours, base | 52,000 × 18% × 35% = 3,276 hours a year |
| Gross, base | 3,276 × €120 = €393K a year |
| Net run-rate, base | €393K − €90K software = €303K a year |
| One-time | €60K deployment; payback about 2.4 months at run-rate, 4 to 5 months with a two-month ramp |
| Year one, realized | With months one and two at half speed: €393K × 11/12 ≈ €360K gross; minus €90K software and €60K deployment ≈ €210K net in year one |
| Low | Pilot machines were probably the messiest: 20% reduction gives 1,872 hours, €225K gross, €135K net. The case survives its low case. |
| High | 45% gives 4,212 hours, €505K gross, €415K net |
| Fork check | Backlog of 9% of capacity ≈ 4,680 hours, more than the 3,276 freed: the contribution valuation holds. If demand softens, the case falls back to avoided overtime. |
| Triangulation | Top-down: 6.3% of plant hours freed, valued at plant-level contribution, lands in the same €350K to €450K zone |

Classic failures: counting the €60K as recurring; valuing hours at full cost (€85 and more) instead of contribution; no check that the backlog can absorb the hours; presenting run-rate as year one.

### Exercise 3, model answer: the Polymex validation protocol

| Item | Model answer |
|---|---|
| Metrics | (1) Changeover hours at extrusion per 100 planned hours. (2) Overtime premium in euros a month. (3) Tonnes shipped to the two named retail accounts above their baseline. |
| Formula | Gain in hours = normalized baseline changeover hours − actual changeover hours. Normalized baseline = baseline changeover hours per order line, by product family, × actual order lines by family. Tonnes = gain in hours × 1.86 good t/h (2.30 × 0.863 × 0.939, frozen at baseline). |
| Valuation | Overtime: actual premium against baseline premium per tonne × actual tonnes. Contribution: only incremental tonnes to named accounts, confirmed monthly by the sales director, × €447. Never both on the same tonne. |
| Data source | Changeover minutes and output from the extrusion shift log, reconciled monthly against ERP production confirmations; the ERP prevails if the gap exceeds 2%, and the month is flagged. Overtime from payroll. Shipments from ERP deliveries. |
| Baseline | Twelve months, May 2025 to April 2026, with the normalization above. Perimeter M01 to M07, all families. Excluded: planned shutdowns (planned minutes at zero), trials, the logger outage of 17 February. |
| Cadence | Computed by the plant controller on the fifth working day of each month; reviewed at the steering committee. |
| Sign-off | The gain is recognized at run-rate when it exceeds the low case for three consecutive months. Realized value for the year is the sum of monthly gains, net of the cost to achieve. |
| Disputes | Any disagreement is settled on the controller's spreadsheet; the FDE team supplies data, never the number. |

What the controller test usually reveals: the protocol names "the shift log" without saying who sends it; no rule for a down week; the sign-off trigger is a wish ("when the gain is clear"); tonnes valued twice.

## Debrief (17:00)

Use slide 34 as the grid. For each swapped pair, the controller-team says which of the five questions it could not answer alone. Then three questions to the room: what did you see, so what, now what.

## Close (17:15)

Slide 35, then the card. Tell the teams that Nicolas runs tomorrow, and that the charter's scope-in items are tomorrow's and Thursday's labs.

## Handover note for Nicolas (send at 17:45)

- Which teams have a working Plant Pulse v0 and which are still fragile.
- Each team's charter scope-in list, so the build lab connects to it.
- Any participant who struggled with the setup on Monday.
