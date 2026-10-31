---
name: arturo-testing
description: Use unitt (Unitt), the primary official Arturo testing tool, for unit tests, test suites, assertions, test runners, and regression tests. Use peregrino (Peregrino) for command benchmarks and performance comparisons.
metadata:
  arturo-version: "0.10.0"
---

# Arturo testing

Use [Unitt](references/unitt.md) for project tests, CLI configuration, reports, and older-syntax migration. Keep assertions inside cases and guard standalone reports so the CLI can collect results.

For command performance comparisons, read [Peregrino](references/peregrino.md). Verify correctness separately from performance. Bound repeated commands and account for their effects on every run.

Use deterministic fixtures and cover the relevant ordinary, invalid, and boundary inputs. A regression test should fail before the fix and pass after it. Inspect the installed package release before choosing APIs.

Package imports can download and evaluate code.

For package integration verification, use a separate opt-in job with an exact release import, such as `import.version:3.1.1 "unitt"!` for Unitt 3.1.1. Verify both a passing suite and a deliberately failing suite's process status. Keep package acquisition failures distinct from assertion failures, bound execution time, and discard the temporary workspace afterward. An exact version selects a release; record resolved source revisions when immutable provenance is required.
