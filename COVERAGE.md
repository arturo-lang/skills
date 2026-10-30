# Coverage baseline

[coverage.json](coverage.json) maps all existing skills and modules to evidence. Partial means guidance exists, not task completeness. Backlog entries need investigation and ownership. The symbol inventory remains authoritative in [stdlib.json](stdlib.json).

Verification dimensions are independent: documented; metadata inspected; executed; results asserted; edge cases tested. Sources and verification notes in each linked reference establish these dimensions; absence of evidence means unverified. Historical 418-fragment execution does not establish output correctness. The smoke suite asserts representative behavior, not every symbol.

Package guidance is source-reviewed; package execution remains outside default checks. The separate opt-in Unitt 3.1.1 lane is described in [contributing](CONTRIBUTING.md#optional-package-verification). Skills link directly to the official upstream examples; exhaustive example classification is not required. Task-level evidence remains partial. Update this catalog whenever ownership or coverage changes.

Semantic recipes added 2026-10-30 assert grouping and arity, extra function results, iterator scope, nested block copying and mutation, empty collections and numeric reducers, numeric conversion failures, CLI count validation, Unicode code points versus bytes, and regex escaping. Evidence lives in the language, collections, math, and scripting examples and their linked references. Resource cloning, exceptional iterator cleanup, grapheme/normalization behavior, and broader numeric precision cases remain unverified; these recipes do not establish complete task coverage.

The task #2 completion pass adds unchanged-input assertions, a copied nested-update helper with empty-input rejection, skipped empty iterator bodies, missing versus null dictionary keys, empty text, and empty/missing-file checks. It completes the priority recipes with normal and boundary/failure cases; other library and workflow coverage remains partial.

Roadmap #3 now has offline assertions for multi-file loading and namespace isolation, HTTP response/JSON validation, filesystem lifecycle, CLI parsing, calendar boundaries, and SQLite errors. Examples distinguish syntax/shape errors from operational failures and document resource ownership and cleanup. Live HTTP, additional packages, persistent databases, transaction rollback, and platform/timezone combinations remain unverified. The catalog keeps these tasks partial rather than claiming exhaustive integration coverage.

The opt-in Unitt 3.1.1 lane passed locally on the recorded runtime, including both passing and deliberately failing report paths. Its runner has offline Bun checks for refusal without opt-in and rejection of acquisition failures. Hosted workflow execution remains unobserved.
