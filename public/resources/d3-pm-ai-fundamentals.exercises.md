# Day 3 afternoon: AI fundamentals and the build lab. Exercises

FDE School, by Devoteam and OSS Ventures. Participant handout. The full lab kit is in `D3 PM - Lab kit - Plant Pulse v1.zip` (repository `polymex-plant-pulse-v1`).

---

## The lab in one page

**Situation.** Monday 4 May 2026. Corinne has exported the week 19 plan: 65 orders on seven lines, built with the ERP's 60-minute changeover for every product. The real rules are in `knowledge/` (Corinne's interview, Jean-Pierre's notebooks) and in `data/changeover_matrix.csv`.

**Build, in this order.**

1. `rules/rules.yaml`: one id, one source and an empty `validated_by` per rule.
2. A deterministic checker over `data/schedule_week19.csv`, with one unit test per rule and per exception.
3. A capacity check: each line's week with real changeover times, against 168 hours.
4. A grounded assistant that answers only through tools, cites rule and order ids, and says "not in the data" when it must.
5. `npm run eval` over `evals/eval_set.jsonl`, plus five questions of your own.

**Done means.** Every violation found and nothing allowed flagged; pass rate at least 85% with failures listed; no key in the repository; deployed and pushed.

---

## Worksheet 1. The rules, found by the Verifier without the code (20 minutes)

| Id | Rule, in your words | Conditions (color, day, shift, machine) | Source (file, line) | Conflicts with |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |
| | | | | |

Your three questions for Corinne (the trainer), in order of value:

1.
2.
3.

---

## Worksheet 2. Five eval questions of your own

Write at least one of each type. The expected answer must be checkable without opinion.

| Type | Question | Expected answer | How you grade it (exact id, number, or refusal) |
|---|---|---|---|
| Lookup | | | |
| Feasibility | | | |
| Computation | | | |
| Refusal | | | |
| Attack (instruction inside data) | | | |

---

## Worksheet 3. The paragraph for Hervé

Answer first: does week 19 hold? Then the violations that matter, in euros or tonnes if you can, and the two changes you recommend Corinne makes before Friday.
