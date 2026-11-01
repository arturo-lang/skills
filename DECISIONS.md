# Decision log

Copyright © RickBarretto, Arturo programming language.

Decision records capture context, the chosen approach, consequences and evidence as of a specific date. They are historical records, not live inventories or status dashboards. Add a new dated record when a decision changes; refer back to earlier records without refreshing their measurements or verification claims. Mark factual corrections explicitly. A recorded implementation does not replace required code-owner approval.

Usage and contributor guides describe stable procedures. Issues, PR checks and evaluation artifacts carry active status and individual run results.

Historical backfills below were recorded on 2026-11-01 from the cited commit diffs and contemporary documentation. Their dates identify when the implemented choices appeared, using the commits' recorded timezone; they do not imply contemporaneous ADRs existed. IDs follow chronological decision order; same-day records follow the sequence of their cited decisions. Model/effort use is not inferred from commit authors or subjects.

| Decision date | Record                                                                                                                                    | Context                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 2026-10-28–29 | [ADR 001 — Portable skills and repository verification](docs/decisions/2026-10-28-portable-skills-and-tooling.md)                         | Self-contained distribution, Bun/Biome, runtime smoke checks and CLI discovery                 |
| 2026-10-29    | [ADR 002 — Expand coverage, then group by task](docs/decisions/2026-10-29-expand-coverage-then-group-by-task.md)                          | Standard-library/package exploration followed by fewer activation boundaries                   |
| 2026-10-30    | [ADR 003 — Preserve licensing and require owner investigation](docs/decisions/2026-10-30-licensing-and-owner-review.md)                   | Documentation/code license scopes, upstream notices and PR ownership                           |
| 2026-10-30    | [ADR 004 — Prefer semantic evidence and evaluate agents early](docs/decisions/2026-10-30-semantic-evidence-and-early-evaluation.md)       | Evidence-driven roadmap, contrasting assertions and early task evaluation                      |
| 2026-10-30    | [ADR 005 — Separate integration checks and verify failure causes](docs/decisions/2026-10-30-offline-defaults-and-failure-verification.md) | Offline defaults, opted-in packages, failure provenance and cleanup postconditions             |
| 2026-10-30    | [ADR 006 — Condense metadata and task routing](docs/decisions/2026-10-30-condense-metadata-and-reference-routing.md)                      | Provenance metadata, merged CI guidance and removal of redundant inventories                   |
| 2026-11-01    | [ADR 007 — Discovery-first Arturo guidance](docs/decisions/2026-11-01-discovery-first-guidance.md)                                        | Runtime discovery, conditional references and the initial optimization evidence                |
| 2026-11-01    | [ADR 008 — One Arturo skill with package references](docs/decisions/2026-11-01-single-arturo-skill.md)                                    | Consolidated installation/activation while keeping package guides separate                     |
| 2026-11-01    | [ADR 009 — Broad discovery with Sol Low, condensation with Sol xHigh](docs/decisions/2026-11-01-broad-discovery-then-condensation.md)     | Broad authoring search, evidence-preserving synthesis and Low regression evaluation            |
| 2026-11-01    | [ADR 010 — Prefer expressive Arturo symbols and expression blocks](docs/decisions/2026-11-01-expressive-arturo-formatting.md)             | Documented aliases, terminal-expression bodies and readable layout without changing evaluation |

Hosted execution evidence: [Unitt passing, failing and restored assertions, 2026-11-01](docs/decisions/2026-11-01-hosted-unitt-evidence.md).
