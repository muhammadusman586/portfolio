# CLAUDE.md

## Commands

```bash
npm run dev       # Start local dev server (Vite HMR)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
npm run lint      # ESLint check
npm run test:e2e  # Playwright smoke tests (builds, serves on :4173, desktop + mobile)
```

Smoke tests live in `e2e/`; they stub GitHub so they never hit the real API.
First run needs `npx playwright install chromium`.

## Architecture

React 19 + TypeScript 6 + Vite 8, one page (`src/App.tsx`). Styling is plain CSS in
`src/index.css` (tokens + component classes); Tailwind 4 (`@tailwindcss/vite`) only supplies the reset.

- `components/SpringyName.tsx`: "Muhammad / Usman"; each letter can be dragged
  and springs home (rAF spring, off under reduced motion).
- `components/Buddy.tsx`: blob mascot. Eyes follow the pointer, blinks, squishes.
  Make any mounted `<Buddy id>` talk with `say(id, text)` from `src/say.ts`.
  `id="main"` sits by the name (click cycles its `lines`); the walkers ride the timelines.
- `components/Timeline.tsx`: two separate dashed-line sections, `Experience`
  (ROLES, with company logos from `public/logos/`) then `Projects` (PROJECTS).
  Each has its own walker Buddy (`walker-exp`, `walker-proj`): an
  IntersectionObserver on the middle band of the screen moves it to the current
  stop and says that stop's `say`.
- `components/Art.tsx`: one SVG illustration per project (`art` key); uses classes
  so it follows light/dark.
- `components/CaseStudy.tsx`: native `<dialog>` case study (summary, what I built,
  stack, links). Opened from timeline cards and from bio links.
- `components/Presence.tsx`: open-to-work line, Lahore time, last GitHub push.

Dark mode: `.dark` on `<html>`, always from the system setting (applied pre-paint
by a script in `index.html` and `public/404.html`, then kept in sync live). The
footer button overrides it for the current visit only; nothing is stored.

**Content:** all copy/data lives in `src/data.ts` (`LINKS`, `PROJECTS`, `ROLES`). Each project/role has a `say` line for Buddy.

## External Services

**GitHub** public events API (unauthenticated) feeds the Presence line via
`src/github.ts` (one shared request per page load).

**Deploy:** Vercel from GitHub (`muhammad-usman-ramzan.vercel.app`).
`public/404.html` is a standalone page Vercel serves for unknown paths;
`public/sitemap.xml`, `robots.txt` and the JSON-LD in `index.html` hold the
live URL.

---

## Design System

Playful-minimal: one narrow column, near-monochrome, one accent (tangerine).
Tokens are CSS vars in `src/index.css` (`:root` light, `.dark`): `bg`, `fg`,
`muted`, `accent`, `card`, `line`, `soft`. Change the brand colour by editing
`--accent` only (Buddy, links, highlights and art all use it); `public/404.html`
and the favicon in `index.html` repeat the hex.
Fonts: Bricolage Grotesque (`--sans`) and DM Mono (`--mono`, `.meta` labels).
All motion is CSS or small rAF loops and is disabled under `prefers-reduced-motion`.
Headless browsers report `document.hidden` and pause rAF, so motion can look
frozen there; verify it in a visible Chrome.
