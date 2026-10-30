# Sources and maintenance

## External package skills

Reviewed 2026-10-29 against the official package pages and linked upstream documentation or release sources for schema, climax, validator, claude, optionally, artsembly, grafito, html, lanx, mathjax, mermaid, mimetypes, mwiki, peregrino, progressive, recase, rsv, states, tabular, tasks, unidecode, and unitt. Each package reference under its owning shared skill records its specific source links and reviewed release where available. The README maps packages to their independently installable owners. HTML guidance also follows its tagged implementation and element tests because the registry README does not explain the DSL.

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

Authors, upstream copyright statements, and license texts were checked on 2026-10-30 at the revisions listed in [third-party notices](THIRD-PARTY-NOTICES.md). Each affected skill includes its own notices so installations remain self-contained. Upstream-derived snippets retain upstream terms; original contributions use this repository’s documented license split. Tasks v1.0.0 has no declared license, so its examples are linked rather than reproduced. Refresh license notices alongside API guidance when changing reviewed revisions.
