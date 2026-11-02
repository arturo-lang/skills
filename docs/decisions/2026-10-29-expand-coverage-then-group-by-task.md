# ADR 002 — Expand coverage, then group by task

Decision date: 2026-10-29. Recorded retrospectively: 2026-11-01. Evidence: [2339211](https://github.com/arturo-lang/skills/commit/2339211645c2ee2945cffc848dbe14057195000f), [bccd48a](https://github.com/arturo-lang/skills/commit/bccd48ae9be667697d1bfb611454068b5b89d9ea), [2ce8339](https://github.com/arturo-lang/skills/commit/2ce833975927cb8eb42ae40d894999e6cefc6ff6), [bbe5808](https://github.com/arturo-lang/skills/commit/bbe58083d7c12e794c64a827698857d9d3bf34ab), [0a431c4](https://github.com/arturo-lang/skills/commit/0a431c46edfa80bf69ae40e2c123fed24f30ba6c), [d326cd5](https://github.com/arturo-lang/skills/commit/d326cd57df8d9b560e6bf6c59db0798d28c5e616).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

The initial five skills left much of the standard library and package ecosystem outside explicit guidance. The first roadmap proposed focused skills, references and broader example coverage before consolidation.

## Decision and evidence

Expand the candidate coverage before deciding its final packaging. The standard-library pass introduced a coverage map and module-specific references; the tree at `bccd48a` had 13 skill entry points. `2ce8339` grouped related modules into six task domains while retaining the module references. Package discovery/management was added separately; the tree at `0a431c4` then had 29 entry points, including package-specific skills. `d326cd5` moved package guidance into files under owning domains and reduced the entry points to ten. These counts were reconstructed with `git ls-tree` at the cited commits, not taken from the present tree.

## Consequences

Broad exploration and a small activation surface are separate concerns: package files and domain references can preserve discoverability without one installed skill per API or package. An exploratory inventory is not an exhaustive correctness claim. The historical counts do not prove all earlier content survived every later edit, and the commit metadata does not identify which model/effort performed these stages. The final single-entry-point choice is recorded separately in [ADR 008](2026-11-01-single-arturo-skill.md).
