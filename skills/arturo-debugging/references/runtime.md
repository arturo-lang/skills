# Runtime signatures and Arturo defaults

Check `arturo --version` and `arturo --help`. Query a signature without invoking the target:

```sh
arturo --no-color -e "inspect info.get 'sort"
```

`info.get` returns symbol metadata; `inspect` shows its structure and types. `inspect 'sort` inspects a literal identifier, not the function. `inspect var 'sort` retrieves the function value but only shows a built-in marker on the checked runtime. `info 'sort` offers a compact display.

Read `args` in positional order. One named argument consumes one value; multiple types listed for it are alternatives. `attrs` contains optional flags and attribute-labels: `.descending` is a logical flag; `.by: 'name` passes a value. Attributes do not add positional arguments. `returns` lists possible result types; `:nothing` means no result. An infix alias does not imply conventional mathematical precedence. Descriptions, examples, and source locations are documentation, not proof of every runtime behavior; reduce and run the relevant case if they conflict.

For example, `sort` has one collection argument. A literal or path-literal argument permits mutation; a block value requests a result. `if` has a condition and an action block, whereas `switch` has a condition and two blocks. Neither is reserved syntax: control flow uses callable functions.

Use lower camelCase for variables, labels, functions, and object/type names (`:someObject`); prefix private helpers with `_`. Underscore-separated names mainly support external-format compatibility. Preserve the user's choices and existing project conventions. Expressions group right to left; function arity determines argument boundaries. Blocks remain data until evaluated. A supported literal argument enables mutation; use `new` for an independent copy and do not assume ordinary evaluated blocks create scope.

Run bounded offline `.art` examples with `ensure [condition]` where possible. Report checks and relevant limitations. Use temporary directories for disk effects. Follow project tooling.

Reference version: Arturo 0.10.0 Arizona Bark (amd64/Linux). Checked: `if`, `switch`, `function`, `when`, `sort`, `case`, and `unless` (2026-10-29). Sources: [inspect](https://arturo-lang.io/documentation/library/reflection/inspect), [info](https://arturo-lang.io/documentation/library/reflection/info), and the [official language reference](https://arturo-lang.io/documentation/language).
