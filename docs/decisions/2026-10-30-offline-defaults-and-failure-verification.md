# ADR 005 — Separate integration checks and verify failure causes



Decision date: 2026-10-30. Recorded retrospectively: 2026-11-01. Evidence: [a790ae1](https://github.com/arturo-lang/skills/commit/a790ae1af2f0e777cf958e3cb231b1d070622b94), [b1608b1](https://github.com/arturo-lang/skills/commit/b1608b19f026871ee9a63e3e9ebf15fbca46975c), [cc5f040](https://github.com/arturo-lang/skills/commit/cc5f04060127d718bf1846f48d8050b0220374fe).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

External package acquisition and effectful workflows need execution evidence, but downloads and integration effects would make ordinary checks depend on networks and shared state. A failing process can also represent acquisition or reporter failure rather than the intended assertion failure.

## Decision and evidence

Keep the default checks offline and bounded. `a790ae1` introduced an explicitly opted-in Unitt 3.1.1 package lane, separate from default PR/push checks, with temporary workspaces and process deadlines. `b1608b1` required the intended fixture/report evidence and rejected unexpected stderr or reporter crashes. `cc5f040` added asserted cleanup postconditions and separate action/cleanup diagnostics after demonstrating that `try [delete path]` could return normally while a path remained on the recorded Arturo runtime.

## Consequences

An exact package version is not a content digest or a lock on future transitive dependencies. Expected-failure checks must distinguish their intended failure from infrastructure problems. A normal return is not enough to prove cleanup; later cleanup must still run without replacing the original error. The cited source records bounded fixtures on Arturo 0.10.0 Linux, not all permission, concurrency, symlink or abrupt-termination behavior. Native Unitt reporting findings from November 1 belong to [ADR 007](2026-11-01-discovery-first-guidance.md), not this earlier record.
