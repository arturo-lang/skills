---
metadata:
  arturo-version: "0.10.0"
  review-date: "2026-10-29"
  sources:
    - https://arturo-lang.io/documentation/library/statistics
    - https://arturo-lang.io/llms.txt
---

# Statistics: function selection

Use for descriptive statistics on numeric collections. Population statistics are the defaults; inspect `.sample` support before choosing sample estimators. Decide how empty input, singleton samples, and non-numeric values should behave. Verify ordering requirements for `median` on the installed runtime.

Query signatures with `inspect info.get 'average`; see [runtime inspection](runtime.md) for metadata interpretation.

Fragments require surrounding input/resource bindings. Bound inputs; distinguish literal mutation from returned values.

| Name                                                                           | Purpose / when to use                                             | Example                         |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------- |
| [average](https://arturo-lang.io/documentation/library/statistics/average)     | Obtain average from collection of numbers.                        | `print average [2 4 5 6 7 2 3]` |
| [deviation](https://arturo-lang.io/documentation/library/statistics/deviation) | Obtain population standard deviation of collection of numbers.    | `deviation [1 2 3 4]`           |
| [kurtosis](https://arturo-lang.io/documentation/library/statistics/kurtosis)   | Obtain population kurtosis of collection of numbers.              | `kurtosis [1 2 3 4]`            |
| [median](https://arturo-lang.io/documentation/library/statistics/median)       | Find the middle value; sort first when ordering behavior matters. | `median sort [5 1 3]`           |
| [skewness](https://arturo-lang.io/documentation/library/statistics/skewness)   | Obtain population skewness of collection of numbers.              | `skewness [1 2 3 4]`            |
| [variance](https://arturo-lang.io/documentation/library/statistics/variance)   | Obtain population variance of collection of numbers.              | `variance [1 2 3 4]`            |
