# Day 1 lab kit: facilitator notes

- `participant/polymex-plant-pulse/` is the repository participants clone. Import it as a template repository in the cohort's GitHub organization. It contains the brief (`README.md`), the context and rules for Claude Code (`CLAUDE.md`), the two CSV files, the data dictionary and the verification log template. It contains no answers.
- `facilitator/generate_polymex_day1.py` regenerates the data and the answer key deterministically (seed 1012): `python3 generate_polymex_day1.py` from this folder, with pandas and numpy installed. Change the seed for a new cohort; the answer key changes with it.
- `facilitator/answer_key_day1.json` holds every value quoted in the facilitator guide, computed on cleaned data, plus the four planted traps.

Keep this folder out of the participants' repository.
