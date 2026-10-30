# Bounded scripting workflows

Copyright © RickBarretto, Arturo programming language.

Run these examples with Arturo 0.10.0 in a disposable working directory. They use built-ins and need no package downloads. Their checks use `ensure`; a failed assertion is an error, not a successful test result. `try` returns null/error, so assign application results inside its action. Ordinary action blocks do not create a separate variable scope.

## Validate CLI input before effects

[cli-count.art](../examples/cli-count.art) accepts exactly one raw argument, converts it to an integer, rejects negatives, and prints the value. `arturo cli-count.art 003` prints `3`. Numeric conversion is intentional for this count; retain raw strings for identifiers. Its `$[inputs :block][...]` definition requires a block of arguments and uses `ensure` before reading or converting inputs. The function also asserts zero, missing/extra arguments, invalid conversion, and negative input. It validates argument count before calling `first`.

At the entry point, a captured failure calls `panic.unstyled` with usage text and exits with status 1; `arturo cli-count.art invalid` demonstrates the actual process failure. Success exits with status 0. Built-in `exit` takes no positional status argument on this runtime. This example accepts the runtime's integer-conversion syntax; add lexical validation if a product requires decimal digits only. For richer options and subcommands, use the existing Climax guide.

## Own a file and clean it up

[files.art](../examples/files.art) wraps the lifecycle in `runFileWorkflow`, refuses existing fixtures, writes and appends text, and checks exact contents with `read.file`, including an empty file and an unchanged binding after a missing-file read. It runs once successfully and once with a child write beneath a regular file that escapes the action as an operational failure. The workflow deletes both owned fixtures before propagating the error. The caller asserts that the failure was propagated and both files are absent. Output: `files ok`.

The fixed fixture name is suitable for an isolated test directory, not a concurrent production temporary-file allocator. `exists?` is a preliminary check, not a guarantee that a later operation succeeds. Catch the operation's error too. Keep cleanup after the captured action and before propagating its failure; putting cleanup only at the bottom of the action skips it when the action fails. For separate action and cleanup diagnostics, use the next example. Forced process termination cannot guarantee script-level cleanup.

## Preserve action and cleanup failures

[file-cleanup.art](../examples/file-cleanup.art) addresses a checked runtime behavior: `try [delete path]` can return null while the path remains. On Arturo 0.10.0 Linux, deleting a directory without `.directory` demonstrates this without depending on permission settings. The upstream implementation discards the file-removal result and catches directory-removal OS errors. A normal return is therefore insufficient evidence of cleanup.

`cleanupOwnedFiles paths` tries each file removal separately, then checks `exists?`. A remaining path produces an explicit error. It collects dictionaries containing `path` and `cause`, continues to the next path, and returns the collected block. It accepts already-absent paths and an empty block. The function leaves the caller's path block unchanged; its collector is local, and the iterator argument is restored. This is one bounded attempt per path, with no automatic retries or recursive directory removal.

`runCleanupWorkflow` checks that two fixed fixture names are absent in its exclusive working directory before effects. It captures the action's error, attempts both cleanups, and returns a report:

| Field           | Meaning                                                        |
| --------------- | -------------------------------------------------------------- |
| `value`         | Action result, or null if this action did not reach assignment |
| `actionError`   | Original action error, or null                                 |
| `cleanupErrors` | Block of cleanup issues, empty when all checked paths are gone |

Check both error fields before treating the overall workflow as successful; an action result can coexist with cleanup failure. `try` reports null/error, so the action assigns `value` explicitly. Cleanup runs after that `try`, and each cleanup has its own `try`, preventing the first cleanup failure from skipping later paths or replacing the action error. Returning the error values preserves their diagnostics; `throw to :string error` would instead construct a new error from text. A CLI can report both fields before choosing its failure exit behavior.

The assertions cover all four combinations of action and cleanup success/failure. A write beneath the second regular file causes the action failure. Replacing the first file with an owned empty directory causes the checked cleanup failure. Even then, the second file is removed; both errors remain available when both phases fail. The test explicitly removes its own empty directory afterward and checks all fixtures are gone. Output: `file cleanup ok`, exit 0, no stderr. Expected failures are captured and asserted inside the example.

