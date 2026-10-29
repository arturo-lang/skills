# Working on this library

Use Bun for package management, scripts, and tests. Use Biome for formatting the file types it supports, including Markdown; preserve readable Arturo formatting manually.

Skills live in `skills/<name>/SKILL.md` and follow the portable Agent Skills format. Keep each skill independently installable: local references must stay inside its directory. Avoid agent-specific tools, absolute workspace paths, and dependencies on sibling skills.

Base Arturo guidance on the official reference and examples linked in each skill. Explain evaluation, scope, and mutation precisely. Do not assume APIs or conventional operator precedence from other languages. Keep examples bounded and offline where possible.

Before completing changes, run `bun run check`, `bun test`, and `bun run smoke` when Arturo is available. `bun run skills:list` checks actual CLI discovery without installing skills into an agent.
