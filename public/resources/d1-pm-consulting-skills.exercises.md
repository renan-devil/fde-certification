# Day 1 afternoon: exercises

FDE School, by Devoteam and OSS Ventures. Participant handout. Polymex Industries is a fictional plant; every number below is consistent with this morning's data.

---

## Exercise 1. From Hervé's complaint to a problem worth testing (45 minutes)

### The email

> **From:** Hervé, site director, Polymex Industries
> **To:** FDE team
> **Monday, 7:42**
> **Subject:** Before you start
>
> Welcome to Polymex. Let me save you some time.
>
> Our on-time delivery has gone from 91% to 84% since September, and corporate wants 95%. The problem is planning. Corinne is overwhelmed: the schedule is rewritten every day, and the Friday plan is dead by Monday morning. Customers call me directly now, which never used to happen.
>
> I have told our COO we need a serious APS and probably a stronger planner. I need your recommendation by Friday, and it has to hold up in front of corporate.
>
> Hervé

### Context sheet

| Item | Value |
|---|---|
| OTIF, measured on promise date | Sep 91%, Oct 90%, Nov 89%, Dec 88%, Jan 87%, Feb 86%, Mar 85%, Apr 84% |
| Corporate target | 95% |
| Retail clients' share of volume | Dec 12%, Jan 19%, Mar 26%, Apr 31% |
| Changeovers per week, extrusion | About 41 in the fourth quarter; 49 in early January; 71 in late March; 78 in April |
| Order book | 91% of demonstrated capacity |
| Planning | One planner, Corinne, 11 years at Polymex. The senior scheduler, Jean-Pierre, retired in March. Plan issued every Friday from the ERP. |
| ERP | Holds routings, standard rates and one changeover time for every product |

### Your task

1. Climb the five rungs: complaint, observable symptom, quantified gap, candidate causes, problem statement with a kill test.
2. Answer the question behind the question: who hurts, why now, what "solved" means to Hervé in his own words.
3. Build a three-branch MECE hypothesis tree with a prior (high, medium, low) on each branch. Hervé's culprit must appear as one testable branch.
4. Give each leaf a test: data or observation, cost, owner.
5. Choose the first test you run on Monday and say why.

### Template: TIP one-pager

| Section | Your team's answer |
|---|---|
| Problem statement (one falsifiable sentence) | |
| Baseline and gap (metric, current, target, trend, source) | |
| Who hurts, why now, what solved means to Hervé | |
| Hypothesis tree (three branches, priors) | Branch A: … (prior) / Branch B: … (prior) / Branch C: … (prior) |
| Tests (what, cost, owner, date) for each leaf | |
| First test on Monday, and why | |
| Decision point (when we choose, on what evidence) | |

---

## Exercise 2. Answer first: a memo and a storyline for Hervé (45 minutes)

### Fact base

Use these facts, which match this morning's lab. If your team found different numbers, you may use yours, with your verification log.

1. OTIF on promise date fell from 91% in September to 84% in April. The target is 95%.
2. Extrusion is the plant's constraint. Every day, mixing spends about 1,170 unit-minutes blocked waiting for extrusion, and packing about 1,660 unit-minutes starved waiting for it. Extrusion itself waits about 60.
3. Changeovers on extrusion rose from 49 a week in early January to 71 a week in late March.
4. Changeovers took 7.5% of planned extrusion time in January and 10.3% in March.
5. In March alone, the extra changeovers, compared with January's rate, cost about 272 tonnes of good output.
6. Good output fell from 233.6 tonnes a day in January to 223.9 in March, minus 4%.
7. Line M07 runs at 77.6% performance against about 88% for the other lines, with normal logged downtime. Over the quarter, that is about 376 tonnes lost to stops nobody records.
8. Line M04 runs at 75% performance at weekends against 90% on weekdays, and scraps 9.6% of its output at weekends against 6.0% on weekdays.
9. Line M02 loses 16.1% of its planned time to logged breakdowns, against 7.7% for the other lines.
10. The order book stands at 91% of demonstrated capacity. Sales says two accounts would take 6% more volume at current prices if lead times improved.
11. Contribution margin is about 26% of revenue, roughly €450 a tonne. Revenue is €148M a year.
12. The ERP schedules every changeover at 30 minutes, whatever the products.

### Your task

1. The governing thought: one sentence, your answer and its so-what.
2. A memo to Hervé: situation, complication, resolution, at most 250 words, in prose.
3. A six-slide ghost deck: an action title for each slide, plus one line naming the evidence that proves it.
4. The 30-second spoken version, rehearsed twice.

### Template: memo

> **To:** Hervé **From:** [team] **Date:** [date] **Subject:** [your governing thought, shortened]
>
> [Situation: one or two sentences Hervé already agrees with.]
>
> [Complication: what changed, with the two or three numbers that matter.]
>
> [Resolution: your recommendation, what it is worth and how sure you are, and the one decision you need from him.]

### Template: ghost deck

| # | Action title (a full-sentence conclusion) | Evidence that proves it (facts used) |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |
| 4 | | |
| 5 | | |
| 6 | | |

Read the six titles aloud in order. If they do not tell the whole story, rewrite them.

---

## Exercise 3. Map the plant, pre-wire Friday, brief Hervé live (10 minutes of preparation, then live briefings)

### Cast sheet

| Person | Role | Measured on | What you know |
|---|---|---|---|
| Hervé | Site director, your sponsor | OTIF and plant EBIT | Has told the group COO the plant needs an APS and probably a stronger planner. Wants your recommendation by Friday. |
| Corinne | Planner, 11 years | Plan adherence; in practice, every late order | Her spreadsheet is what the floor actually runs. Has heard rumors about an APS. Short on time and on patience. |
| Marc | Extrusion operator on M04, 23 years, weekday morning shift | Output and scrap on his line | Respected on the floor. Talks little to people from head office. |
| Nadia | IT manager | Uptime, security, audit findings | Inherited an unsupported application from a 2022 project and was blamed for it in an audit. |
| Mireille | CFO | Group EBIT, cash | Will join Friday's steering. Not yet briefed. |
| The group COO | Hervé's boss | Group OTIF, the 95% target | Expects Hervé's recommendation after Friday. |
| The sales director | Owns key accounts, including the two retail clients | Revenue, customer satisfaction | Some customers are known on the floor as "priority". |

### Your task

1. Place each person on the map below.
2. Write the pre-wiring plan for Friday's steering committee.
3. Prepare a two-minute, answer-first briefing of your Exercise 2 recommendation for Hervé.

### Template: influence and stance map

| | Opposed or wary | Neutral | Supportive |
|---|---|---|---|
| High influence | | | |
| Low influence | | | |

### Template: pre-wiring plan

| Order | Who | When | What we need from them | What we offer them | Risk if we skip them |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

### Briefing structure (two minutes)

1. The answer, in one sentence.
2. The two numbers that prove it.
3. The options you see, and the one you recommend.
4. The decision you need from Hervé this week.
