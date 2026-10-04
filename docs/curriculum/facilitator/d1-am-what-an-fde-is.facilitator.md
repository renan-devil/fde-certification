# Day 1 morning: the job AI created. Facilitator guide

*AI 50%: drafted by Claude, validated by the trainer.* Trainer: Renan. 9:00 to 12:00. Deck: `d1-am-what-an-fde-is.deck.md` (50 slides). Lab kit: `fde-school-day1-kit.zip`.

## Objectives

By 12:00 every participant can:

1. Define the FDE role in two sentences and distinguish it from consultant, solutions engineer and staffing.
2. Explain with three figures why deployment, not the model, is where industrial AI fails.
3. Describe the FDE loop.
4. Build, verify and deploy a small app on plant data, with a working setup for the rest of the week.

## Before the day (organizers and trainer)

| When | What | Who |
|---|---|---|
| D-3 | Create the cohort GitHub organization, import `polymex-plant-pulse` from the kit as a template repository | Organizer |
| D-3 | Create the cohort channel (Slack or Teams) and post the site URL and password | Organizer |
| D-2 | Test the room Wi-Fi with twenty devices downloading at once; prepare two USB keys with the Node.js, Git, VS Code and Python installers for macOS and Windows | Organizer |
| D-1 | Prepare Claude access for twenty people, ready to hand out at 9:10 | Organizer |
| D-1 | Run the lab yourself end to end with Claude Code (about 30 minutes) so you know where teams will get stuck | Trainer |
| D-1 | Print the team list: five teams of four, at least one confident coder per team | Trainer |
| Day 1, 8:30 | Power strips at every table, projector tested, deck on slide 1, timer visible | Organizer |

## Run sheet

| Time | Slides | Block | Notes |
|---|---|---|---|
| 9:00 | 1 to 8 | Opening | Ten minutes. Teams sit together. Roles chosen by 9:10. |
| 9:10 | 9 to 12 | Setup sprint | Thirty minutes, hands-on. Trainer and helper circulate. |
| 9:40 | 13 to 25 | Why the FDE exists | 25 minutes. Laptops closed. |
| 10:05 | 26 to 36 | What an FDE is, and is not | 20 minutes. |
| 10:25 | 37 to 42 | The industrial context | 10 minutes, fast: everything here returns later in the week. |
| 10:35 | | Break | Ten minutes. Builders stay to clone the repo if not done. |
| 10:45 | 43 to 48 | Lab brief | Ten minutes. |
| 10:55 | | Build | 45 minutes. Announce 20 and 5 minutes left. |
| 11:40 | | Demos | Five teams × three minutes, strictly timed. |
| 11:55 | 49 to 50 | Close | Five minutes. |

If setup runs late, take the time from slides 37 to 42 (they are previews), never from the build.

## Slide notes

### Opening (slides 1 to 8)

**Slide 2.** Read the sentence, pause, then say why it is the thesis of the week: the same models are available to everyone for a few euros; what nobody can buy is the person who makes them work inside a plant. That person is what the participants are becoming.

**Slide 3.** Point at the last column: every block ends with something they keep. Promise that by noon every team has a live URL.

**Slide 6.** Insist on "AI-native": they will not be judged on typing code, they will be judged on the spec they give the tool and on whether they checked its output. This is how the job is done in 2026.

**Slide 7.** Spend real time on rule 2. Some participants may recognize Friday's companies. Say plainly: if you think you recognize a company, you keep it to yourself, and you do not fill gaps with what you know. The cases are disguised to protect the clients, and that protection depends on the room.

**Slide 8.** Teams choose roles now, in two minutes. The Builder of each team should be the person most at ease in a terminal today; tomorrow it rotates.

### Setup sprint (slides 9 to 12)

Hand out Claude access at 9:10 sharp. Display slide 11 for the whole sprint. Walk the room clockwise; the helper walks counter-clockwise. Ask every person who finishes early to help their neighbor before doing anything else.

Common problems and fixes:

| Symptom | Fix |
|---|---|
| `claude: command not found` after install | Open a new terminal; the installer updates the path for new sessions only |
| Corporate proxy blocks downloads | Set `HTTPS_PROXY` and `HTTP_PROXY` to the proxy address, or switch to the guest Wi-Fi |
| Windows, PowerShell installer blocked by policy | Use the WinGet command (`winget install Anthropic.ClaudeCode`) or install inside WSL |
| No Node.js | Install the LTS version from nodejs.org or from the USB key |
| `git push` asks for a password | Use `gh auth login` (GitHub CLI) or a personal access token |
| Vercel login loops | Use `vercel login` with the email method |
| Laptop cannot install anything | Open the repository in GitHub Codespaces (browser) and install Claude Code with the native installer inside it |
| No Python | Pair B can use a spreadsheet for the lab |

