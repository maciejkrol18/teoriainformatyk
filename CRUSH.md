# CRUSH Guide for teoriainformatyk

## Build, Lint, and Test Commands

- **Install dependencies**: `pnpm install` *(project uses pnpm only, via preinstall hook)*
- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Start (production)**: `pnpm start`
- **Lint**: `pnpm lint` (uses Biome via next lint)
- **Format**: Biome handles formatting automatically; see `.biome.json` for config.
- **Run Biome manually**: `pnpm biome check .` (for lint/format validation)
- **Test**: *No tests scripts are defined; add "test" script to `package.json` to enable.*

## Code Style Guidelines

- **Linter/Formatter**: Biome (`biome.json`); enforces 2-space indentation, single quotes, double quotes in JSX, trailing commas, semicolons as needed, max line width 90, auto import organization.
- **Imports**: Use ES Modules; sort and group by type (external, absolute, relative). Auto-organized by Biome.
- **Types**: Use TypeScript everywhere; favor explicit types for all functions and major objects, use type imports where possible. Prefer `interface` for objects, `type` for unions.
- **Naming**: Use camelCase for variables and functions, PascalCase for components/types/classes. Filenames match exported class/component.
- **Error Handling**: Use `try/catch` for async errors; no silent catch blocks. For libraries, throw or propagate errors with message/context.
- **Formatting**: 2 spaces, 90 char line width, LF (\n) endings. No trailing whitespace. Quotes must match Biome config: single for JS, double for JSX.
- **JSX/TSX**: Use double quotes in jsx props; wrap jsx at 90 chars. Use self-closing tags where possible.
- **Comments**: Use `//` for logic comments sparingly. Use `biome-ignore` for lint exceptions only with explanation.
- **Tailwind**: Utility-first, prefer custom classes for unique patterns. 
- **Misc**: 
  - Prefer constants over literals.
  - No default exports for components; always use named exports.

## AI/Copilot/Custom Rules

- No Cursor/Copilot rules detected; update if added.

## Directory Hygiene

- Add `.crush/` to `.gitignore`
- Ignore: `/node_modules`, `.next/`, `.vercel/`, `/coverage`, `/analyze`, `*.tsbuildinfo`, `.env*.local`, `/build`, `.DS_Store`, log files.

---

Keep this file up to date if config or conventions change.
