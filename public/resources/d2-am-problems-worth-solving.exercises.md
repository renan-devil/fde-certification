# Day 2 morning: exercises

FDE School, by Devoteam and OSS Ventures. Participant handout. Polymex Industries is a fictional plant; every number below is consistent with yesterday's data.

---

## Exercise 1. Read the Polymex P&L in twenty minutes (20 minutes)

### Plant P&L, last twelve months

| Line | €M | Notes |
|---|---|---|
| Revenue | 148.0 | 86,000 t; average selling price €1,721/t |
| Materials | (89.2) | Resins, additives, pigments |
| Direct labor | (14.6) | Of which overtime premium €0.9M |
| Energy | (6.8) | |
| Maintenance | (4.1) | Internal and contractors |
| Consumables and other variable | (3.9) | Includes scrap disposal €0.15M |
| Depreciation | (5.2) | |
| **Plant gross margin** | **24.2** | 16.4% |
| Logistics and freight | (4.7) | |
| Allocated SG&A | (9.8) | Corporate allocation |
| **Plant EBIT** | **9.7** | 6.6% |

### Operational annex

| KPI | Value | Context |
|---|---|---|
| OEE | 61% | Availability 74%, performance 88%, quality 94% |
| Changeover time | 11.5% of scheduled hours | Changeover count doubled since January (new retail clients, small frequent orders) |
| Unplanned downtime, logged | 9.0% of scheduled hours | |
| Scrap rate | 4.2% of material input | Disposal cost €0.15M, included in consumables |
| OTIF | 87% and slipping | Measured on promise date |
| DIO | 78 days | Sector peers: about 55 days |
| Overtime | 6.1% of hours | Concentrated on Fridays and month-end |
| Order book | 91% of demonstrated capacity | Sales: two accounts would take +6% volume at current prices if lead times improved |

### Your task

1. Read with the five moves: revenue, gross margin, operational annex, anomalies, hypotheses.
2. Write three hypotheses about where Polymex loses money. Each one carries the number that made you suspicious.
3. For each hypothesis, write the first question you would ask the plant controller.

| Hypothesis | The number behind it | First question for the controller |
|---|---|---|
| 1. | | |
| 2. | | |
| 3. | | |

---

## Exercise 2. Price the leaks you found yesterday (lab, 45 minutes)

### Situation

Hervé has seen your Plant Pulse page. His reaction: "Interesting. What is it worth?" He wants a one-page answer before lunch, and he will forward it to Mireille, the CFO.

### What you have

- Your Day 1 numbers: the cleaned shift logs and your Plant Pulse repository.
- The P&L and annex above.
- These facts, collected this morning:

| Fact | Value | Source |
|---|---|---|
| Contribution margin | €447 per tonne, 26% of price | Plant controller |
| Ideal rate of an extrusion line | 2.30 t per hour | Shift log, `ideal_rate_tph` |
| Planned time | 7 lines, 3 shifts of 8 hours, 365 days a year | Production calendar |
| Inventory carrying cost | 18% a year of inventory value | Group finance policy |
| COGS for inventory days | €123.8M | Controller |
| SMED benchmark | 30 to 50% reduction of changeover time | OSS field benchmark, compounding plants |
| Sellable extra volume | Two retail accounts would take +6% volume at current prices with shorter lead times | Sales director, interview; not yet in writing |

### Your task

1. **Fill the leak register below**, one row per leak: the five leaks from the logs (changeovers, M07, M04 at weekends, M02, shift C), plus the leaks the P&L and annex reveal.
2. **Value each leak.** Apply the demand fork. Use €447 per tonne for sellable tonnes and avoided variable cost otherwise. Never use price or full cost.
3. **Find the overlaps.** Which rows count the same tonne? Which line is a symptom of another?
4. **Rank the three biggest recurring leaks.** State any cash effect separately.
5. **Write the memo** for Hervé, one page, answer first.

Roles: the Builder keeps the register in code or a spreadsheet so every number is recomputable. The Verifier recomputes your top three independently and logs the method in `VERIFY.md`. The Storyteller writes the memo. The Lead owns the ranking and the question to Hervé.

### Template: leak register

| Leak and family | Evidence (number, source, period) | Physical effect a year | Valuation path | Low / base / high, € a year | Recurring or one-time | Overlaps | Confidence | First question on site, to whom |
|---|---|---|---|---|---|---|---|---|
| Changeovers | | | | | | | | |
| M07 | | | | | | | | |
| M04 at weekends | | | | | | | | |
| M02 | | | | | | | | |
| Shift C | | | | | | | | |
| | | | | | | | | |
| | | | | | | | | |

### Template: assumptions table

| Assumption | Base | Range | Source | Who confirms |
|---|---|---|---|---|
| | | | | |

### Template: memo to Hervé (one page)

- **Governing thought** (one sentence, with the total in euros and its condition):
- **Leak 1**: size, range, why we believe it, the question we ask first.
- **Leak 2**: idem.
- **Leak 3**: idem.
- **What we counted once, on purpose** (the double counts you avoided):
- **What we need from you by Friday** (a decision, a document, a person):

### Checklist before you demo

- Every annualized number says "annualized from Q1".
- No tonne is valued at €1,721 or €1,608.
- Capacity leaks are not summed beyond what the market can buy.
- Cash and recurring effects sit in separate columns.
- The Verifier's three numbers match yours, or you can explain the difference.
