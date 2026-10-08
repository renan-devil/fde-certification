<!-- DECK: FDE School, Day 2 afternoon, "Leading an FDE project". 36 slides, 13:30 to 17:30. Trainer: Renan. -->
<!-- Conventions for Claude Design: slides are separated by a line of three dashes. The first comment of each slide gives its number and type. Text inside comments is design direction, never slide text. Identity: OSS Ventures design system. Ink #0D0D0D, paper #FDFDFD, flame #FD594F as the single accent; Fjalla One uppercase titles, Inter body, Archivo labels, Geist Mono for sources and figures; brand photography only. Rendered deck: "D2 PM - Deck - Leading an FDE project.dc.html". -->

<!-- 1 | Title -->
# FDE School
## Day 2 afternoon: leading an FDE project

FDE School, by Devoteam and OSS Ventures
Renan Devillières

*AI 50%: drafted with Claude from the FDE School curriculum and OSS field material, validated by the trainer.*

---
<!-- 2 | Detail -->
## This afternoon: the method, the charter, the governance and the protocol that makes a gain real

| Time | Block | You leave with |
|---|---|---|
| 13:30 | Opening | This morning's leaks, one line each |
| 13:40 | The six-phase method | The phases, their exits, the gates |
| 14:05 | Scope and charter | What a charter adds to the TIP one-pager |
| 14:25 | Exercise 1 | The Polymex project charter |
| 15:05 | Break | |
| 15:20 | Governance | Three rituals and the no-surprises rule |
| 15:35 | The gains validation protocol | Baseline, counting rules, the controller's spreadsheet |
| 16:00 | Exercises 2 and 3 | Ferralux in fifteen minutes; the Polymex protocol, tested by another team |
| 17:15 | Close | Three things to keep |

---
<!-- 3 | Detail -->
## By 17:30 you will run a project a CFO trusts from week one

- You can name the six phases of an FDE engagement and the exit criterion of each.
- Your team has a charter for Polymex: perimeter, target, scope in and out, kill criteria, roles.
- You know the three governance rituals and why bad news travels the same day.
- Your team has a validation protocol that the plant controller could run without you.

---
<!-- 4 | Hero -->
## Nobody remembers your model. They remember whether the number held.

---
<!-- 5 | Divider | ghost: 6 -->
## Part 1. The six-phase method

---
<!-- 6 | Framework -->
## Every FDE engagement runs the same six phases, and phase six feeds phase two

1. **Embed.** Live on the floor, earn access, co-build the baseline.
2. **Find.** Test the tree, size the gain, sign the charter.
3. **Build.** A thin slice in production, every week.
4. **Deploy.** Integrated, hardened, handed over to IT.
5. **Drive adoption.** Decisions run on the system, without you.
6. **Expand.** The next problem, the next site.

---
<!-- 7 | Detail -->
## Each phase ends on an exit criterion the sponsor can see

| Phase | Typical weeks | Exit criterion | Artifact |
|---|---|---|---|
| Embed | 1 to 2 | Baseline agreed with the controller; data access granted | TIP one-pager, systems map |
| Find | 2 to 4 | Charter signed by the sponsor; first test result in | Charter, gains case |
| Build | 4 to 8 | Named users use v1 every day | Working system, eval set |
| Deploy | 6 to 10 | Runs two weeks without the FDE touching it | Runbook, IT handover |
| Drive adoption | 8 to 12 | Controller-measured gain at run-rate | Validation report |
| Expand | 12 and after | Next charter signed | Replication plan |

---
<!-- 8 | Detail -->
## Embed: two weeks on the floor before a line of production code

- Shadow every shift at least once, including the night shift and a weekend.
- Interview the five stakeholder types: sponsor, users, IT, finance, the expert nobody mentions.
- Get read access to the data on day one; work on exports while IT decides.
- Sit with the controller in week one and co-build the baseline.

---
<!-- 9 | Detail -->
## Find: test the tree, price the gain, then ask for a signature

- Run the cheapest test that could kill the sponsor's theory first.
- Turn the leak register into a gains case with a low, base and high case.
- Write the charter and get it signed before the build starts.
- If the problem is not worth ten times the cost to fix it, stop here.

---
<!-- 10 | Detail -->
## Build: a thin slice in production every week beats a complete system in month three

- Week one of the build ends with something a named user opens on the floor.
- Every release has an eval set and a verification log.
- Users co-author the rules: their names go in the changelog.
- Demo every Friday to the users first, the sponsor second.

---
<!-- 11 | Detail -->
## Deploy and drive adoption: the system runs without you, and decisions run on it

- Deployed means monitored, documented, owned by a named person in IT.
- Adopted means a decision that used to be made in a spreadsheet is now made in the tool.
- Measure use, not logins: schedules issued, overrides logged, alerts acted on.
- Leave before you are needed less; stay until the controller has measured the gain.

