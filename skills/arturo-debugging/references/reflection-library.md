---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/reflection
    - https://arturo-lang.io/llms.txt
---

### Runtime Introspection

- Signatures: Follow [runtime guidance](runtime.md) to query and interpret builtin metadata.
- Attributes: `attr`, `attr?`, and `attrs` access call attributes within function contexts.
- Benchmarking: Keep workloads bounded.
- Examples: Treat fragments as independent. Variables such as `items`, `settings`, and `client` require explicit initialization.
- Validation: Call attribute-enabled functions with appropriate attributes to verify behavior.

| Name                                                                               | Purpose / when to use                                   | Example                                               |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------- |
| [arity](https://arturo-lang.io/documentation/library/reflection/arity)             | Obtain index of function arities.                       | `arity\print`                                         |
| [attr](https://arturo-lang.io/documentation/library/reflection/attr)               | Obtain attribute, if it exists.                         | `scale: function [x] [x * attr 'by]`                  |
| [attr?](https://arturo-lang.io/documentation/library/reflection/attr-)             | Test whether attribute exists.                          | `hasFlag: function [] [attr? 'verbose]`               |
| [attrs](https://arturo-lang.io/documentation/library/reflection/attrs)             | Obtain dictionary of set attributes.                    | `showOptions: function [] [inspect attrs]`            |
| [benchmark](https://arturo-lang.io/documentation/library/reflection/benchmark)     | Benchmark code.                                         | `benchmark [discard sum 1..10]`                       |
| [info](https://arturo-lang.io/documentation/library/reflection/info)               | Print info for symbol.                                  | `info 'print`                                         |
| [inspect](https://arturo-lang.io/documentation/library/reflection/inspect)         | Print detailed structure and type information of value. | `inspect [1 "two"]`                                   |
| [methods](https://arturo-lang.io/documentation/library/reflection/methods)         | Obtain list of methods for object or module.            | `box: module [run: method.public [] [1]] methods box` |
| [stack](https://arturo-lang.io/documentation/library/reflection/stack)             | Obtain current stack.                                   | `1 2 3 inspect stack`                                 |
| [standalone?](https://arturo-lang.io/documentation/library/reflection/standalone-) | Test whether current script runs from the command-line. | `standalone?`                                         |
| [symbols](https://arturo-lang.io/documentation/library/reflection/symbols)         | Obtain currently defined symbols.                       | `inspect symbols`                                     |
