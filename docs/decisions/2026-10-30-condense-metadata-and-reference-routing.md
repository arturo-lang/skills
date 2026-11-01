# ADR 006 — Condense metadata and task routing

Copyright © RickBarretto, Arturo programming language.

Decision date: 2026-10-30. Recorded retrospectively: 2026-11-01. Evidence: [8668701](https://github.com/arturo-lang/skills/commit/86687011a38430db699c28475cc18d5e9d3e4cbb), [aed87ad](https://github.com/arturo-lang/skills/commit/aed87ad9e117905699e489a05970a83e8bbdef5f), [713c996](https://github.com/arturo-lang/skills/commit/713c996d9ea9c05fa37355c697ac1a57f97b84fc), [6198bc2](https://github.com/arturo-lang/skills/commit/6198bc2ddac5ca1e18ac4af62ce10a1443b37200).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

Repeated source/review prose, overlapping entry points and maintained coverage inventories increased instruction and maintenance overhead after the broad coverage pass.

## Decision and evidence

Move relevant provenance into optional metadata and avoid repeating licensing defaults (`8668701`). Preserve historical review dates and separate the Arturo baseline from package minimum requirements; use source-package-version when the reviewed source differs. `aed87ad` removed the extra source-revision field rather than duplicating source identity. `713c996` merged CI into testing, removed overlapping references and shortened entry points. `6198bc2` removed the tracked STDLIB/coverage inventory files and their dedicated scripts, retaining source metadata and relevant checks instead.

## Consequences

Compaction concerns activation, repeated instructions and maintenance artifacts as well as prose length. Source/version distinctions and notices remain important even when their presentation changes. These edits do not demonstrate model-token savings or improved task completion. The newer evaluation coverage ledger is a later, separately scoped artifact; this record does not imply that its existence was decided in October. The earlier RSV guide was deleted in [97a2424](https://github.com/arturo-lang/skills/commit/97a242478bbd36c672ea6d320d99a7b0cc5366a4), along with its activation mention and notice entry; that diff does not supply a reason for the removal. This is a documented coverage change, not evidence that all condensation preserved every historical package. Later removals need an explicit disposition rather than being hidden by aggregate counts.
