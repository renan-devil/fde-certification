<!-- DECK: FDE School, Day 1 afternoon, "Consulting skills 101". 50 slides, 13:30 to 17:30. Trainer: Renan. -->
<!-- Conventions for Claude Design: slides are separated by a line of three dashes. The first comment of each slide gives its number and type. Text inside comments is design direction, never slide text. Identity: FDE School, by Devoteam and OSS Ventures; ink #141313, paper #FFFFFF, steel #5B6470, gauge #E2E5E9, marker #FFD028; Archivo, condensed bold titles. -->

<!-- 1 | Title -->
# FDE School
## Day 1 afternoon: think like a partner, speak like one

Consulting skills 101: structure the problem, structure the message, navigate the organization

FDE School, by Devoteam and OSS Ventures
Renan Devillières

*AI 50%: drafted with Claude from the FDE School curriculum, validated by the trainer.*
<!-- ink band with both logos -->

---
<!-- 2 | Detail -->
## This afternoon: three skills, three exercises, all on Polymex

| Time | Block | Exercise |
|---|---|---|
| 13:30 | Why an engineer needs consulting skills | |
| 13:40 | Structure the problem | |
| 14:05 | | 1. From Hervé's complaint to a problem worth testing |
| 15:00 | Break | |
| 15:15 | Structure the message | |
| 15:40 | | 2. Answer first: a memo and a six-slide storyline for Hervé |
| 16:35 | Navigate the organization | |
| 16:55 | | 3. Map the plant, pre-wire Friday, brief Hervé live |
| 17:15 | Close | |

---
<!-- 3 | Detail -->
## By 17:30 you will frame, write and pitch like a consultant, on your own plant

- Turn a vague complaint into a testable problem with a quantified gap and a hypothesis tree that carries its own tests.
- Write an answer-first memo and a storyline whose titles alone tell the story.
- Map who matters on a site, what each person fears, and how to walk into a steering committee with no surprises.
- You will have done all three on Polymex, with this morning's numbers.

---
<!-- 4 | Hero -->
## An FDE is judged on decisions other people take.
<!-- full-bleed ink; one line underneath in steel: "The code is necessary. It is never sufficient." -->

---
<!-- 5 | Divider -->
## Part 1. Structure the problem

---
<!-- 6 | Framework -->
## A complaint is not a problem: climb five rungs before you touch a tool

1. **Complaint.** What they said. "The planning is always wrong."
2. **Observable symptom.** What you could film. The schedule is rewritten daily; expedites jump the queue.
3. **Quantified gap.** Metric, current, target, trend. Plan adherence 54% a week, against 85% needed.
4. **Candidate causes.** The hypothesis tree.
5. **Problem statement and kill test.** One falsifiable sentence, and the evidence that would prove it solved.
<!-- a ladder drawn bottom to top, rung 1 at the bottom; the jump from rung 1 straight to "buy a tool" crossed out in fail red -->

---
<!-- 7 | Detail -->
## Most failed deployments jumped from the complaint straight to a tool

| What the client says | What was bought | What the problem was |
|---|---|---|
| "The planning is always wrong" | An APS | Changeover times in the ERP were fiction |
| "We can never find material" | RFID | Put-away discipline at receiving |
| "Maintenance takes forever" | A new CMMS | Technicians waiting for spare parts |

Every row skipped rungs 2 and 3. Never skip them.
<!-- three rows; the middle column in steel and struck through lightly -->

---
<!-- 8 | Framework -->
## Before structuring anything, ask the question behind the question

- **Who hurts?** Whose KPI, whose bonus, whose credibility is at stake?
- **Why now?** What triggered the request this month? There is always a trigger: an incident, a corporate review, a rumor.
- **What does solved look like to the sponsor, in their own words?**

The same words mean a different problem three weeks before a corporate review than in a quiet quarter.

---
<!-- 9 | Framework -->
## MECE: no overlaps, no gaps, at every level of the tree

- **Mutually exclusive.** A fact belongs to one branch only.
- **Collectively exhaustive.** Together, the branches cover every possible cause.
- **The test.** Can you put each cause in exactly one box? Is there a cause that fits nowhere?

