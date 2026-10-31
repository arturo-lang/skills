---
name: arturo-ci
description: Create, review, and troubleshoot Arturo GitHub Actions CI workflows using setup-arturo, Unitt tests, and bundler executable builds and release artifacts.
---

# Arturo CI

Examples: [official repository](https://github.com/arturo-lang/examples).

Use [workflow guidance](references/workflows.md) to install Arturo with `arturo-lang/setup-arturo`, run tests, or build executables with `arturo-lang/bundler`. Inspect the project's existing workflow, test entry points, package metadata, and supported platforms before choosing jobs or a matrix.

Use [Unitt guidance](references/unitt.md) for test cases, discovery configuration, and reporting. Keep test failures visible in the job exit status.

Start with the project's required platforms and stable runtime. Match OS and architecture to actual runners; selecting an action input does not provision a matching runner. Use the Windows MSYS2 or FreeBSD VM shell where required. Check upstream action metadata at the project's selected revision before changing inputs or version pins.

Keep test jobs separate from publishing. Bundler can build and upload archives without creating a GitHub release. Prepare release workflows when requested, and publish only within the user's requested scope.

Package installation and imports can download and execute code.

Keep external package verification in a separate opt-in lane when default checks must stay offline. Use exact release imports rather than `.latest` or `.min`, report acquisition errors separately from test failures, and verify that an intentional assertion failure produces a failing process status.

Clean temporary workspaces after either outcome and retain the selected runtime, package release, and logs as evidence.
