# Arturo skills roadmap

Progress follows evidence and dependencies rather than calendar dates. Existing skills are starting points, not proof of complete task coverage.

## 1. Verification and inventory — done

Editorial templates, offline smoke CI, and attribution checks are in place. Skills link to the [official Arturo examples](https://github.com/arturo-lang/examples) for task-relevant patterns; a full upstream example inventory is not required.

Historical fragment execution remains distinct from asserted correctness.

## 2. Semantic depth and practical recipes — done

Expand existing language, collections, math, and scripting guidance before splitting skills. Prioritize arity/grouping, function results, iterator scope, copying and nested mutation, empty inputs, conversions, Unicode, and regex escaping. Add contrasting programs and explained adaptations.

Exit: each supported task has a normal case, relevant failure or boundary cases, and assertions for outputs and scope/mutation effects. Record remaining gaps explicitly.

Completed: the priority recipes above have normal and boundary/failure cases, result assertions, and relevant scope/mutation checks in the language, collections, math, and scripting examples. References record remaining gaps, including resource copying, exceptional iterator cleanup, grapheme handling, and numeric precision limits. This completes the focused recipe pass, not exhaustive verification of every API.

## 3. Project organization and integrations — current priority

Teach multi-file loading and reusable logic early. Deepen HTTP/JSON, structured data, filesystem, CLI, dates, and database lifecycle guidance. Testing, CI, validation, web, and packages already exist; expand their incomplete workflows rather than recreating them.

Exit: worked workflows cover success, malformed inputs, operational failure, and cleanup. Add a separate opt-in pinned-package verification lane; preserve offline default checks.

Implementation evidence (2026-10-30): multi-file and integration workflows have offline examples in their owning skills; the [manual package lane](CONTRIBUTING.md#optional-package-verification) checks exact Unitt 3.1.1 separately from offline defaults. Coverage limits and execution evidence remain explicit in the linked references.

## 4. Early agent evaluation

Build a Bun runner with one host adapter outside distributed skills. Start with selection, implementation, explanation, debugging, and scope/mutation tasks. Compare with/without skills, keep held-out answers outside workspaces, and execute generated programs with isolation, resource limits, and network disabled.

Exit: reproducible baseline separates selection, guidance, agent, and infrastructure failures. Use three repeated runs for release measurements and human review for explanations. Repair failures before expansion; add a second host for portability.

## 5. Evidence-driven expansion and maintenance

Use task failures and documented gaps to prioritize focused functions, types, control-flow, mutation, strings, regex, filesystem, CLI, projects, refactoring, performance, and reflection skills. Require distinct activation tasks before splitting. Research unsupported capabilities rather than publishing assumed APIs.

Exit: standalone discovery and use pass, references remain navigable, metadata/context size is reviewed, and compatibility claims have recorded evidence.

First focused improvement (2026-10-30): existing scripting guidance now covers [filesystem cleanup diagnostics](skills/arturo/references/scripting-workflows.md#preserve-action-and-cleanup-failures), prompted by the lifecycle coverage gap and a reproducer showing that `delete` can return normally without removing a path. The independently installable skill adds bounded offline assertions and keeps activation metadata unchanged. This is one verified workflow improvement; broader expansion and roadmap exit criteria remain open.

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

Early-evaluation implementation (2026-11-01): [the Bun harness](evals/README.md) now defines 20 tasks and no-skill/automatic/explicit conditions for GPT-6.1 Sol Low. Offline adapter/host tests and nine positive/negative grader pairs pass; live repeated model runs remain pending API access. The [optimization audit](docs/sol-low-optimization.md) separates document-size reductions from unmeasured token/reliability targets. This does not satisfy the behavioral-evaluation exit criterion yet.

Single-skill consolidation (2026-11-01): at the user's request, the ten installation entry points are replaced by `arturo`. All package guides remain separate reference files; shared runtime guidance is centralized. See [the migration and evidence](docs/skill-consolidation.md). Evaluation keeps the same task prompts/checks and translates routing expectations for the installed layout; model-level results remain pending API access.
