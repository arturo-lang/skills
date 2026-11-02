# ADR 003 — Preserve licensing and require owner investigation

Decision date: 2026-10-30. Recorded retrospectively: 2026-11-01. Evidence: [675eafa](https://github.com/arturo-lang/skills/commit/675eafa695646d8260e529c701d55519b639bba2), [ef75655](https://github.com/arturo-lang/skills/commit/ef75655d307a22bf153a3d017cbfdc137b352045), [fcbadc1](https://github.com/arturo-lang/skills/commit/fcbadc199c46093bc62b2b9ef4a9f533cf4ca250), [a5b25de](https://github.com/arturo-lang/skills/commit/a5b25de67d720cde60aba25490aad8c0b0d27737).

This record reconstructs the implemented choice from commit diffs and contemporary repository text. It does not establish an undocumented discussion, model configuration, or fresh verification result.

## Context

The guides summarize upstream documentation and external packages, while independently installed skill directories must retain the notices relevant to their contents.

## Decision and evidence

Use CC BY 4.0 for documentation/original embedded snippets and MIT for original standalone examples, scripts and configuration. Retain upstream terms and notices separately. `675eafa` added licensing and third-party notices; `ef75655` recorded Tasks licensing. `fcbadc1` corrected the repository copyright attribution while preserving upstream credits. `a5b25de` added contributor rules and CODEOWNERS requiring PRs plus owner investigation and approval for new and modified guidance.

## Consequences

Moving or condensing guidance must preserve applicable license texts, attribution and upstream distinctions. Automated checks do not substitute for owner investigation. The contributor text explicitly notes that CODEOWNERS alone does not enforce branch protection; an ownership file is not evidence that the hosting rules were configured. This records repository policy rather than adding a new interpretation of upstream licenses.
