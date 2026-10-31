---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/statistics
    - https://arturo-lang.io/llms.txt
---

# Statistics: function selection

Use for descriptive statistics on numeric collections. Population statistics are the defaults; inspect `.sample` support before choosing sample estimators. Decide how empty input, singleton samples, and non-numeric values should behave. Verify ordering requirements for `median` on the installed runtime.

Signatures and mutation: [runtime](runtime.md). Examples are fragments; bound inputs.

| Name                                                                           | Purpose / example                                                              |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [average](https://arturo-lang.io/documentation/library/statistics/average)     | Average. `average [2 4 5 6 7 2 3]`                                             |
| [deviation](https://arturo-lang.io/documentation/library/statistics/deviation) | Population standard deviation. `deviation [1 2 3 4]`                           |
| [kurtosis](https://arturo-lang.io/documentation/library/statistics/kurtosis)   | Population kurtosis. `kurtosis [1 2 3 4]`                                      |
| [median](https://arturo-lang.io/documentation/library/statistics/median)       | Middle value; sort first when ordering behavior matters. `median sort [5 1 3]` |
| [skewness](https://arturo-lang.io/documentation/library/statistics/skewness)   | Population skewness. `skewness [1 2 3 4]`                                      |
| [variance](https://arturo-lang.io/documentation/library/statistics/variance)   | Population variance. `variance [1 2 3 4]`                                      |
