---

name: arturo-colors
description: Work with Arturo color values, palettes, hue rotation, and brightness or saturation adjustments. Use for color manipulation in .art programs.
---

# Arturo color transformations

Read only the module reference relevant to the task:

- [Colors](references/colors-library.md): 9 functions, predicates, or constants.

Use native color values and documented fractional adjustments. Inspect hue rotation and palette attributes rather than importing color-space assumptions. Check actual values and accepted ranges; prefer deterministic offline transforms to GUI-based checks.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
