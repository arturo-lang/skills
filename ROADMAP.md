# Arturo skills roadmap

Build a substantial language skill library: more focused skills, more explained examples, deeper edge-case coverage, and a final automated evaluation and repair phase.

This roadmap assumes approximately twelve months of incremental work. Dates are indicative; each phase should become a separate implementation sub-plan with exact sources, example batches, artifacts, and acceptance cases.

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

## Library design and content standard

Organize coverage into four families:

| Family                 | Purpose                                                                 |
| ---------------------- | ----------------------------------------------------------------------- |
| Language foundations   | Evaluation, values, functions, scope, mutation, and control flow.       |
| Standard-library tasks | Collection, text, numeric, filesystem, and networking operations.       |
| Engineering workflows  | Testing, debugging, project organization, refactoring, and performance. |
| Practical recipes      | Complete solutions and adaptations of official examples.                |

Create focused skills for independently recognizable tasks. Keep closely related edge cases and recipes as references within those skills.

Every skill should contain:

- A concise entry point explaining when to use it and how to approach the task.
- A local topic index and enough Arturo semantics to use the skill alone.
- Verified forms, argument order, accepted types, attributes, and mutation behavior where relevant.
- Worked examples with expected results.
- Common mistakes, boundary conditions, and debugging advice.
- Official sources and explicit runtime-verification notes.

Every summarized upstream example should explain the problem, technique, important expressions, assumptions, expected behavior, edge cases, and adaptation opportunities. Record its source revision and distinguish source-reviewed, locally executed, and adapted-and-tested examples.

Keep detailed knowledge in navigable references rather than copying entire manuals into entry points or requiring every reference to be loaded automatically.

## Expansion sequence

### Phase A — Coverage map and editorial foundation: month 1

- Inventory the official reference and example repository at recorded revisions.
- Map each topic to an existing skill, proposed skill, or explicit deferral.
- Classify examples by concepts, practical use, difficulty, dependencies, side effects, and execution cost.
- Establish templates for skills and example summaries.
- Create a coverage catalog tracking sources, summaries, executable examples, edge cases, and verification status.
- Record the external patterns adopted or rejected.

**Exit criterion:** The backlog identifies concrete content batches and their owning skills. Every reference area has a disposition, even if it lacks a runnable example.

### Phase B — Language foundations: months 2–3

Expand `arturo-language` and introduce `arturo-types`, `arturo-functions`, `arturo-control-flow`, and `arturo-mutation`.

Keep the general language skill as the compact starting point for syntax and evaluation. Put detailed task guidance in focused skills.

Prioritize expression boundaries and arity, blocks as data, evaluated values, function results, scope, temporary iterator bindings, copying, shared storage, and intentional mutation. Use small contrasting programs and explain why each result occurs.

**Exit criterion:** Each foundational skill has normal cases, counterexamples, and executable semantic checks.

### Phase C — Everyday programming: months 4–5

Expand collections and scripting; add `arturo-strings`, `arturo-regex`, `arturo-numbers`, `arturo-filesystem`, and `arturo-cli`.

Keep scripting focused on complete automation workflows. Give filesystem and CLI tasks their own detailed guidance.

Cover empty inputs, absent keys, duplicates, bounds, invalid conversions, supported numeric distinctions, escaping, path resolution, missing files, and argument preservation. Investigate Unicode behavior rather than assuming another language's string model.

**Exit criterion:** Every skill supports several practical transformations or utilities, including relevant failure behavior.

### Phase D — Structured data and integrations: months 6–7

Deepen HTTP/JSON and add focused coverage for structured data formats documented by Arturo, external processes, supported date/time operations, and multi-file programs and reusable code.

Add server and database skills after confirming the actual APIs, runtime requirements, and bounded verification approach. Use offline fixtures for data handling and a deterministic local server for HTTP transport checks. Keep external-service examples configurable and separate from offline examples.

**Exit criterion:** Integration guidance includes successful responses, malformed inputs, operational failures, and resource cleanup where applicable.

### Phase E — Engineering and advanced language work: months 8–9

Expand debugging; add `arturo-testing`, `arturo-projects`, `arturo-refactoring`, `arturo-performance`, and `arturo-reflection`.

Cover reusable test patterns, project conventions, behavior-preserving changes, measured optimization, and inspection of unfamiliar APIs.

Investigate advanced evaluation, metaprogramming, custom types, and packaging against official sources. Publish focused skills where the supported capability and task boundary are clear.

**Exit criterion:** Guidance supports maintaining and extending programs, beyond isolated scripts.

### Phase F — Example expansion and edge-case audit: month 10

Example summarization happens throughout earlier phases; this phase completes a systematic second pass.

- Revisit the upstream inventory for uncovered patterns.
- Group related examples into short recipe collections.
- Add adaptations that change inputs or requirements.
- Review feature interactions: evaluation inside iterators, nested mutation, scope, conversions, and error recovery.
- Turn recurring mistakes into symptom–cause–correction entries.
- Resolve contradictory guidance and duplicated explanations that have drifted.

**Exit criterion:** Every skill has meaningful example breadth and an explicit edge-case inventory. Remaining gaps are documented.

### Phase G — Consolidation and usability: month 11

- Review descriptions against ordinary user task prompts.
- Check standalone installation and full-library discovery.
- Split oversized references into navigable topics.
- Verify sources, runtime notes, example registration, and local links.
- Document contributor workflows and release maintenance.
- Review total metadata and entry-point size as the library grows.

**Exit criterion:** The library is discoverable, independently usable, and maintainable without reading the entire collection.

### Phase H — Automated agent evaluation and repair: month 12

Implement a Bun-based runner with one agent-host adapter initially, then a second host for portability checks. Keep host-specific integrations outside distributed skills.

Evaluate automatic skill selection, new implementation, code explanation, debugging, refactoring, example adaptation, ports from familiar languages, and multi-step tasks combining skills.

Compare runs with and without skills under identical conditions. Include three repeated runs for release measurements, held-out tasks, and expected answers outside the agent workspace. Execute generated programs in isolated disposable workspaces with time and resource limits; disable network access by default.

Use executable checks for behavior and human review for semantic explanations. Separate discovery failures, incorrect guidance, agent mistakes, and infrastructure failures. Record task, skill, model, host, and interpreter revisions and execution results.

Reserve the final part of this phase for repairs and reruns.

**Exit criterion:** Publish reproducible results, known limitations, and a prioritized second-year backlog. Measure completion and correctness rather than inferring usefulness from skill or example counts.

## Continuous verification and defaults

Run structural checks and bounded runtime examples throughout expansion. The substantial model-backed evaluation remains at the end.

- Run `bun run check`, `bun test`, and `bun run smoke` when Arturo is available.
- Run `bun run skills:list` after changing discovery metadata or organization.
- Verify outputs, exit status, scope effects, and intended mutation where relevant.
- Keep network and expensive examples outside the default smoke suite.
- Record the interpreter version used and compatibility differences.
- Keep local references within each independently installable skill.
- Use Bun and Biome for repository tooling; preserve readable Arturo formatting manually.

The named skills are planned task boundaries. Unsupported capabilities remain documented research items rather than published guidance. Prefer useful coverage and accurate explanations over a target skill count.

Start with the coverage catalog, editorial templates, and upstream example inventory. Refine each subsequent phase into a decision-complete implementation sub-plan when its turn arrives.
