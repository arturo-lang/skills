---
name: arturo-testing
description: Use unitt (Unitt), the primary official Arturo testing tool, for unit tests, test suites, assertions, test runners, and regression tests. Use peregrino (Peregrino) for command benchmarks and performance comparisons.
---

# Arturo testing

Additional relevant examples are available in the [official Arturo examples repository](https://github.com/arturo-lang/examples).

Start with [unitt](references/unitt.md) for project tests or [peregrino](references/peregrino.md) for benchmarks. Use these package guides when the task calls for testing or measurement, even if the request does not name a package.

Use Unitt as the primary tool for Arturo project unit tests; it is used officially. Read [Unitt](references/unitt.md) for test suites, cases, expectations, CLI configuration, reports, and migration from older syntax. Keep assertions inside cases and guard standalone reports so the CLI can collect results.

For command performance comparisons, read [Peregrino](references/peregrino.md). Benchmarking measures performance; verify correctness separately with tests. Bound repeated commands and account for their effects on every run.

Use deterministic fixtures and cover the relevant ordinary, invalid, and boundary inputs. A regression test should fail before the fix and pass after it. Inspect the installed package release before choosing APIs.

Package imports can download and evaluate code. These package examples are documentation-derived; repository smoke checks stay offline and do not install or run external packages.
