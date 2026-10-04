# FDE School: program guide, cohort 1

*AI 50%: drafted by Claude from the FDE School curriculum, The FDE Company teamspace and OSS field material. Renan validates before delivery.*

FDE School, by Devoteam and OSS Ventures. Five days, twenty future Forward Deployed Engineers, one plant all week, two real engagements on Friday, and the FDE Certification exam to close.

## What the week must produce

By Friday 17:30, every participant can do five things on a real site:

1. Explain what an FDE is accountable for, and why deployment, not models, is where industrial AI fails.
2. Find a problem worth solving: read a plant P&L, frame a complaint into a testable problem, size it in euros.
3. Build and ship a working AI system on messy plant data, and prove it is right.
4. Turn a result into a gain a CFO signs, and run the project that captures it.
5. Bring people along: operators, planners, IT, a sponsor whose theory is wrong.

And each participant has sat the FDE Certification exam (240 questions, 120 minutes) on fde-certification.vercel.app.

## Format

| | |
|---|---|
| Participants | 20 future FDEs, homogeneous profile, basic coding at least, own laptops with install rights |
| Trainers | Renan (Days 1, 2, 4, 5), Nicolas (Day 3) |
| Hours | 9:00 to 12:00 and 13:30 to 17:30, lunch 12:00 to 13:30 |
| Teams | Five teams of four, fixed for the week |
| AI access | Provided by the organizers on Day 1 morning |
| Assessment | None during the week. Feedback through demos and debriefs. The exam on Friday afternoon certifies knowledge. |

## The week at a glance

| Day | Morning (9:00 to 12:00) | Afternoon (13:30 to 17:30) | Polymex lab thread | Trainer |
|---|---|---|---|---|
| 1. The role | What an FDE is, setup sprint, ship something tiny | Consulting skills 101: structure the problem, structure the message, navigate the organization | Plant Pulse v0: a deployed dashboard from 90 days of shift logs | Renan |
| 2. The business | Problems worth solving: P&L, account strategy, the bottleneck, sizing in euros | Leading an FDE project: the six-phase method, scoping, governance, the gains validation protocol | Price the leaks found on Day 1; write the project charter and the validation protocol | Renan |
| 3. The technology | IT and infrastructure: plant systems, ISA-95, integration, source of truth, security | AI fundamentals and build lab: tokens to agents, retrieval, tools, evals, ontology | Plant Pulse v1: a grounded assistant that checks schedule feasibility against the changeover rules | Nicolas |
| 4. The obstacles | Technical roadblocks: dirty data, legacy, integration dead ends | Human roadblocks: change curve, champions, co-authorship, telling a sponsor he is wrong | Plant Pulse v2: an idempotent pipeline on dirty exports; role-plays with the Polymex cast | Renan |
| 5. The full motion | Two real engagements, disguised, run in parallel by teams | Debrief of what really happened, operating principles, first-deployment plan, FDE Certification exam | The toolkit built Monday to Thursday, applied to real case data | Renan |

### Friday in detail

| Time | Block |
|---|---|
| 9:00 to 12:00 | Cases in parallel: three teams take the plastics compounder, two take the sock manufacturer. Each team runs diagnostic, sizing, plan and a steering-committee readout. |
| 12:00 to 13:30 | Lunch |
| 13:30 to 14:30 | Cross-readouts, then "what really happened" for both cases, then the operating principles and each participant's 30/60/90 plan for their first deployment |
| 14:30 to 14:45 | Break, laptops charged, exam rules |
| 14:45 to 16:45 | FDE Certification exam, in the room |
| 16:45 to 17:30 | Close, feedback, certificates |

The site lists the two cases as morning and afternoon sessions. Running them in parallel gives each case a full morning and leaves room for the exam at the end, as requested.

## The Polymex thread

Polymex Industries is a fictional plastics compounding plant (€148M revenue, €9.7M EBIT, 86,000 t a year, seven extrusion lines M01 to M07, three shifts). Every lab from Monday to Thursday happens inside it, so by Friday the participants know one plant better than most of its employees do. The same cast appears all week.

| Character | Role | What they bring to the week |
|---|---|---|
| Hervé | Site director, the sponsor | Measured on OTIF and EBIT. Has told corporate the planner is overwhelmed and an APS is needed. Under quiet pressure from a consolidation rumor. |
| Corinne | Planner, 11 years | Her spreadsheet is the real schedule. The changeover and purge rules live in her head. She has heard the rumor that she may be replaced. |
| Jean-Pierre | Scheduler, retired in March | Taught Corinne the family logic. His notebooks still exist. |
| Marc | Extrusion operator on M04, 23 years | Knows every workaround, including the one that keeps M04 running on weekdays. Wary of anything that sounds like monitoring. |
| Nadia | IT manager | Scarred by an orphan application in 2022. Says yes under conditions. |
| Mireille | CFO | Arrives for the steering committee. Signs a gain only if her controller can measure it without you. |

The thread across the week:

| Day | Artifact the team owns at the end |
|---|---|
| 1 | Plant Pulse v0 deployed on Vercel; a one-page memo and storyline for Hervé; a stakeholder map |
| 2 | The three biggest leaks priced in euros; a project charter; a validation protocol a controller could run |
| 3 | A systems and data-flow map with an access plan; Plant Pulse v1 with a grounded assistant and an eval set |
| 4 | Plant Pulse v2 on an idempotent pipeline with data-quality checks; a naive-deployment failure memo; role-play debriefs |
| 5 | Case readouts and a personal 30/60/90 plan |

## Teams and roles

Five teams of four, mixed by background so every team has at least one confident coder. Roles rotate every day so everyone does each role at least once.

