---

name: arturo-quantities
description: Implement Arturo unit-aware calculations, conversions, custom units, physical constants, and dimension predicates using Quantities. Use for measurements and dimensional validation.
---

# Arturo units and dimensional quantities

Read only the module reference relevant to the task:

- [Quantities](references/quantities-library.md): 112 functions, predicates, or constants.

Preserve units through computation and validate dimensions before extracting scalar values. Inspect convert versus in argument order. Keep custom type/unit names lower camelCase. Check precision and unit compatibility with bounded examples; currency conversions may require external data and are outside offline smoke checks.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