---
<!-- 12 | Data -->
## Expect about 30% of initiatives to fail: kill them at a gate, not at month six

- Each exit criterion is a gate. Failing it twice is a decision to stop, not a reason to try harder.
- Kill criteria are written in the charter on day one, when nobody is attached yet.
- A stopped project with a clear reason keeps the account. A zombie project loses it.

Source: OSS Ventures, contrarian learnings, March 2026, and Transformer review, April 2026.
<!-- single large "30%" left -->

---
<!-- 13 | Divider | ghost: SCOPE -->
## Part 2. Scope and charter

---
<!-- 14 | Framework -->
## The charter turns yesterday's TIP one-pager into a contract

| The TIP one-pager has | The charter adds |
|---|---|
| Problem statement and gap | Target, date and the metric the controller computes |
| Hypothesis tree and tests | Scope in and scope out, written and signed |
| Decision point | Kill criteria at each gate |
| | Roles: sponsor, product owner, controller, IT owner, users |
| | Cost to achieve: people, software, client time |
| | Governance: rituals, cadence, decision rights |

---
<!-- 15 | Detail -->
## Say the scope out loud: what is in, what is out, and who said so

- Name the perimeter: which lines, which product families, which sites.
- Write what is out with the same care: the out-list prevents the next fight.
- Every scope change goes through the steering committee and the decision log.
- Perimeter creep is how gains get laughed out of the room at month six.

---
<!-- 16 | Detail -->
## Kill criteria, written on day one, protect the client and the team

- One per gate, measurable: "if the backtest shows changeovers explain less than a third of the OTIF loss by week 4, we stop."
- Agreed with the sponsor before anyone is attached to the solution.
- Reviewed at every steering committee, out loud.
- A kill is a result. Write it up and send it to the controller like a gain.

---
<!-- 17 | Framework -->
## Five client roles must have a name before the build starts

| Role | Owns |
|---|---|
| Sponsor | The decision to go on, the budget, the escalations |
| Product owner | The rules and the priorities; usually the main user |
| Controller | The baseline, the formula and the gain |
| IT owner | Access, security, the handover |
| Users | Daily use, and the right to say what is wrong |

The FDE team owns the system, the plan and the truth about progress.

---
<!-- 18 | Exercise -->
## Exercise 1: write the Polymex project charter

1. Start from your TIP one-pager and this morning's leak register.
2. Fill the eight sections of the charter template in the handout.
3. Write at least one kill criterion per gate.
4. Name a person for each of the five client roles, from the Polymex cast.
5. Be ready to defend your scope-out list in two minutes.

Forty minutes. The Lead holds the pen; the Verifier checks every number against the register.

---
<!-- 19 | Divider | ghost: RAID -->
## Part 3. Governance

---
<!-- 20 | Framework -->
## Three rituals run the project: the weekly review, the steering committee, the decision log

| Ritual | Who, when | What it decides |
|---|---|---|
| Weekly ops review | Product owner, users, FDE team. Tuesday, 30 minutes | Priorities for the week, rules to change, blockers |
| Steering committee | Sponsor, controller, IT owner, FDE lead. Monthly, 60 minutes | Gates, scope changes, kill or go, resources |
| Decision log | Kept by the FDE lead, read at every ritual | What was decided, by whom, on what evidence |

---
<!-- 21 | Detail -->
## The no-surprises rule: bad news travels the same day, with options

- The sponsor never hears bad news for the first time in a meeting.
- Call or walk over the same day; write it down the same evening.
- Bring two or three options and your recommendation, never only the problem.
- A missed date announced two weeks early is a plan. Announced the day before, it is a failure.

---
<!-- 22 | Detail -->
## A status report is numbers against plan, not adjectives

| Workstream | Plan this week | Actual | Status | Next step |
|---|---|---|---|---|
| Rules capture | 40 changeover rules validated | 31 | Amber | Corinne's session moved to Thursday |
| Data pipeline | April exports loaded | Loaded, 2 files quarantined | Green | Ask the logger vendor for the schema change |
| Gain | Baseline signed | Not signed | Red | Mireille's controller on Monday, options sent |

Green, amber and red each come with a number. "Progressing well" is not a status.

---
<!-- 23 | Detail -->
## The RAID log: risks, assumptions, issues and decisions, each with an owner and a date

| Type | Example at Polymex | Owner | Date |
|---|---|---|---|
| Risk | Corinne hears the replacement rumor and stops sharing rules | FDE lead | Review weekly |
| Assumption | Sales can sell 6% more volume with shorter lead times | Sales director | Confirm by week 3 |
| Issue | The logger changed its export format on 14 April | Nadia | Fix by Friday |
| Decision | APS selection is out of scope for this project | Hervé | Steering, week 2 |

