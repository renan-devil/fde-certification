<!-- DECK: FDE School, Day 1 morning, "The job AI created". 50 slides, 9:00 to 12:00. Trainer: Renan. -->
<!-- Conventions for Claude Design: slides are separated by a line of three dashes. The first comment of each slide gives its number and type. Text inside comments is design direction, never slide text. Identity: FDE School, by Devoteam and OSS Ventures; ink #141313, paper #FFFFFF, steel #5B6470, gauge #E2E5E9, marker #FFD028 for highlights; Archivo, condensed bold for titles; both logos on an ink band on the title slide. -->

<!-- 1 | Title -->
# FDE School
## Day 1 morning: the job AI created

FDE School, by Devoteam and OSS Ventures
Renan Devillières

*AI 50%: drafted with Claude from the FDE School curriculum and OSS field material, validated by the trainer.*
<!-- ink band across the top with the OSS Ventures logo left and the Devoteam logo right; title in condensed bold on paper below -->

---
<!-- 2 | Hero -->
## Every company can now rent the same intelligence. Almost none can deploy it.
<!-- full-bleed ink background, the sentence alone in condensed bold, white; nothing else on the slide -->

---
<!-- 3 | Detail -->
## This morning: three hours, and every team ships a live app

| Time | Block | You leave with |
|---|---|---|
| 9:00 | Why we are here, how the week works | Your team and your role |
| 9:10 | Setup sprint | A laptop that builds and deploys |
| 9:40 | Why the FDE exists | The economics of deployment |
| 10:05 | What an FDE is, and is not | The role, the loop, the skills |
| 10:25 | The industrial context in five slides | The map for the week |
| 10:35 | Break | |
| 10:45 | Lab: Polymex Plant Pulse | A deployed app with checked numbers |
| 11:40 | Demos | Feedback from the room |
| 11:55 | Close | Three things to keep |

---
<!-- 4 | Detail -->
## By noon you will have the definition, the economics and a deployed app

- You can say in two sentences what an FDE is accountable for, and what it is not.
- You can explain with three numbers why deployment, not the model, is where industrial AI fails.
- You know the loop you will run on every engagement.
- Your team has shipped a live app on plant data, with numbers another pair has checked.

---
<!-- 5 | Framework -->
## The week moves from the role to the business, the technology, the obstacles and the full motion

1. **The role.** What an FDE is; how consultants think and speak.
2. **The business.** Where a plant loses money; how an FDE project is run.
3. **The technology.** Plant systems and data; how AI works, and building with it.
4. **The obstacles.** Dirty data and legacy systems; people who resist.
5. **The full motion.** Two real engagements, then the FDE Certification exam.
<!-- five columns in sequence, numbered because the order matters; day number large, one line under each -->

---
<!-- 6 | Framework -->
## Four design choices make this a working week, not a course

- **One plant all week.** Polymex Industries. Every lab from Monday to Thursday happens inside it.
- **Everything lands in a deliverable.** A URL, a memo, a protocol. No exercise ends in notes.
- **AI-native.** Claude Code does most of the typing. You own the spec, the checks and the deployment.
- **Real engagements on Friday**, disguised, then the exam.
<!-- 2x2 grid with one icon-free label per cell; keep cells of different weights, not identical cards -->

---
<!-- 7 | Detail -->
## Five house rules keep the room safe and the clients protected

1. Chatham House: use what you hear, never attribute it.
2. Friday's cases are real and disguised. If you recognize a company, keep it to yourself and add nothing that is not in the case pack.
3. No client data in consumer AI tools, ever.
4. AI tools are unrestricted in labs and forbidden in the exam.
5. Laptops closed during teaching, open in labs.

---
<!-- 8 | Framework -->
## Teams of four, four roles, rotating every day

| Role | Owns |
|---|---|
| Lead | Scope, time, decisions, the question asked to the sponsor |
| Builder | The keyboard, Claude Code, the deployed artifact |
| Verifier | Independent checks of every number, the verification log |
| Storyteller | The memo, the storyline, the readout |

Choose today's roles now. Everyone holds each role at least once this week.

---
<!-- 9 | Divider -->
## Setup sprint: thirty minutes, then everyone can build and ship
<!-- divider on ink; a large "30:00" in condensed bold as the only other element -->

