---
name: Joel Bobby
description: Photographic studio portfolio for a musician, producer, and engineer.
colors:
  ink: "#171916"
  paper: "#efeee8"
  white: "#faf9f5"
  brass: "#bea47b"
  muted: "#686b62"
  line: "#d2d3c9"
  dark-muted: "#b6b9ae"
  button-hover: "#d1bc9b"
  link-hover: "#82633a"
  form-surface: "#e3e3d9"
  track-playing: "#ded8ca"
  focus: "#a97736"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(74px, 8.8vw, 132px)"
    fontWeight: 450
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(60px, 6.8vw, 100px)"
    fontWeight: 450
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px, 3.3vw, 48px)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 650
    lineHeight: 1.7
rounded:
  square: "0"
  circle: "50%"
spacing:
  control-inline: "24px"
  form-inset: "35px"
  feature-inset: "45px"
  section-large: "100px"
components:
  button:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "15px 24px"
  button-hover:
    backgroundColor: "{colors.button-hover}"
  text-link:
    padding: "10px 0"
  input:
    textColor: "{colors.ink}"
    rounded: "{rounded.square}"
    padding: "12px 0"
    width: "100%"
  track:
    padding: "14px 5px"
    width: "100%"
  track-playing:
    backgroundColor: "{colors.track-playing}"
  player:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "14px 20px"
  project-form:
    backgroundColor: "{colors.form-surface}"
    padding: "35px"
---

# Design System: Joel Bobby

## Overview

The visual direction is a photographic studio portfolio. A real console-room portrait opens the home page, framed by charcoal and a dark scrim. Warm paper, muted brass actions, generous space, and original release art carry the rest of the site.

Joe Joaquin informed the photographic opening and separate pages; Serban Ghenea informed the emphasis on recordings and credits; Craig Bauer informed the restrained dark framing and contact path. `research/DESIGN-REFERENCES.md` records the references. Their assets and claims are not part of Joel's site.

This document records the current implementation in `src/shared.mjs`, `src/pages.mjs`, `styles.css`, and `app.js`. `scripts/render-pages.mjs` generates five static pages: Home, Music, Live Work, About, and Contact. Key characteristics are real photography, Manrope throughout, square artwork, precise roles, and manual audio previews.

## Colors

The frontmatter owns the color values. Charcoal `ink` fills the shared header, home hero, footer, and audio player. Warm `paper` fills the main reading areas. `white` marks the active or hovered desktop navigation item. Muted `brass` fills primary buttons and the player toggle, accents the seek field, and marks the current page.

Use `muted` for descriptions and metadata on light backgrounds, `dark-muted` for supporting text on charcoal, and `line` for list dividers. Pale stone surfaces separate the home live-work feature, live session panel, research section, and contact form. Hover and playing states use subdued neutral changes. The focus outline is warm brown.

The composition remains fixed across operating-system color themes. Photography and cover art supply most of the color variation.

## Typography

Manrope is the only text family, self-hosted as a variable font with a sans-serif fallback. Large headings use moderate weights and tight tracking. Display, page-title, headline, and album-title roles appear in the frontmatter. Phosphor is the locally hosted icon font for arrows, playback, menu, copy, and release symbols.

The home name is followed by a smaller profession line using `clamp(25px, 3.2vw, 43px)`, weight (400), and line height (1.23). Record and live feature titles are (43px). Biography lead copy is (20px) with line height (1.6); most descriptions are (13–15px). Metadata usually uses (10–12px). Track timings use tabular numerals. Form labels use the label role; desktop field text is (13px).

At widths up to (700px), the home name becomes (68px), its profession line (28px), base page headings (59px), and base section headings (33px). Contact and biography have their own heading overrides. Form fields become (16px). At widths up to (360px), the home name is (58px) and contact headline (46px).

## Layout

The shared content width is `min(1200px, 88%)`, centered. Header and footer use (6%) horizontal padding. Large desktop sections commonly use (70–100px) vertical space. The header is at least (100px) tall; the home hero follows it with a viewport-relative height capped at (780px).

The home hero places the photograph from (38%) across the section to its right edge. The text overlaps the darkened left edge of the photograph; the image crop stays centered on the studio portrait. Introductory text uses two unequal columns. Selected recordings use two equal columns with a (6%) gap and square artwork. The home page links to the separate Music and Live Work pages.

Music pairs a square sleeve with its tracks in equal columns separated by (7%). Live Work pairs a square poster with session details, follows with two smaller projects, then displays all further credits in rows. About pairs portrait and biography, followed by practice rows and a research section. Contact pairs direct contact details with a form. The shared contact callout appears on every page except Contact; the footer includes all five page links.

