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
Colour: `data-theme` on `<html>` picks a line theme (poster default, london,
tokyo, nyc via `ThemePicker`); `.dark` on `<html>` is night mode (Navbar
toggle). Defaults: night mode + NYC Subway + sound on (sound waits for the
first click/keypress). Visitor choices are saved in localStorage and applied
pre-paint by a script in `index.html`.

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
theme tokens are RGB-triplet CSS vars in `src/index.css`: `accent`,
`signal` (always with dark text), `deep` (always with light text), `sky`,
`alt` (Integrations line only), `board`, plus `bg`/`fg` which flip at night (`text-fg` on the page,
`text-ink` inside cards/coloured fills). Fixed: paper `#F7F6F1`, ink `#111`,
amber `#FFB938`. Never hard-code theme hex in components; use the token
classes or `rgb(var(--accent))`. Adding a theme = one `[data-theme]` block
in index.css + an entry in `ThemePicker.tsx`.
Fonts: Bowlby One (`font-display`), Archivo (`font-sans`),
IBM Plex Mono (`font-mono`), Permanent Marker (`font-marker`).
Thick ink borders, hard offset shadows (`shadow-hard*`), no rounded cards.
Shared classes in `src/index.css`: `.poster`, `.sticker`, `.label`, `.btn`, `.hl`.
Never mix Tailwind `translate-*` with Framer transforms on the same element;
use Framer `x`/`y` style instead. When animating `left`/`width` in `%`,
set an explicit `initial` in `%` too (px→% won't interpolate).
Headless browsers report `document.hidden` and pause rAF, so Framer
animations look frozen there; verify motion in a visible Chrome.
