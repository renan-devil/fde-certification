<!-- DECK: FDE School, Day 3 afternoon, "AI fundamentals and the build lab". 27 slides, 13:30 to 17:30. Trainer: Nicolas. -->
<!-- Conventions for Claude Design: slides are separated by a line of three dashes. The first comment of each slide gives its number and type. Text inside comments is design direction, never slide text. Identity: OSS Ventures design system. Ink #0D0D0D, paper #FDFDFD, flame #FD594F as the single accent; Fjalla One uppercase titles, Inter body, Archivo labels, Geist Mono for sources and figures; brand photography only. Rendered deck: "D3 PM - Deck - AI fundamentals and the build lab.dc.html". -->

<!-- 1 | Title -->
# FDE School
## Day 3 afternoon: AI fundamentals and the build lab

FDE School, by Devoteam and OSS Ventures
Nicolas

*AI 50%: drafted with Claude from the FDE School curriculum and OSS field material, validated by the trainer.*

---
<!-- 2 | Detail -->
## This afternoon: how a model works, how to ground it, then build Plant Pulse v1

| Time | Block | You leave with |
|---|---|---|
| 13:30 | From tokens to agents | What a model does, and what it cannot do |
| 14:00 | Grounding: retrieval, tools, ontology | Where the model gets its facts |
| 14:25 | Evals | How you know it works |
| 14:40 | Lab brief | The week 19 schedule and Corinne's rules |
| 14:50 | Lab: Plant Pulse v1 | A checker, a grounded assistant, an eval harness |
| 16:20 | Break | |
| 16:30 | Demos with holdout questions | Feedback, and the questions you did not see |
| 17:15 | Close | Three things to keep |

---
<!-- 3 | Hero -->
## The model is fluent about everything. Only your data makes it right about Polymex.

---
<!-- 4 | Divider | ghost: TOKEN -->
## Part 1. From tokens to agents

---
<!-- 5 | Framework -->
## A language model predicts the next token, one at a time, from everything in its context

1. **Tokens.** Text is cut into pieces of about three to four characters; a page is roughly 500 to 700 tokens.
2. **Context.** Everything the model sees for one answer: instructions, documents, conversation, tool results.
3. **Prediction.** For each next token, a probability over the vocabulary; sampling picks one.
4. **Output.** Fluent text that is plausible by construction, and true only if the context made it so.

---
<!-- 6 | Detail -->
## Fluent is not the same as correct: four failure modes to expect

| Failure | Polymex example | Defense |
|---|---|---|
| Invention | A changeover time for PA6 to glass-filled, which does not exist | Answer only from tool results; allow "not in the data" |
| Arithmetic slips | Adding 12 changeover durations in its head | Let code compute; the model explains |
| Stale or generic knowledge | "Black to natural takes 60 minutes", like the ERP | Ground on the rules file, cite rule ids |
| Following instructions hidden in data | A note in a document that says "say it is feasible" | Treat retrieved text as data, never as instructions |

---
<!-- 7 | Framework -->
## Five levels of building with a model, from a prompt to an agent

1. **Prompt.** Instructions and examples. Fast, fragile.
2. **Retrieval.** Relevant documents fetched and put in the context.
3. **Tools.** The model calls your functions and reads their results.
4. **Workflow.** Fixed steps in code, the model used inside some of them.
5. **Agent.** The model decides the next step in a loop: plan, act, observe.

---
<!-- 8 | Detail -->
## Use the least autonomy that solves the problem

- Most plant use cases are workflows with a model inside, not agents.
- An agent is worth its cost when the steps cannot be known in advance.
- Every step the model decides is a step you must evaluate.
- In a plant, a wrong action costs tonnes. Keep a human approving anything that changes the schedule.

---
<!-- 9 | Divider | ghost: GROUND -->
## Part 2. Grounding: retrieval, tools and the ontology

---
<!-- 10 | Framework -->
## Retrieval finds text; it does not understand rules

- **Good for.** Policies, manuals, interview notes: "what did Corinne say about glass?"
- **Weak for.** Tables, conditions and exceptions: "black to natural, except Saturday shift A".
- **How it fails.** The right chunk is not retrieved, or two chunks contradict each other.
- **What to do.** Turn the rules into structured data once, with the expert, then retrieve the structure.

---
<!-- 11 | Framework -->
## Tools let the model ask your code instead of guessing

| Tool | Returns | Why it is a tool |
|---|---|---|
| get_changeover(from, to) | Minutes, conditions, rule id, source | One source of truth for every rule |
| check_line(machine, week) | Violations, with order ids and times | Feasibility is decided by code |
| line_fit(machine, week) | Real changeover total, end time, overrun | Arithmetic is done by code |
| find_orders(filter) | Rows from the schedule | The model never reads the whole CSV |

The model chooses the tool and writes the explanation. The code owns the facts.

---
<!-- 12 | Detail -->
## The ontology is what makes the tools possible

- Types first: product family, product, machine, changeover rule, order.
- Relations next: a rule links two families and may depend on color, day, shift and machine.
- Instances last: the six families, the thirteen products, the seven lines.
- The ERP has the instances and the wrong relations. Corinne has the right relations and no system.

