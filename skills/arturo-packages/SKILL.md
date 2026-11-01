---
name: arturo-packages
description: "Discover, acquire, version, create, or publish Arturo packages through pkgr.art. Use for package-management problems; a known package import alone does not require this skill."
metadata:
  arturo-version: 0.10.0
---

# Arturo package management

Use [pkgr.art](https://pkgr.art/) for discovery and [the workflow](references/packages.md) for acquisition/version selection, metadata, executable paths, or publishing. Check installed CLI options when uncertain: `remote` queries the registry; `list` lists local packages.

Import can download a missing package and evaluates its entrypoint. Establish the intended name/release/repository; a branch is not a version pin. Query `inspect info.get 'import` for installed arguments/attributes; package APIs may need their release source instead.

[local-package.art](examples/local-package.art) verifies a local package offline, including namespace isolation. Local source loading and parser visibility are language concerns; known package APIs stay with their task-specific guide.

For publication, verify package files and release/registry changes first. A local preparation or submitted registry PR is not an already published package.
