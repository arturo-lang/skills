---

name: arturo-dates
description: Work with Arturo dates, current time, calendar predicates, and before/after intervals. Use for scheduling, date checks, and calendar calculations.
---

# Arturo dates and calendar arithmetic

Read only the module reference relevant to the task:

- [Dates](references/dates-library.md): 14 functions, predicates, or constants.

Capture a shared now value once when comparing related dates. Establish timezone, daylight-saving, and month-boundary behavior. Use fixed calendar checks where possible, and test relationships rather than exact current-time strings. Distinguish calendar intervals from elapsed durations.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
