# ADR 010 — Prefer expressive Arturo symbols and expression blocks

Copyright © RickBarretto, Arturo programming language.

Decision and recording date: 2026-11-01. Basis: the maintainer's request for clean, expressive Arturo syntax. Reference baseline: Arturo 0.10.0, Linux amd64.

## Context and decision

The guidance already mentioned `$` and `->`, but the entry point did not state a general symbol preference, and formatting conventions were scattered. Make the default for new Arturo code explicit: prefer documented symbols over spelled-out equivalents and `->` for one terminal-expression body. Logical functions are the explicit exception: write `and?`, `or?`, `not?` and similar names for readability rather than their symbolic aliases. Choose `read`/`write` versus `<<`/`>>` according to the I/O context, especially format attributes and explicit resource interpretation. Keep data, parameter lists, empty blocks and multi-step bodies explicit. Use visible operator spacing and readable indentation rather than minimizing characters at the expense of evaluation clarity.

Keep this as an Arturo code-writing convention. The maintainer's broader aesthetic informs the choice; it does not need to become philosophical labels or unrelated methodology instructions inside the skill. Existing project style and teaching examples that intentionally contrast forms remain relevant.

## Evidence and boundaries

The [official reference](https://arturo-lang.io/llms.txt), reviewed on this date, defines `->` as wrapping one terminal value and demonstrates that `x: -> 2 3` binds `[2]` while leaving `3` outside. Installed `info.get` metadata confirms `$`/`function`, `?`/`switch` and `=`/`equal?` aliases. The symbol map retains prefix/infix positions and lookalikes such as `=<` versus `<=`.

A new bounded example exercises typed expression functions, iterator bodies, assertions, set symbols, grouped conditional branches, preserved input and an explicit multi-step copy/update function. It also contrasts terminal wrapping with multiple values and verifies an unselected multi-step branch has no effects. The example passes on the recorded runtime. Conditional predicates and call results need explicit grouping; symbols and arrows do not change Arturo's arity or right-to-left evaluation.

## Consequences and validation

Keep the entry-point preference short and put the detailed examples in the [formatting reference](../../skills/arturo/references/formatting.md). The maintainer also requested a separate commit to format the runnable examples and embedded Arturo snippets. Preserve dated ADR snapshots and the original migration digests; use runtime assertions to validate intentional example edits rather than treating historical byte hashes as an ongoing formatting prohibition. The new smoke case checks executable semantics; the added agent scenario separates correctness checks from a human formatting-compliance rubric.

Do not replace lazy branching with eager coalescing, change mutation arguments, or substitute symbols into package interfaces that expect named/literal predicates. No automatic Arturo formatter or stylistic regex gate is introduced. Repository checks do not establish live Sol Low instruction-following; that requires the recorded model evaluation procedure. Earlier footprint snapshots and example-preservation digests remain historical and are not refreshed for this addition.
