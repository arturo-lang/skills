# Split a small program into files

Keep reusable computations in a helper file and execution, I/O, and reporting in the entry script. A helper that only defines functions can be loaded by checks without starting the application.

The self-contained [project example](../examples/project/main.art) loads [helpers.art](../examples/project/helpers.art). Run `arturo --no-color examples/project/main.art` from this skill directory, or pass the entry's absolute path from another directory. Use `import ./{helpers}!` to resolve the helper beside the executing script. The `.art` extension is optional: `import ./{helpers.art}!` also works. `import relative "helpers.art"!` is another explicit script-relative form.

`import ./{helpers}!` evaluates trusted Arturo source and introduces its bindings into the current scope. It is not a data reader or an isolated namespace. The trailing `!` makes imported functions visible to parsing and execution of subsequent code at the same level, so the example calls the helper directly. Do not assume ordinary source-order assignment alone makes callable words visible to an already parsed body.

The example asserts normal and zero inputs, rejection of a string by the typed helper, and an error for a missing helper. A missing file should stop application startup before I/O begins; do not catch it and continue with partially loaded bindings. It creates no files, opens no handles, and leaves no cleanup work. Loading arbitrary helper source can have effects, so inspect it before evaluation.

When namespace isolation is needed, use a local package directory and `import.lean`, retaining the returned dictionary and calling qualified members. Resolve a filename or explicit local path before importing; a bare name can trigger registry installation. Importing does not supply dependency locking, a sandbox, or automatic resource cleanup. Resources belong in the entry workflow and must be closed on success and failure.

Reviewed 2026-10-30 against the official [Core/import](https://arturo-lang.io/documentation/library/core/import/), and [registry import guide](https://github.com/arturo-lang/pkgr.art#using-packages). Original reference material: Yanis Zafirópulos and the Arturo project, CC BY 4.0 (reference); Arturo Programming Language, MIT (registry). This original workflow condenses their loading guidance. `relative` was also checked with installed runtime metadata. Both the extensionless `./{helpers}` form and the explicit `.art` form were runtime-checked.

Execution and assertions passed on Arturo 0.10.0 Arizona Bark, amd64/Linux, including invocation from an unrelated working directory. No registry package was imported.
