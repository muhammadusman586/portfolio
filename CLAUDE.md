# CLAUDE.md

## Commands

```bash
npm run dev       # Start local dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint check
```

No test suite is configured.

## Architecture

React 18 + TypeScript SPA built with Vite. Tailwind CSS for styling,
Framer Motion for all animation (wrapped in `MotionConfig reducedMotion="user"`).
Day theme by default; night mode = `.dark` on `<html>` (toggle in `Navbar`,
saved in localStorage, applied pre-paint by a script in `index.html`).

**Theme:** the page is a metro ride. Each section is a numbered "Station"
(`StationHeader` in `src/components/ui.tsx`). `MetroRail.tsx` is the fixed
right-edge line (lg+) and a bottom rail (<lg): stops follow real section offsets,
the train follows scroll and can be dragged to scrub, J/K hop stations, and a
"Now arriving" banner pops per station.

**Extras:** `src/sound.ts` (Web Audio chime/punch/toot, muted by default),
`src/dom.ts` (`flashTo` scroll+highlight, used by Line Map stops → tickets/roles
via `ticket-<slug>` / `role-<slug>` ids), `RushHour.tsx` easter egg (type "usman"
or click the hero train 5×), Hero fetches the latest public GitHub push.

**Content:** all copy/data lives in `src/data.ts` (`STATIONS`, `JOURNEY`,
`PROJECTS`, `LINES`, `USED_IN`, `SHIP_STEPS`, `LINKS`). Section order in `App.tsx`:
`Hero → About → Experience → Projects → Skills → HowIShip → Contact`.
`STATIONS` ids must match section `id`s.

## External Services

**EmailJS** is used for the contact form. Credentials are hardcoded
in `src/components/Contact.tsx`.
If moving to env vars, Vite exposes them via `import.meta.env.VITE_*`.

---

## Design System

Poster / neo-brutalist. Tokens in `tailwind.config.js`:
bg/fg are CSS vars that flip at night (`text-fg` for text on the page,
`text-ink` inside cards/coloured fills); paper `#F7F6F1`, ink `#111`, pink `#FF3EA5`, lime `#E6FF00`,
blue `#2D4BFF`, cyan `#7AF7FF`, board `#16231d`, amber `#FFB938`.
Fonts: Bowlby One (`font-display`), Archivo (`font-sans`),
IBM Plex Mono (`font-mono`), Permanent Marker (`font-marker`).
Thick ink borders, hard offset shadows (`shadow-hard*`), no rounded cards.
Shared classes in `src/index.css`: `.poster`, `.sticker`, `.label`, `.btn`, `.hl`.
Never mix Tailwind `translate-*` with Framer transforms on the same element;
use Framer `x`/`y` style instead. When animating `left`/`width` in `%`,
set an explicit `initial` in `%` too (px→% won't interpolate).
Headless browsers report `document.hidden` and pause rAF, so Framer
animations look frozen there; verify motion in a visible Chrome.
