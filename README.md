# Peng Rao — personal website

Built with [Hugo](https://gohugo.io). Every push to `main` rebuilds the site and publishes it to
**https://raopeng-physics.github.io** via GitHub Actions (`.github/workflows/hugo.yml`).

## Preview on your computer

```bash
brew install hugo          # once (macOS)
hugo server -D             # then open http://localhost:1313  (-D also shows draft essays)
```

The preview reloads as you edit. Nothing goes online until you push.

## Publish a change

```bash
git add -A
git commit -m "Describe the change"
git push
```

The live site updates about a minute later (progress: the repo's **Actions** tab).

## Where things live

| What | File |
|---|---|
| Name, position, email, Scholar / ORCID / arXiv links, CV path, photo | `hugo.toml` → `[params]` |
| Homepage “beyond physics” sentence | `content/_index.md` |
| Physics intro, research areas, homepage Physics summary | `content/physics/_index.md` |
| Selected publications (+ figures) | `data/publications.yaml`, figures in `static/figures/` |
| Lecture notes | `content/notes/<name>/index.md` + PDF in `static/files/` |
| Essays | `content/writing/<name>.md` |
| Topic colours for essays | `hugo.toml` → `[params.topics]` |
| CV PDF, portrait, note PDFs | `static/files/` |
| Impressum / Privacy | `content/impressum.md`, `content/privacy.md` |
| Colours, fonts, layout | `assets/css/main.css` |
| Page templates | `layouts/` |
| Link-preview images (cards) | `layouts/partials/cards/`, rendered by `scripts/cards.mjs` |

## Routine tasks

**Add a paper** — add an entry at the top of `data/publications.yaml` (copy an existing one). Give
`volume` and `pages` so the citation line is complete. For a figure, put a PNG/JPG (~600 px wide)
in `static/figures/` and set `figure: "/figures/<name>.png"` plus a one-line `figure_alt`.

**Update the CV** — replace `static/files/cv.pdf`.

**Add lecture notes** — copy `content/notes/strongly-correlated-magnetism/` to a new folder, edit
title, date, pages, version and abstract, and put the PDF in `static/files/` (the `pdf:` line points to it).
They appear on the Physics page at `/physics/notes/<title>/`.

**Write an essay** — create `content/writing/my-essay.md`:

```markdown
---
title: "My essay"
date: 2026-12-01
topic: "Economics"            # one topic per essay
description: "One- or two-line teaser for the list."
draft: true                   # remove (or set false) to publish
---
Text in Markdown…
```

The URL is the file name (`/writing/my-essay/`). The essay's watercolour squares are generated
from its title, so they stay the same as long as the title does. The **Writing** tab and homepage card are always shown
(`showWriting = true` in `hugo.toml`; set it to `false` to show them only once an essay is published).
The topic filter appears once essays cover two or more topics. A new topic gets the default colour unless you
add it under `[params.topics]` in `hugo.toml`.

Delete the two example essays in `content/writing/` when you add real ones (they are drafts and never
appear online).

## Link previews, email, 404

- **Link previews.** When a page is shared (Slack, email, LinkedIn, Bluesky…), the preview shows a card image.
  Essays get their own card (topic, title, the essay's watercolour squares); all other pages share one card with
  your name and the homepage composition. The cards are drawn as SVG by Hugo and converted to PNG during
  deployment, so they exist only on the live site, not in `hugo server`. Nothing to do when you add an essay.
- **Email.** Set `email = "…"` in `hugo.toml`. It appears in the Profile cards, but is assembled by a script so
  spam bots reading the HTML don't see it.
- **404 page.** `layouts/404.html`.

## Maths (LaTeX)

Write LaTeX between `$...$` (inline) or `$$...$$` (display) in paper titles, takeaways, research
texts, note abstracts and essays; KaTeX renders it in the browser.

- In Markdown files (essays, notes, page texts) type it as in a paper: `the $\mathbb{Z}_2$ spin liquid`.
- In `data/publications.yaml` and front matter, wrap the text in **single quotes** so backslashes
  stay as they are: `title: 'Majorana continua in the $J$-$K$-$\Gamma$ model'`.
  (Inside double quotes every backslash would have to be doubled.)
- Page titles in the browser tab and RSS show the raw LaTeX, so keep maths in essay titles light.

## Before launch

- Fill in `[params]` in `hugo.toml` (email, Scholar/ORCID links), and add `static/files/cv.pdf`,
  the notes PDF, and optionally a portrait (`photo = "/files/portrait.jpg"`).
- Complete `content/impressum.md` and `content/privacy.md`.
- Custom domain later: add a file `static/CNAME` containing e.g. `pengrao.com`, change `baseURL`
  in `hugo.toml`, and follow GitHub's instructions for the DNS records.

Fonts (Jost, Spectral, IBM Plex Sans) are self-hosted under the SIL Open Font License; see `static/fonts/`.
