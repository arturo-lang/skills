---
metadata:
  author: RickBarretto
  license: MIT
  package-version: 3.1.1
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://unitt.pkgr.art/
    - https://github.com/RickBarretto/unitt/tree/v3.1.1
---

# Unitt unit testing

Use Unitt for project unit tests. Upstream forbids `.lean`; imports may download and execute code.

Prefer `describe`/`it`/`expects`. Assertions belong inside cases; `.be:` or `.to:` selects a predicate literal with evaluated arguments. Keep test inputs deterministic.

```art
import {unitt}!

describe "addition" [
    it "adds positive integers" [
        expects.be: 'equal? @[3 add 1 2]
    ]
]

if and? standalone? (not? key? args 'filename) ::
    unitt\report 'full
```

`report` exits with the result status; `.keep` continues. `'minimal` reports failures and summary. The guard excludes native Unitt 3.1.1's `--filename` storage mode, which cannot use `report` on Arturo 0.10.0. Use runner totals: loops repeat assertions.

Install with `arturo -p install unitt`, then run `unitt` for native discovery/reporting. Preserve existing paths; new projects can use root `config.art`:

```art
path: "specs"
suffix: ".spec.art"
binary: "arturo"
```

Place matching test files under `path`; `binary` selects the Arturo executable. Run a guarded file directly with `arturo specs/example.spec.art`.

`test`, `suite`, and `assert.with:` support older syntax. Conditional `.skip: logicalValue` skips `it` or standalone `test` cases when true. Version 3 removed `.prop`, `.static`, and `fatal`; `.prop` never generated property tests. Uncaught exceptions stop the runner.
