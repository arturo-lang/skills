---
metadata:
  arturo-version: 0.10.0
  review-date: 2026-10-29
  sources:
    - https://arturo-lang.io/documentation/library/reflection
    - https://arturo-lang.io/llms.txt
---

# Reflection: function selection

Use to discover runtime signatures, values, attributes, and execution context. Prefer `inspect info.get` for signatures. `attr`, `attr?`, and `attrs` read call attributes in the function context; benchmark only bounded work and keep diagnostic output separate from program output.

Query signatures with `inspect info.get 'arity`; see [runtime inspection](runtime.md) for metadata interpretation.

Examples are independent fragments; names such as `value`, `items`, `settings`, `client`, `server`, `db`, and `childPid` denote inputs or resources prepared by the surrounding program. They are not implicit globals. Attribute examples define functions; call them with suitable attributes to observe values.

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
