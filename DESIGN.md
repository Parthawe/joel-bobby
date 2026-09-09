---
name: Joel Bobby
description: A record-store listening room for a musician, producer, and engineer.
colors:
  blue: "#233fe5"
  paper: "#f4f3ed"
  ink: "#192522"
  lavender: "#dfdeec"
  muted: "#55605b"
  line: "#c8cdc3"
  sleeve-surface: "#e5e5da"
  button-hover: "#dfe4ff"
  track-hover: "#e6e8e0"
  track-playing: "#e6e8f4"
  focus: "#db7200"
typography:
  display:
    fontFamily: "Antonio, sans-serif"
    fontSize: "clamp(112px, 17.2vw, 270px)"
    fontWeight: 650
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Antonio, sans-serif"
    fontSize: "clamp(64px, 6.7vw, 100px)"
    fontWeight: 550
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "43px"
    fontWeight: 750
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  button: "2px"
  player: "4px"
  circle: "50%"
spacing:
  track-gap: "10px"
  button-inline: "22px"
  sleeve-inset: "28px"
  section-block: "100px"
  section-block-mobile: "65px"
components:
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.blue}"
    rounded: "{rounded.button}"
    padding: "15px 22px"
  button-light-hover:
    backgroundColor: "{colors.button-hover}"
  release-selector-active:
    textColor: "{colors.blue}"
    padding: "0 0 20px"
  track:
    textColor: "{colors.ink}"
    padding: "13px 4px"
    width: "100%"
  track-playing:
    backgroundColor: "{colors.track-playing}"
    textColor: "{colors.blue}"
  text-link:
    textColor: "{colors.ink}"
    padding: "0 0 5px"
  player:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.player}"
    padding: "14px 20px"
---

# Design System: Joel Bobby

## Overview

The creative north star is an independent record-store listening room. A large condensed name, a real studio portrait, and full cobalt sections give the page its identity. Release sleeves, restrained track rows, and specific credits support listening and browsing.

This is a scan of the implemented static site in `index.html`, `styles.css`, and `app.js`. `PRODUCT.md` supplies the commitments to real photographs, original work, and accurate roles; `.impeccable/direction.md` records the selected visual direction. Where the direction and code differ, this document describes the code.

Key characteristics:

- Oversized Antonio display type with Manrope for reading and controls.
- Cobalt opening and contact sections around paper and lavender content areas.
- Original release art and documentary photographs.
- Two selectable releases and a persistent audio preview player.
- Credits that preserve each person's role and the project context.

## Colors

Cobalt supplies the broad color fields and interactive emphasis. Warm paper softens the reading areas; lavender separates the live work.

Primary: `blue` fills the header, hero, and contact section. It also marks selected releases, playing tracks, and link hover states. `paper` supplies their light text and the hero listening button.

Neutral: `paper` fills music, biography, and the final utility footer. `ink` is the main text color and the player background. `lavender` fills the live-work section and the portrait's biography link. `muted` supports release metadata, timings, and notes. `line` divides releases and tracks. `sleeve-surface` is the mat behind the cover image.

State colors distinguish button hover, track hover, and a playing track. The warm `focus` color marks keyboard focus across light and dark surfaces. The site keeps its light palette when the operating system requests dark mode.

## Typography

Antonio and Manrope are self-hosted variable fonts with sans-serif fallbacks. Antonio carries the artist name, section headings, biography headline, and contact headline. Manrope carries titles, body copy, metadata, navigation, and controls. Phosphor is a locally hosted icon font used for playback, arrows, menu, copying, and disclosure.

The frontmatter records the base desktop roles. Release titles use the title role; live feature titles are slightly larger (48px). Biography lead copy is (23px), with a (1.45) line height and weight (550). Most explanatory paragraphs use (12–14px); the default body size is not a blanket paragraph size. Small metadata generally uses (10–11px). Track durations use tabular numerals.

At widths up to (700px), the artist name uses `clamp(108px, 27vw, 190px)` and a (0.96) line height. Main section headings become (64px), release titles (38px), and live feature titles (39px). The artist name retains its two lines and hides the decorative period. At widths up to (360px), the name becomes (26.7vw).

## Layout

The page uses full-width color sections with generous horizontal insets. Header, hero, and utility footer use (4%) at desktop sizes; content sections use (6%). Base section padding is the frontmatter's section-block value. Hero columns use a (1.08:1) ratio and (5%) gap. The listening area uses (0.95:1.05) with a (7%) gap; live feature columns use (1.15:1). Biography columns are equal.

The release sleeve is square, capped at (510px) including its mat. The desktop hero portrait has a (540px) minimum height and a cover crop. The live feature uses an image ratio of (1.35); its two smaller projects appear below in equal columns. Thin rules organize tracks, additional projects, practice areas, and credits.

