# Repository Guidelines

## Project Structure & Module Organization

`src/` contains all app code. Use `src/pages/` for route-level screens, `src/components/` for reusable UI, `src/layouts/` for wrappers, `src/context/` for shared state, `src/utils/` for pure logic, `src/data/` for static datasets, and `src/types/` for domain types. Tests live in `tests/components/` and `tests/utils/`, mirroring source areas. Static assets and PWA files live in `public/`. Build output is generated in `dist/`.

## Build, Test, and Development Commands

- `pnpm dev`: Start Vite dev server (default `http://localhost:5173`).
- `pnpm test`: Run Vitest in watch mode for local iteration.
- `pnpm build`: Run the test suite, then create a production build in `dist/`.
- `pnpm preview`: Serve the production build locally.
- `pnpm lint`: Run ESLint across JS/TS/React files.
- `pnpm format`: Run Prettier across the codebase to format code.
- `pnpm deploy`: Publish `dist/` to GitHub Pages (`gh-pages`).

## Coding Style & Naming Conventions

This repo uses TypeScript + React functional components. Follow Prettier and ESLint before submitting changes.

- Indentation: 2 spaces, no tabs.
- Quotes: single quotes in code, double quotes in JSX props.
- Semicolons: required.
- Line width: target 100 chars.
- File naming: components/pages/layouts use `PascalCase` (example: `SignCard.tsx`), utilities use `camelCase` (example: `streakUtils.ts`).
- Keep utility modules pure and strongly typed; centralize shared interfaces in `src/types/`.

## Testing Guidelines

Vitest + Testing Library (`jsdom`) is the test stack. Place tests under `tests/` with `*.test.ts` or `*.test.tsx` suffixes (example: `tests/components/Badge.test.tsx`). Add or update tests for behavior changes in UI, utils, and state logic. Run `pnpm test` locally; `pnpm build` also enforces tests by running them first.

## Commit & Pull Request Guidelines

Recent history uses short, imperative commit subjects (for example: `Migrate codebase to TypeScript`, `Update vite.config.js`). Keep commit messages concise and action-focused.

For PRs, include:

- Clear summary of user-facing and technical changes.
- Linked issue(s) when applicable.
- Test evidence (`pnpm test`, `pnpm lint`, and build result).
- Screenshots/GIFs for UI changes.