At 9:40 ask for hands: who has all four items of slide 12? Anyone without them sits next to a finished teammate for the lab; the helper keeps fixing in the background.

### Why the FDE exists (slides 13 to 25)

The story of this section: the models got cheap and good, yet companies see little in the P&L; the gap is the last mile; the last mile is a job; the market is now hiring for it.

**Slide 14.** Ask the room before revealing the bars: "What share of companies attribute 5% or more of EBIT to AI?" Collect three guesses, then reveal 6%. The contrast between 80% and 6% is the whole morning in one chart.

**Slide 15.** Be honest about the definition: the MIT study counts a pilot as failed if it shows no measurable benefit within six months, which is harsh. The direction holds; the exact number should be quoted with its definition, on site as here.

**Slide 16.** The "so what" line is the point. If the room pushes back ("but models differ"), agree that they differ at the frontier, and ask whether a plant scheduling problem is limited by the model or by knowing the purge rules. Let them answer.

**Slide 18.** Field story: tell one deployment where the model worked and the project still stalled, because a rule nobody had written down made the tool's plans infeasible and operators stopped trusting it. Keep client names out, here and all week.

**Slide 19.** This is the single most important number of the morning for future FDEs: it defines their job. Ask: "If 40% of what the system needs is in heads, what does the first month of a deployment look like?" The answer you want: interviews, artifacts, sitting with people.

**Slide 20.** Walk the four boxes with one example each. Ask a participant where a planner's schedule sits (bottom right) and where meeting-notes summarization sits (top left).

**Slide 22.** Note for delivery: the 800% figure comes from Indeed data reported by the Financial Times in 2025. Quote it with its source.

**Slide 23.** Keep it short; history matters only to show the role is proven, not a fashion.

**Slide 25.** Close the section on this line: "In every rollout that worked, someone played the FDE role. In the ones that stalled, nobody did." Pause.

### What an FDE is (slides 26 to 36)

**Slide 27.** Read the definition slowly and underline three words aloud: embeds, operate, accountable.

**Slide 28.** Ask the room which column they have worked in before. Most will say consultant or developer. Tell them what changes: the consultant stops at the recommendation and the developer at the ticket; the FDE stops when the gain is in the client's numbers.

**Slide 29.** Map each capability to the day that trains it, so the week makes sense.

**Slide 31.** Make it concrete: the planner correcting two rules on Wednesday is not a failure, it is the job working.

**Slide 32.** Draw the loop on the whiteboard as you speak; it returns on Day 2.

**Slides 33 and 34.** These are OSS's own lessons, including failures; say so. Credibility comes from admitting the 30%.

**Slide 35.** Adjust to the actual post-school plan for this cohort before delivery.

**Slide 36.** Ask participants which of the five they find hardest. Usually "hide a slip"; it returns on Day 2 with the no-surprises rule.

### The industrial context (slides 37 to 42)

Five previews, two minutes each. Say explicitly that every one of them comes back in depth later in the week, so nobody takes notes yet.

**Slide 42.** Read it, then move straight to the lab.

### Lab brief (slides 43 to 48)

**Slide 44.** Introduce Polymex as a real place: "You will live here until Thursday." Name Hervé, and say they will meet the rest of the cast through the week.

**Slide 46.** The two-pair design is the lesson. Pair B must not look at Pair A's code. If a team has only three people present, the Verifier works alone.

**Slide 47.** Ask each team's Verifier to read habit 5 aloud. Then start the clock.

## Running the lab

Timeline: 10:55 start; 11:15 call "20 minutes"; 11:35 call "5 minutes, push and deploy now"; 11:40 demos.

Circulate in this order: first check every team has started (repo cloned, Claude Code running), then every five minutes ask a Verifier "what have you checked so far?"

### Hint ladder for stuck teams (give one hint at a time)

1. "Have you asked Claude Code to profile the data before computing anything? Look at rule 1 in `CLAUDE.md`."
2. "Plot output per shift over the 90 days. Is anything physically impossible?"
3. "Your OEE is above 100%. Which rows drive output?"
4. "Count the rows per date and shift. Are they all the same?"

### Answer key (facilitator only)