At widths up to (1024px), content sections use (75px 5%) padding and typography, portrait height, and project thumbnails tighten. At widths up to (700px), content sections use (65px 6%) padding, major grids become one column, and the portrait becomes (400px) tall. Live projects stack, credits place metadata below the title, and the contact area stacks. The hero portrait drops to (340px) at widths up to (360px).

At widths from (1700px), shared horizontal padding becomes `max(6%, calc((100vw - 1550px) / 2))`; the hero name is (260px). The hero's inner grid has a (1700px) maximum width.

The player is fixed (16px) above the viewport bottom with (4%) side insets. On mobile it sits (10px) from the edges and wraps the time and seek control below the title row. Body bottom padding grows while the player is visible so it does not cover the final content.

## Elevation & Depth

Most surfaces are flat. Color changes and thin borders separate sections and rows. Shadows are confined to the release sleeve, floating player, and open mobile navigation; their exact values are in `.impeccable/design.json`.

The sleeve rests at a small angle and straightens on hover. Changing releases swaps its image without a selection animation. The portrait has a one-time reveal; the live image scales slightly on hover. The reduced-motion media query removes animations and transitions, disables smooth scrolling, and leaves the sleeve straight.

## Shapes

Photos, sleeves, metadata plates, and project rows have square edges. The primary listening button has a slight corner radius; the floating player has a slightly larger one. The contact arrow and player play/pause control are circular. Keep other controls and content close to the existing rectangular form language.

Use thin rules for separation, including the active release's heavier underline (3px). The universal focus outline is (3px) with an offset of (6px). Menu and email-copy buttons have minimum or fixed (44px) targets; player controls are (42px) on desktop and (36px) on mobile.

## Components

### Navigation and links

The header is (91px) tall with a compact monogram and an inline navigation row. Link hover reveals a thin underline from the left. On mobile the header is (75px) tall and a button opens a cobalt navigation panel below it. Navigation links and Escape close the panel; Escape returns focus to the menu button. The menu exposes its expanded state and current action through accessible attributes.

Text links use a persistent thin underline and a separate arrow. The listening button is light on cobalt, shifts upward (2px) on hover, and changes to the button-hover color. The copy button displays a short live status after success or failure.

### Release selector and sleeve

Two buttons select Pills or Azad Panchi. Artist metadata sits below each title; selected state uses cobalt text and the underline. They form a labeled button group with `aria-pressed`. A selection updates the artwork, title, artist, year, role, track list, and release links together. Spotify and the press note appear for Pills only.

The sleeve sits on a square mat with a caption underneath. Real cover art is required. Keep its proportions intact.

### Track rows and audio player

Each track is a full-width button with columns for number, title, duration, and play/pause icon. Rows have a (50px) minimum height, subtle hover background, and a distinct playing state. `aria-pressed` means the row is currently playing, not merely selected.

The persistent player uses one native HTML audio element with custom controls. It appears only after a track is requested; audio never autoplays on page load. Release browsing can continue while another release plays. The player shows the active artwork, track, release, elapsed time, duration label, seek range, pause/play, and close controls. Closing pauses audio and returns focus to the originating track or selected release button.

Playback failures expose a status message and a full-track Apple Music link when available. Metadata-loading failure leaves the full-release link available and disables release selection. JavaScript-free visitors receive direct release links. Do not replace these states with a decorative audio visualization.

### Live projects and credit disclosure

The live feature pairs original project imagery with title, venue/year, artist, and exact role. Smaller linked projects use thumbnail, title, context, role, and arrow. The credits use native `details` and `summary`, with a plus icon that rotates (45 degrees) when expanded.

Desktop credit rows separate title, project context, role, and an optional source link. Mobile rows stack that information and keep the source link at the right. Preserve distinctions such as assistant engineering, stage hand, live console mix, and mixing. A source link appears only where the implementation provides one.

### Contact

The cobalt contact section returns to large Antonio type and places a circular email link beside it. Hover fills the circle with paper and turns it slightly. The address remains a readable mail link with a separate copy control. The utility footer below it is paper, with a cobalt monogram and compact social links.

## Do's and Don'ts

- Do use real photographs and original release or performance art.
- Do keep listening, precise credits, and direct contact visible in their existing hierarchy.
- Do preserve keyboard focus, native disclosure semantics, playback status, and reduced-motion behavior.
- Do keep fonts and icons locally hosted.
- Don't invent endorsements, roles, shows, or availability claims to fill a layout.
- Don't start audio without a visitor action or introduce a fake equalizer.
- Don't turn every project or text group into a rounded, shadowed card.
- Don't describe planned motion or color placement as shipped behavior; verify the CSS and player logic first.
