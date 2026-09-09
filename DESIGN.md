---
name: Joel Bobby
description: Photographic studio portfolio for a musician, producer, and engineer.
colors:
  ink: "#101e38"
  paper: "#f1f4fa"
  white: "#ffffff"
  accent: "#ff866e"
  muted: "#53627b"
  line: "#cad3e3"
  dark-muted: "#b7c6df"
  button-hover: "#ffa591"
  link-hover: "#9c3c33"
  form-surface: "#e2e9f4"
  track-playing: "#f8ded8"
  focus: "#d95b46"
  player-surface: "#182c4d"
  caret: "#9c3c33"
  nav-outline: "#ffffff40"
  player-shadow: "#08132a40"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(100px, 12.4vw, 190px)"
    fontWeight: 450
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(65px, 8vw, 116px)"
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
  action: "40px"
  player: "12px"
  artwork: "3px"
  form: "4px"
  seek-thumb: "2px"
  circle: "50%"
spacing:
  control-inline: "24px"
  form-inset: "35px"
  feature-inset: "45px"
  section-large: "100px"
components:
  button:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink}"
    rounded: "{rounded.action}"
    padding: "15px 25px"
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

The visual direction is a photographic studio portfolio. A real console-room portrait opens the home page, framed by midnight blue and a dark scrim. Porcelain, coral actions, generous space, and original release art carry the rest of the site.

Joe Joaquin informed the photographic opening and separate pages; Serban Ghenea informed the emphasis on recordings and credits; Craig Bauer informed the restrained dark framing and contact path. `research/DESIGN-REFERENCES.md` records the references. Their assets and claims are not part of Joel's site.

This document records the current implementation in `src/shared.mjs`, `src/pages.mjs`, `styles.css`, `motion.css`, `app.js`, and `motion.js`. `scripts/render-pages.mjs` generates five static pages: Home, Music, Live Work, About, and Contact. Key characteristics are real photography, Manrope throughout, square artwork, precise roles, and manual audio previews.

## Colors

The frontmatter owns the color values. Midnight blue `ink` fills the shared header, home hero, home live-work section, and footer. The player uses #182c4d. Porcelain `paper` fills the main reading areas. `white` marks the active or hovered desktop navigation item. Muted `accent` fills primary buttons and the player toggle, accents the seek field, and marks the current page.

Use `muted` for descriptions and metadata on light backgrounds, `dark-muted` for supporting text on midnight blue, and `line` for list dividers. Pale stone surfaces separate the live session panel, research section, and contact form. Hover and playing states use subdued neutral changes. The focus outline is deep coral.

The composition remains fixed across operating-system color themes. Photography and cover art supply most of the color variation.

## Typography

Manrope is the only text family, self-hosted as a variable font with a sans-serif fallback. Large headings use moderate weights and tight tracking. Display, page-title, headline, and album-title roles appear in the frontmatter. Phosphor is the locally hosted icon font for arrows, playback, menu, copy, and release symbols.

The home name uses two masked lines, followed by a profession line using `clamp(17px, 1.75vw, 25px)` and weight (400). Record and live feature titles are (43px). Biography lead copy is (20px) with line height (1.6); most descriptions are (13–15px). Metadata usually uses (10–12px). Track timings use tabular numerals. Form labels use the label role; desktop field text is (13px).

At widths up to (700px), the home name becomes (108px), its profession line (18px), main page headings (65px), and base section headings (33px). Contact and biography have their own heading overrides. Form fields become (16px). At widths up to (360px), the home name is (91px) and contact headline (46px).

## Layout

The shared content width is `min(1200px, 88%)`, centered. Header and footer use (6%) horizontal padding. Large desktop sections commonly use (70–100px) vertical space. The sticky header is at least (88px) tall on desktop. The home hero fills the remaining small viewport height, with a (740px) minimum and (1040px) maximum.

The home hero places the photograph from (34%) across the section to its right edge. The text overlaps the darkened left edge of the photograph; the image crop stays centered on the studio portrait. Introductory text uses two unequal columns. Selected recordings use columns in a .9:1 ratio, a (10%) gap, and square artwork; the second sleeve starts (120px) lower on desktop. The home page links to the separate Music and Live Work pages.

Music pairs a square sleeve with its tracks in equal columns separated by (7%). Live Work pairs a square poster with session details, follows with two smaller projects, then displays all further credits in rows. About pairs portrait and biography, followed by practice rows and a research section. Contact pairs direct contact details with a form. The shared contact callout appears on every page except Contact; the footer includes all five page links.

At widths up to (1050px), spacing, hero placement, and project thumbnails tighten; the two contact name/email fields stack. At widths up to (700px), major grids become single columns, page headings stack, and the header becomes (82px) tall. The home image moves below the introductory text with vertical scrims. Album actions remain visible on touch layouts. About places biography before the portrait. Credit context and roles stack beneath each title, retaining the source link at the right. The player wraps its seek controls onto a second row.

At widths from (1600px), header/footer insets and hero alignment use `max(6%, calc((100vw - 1400px) / 2))`. The fixed player is centered, up to (1040px) wide, and sits (22px) above the bottom; mobile offsets are (10px). Visible-player body padding is (100px) on desktop and (122px) on mobile.

## Elevation & Depth

