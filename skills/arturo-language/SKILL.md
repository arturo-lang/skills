---

name: arturo-language
description: Write, explain, or port Arturo (.art) code using its evaluation rules, values, functions, scope, and mutation semantics. Use for language-level implementation and syntax questions.
---

# Arturo language

Read [language rules](references/language.md) for the constructs involved in the task. Use the [official reference](https://arturo-lang.io/llms.txt) to confirm unfamiliar function arity, accepted types, and attributes rather than borrowing APIs from another language.

Arturo code consists of values and callable words; there are no reserved keywords. `name:` assigns a value, `'name` denotes a literal identifier, `:integer` is a type, `.flag` is an attribute, and `.option: value` is an attribute with a value. Blocks are data until evaluated.

Expressions evaluate right to left; successive statements still execute in source order. Function arity determines argument boundaries. Use parentheses or intermediate bindings to make intended grouping explicit. Do not apply conventional arithmetic precedence.

Distinguish returned values from in-place operations. A supported literal argument such as `sort 'items` changes the binding; `sort items` returns a result. Use `new` when an independent copy is required. Functions have scope; ordinary evaluated blocks do not.

Preserve the project's spelling and style. Prefer explicit function and iterator parameter blocks while establishing correctness; introduce shorthand only when its expansion is clear. Run a bounded example with `arturo path.art` or `arturo -e 'code'` when an interpreter is available, and report any unverified behavior.

See [examples/basics.art](examples/basics.art) for an offline executable example. Its checks use `ensure [condition]`.
