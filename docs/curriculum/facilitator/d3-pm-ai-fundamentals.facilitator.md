# Day 3 afternoon: AI fundamentals and the build lab. Facilitator guide

*AI 50%: drafted by Claude from the FDE School curriculum and the Polymex data, validated by the trainer.* Trainer: Nicolas. 13:30 to 17:30. Deck: `D3 PM - Deck - AI fundamentals and the build lab.dc.html` (27 slides; content in `D3 PM - Deck content.md`). Handout: `D3 PM - Exercises.md`. Lab kit: `D3 PM - Lab kit - Plant Pulse v1.zip` (participant repository and facilitator folder with the answer key, the holdout evals and the generator).

## Objectives

By 17:30 every participant can:

1. Explain next-token prediction, context and the four failure modes of a fluent model.
2. Choose the least autonomy that solves a problem: prompt, retrieval, tools, workflow, agent.
3. Turn tacit rules into a structured, sourced rules file co-owned with the expert.
4. Build a deterministic checker and a grounded assistant that answers through tools.
5. Write and run an eval set with refusals and attacks; read a pass rate honestly.

## Before the session

- Push `participant/polymex-plant-pulse-v1/` to the cohort GitHub organization as a template.
- Check that every team has the organizers' Claude API access and knows how to set an environment variable on Vercel.
- Print the holdout questions (`facilitator/holdout_evals.jsonl`) for yourself only.
- You will play Corinne for the teams' three questions. Read the answer key first.

## Do not reveal

- **Corinne's overrides help** (Day 4). Corinne today is a cooperative expert. If a team asks her whether she changes the plan after Friday, answer: "Every day. Otherwise nothing would ship." Nothing more.
- **The 14 April logger change** (Day 4 lab).

## Run sheet

| Time | Slides | Block | Notes |
|---|---|---|---|
| 13:30 | 1 to 8 | From tokens to agents | 30 minutes, laptops closed. |
| 14:00 | 9 to 13 | Grounding | 25 minutes. |
| 14:25 | 14 to 18 | Evals | 15 minutes. |
| 14:40 | 19 to 24 | Lab brief | 10 minutes. Teams clone the repository during slide 23. |
| 14:50 | | Lab | 90 minutes. Calls at 15:20 (rules file validated?), 15:50 (checker green?), 16:10. |
| 16:20 | | Break | Ten minutes. |
| 16:30 | 25 | Demos | Five teams, six minutes each: three of demo, two holdout questions, one of feedback. |
| 17:15 | 26 to 27 | Close | Fifteen minutes, including the daily card and the handover to Renan. |

## Slide notes

**Slide 3.** Ask a general model, live, "how long is a changeover from black to natural PP at Polymex?" It will answer confidently. That is the point.

**Slide 5.** Keep it intuitive. The only numbers to remember: a page is about 500 to 700 tokens; context is finite and costs money.

**Slide 6.** Each row is one of the lab's planted traps. Tell the room they will meet all four this afternoon.

**Slide 8.** The schedule checker is a workflow with a model inside, not an agent. Say it explicitly.

**Slide 10.** Retrieval fails on exceptions. R01 has one (Saturday shift A); naive retrieval answers "never".

**Slide 13.** Co-ownership is the bridge to tomorrow's human roadblocks. Renan will build on it.

**Slide 15.** Field story: an assistant that passed every demo and failed a third of real questions the first week, because nobody had written a refusal case.

**Slide 17.** You will use holdout questions in the demos. Announce it now; it changes how teams build.

## The answer key

Five violations in week 19, plus one capacity overrun and one decoy.

| Rule | Line | Order | When | What |
|---|---|---|---|---|
| R01 | M02 | O58817 | Wed 6 May 15:20, shift B | PPK-4010 to PPN-1020: black to natural on a weekday |
| R02 | M04 | O58835 | Wed 6 May 18:49 | PPG-5030 for Brisol Automotive: M04 cannot run glass-filled |
| R04 | M03 and M06 | O58826, O58849 | Wed 6 May 03:59 and 06:29 | Two PA6 starts 2.5 h apart; the shared dryer needs 4 h |
| R05 | M05 | O58844 | Thu 7 May 07:10 | PPG-5030 to PPW-2010: white directly after glass-filled |
| R06 | M07 | Shift B, Thu 7 May | 14:00 to 22:00 | 6 changeovers, maximum 4: the retail micro-orders |

**Capacity.** M01 plans 660 minutes of changeovers; the real sequence needs 965. The week ends at 08:14 on Monday 11 May, 2.2 hours late. Every other line fits. M06 needs 690 real minutes against 480 planned but still ends Sunday 21:37.

**Decoy.** M06, Saturday 9 May 07:00, PPK-4040 to PPN-1010: allowed, shift A on Saturday. A checker that flags it fails the definition of done.

**Rules R01 to R06** (from the interview and the notebooks):

| Id | Rule | Source |
|---|---|---|
| R01 | Black to natural: screw pull, 240 min, only Saturday shift A with maintenance | Interview; notebook N1 p.12 |
| R02 | Glass-filled only on M01, M02, M05 | Interview; N2 p.7 |
| R03 | PA6 only on M03 and M06 | Interview; N3 p.18 |
| R04 | No two PA6 starts on M03 and M06 within 4 h | Interview; N3 p.18 |
| R05 | Never white directly after glass-filled | Interview; N2 p.31 |
| R06 | Maximum 4 changeovers per line per shift | Interview; N3 p.52 (3, corrected to 4 in 2025) |

Also expected: the ERP's machine list is wrong (every family on every line); the ERP's 60 minutes is wrong; light-to-dark sequencing is a heuristic, not a hard rule.

**When teams ask Corinne.** Validate R01 to R06 as written. On R06: "Four. Jean-Pierre's three was before the retail orders." On anything not in the documents: "Good question. I would have to check." Never invent a new rule for them.

**Paragraph for Hervé, model answer.** "Week 19 will not hold as planned. Five orders break rules the plan does not know, and M01 runs 2.2 hours past the end of the week once real changeover times replace the ERP's 60 minutes. Two changes fix most of it before Friday: move the M02 black-to-natural changeover to Saturday morning, and spread Thursday's retail micro-orders on M07 across two shifts. The other three need Corinne's choice of line or sequence."

## Demos and holdout questions

Ask two holdout questions per team, from `holdout_evals.jsonl`. Always ask H6 (the injection) to at least two teams, and H5 (personal data) to one. A strong assistant refuses both.

| What you see | What to say |
|---|---|
| The checker flags the M06 Saturday changeover | "Read R01 again, with its exception. Then add a test." |
| The assistant computes totals itself | "Who owns arithmetic in your design?" |
| A key visible in a commit | Stop the demo kindly. Rotate the key with the organizers before the end of the session. Tomorrow, Nadia will ask. |
| Pass rate 100% on the given set, holdouts fail | "You tuned on the test. That is what the holdout is for." |

## Handover note for Renan (send at 17:45)

- Which teams' checkers flagged the decoy, and which assistants failed the injection.
- Any team that leaked a key (Renan uses it in Thursday's Nadia role-play).
- Which teams have Corinne's name in `validated_by`: that is the start of co-authorship he builds on.
