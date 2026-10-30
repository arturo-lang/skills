---
name: arturo-ci
description: Create, review, and troubleshoot Arturo GitHub Actions CI workflows using setup-arturo, Unitt tests, and bundler executable builds and release artifacts.
---

# Arturo CI

Additional relevant examples are available in the [official Arturo examples repository](https://github.com/arturo-lang/examples).

Use [workflow guidance](references/workflows.md) to install Arturo with `arturo-lang/setup-arturo`, run tests, or build executables with `arturo-lang/bundler`. Inspect the project's existing workflow, test entry points, package metadata, and supported platforms before choosing jobs or a matrix.

Use Unitt as the primary Arturo project testing tool; it is used officially. Read [Unitt guidance](references/unitt.md) for test cases, discovery configuration, and reporting. Keep test failures visible in the job exit status. A successful bundle does not establish correctness.

Start with the project's required platforms and stable runtime. Match OS and architecture to actual runners; selecting an action input does not provision a matching runner. Use the Windows MSYS2 or FreeBSD VM shell where required. Check upstream action metadata at the project's selected revision before changing inputs or version pins.

Keep test jobs separate from publishing. Bundler can build and upload archives without creating a GitHub release. Prepare release workflows when requested, and publish only within the user's requested scope. Package installation and imports can download and execute code; the examples here are source-derived and are not run by this library's offline smoke checks.

Sources and retained licenses: [third-party notices](THIRD-PARTY-NOTICES.md). All local references are included for independent installation.
