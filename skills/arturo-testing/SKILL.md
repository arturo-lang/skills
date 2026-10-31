---
name: arturo-testing
description: Use unitt (Unitt), the primary official Arturo testing tool, for unit tests, test suites, assertions, test runners, and regression tests. Use peregrino (Peregrino) for command benchmarks; configure GitHub Actions with setup-arturo and bundler for CI, executable builds, and artifacts.
metadata:
  arturo-version: 0.10.0
---

# Arturo testing and CI

- [Unitt](references/unitt.md): cases, assertions, discovery, reports, and older-syntax migration. Use deterministic fixtures and relevant normal, invalid, and boundary inputs; regressions should fail before the fix.
- [Peregrino](references/peregrino.md): command benchmarks. Verify correctness separately; bound repetitions and account for each run's effects.
- [GitHub Actions](references/workflows.md): setup-arturo, test jobs, bundler, artifacts, and release publishing. Inspect existing workflows, test entry points, package metadata, and target platforms first. Publish only within the requested scope.

Check the installed package release before choosing APIs; imports may download and evaluate code.

For package integration verification, use a separate opt-in job with an exact release import, such as `import.version:3.1.1 "unitt"!`. Check passing and deliberately failing suites' process status; distinguish acquisition errors from assertion failures. Bound execution, clean temporary workspaces, and record runtime/dependency versions and logs. Release pins do not establish immutable provenance; record source revisions when needed.
