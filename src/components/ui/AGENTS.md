# UI component patterns

Use these rules for every generic UI component created in `src/components/ui`.

## Exports

- Always use named exports.
- Never use `default export` for UI components, variant helpers, or types.
- Export the component, its variant helper, and public types when useful.

## TypeScript

- Extend native element props with `ComponentPropsWithoutRef<"element">`.
- Use `forwardRef` when the component wraps a native interactive element.
- Keep props small and composable; prefer variant props over custom booleans unless the boolean is part of the component API.
- Default native props that matter for safety and ergonomics, for example `type="button"` on buttons.

## Styling

- Use Tailwind CSS for styling.
- Define reusable design tokens in `src/app/globals.css` with the `@theme` directive.
- Prefer Tailwind theme token classes such as `bg-accent-green`, `text-text-secondary`, and `border-border-default` instead of raw palette classes or arbitrary hex values inside components.
- Use `tailwind-variants` for reusable variant APIs.
- When using `tailwind-variants`, pass external overrides through the variant call itself, for example `buttonVariants({ variant, size, className })`.
- Do not wrap `tailwind-variants` output with `twMerge`; the variant helper already merges classes.
- When you need to merge classes manually outside `tailwind-variants`, use `cn()` from `src/lib/utils.ts` so `twMerge` resolves Tailwind conflicts.
- Use `@base-ui/react` primitives for reusable components that need behavior, state, focus management, or accessibility support.
- Prefer semantic variant names such as `success`, `danger`, `outline`, `ghost`, `sm`, `md`, `lg`.
- Keep `base` focused on shared structure and interaction states; keep visual differences inside `variants` and `compoundVariants`.
- Prefer Tailwind canonical classes whenever they exist. Example: use `text-white` instead of `text-(--color-white)`.
- Only use CSS-variable arbitrary values when there is no canonical utility. When needed, prefer Biome canonical syntax such as `text-(--color-text-primary)` instead of `text-[var(--color-text-primary)]`.
- Use Tailwind font defaults: `font-sans` for regular UI text and `font-mono` for monospaced UI text.
- Do not introduce custom utility names like `font-primary` or `font-secondary`.

## Typography

- Use the default Tailwind sans stack for traditional text.
- Use JetBrains Mono only for monospaced text via the project's `font-mono` setup.
- Do not add a second external font for sans text.

## Design system behavior

- Build components to be generic and reusable across pages.
- Start from the Pencil reference when one is available, then generalize it into variants.
- Preserve the reference's spacing, typography, and colors in the default variant when that component is the current design source.
- Add variants only when they represent meaningful reusable states or styles.
- Prefer composition with explicit subcomponents for semantic parts of a component.
- For compound components, use explicit names such as `CardRoot`, `CardHeader`, `CodeBlockRoot`, `ToggleRoot`, `ToggleLabel` instead of slot props like `title`, `description`, `label`, `prefix`, or `content`.

## File structure

- Keep one component per file when possible, for example `button.tsx`, `input.tsx`, `badge.tsx`.
- Place generic visual components only in `src/components/ui`.
- Keep app-specific composition outside `src/components/ui`.
- Use uppercase `AGENTS.md` for local component instructions.
- Keep components with client-only behavior in their own `"use client"` files.
- Keep syntax highlighting components server-only when using `shiki`; do not turn `CodeBlock` into a client component.

## Verification

- Run format, lint, and build after creating or changing UI components.
- Add each new UI component to the visual showcase page in `src/app/page.tsx` so variants can be reviewed quickly.