---
<!-- 24 | Divider | ghost: CFO -->
## Part 4. The gains validation protocol

---
<!-- 25 | Hero -->
## A gain exists when the client's controller computes it without you.

---
<!-- 26 | Framework -->
## Draw the gains tree before you open a spreadsheet

1. **Lever.** What the system changes: the sequence of orders on each line.
2. **Physical effect.** Fewer changeover hours, more good tonnes at the constraint.
3. **Financial line.** Through the fork: avoided overtime today, contribution on named orders tomorrow.

If you cannot draw the branch from a feature to a P&L line, the branch does not exist.

---
<!-- 27 | Detail -->
## Every fight with finance is a fight about the baseline: settle it in week one

| Rule | What it means |
|---|---|
| Period | Twelve rolling months when there is seasonality, never less than six |
| Perimeter | Frozen and named: lines, product families, sites |
| Normalization | The baseline moves with volume, mix and price: baseline rate × actual volume, by family |
| Data source | The system finance already trusts, not your pipeline |
| Owner | The controller, who keeps the spreadsheet |

---
<!-- 28 | Framework -->
## Four types of gain, four different burdens of proof

- **Cost-out.** Scrap, energy, overtime. The invoice shrinks; finance accepts it fastest.
- **Capacity release.** Worth money only through the fork, and only with sales confirmation.
- **Cash release.** Inventory: cash once, carrying cost every year, never added.
- **Revenue enablement.** Penalties avoided, orders won. Needs contracts or named orders; discount it and say so.

---
<!-- 29 | Detail -->
## Recite the counting rules before every steering committee

- Recurring and one-time, stated separately, always.
- Gross and net of the cost to achieve: software, the deployment, the client's time.
- Run-rate and realized: "€300K run-rate in month four" is not "€300K this year".
- No double counting across initiatives: share one baseline register with the lean team.

---
<!-- 30 | Framework -->
## The validation protocol fixes six things in writing, in week one, before any software runs

1. **Metric.** The one number that moves, with its unit.
2. **Formula.** Written so the controller can type it.
3. **Data source.** The system and the extract, owned by the client.
4. **Normalization.** How the baseline follows volume, mix and price.
5. **Cadence.** Who computes it, when, and who reviews it.
6. **Sign-off trigger.** The value and the duration that make the gain official.

---
<!-- 31 | Data -->
## Ranges and triangulation: a case that survives its own low case is a case you can defend

- Base, low and high, each driven by one named assumption, not ±10% for decoration.
- A second, independent path: top-down from the P&L, bottom-up from hours and rates.
- Within 20 to 30% of each other: present. Further apart: find the error first.

Source: FDE School curriculum, validated gains module.
<!-- single large "20-30%" left -->

---
<!-- 32 | Exercise -->
## Exercise 2: Ferralux, the counting rules in fifteen minutes

1. A machining plant, 14 CNC machines, 52,000 scheduled machine-hours a year.
2. Changeovers take 18% of scheduled hours; a six-week pilot on three machines cut changeover time by 35%.
3. The plant is sold out: backlog about 9% of capacity; sales confirms €120 of contribution per machine-hour.
4. Software €90K a year; deployment €60K once.
5. Compute base, low and high, gross and net, recurring and one-time, run-rate and year one.

Fifteen minutes, alone, on paper. Then compare with your team.

---
<!-- 33 | Exercise -->
## Exercise 3: write the Polymex validation protocol, then let another team try to run it

1. Use the protocol template: metric, formula, source, normalization, cadence, sign-off.
2. Cover the gain in your charter, with its baseline and perimeter.
3. At 16:45, swap with the next team. Their Verifier plays the plant controller.
4. The controller tries to compute the baseline from your protocol alone, without asking you anything.

Thirty minutes to write, fifteen to test, fifteen to debrief.

---
<!-- 34 | Detail -->
## The controller test: five questions your protocol must answer without you in the room

1. Which file do I open, and who sends it to me?
2. Which months are the baseline, and which lines and families?
3. What do I do when volume or mix changes?
4. What do I do with a week the plant was down for maintenance?
5. Which number, held for how long, makes me sign?

---
<!-- 35 | Detail -->
## Three things to keep from this afternoon

1. Six phases, each with an exit the sponsor can see; kill criteria written on day one.
2. Bad news travels the same day, with options.
3. The gain is announced by the controller's spreadsheet, not yours, from a protocol signed in week one.

---
<!-- 36 | Detail -->
## Go further, and tomorrow

**Read**
- Charles Conn and Robert McLean, *Bulletproof Problem Solving* (2018): workplans and kill criteria.
- Gene Kim and others, *The Phoenix Project*: what governance looks like when it fails.

**Tomorrow, with Nicolas**
- Plant systems, ISA-95, integration and security in the morning.
- AI fundamentals and the Plant Pulse v1 build in the afternoon.
