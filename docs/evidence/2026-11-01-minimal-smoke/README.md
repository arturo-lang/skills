# Bounded smoke attempt

Copyright © RickBarretto, Arturo programming language.

On 2026-11-01, one new language attempt ran against revision
`74ed784e6a78e57b6911e72043348bfffe08d6ee`, using Codex 0.166.0,
GPT-6.1 Sol/low, ChatGPT authentication, and Arturo 0.10.0. No API fallback
or delegated agents were used. Existing comparison archives were unchanged.

The corrected transport preflight actually wrote/read a file and executed
Arturo. The outer sandbox initially prevented bubblewrap startup; that
invocation made no model calls. The authorized invocation passed preflight.

| Capability | New evidence                                                                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language   | Successful `info.get 'sort`; final artifact independently passes the original held-out assertions. Session stopped at its token budget before completion. |
| Testing    | Not run in this campaign. Existing native Unitt comparison remains separate evidence.                                                                     |
| Packages   | Not run in this campaign; no package acquisition claimed.                                                                                                 |
| Discovery  | Harness selected the Arturo entry for the language task. Lanx and native Codex discovery were not tested.                                                 |

## Limits and stop decision

A temporary copy of the harness limited each session to 90 seconds and 16
tool calls. Usage events triggered termination above 100,000 cumulative input,
12,000 uncached input, or 3,000 output tokens. Delivery of usage events can
overshoot these thresholds. `bounded-subscription.ts.txt` preserves the exact
temporary transport; repository harness code was unchanged.

The language session lasted 28.27 seconds and encountered repeated runtime
errors in file-loading probes. It exhausted its uncached-input budget while
investigating. The harness stopped the campaign immediately; no repeats or
remaining scenarios were launched. Deterministic local verification then
concatenated the final `solution.art` with the unchanged `on-demand-signature`
grader from `evals/scenarios.ts`: exit 0, `EVAL-PASS`. The checks cover descending
order, preservation of the input, and empty input. This establishes artifact
correctness, not successful completion of the stopped session. The repeated
probe errors alone do not establish incorrect skill guidance.

## Usage accounting

Last cumulative token events, including the required live preflight:

| Session   |  Input | Cached input | Uncached input | Output |
| --------- | -----: | -----------: | -------------: | -----: |
| Preflight | 13,662 |        6,656 |          7,006 |     95 |
| Language  | 61,490 |       46,336 |         15,154 |    660 |
| Total     | 75,152 |       52,992 |         22,160 |    755 |

These are token counts, not subscription usage percentages. The raw report
incorrectly reports zero usage for the aborted session because its aggregation
only includes completed responses. Use `thread/tokenUsage/updated` events for
the counts above; the raw report is preserved unchanged. Budget-stop usage
reporting is a harness limitation requiring a targeted fix before another
campaign.

## Retained evidence and checks

`attempt.tar.gz` contains the skill snapshot, live preflight, prompt, metadata,
events, unchanged raw report, generated artifact, and independent grader file.
Its adjacent SHA-256 file checks archive bytes. No authentication home is
included. The new evidence does not replace the 36 completed comparisons or
the 65 additional attempts in the earlier evidence directory.

`bun run check` passed. All 28 tests and all 23 Arturo smoke invocations passed;
tests required running outside the outer sandbox after an IPC `EPERM` there.
No skill guidance was changed. This is an incomplete minimal suite and does
not close #10/#14, establish native Lanx discovery, or replace owner approval.