Three branches beat seven. Depth beats width.
<!-- two small diagrams side by side: overlapping circles (not ME) and a puzzle with a missing piece (not CE), then a clean three-way split -->

---
<!-- 10 | Framework -->
## Use an issue tree to explore, a hypothesis tree to decide

| | Issue tree | Hypothesis tree |
|---|---|---|
| Starts from | A question: "Why is OTIF falling?" | A bet: "OTIF falls because changeovers ate extrusion capacity" |
| Good for | The first day, when you know little | From day two, once you have a view |
| Risk | Boiling the ocean | Confirmation bias |
| Antidote | Prioritize branches by value | Write the test that could kill each branch |

On site, start with an issue tree for an hour, then switch to hypotheses.

---
<!-- 11 | Detail -->
## A useful hypothesis is falsifiable and comes with its test

| Weak | Strong |
|---|---|
| "Planning could be improved" | "The ERP's flat 30-minute changeover time makes the official schedule infeasible" |
| Test: none | Test: compare logged changeover minutes by product pair with the ERP standard, 4 weeks of shift logs, half a day, owner: FDE |

If no observation could prove it wrong, it is not a hypothesis. It is a slogan.

---
<!-- 12 | Framework -->
## Treat the tree as a betting slip: priors on every branch, tests that move them

- Mark a prior on each branch: high, medium, low.
- Give each leaf a test: the data or observation, its cost, its owner, its date.
- Run the cheapest tests that move the biggest priors first.
- Rule of thumb: two days of tests should kill half the tree.
<!-- a small tree with H, M, L tags on branches, and a cost/owner tag on each leaf -->

---
<!-- 13 | Detail -->
## When the sponsor arrives with a culprit, put it in the tree as one testable branch

- The sponsor names a villain: a team, a machine, a person.
- Do not accept it, do not dismiss it. Write it in, visibly and respectfully, as one branch among three.
- Give it the same treatment as the others: a prior and a test.
- If the data clears the culprit, you will need that test to move the sponsor without humiliating him. Day 4 shows how.

---
<!-- 14 | Framework -->
## The TIP one-pager is the contract of the first two weeks

| Section | Content |
|---|---|
| Problem statement | One falsifiable sentence |
| Baseline and gap | Metric, current, target, trend, and where the number comes from |
| Hypothesis tree | Three branches, priors on each |
| Tests | What, cost, owner, date, for each leaf |
| Decision point | When we choose, and on what evidence |

You will write dozens of these. You write your first one in twenty minutes.
<!-- the five sections as a one-page form layout -->

---
<!-- 15 | Detail -->
## Four anti-patterns to name out loud when you see them

1. **The embedded solution.** "We need a dashboard" is not a problem. Ask which decision the dashboard would change.
2. **The tyranny of averages.** Lead time is "fine on average". Variance kills service, not the mean. Ask for the distribution.
3. **Survivor data.** Analyzing shipped orders to explain lateness ignores the cancelled ones.
4. **The anchored culprit.** The sponsor's villain, accepted without a test.

---
<!-- 16 | Data -->
## This morning you already found the facts a strong tree needs

- Extrusion is the constraint: every other stage waits for it.
- Changeovers rose from 49 to 71 a week between January and March.
- M07 loses output to stops nobody logs; M04 drifts at weekends.

Facts are not yet a problem. The next exercise turns them into one.
Source: Polymex shift logs, January to March, your Plant Pulse analysis.

---
<!-- 17 | Exercise -->
## Exercise 1: Hervé's email, from complaint to a problem worth testing

> "Our on-time delivery has gone from 91% to 84% since September and corporate wants 95%. The problem is planning. Corinne is overwhelmed: the schedule is rewritten every day and the Friday plan is dead by Monday morning. I have told our COO we need a serious APS and probably a stronger planner."
> Hervé, site director

Full email and context sheet: exercises file, Exercise 1.

---
<!-- 18 | Exercise -->
## Forty-five minutes, one TIP one-pager per team

1. Climb the five rungs, from Hervé's complaint to a problem statement with a kill test.
2. Answer the question behind the question: who hurts, why now, what solved means to Hervé.
3. Build a three-branch MECE hypothesis tree with priors. Hervé's culprit appears as one testable branch.
4. Give each leaf a test with its cost and owner.
5. Choose the first test you run on Monday, and say why.