---
<!-- 10 | Detail -->
## Install six tools and open two accounts

**Install**
- Node.js LTS (22 or later) and Git
- VS Code, or the editor you already use
- Claude Code (native installer, next slide)
- Vercel CLI
- Python 3.11 or later, with pandas

**Accounts**
- GitHub, personal and free
- Vercel, personal Hobby plan for training projects
- Claude: access is handed out now by the organizers

---
<!-- 11 | Detail -->
## Copy these commands in order, and raise a hand after five minutes stuck

```bash
# Claude Code, native installer (macOS, Linux, WSL)
curl -fsSL https://claude.ai/install.sh | bash
# Windows PowerShell
irm https://claude.ai/install.ps1 | iex

# Vercel CLI and a quick check of everything
npm install -g vercel
node -v && git --version && python3 --version && claude --version

# First run: log in to Claude Code
claude
```

Official setup guide: code.claude.com/docs/en/setup

---
<!-- 12 | Detail -->
## Done at 9:40 means four things work on your laptop

1. `claude` answers in your terminal.
2. You cloned `polymex-plant-pulse` from the cohort's GitHub organization.
3. You pushed one commit to your own GitHub.
4. You deployed a hello page with `vercel` and posted the URL in the cohort channel.

---
<!-- 13 | Divider -->
## Why this job exists

---
<!-- 14 | Data -->
## People feel AI in their working day; companies do not yet see it in their P&L

| Share of respondents | |
|---|---|
| AI improved my own productivity | 80% |
| My company sees some EBIT impact from AI | 37% |
| My company attributes 5% or more of EBIT to AI | 6% |

The EBIT figure has not moved in a year, while the models kept improving.

Source: McKinsey & Company, The state of AI in 2026, August 2026 (1,719 respondents, May to June 2026).
<!-- three horizontal bars, ink on gauge track, the 6% bar in marker; values at bar ends in tabular figures -->

---
<!-- 15 | Data -->
## Most enterprise pilots never reach the P&L, and the cause is rarely the model

- About 95% of enterprise generative AI pilots showed no measurable P&L impact.
- Projects run with specialized partners succeeded about twice as often as internal builds.
- The study traces the gap to how tools are integrated into work and whether they adapt, not to model quality.

Source: MIT NANDA, The GenAI Divide: State of AI in Business 2025, July 2025. Failure is defined as no measurable benefit within six months.
<!-- one large figure "95%" left, two supporting lines right -->

---
<!-- 16 | Data -->
## Capability has become a commodity you rent

- The cost of GPT-3.5-level output fell more than 280-fold between November 2022 and October 2024.
- The top models from six labs sit within about 25 rating points of each other on the most watched public leaderboard.
- So what: your competitor rents the same intelligence. The difference is what you feed it and where you put it to work.

Source: Stanford HAI, AI Index 2025 (inference cost) and AI Index 2026 (leaderboard, March 2026).
<!-- log-scale line falling over 2022 to 2024; small inset of six dots bunched together -->

---
<!-- 17 | Data -->
## Agents now carry whole tasks, and the length of those tasks keeps doubling

- The length of software tasks AI agents complete on their own has doubled roughly every seven months since 2019.
- On a plant, under supervision: read an order, check capacity, propose a slot, flag the risk, draft the supplier email.

Source: METR, Measuring AI Ability to Complete Long Tasks, March 2025; Time Horizon 1.1, January 2026.
<!-- log-scale chart of task length over time with a straight doubling line, labeled illustrative -->

---
<!-- 18 | Framework -->
## Industrial AI fails in the last mile: data, workflow and people

| Layer | What goes wrong |
|---|---|
| Model | Rarely the problem anymore |
| Data | Lives in legacy systems, spreadsheets and heads; worse than anyone expected |
| Workflow | The tool is live, but decisions still run on habit |
| People | Operators override what they do not trust, and they are often right |

The FDE is the person who closes the last three rows.
<!-- vertical stack, model at the top in steel, the three last-mile rows in ink with a marker bracket labeled "last mile" -->

---
<!-- 19 | Data -->
## About 40% of the data an agent needs is in no system at all

- Across more than 100 agentic deployments, OSS Ventures found that about 40% of the data agents need lives in people's heads and in spreadsheets.
- No integration project will fetch it. Someone has to go and get it, on site, from the people who hold it.

