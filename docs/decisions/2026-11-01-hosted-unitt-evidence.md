# Hosted Unitt assertion evidence



Observed 2026-11-01 for commit `1efcfbe4ff2028262aad761ddca5d2874db7ad64`.

[Hosted job](https://github.com/arturo-lang/skills/actions/runs/41341604990/job/124952624323) completed successfully on Ubuntu 24.04.5, runner image `20261025.353.1`. Setup action revision: `59c9867a8c8564f0ad1cd4d1960e9fddd623c5b7`, stable/full selection. Installed Arturo: `0.10.0 Arizona Bark (amd64/linux)`; Bun: `1.3.12`.

Interpreter: `/home/runner/.arturo/bin/arturo`. Native Unitt 3.1.1 entry: `/home/runner/.arturo/packages/cache/unitt/3.1.1/src/app.art`. Direct entry: `/tmp/arturo-packages-smoke-w57Z9R/native/checks/arithmetic.check.art`. Commands used the interpreter with `--no-color` and the respective entry, working directory `/tmp/arturo-packages-smoke-w57Z9R/native`.

Both native and direct execution observed the same sequence:

| Phase                          | Total | Passed | Failed | Exit |
| ------------------------------ | ----- | ------ | ------ | ---- |
| Initial                        | 4     | 4      | 0      | 0    |
| Deliberately changed assertion | 4     | 3      | 1      | 1    |
| Restored assertion             | 4     | 4      | 0      | 0    |

All six assertion processes had empty stderr. Negative runs ended with `Some tests failed!`. The verifier rejected unexpected statuses and totals; its overall success means the expected failure was observed, not suppressed. Standalone pass/failure fixtures also passed verification. Separate diagnostic cases confirmed the upstream native uncaught-error exit-zero limitation and empty-discovery exit 1; neither counted as assertion success.

[Raw evidence artifact](https://github.com/arturo-lang/skills/actions/runs/41341604990/artifacts/13097620546), ZIP SHA-256: `af1a8c8b8d438ce24fb3909d3333e1e6e1c5c97447678932f38f67bb7d86579a`. GitHub artifact retention is finite; commands and output are also present in job logs.

This supplies hosted assertion evidence for #12. It verifies the cached native entry and direct execution, not the global launcher or every package. It does not establish agent selection/compliance or resolve #10/#14.
