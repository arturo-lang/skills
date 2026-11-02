# Minimal smoke continuation



The user authorized continuation after the first bounded language attempt on
2026-11-01. No language rerun, API fallback, or delegated agent was used.
Model/runtime settings remain GPT-6.1 Sol/low, Codex 0.166.0, and Arturo 0.10.0.
These are small usability probes, not additions to the historical comparison
matrix. Previous archives and raw reports are unchanged.

| Capability | Result across the initial attempt and continuation                                                                                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language   | Final artifact passes the unchanged held-out assertions after a budget-stopped session; successful `info.get 'sort` lookup.                                                                                       |
| Testing    | Passed: real Unitt reporter executed two loop-generated assertions, reporting two passed and zero failed/skipped.                                                                                                 |
| Packages   | Incomplete: automatic selection loaded Arturo/package-management guidance, then cache exploration reached the token budget before any implementation or import. No correctness claim.                             |
| Discovery  | Passed once with native Codex discovery: automatically read Arturo, package-index, and package-management guidance; named Lanx and asked Lynx versus Lanx before acquisition. No installation or import occurred. |

## Scope and execution

Testing used a standalone script, not a native-discovery project. Package
testing asked for one case conversion using an available external package,
not Unicode/collision coverage. These reduced prompts are retained verbatim.
The temporary harness retains historical scenario IDs and rubric labels;
those labels do not imply that the larger native-project or text-package
rubrics passed. No historical attempt is replaced by these results.

The execution cases used automatic harness inventory and the existing
read-only reviewed package cache. Its fingerprint is in the package attempt's
metadata. The package session stopped after 13.24 seconds at 12,704 uncached
input tokens. No retry was launched. The required execution preflight passed
file write/read and actual Arturo execution. The Unitt case reused that
verified transport and cache without another model-based preflight.

Native discovery used a temporary Codex home with the current skill copied
under `.agents/skills/arturo`. Host skill discovery and standard shell tools
were enabled, with no dynamic tools or injected harness inventory. Plugins,
apps, delegation, and web search were disabled. The prompt did not name Lanx
or request a skill. The trace records two shell commands reading the entry and
package references. It did not read `lanx.md`; the package index supplied the
candidate. This verifies the observed clarification, not Lanx server execution
or reliable selection across repetitions.

Each session retained the 90-second deadline and usage-event stop thresholds
of 100,000 cumulative input, 12,000 uncached input, and 3,000 output tokens.
The execution transport allowed at most 16 bounded tool calls. That counter
does not count native shell calls; the native case made two. Usage-event
delivery can overshoot token thresholds. Outer-sandbox startup failures made
no model calls; authorized invocations supplied the recorded results.

## Continuation usage

| Session                                  |   Input | Cached input | Uncached input | Output |
| ---------------------------------------- | ------: | -----------: | -------------: | -----: |
| Native discovery                         |  24,967 |       14,976 |          9,991 |    235 |
| Execution preflight                      |  13,662 |        6,656 |          7,006 |     93 |
| Packages                                 |  38,304 |       25,600 |         12,704 |    175 |
| Unitt                                    |  40,609 |       34,944 |          5,665 |    350 |
| Continuation total                       | 117,542 |       82,176 |         35,366 |    853 |
| Including initial language run/preflight | 192,694 |      135,168 |         57,526 |  1,608 |

These counts do not establish subscription usage percentages.

## Reporting fix and retained evidence

`evals/usage.ts` now reads the latest cumulative subscription usage event,
including when a session stops before returning a response. Completed response
usage is not added again. Missing events mark usage unavailable. API response
aggregation remains separate. A regression test covers stopped/completed
sessions, missing usage, and API aggregation; the earlier stopped trace also
recovers its original nonzero counts without a model call. The new package
attempt's raw report correctly records usage despite termination.

`continuation.tar.gz` preserves prompts, events, reports, generated Unitt
script, skill snapshot, and the exact temporary runner sources. Its adjacent
SHA-256 file checks archive bytes. Authentication homes are not included.
The earlier README describes the initial attempt, including the reporting
bug before this fix.

The standalone Unitt trace has exit 0, empty stderr, and an executed two-
assertion summary. All 29 local tests and all 23 Arturo example smoke
invocations passed after the reporting fix. `bun run check` passed.

The minimal suite remains incomplete because the package case did not finish
within its budget. Existing native Unitt evidence remains valid separately;
the new standalone script does not claim its native project checks. No skill
guidance was changed. #10/#14 and code-owner approval remain pending; #12's
separate findings are unaffected. No broader campaign or automatic retry was
started.