Source: OSS Ventures, analysis of more than 100 agentic deployments, 2026.
<!-- a single large "40%" with a split bar: 60% systems of record, 40% heads and spreadsheets -->

---
<!-- 20 | Framework -->
## Value sits where decisions need deep context and errors are expensive

| The decision needs | Errors are cheap | Errors are expensive |
|---|---|---|
| Little context | Buy off the shelf: copilots, drafting, search | Automate with guardrails: document checks, invoice matching |
| Deep knowledge of the operation | Assist a person: quote preparation, root-cause hypotheses | Build on the plant's ontology: scheduling, formulation, quality release |

Most pilots sit top left. Most of the money sits bottom right, and that is where FDEs work.

Source: OSS Ventures, brief for industrial CEOs, 2026.
<!-- 2x2 matrix, bottom-right cell filled with marker -->

---
<!-- 21 | Hero -->
## The bottleneck has moved from models to people who can deploy them.
<!-- full-bleed ink, white condensed bold -->

---
<!-- 22 | Data -->
## The market has noticed: FDE job postings grew about eightfold in 2025

- Postings for Forward Deployed Engineers grew about 800% between January and September 2025.
- Palantir, OpenAI and Anthropic all run forward deployed teams.
- In European industry, the profile barely exists yet. You are the first cohort.

Source: Indeed data reported by the Financial Times, 2025.
<!-- large "×8" figure, two lines underneath -->

---
<!-- 23 | Framework -->
## The role was invented to get complex software live where classic IT projects stalled

1. **Late 2000s.** Palantir puts engineers inside client organizations to make its platform work on their data.
2. **2020s.** The leading AI labs build forward deployed teams to turn models into production systems.
3. **2025.** OSS Ventures embeds engineers in industrial groups through its Transformer program.
4. **2026.** The FDE School and The FDE Company industrialize the role for European industry.
<!-- horizontal timeline with four stops -->

---
<!-- 24 | Detail -->
## In industry the job is harder: continuous shifts, old systems, safety and thin margins

- A plant runs day and night; a bad schedule costs tonnes by the next shift.
- Systems are decades old; the rules that matter sit in spreadsheets and notebooks.
- Safety comes first and slows everything you do on the floor.
- Margins are thin: a plant at 6.6% EBIT cannot afford a pilot that changes nothing.

---
<!-- 25 | Data -->
## Across 3,800 sites, the difference between a pilot and a rollout was a person doing this job

- Software from OSS Ventures' 22 companies runs in about 3,800 industrial sites, with about 200,000 monthly users.
- In every rollout that worked, someone played the FDE role, whether or not it carried the name.
- In the ones that stalled, nobody did.

Source: OSS Ventures portfolio tracker, April 2026.

---
<!-- 26 | Divider -->
## What an FDE is, and is not

---
<!-- 27 | Detail -->
## An FDE embeds with the client, ships the system and stays accountable for the result in production

> A software engineer who embeds inside a client organization to scope, build and operate the systems that make a product deliver measurable value, and who stays accountable for the outcome in production.

The FDE Company's mission: make industrial AI software deliver the value it promises, measured in euros on the client's P&L.
<!-- the definition as a large pull quote; the mission line small in steel underneath -->

---
<!-- 28 | Detail -->
## The FDE is not a consultant, a solutions engineer or a staffing resource

| | FDE | Consultant | Solutions engineer | Staffing |
|---|---|---|---|---|
| Output | Running systems, measured euro gains | Recommendations | Demos, proofs of concept | Hours |
| Engagement | From signature to value in production | One phase | Before the sale | The contract |
| Accountability | Same person from scoping to steady state | Until the report | Until the deal | For the task |
| Link to product | Feeds field patterns back to the product | None | Sales feedback | None |
| Commercial | Expansion follows delivered value; no quota | Sells the next phase | Carries a number | None |
<!-- FDE column highlighted with a marker header; other columns in steel -->

---
<!-- 29 | Framework -->
## Four capabilities make an FDE, and this week trains each of them

