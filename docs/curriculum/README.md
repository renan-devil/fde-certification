# Curriculum sources (trainers only)

Nothing in this folder is served by the site.

- `source/`: the curriculum as uploaded by Renan, untouched. `day1.zip`, `day2.zip`, `day3.zip` and `day5.zip` hold the designed decks (`.dc.html`), the deck content, facilitator guides, handouts and lab kits; `program-guide.md` is the full program guide; `day1-first-upload.zip` is the first Day 1 upload. Day 4 has not been uploaded yet.
- `facilitator/program-guide.md`: the full program guide. Participants get `public/resources/fde-school-your-week.md`, the same text without the Polymex cast (it reveals Day 4 material), the facilitation principles, the materials index, the design conventions and trainer-only lines.
- `facilitator/`: facilitator guides for every session, and the lab kits' answer keys, data generators and the Day 3 holdout evals. They contain model answers and things not to reveal to participants.
- `facilitator/d5-pm-debrief-and-exam.deck.md`: the Friday afternoon deck, held back because it tells "what really happened" in both cases. To publish it after Friday morning, move it to `public/resources/` and set the `d5-slides-pm` item in `content/resources.json` to available, with `read` and `href`.

Participant material lives in `public/resources/` (behind the site password) and is listed in `content/resources.json`.

The designed decks (`.dc.html`) are not served: they load fonts, images and the slide engine from a `shared/` folder that was not part of the upload. The site shows each deck from its `Deck content.md`, one panel per slide.