| Role | Owns |
|---|---|
| Lead | Scope, time, decisions, the question asked to the sponsor |
| Builder | The keyboard and Claude Code; the deployed artifact |
| Verifier | Independent checks of every number; the verification log |
| Storyteller | The memo, the storyline, the readout |

## Daily rhythm

- 9:00, ten-minute stand-up: each team says what it learned yesterday, today's goal, and one blocker.
- Teaching blocks of 25 minutes at most, each followed by hands-on work.
- Before lunch and before 17:15, short demos: three minutes per team, live, no slides unless the exercise asks for them.
- 17:15 to 17:30, close: each participant writes "one thing I would do differently on a real site" on a card.
- Trainer retro after the day, 15 minutes: what to cut, what to repeat, which team needs attention.

## House rules

- Chatham House: what is said in the room can be used, never attributed.
- Friday's cases are real engagements, disguised. If you think you recognize a company, keep it to yourself and do not add details that are not in the case pack.
- No client data in consumer AI tools, during the week or after.
- AI tools are unrestricted in labs. What is judged is whether you checked the output. AI tools are forbidden during the exam.
- Laptops closed during teaching blocks, open in labs.

## Setup (Day 1, 9:10 to 9:40, no pre-work)

Install: Node.js LTS, Git, VS Code (or another editor), Claude Code, the Vercel CLI, Python 3.11 or later with pandas.
Accounts: GitHub (personal, free) and Vercel (personal Hobby account for training projects). Claude access is provisioned by the organizers in the same window.
Organizers prepare: a GitHub organization for the cohort with the lab repositories as templates, Wi-Fi able to carry twenty simultaneous installs (bring installers on two USB keys as a fallback), power strips at every table, one helper circulating during setup.
Definition of done at 9:40: `claude` answers in each terminal, each participant has pushed one commit to GitHub and deployed a hello page to Vercel.

## Confidentiality protocol for Friday

Some participants come from the companies behind the two real cases. The case packs follow five rules: company, site, product and people names are replaced; every financial figure is scaled by a constant factor and rounded; dates are shifted; internal politics and the investor relationship are left out; gains are framed as throughput, the same team producing more, never as headcount. The facilitator never confirms or denies which company a case is drawn from. Recommended: Renan tells the participants concerned before Friday that a disguised version of an engagement they may know will be used, and asks them not to fill gaps from memory.

## Exam logistics (Friday 14:45 to 16:45)

FDE Certification track at fde-certification.vercel.app, password `fdecompany`, 240 questions in 120 minutes, pass mark 75%, closed book. Participants use their own laptops on the room Wi-Fi with chargers plugged in. If a connection drops, the participant reopens the page in the same browser and continues; the timer keeps running on the server. A participant who does not pass can retake after 24 hours. The trainer reads the rules aloud at 14:40 and stays in the room.

## Facilitation principles

- Answer first, every time the trainer speaks: the point, then the support.
- Timebox without mercy; announce the remaining time at half-time and at five minutes.
- Debrief every exercise with three questions: what did you see, so what, now what.
- Make it real: one field story per teaching block, with the lesson stated.
- Cold-call kindly, by name, with an easy way out.
- Praise specific behavior ("you asked for the artifact"), never people in general.

## Reading list for the week

| Theme | Books |
|---|---|
| The role and AI adoption | Ajay Agrawal, Joshua Gans and Avi Goldfarb, *Power and Prediction* (2022); Marco Iansiti and Karim Lakhani, *Competing in the Age of AI* (2020); Ethan Mollick, *Co-Intelligence* (2024) |
| Problem solving and communication | Barbara Minto, *The Pyramid Principle*; Charles Conn and Robert McLean, *Bulletproof Problem Solving* (2018); Gene Zelazny, *Say It with Charts*; Ethan Rasiel, *The McKinsey Way* (1999) |
| Operations | Eliyahu Goldratt, *The Goal*; Wallace Hopp and Mark Spearman, *Factory Physics*; Jeffrey Liker, *The Toyota Way* |
| Data and systems | Martin Kleppmann, *Designing Data-Intensive Applications*; Dean Allemang, James Hendler and Fabien Gandon, *Semantic Web for the Working Ontologist* |
| Building with AI | Chip Huyen, *AI Engineering* (2025) |
| People and change | Chip and Dan Heath, *Switch* (2010); Kerry Patterson and others, *Crucial Conversations*; Roger Fisher and William Ury, *Getting to Yes*; Gene Kim and others, *The Phoenix Project* |

## Materials index

| Session | Deck | Facilitator guide | Lab or exercises | Status |
|---|---|---|---|---|
| Program guide | | this file | | Ready |
| Day 1 AM, What an FDE is | `d1-am-what-an-fde-is.deck.md` | `d1-am-what-an-fde-is.facilitator.md` | `fde-school-day1-kit.zip` (repo + answer key) | Ready |
| Day 1 PM, Consulting skills 101 | `d1-pm-consulting-skills.deck.md` | `d1-pm-consulting-skills.facilitator.md` | `d1-pm-consulting-skills.exercises.md` | Ready |
| Day 2 AM and PM | | | | Next batch |
| Day 3 AM and PM (Nicolas) | | | | Next batch |
| Day 4 AM and PM | | | | Next batch |
| Day 5 cases and close | | | | Next batch |

## Conventions for Claude Design

Deck files: slides are separated by a line containing three dashes. Each slide starts with a comment giving its number and type (Title, Hero, Divider, Data, Framework, Detail, Exercise). Text inside comments is design direction, never slide text. Titles are full-sentence conclusions; read in sequence, they tell the session's story. Every slide with data carries a source line. Visual identity matches the certification site: ink #141313, paper #FFFFFF, steel #5B6470, gauge #E2E5E9, marker #FFD028 for highlights, Archivo with condensed bold titles, both logos on an ink band on title slides.