The helper is for owned file paths in an exclusive fixture directory. The preflight checks do not allocate names atomically. Concurrent replacement, symlink handling, permissions, partial acquisition failures, and abrupt termination remain unverified; checking `exists?` is not a secure deletion or concurrency guarantee. Do not switch to recursive deletion just because an expected file became a directory. The synthetic wrong-kind fixture verifies a detectable leftover, not every OS removal failure.

## Convert dates and check a calendar boundary

[dates.art](../examples/dates.art) parses a fixed value with `to.format:"yyyy-MM-dd" :date`, crosses February 28 to February 29 in a leap year, formats the result, and verifies that the original date remains unchanged. It catches malformed text and an impossible February date. The existing current-time checks capture `now` once. Output: `dates ok`.

The fixed date conversion uses the runtime's local timezone; the assertions compare calendar strings and date relationships, not a hardcoded epoch timestamp. This establishes the checked leap-day case only. Verify timezone offsets, daylight-saving transitions, and end-of-month behavior separately for scheduling requirements; one calendar day need not mean exactly 86,400 elapsed seconds.

## Close a database after either outcome

[databases.art](../examples/databases.art) wraps SQLite `:memory:` in `runDatabaseWorkflow`, creates a table, inserts a bound parameter, and asserts the exact row shape `[["Ada"]]`. It catches a duplicate unique value and malformed SQL, then verifies that the original row is intact. A second invocation lets a duplicate insert escape the action. Both invocations execute `close db` before propagating any action failure. A caller-owned dictionary records each completed close; the caller asserts counts of one after success and two after the propagated failure. It never queries a closed handle. Output: `databases ok`.

Open the connection before entering this lifecycle only when open failure needs no resource cleanup; catch it separately when translating operational errors for a CLI or service. A successful open makes the caller responsible for closing it. Do not use a closed handle. This example does not establish transactions or rollback semantics, persistent-store flushing, other database drivers, or concurrent access. Bound parameters protect data values, not dynamically chosen SQL identifiers.

## Sources and verification

Sources: the official [text reference](https://arturo-lang.io/llms.txt), specifically System/arg and panic, Types/to, Exceptions/try, Files/read, write and delete, Dates/after and before, and Databases/open, query and close. Reviewed 2026-10-30 against the reference and installed metadata. Adaptation: selected API behavior, original lifecycle examples, boundary assertions, and explicit limitations. Upstream reference: Yanis Zafirópulos and the Arturo project, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Executed and asserted on Arturo 0.10.0 Arizona Bark, amd64/Linux, 2026-10-30: the four linked examples, including CLI `003` (status 0, output `3`) and `invalid` (status 1, usage message). File, date, and database scripts exit 0 with their stated output and no stderr. File removal and completed database closure are asserted after both successful execution and a propagated operational failure. The database check records completed closes, without inspecting a freed handle. Abrupt termination and failure of `close` itself are untested.

Cleanup follow-up reviewed and asserted 2026-10-30 on the same runtime: [Files/delete](https://arturo-lang.io/documentation/library/files/delete), [Files/write](https://arturo-lang.io/documentation/library/files/write), [Exceptions/try](https://arturo-lang.io/documentation/library/exceptions/try/), and [Exceptions/throw](https://arturo-lang.io/documentation/library/exceptions/throw/), with the relevant entries in the official text reference. The [pinned Files implementation](https://github.com/arturo-lang/arturo/blob/4e549e105c54af2e250381d578474b9064d9d4d2/src/library/Files.nim#L99) was source-reviewed separately from local runtime execution. The [official deletion example](https://github.com/arturo-lang/examples/blob/60e7b92242e39fccdb764c505bb289e3a1e3d391/src/rosetta/Delete%20a%20file.art) demonstrates file/directory forms but includes root-relative paths; it was reviewed, not executed. The new example is an original bounded adaptation with independent fixtures, postcondition checks, and diagnostic assertions; no upstream code is vendored. Upstream documentation attribution and CC BY 4.0 terms above apply to the summarized API guidance.
