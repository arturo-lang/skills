---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/dates
    - https://arturo-lang.io/llms.txt
---

# Dates: function selection

Use for date values, calendar predicates, and interval arithmetic. Capture `now` once when comparing related values. Calendar months, daylight-saving transitions, and elapsed seconds are different concerns; establish timezone and boundary behavior. Current-time examples have variable output.

Query signatures with `inspect info.get 'after`; see [runtime inspection](runtime.md) for metadata interpretation.

For unknown function names, use [the dates module](https://arturo-lang.io/documentation/library/dates). Query the selected built-in with `inspect info.get 'name`; use a bounded probe for behavior absent from metadata.
