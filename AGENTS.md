# AGENTS.md

## Commands

- `npm run dev` — dev server (Turbopack) on http://localhost:3000
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config: next core-web-vitals + TS)
- No test framework or CI configured. For type checking, run `npx tsc --noEmit` (there is no `typecheck` script).

## Structure

- Single-page landing site: the whole app is `src/app/{layout,page,globals.css}`. Page sections live in `src/components/{navbar,banner,features,subscribe,footer}.tsx`.
- `src/components/ui` (~60 files) is the bundled shadcn/ui library, not app code.

## Stack quirks

- Next.js 16.4.3 with `cacheComponents`, `partialPrefetching`, and the React Compiler enabled in `next.config.ts`. APIs and conventions differ from training data — consult `node_modules/next/dist/docs/` before writing App Router code.
- Tailwind v4, CSS-first config: all theme tokens live in `src/app/globals.css`. There is no `tailwind.config` file.
- shadcn/ui is the **base-nova** style built on **Base UI** (`@base-ui/react/*` primitives), not Radix. Reuse or extend the existing components in `src/components/ui` instead of writing new primitives, and read their imports for the correct primitive APIs (e.g. dropdown-menu wraps Base UI `Menu`, not `DropdownMenu`).
- UI components import `cn` from the `cn` package; `src/lib/utils.ts` is just a one-line re-export of it (and `components.json`'s `@/lib/utils` alias resolves there). Importing `cn` from either path works — follow the existing `import { cn } from "cn"` pattern.
- Path alias `@/*` → `src/*` (tsconfig). App Router code in `src/app`; hooks in `src/hooks`; RSC is enabled (`rsc: true` in `components.json`), so keep components server-side unless they need state/effects.
- Auth is Better Auth (email/password + Google) backed by a local SQLite file `./better-auth.db` opened via an **absolute** path (`path.join(process.cwd(), ...)` — relative paths break under Next server workers). Tables are created once by `node scripts/setup-auth-db.cjs`; if the db file is deleted, run that script again. Requires `BETTER_AUTH_SECRET` (and `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` for the Google provider) in `.env.local`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
