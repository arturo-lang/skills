# Bounded scripting workflows

Copyright © RickBarretto, Arturo programming language.

Run these examples with Arturo 0.10.0 in a disposable working directory. They use built-ins and need no package downloads. Their checks use `ensure`; a failed assertion is an error, not a successful test result. `try` returns null/error, so assign application results inside its action. Ordinary action blocks do not create a separate variable scope.

## Validate CLI input before effects

[cli-count.art](../examples/cli-count.art) accepts exactly one raw argument, converts it to an integer, rejects negatives, and prints the value. `arturo cli-count.art 003` prints `3`. Numeric conversion is intentional for this count; retain raw strings for identifiers. The function also asserts zero, missing/extra arguments, invalid conversion, and negative input. It validates argument count before calling `first`.

At the entry point, a captured failure calls `panic.unstyled` with usage text and exits with status 1; `arturo cli-count.art invalid` demonstrates the actual process failure. Success exits with status 0. Built-in `exit` takes no positional status argument on this runtime. This example accepts the runtime's integer-conversion syntax; add lexical validation if a product requires decimal digits only. For richer options and subcommands, use the existing Climax guide.

## Own a file and clean it up

[files.art](../examples/files.art) refuses an existing fixture, writes and appends text, and checks exact contents with `read.file`. A child path beneath that regular file forces a write failure without relying on platform permissions. After the action, the script deletes its fixture, propagates a captured failure, verifies deletion, and asserts that reading the missing file fails. Output: `files ok`.

The fixed fixture name is suitable for an isolated test directory, not a concurrent production temporary-file allocator. `exists?` is a preliminary check, not a guarantee that a later operation succeeds. Catch the operation's error too. Keep cleanup after the captured action and before propagating its failure; putting cleanup only at the bottom of the action skips it when the action fails. If cleanup itself fails, report that error and the original failure according to the application's needs. Forced process termination cannot guarantee script-level cleanup.

## Convert dates and check a calendar boundary

[dates.art](../examples/dates.art) parses a fixed value with `to.format:"yyyy-MM-dd" :date`, crosses February 28 to February 29 in a leap year, formats the result, and verifies that the original date remains unchanged. It catches malformed text and an impossible February date. The existing current-time checks capture `now` once. Output: `dates ok`.

The fixed date conversion uses the runtime's local timezone; the assertions compare calendar strings and date relationships, not a hardcoded epoch timestamp. This establishes the checked leap-day case only. Verify timezone offsets, daylight-saving transitions, and end-of-month behavior separately for scheduling requirements; one calendar day need not mean exactly 86,400 elapsed seconds.

## Close a database after either outcome

[databases.art](../examples/databases.art) opens SQLite `:memory:`, creates a table, inserts a bound parameter, and asserts the exact row shape `[["Ada"]]`. It catches a duplicate unique value and malformed SQL, then verifies that the original row is intact. `close db` runs after the captured action, before propagating a failure. Output: `databases ok`.

Open the connection before entering this lifecycle only when open failure needs no resource cleanup; catch it separately when translating operational errors for a CLI or service. A successful open makes the caller responsible for closing it. Do not use a closed handle. This example does not establish transactions or rollback semantics, persistent-store flushing, other database drivers, or concurrent access. Bound parameters protect data values, not dynamically chosen SQL identifiers.

## Sources and verification

Sources: the official [text reference](https://arturo-lang.io/llms.txt), specifically System/arg and panic, Types/to, Exceptions/try, Files/read, write and delete, Dates/after and before, and Databases/open, query and close. Reviewed 2026-10-30 against the reference and installed metadata. Adaptation: selected API behavior, original lifecycle examples, boundary assertions, and explicit limitations. Upstream reference: Yanis Zafirópulos and the Arturo project, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Executed and asserted on Arturo 0.10.0 Arizona Bark, amd64/Linux, 2026-10-30: the four linked examples, including CLI `003` (status 0, output `3`) and `invalid` (status 1, usage message). File, date, and database scripts exit 0 with their stated output and no stderr. Cleanup is asserted for the file fixture; database closure is executed on the success path and structurally follows the captured action. Abrupt termination and failure of `close` itself are untested.