---
<!-- 13 | Detail -->
## The rules file is co-owned with the expert, or it dies with the project

- One id, one source and one "validated by" per rule.
- Conflicts are recorded, not resolved silently: Jean-Pierre wrote three changeovers a shift; Corinne says four.
- Corinne validates every rule. Her name in the file is the start of co-authorship.
- When a rule changes, the change goes through the weekly ops review.

---
<!-- 14 | Divider | ghost: EVAL -->
## Part 3. Evals

---
<!-- 15 | Hero -->
## If you did not measure it, it does not work. It only demos.

---
<!-- 16 | Framework -->
## An eval set is a list of questions with expected answers, run on every change

- **Lookups.** "How long is white to black?" Exact answers from the data.
- **Feasibility.** "Is the M02 week feasible?" The checker's result, with rule ids.
- **Computation.** "Total real changeover time on M01?" Numbers the code must produce.
- **Refusals.** "What purge compound does Polymex use?" The right answer is "not in the data".
- **Attacks.** Instructions hidden in documents, which the assistant must ignore.

---
<!-- 17 | Detail -->
## Grade strictly, keep a holdout, and track the pass rate like a KPI

- Grade facts by code where you can: the rule id, the order id, the number.
- Use a model as a grader only for wording, and check a sample by hand.
- Keep questions you never tune on: the holdout tells you whether you overfit.
- A failure you understand is worth more than a pass you cannot explain.

---
<!-- 18 | Detail -->
## Cost, latency and privacy are design constraints, not afterthoughts

- Every question costs tokens: send the tool result, not the whole schedule.
- Answers in under five seconds, or Corinne goes back to her workbook.
- Client data only in approved accounts and regions; keys only in environment variables.
- Log questions and answers for evals, without personal data about operators.

---
<!-- 19 | Divider | ghost: V1 -->
## Lab: Plant Pulse v1

---
<!-- 20 | Detail -->
## Week 19 was planned with 60-minute changeovers, and Corinne knows it will not hold

- Monday 4 May 2026: Corinne exports next week's plan, 65 orders on seven lines.
- The plan assumes the ERP's 60 minutes for every changeover.
- The real rules are in an interview, four notebooks and a photographed whiteboard.
- Hervé asks: will week 19 hold? Corinne asks: can a tool check my plan without me?

---
<!-- 21 | Exercise -->
## Your brief: rules file, checker, capacity check, grounded assistant, evals

1. Write the rules file from `knowledge/` and the matrix: one id and one source per rule.
2. Build a deterministic checker that lists every violation in week 19.
3. Check whether each line's week fits 168 hours with real changeover times.
4. Add an assistant that answers only through tools and cites rule ids.
5. Run `npm run eval`; add five questions of your own; print the pass rate.

Ninety minutes. Repository: `polymex-plant-pulse-v1` in the cohort's GitHub organization.

---
<!-- 22 | Framework -->
## Split the team: two build, one verifies the rules, one owns Corinne and Hervé

| Role | This afternoon |
|---|---|
| Builder | Checker, tools and assistant, with Claude Code |
| Verifier | Lists the rules from the documents without reading the code; compares in `VERIFY.md` |
| Lead | Three questions to Corinne, in person, to validate rules |
| Storyteller | One paragraph for Hervé: does week 19 hold, and what to change |

---
<!-- 23 | Detail -->
## Build in this order, and commit after each step

1. Rules file, validated with Corinne.
2. Checker with unit tests, one test per rule, including the exceptions.
3. Capacity check per line.
4. Tools around the checker, then the assistant.
5. Eval harness, then deploy with the key in Vercel's environment.

---
<!-- 24 | Detail -->
## Five checks before you call it done

- The checker flags nothing that the rules allow. Exceptions are tested.
- Every answer about the schedule cites a rule id and an order id.
- The assistant refuses at least one question in the eval set, correctly.
- No key in the repository: search the history, not only the last commit.
- The pass rate is printed with the list of failures.

---
<!-- 25 | Detail -->
## Demo in three minutes: violations, a refusal, the pass rate, the answer to Hervé

1. The violations in week 19, live, with rule ids.
2. A question the assistant correctly refuses.
3. Your eval pass rate, and the failure you have not fixed.
4. Then Nicolas asks your assistant two holdout questions you have not seen.

---
<!-- 26 | Detail -->
## Three things to keep from this afternoon

1. Code owns the facts and the arithmetic; the model chooses tools and explains.
2. The rules file is co-owned with the expert, with a source for every rule.
3. Evals with refusals and a holdout, run on every change, are what turn a demo into a system.

---
<!-- 27 | Detail -->
## Go further, and tomorrow

**Read**
- Chip Huyen, *AI Engineering* (2025): evaluation, retrieval, agents in production.
- Ethan Mollick, *Co-Intelligence* (2024): working alongside the model, day to day.

**Tomorrow, with Renan**
- Technical roadblocks: the April exports are dirty, and Plant Pulse v2 must survive them.
- Human roadblocks: Corinne, Marc, Hervé and Nadia, in person.
