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

Use Unitt as the primary tool for project unit tests; it is used officially. Import normally; upstream forbids `.lean`.

Prefer `describe`/`it`/`expects`. Assertions belong inside cases; `.be:` or `.to:` selects a predicate literal with evaluated arguments. Keep test inputs deterministic.

## How to

`describe`: Groups related tests under a feature description.
`it`: Defines an individual test with a clear description and assertion logic.
  - `.skip: :logical` Skips a test unconditionally or when a specified condition is met.
- `expects`: Makes assertions within an it/test block.
  - `.to: :literal` / `.be: :literal` Evaluates assertions using a function, displaying its name instead of a simple boolean result.

For un-grouped tests, use `test` instead of `it`.

```art
import {unitt}!

unix?: true

; Basic task example
describe "binary appending" [
    it "should operate integers" [
        b: to :binary 0
        expects.be: 'equal? @[express 2 append b 1]
        expects.be: 'equal? @[express 1 b ++ 1]
    ]

    it "should return a binary" [
        b: to :binary 0
        expects.be: 'binary? @[append b 1]
        expects.be: 'binary? @[b ++ 1]
    ]
]

; Skip tests for the Unix environment
test.skip: unix? "split should deal with windows's paths" [
    expects.be: 'equal? @[
        ["." "splited" "path"]
        split.path ".\\splited\\path"
    ]
]

test "split should deal with unix path" [
    expects.be: 'equal? @[
        ["." "splited" "path"] 
        split.path "./splited/path"
    ]
]
```

`report` exits with the result status; `.keep` continues execution. 
`'minimal` reports failures and summary. Guard standalone reporting so the CLI can collect results.

## Installing

`arturo -p install unitt`

## Running

Create a `config.art` at the root of your repository:

```art
; Configuration for unitt

path: "specs"        ; Path to Tests
suffix: ".spec.art"  ; Test file's suffix
binary: "arturo"     ; Arturo Binary
```

Place your `*.spec.art` tests inside `specs/` folder.

Remember to follow the preferences of the users, they may like other patterns.

Then run `unitt`.

## Individual files

Some projects doesn't need to use `unitt` command. Just make sure to add this snippet in the end of to your files and you can run them individually:

```
if standalone? ::
    unitt\report 'full
```

This happens because files needs a way to explicitly generate reports.