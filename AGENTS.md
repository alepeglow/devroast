# Project Notes

- App: `devroast`, a code roasting web app built during NLW by Rocketseat.
- Stack: Next.js App Router, Tailwind v4, Biome, Base UI, Shiki.
- Design source: follow the current Pencil canvas/selection when implementing screens.
- Styling: prefer Tailwind theme tokens and avoid valores soltos quando houver token reutilizavel.
- Typography: `font-sans` for regular text, `font-mono` for code/terminal UI.
- UI: keep reusable building blocks generic and keep page-specific composition outside the shared UI layer.
- Compound components: prefer explicit `Root`-style composition over slot props.
- Exports: named exports only.
- Validation: run `npm run format`, `npm run lint`, and `npm run build` after meaningful changes.
