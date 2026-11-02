# ADR 007 — Discovery-first Arturo guidance



Date: 2026-11-01. Source: [PR #20](https://github.com/arturo-lang/skills/pull/20). Baseline: `5ee2d7b`; implementation snapshot: `aa0226a`.

This is a historical decision and evidence record, not a current progress report. Measurements, verification and outstanding work below describe the state on this date; subsequent results belong in new records or evaluation artifacts.

## Context and decision

The suite had ten independently installable skills, repeated runtime instructions and routine API catalogs. Prefer installed `info.get` metadata and bounded probes; retain non-obvious semantics and versioned package guidance in conditional references. Retain the ten-skill layout for this pass rather than consolidating without behavioral evidence. The [same-day consolidation decision](2026-11-01-single-arturo-skill.md) subsequently changed that architecture at the user's request.

The audit preserved language, standard-library, package and domain coverage. The [recorded coverage ledger](https://github.com/arturo-lang/skills/blob/aa0226a/evals/coverage.json) identifies the audited references, sources, catalog symbols and examples.

## Measured changes

| Context source                             |  Before |   After | Reduction |
| ------------------------------------------ | ------: | ------: | --------: |
| Ten entry points, words including metadata |   2,483 |   1,711 |     31.1% |
| Ten entry points, UTF-8 bytes              |  21,235 |  15,262 |     28.1% |
| References, words including metadata       |  22,033 |  15,545 |     29.4% |
| References, UTF-8 bytes                    | 242,444 | 134,989 |     44.3% |

These are document measurements, not model token savings. The reference count grows from 56 to 58: the named-color catalog is separated from operations, and HTML's incompatible prerelease gets a separate guide. All original reference paths and runnable examples remain available. Reproduce measurements with `bun run context:stats`; the recorded comparison is [context-baseline.json at the implementation snapshot](https://github.com/arturo-lang/skills/blob/aa0226a/evals/context-baseline.json).

Routine API tables now point to official module discovery and installed `info.get` signatures. Semantic recipes, observed limitations, aliases/lookalikes, all external-package guides, licensing and historical review dates remain. A compact introspection recipe remains local to each skill so no skill requires a sibling. Reference loading is conditional rather than a fixed first step. Unknown-name discovery uses official module links or a filtered runtime symbol-name search, rather than dumping all metadata.

## Architecture and activation

- Language owns evaluation, scope, mutation, types, local loading and language-oriented DSLs. Package management activates for discovery/acquisition/versioning/publication, not every known package import.
- Web owns HTML, Lanx, MediaWiki and webviews. Networking owns HTTP/JSON, built-in serving and sockets. A plain Lanx preview need not load networking.
- Validation owns application data contracts. Testing owns project runners, benchmarks and CI. Small `ensure` probes do not automatically require project-testing guidance.
- Debugging activates for observed failures, rather than every introspection call. Collections/math/scripting retain their task domains, with scripting's specialized reference fan-out behind conditional links.

The audit did not establish a behavioral benefit from consolidation. It could broaden activation and make independent installations larger. Reconsider only after repeated task failures survive routing edits and a prototype improves total task cost without correctness loss. The optional [consumer routing example](../../templates/consumer-routing.md) is outside distributed skills and outside the default benchmark.

## Correctness and issue evidence

| Issue                                                  | Implementation/evidence                                                                                                                             | Remaining acceptance work                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [#10](https://github.com/arturo-lang/skills/issues/10) | Bun Responses adapter; 20 tasks; none/automatic/explicit conditions; selection, execution, traces and human compliance rubrics                      | Three live Sol Low repetitions per condition/revision; no API key available during the recorded evaluation  |
| [#11](https://github.com/arturo-lang/skills/issues/11) | Native paths/modern syntax preserved; native/direct pass, assertion failure, restored pass, uncaught exception and empty discovery verified locally | Agent compliance and clean hosted execution                                                                 |
| [#12](https://github.com/arturo-lang/skills/issues/12) | Source-reviewed action guidance adds package executable PATH; prebuilt selection and archive-label distinctions retained                            | Observe a clean hosted passing job and deliberately failing job; do not claim this from local/source checks |
| [#13](https://github.com/arturo-lang/skills/issues/13) | Separate 0.0.4/1.0.0-rc.1 guidance and notices; local source assertions cover escaping behavior, composition, raw content and built-in availability | Registry acquisition/browser behavior; repeated agent tasks                                                 |
| [#14](https://github.com/arturo-lang/skills/issues/14) | Targeted Lanx/lynx clarification guidance; local Lanx 0.2.0 HTML/binary/404/shutdown integration passes                                             | Repeated agent clarification scenario                                                                       |
| [#15](https://github.com/arturo-lang/skills/issues/15) | Typed numeric `$` contract checked; native loop-generated assertion totals verified; case/file/assertion distinctions retained                      | Agent formatting/reporting compliance                                                                       |
| [#16](https://github.com/arturo-lang/skills/issues/16) | Optional portable routing template and boundary scenarios; ten-skill discovery passes                                                               | Validate substituted paths in each consuming repository and observe selection                               |

Schema 0.3.0 source confirms `conform` returns a valid coerced copy or null; diagnostics are obtained by checking the coerced value. The contradictory entry-point claim was corrected without claiming package execution.

Unitt 3.1.1 launches native tests as standalone child scripts with `--filename:`. `standalone?` alone does not suppress direct reporting there; reporting expects dictionary storage and fails on native file-backed storage. The guard now also excludes that marker. The pinned lane reproduced the prior failure, then verified pass/fail/restored behavior. It also characterizes an upstream limitation: uncaught native errors print a diagnostic but exit zero on Arturo 0.10.0; empty discovery raises `No test found!` and exits 1. Neither diagnostic counts as completed assertions.

HTML checks used reviewed tagged single-file sources without bundling package code. SHA-256 values:

- 0.0.4: `5a699b2c10cdf736c2d592962498e2908b3ee8781e570c52bd58df6e5db838fa`
- 1.0.0-rc.1: `4d4b8e381fabbbaf02bc96fc082cb2f3fdbc7ce3a6467b7553302aa107af3af1`

These identify supplied source bytes, not immutable registry contents or dependencies. The Lanx check reused an installed 0.2.0 cache and MIMEtypes 1.0.0; it uses a loopback client without asserting loopback-only server binding. It is not an exact dependency lock.

## Consequences and evaluation criteria

The [evaluation instructions](../../evals/README.md) specify isolated workspaces, fixed held-out checks, three repetitions, model/effort/version evidence, all-attempt accounting and human review. Nine checker scenarios have passing and deliberately failing fixtures. Offline API/host tests exercise request configuration, denied paths/symlinks, no-skill access, selection classification, bounded output and deadlines. Linux bubblewrap checks verify execution without host home/repository/resolver mounts.

As of 2026-11-01, live model evaluation had not run. Thus this record asserts no selection, reliability, latency or model-token improvement is asserted. Targets remain 25% less median skill/reference context and 15% less median total input, without more median retries or correctness/compliance regressions. Raw API usage measures cumulative total input/output/reasoning/cached tokens; category bytes identify loading sources but require separate token counting to establish a category-token target.

The principal risks are insufficient language foundations, incomplete package introspection, missed activation and discovery output/retries consuming the saved context. Retain the smallest useful local guidance when a task demonstrates a regression. Hosted CI, GUI and live-agent results remain separate from repository tests. Code-owner investigation and approval are required before merge.
