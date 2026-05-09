# PLAN: Human Design Coaching App Mockup

## Task Restatement
Build a pixel-perfect interactive mockup of a Human Design coaching app for GitHub Pages deployment. Single React+Vite+Tailwind SPA with 5 screens (Auth, Home, Chat, Journal, Dreams, Quests), warm amber aesthetic, all data hardcoded/mocked.

## Approaches Considered

### A) Single large file (everything in App.tsx)
- Pros: Simple, fast to write
- Cons: Hard to navigate, unwieldy, hard to verify

### B) One file per screen + shared components (CHOSEN)
- Pros: Organized, each screen independently verifiable, easier diff review
- Cons: More files to manage
- Why chosen: Better structure for 6 screens + nav, easier to verify git diff

### C) Storybook-based approach
- Pros: Component isolation
- Cons: Heavy tooling overhead for a mockup, overkill

## Approach: B — Feature-based file structure
```
src/
  components/
    BottomNav.tsx
    Bodygraph.tsx
  screens/
    AuthScreen.tsx
    HomeScreen.tsx
    ChatScreen.tsx
    JournalScreen.tsx
    DreamsScreen.tsx
    QuestsScreen.tsx
  App.tsx
  main.tsx
  index.css
```

## Files to Touch
- `vite.config.ts` — set base to `/hd-app-demo/`
- `tailwind.config.js` — custom colors + fonts
- `index.html` — Google Fonts link
- All src files listed above
- `.github/workflows/deploy.yml`
- `package.json`

## Risks & Unknowns
- Tailwind v4 vs v3 API differences — use @tailwindcss/vite carefully
- Bodygraph SVG positioning needs precise layout math
- Hash router required for GitHub Pages (no server-side routing)
- npm create vite interactive prompt — use `--` flag correctly