At 14:50, two teams present their tree in two minutes each.

---
<!-- 19 | Detail -->
## What the strongest trees had in common

- The gap was a number with a source, not an adjective.
- The branches split the cause space cleanly: what is ordered, what can be produced, how it is planned.
- Hervé's culprit was there, as a branch with a cheap test, neither accepted nor dismissed.
- The first test was chosen for value and speed, not because it was easy.
- Someone wrote "why now?" and planned to ask it.
<!-- fill live during the debrief if the room produces better points -->

---
<!-- 20 | Divider -->
## Part 2. Structure the message

---
<!-- 21 | Hero -->
## Executives triage in seconds. Put the answer first.
<!-- full-bleed ink -->

---
<!-- 22 | Framework -->
## The pyramid: one governing thought, three supporting arguments, then the evidence

- **Governing thought.** The answer and its so-what, in one sentence.
- **Supporting arguments.** Three, MECE, each answering "why?" or "how?" about the level above.
- **Evidence.** Data, analysis, observations under each argument.

Write top-down. The reader can stop at any level and still have the message.
Source: Barbara Minto, The Pyramid Principle.
<!-- classic pyramid diagram: one box, three boxes, nine small boxes -->

---
<!-- 23 | Framework -->
## Situation, complication, resolution: the pyramid told as a story

| | One line each | Example |
|---|---|---|
| Situation | What the audience already knows and agrees with | "Ferralux is sold out, and changeovers take 18% of machine hours." |
| Complication | What changed, the tension | "A six-week pilot cut changeover time by 35% on three machines." |
| Resolution | Your answer and what you need | "Rolled out, that frees about 3,300 hours a year, roughly €300K of net contribution. We propose to validate it with your controller." |

Then stop talking.

---
<!-- 24 | Framework -->
## Vertical logic answers "why?", horizontal logic keeps siblings clean

- **Vertically**, each box answers the question the box above raises in the reader's mind.
- **Horizontally**, siblings are MECE and of the same kind: three reasons, or three steps, never a mix.
- A reader who asks "so what?" of your top line, or "why?" of a box without an answer below, has found a hole.

---
<!-- 25 | Detail -->
## A title states the conclusion; a topic title makes the reader do your work

| Topic title | Action title |
|---|---|
| "OEE analysis" | "Extrusion OEE is 59%, and changeovers explain most of the drop since January" |
| "Machine performance" | "M07 runs 10 points slower than the fleet, with no downtime logged to explain it" |
| "Next steps" | "Two weeks of measurement will tell Hervé which fix to fund" |

Read only your titles, in order. If they do not tell the story, rewrite them before touching a chart.

---
<!-- 26 | Framework -->
## Write the ghost deck first: titles, in order, before any chart exists

1. Write the governing thought.
2. Write five to eight action titles that prove it, in order.
3. Read them aloud as a paragraph. Fix the logic here, where it is cheap.
4. Only then, sketch one exhibit per slide that proves its title.

A ghost deck takes twenty minutes and saves two days of polishing the wrong story.
<!-- a row of empty slide frames with only titles written in them -->

---
<!-- 27 | Detail -->
## One message per slide, absorbable in sixty seconds

- Two points means two slides. No exceptions.
- If a slide needs more than a minute to understand, split it or move it to the appendix.
- The title says the message; the body proves it; nothing else earns space.

---
<!-- 28 | Framework -->
## Five slide types, and a deck that alternates them

| Type | Purpose | Looks like |
|---|---|---|
| Hero | Anchor one big idea | One sentence, nothing else |
| Data | Prove a claim | One chart or table, an action title, a source line |
| Framework | Structure complexity | A 2x2, a tree, a process |
| Detail | Give depth | Structured text, a comparison table |
| Divider | Reset attention | A section title |

Two consecutive slides of the same type is a warning. Five is a lecture.

---
<!-- 29 | Detail -->
## Numbers discipline: every figure carries a source, a unit and its assumptions

- A source line on every slide with data: organization, document, date.
- Units and periods on every number: tonnes a day, euros a year, percent of planned time.
- Assumptions in a visible table, with a low and a high case.
- Triangulate critical numbers: two independent methods within 20 to 30% of each other, or you have found an error.

