# Arturo guidance roadmap

Maintain language/API coverage while improving task completion and context efficiency. Use the issue tracker and pull requests for active status, [decision records](DECISIONS.md) for dated rationale and evidence, and this roadmap for durable evaluation criteria.

## Source accuracy and portability

Investigate official references and examples, preserve attribution and version boundaries, and keep the distributed skill self-contained. Distinguish source review, metadata inspection, execution and asserted results. [Contributor checks](CONTRIBUTING.md#local-checks) validate packaging; they do not prove language/API correctness.

## Semantic depth

Prioritize arity/grouping, stack results, scope/copying/mutation, empty inputs, conversions, Unicode and regex where agent mistakes recur. Use contrasting bounded programs and assertions rather than exhaustive API catalogs. Record unsupported behavior and evidence limits with the relevant reference.

## Practical workflows

Cover project loading, HTTP/JSON, structured data, filesystem/CLI, dates and database lifecycle through task-specific references. Include normal, invalid, operational-failure and cleanup cases where they change behavior. Keep default checks offline and external integration checks separate.

## Behavioral evaluation

Use [the evaluation workflow](evals/README.md) to separate activation, reference selection, guidance, compliance, correctness and infrastructure failures. Keep hidden checks outside agent workspaces; compare identical tasks and environments with recorded model settings, revisions and all attempts. Require observed evidence before claiming completion or performance improvements.

## Verification priorities

Use these acceptance gates to guide the next evidence-gathering work; the linked issues track active status. Implemented guidance and local checks do not establish agent compliance or hosted integration behavior.

- [Selection and instruction compliance (#10)](https://github.com/arturo-lang/skills/issues/10): run each release scenario three times in no-skill, automatic-selection and explicit-reference conditions against recorded baseline and candidate revisions. Preserve model settings, runtime/package versions, traces, all attempts and held-out results. Review native testing, CI repair, package ambiguity, typed functions, HTML composition and assertion reporting separately before claiming reliability or context improvements.
- [Hosted CI verification (#12)](https://github.com/arturo-lang/skills/issues/12): observe a clean hosted passing job and a deliberately failing assertion job using the documented Arturo/Unitt workflow. Record action revision, runner, runtime, package executable path, executed assertion totals and job URLs. Restore the passing tests. Repository packaging/runtime smoke jobs alone do not verify this application-testing workflow.
- [Lanx clarification behavior (#14)](https://github.com/arturo-lang/skills/issues/14): observe the agent investigate an ambiguous “lynx” request in Arturo preview context and ask whether Lanx is intended before acquisition. Use #10's repeated evaluation procedure. Retain the separate opt-in HTML, binary-asset, missing-path and shutdown integration checks; successful server responses do not establish clarification behavior.

Native Unitt lifecycle guidance, versioned HTML guidance, typed-function/formatting and assertion-reporting guidance, and the optional consumer-routing template have implementation and local verification evidence in [ADR 007](docs/decisions/2026-11-01-discovery-first-guidance.md). The [single-skill migration](docs/decisions/2026-11-01-single-arturo-skill.md) and [formatting decision](docs/decisions/2026-11-01-expressive-arturo-formatting.md) describe subsequent changes. Keep broader behavioral evaluation under #10 rather than treating these delivered documentation scopes as evidence of live-agent success. Consumer repositories must substitute and check their own routing paths.

## Evidence-driven maintenance

Use demonstrated failures to prioritize changes. Measure the whole workflow, including discovery output and retries. Keep references navigable and packages independently documented. Record architecture changes in dated decisions instead of rewriting historical measurements or conclusions.

## Research basis

The following language libraries informed this roadmap. Their structures provide precedents, not proof that the same approaches will work for Arturo. Research reviewed on 2026-10-29.

| Library                                                                                                                                    | Pattern to adapt                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [Official MoonBit guide](https://github.com/moonbitlang/moonbit-agent-guide/blob/main/moonbit-agent-guide/SKILL.md)                        | Explain project conventions, inspect toolchain versions, and verify executable documentation.                               |
| [Community MoonBit skills](https://github.com/hyfdev/moonbit-agent-skills)                                                                 | Separate language and toolchain guidance, track verification dates, and evaluate activation separately from task success.   |
| [Roc language skill](https://github.com/rickhull/roc-init/blob/master/SKILL.md)                                                            | Address stale documentation and incorrect remembered APIs; provide tutorials and a dedicated gotchas reference.             |
| [Zig skills](https://github.com/zigcc/skills/blob/main/zig-0-16/SKILL.md)                                                                  | State version boundaries and explain incompatible API changes through concrete comparisons.                                 |
| [Go skills](https://github.com/samber/cc-skills-golang)                                                                                    | Organize broad coverage into focused language, engineering, troubleshooting, and library skills; track context size.        |
| [Rust skill library](https://github.com/full-stack-skills/rust-skills)                                                                     | Separate semantics, standard-library selection, and example-driven patterns; accompany references with executable examples. |
| [Apollo Rust guidance](https://github.com/apollographql/skills/blob/main/skills/rust-best-practices/SKILL.md)                              | Distill an authoritative handbook into a concise entry point and topic references.                                          |
| [Kotlin skills](https://github.com/Kotlin/kotlin-agent-skills)                                                                             | Give skills clear functional purposes, including tooling and migration workflows.                                           |
| [SwiftUI skill](https://github.com/twostraws/SwiftUI-Agent-Skill)                                                                          | Target recurring agent mistakes, surprising behavior, and outdated APIs while keeping instructions concise.                 |
| [Python development skills](https://github.com/wshobson/agents/blob/main/plugins/python-development/skills/python-error-handling/SKILL.md) | Teach specific tasks through patterns, failure cases, worked examples, and deeper references.                               |

Combine broad task coverage with explicit language foundations. Assume agents need Arturo fundamentals explained; do not rely on knowledge they may have for established languages. Preserve this repository's requirement that every skill installs independently, without required sibling references.
