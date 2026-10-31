---
name: arturo-debugging
description: Diagnose and fix Arturo runtime errors, scope or aliasing bugs, and regressions using Exceptions and Reflection. Use for .art failures, error handling, runtime inspection, and call-attribute introspection.
metadata:
  arturo-version: 0.10.0
---

# Debugging Guidelines

- Reproduction: Capture the failing command, runtime version, error message, and expected behavior. Reduce the issue to a minimal, bounded example.
- Diagnosis: Consult `references/debugging.md`. Verify function arity, types, right-to-left evaluation, block execution, stack values, scope, and mutation.
- Runtime compatibility: Compare installed behavior with the [official reference](https://arturo-lang.io/llms.txt), accounting for version differences.
- Inspection: Use `inspect`, `type`, `info`, and `arity` with verified signatures. Keep diagnostics separate from program output.
- Error handling: Preserve actual failures rather than suppressing them.
- Regression testing: Add an `ensure [condition]` assertion that reproduces the bug and passes after the fix.
- Validation: Retest the original invocation and relevant edge cases. Report the root cause, changes, test results, and limitations.

[examples/errors.art](examples/errors.art) demonstrates offline assertions and captured errors. Avoid executing an arbitrary upstream example as a diagnostic: review its effects and cost first.

## Module references

- [Exceptions](references/exceptions-library.md).
- [Reflection](references/reflection-library.md).

Query signatures with `inspect info.get 'functionName`; see [runtime guidance](references/runtime.md) when interpreting metadata.