The site uses tonal surfaces and thin rules. The selected Music sleeve and floating player have soft downward shadows. Navigation uses a one-pixel animated underline; Contact has an outlined capsule.

A directional dark gradient blends the portrait into the hero and keeps the text legible. Album hover scales the image slightly and reveals an action plate; keyboard focus also reveals the plate. The home name enters through two line masks as the portrait opens through a crop. Pages use native navigation without a custom page transition. Reduced-motion preferences disable local transitions and animations.

## Shapes

Primary actions use (40px) capsule radii. Artwork has (3px) corner easing, the form (4px), and the player (12px). Playback toggles are circular; inputs retain square edges. Most separators are one pixel; the selected release has a two-pixel bottom border. The universal focus outline is two pixels with a six-pixel offset, reduced to three pixels of offset on form fields.

Primary actions have a (54px) minimum height. Text links, menu controls, source links, and desktop player controls use (44px) targets or minimum heights where specified. Mobile primary buttons have a (50px) minimum height and player controls are (40px).

## Components

### Navigation and shared shell

The uppercase wordmark includes a small “Music & sound” line. Desktop navigation uses a accent underline and `aria-current="page"` for the active page. Mobile navigation opens below the header; the current link is accent. The menu button updates its accessible label and expanded state. Escape closes it and restores focus. A skip link targets the main content.

Each page has its own URL, title, description, and current-page state. Legacy home hashes redirect to their page equivalents. Native page navigation ends audio playback.

### Actions and album cards

The primary button is accent with midnight blue text and a lighter hover state. Plain links have a trailing icon; text links add a thin underline and brown hover text. Album cards give original cover art a full square, with title, artist, year, and exact roles below. Their links can preselect the release on Music through `?release=pills` or `?release=azad`.

### Music and audio

The release selector uses thumbnail, title, artist/year, and arrow. A bottom border indicates selection through `aria-pressed`. Selection updates the sleeve, metadata, exact role, tracks, links, and URL query together. Pills alone displays the Spotify link and press note.

Track rows are full-width buttons with number, title, duration, and play/pause icon. Their pressed state indicates current playback. Clicking a track reveals the fixed native-audio player with artwork, track identity, elapsed time, seek range, preview duration, and close control. Changing the displayed release does not interrupt an active preview on the same page. Closing the player pauses playback and restores focus to its trigger, including the homepage preview.

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
- Don't add fake equalizers, perpetual page animation, or scroll hijacking.

## Motion and waveform

The focal entrance is a two-line name mask (850ms, second line delayed 80ms) paired with a portrait aperture (1100ms), using `cubic-bezier(.16,1,.3,1)`. Content is present by default and reduced motion disables the sequence. The homepage preview plays Ninde Koode using the same native audio element and controls as Music.

Release changes wipe the sleeve over 500ms and settle the new track information over 350ms. Navigation underlines, arrow displacement, and field focus use short local transitions. The record icon rotates only during playback while in view; hidden-document state pauses it. No section-reveal observer hides page content.

The player decodes each requested preview lazily into 512 RMS samples. A canvas draws the real audio envelope and colors elapsed progress from the native audio clock. The range input remains above it for pointer and keyboard seeking. If fetching or decoding fails, the native range input remains visible and audio playback is unaffected. Decoded envelopes are cached, prior fetches cancel when the source changes, and animation frames stop when paused, ended, hidden, or reduced motion is requested.

Detector review: the track hover now translates its title instead of animating padding. Remaining type-size advisories reflect the documented responsive display, subtitle, and icon sizes, rather than a shared UI-label ramp.

## About: 3D bass study

The `#bass` section follows Joel's portrait and biography. A slate-blue stage (#192d4b) pairs a short introduction and link to Music with an original amber, rosewood, and nickel four-string bass. It is labelled as an interactive study, without implying ownership or a manufacturer. The body and hardware are real 3D meshes, not a flat-image transform.

The stage is 650px high on desktop, 500px on mobile, and 445px at the narrowest breakpoint. Desktop copy/model columns use a .85:1.45 ratio; mobile stacks them. A thin rule separates the model from status text and labelled controls. Text uses the existing Manrope hierarchy; the custom WebGL scene uses the site's warm studio lighting.

Drag rotates the model; arrow keys and directional buttons provide equivalent controls. Reset restores its three-quarter view. Auto-rotation is off by default, pauses offscreen/when hidden, and stays off with reduced motion. Rendering otherwise happens only on interaction or resize. The Three.js bundle loads within 200px of the section, only on About. A still render and clear status remain available if the browser cannot display WebGL.

## Current color roles

The current palette is midnight blue (#101e38), porcelain (#f1f4fa), and coral (#ff866e). Pale blue (#e2e9f4) separates form and featured-work surfaces. The dark player (#182c4d) and 3D stage (#192d4b) sit above the navy base. Metadata is slate on light backgrounds and pale blue on dark backgrounds.

Coral carries primary actions, elapsed audio, selected states, and the full-width contact callout. The callout reverses its action to navy with porcelain text. Deep coral (#9c3c33) is used for link-hover text on light surfaces. Focus rings use #d95b46, with navy rings on the coral callout. Selected tracks use #f8ded8 so both titles and muted metadata remain legible. The guitar's wood and hardware retain their material colors, while its fallback render matches the new stage.