| Capability | What it means on site | Trained on |
|---|---|---|
| Business judgment | Reads the P&L, sizes a problem in euros, knows when to say no | Day 2 |
| Field craft | Interviews, stakeholders, sponsors, change | Days 1 and 4 |
| Engineering | Builds, integrates, ships and runs software in production | Days 3 and 4 |
| Meaning | Turns data and expert rules into a model of the plant | Days 3 and 4 |

All four point at one thing: being accountable for the result.
<!-- four quadrants around a central label "accountable for the result" -->

---
<!-- 30 | Detail -->
## Every week, an FDE answers three questions

1. What moves this client's P&L, and by how much?
2. What really happens on the floor, as opposed to what the systems say?
3. What can I ship by Friday that someone will use on Monday?

---
<!-- 31 | Detail -->
## A week in the life: the shop floor in the morning, the director's P&L in the afternoon

| Day | Morning | Afternoon |
|---|---|---|
| Monday | Weekly operations review with the plant team | Replay last week's schedule with the planner, order by order |
| Tuesday | Two hours with the night shift | Data archaeology in the MES export |
| Wednesday | Ship a fix to the sequencing rules | Demo to the planner, who corrects two rules |
| Thursday | IT: move from file extracts to a read API | Prepare the steering committee |
| Friday | Steering committee: gains against the baseline the controller agreed | Plan next week |
<!-- calendar strip, one row per day -->

---
<!-- 32 | Framework -->
## The FDE loop: embed, find, build, deploy, drive adoption, expand

1. **Embed** with the client team, on site.
2. **Find** the problem worth solving, in euros.
3. **Build** fast with what exists.
4. **Deploy** into real workflows, not a sandbox.
5. **Drive adoption** until the new routine holds without you.
6. **Expand** to the next problem or the next site.
<!-- circular loop, six stations, arrow returning from 6 to 2 -->

---
<!-- 33 | Detail -->
## The first three months are discovery and stabilization, so plan them that way

- Data quality problems appear only when AI first runs on real data.
- Organizational change moves slower than technical plans.
- A three-month delay on a first engagement taught the lesson: budget discovery up front and the "delay" disappears.

Source: OSS Ventures, Transformer review after six months, April 2026.

---
<!-- 34 | Detail -->
## Expect about 30% of initiatives to fail, and stop them early

- Agentic software is harder to deploy than classic SaaS, not easier.
- Impressive demos are a graveyard: a demo on clean data proves nothing about production.
- The gains worth changing a plant for are multiples, around 10x, not 10%.

Source: OSS Ventures, contrarian learnings, March 2026, and Transformer review, April 2026.

---
<!-- 35 | Framework -->
## The path from here: train, shadow a live deployment, then lead

1. **This week.** The FDE School.
2. **The next two to four months.** Shadow a senior FDE on a live, billed deployment.
3. **Then.** Lead a workstream, then a deployment.

Source: FDE School format agreed by Devoteam and OSS Ventures, July 2026.
<!-- three-step path, left to right -->

---
<!-- 36 | Detail -->
## Five things an FDE never does

1. Hide a slip from the sponsor.
2. Claim a gain finance has not signed.
3. Fork the product for one client instead of escalating the gap.
4. Collect data in a way that reads as monitoring people.
5. Leave before the new routine holds without them.

---
<!-- 37 | Divider -->
## The industrial context in five slides

---
<!-- 38 | Framework -->
## A plant makes money through throughput at its bottleneck, times margin

- Output is set by the slowest stage: the bottleneck.
- An hour lost at the bottleneck is lost for the whole plant; an hour saved anywhere else is a mirage.
- Contribution margin, not full cost, says what one more tonne is worth.

Tomorrow morning, we read a plant P&L and price these effects.
<!-- simple flow of three stages with the narrowest pipe in marker -->

---
<!-- 39 | Framework -->
## You will meet the same families of systems in every plant

| System | Holds |
|---|---|
| ERP | Orders, stock, purchasing, finance: the system of record |
| MES | What happens on the shop floor, shift by shift |
| APS | Planning and scheduling |
| WMS | The warehouse |
| PLM | Product and recipe data |
| QMS and CMMS | Quality, and maintenance |
| SCADA and historians | Machine signals |

The rule: keep the ERP as system of record; add a thin layer that reads from it and writes back. Day 3 goes deep.

---
<!-- 40 | Framework -->
## The model is rented; the ontology is yours

