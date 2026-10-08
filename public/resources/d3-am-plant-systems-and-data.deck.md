<!-- DECK: FDE School, Day 3 morning, "Plant systems and data". 26 slides, 9:00 to 12:00. Trainer: Nicolas. -->
<!-- Conventions for Claude Design: slides are separated by a line of three dashes. The first comment of each slide gives its number and type. Text inside comments is design direction, never slide text. Identity: OSS Ventures design system. Ink #0D0D0D, paper #FDFDFD, flame #FD594F as the single accent; Fjalla One uppercase titles, Inter body, Archivo labels, Geist Mono for sources and figures; brand photography only. Rendered deck: "D3 AM - Deck - Plant systems and data.dc.html". -->

<!-- 1 | Title -->
# FDE School
## Day 3 morning: plant systems and data

FDE School, by Devoteam and OSS Ventures
Nicolas

*AI 50%: drafted with Claude from the FDE School curriculum and OSS field material, validated by the trainer.*

---
<!-- 2 | Hero -->
## The data you need is in five systems, two spreadsheets and one head.

---
<!-- 3 | Detail -->
## This morning: map the plant's systems, then earn the access to them

| Time | Block | You leave with |
|---|---|---|
| 9:00 | Stand-up | Yesterday's charter, one line per team |
| 9:10 | The systems of a plant | ISA-95 levels, the families of systems |
| 9:40 | Source of truth | Which system wins, object by object |
| 10:00 | Exercise 1 | The Polymex systems and data-flow map |
| 10:35 | Break | |
| 10:45 | Integration and security | Patterns, the IT/OT boundary, secrets |
| 11:05 | Exercise 2 | The access plan and the request to Nadia |
| 11:40 | Demos | Feedback from the room |
| 11:55 | Close | Three things to keep |

---
<!-- 4 | Detail -->
## By noon you will know where every number lives, and how to get it without breaking anything

- You can place any plant system on the ISA-95 levels and say what data it holds.
- You can name the source of truth for each data object your system needs.
- You can choose an integration pattern for each source, starting with the least invasive.
- Your team has a systems map of Polymex and an access request Nadia can say yes to.

---
<!-- 5 | Divider | ghost: L0-L4 -->
## Part 1. The systems of a plant

---
<!-- 6 | Framework -->
## ISA-95 stacks a plant in five levels, from the sensor to the ERP

| Level | What lives there |
|---|---|
| 4. Business planning | ERP: orders, routings, standard costs, deliveries, inventory value |
| 3. Manufacturing operations | MES, quality, maintenance, scheduling: what was made, when, how well |
| 2. Supervision | SCADA and HMI: the operator's screens, alarms, setpoints |
| 1. Control | PLCs: the logic that runs the machine, millisecond by millisecond |
| 0. Process | Sensors and actuators: temperatures, pressures, speeds |

The higher the level, the slower and more aggregated the data. Your gains are computed at level 4; your truth often lives at level 1.

---
<!-- 7 | Framework -->
## You will meet the same ten families of systems in every plant

| System | Holds | Typical question |
|---|---|---|
| ERP | Orders, master data, costs, stock | What did we promise, and at what standard? |
| MES or shift logger | Production events, output, scrap, stops | What really happened on the line? |
| SCADA and historian | Time series from the PLCs | What did the machine do, second by second? |
| LIMS or quality system | Lab results, deviations | Was it good? |
| CMMS | Work orders, failures, spare parts | Why did it stop? |
| WMS | Locations, picks, shipments | Where is it? |
| APS or planning tool | The schedule | What runs next? |
| Spreadsheets | Everything the systems do not do | What do people actually use? |

---
<!-- 8 | Detail -->
## Data comes in four kinds, and each fails in its own way

| Kind | Example | How it fails |
|---|---|---|
| Master data | Product routings, standard changeover times | Out of date: one value for every product |
| Transactions | Orders, confirmations, deliveries | Booked late, corrected, booked twice |
| Time series | Melt temperature, screw speed | Gaps, drift, tags renamed, clocks off |
| Tacit knowledge | Corinne's changeover rules | In no system at all |

---
<!-- 9 | Data -->
## About 40% of the data an industrial agent needs is in no system at all

- Sequencing rules, workarounds, which customer tolerates what: in heads and spreadsheets.
- An FDE plans for it: interviews, notebooks, shadowing, then a rules file the expert co-owns.
- If your architecture has no place for tacit knowledge, it will fail in production.

Source: OSS field estimate across deployments, cited on Day 1 (slide 19).
<!-- single large "40%" left -->

---
<!-- 10 | Framework -->
## The official process and the real process diverge, and the data follows the real one

- **The ERP says.** One standard changeover of 60 minutes for every product; the Friday plan is final.
- **The floor does.** Changeovers from 25 minutes to four hours depending on the sequence; the plan is rewritten daily.
- **The data shows.** Shift logs that disagree with ERP confirmations; a planning spreadsheet that is the real schedule.
- **The FDE asks.** Which one does finance use, and which one do operators trust?

---
<!-- 11 | Divider | ghost: TRUTH -->
## Part 2. Source of truth

---
<!-- 12 | Framework -->
## Name one source of truth per data object, or two systems will argue in front of the CFO

| Object | Source of truth | Why |
|---|---|---|
| Customer order and promise date | ERP | Contractual; finance reconciles on it |
| Executed schedule | Planner's spreadsheet | The ERP plan is dead by Monday |
| Output and scrap per shift | Shift logger, reconciled to ERP monthly | Closest to the event |
| Changeover rules | The rules file, co-owned by the planner | Nowhere else, until you write it |
| Machine states | PLC and historian | The only unbiased witness |