All values on the cleaned data: kg rows divided by 1,000, duplicate rows removed, the missing shift left missing, the planned shutdown kept with zero planned time. Full detail in `facilitator/answer_key_day1.json`.

| Metric | Value |
|---|---|
| Plant extrusion OEE, January to March | 59.5% (availability 73.4%, performance 86.3%, quality 93.9%) |
| Good output | 20,579 t over 90 days, 228.7 t a day; January 233.6 t a day, March 223.9 t a day |
| Changeovers per week | 49 in the week of 5 January, 71 in the week of 23 March |
| Changeover share of planned time | 7.5% in January, 10.3% in March |
| Good tonnes lost in March to the extra changeovers, at January's rate | about 272 t |
| M07 OEE | 54.4% (performance 77.6% against about 88% for the rest of the fleet, logged downtime normal) |
| M07 output lost against fleet performance | about 376 t, 1.6 days of plant output |
| M02 OEE | 54.7% (logged downtime 16.1% of planned time against 7.7% for the others) |
| M04 performance, weekdays against weekends | 89.9% against 75.2%; scrap 6.0% against 9.6% |
| Performance by shift | A 87.6%, B 87.5%, C 83.9% |
| Constraint | Extrusion. Waiting time per day: extrusion 34 unit-minutes starved and 25 blocked; mixing 1,169 blocked; packing 1,658 starved. |

Pair B's three numbers: plant OEE 59.5%; M07 OEE 54.4%; 71 changeovers in the week of 23 to 29 March.

### The four traps, and how to spot a team that fell in

| Trap | What it is | The tell |
|---|---|---|
| Units | M06, shift B, 22 to 24 January: output and scrap logged in kilograms | Total output around 54,000 t instead of 21,900 t; plant OEE around 147%; a spike in late January |
| Duplicates | 11 March, shift A, all seven machines appear twice | A spike on 11 March; slightly inflated March figures |
| Missing shift | 17 February, shift C, absent for all machines (logger outage) | A dip on 17 February; averages "per shift" quietly wrong |
| Planned shutdown | M03 on 1 March, planned_min = 0 on three shifts | Division by zero, "NaN" or "Infinity" in a per-row OEE |

A team that averages per-row OEE ratios instead of summing minutes and tonnes gets a slightly different number; that is the classic "average of ratios" error from habit 4 on slide 47.

### Acceptable insights for Hervé (any one, with its number)

- M07 lost about 376 tonnes in the quarter, 1.6 days of plant output, to stops nobody logs: its logged downtime is normal but its performance is 10 points below the fleet. (Sets up Day 4: data archaeology.)
- M04 runs nearly 15 points slower and scraps half again as much at weekends. Something about the weekend crew differs. (Sets up Day 4: the operator's workaround.)
- Changeovers rose from 49 to 71 a week as retail orders grew; in March they cost about 272 good tonnes against January's rate. (Sets up Day 2 and Day 3.)
- M02 loses twice the downtime of any other line.
- The night shift runs about 4 points slower than the day shifts.

The strongest demos tie the insight to a decision Hervé could take.

## Demos and debrief

Three minutes per team, timer visible, then one minute of feedback from you. Feedback follows the same pattern every time: one thing that would convince Hervé, one thing he would challenge.

After the five demos, three debrief questions, two minutes each:

1. "Which anomalies did Claude Code find on its own, and which did a human catch?" Land the point: the tool profiles fast when asked; the human decides what is plausible in a plant.
2. "Where did Pair B disagree with Pair A, and who was right?" Celebrate every disagreement that was found and resolved.
3. "Which insight would make Hervé do something on Monday?" Land the point: an insight is worth something only if it changes a decision.

## Facts to check before delivery

| Slide | Claim | Source to confirm |
|---|---|---|
| 14 | 80% / 37% / 6%, 1,719 respondents | McKinsey, The state of AI in 2026, August 2026 |
| 15 | About 95% of pilots without measurable P&L impact; partners about twice as successful | MIT NANDA, The GenAI Divide, July 2025 |
| 16 | More than 280-fold cost decline; six labs within about 25 points | Stanford HAI, AI Index 2025 and 2026 |
| 17 | Task length doubling about every seven months | METR, March 2025 and January 2026 |
| 22 | About 800% growth in FDE postings, January to September 2025 | Indeed data, Financial Times, 2025 |
| 25 | 22 companies, about 3,800 sites, about 200,000 monthly users | OSS Ventures portfolio tracker, refresh with the latest board figures |
| 40 | 16% to 54% accuracy | Sequeda, Allemang and Jacob, arXiv 2311.07509 |
