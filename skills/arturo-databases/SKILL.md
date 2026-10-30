---

name: arturo-databases
description: Build Arturo database queries and persistent key/value stores using open, query, close, and store. Use for SQLite or supported database access, parameterized SQL, and local persistence.
---

# Arturo databases and persistent stores

Read only the module reference relevant to the task:

- [Databases](references/databases-library.md): 4 functions, predicates, or constants.

Establish the backend, database location, schema, and lifecycle first. Use query.with: for SQL parameters and close connections on success and failure. Keep store persistence destinations and deferred writes explicit. Verify in-memory SQL or disposable files before touching persistent user data; do not assume transaction or driver APIs.

Ask the installed interpreter for signatures with `inspect info.get 'functionName`; read [runtime inspection and defaults](references/runtime.md) for argument types, attributes, return values, naming, and evaluation rules. Confirm unfamiliar behavior against the linked official documentation rather than guessing APIs.

[examples/checks.art](examples/checks.art) supplies bounded offline checks. These checks do not imply that network, GUI, or persistent operations have been executed.
