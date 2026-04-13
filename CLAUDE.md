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
Framer Motion for animations, dark mode via class strategy on `<html>`.

**State:** A single `ThemeContext` (in `src/context/ThemeContext.tsx`)
manages light/dark theme. Components consume it via `useTheme()`.
Default is `'dark'`.

**Routing:** None — single page, all sections rendered sequentially
in `App.tsx`: `Navbar → Hero → About → Skills → Projects → Contact`.

**Section components** live in `src/components/`.
Scroll animations use `react-intersection-observer` to trigger
Framer Motion variants when sections enter the viewport.

## External Services

**EmailJS** is used for the contact form. Credentials are hardcoded
in `src/components/Contact.tsx`.
If moving to env vars, Vite exposes them via `import.meta.env.VITE_*`.

---

## UI Refactor Instructions

### Design System (derive everything from this)

Background:       #0a0a0a (near black, NOT pure #000000)
Primary accent:   #00FF7F (neon green) — used for CTAs, highlights,
active states, terminal prompt text
Secondary text:   #a0a0a0 (muted gray)
Body text:        #ffffff
Font:             Inter or similar geometric sans-serif (already in
Tailwind — ensure font-sans is Inter via @import)
Border radius:    Large (rounded-2xl / 16px+) on cards and terminal
windows