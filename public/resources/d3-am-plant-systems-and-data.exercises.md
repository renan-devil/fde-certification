# Day 3 morning: plant systems and data. Exercises

FDE School, by Devoteam and OSS Ventures. Participant handout. Polymex Industries is fictional; the landscape below is typical of a mid-size European compounding plant.

---

## The Polymex IT landscape sheet

| System | What it is at Polymex | Owner | Notes |
|---|---|---|---|
| ERP | SAP ECC 6.0, run by group IT in Lyon. Upgrade to S/4HANA planned for 2027 | Group IT; Nadia is the local key user | Orders, promise dates, routings, one standard changeover of 60 minutes per product, production confirmations, deliveries, stock |
| Shift logger | "LineLog", one industrial PC per extrusion line. Operators enter changeovers, stops and output at the end of each shift | Production (Hervé); vendor support contract | Exports one CSV per day to a shared folder. Vendor upgraded the software on 14 April |
| PLCs and HMIs | Siemens S7 controllers on each extruder; WinCC screens at the line | Maintenance and automation (Bruno, automation technician) | M06 and M07 (2023) are on the newer OT network; M01 to M05 on a flat legacy network |
| Historian | AVEVA PI, installed in 2021 for energy monitoring | Maintenance | Only M01, M02 and M05 are connected: melt temperature, screw speed, motor load, energy. 1-second data |
| Quality | Lab results (melt flow index, ash content, color) in an Access database on the lab PC | Quality manager | Linked to batch numbers, not to SAP orders |
| Maintenance | "MaintPro" CMMS, on-premises | Maintenance manager | Work orders and failure codes; operators rarely enter micro-stops |
| Planning | Corinne's Excel workbook `Plan_Extrusion_v47.xlsm`, with macros, on the shared drive | Corinne | The real schedule. Copies itself to the ERP plan every Friday; Corinne overrides it daily |
| Rules | Corinne's memory and Jean-Pierre's notebooks (four paper notebooks, 2009 to 2026) | Nobody | Changeover sequences, purge rules, which line runs what |
| Network and cloud | Firewall between the office network and OT. Microsoft 365 approved. Any other cloud service needs a group security review, six weeks | Nadia, with group security | Data must stay in the EU |
| IT team on site | Nadia and one technician | Nadia | Remembers the 2022 quality dashboard: built by an intern on a PC under a desk, dead when he left, still asked about |

---

## Exercise 1. The systems and data-flow map (35 minutes)

### Your task

1. Draw every system on the ISA-95 levels (0 to 4), with its owner.
2. Draw the flows Plant Pulse v1 and v2 need. For each flow: what data, from where, how often, in what format, who sends it.
3. Fill the source-of-truth table below.
4. Circle the three places where the data is most likely to lie, and say why.

### Template: source of truth

| Data object | Source of truth | Second source to reconcile against | Who owns it | How it can be wrong |
|---|---|---|---|---|
| Customer order and promise date | | | | |
| Next week's schedule, as it will really run | | | | |
| Output and scrap per machine and shift | | | | |
| Changeover time between two products | | | | |
| Which line can run which family | | | | |
| Why a machine stopped | | | | |

---

## Exercise 2. The access plan and the request to Nadia (35 minutes)

### Situation

You need data by Thursday. Nadia has agreed to fifteen minutes at 11:40. She has said: "I will help you. I will not help you build another orphan."

### Template: access plan

| Source | Rung this week (1 to 5) | Rung next | What result earns the next rung | By when |
|---|---|---|---|---|
| | | | | |

### Template: answers to Nadia's five conditions

| Condition | Your answer, one line |
|---|---|
| A named owner at Polymex | |
| Read-only, through the file share first | |
| No data outside the EU, approved tools only | |
| A runbook before go-live | |
| A kill switch she controls | |

### Template: the request (one page)

- What we need, and from which system:
- Why, in one sentence linked to the charter:
- For how long:
- Who owns it at Polymex after the project:
- What we will never do (write, bridge IT and OT, store keys in code, use unapproved tools):
- What Nadia gets in return:
