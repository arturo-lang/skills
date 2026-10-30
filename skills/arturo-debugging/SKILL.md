---

name: arturo-debugging
description: Diagnose and fix Arturo runtime errors, scope or aliasing bugs, and regressions using Exceptions and Reflection. Use for .art failures, error handling, runtime inspection, and call-attribute introspection.
---

# Arturo debugging

Capture the exact failing invocation, interpreter version, error text, and expected result. Reduce it to a bounded reproduction that preserves the failure. Read [diagnostic patterns](references/debugging.md) for the relevant failure class.

Check function arity and types before changing syntax. Trace expressions from right to left, then inspect evaluation of blocks, stack results, scope boundaries, and shared values. Compare the installed runtime with the [official reference](https://arturo-lang.io/llms.txt); examples can reflect another version.

Use `inspect`, `type`, `info`, and `arity` as appropriate after confirming their signatures. Keep diagnostic output out of final machine-readable output. Do not catch and discard errors merely to make a reproduction appear successful.

Add a check that fails for the observed bug and passes after the fix, using `ensure [condition]` for small standalone scripts. Verify the original invocation plus relevant edge cases. Report the cause, change, validation, and any behavior that could not be tested.

[examples/errors.art](examples/errors.art) demonstrates offline assertions and captured errors. Avoid executing an arbitrary upstream example as a diagnostic: review its effects and cost first.

## Standard-library selection guides

- [Exceptions](references/exceptions-library.md): 17 functions, predicates, or constants.
- [Reflection](references/reflection-library.md): 11 functions, predicates, or constants.

Ask Arturo for signatures with `inspect info.get 'functionName`; see [runtime inspection and defaults](references/runtime.md) before reading argument types, attributes, and results.
