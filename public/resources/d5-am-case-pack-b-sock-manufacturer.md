# Day 5 morning: case pack B. The sock manufacturer

FDE School, by Devoteam and OSS Ventures. Participant handout for teams 4 and 5. **This case is drawn from a real engagement and disguised.** Names, sites and people are invented; financial figures are scaled by a constant factor and rounded; dates are shifted. If you think you recognize the company, keep it to yourself and do not add anything that is not in this pack.

---

## The situation

**Velora Hosiery** knits socks for a large European sports retailer and a few other brands: more than 8 million pairs a year, on about 1,600 circular knitting machines in two units. After knitting, socks go through toe closing, washing, boarding (shaping on forms), pairing, final inspection and packing.

Quality is a serious effort: about 200 full-time equivalents work on control, there are checkpoints at every stage, routines and KPIs. And yet the defect rate has not moved in years.

**The sponsor**, Mehmet Arslan, operations director, puts it this way:

> "We inspect everything, and we still throw away millions. My quality director wants a sensor on every machine. My production manager wants to stop depending on people who are not there. Tell me where to start and what it is worth. Steering committee at 11:30."

## What the team collected during the visit (data annex)

### Units

| | Unit 1 | Unit 2 |
|---|---|---|
| Products | Complex socks, many models, frequent changeovers | Large orders, simpler models |
| Machines | Older, single feeder | Newer, double feeder |
| OEE | About 85% | About 95% |
| Quality controls | The same protocol in both units | |

### Quality

| Item | Value | Source |
|---|---|---|
| Defect rate | 6 to 8% of production | Quality module, historical |
| Where defects are caught | About 40% at knitting, about 60% at boarding or final inspection | Quality director |
| Production cost already spent when caught | 50 to 60% at knitting; 100% at boarding or final inspection | Cost accounting estimate |
| Estimated cost of scrap | €4.7M to €6.0M a year | Defect rate × volume × loaded unit cost |
| Inspection effort | About 200 FTE; about €2.0M to €2.6M a year | HR and controlling |
| Sampling at knitting | 1 controller per 96 to 110 machines, 3 shifts; 2 socks per machine per shift, about 3% of output | Visit |
| Root cause analysis | Takes weeks; quality, machine, yarn and maintenance data are in separate places | Quality engineers |
| Yarn | 25% of defects found at knitting are attributed to yarn dyeing. Supplier certificates (tensile strength, twist, moisture) are on paper | Lab |
| New yarns | Not machine-tested before production | Lab |
| Needle-break sensors | Fail to trigger about 10% of the time | Maintenance |
| History | A sensor project five years ago was stopped: too many false alarms | Quality director |

### Data and systems

| Item | What exists |
|---|---|
| ERP | Production orders, models, machine ids, QR traceability of bundles |
| Defect logging | Operators enter defects on a terminal, recently with photos; aggregated by machine and model in the quality module |
| Machine data | PLCs on the knitting machines; no connection yet; the machine maker is working on an in-machine sensor, not available this year |
| Settings that work | In the heads of senior operators |

### People

| Person | Role | What they said |
|---|---|---|
| Mehmet Arslan | Operations director, sponsor | "Tell me where to start." |
| Selin Kaya | Quality director | "If the machine can detect it, the machine should stop before the defect is finished." Worried about false positives and cost. Offers a defect dataset. |
| Arjun Mehta | Production manager | "About 80 people are absent every day, more at harvest time. When a controller is missing, the machine runs unchecked. I want resilience." |
| The retailer's quality team | Main customer | Wants a design this quarter, a pilot next quarter, results by year end |

---

## Your task (9:15 to 11:15)

1. **Diagnostic.** What is the real problem: the defect rate, or something else? Write the problem statement and a hypothesis tree.
2. **Sizing.** Size the levers with an assumptions table, low and high cases, and the weighted-cost logic of detection. Frame every gain as throughput, cost of quality or resilience: the same team producing more good socks, never fewer people.
3. **Pilot design.** Where would you pilot (unit, perimeter), what data first, what sensors later, and the go or no-go test on setup cost.
4. **Ninety-day plan.** Phases, gates, kill criteria, roles, the first thing you do on Monday.
5. **Readout.** Prepare a ten-minute steering committee readout: five slides at most, answer first.

Use any tool you built this week. AI tools are allowed; every number must be checked by your Verifier.

## Steering committee (11:30)

Ten minutes per team, then five minutes of questions from the trainer playing Mehmet, Selin and Arjun.
