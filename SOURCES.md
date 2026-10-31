# Sources and maintenance

## Filesystem cleanup diagnostics

Reviewed and asserted 2026-10-30 on Arturo 0.10.0 Arizona Bark, amd64/Linux: Files/delete, write and exists?, Exceptions/try and throw, and the official deletion example at the recorded examples revision. The scripting [workflow reference](skills/arturo-scripting/references/workflows.md#preserve-action-and-cleanup-failures) links the sources and the pinned Files implementation investigated separately from runtime behavior. An original offline example detects a path left behind by `delete`, retains action and cleanup diagnostics, and asserts all four outcome combinations, continued cleanup, empty/missing inputs, and scope/input preservation. The upstream deletion example was source-reviewed only; its root-relative operations were not executed. No symbol inventory or external-package coverage changed.

## Semantic recipes

Additional behavioral examples are available in the [official Arturo unit tests](https://github.com/arturo-lang/arturo/tree/master/tests/unitt).

The focused completion pass also asserts input preservation on success/failure, copied nested updates, empty iterator/dictionary/text behavior, and local empty/missing-file handling. Specific test-file links in each reference provide optional topic-level examples; they are not fetched by the smoke suite.

Reviewed 2026-10-30 against the [official language guide](https://arturo-lang.io/documentation/language), relevant official library entries, and the [text reference](https://arturo-lang.io/llms.txt). Language, collections, math, and scripting references record their specific sources and limits. Original offline assertions cover evaluation and arity, function results, scope and nested mutation, empty inputs, numeric conversion, Unicode, regex escaping, and CLI count validation. Verified on Arturo 0.10.0 Arizona Bark, amd64/Linux through the expanded smoke suite. Historical metadata and fragment-execution claims below remain separate from these assertions. No external package or upstream example collection was downloaded or executed for these recipes.

## CI guidance

Reviewed 2026-10-30 using the GitHub CLI against [setup-arturo v2](https://github.com/arturo-lang/setup-arturo/tree/59c9867a8c8564f0ad1cd4d1960e9fddd623c5b7), [bundler v2](https://github.com/arturo-lang/bundler/tree/856568f0f4c5baf6ee61e9a963abacda3dd4e2d9), and [Unitt v3.1.1](https://github.com/RickBarretto/unitt/tree/v3.1.1). The independently installable arturo-testing skill includes workflow and testing references plus retained MIT notices. Action source was checked alongside README examples, especially archive upload versus release publication and version inputs. Workflow examples are source-derived; local validation does not execute GitHub Actions, download Unitt, or build application binaries.

## External package skills

Reviewed 2026-10-29 against the official package pages and linked upstream documentation or release sources for schema, climax, validator, claude, optionally, artsembly, grafito, html, lanx, mathjax, mermaid, mimetypes, mwiki, peregrino, progressive, recase, states, tabular, tasks, unidecode, and unitt. Each package reference under its owning shared skill records its specific source links and reviewed release where available. The README maps packages to their independently installable owners. HTML guidance also follows its tagged implementation and element tests because the registry README does not explain the DSL.

These are curated package guides, not additional standard-library coverage. Package snippets are documentation/source-derived and are explicitly distinguished from runtime verification. The default checks validate skill metadata, portable links, formatting, and existing offline programs; they do not install or execute external packages. Refresh package APIs against the release used by the target project, especially experimental packages and wrappers whose remote services or browser dependencies may change.

Package guidance reviewed 2026-10-29 against [pkgr.art](https://pkgr.art/), the [registry README](https://github.com/arturo-lang/pkgr.art), its [package list](https://github.com/arturo-lang/pkgr.art/blob/main/packages/list.art), [Core/import](https://arturo-lang.io/documentation/library/core/import/), and the [CLI reference](https://arturo-lang.io/documentation/command-line/). Registry entry syntax was checked against the live raw package list. Local package imports are smoke-tested offline; registry downloads, release creation, and publishing are not executed by validation.

Reviewed on 2026-10-28:

- Language and standard library: https://arturo-lang.io/llms.txt
- Example repository: https://github.com/arturo-lang/examples
- Example revision: `60e7b92242e39fccdb764c505bb289e3a1e3d391`
- Smoke verification: Arturo 0.10.0 Arizona Bark (amd64/linux).
- Portable discovery and CLI: https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md
- Installation options: https://github.com/vercel-labs/skills/blob/main/docs/commands.md

The library's prose and smoke examples are original summaries and adaptations. Upstream examples are linked rather than vendored. Paths containing `%2F` are literal upstream filenames; encode `%` as `%25` when constructing browser URLs. Do not treat `src/.drafts` as verified examples. A `.res` companion provides useful expected output but does not establish compatibility with every interpreter version.

## Standard-library catalogue

Reviewed 2026-10-29 against the [official library index](https://arturo-lang.io/documentation/library) and text reference. The [coverage map](STDLIB.md) and [source inventory](stdlib.json) record all 26 modules, 521 entries, ownership, source digest, and runtime. Names include functions, predicates, and constants. Per-function URLs were taken from the live index, including its lowercase and question-mark-to-hyphen slugs.

Selection guides condense and adapt upstream descriptions and examples, with attribution to the Arturo project and its [CC BY 4.0 documentation license](https://creativecommons.org/licenses/by/4.0/). They intentionally defer signatures to `inspect info.get` on the installed runtime. Existing language and workflow references remain the place for deeper semantics.

All 521 names passed metadata inspection on Arturo 0.10.0 Arizona Bark, amd64/Linux. Separately, 418 bounded table fragments across 17 modules completed with exit status zero and no stderr; this checks execution, not every output or edge case. Smoke programs assert representative results, including in-memory SQL. GUI, network, shell execution, termination, persistent stores, and archive operations were not run as catalogue probes. References distinguish these documentation-only effects from executed checks.

`bun run check` verifies that the recorded inventory and module tables agree. `bun run stdlib:inspect` checks metadata availability without invoking target APIs. When refreshing, compare the live module/symbol inventory as well as updating the source digest; a passing local coverage check only proves agreement with the checked-in snapshot, not freshness against upstream.

To refresh, read the live reference sections used by the affected skill, inspect relevant examples at a recorded commit, update that skill's guidance and source links, and run repository validation and smoke checks. Record the interpreter version used for verification. Do not execute the whole upstream collection: some examples use network access, files, interactive input, or expensive computations.

## External package licensing

Authors, upstream copyright statements, and license texts were checked on 2026-10-30 at the revisions listed in [third-party notices](THIRD-PARTY-NOTICES.md). Each affected skill includes its own notices so installations remain self-contained. Upstream-derived snippets retain upstream terms; original contributions use this repository’s documented license split. Tasks API guidance remains reviewed against v1.0.0; its MIT license is recorded at upstream commit `6cd03b031c2f037ed39df675064b897960addbe2`, which added the license after that tag. Refresh license notices alongside API guidance when changing reviewed revisions.

## Coverage maintenance

Use [the roadmap](ROADMAP.md), [coverage baseline](COVERAGE.md), and [editorial templates](templates/skill.md). Update coverage evidence with content changes. Verify interpreter changes, upstream API/package revisions, and reported discrepancies against official sources and minimal reproducers. Preserve historical review dates; distinguish source review, execution, and asserted results. The recorded baseline is Arturo 0.10.0 Linux amd64; other combinations remain unverified. Hosted runtime CI results must be observed before claiming they passed.

## Runtime CI installation

Runtime CI installs Ubuntu 24.04 GUI and numeric runtime dependencies before calling [setup-arturo at the reviewed revision](https://github.com/arturo-lang/setup-arturo/blob/59c9867a8c8564f0ad1cd4d1960e9fddd623c5b7/action.yml). It explicitly uses `do: fetch`, `from: stable`, and `mode: full`. The stable channel selects the latest official release; this action revision does not expose a release-version input. CI prints the installed version before running smoke checks. The recorded local verification baseline remains Arturo 0.10.0 Linux amd64, distinct from the moving CI channel.

The previous source build failed with Homebrew Nim 2.4.0 (`GC_Strategy` undefined in mimalloc). The action's compile path installs floating Homebrew Nim even if another compiler is preinstalled. Fetch mode avoids that compilation path. Runtime dependencies are installed before setup; smoke checks remain offline and headless. Hosted execution still requires a successful GitHub run.

## Project organization and integration workflows

Reviewed and locally asserted 2026-10-30 on Arturo 0.10.0 Arizona Bark, amd64/Linux. New independently installable references in language, scripting, and networking link their official API sources and record limitations. Smoke now includes multi-file loading from an unrelated working directory, local package namespace isolation, CLI argument validation, file failures/cleanup, fixed leap-day conversion, in-memory SQLite failures, and offline HTTP response/JSON fixtures. Live HTTP is not exercised.

The separate manual package lane selects `import.version:3.1.1 "unitt"!`, without `.min`, `.latest`, or `.lean`. Reviewed [Unitt entry source](https://github.com/RickBarretto/unitt/blob/6d1fb278d2707d4ca0718271f76c266e6ecf2ff1/src/unitt.art), [metadata](https://github.com/RickBarretto/unitt/blob/6d1fb278d2707d4ca0718271f76c266e6ecf2ff1/info.art), and the v3.1.1 tag resolving to that commit. Metadata declares no package dependencies. Existing testing/CI skills retain Unitt's MIT notices; runner fixtures are original calls to its API. The lane checks both successful reporting and intentional assertion failure, with a completion marker preventing an import failure from passing the negative case. Hosted execution remains unobserved until the manual workflow runs.

Local opt-in lane executed 2026-10-30 on Arturo 0.10.0 Linux amd64: Unitt 3.1.1 downloaded successfully; both fixtures passed their runner checks (passing suite exits 0, intentional failure exits nonzero). Temporary output was removed; the exact-version package cache was retained. Default offline checks remain independent of that cache.

Symbolic style guidance now prefers `$`, `./`, `??`, `?`, `->`, `@`, and `#`, with parameter contracts and fail-fast `ensure`. The language basics assert conditional selection, eager coalescing (including false/null fallback and zero preservation), evaluated arrays, dictionary/color distinction, and rejection of invalid typed arguments on Arturo 0.10.0 Linux amd64. Existing multi-file, CLI, and response smoke cases assert the updated symbolic forms.

The language [symbol reference](skills/arturo-language/references/symbols.md) maps all 43 aliases in the official library symbol index, reviewed 2026-10-30. Their target names and prefix/infix positions were asserted with `info.get` on Arturo 0.10.0 Linux amd64. This metadata check does not execute all operations or establish their output correctness. The reference distinguishes library aliases from terminal-expression syntax and records lookalike pitfalls.

## Named-color catalog

Reviewed 2026-10-30: the 578-name `colorNames` table in [vcolor.nim, lines 620–1199](https://github.com/arturo-lang/arturo/blob/4e549e105c54af2e250381d578474b9064d9d4d2/src/vm/values/custom/vcolor.nim#L620-L1199). The [math reference](skills/arturo-math/references/colors.md#named-colors) preserves every spelling and groups native color literals by initial;

Task #3 review follow-up, 2026-10-30: the filesystem and database examples now force errors to escape their action blocks, then assert cleanup after the workflow propagates the error. SQLite closure is recorded only after `close` returns; no closed handle is queried. Verified offline on Arturo 0.10.0 Linux amd64. The Unitt 3.1.1 negative fixture was also executed: exit 1, one reported failed assertion, the terminal failure message, and empty stderr. The runner enforces this result, and Bun regressions reject reporter crashes and unrelated failures.

## Networking consolidation

Consolidated the Net selection guide into the [HTTP/JSON reference](skills/arturo-networking/references/http-json.md), and runtime inspection guidance into the [networking entry point](skills/arturo-networking/SKILL.md). Sockets and Claude remain separate references. Preserved source links, historical review dates, licensing, and offline examples. Rechecked the official [Net](https://arturo-lang.io/documentation/library/net/) and [Sockets](https://arturo-lang.io/documentation/library/sockets/) indexes on 2026-10-30; this editorial consolidation adds no live-network verification or symbol coverage.