---
<!-- 13 | Detail -->
## The ontology is the map of types the plant reasons with; the data is its instances

| Type | Instances at Polymex | Relations |
|---|---|---|
| Product family | PP natural, PP black, PP glass-filled, PA6 | A family has changeover rules to every other family |
| Product | PPK-1040, PPG-3020 | Belongs to one family |
| Machine | M01 to M07 | Can or cannot run a family |
| Changeover rule | Black to natural: screw pull, 240 min, Saturdays only | Links two families, may depend on the day |
| Order | Order 58812, 18 t of PPG-3020 | Needs a product, a machine, a date |

---
<!-- 14 | Detail -->
## The ontology predicts where a deployment will fail

- A type missing from the model becomes a rule nobody can enforce: "never black to natural on a weekday".
- An instance that exists only in a head becomes a single point of failure: Jean-Pierre retired in March.
- A relation the ERP gets wrong becomes a bad plan: one changeover time for every product.
- Draw the types first, then fill the instances. The gaps you find are your interview guide.

---
<!-- 15 | Exercise -->
## Exercise 1: map the systems and the data flows of Polymex

1. Read the Polymex IT landscape sheet in the handout.
2. Draw every system on the ISA-95 levels, with its owner.
3. Draw the flows Plant Pulse needs: what, from where, how often, in what format.
4. Fill the source-of-truth table for the six data objects in the handout.
5. Circle the three places where the data is most likely to lie, and say why.

Thirty-five minutes. One map per team, photographed and pushed to the repository.

---
<!-- 16 | Divider | ghost: API -->
## Part 3. Integration and security

---
<!-- 17 | Framework -->
## Five integration patterns, from the least to the most invasive

1. **Manual export.** Someone sends a file. Day one, always.
2. **Scheduled file drop.** The system writes a file to a folder every night.
3. **Read-only access.** A database view, a replica or a read API, in a DMZ.
4. **Event stream.** OPC UA or MQTT from the line, near real time.
5. **Write-back.** Your system changes the client's system, with a human approving.

---
<!-- 18 | Detail -->
## Climb the access ladder one rung at a time, and earn each rung with a result

| Rung | You ask for | You have earned it when |
|---|---|---|
| 1 | Exports by hand, today | You signed the confidentiality terms |
| 2 | A nightly file drop | Your first numbers matched the controller's |
| 3 | Read-only access to a view | IT has seen your security notes and your runbook |
| 4 | A stream from the lines | The tool is used every day by named users |
| 5 | Write-back, with approval | The steering committee decided it |

---
<!-- 19 | Framework -->
## The IT/OT boundary exists for safety: never be the one who bridges it

- **Zones and conduits.** IEC 62443 splits the plant into zones; data crosses only through defined conduits.
- **Read from the DMZ.** Data leaves the OT network through a historian or a broker in a demilitarized zone, never from a PLC directly.
- **No write to level 1 or 2.** Your software never changes a setpoint.
- **Ask the OT owner.** Often maintenance or automation, not IT.

---
<!-- 20 | Detail -->
## Secrets, accounts and data: four rules that keep you employed

- Keys live in the platform's secret store, never in the repository, never in a chat.
- Use a named service account with read-only rights, one per integration.
- Client data stays in the tools the client approved; no consumer AI tools, ever.
- Personal data about operators triggers labor law: in France, the works council must be consulted before monitoring tools.

---
<!-- 21 | Detail -->
## IT says no to orphans, not to you: show who will own the system after you leave

- A named owner on the client side, from day one.
- A runbook: how it runs, how it fails, how to restart it.
- Single sign-on, logs, a kill switch IT controls.
- A handover date written in the charter.

---
<!-- 22 | Detail -->
## Nadia was burned in 2022, and her conditions are reasonable

| Nadia's condition | What it protects against |
|---|---|
| A named owner at Polymex | The 2022 quality dashboard that died when the intern left |
| Read-only, through the file share first | A tool that writes into SAP by accident |
| No data outside the EU, approved tools only | The group security review she cannot skip |
| A runbook before go-live | Being called at 3 a.m. for something nobody documented |
| A kill switch she controls | Having to ask you to stop your own system |

---
<!-- 23 | Exercise -->
## Exercise 2: write the access plan and the one-page request to Nadia

1. For each source on your map, choose the rung you ask for this week and the next one.
2. Say what result earns the next rung, and by when.
3. Answer each of Nadia's five conditions in one line.
4. Write the request: what, why, how long, who owns it, what you will never do.

Thirty-five minutes. At 11:40, Nicolas plays Nadia for two teams.

---
<!-- 24 | Detail -->
## What Nadia will ask, in this order

1. Who at Polymex owns this when you are gone?
2. Which data leaves the plant, and where does it go?
3. Who has the keys, and how do I take them back?
4. What happens when it breaks at night?
5. Why should I trust you more than the last one?

---
<!-- 25 | Detail -->
## Three things to keep from this morning

1. Place every system on the ISA-95 levels; the truth often lives lower than the gain.
2. One source of truth per data object, written down and agreed.
3. Climb the access ladder one rung at a time, and earn each rung with a result.

---
<!-- 26 | Detail -->
## Go further, and this afternoon

**Read**
- Martin Kleppmann, *Designing Data-Intensive Applications*: sources of truth, replication, idempotence.
- Dean Allemang, James Hendler and Fabien Gandon, *Semantic Web for the Working Ontologist*: types and instances.

**This afternoon**
- AI fundamentals, then the Plant Pulse v1 build: a grounded assistant that checks next week's schedule against Corinne's rules.
