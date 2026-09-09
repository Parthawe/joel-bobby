# Joel Bobby

A five-page portfolio for a musician, record producer, and audio engineer. The design draws on studio photography, understated typography, and work-led presentation from sound-engineer portfolios.

**Live site:** https://parthawe.github.io/joel-bobby/

## Pages

- `/` — introduction, selected records, and live-work preview.
- `/music/` — released work, precise roles, and eight track previews. `?release=azad` or `?release=pills` opens the selected release.
- `/live/` — live projects and the complete selected engineering-credit list.
- `/about/` — biography, practice, and NYU projects.
- `/contact/` — email, social links, and a form that opens a draft in the visitor's email app.

Old home links such as `/#live` redirect to the corresponding page. Playback stops on page navigation and never starts automatically.

## Run and build

Requires Node.js 18+ and Python 3. No runtime framework or backend.

```sh
npm run render
npm run dev
npm run check
npm run build
```

Open http://127.0.0.1:5173. The render script creates five static HTML documents from shared templates. Run it after changing templates; CSS/JavaScript edits are served directly during development.

## Edit

- `src/pages.mjs`: page content and composition.
- `src/shared.mjs`: navigation, footer, metadata and shared player.
- `styles.css`: typography, color, layout, responsive rules and states.
- `app.js`: player, menu, release deep links, legacy redirects, contact draft.
- `music.json`: verified release/track metadata and preview URLs.
- `research/README.md`: factual sources and limits.
- `research/DESIGN-REFERENCES.md`: reference websites and design decisions.
- `ASSETS.md`: media provenance and licenses.

Root and subdirectory HTML files are generated. Edit the templates, not those outputs.

## Publish

```sh
npm run check
npm run prepare:pages
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages serves `/docs` on `main`. `prepare:pages` renders all pages, builds `dist`, then refreshes `docs` including subdirectories. Local font/image assets work from the GitHub project path.

The contact form does not send or store messages. Apple Music hosts the streamed previews; direct full-release links remain available if a preview fails. Design reference sites contribute no assets or copied content.
