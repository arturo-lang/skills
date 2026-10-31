---
name: arturo-ci
description: Create, review, and troubleshoot Arturo GitHub Actions CI workflows using setup-arturo, Unitt tests, and bundler executable builds and release artifacts.
metadata:
  arturo-version: 0.10.0
---

# Arturo CI

Use [workflow guidance](references/workflows.md) to install Arturo with `arturo-lang/setup-arturo`, run tests, or build executables with `arturo-lang/bundler`. 

Inspect the project's existing workflow, test entry points, package metadata, and supported platforms before choosing jobs or a matrix.

## Testing

Use [Unitt guidance](references/unitt.md) for test cases, discovery configuration, and reporting. Keep test failures visible in the job exit status.

## Principles

- Platform compatibility: Match OS, architecture, runners, and shells to project requirements. Verify upstream action metadata before changing versions or inputs.
- Testing and publishing: Keep tests separate from releases. Build and upload artifacts independently; publish only when explicitly requested.
- Security: Treat package installation and imports as potentially executable code.
- External verification: Keep dependency tests opt-in and isolated. Pin exact versions, distinguish download errors from test failures, and verify nonzero exit codes on failed assertions.
- Reproducibility: Always clean temporary workspaces and preserve runtime details, dependency versions, and logs.
