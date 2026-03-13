# Project Notes

- App: `devroast`, a code roasting web app built during NLW by Rocketseat.
- Stack: Next.js App Router, Tailwind v4, Biome, Base UI, Shiki.
- Design source: follow the current Pencil canvas/selection when implementing screens.
- Styling: prefer Tailwind theme tokens from `src/app/globals.css`.
- Typography: `font-sans` for regular text, `font-mono` for code/terminal UI.
- UI: generic reusable components live in `src/components/ui`; page-specific composition stays outside.
- Compound components: prefer explicit `Root`-style composition over slot props.
- Exports: named exports only.
- Validation: run `npm run format`, `npm run lint`, and `npm run build` after meaningful changes.
