# ADR 004 — Prefer semantic evidence and evaluate agents early

Copyright © RickBarretto, Arturo programming language.

Decision date: 2026-10-30. Recorded retrospectively: 2026-11-01. Evidence: [4e82e08](https://github.com/arturo-lang/skills/commit/4e82e08e29b96e42e86e14f52b5c1024a1b067b9), [3b87f02](https://github.com/arturo-lang/skills/commit/3b87f02a8e5c0010119952d6117f31168c179340), [e385559](https://github.com/arturo-lang/skills/commit/e3855591f86ba4984ee7ca6fb4533f143aaa4c30), [d46e7f7](https://github.com/arturo-lang/skills/commit/d46e7f73a2dfc58d58e5d1a68f6a5b899d0f0626).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

The first roadmap spread expansion across calendar phases and left substantial model evaluation until the end. A broad catalog and examples that merely executed could not establish semantic correctness or agent usefulness.

## Decision and evidence

Replace calendar-driven expansion with evidence/dependency-driven priorities and move agent evaluation earlier (`4e82e08`). Deepen existing guidance before creating more activation boundaries. `3b87f02` added contrasting assertions for arity, function stack results, iterator restoration and nested shared/copy behavior; `e385559` linked official unit tests as behavioral references. `d46e7f7` marked the focused semantic-recipe pass complete while explicitly retaining unverified gaps, rather than claiming exhaustive API verification.

## Consequences

Source review, signature metadata, execution and asserted behavior remain distinct evidence levels. Normal results, relevant failures and scope/mutation effects need observation where they affect a claim. Known gaps include resource copying and exceptional iterator unwinding; examples do not establish every form of a related API. Coverage should be judged through task outcomes, not the number of skills or examples. The later evaluator implementation is recorded in [ADR 007](2026-11-01-discovery-first-guidance.md).
