# ADR 001 — Portable skills and repository verification

Copyright © RickBarretto, Arturo programming language.

Decision date: 2026-10-28, with CI/tooling follow-up on 2026-10-29. Recorded retrospectively: 2026-11-01. Evidence: [2112b2f](https://github.com/arturo-lang/skills/commit/2112b2f34495316696ae746ca7a4be4a88be83ca), [ad56d8b](https://github.com/arturo-lang/skills/commit/ad56d8bb549c374b40c99f485238e3431b8ed137), [de8b104](https://github.com/arturo-lang/skills/commit/de8b104b3c01004e51233bbbcaa10c1a33b35490).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

The initial repository needed to distribute Arturo guidance to different assistants while verifying its own packaging and executable examples.

## Decision and evidence

Ship portable `skills/<name>/SKILL.md` directories with local references and examples. Use Bun for repository scripts/tests and Biome for supported formatting; keep Arturo formatting manual. The initial README explicitly separated repository tooling from the tools needed to read installed instructions. The validator checked names and self-contained links; smoke examples executed Arturo. The later CI change ran locked installation, checks, tests and actual CLI discovery without installing into an assistant.

## Consequences

Bun, assistant-specific installation paths and CI infrastructure need not become dependencies of the distributed guidance. Packaging/discovery checks and runtime checks answer different questions. These commits establish the tooling choices and checks, not proof that an agent selected or obeyed a skill.
