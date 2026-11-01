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
