# Reflection: function selection

Use to discover runtime signatures, values, attributes, and execution context. Prefer `inspect info.get` for signatures. `attr`, `attr?`, and `attrs` read call attributes in the function context; benchmark only bounded work and keep diagnostic output separate from program output.

For signatures, ask the installed runtime with `inspect info.get 'arity`. Read [runtime inspection](runtime.md) before interpreting argument types and attributes.

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

## Sources and verification

Reviewed 2026-10-29 against the [official Reflection module](https://arturo-lang.io/documentation/library/reflection), via the [official text reference](https://arturo-lang.io/llms.txt). This is a condensed, adapted selection guide; source documentation is by the Arturo project under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

All 11 names resolved through runtime metadata lookup on Arturo 0.10.0 Arizona Bark, amd64/Linux. This establishes discoverability, not execution of their examples or correctness of all metadata. Table examples are documentation guidance unless explicitly covered by an executable example. Check signatures locally; report version differences and unverified behavior.

All 11 bounded table fragments also completed independently with exit status zero and no stderr on that runtime. A null sample binding was supplied where a value predicate needed input. This checks execution, not every output, branch, or edge case.
