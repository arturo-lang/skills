---
name: arturo-testing
description: "Write and run Arturo project tests with Unitt, benchmark with Peregrino, or configure CI/bundling. Small ensure probes and application data validation alone do not require this skill."
metadata:
  arturo-version: 0.10.0
---

# Arturo project testing and CI

For project tests, read [Unitt](references/unitt.md) and prefer its native discovery/reporting with the project's configured paths. Use `describe`/`it`/`expects`; reserve `ensure` for small probes. Do not replace the runner with a compatibility wrapper without a versioned reproducer.

Reports belong at native runner level or under a standalone guard that excludes native `filename` runs in directly runnable files. Derive executed assertion counts from runner output, including loop-generated assertions. Distinguish cases/files/assertions, acquisition errors, assertion failures, uncaught exceptions, and empty discovery.

Load [Peregrino](references/peregrino.md) only for command benchmarks, or [workflows](references/workflows.md) for GitHub Actions, bundling and artifacts. A local pass does not establish a hosted CI pass.

Check the selected package release; imports may download/evaluate code. Built-in API uncertainty uses `inspect info.get 'name`; package APIs need their release guide/source. Keep pinned package integration separate from offline checks; exercise passing/failing runs and retain exit status, summary, and errors.
