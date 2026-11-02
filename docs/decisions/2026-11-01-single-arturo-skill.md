# ADR 008 — One Arturo skill with package references



Date: 2026-11-01. Source: [PR #21](https://github.com/arturo-lang/skills/pull/21). Baseline: `aa0226a`; implementation snapshot: `9b511b6`.

This record captures the decision, measurements and validation on this date. It is not a live inventory or a claim that later revisions have the same counts or results.

## Context and decision

The user preferred one installation and activation point over ten domain skills. Replace the ten entry points with one self-contained `arturo` skill, superseding the architecture recommendation in [ADR 007](2026-11-01-discovery-first-guidance.md). Keep common semantics, runtime discovery and conditional routing in the entry point. Keep each external package in its own reference file with version/source metadata and notices, and retain the domain examples.

This was an explicit architecture preference, not a demonstrated model-performance improvement. Package APIs remain separate from package management; detailed library and package guidance loads on demand.

## Layout and migration

- Install `--skill arturo`; replace old explicit skill names/project routing and remove obsolete installations through the host's skill manager. No compatibility SKILL.md files are shipped, so discovery reports exactly one skill.
- References share one directory. The duplicate runtime guides route to `inspection.md`; the two workflow files are distinguished as `scripting-workflows.md` and `ci-workflows.md`.
- Package references remain separate, including incompatible HTML releases. `package-index.md` routes by task and does not inline the package manuals. `library.md` routes to standard-library caveats.
- The license texts are deduplicated without changing their contents. All upstream notice blocks are preserved in the consolidated notices, and historical source/review metadata is retained.

The [recorded relocation map](https://github.com/arturo-lang/skills/blob/9b511b6/evals/layout-migration.json) records old/new paths, original reference domains, example/license checksums and package metadata/notice digests. Tests verify all 22 original examples, 22 package-reference metadata headers, both license texts and 12 distinct upstream notice blocks. Existing links, smoke commands and source metadata pointers now use the merged directory.

## Consequences and measured footprint

Compared with PR #20 at `aa0226a`:

| Measure                               | Ten skills | One skill |
| ------------------------------------- | ---------: | --------: |
| Discovered entry points               |         10 |         1 |
| Entry-point words, including metadata |      1,711 |       321 |
| Entry-point UTF-8 bytes               |     15,262 |     2,859 |
| Reference files                       |         58 |        57 |
| Reference words                       |     15,545 |    15,047 |

Aggregate entry-point words fall 81.2%. This compares all entry points, not the context cost of every individual task: the single entry can be longer than a former specialized entry. Reference bytes grow slightly because relocated example paths are longer and the task/package indexes add links. Token savings, latency and instruction-following changes require live evaluation; document sizes alone do not establish them. Reproduce sizes with `bun run context:stats`; [the recorded comparison](https://github.com/arturo-lang/skills/blob/9b511b6/evals/consolidation-context.json) preserves the baseline.

## Validation and behavioral comparison

The existing 20 scenario prompts and held-out checks stay fixed. The evaluator detects the installed layout: ten-skill baselines retain original expectations; the merged layout maps activation to `arturo` and translates explicit-reference paths. Reports additionally flag unrelated reference reads by their former domain. Shared inspection/routing indexes are neutral; the non-Arturo control must still load no Arturo guidance. This avoids treating a single activated skill as proof of precise reference loading.

`bun run check`, `bun test`, `bun run smoke`, and `bun run skills:list` verify metadata/links, preservation/routing, the 22 offline smoke cases and actual one-skill CLI discovery. No new package acquisition or external API execution is needed for this relocation. As of 2026-11-01, live Sol Low comparisons had not run because no API key was available; the previous integration evidence is unchanged and is not claimed as a fresh package/browser/hosted application CI result.
