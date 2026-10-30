# Working on this library

Follow [CONTRIBUTING.md](CONTRIBUTING.md) when adding or modifying skills. All new skills and all modifications require a pull request and investigation and approval by a code owner before merging. Owners are listed in [.github/CODEOWNERS](.github/CODEOWNERS).

Use Bun for package management, scripts, and tests. Use Biome for formatting the file types it supports, including Markdown; preserve readable Arturo formatting manually.

Skills live in `skills/<name>/SKILL.md` and follow the portable Agent Skills format. Keep each skill independently installable: local references must stay inside its directory. Avoid agent-specific tools, absolute workspace paths, and dependencies on sibling skills.

Base Arturo guidance on the official reference and examples linked in each skill. Explain evaluation, scope, and mutation precisely. Do not assume APIs or conventional operator precedence from other languages. Keep examples bounded and offline where possible.

New skills must include their own licensing files and copyright notices. Preserve existing and upstream notices, attribute adapted material, and follow [LICENSING.md](LICENSING.md).

Before completing changes, run `bun run check`, `bun test`, and `bun run smoke` when Arturo is available. `bun run skills:list` checks actual CLI discovery without installing skills into an agent.
