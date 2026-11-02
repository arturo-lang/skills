# Evaluation transparency

Copyright © RickBarretto, Arturo programming language.

This record describes the evidence available on 2026-11-01. The skill provides instructions and examples. Installing it does not guarantee that an assistant will read or follow them.

## What we observed

In the preview clarification comparison, both tested revisions scored 0 out of 3 without guidance, 1 out of 3 with automatic selection, and 3 out of 3 with explicit references. Relevant guidance helped in these attempts. The candidate did not improve this result.

All guided native Unitt attempts passed the reviewed checks. This supports those specific testing workflows in the recorded environment. It does not establish reliability across packages, assistants, or runtime versions.

The first 72 attempts were invalid because the required tools were unavailable. They provide no evidence of assistant correctness. Later incomplete and budget-stopped attempts do not establish successful task completion. A later native discovery probe succeeded once, while a small package probe stopped before implementation.

See the [comparison evidence](docs/evidence/2026-11-01-subscription/README.md), [bounded attempt](docs/evidence/2026-11-01-minimal-smoke/README.md), and [continuation](docs/evidence/2026-11-01-minimal-smoke/CONTINUATION.md) for conditions, counts, and limitations. Existing archives remain unchanged.

## What is incomplete

LLM-as-Judge evaluation is not fully implemented. We limited this work because of its cost. Some results include AI-assisted review, but this is not a complete judging system.

The harness runs executable checks and records review criteria. Separate review files can record assessments. Some historical assessments were made by Codex and remain provisional. Pending reviews are not verified successes. These mechanisms do not provide a complete, independent automated judge. Code-owner investigation and approval remain separate requirements.

GitHub marks [#10](https://github.com/arturo-lang/skills/issues/10) and [#14](https://github.com/arturo-lang/skills/issues/14) closed. The historical records describe incomplete behavioral acceptance criteria. Closing an issue does not establish that those criteria passed.

## Why package AI evaluations stopped

We stopped live AI evaluations involving external packages because they consumed subscription capacity and maintenance effort. This includes package execution, Unitt, HTML, CI repair, preview clarification, package management, package-name checks, and combined package tasks.

The latest small suite recorded 192,694 cumulative input tokens, including repeated context, and the package task did not finish. Token counts do not establish subscription usage percentages or dollar costs. The full comparison procedure required 18 attempts per scenario; completing that matrix was more work than we chose to fund.

There is no requirement to finish the retired package matrix. Language AI evaluation remains optional. No new model calls were needed to document this decision.

## What remains available

Package instructions and examples remain in the skill. Local tests, runtime smoke checks, and optional package, HTML, and preview verification remain available. These can check specific behavior without asking a model to generate a solution.

Removing package AI evaluations does not itself show that assistant effectiveness improved or declined. It reduces ongoing evaluation coverage. Existing results support only the cases actually checked; broader reliability remains unverified.
