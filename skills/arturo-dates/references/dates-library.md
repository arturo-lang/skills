# Dates: function selection

Use for date values, calendar predicates, and interval arithmetic. Capture `now` once when comparing related values. Calendar months, daylight-saving transitions, and elapsed seconds are different concerns; establish timezone and boundary behavior. Current-time examples have variable output.

For signatures, ask the installed runtime with `inspect info.get 'after`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

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

## Sources and verification

Reviewed 2026-10-29 against the [official Dates module](https://arturo-lang.io/documentation/library/dates), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 14 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 14 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
