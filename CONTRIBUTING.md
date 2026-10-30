# Contributing

Copyright © RickBarretto, Arturo programming language.

All new skills and all modifications must be submitted through a pull request. Before merging, a code owner must investigate the change, verify its accuracy and scope, and approve it. The code owners are [RickBarretto](https://github.com/RickBarretto) and [Yanis Zafirópulos (drkameleon)](https://github.com/drkameleon), as listed in [.github/CODEOWNERS](.github/CODEOWNERS).

## Adding a skill

1. Check the existing skills for overlap. Describe the task the new skill will help with and why it needs its own skill. An issue is useful for discussing scope before writing a large contribution.
2. Create `skills/<name>/SKILL.md` using the portable Agent Skills format. Include YAML frontmatter with a unique lowercase, hyphen-separated `name` matching the directory (at most 64 characters) and a nonempty `description` (at most 1,024 characters) explaining when to use it.
3. Keep the entry point focused. Put detailed guidance in `references/` and bounded runnable examples in `examples/` as needed. Every local reference must stay inside the skill directory. Do not depend on sibling skills, absolute workspace paths, or tools specific to one assistant.
4. Investigate the relevant official Arturo reference and examples. Link sources and record review dates in references. Verify unfamiliar APIs against the installed runtime; explain evaluation order, scope, and mutation precisely. Do not assume conventional operator precedence or APIs from other languages.
5. Include the skill's own `LICENSING.md`, `LICENSE-CC-BY-4.0.txt`, and `LICENSE-MIT.txt`, following the existing skills. Preserve copyright notices and upstream attribution. Include local third-party notices when needed so that the skill remains independently installable. See the licensing requirements below.
6. Add the skill to the README. Update `SOURCES.md`, `STDLIB.md`, and the relevant validation or smoke coverage when the contribution changes their inventories or examples. Keep automated examples offline and bounded; avoid downloads, remote API calls, servers, and webviews.
7. Run the checks below, then open a pull request describing the skill's purpose, sources investigated, runtime version, and validation results. Request code owner review and address findings before merging.

## Modifying existing skills

Use the same source investigation, portability, licensing, and validation requirements for edits to existing skills. In the pull request, explain the problem and resulting behavior. For runtime-specific corrections, include the Arturo version and a small reproducer. Code owners must investigate and approve modifications as well as new skills; passing automated checks alone is not sufficient.

## Local checks

Use Bun for dependencies, scripts, and tests:

```sh
bun install
bun run skills:list
bun run check
bun test
bun run smoke
```

`skills:list` checks CLI discovery without installing skills into an assistant. Smoke checks require `arturo` on PATH. Run them when Arturo is available; if it is unavailable, report that limitation in the pull request. Use `bun run format` for file types supported by Biome, including Markdown, and format Arturo files manually. Review [AGENTS.md](AGENTS.md) for additional repository guidance.

## Copyright and licensing

Contribute only material you have the right to submit under the applicable licenses described in [LICENSING.md](LICENSING.md). Documentation and original embedded snippets use CC BY 4.0; original standalone examples, scripts, tests, and configuration use MIT. Preserve existing copyright notices and include appropriate attribution for new or adapted material. Do not replace upstream copyright holders or extend their copyright years.

For adapted documentation, identify the source, license, attribution, and changes made. For third-party code or package material, retain its applicable license and notices in the affected skill and update the repository's [third-party notices](THIRD-PARTY-NOTICES.md) as needed. Do not assume that this repository's licenses cover upstream material.

## Code owner review

The owners in `.github/CODEOWNERS` cover every file, including these contribution rules and the ownership file itself. Their review must investigate source accuracy, examples, portability, licensing, and the reported checks before approval.

Repository administrators should configure the target branch's GitHub ruleset or branch protection to require a pull request and code owner approval before merging. CODEOWNERS requests review but does not enforce merge restrictions by itself. Keep required checks enabled and resolve review findings before merge.

## Coverage maintenance

Use [the roadmap](ROADMAP.md), [coverage baseline](COVERAGE.md), and [editorial templates](templates/skill.md). Update coverage evidence with content changes. Verify interpreter changes, upstream API/package revisions, and reported discrepancies against official sources and minimal reproducers. Preserve historical review dates; distinguish source review, execution, and asserted results. The recorded baseline is Arturo 0.10.0 Linux amd64; other combinations remain unverified. Hosted runtime CI results must be observed before claiming they passed.
