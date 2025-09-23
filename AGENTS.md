# Agent Guidelines for beta.utilities-tracker

## Commands

- **Dev**: `pnpm dev` (Next.js with Turbopack)
- **Build**: `pnpm build` (Next.js with Turbopack)
- **Lint**: `pnpm lint` (ESLint on src/)
- **Lint Fix**: `pnpm lint:fix` (Auto-fix ESLint issues)
- **Format**: `pnpm format` (Prettier on src/)
- **Test**: No test framework configured yet

## Code Style

- **TypeScript**: Strict mode enabled, target ES2017
- **Imports**: Use `~/*` path alias for src/, sorted with @ianvs/prettier-plugin-sort-imports
- **Formatting**: 120 char width, 2-space indent, double quotes, semicolons, trailing commas ES5
- **Components**: Use class-variance-authority for variants, cn() utility for class merging
- **API**: Hono framework with typed routes, c.req.valid() for validation, proper HTTP status codes
- **Error Handling**: Return JSON errors with appropriate status codes, use services layer
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Auth**: Use c.get("user") for authenticated routes (non-null asserted)
