---
name: arturo-debugging
description: "Diagnose observed Arturo errors, unexpected results, scope/aliasing bugs, and regressions. Routine API introspection alone does not require this skill."
metadata:
  arturo-version: 0.10.0
---

# Diagnose Arturo failures

Reproduce the failing invocation and expected result on the installed runtime; reduce to a bounded case. Use the [symptom checklist](references/debugging.md) to choose the next check.

For uncertain built-ins, `inspect info.get 'name` exposes positional `args`, optional `attrs`, and possible `returns` without calling the target. Read [runtime detail](references/runtime.md) only when interpreting it is unclear. Confirm suspected scope, mutation, or stack behavior with a small execution.

- Read [Exceptions](references/exceptions-library.md) when capturing/propagating errors: `try` returns null/error, not the action result.
- Read [Reflection](references/reflection-library.md) for call attributes or diagnostic APIs.
- Add a regression for the observed failure; retest the original invocation. [errors.art](examples/errors.art) shows bounded assertions.

Keep diagnostics separate from program output. Report the root cause and actual verification; do not execute an upstream example merely to inspect an API.
