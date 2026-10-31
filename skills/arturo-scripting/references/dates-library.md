---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/dates
    - https://arturo-lang.io/llms.txt
---

# Dates: function selection

Use for date values, calendar predicates, and interval arithmetic. Capture `now` once when comparing related values. Calendar months, daylight-saving transitions, and elapsed seconds are different concerns; establish timezone and boundary behavior. Current-time examples have variable output.

Query signatures with `inspect info.get 'after`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                        | Purpose / when to use                                | Example                     |
| --------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------- |
| [after](https://arturo-lang.io/documentation/library/dates/after)           | Obtain date after one using interval.                | `after.days: 2 now`         |
| [before](https://arturo-lang.io/documentation/library/dates/before)         | Obtain date before one using interval.               | `before.days: 2 now`        |
| [friday?](https://arturo-lang.io/documentation/library/dates/friday-)       | Test whether date is a Friday.                       | `print friday? now`         |
| [future?](https://arturo-lang.io/documentation/library/dates/future-)       | Test whether date is in the future.                  | `future? after.days: 2 now` |
| [leap?](https://arturo-lang.io/documentation/library/dates/leap-)           | Test whether year is a leap year.                    | `leap? 2024`                |
| [monday?](https://arturo-lang.io/documentation/library/dates/monday-)       | Test a date for Monday; use for calendar scheduling. | `monday? now`               |
| [now](https://arturo-lang.io/documentation/library/dates/now)               | Obtain date/time now.                                | `inspect now`               |
| [past?](https://arturo-lang.io/documentation/library/dates/past-)           | Test whether date is in the past.                    | `past? before.days: 2 now`  |
| [saturday?](https://arturo-lang.io/documentation/library/dates/saturday-)   | Test whether date is a Saturday.                     | `print saturday? now`       |
| [sunday?](https://arturo-lang.io/documentation/library/dates/sunday-)       | Test whether date is a Sunday.                       | `print sunday? now`         |
| [thursday?](https://arturo-lang.io/documentation/library/dates/thursday-)   | Test whether date is a Thursday.                     | `print thursday? now`       |
| [today?](https://arturo-lang.io/documentation/library/dates/today-)         | Test whether date is today.                          | `print today? now`          |
| [tuesday?](https://arturo-lang.io/documentation/library/dates/tuesday-)     | Test whether date is a Tuesday.                      | `print tuesday? now`        |
| [wednesday?](https://arturo-lang.io/documentation/library/dates/wednesday-) | Test whether date is a Wednesday.                    | `print wednesday? now`      |
