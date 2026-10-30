---
name: arturo-packages
description: Find, install, import, create, and publish Arturo packages using the official pkgr.art registry, package metadata, and versioned releases.
---

# Arturo packages

Additional relevant examples are available in the [official Arturo examples repository](https://github.com/arturo-lang/examples).

Use [pkgr.art](https://pkgr.art/) to discover packages. Read the [package workflow](references/packages.md) for installation, imports, metadata, and publishing. Check `arturo --help` for the installed CLI before choosing flags.

Distinguish registry installation from evaluation: an import can download a missing package and execute its entry file. Establish the intended package, version, and repository before running it. Keep local verification offline where possible; [examples/local-package.art](examples/local-package.art) checks a local package without registry access. Run it from this skill's directory with `arturo examples/local-package.art`; script-relative loading also supports invocation from another working directory.

For publishing work, prepare and verify the package files, release details, and registry diff. Creating a release or submitting a registry PR is a separate external action; perform it when included in the user's requested scope. Do not treat a locally prepared entry as an already published package.

Sources: [registry repository](https://github.com/arturo-lang/pkgr.art), [CLI reference](https://arturo-lang.io/documentation/command-line/), and [Core/import](https://arturo-lang.io/documentation/library/core/import/).
