---

name: arturo-unitt
description: Write, run, debug, and migrate Arturo unit tests with Unitt, the library's preferred project testing package, using its CLI or standalone reports.
---

# Unitt unit testing

Use Unitt for project unit tests. Read [Unitt documentation](https://unitt.pkgr.art/) and [v3.1.1 source](https://github.com/RickBarretto/unitt/tree/v3.1.1) for the project's installed release. Import normally; upstream forbids `.lean`. Importing missing packages may download and execute code.

Prefer `describe`/`it`/`expects`. Assertions belong inside cases; `.be:` or `.to:` selects a predicate literal with evaluated arguments. Keep test inputs deterministic.

Documentation-based bounded example; not executed by the library's offline smoke suite:

```arturo
import {unitt}!

describe "addition" [
    it "adds positive integers" [
        expects.be: 'equal? @[3 add 1 2]
    ]
]

if standalone? ::
    unitt\report 'full
```

`report` exits with the result status; `.keep` continues execution. `'minimal` reports failures and summary. Guard standalone reporting so the CLI can collect results.

Install with `arturo -p install unitt`, then run `unitt`. Configure project-root `config.art` with `path`, `suffix`, and `binary`; use the actual Arturo executable path.

`test`, `suite`, and `assert.with:` support older syntax. Conditional `.skip:` skips cases. Version 3 removed `.prop`, `.static`, and `fatal`; `.prop` never generated property tests. Uncaught exceptions stop the runner.
