# Joel Bobby

A musician portfolio with released music, track previews, precise production credits, live work, and contact links.

**Website:** https://parthawe.github.io/joel-bobby/

## Run locally

```sh
npm run dev
```

Open http://127.0.0.1:5173. Python 3 and Node.js 18+ are sufficient; the website has no runtime framework or build dependencies.

```sh
npm run check
npm run build
```

`dist/` contains the static deployment. Fonts, icons, and images are self-hosted. Development packages record font/icon provenance; the checked-in assets allow builds without installing them.

## Edit

- `index.html`: biography, live credits, links, metadata.
- `music.json`: release metadata and Apple Music preview URLs.
- `styles.css`: visual system and responsive layouts.
- `app.js`: release selector, audio player, menu, email copy.
- `research/README.md`: source trail and factual caveats.
- `ASSETS.md`: media provenance and font licenses.

## Publishing

GitHub Pages serves the repository's `/docs` directory on `main`. After edits, run `npm run check && npm run prepare:pages`, commit the updated files, and push. No secret keys or external backend are required. Contact links open an email app; the site does not send or store messages.

## Browser checks

Desktop and mobile visual review; 320px and 390px overflow checks; real previews from both releases; release changes; pause/close; menu; expanded credits; copied email; local navigation and asset checks. Playback requires the third-party preview service to remain available. Full Apple Music release links provide a fallback.
