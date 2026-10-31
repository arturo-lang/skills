---
name: arturo-debugging
description: Diagnose and fix Arturo runtime errors, scope or aliasing bugs, and regressions using Exceptions and Reflection. Use for .art failures, error handling, runtime inspection, and call-attribute introspection.
metadata:
  arturo-version: 0.10.0
---

# Debugging Guidelines

- Reproduction: Capture the failing command, runtime version, error message, and expected behavior. Reduce the issue to a minimal, bounded example.
- Diagnosis: Use the [symptom checklist](references/debugging.md) to choose what to investigate.
- Runtime compatibility: Follow [runtime guidance](references/runtime.md) to check the installed version and signatures against the official reference.
- Inspection: Choose tools from [Reflection](references/reflection-library.md). Keep diagnostics separate from program output.
- Error handling: Follow [Exceptions](references/exceptions-library.md) to capture or propagate failures.
- Regression testing: Add an `ensure [condition]` assertion that reproduces the bug and passes after the fix. Assert observable behavior rather than duplicating implementation logic.
- Validation: Retest the original invocation and relevant edge cases. Report the root cause, changes, test results, and limitations.

[examples/errors.art](examples/errors.art) demonstrates offline assertions and captured errors. Avoid executing an arbitrary upstream example as a diagnostic: review its effects and cost first.
