# Tasks automation

Use [Tasks documentation](https://tasks.pkgr.art/) and [v1.0.0 source](https://github.com/RickBarretto/tasks/tree/v1.0.0). Import normally with `import {tasks}!`; upstream explicitly warns against `.lean`. Imports can download and execute packages.

Separate declarations from the runner. `routine` declares reusable work; `task` declares runnable work. `runTask` accepts a task name as string or literal. `.requires:` names prerequisite routines; `.defers:` declares deferred routines. Inspect the installed implementation before relying on failure or repeat-execution semantics.

See the [upstream task examples](https://github.com/RickBarretto/tasks/blob/v1.0.0/readme.md) for declarations and runner usage.

`directory` creates a directory. `file filename action` supports file requirements; `.as:` binds a dictionary containing `file` and `requires` inside its action. Confirm timestamp and rebuild rules in source before designing incremental builds.

`exec` (alias `|>`) runs shell commands and is available only within routine/task actions. Treat those commands and cleanup actions as real filesystem/process effects.