---
<!-- 30 | Framework -->
## Choose the chart from the comparison you want to show

| You want to show | Use |
|---|---|
| Parts of a whole | A bar split into parts (avoid pies beyond three slices) |
| A ranking of items | Horizontal bars, sorted |
| Change over time | A line or vertical bars |
| A distribution | A histogram |
| A relationship between two variables | A scatter plot |

Start from the message, then pick the chart. Remove everything that does not serve it.
Source: Gene Zelazny, Say It with Charts.

---
<!-- 31 | Detail -->
## Memos: prose, short sentences, numbers, no filler

- Write in paragraphs, not bullet lists. Bullets hide missing logic.
- Vary the rhythm: a six-word claim, a thirty-word explanation, a ten-word implication.
- Keep only the adjectives that carry information.
- Ban the filler words: leverage, holistic, robust, streamline, unlock, game-changer.
- Be confident and honest: "We recommend X." "We do not know Y yet; here is how we find out."

---
<!-- 32 | Detail -->
## The 30-second version is the test of whether you know what you think

> "Extrusion is our constraint, and it now loses 10% of its time to changeovers driven by the retail orders, against 7.5% in January. That cost about 270 tonnes in March. Give us two weeks to measure real changeover times and test smarter sequencing on two lines. Then you choose the fix with numbers corporate cannot argue with."

Situation, complication, resolution, ask. Thirty seconds.

---
<!-- 33 | Exercise -->
## Exercise 2: turn this morning's facts into a memo and a storyline for Hervé

