---

name: arturo-ui
description: Use Arturo Ui functions for native dialogs, notifications, clipboard access, and webviews. Use when the requested .art program needs supported desktop integration.
---

# Arturo desktop dialogs and clipboard

Read only the module reference relevant to the task:

- [Ui](references/ui-library.md): 6 functions, predicates, or constants.

Inspect the installed runtime and GUI support before choosing a function. Treat clipboard reads/writes, browser windows, and dialogs as real effects. Handle cancellation and returned selection values explicitly. Verify signatures headlessly; exercise interactive behavior only in a suitable desktop session within the requested task.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
