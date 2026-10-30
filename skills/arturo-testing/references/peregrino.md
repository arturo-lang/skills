# Peregrino benchmarking

Use [Peregrino documentation](https://peregrino.pkgr.art/) and [v0.1.2 source](https://github.com/drkameleon/peregrino/tree/v0.1.2). The live registry's v0.1.2 overview documents the API below; older cached pages may show v0.0.2. Confirm installed options with `peregrino --help`. Package import may download and execute code.

The CLI runs command strings repeatedly. Use safe, bounded commands and account for their side effects on every run. Keep inputs, working directory, runtime, and cache conditions comparable; report run count with results. Benchmarks measure performance, not correctness.

Documentation-based bounded CLI example, not run by the library's offline smoke suite:

```sh
peregrino --run:3 "arturo -e 'print 1'" "arturo -e 'print 2'"
```

Value options use the documented colon form, such as `--run:3`. `--file` reads one command per line; `--json` and `--markdown` export results to chosen files. Check help for the installed syntax before writing exports.

Library construction uses a block of command strings:

```arturo
import {peregrino}!

measurement: to :peregrino @["arturo -e 'print 1'"]!
measurement\benchmark
```

This includes process startup and command output costs. Use `--minimal`, `--ascii`, or `--colorless` for simpler terminal presentation.