- The ontology is a formal model of what exists in the plant, how things relate, which rules apply and which actions are allowed.
- Most projects model the facts and skip the rules experts use to judge a good decision. The rules carry the value.
- Grounding a model in a knowledge graph roughly tripled answer accuracy in data.world's benchmark, from 16% to 54%.

Source: Sequeda, Allemang and Jacob, data.world, 2023 (arXiv 2311.07509). Day 3 goes deep.
<!-- small node-and-edge sketch: product family, machine type, changeover rule, order -->

---
<!-- 41 | Framework -->
## A gain exists only when the client's finance team signs it

- Software frees capacity; only a decision turns it into money: fill the hours, or stop the overtime.
- Agree the baseline with the controller in week one, before any code runs.
- The gain is then announced by their spreadsheet, not yours.

Tomorrow afternoon, you write a validation protocol a controller could run without you.

---
<!-- 42 | Hero -->
## You are paid for the decisions your work makes possible, not for the code.
<!-- full-bleed ink -->

---
<!-- 43 | Divider -->
## Lab: Polymex Plant Pulse

---
<!-- 44 | Detail -->
## Meet Polymex Industries, the plant you will work in all week

- Plastics compounding: 86,000 tonnes a year, €148M revenue, €9.7M EBIT.
- A mixing hall, seven extrusion lines (M01 to M07), a packing hall. Three shifts, seven days a week.
- Since January, two retail clients order small, frequent batches. On-time-in-full delivery is slipping.
- Hervé, the site director, wants to see the plant on one page by Friday.
<!-- flow diagram: mixing, then seven parallel extrusion lines, then packing -->

---
<!-- 45 | Exercise -->
## Your brief: a one-page app, deployed, with numbers another pair has checked

Build in 45 minutes, demo in 3:

1. Good output per day, and its trend.
2. Extrusion OEE for the plant and per machine: availability × performance × quality.
3. The constraint, with evidence.
4. Changeovers per week.
5. One insight Hervé does not know, as a sentence with a number.
6. Data notes: every anomaly, and what you did about it.

Repository: `polymex-plant-pulse` in the cohort's GitHub organization.

---
<!-- 46 | Framework -->
## Two pairs, one truth: Pair A builds, Pair B checks

| Pair A | Pair B |
|---|---|
| Builds the app with Claude Code from the repository | Never looks at Pair A's code |
| `CLAUDE.md` gives the context and the working rules | Computes three numbers independently: plant extrusion OEE, M07 OEE, changeovers in the week of 23 March |
| Writes `DATA_NOTES.md` | Fills in `VERIFY.md` |

Demo only when both pairs agree, or when you can explain the difference.

---
<!-- 47 | Detail -->
## Verification discipline: five habits, starting today

1. Profile the data before computing: counts, ranges, duplicates, gaps, units.
2. Check one number by hand against the raw rows.
3. Read the code that computes every number you show.
4. Hunt silent assumptions: units, shifts, planned time, averages of ratios.
5. Write down what you checked. A claim without a check is an opinion.

Speed comes from the tools. Trust comes from the method.

---
<!-- 48 | Detail -->
## Demo in three minutes: the URL, the constraint, a checked number, an insight, a question

1. The URL, live.
2. The constraint, and how you know.
3. One number you verified, and how.
4. Your insight for Hervé, in one sentence with a number.
5. The first question you would ask Hervé on Monday.

---
<!-- 49 | Detail -->
## Three things to keep from this morning

1. The model is a commodity. Deployment is the scarce skill, and it is the one you are here to learn.
2. An FDE is accountable for a measured result in production, not for a deliverable.
3. Every number you show must survive someone else's check.

---
<!-- 50 | Detail -->
## Go further, and this afternoon

**Read**
- Ajay Agrawal, Joshua Gans and Avi Goldfarb, *Power and Prediction* (2022): why AI pays only when the system around it is redesigned.
- Marco Iansiti and Karim Lakhani, *Competing in the Age of AI* (2020): the operating model of AI-first companies.
- Ethan Mollick, *Co-Intelligence* (2024): working alongside AI, day to day.
- Eliyahu Goldratt, *The Goal*: the bottleneck, told as a novel. Start it tonight for Day 2.

**This afternoon:** Consulting skills 101. Structure the problem, structure the message, navigate the organization.
