# Statistics: function selection

Use for descriptive statistics on numeric collections. Population statistics are the defaults; inspect `.sample` support before choosing sample estimators. Decide how empty input, singleton samples, and non-numeric values should behave. Verify ordering requirements for `median` on the installed runtime.

For signatures, ask the installed runtime with `inspect info.get 'average`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Keep inputs bounded and inspect literal mutation separately from returned values.

| Name                                                                           | Purpose / when to use                                             | Example                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- |
| [average](https://arturo-lang.io/documentation/library/statistics/average)     | Obtain average from collection of numbers.                        | `print average [2 4 5 6 7 2 3]` |
| [deviation](https://arturo-lang.io/documentation/library/statistics/deviation) | Obtain population standard deviation of collection of numbers.    | `deviation [1 2 3 4]`           |
| [kurtosis](https://arturo-lang.io/documentation/library/statistics/kurtosis)   | Obtain population kurtosis of collection of numbers.              | `kurtosis [1 2 3 4]`            |
| [median](https://arturo-lang.io/documentation/library/statistics/median)       | Find the middle value; sort first when ordering behavior matters. | `median sort [5 1 3]`           |
| [skewness](https://arturo-lang.io/documentation/library/statistics/skewness)   | Obtain population skewness of collection of numbers.              | `skewness [1 2 3 4]`            |
| [variance](https://arturo-lang.io/documentation/library/statistics/variance)   | Obtain population variance of collection of numbers.              | `variance [1 2 3 4]`            |

## Sources and verification

Reviewed 2026-10-29 against the [official Statistics module](https://arturo-lang.io/documentation/library/statistics), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 6 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 6 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
