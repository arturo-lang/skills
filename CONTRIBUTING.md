# Contributing

Copyright © RickBarretto, Arturo programming language.

All new skills and all modifications must be submitted through a pull request. Before merging, a code owner must investigate the change, verify its accuracy and scope, and approve it. The code owners are [RickBarretto](https://github.com/RickBarretto) and [Yanis Zafirópulos (drkameleon)](https://github.com/drkameleon), as listed in [.github/CODEOWNERS](.github/CODEOWNERS).

## Adding a skill

1. Check the existing skills for overlap. Describe the task the new skill will help with and why it needs its own skill. An issue is useful for discussing scope before writing a large contribution.
2. Create `skills/<name>/SKILL.md` using the portable Agent Skills format. Include YAML frontmatter with a unique lowercase, hyphen-separated `name` matching the directory (at most 64 characters) and a nonempty `description` (at most 1,024 characters) explaining when to use it.
3. Keep the entry point focused. Put detailed guidance in `references/` and bounded runnable examples in `examples/` as needed. Every local reference must stay inside the skill directory. Do not depend on sibling skills, absolute workspace paths, or tools specific to one assistant.
4. Investigate the relevant official Arturo reference and examples. Link sources and record review dates in references. Verify unfamiliar APIs against the installed runtime; explain evaluation order, scope, and mutation precisely. Do not assume conventional operator precedence or APIs from other languages.
5. Include the skill's own `LICENSING.md`, `LICENSE-CC-BY-4.0.txt`, and `LICENSE-MIT.txt`, following the existing skills. Preserve copyright notices and upstream attribution. Include local third-party notices when needed so that the skill remains independently installable. See the licensing requirements below.
6. Add the skill to the README. Update source metadata and relevant validation or smoke checks when guidance or examples change. Keep automated examples offline and bounded; avoid downloads, remote API calls, servers, and webviews.
7. Run the checks below, then open a pull request describing the skill's purpose, sources investigated, runtime version, and validation results. Request code owner review and address findings before merging.

## Modifying existing skills

Use the same source investigation, portability, licensing, and validation requirements for edits to existing skills. In the pull request, explain the problem and resulting behavior. For runtime-specific corrections, include the Arturo version and a small reproducer. Code owners must investigate and approve modifications as well as new skills; passing automated checks alone is not sufficient.

## Broad discovery and focused condensation

Use [the broad-to-narrow authoring decision](docs/decisions/2026-11-01-broad-discovery-then-condensation.md) when substantially expanding or restructuring guidance: gather candidate capabilities and evidence broadly, then reconcile and condense into the smallest useful activation set and conditional references. Keep each package's guidance separate. Preserve a disposition for covered capabilities and validate the result with the intended lower-effort consumer; a shorter entry point is not proof of preserved coverage or better task completion. Model-specific authoring roles stay outside the portable skill.

## Skill and reference metadata

Use optional YAML `metadata` for facts relevant to the document. `sources` must be a list of nonempty strings; other values must be nonempty strings. Omit unknown or inapplicable fields; do not repeat licensing-file defaults.

Only package references use `author` and `license`; record known upstream values and `package-version` there. Keep `arturo-version` for the reference baseline, not a minimum requirement or proof of package execution. Preserve actual minimum-version requirements in the instructions.

Keep historical `review-date` values in `YYYY-MM-DD` form on references; formatting changes do not advance them. Store source URLs in `sources`. Use `source-package-version` when the reviewed source release differs from the documented package version. Keep licensing files and full notices intact.

## Local checks

Use Bun for dependencies, scripts, and tests:

```sh
bun install
bun run skills:list
bun run check
bun test
bun run smoke
```

`skills:list` checks CLI discovery without installing skills into an assistant. Smoke checks require `arturo` on PATH. Run them when Arturo is available; if it is unavailable, report that limitation in the pull request. Use `bun run format` for file types supported by Biome, including Markdown, and format Arturo files manually. For new Arturo examples, follow the [symbol and expression-block conventions](skills/arturo/references/formatting.md); preserve intentionally contrasting syntax in teaching examples. Review [AGENTS.md](AGENTS.md) for additional repository guidance.

## Optional package verification

`bun run smoke:packages --allow-network` separately downloads and executes the exact `unitt` 3.1.1 release. It checks standalone assertions and a project with custom discovery paths in both native and direct modes, including passing, deliberately failing, and restored runs. Native runs require the four-assertion summary as well as the expected process status; runner errors cannot count as success. Run it only when package/network verification is intended. It writes Arturo's normal package cache; temporary test output is removed, while installed packages are retained. Each process has a two-minute timeout. Negative cases require exit 1, exactly one reported failed assertion, the terminal Unitt failure message, and empty stderr. The native entry point is loaded from the standard Arturo cache for exact release 3.1.1; the global launcher and other cache layouts are not verified. Import failures and reporter crashes cannot count as expected assertion failures.

The **Opt-in pinned package verification** GitHub Actions workflow runs the same lane through manual `workflow_dispatch` only. It is separate from default PR/push checks and uses a fresh runner without a restored package cache. The package version is exact; the stable Arturo channel still moves and its installed version is printed. A version pin is not a content digest or a lock on future transitive dependencies. This lane currently verifies Unitt only; the other external package guides remain source-reviewed.

## Copyright and licensing

Contribute only material you have the right to submit under the applicable licenses described in [LICENSING.md](LICENSING.md). Documentation and original embedded snippets use CC BY 4.0; original standalone examples, scripts, tests, and configuration use MIT. Preserve existing copyright notices and include appropriate attribution for new or adapted material. Do not replace upstream copyright holders or extend their copyright years.

For adapted documentation, identify the source, license, attribution, and changes made. For third-party code or package material, retain its applicable license and notices in the affected skill and update the repository's [third-party notices](THIRD-PARTY-NOTICES.md) as needed. Do not assume that this repository's licenses cover upstream material.

## Code owner review

The owners in `.github/CODEOWNERS` cover every file, including these contribution rules and the ownership file itself. Their review must investigate source accuracy, examples, portability, licensing, and the reported checks before approval.

Repository administrators should configure the target branch's GitHub ruleset or branch protection to require a pull request and code owner approval before merging. CODEOWNERS requests review but does not enforce merge restrictions by itself. Keep required checks enabled and resolve review findings before merge.

## Maintenance

Use [GitHub issues](https://github.com/arturo-lang/skills/issues) for planned and active work and the [editorial template](templates/skill.md) for authoring. Keep verification notes with the relevant references. Verify interpreter changes, upstream API/package revisions, and reported discrepancies against official sources and minimal reproducers. Preserve historical review dates; distinguish source review, execution, and asserted results. The recorded baseline is Arturo 0.10.0 Linux amd64; other combinations remain unverified. Hosted runtime CI results must be observed before claiming they passed.

## Behavioral evaluation and optional integration checks

`bun run context:stats` measures document words/bytes, not model tokens. The [Sol Low harness](evals/README.md) runs separately from default checks; live model runs require explicit `--run` and an API key. `bun run evals:smoke` tests the held-out graders and isolation locally with Linux bubblewrap and networking disabled.

`bun run smoke:html --source FILE --release 0.0.4` (or `1.0.0-rc.1`) executes a reviewed local HTML source in a disposable directory and prints its SHA-256. It does not download or authenticate that source; compare the supplied file to the intended upstream release before running it. The source executes with the caller's environment. No package source is bundled.

`bun run smoke:preview --allow-network` separately imports Lanx 0.2.0 (and dependencies), starts a bounded temporary listener, checks HTML/binary/404 responses, then verifies shutdown. The client uses loopback; this does not prove the server binds only to loopback. Package caches are retained. This lane is not run by default PR checks.

The pinned Unitt lane also characterizes native uncaught exceptions and empty discovery separately from assertion pass/failure. On the recorded 0.10.0 runtime, an uncaught native child error exits zero but prints a runner diagnostic; it must not count as successful assertion execution. Empty discovery raises `No test found!` and exits 1.

## Documentation and decision records

Keep usage guides focused on stable procedures and contracts. Put architecture rationale, benchmark baselines, measurements, verification snapshots and environment-specific limitations in dated [decision records](DECISIONS.md) or evaluation artifacts. Records describe what was known on their date; append a new record for a changed decision or later result instead of refreshing old counts/status. Fix factual mistakes explicitly without making old evidence appear newer. Use issues and PR checks for active work status.
