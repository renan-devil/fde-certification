# Day 2 afternoon: exercises

FDE School, by Devoteam and OSS Ventures. Participant handout. Polymex Industries and Ferralux are fictional; every Polymex number is consistent with this morning's register.

---

## Exercise 1. Write the Polymex project charter (40 minutes)

### Situation

Hervé read your memo. He wants a project, not a report: "Write me what you will do, by when, and what it will be worth. I will take it to the COO." You start Monday with two FDEs for twelve weeks.

### What you have

- Your TIP one-pager from Monday and your leak register from this morning.
- The Polymex cast: Hervé (site director), Corinne (planner, 11 years), Marc (operator on M04, 23 years), Nadia (IT manager), Mireille (CFO) and her plant controller, the sales director.
- Hervé's position: "We need a serious APS and probably a stronger planner."

### Template: project charter

| Section | Your team's answer |
|---|---|
| 1. Problem statement (one falsifiable sentence) | |
| 2. Target and date (metric, current, target, computed by whom) | |
| 3. Perimeter (lines, families, site) | |
| 4. Scope in | |
| 5. Scope out (as carefully as scope in) | |
| 6. Gains case (low, base, high; condition; cost to achieve) | |
| 7. Kill criteria, one per gate (weeks 2, 4, 8, 12) | |
| 8. Roles: sponsor, product owner, controller, IT owner, users | |
| Governance (rituals, cadence, decision rights) | |

Be ready to defend your scope-out list in two minutes.

---

## Exercise 2. Ferralux: the counting rules in fifteen minutes (alone, on paper)

### The case

| Item | Value |
|---|---|
| Plant | Precision machining, 14 CNC machines |
| Scheduled machine-hours | 52,000 a year |
| Changeovers | 18% of scheduled hours |
| Pilot | Six weeks on 3 machines: changeover time cut by 35% |
| Demand | Effectively sold out: backlog about 9% of capacity at current prices |
| Contribution | €120 per machine-hour, confirmed by sales for marginal orders |
| Software | €90K a year for the plant |
| Deployment | €60K, one-time |

### Questions

1. How many hours are freed in the base case? What is the gross gain a year?
2. What is the net run-rate a year? What is the payback on the one-time cost?
3. What is realized in year one if the first two months run at half speed?
4. Build a low and a high case. Name the assumption that drives each.
5. Check the fork: can the plant sell every freed hour? What happens to the case if demand softens?
6. Triangulate: give a second, independent path to the same order of magnitude.

---

## Exercise 3. The Polymex validation protocol, tested by another team (30 + 15 minutes)

### Situation

Mireille has agreed to meet you on Monday, with her plant controller. Her rule: "I sign a gain only if my controller can measure it without you." You bring a one-page protocol.

### Facts the controller will want

| Item | Value |
|---|---|
| Extrusion shift log | Per machine and shift: planned, changeover, downtime and run minutes; output and scrap in tonnes. Exported daily by the logger. |
| ERP | Production confirmations per order; deliveries per customer; one standard changeover time per product |
| Payroll | Overtime hours and premium per month |
| Known gaps in the shift log | Logger outage on 17 February, shift C; M03 planned shutdown on 1 March |
| Retail accounts | Two accounts would take +6% volume with shorter lead times, per the sales director, not yet in writing |
| Good tonnes per run hour at baseline | 2.30 × 0.863 × 0.939 ≈ 1.86 |

### Template: validation protocol (one page)

| Item | Your team's answer |
|---|---|
| Metric (the number that moves, with its unit) | |
| Formula (written so the controller can type it) | |
| Valuation (which tonnes or hours are worth what, and why) | |
| Data source (system, extract, who sends it) | |
| Baseline (period, perimeter, exclusions, normalization) | |
| Cadence (who computes, when, who reviews) | |
| Sign-off trigger (value, duration) | |
| Disputes (whose spreadsheet wins) | |

### The controller test (at 16:45)

Swap protocols with the next team. Your Verifier plays the plant controller and answers these five questions from the protocol alone, without talking to its authors:

1. Which file do I open, and who sends it to me?
2. Which months are the baseline, and which lines and families?
3. What do I do when volume or mix changes?
4. What do I do with a week the plant was down for maintenance?
5. Which number, held for how long, makes me sign?

Write down every question you could not answer. That list is your feedback to the other team.