Use the fact base in the exercises file, Exercise 2 (it matches this morning's lab).

1. Write the governing thought: one sentence, the answer and its so-what.
2. Write a memo to Hervé: situation, complication, resolution, 250 words at most, prose.
3. Write a six-slide ghost deck: action titles only, plus one line naming the evidence for each.
4. Rehearse the 30-second version.

---
<!-- 34 | Exercise -->
## Forty-five minutes; your Storyteller holds the pen

- First ten minutes: governing thought and titles, as a team.
- Next twenty-five: the Storyteller writes the memo; the others draft the evidence lines and check every number against the fact base.
- Last ten: rehearse the 30-second version twice, timed.

At 16:25, three teams read their governing thought aloud. The room picks the one Hervé would act on.

---
<!-- 35 | Detail -->
## What made a governing thought land

- It answered Hervé's real question, not the one in the email.
- It held a number and a mechanism, not an adjective.
- It respected his theory while moving him: options, not verdicts.
- It ended on a decision he could take this week.

---
<!-- 36 | Divider -->
## Part 3. Navigate the organization

---
<!-- 37 | Framework -->
## Every deployment crosses five kinds of stakeholders

| Kind | At Polymex | What you need from them |
|---|---|---|
| Sponsor | Hervé, site director | Mandate, cover, decisions |
| Champion | Not yet named | Daily ownership after you leave |
| Experts and operators | Corinne, Marc | The real rules, and their trust |
| Gatekeepers | Nadia in IT, Mireille in finance | Access, and the signature on the number |
| Skeptics | Whoever loses status if the tool works | Neutrality, at least |

A deployment fails when one row is missing, usually the champion.

---
<!-- 38 | Framework -->
## Map influence against stance, then spend your time where it moves the outcome

| | Opposed or wary | Neutral | Supportive |
|---|---|---|---|
| High influence | Convert first, one to one | Pre-wire before every meeting | Use, and protect their credibility |
| Low influence | Listen; they often hold the facts | Inform | Recruit as allies on the floor |

Influence is formal and informal. On a shop floor, the senior operator can sink a tool the director bought.
<!-- 2x3 grid; place generic dots, not names, the team places names in the exercise -->

---
<!-- 39 | Detail -->
## Behind every stance there is a fear you can address

| Person | Usually fears | What helps |
|---|---|---|
| Operator | Being monitored, being replaced | Respect for their craft; no names on any chart; usefulness to them within weeks |
| Planner | Blame for every late order | Taking a task off their plate; no-blame framing; co-authorship |
| Site director | Looking bad upward | Answer first, options not problems, no surprises |
| IT manager | Being blamed for an orphan application | Named fields, access in steps, an exit plan |
| Finance | A number they cannot defend | A baseline they build, a protocol they run |

---
<!-- 40 | Framework -->
## Pre-wire: nobody should hear anything important for the first time in a meeting

- Before a steering committee, meet each key person one to one.
- Show them what concerns them, ask what they would change, adjust.
- In the room, the decision is a formality; the real work happened before.
- The order matters: experts before their bosses, gatekeepers before the request, the sponsor last, alone.

---
<!-- 41 | Framework -->
## The meeting system: before, during and after

| Before | During | After, within 24 hours |
|---|---|---|
| Know the decision you want, the audience, the governing message, the time | Open with the purpose and the decision required | Decisions taken or deferred, in writing |
| Pre-wire the key people | Executive summary in three minutes | Actions with owners and dates |
| Send a pre-read 24 to 48 hours ahead | One minute per slide; never read slides aloud | The material you promised |

---
<!-- 42 | Detail -->
## See the plant through the director's and the CFO's eyes

- **The site director** is measured on two lines: on-time-in-full delivery and EBIT. Anything that does not land on one of them is noise to him.
- **The CFO** asks three questions: is the baseline valid, is the cost to achieve honest, who owns the number?
- Translate every finding into one of those lines before you show it.

---
<!-- 43 | Detail -->
## Bring options, not problems, when the news is bad

- Lead with what you found, then what it means for their line.
- Offer two or three options with their cost and their risk, and say which one you recommend.
- Ask for one decision.
- Never let the sponsor discover bad news in front of their own boss.

---
<!-- 44 | Detail -->
## Move the sponsor without making him lose face

- Frame his theory as the reasonable reading of incomplete data, because it usually was.
- Invite him to co-own the test: "pick the twenty orders yourself."
- Show the observation before the conclusion, and let him draw it.
- You will practice this for real on Day 4, when the data turns against Hervé's theory.

---
<!-- 45 | Exercise -->
## Exercise 3: map Polymex, pre-wire Friday, brief Hervé live

1. Place the Polymex cast on the influence and stance map (cast sheet in the exercises file).
2. Write the pre-wiring plan for Friday's steering: who you see, in which order, what you need from each, what you offer each.
3. Prepare a two-minute, answer-first briefing of your Exercise 2 recommendation for Hervé.

Ten minutes of preparation. Then two teams brief Hervé live.

---
<!-- 46 | Exercise -->
## The trainer plays Hervé, and Hervé has little patience

- Hervé interrupts any preamble longer than thirty seconds: "What do you need from me?"
- He warms to answer-first speech, numbers and options.
- He goes cold at anything that sounds like "we are here to prove you wrong".
- Four minutes per team, then the room says what moved him and what lost him.

---
<!-- 47 | Detail -->
## What moved Hervé, and what lost him

- Moved: the answer in the first sentence; a number tied to OTIF or EBIT; a test he could co-own; a decision he could take this week.
- Lost: background before the point; jargon; a verdict on his planner; no ask.
<!-- complete live with the room's observations -->

---
<!-- 48 | Detail -->
## Five habits to practice from tomorrow morning

1. Write the gap as a number with its source before anything else.
2. Put a prior and a test on every branch, including the sponsor's culprit.
3. Write titles before charts, and read them in order.
4. Pre-wire every meeting that matters.
5. Say the answer in the first sentence.

---
<!-- 49 | Detail -->
## Go further

- Barbara Minto, *The Pyramid Principle*: the reference on structured writing.
- Charles Conn and Robert McLean, *Bulletproof Problem Solving* (2018): issue trees and hypothesis-driven work, step by step.
- Gene Zelazny, *Say It with Charts*: choosing and drawing exhibits.
- Ethan Rasiel, *The McKinsey Way* (1999): the habits behind the method.
- Roger Fisher and William Ury, *Getting to Yes*: interests behind positions, for every negotiation with a stakeholder.

---
<!-- 50 | Detail -->
## Tomorrow: the business

- **Morning.** Problems worth solving: read the Polymex P&L in 20 minutes, find the bottleneck's value, size three leaks in euros.
- **Afternoon.** Leading an FDE project: the six-phase method, scoping, governance, and a validation protocol a controller could run without you.

Before you leave: write on a card one thing you would do differently on a real site after today.
