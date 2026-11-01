---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/io
    - https://arturo-lang.io/llms.txt
---

# Io: function selection

Use for terminal output, input, cursor control, and styling. Keep prompts and styling away from machine-readable stdout. Input can block; cursor operations require a terminal. Prefer `--no-color` during captured-output checks.

Query signatures with `inspect info.get 'clear`; see [runtime inspection](runtime.md) for metadata interpretation.

For unknown function names, use [the io module](https://arturo-lang.io/documentation/library/io). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