At widths up to (1050px), spacing, hero placement, and project thumbnails tighten; the two contact name/email fields stack. At widths up to (700px), major grids become single columns, page headings stack, and the header becomes (82px) tall. The home image moves below the introductory text with vertical scrims. Album actions remain visible on touch layouts. About places biography before the portrait. Credit context and roles stack beneath each title, retaining the source link at the right. The player wraps its seek controls onto a second row.

At widths from (1600px), header/footer insets and hero alignment use `max(6%, calc((100vw - 1400px) / 2))`. The fixed player sits (16px) above the bottom with (4%) side insets; mobile offsets are (10px). Visible-player body padding is (100px) on desktop and (122px) on mobile.

## Elevation & Depth

The site uses flat surfaces and thin rules. Album sleeves are straight and unframed. The player has the only floating-panel shadow; the active desktop navigation underline is implemented as a one-pixel shadow. Both exact values are in `.impeccable/design.json`.

A directional dark gradient blends the portrait into the hero and keeps the text legible. Album hover scales the image slightly and reveals an action plate; keyboard focus also reveals the plate. The home text has a brief entrance. Pages use native navigation without a custom page transition. Reduced-motion preferences disable local transitions and animations.

## Shapes

Buttons, inputs, artwork, panels, and the player have square edges. Only the player's play/pause button is circular. Most separators are one pixel; the selected release has a two-pixel bottom border. The universal focus outline is two pixels with a six-pixel offset, reduced to three pixels of offset on form fields.

Primary actions have a (54px) minimum height. Text links, menu controls, source links, and desktop player controls use (44px) targets or minimum heights where specified. Mobile primary buttons have a (50px) minimum height and player controls are (40px).

## Components

### Navigation and shared shell

The uppercase wordmark includes a small “Music & sound” line. Desktop navigation uses a brass underline and `aria-current="page"` for the active page. Mobile navigation opens below the header; the current link is brass. The menu button updates its accessible label and expanded state. Escape closes it and restores focus. A skip link targets the main content.

Each page has its own URL, title, description, and current-page state. Legacy home hashes redirect to their page equivalents. Native page navigation ends audio playback.

### Actions and album cards

The primary button is brass with charcoal text and a lighter hover state. Plain links have a trailing icon; text links add a thin underline and brown hover text. Album cards give original cover art a full square, with title, artist, year, and exact roles below. Their links can preselect the release on Music through `?release=pills` or `?release=azad`.

### Music and audio

The release selector uses thumbnail, title, artist/year, and arrow. A bottom border indicates selection through `aria-pressed`. Selection updates the sleeve, metadata, exact role, tracks, links, and URL query together. Pills alone displays the Spotify link and press note.

Track rows are full-width buttons with number, title, duration, and play/pause icon. Their pressed state indicates current playback. Clicking a track reveals the fixed native-audio player with artwork, track identity, elapsed time, seek range, preview duration, and close control. Changing the displayed release does not interrupt an active preview on the same page. Closing the player pauses playback and restores focus toward the track trigger.

Audio starts only after visitor action. Playback failure provides a status message and Apple Music fallback link. Metadata failure preserves the full-release link and disables selection. JavaScript-free visitors receive direct release links. Do not imply the player continues across page navigation.

### Live credits

The featured session separates artist, venue/year, description, and Joel's role. Further credits are always visible, with title, project context, precise role, and an optional source link. Preserve distinctions such as assistant engineering, stage hand, live console mix, and mixing. These rows are not a disclosure control.

### Contact and fields

The Contact page provides a mail link, separate copy button with live status, social links, and an optional email-draft form. The form uses a stone surface, visible labels, transparent fields, bottom borders, a native select, and a vertically resizable textarea. Focus remains visible; validation uses native required and email constraints.

Name, email, and message are required, with limits of (100), (180), and (3000) characters. Submission opens a `mailto:` draft containing project type and entered details. The visitor reviews and sends through their own email app. Keep that behavior clear beside the action; the website does not send the message. Status copy includes a direct-email fallback.

## Do's and Don'ts

- Do use Joel's real portrait and original cover or performance art.
- Do use Manrope consistently and preserve the light heading weights.
- Do keep precise roles beside each record or project.
- Do preserve native links, page URLs, keyboard focus, form validation, and reduced-motion behavior.
- Don't restore the superseded cobalt palette, Antonio type, tilted sleeves, or single-page navigation.
- Don't autoplay audio or imply continuous playback between pages.
- Don't invent credits, awards, studio ownership, availability, or reference-site endorsements.
- Don't add rounded cards, decorative equalizers, or ornamental shadows to the flat layout.
