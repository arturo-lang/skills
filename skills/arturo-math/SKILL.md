---

name: arturo-math
description: Implement Arturo numeric calculations using Arithmetic, Bitwise, Numbers, and Statistics. Use for numeric algorithms, rounding, aggregates, descriptive statistics, and bit operations.
---

# Arturo math and statistics

Read only the module reference relevant to the task:

- [Arithmetic](references/arithmetic-library.md): 11 functions, predicates, or constants.
- [Bitwise](references/bitwise-library.md): 9 functions, predicates, or constants.
- [Numbers](references/numbers-library.md): 60 functions, predicates, or constants.
- [Statistics](references/statistics-library.md): 6 functions, predicates, or constants.

Choose integer division, floating division, or rational arithmetic deliberately. Parenthesize mixed operations: Arturo has no conventional arithmetic precedence. Inspect accepted types, numeric domains, mutation forms, angle units, and population versus sample estimators. Keep factorization, combinatorics, and random checks bounded; test invariants and tolerances instead of exact floating strings.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
