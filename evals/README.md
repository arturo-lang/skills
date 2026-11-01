# Sol Low behavioral evaluation

Copyright © RickBarretto, Arturo programming language.

This Bun harness lives outside distributed skills. It compares the same tasks with no skills, automatic selection, and explicitly supplied guidance, using `gpt-6.1-sol` with reasoning effort `low`. It uses the Responses API directly; it does not inherit this repository's instructions, global skills, or another agent's conversation. See [official tool-calling guidance](https://developers.openai.com/api/docs/guides/function-calling) and [model guidance](https://developers.openai.com/api/docs/guides/latest-model).

## Run

```sh
bun run evals --list
bun run evals:smoke
bun run evals --run --mode automatic --repeat 3 --scenario typed-function --out /tmp/arturo-sol-automatic
bun run evals:summary /tmp/arturo-sol-automatic
```

`--run` makes paid API calls and requires `OPENAI_API_KEY`. The key is used only by the host and is not included in prompts, logs, or subprocess environments. There is no model substitution. Each attempt has at most 16 API requests with at most 6,000 output tokens each; each API request has a two-minute deadline. Start with a single scenario before running the whole matrix.

Run identical scenarios three times for each condition (`--mode none`, `automatic`, `explicit`) against both baseline and candidate skill trees. `--root CHECKOUT` selects the skills to expose, independently of the harness. Baseline commit: `5ee2d7b`. Extract its tracked tree into a temporary directory, for example with `git archive 5ee2d7b`, then point `--root` there and pass `--revision 5ee2d7b`. The harness's scenario prompts and held-out checks stay fixed across revisions. An archive has no Git revision metadata; record the archive commit separately with the results.

Linux, Arturo, bubblewrap and `/usr/bin/prlimit` are required. The host refuses execution if sandbox preflight fails. Generated code runs with a private home, no network, no host repository/credentials, CPU/address-space/file/process limits, a ten-second deadline and bounded captured output. Agent tools expose only task artifacts and selected installed skill files. Hidden checks and rubrics are not supplied to the agent; grading begins after completion in a separate workspace. This is a constrained tool host, not proof of portability to every assistant.

Use `--fixtures-dir ROOT` to seed raw project files or a reviewed package checkout from `ROOT/<scenario-id>/` into each fresh task workspace. The host records a fixture fingerprint and lists supplied top-level artifacts in the task context. Include only task inputs, never expected answers or grader files. Use identical fixtures for baseline/candidate comparisons.

External package scenarios require a deliberately preprovisioned standard Arturo package directory via `--packages-dir PATH`. It is mounted read-only at the isolated package location. Match the exact releases in the scenario and record their source revisions; the harness does not acquire packages. GUI, live preview and hosted CI scenarios require human/integration review; runtime networking remains disabled. Package acquisition failures must be classified as infrastructure failures, not agent failures.

## Evidence and decisions

The output also retains an immutable skill snapshot and SHA-256 fingerprints of skills and any supplied package directory. Each attempt writes metadata, prompts, JSONL API/tool events, generated artifacts and a report under a new directory. Raw API usage records total input/output, cached input and reasoning tokens per request; reports sum input across requests. Entry/reference/runtime/artifact bytes identify context sources but are **not token estimates**. Prompt files preserve injected descriptions and explicit references. Keep all attempts, including failures.

Selection results distinguish missing required domains from irrelevant loads. Language is allowed as supporting guidance for Arturo tasks. A no-skills condition has no selection score. Reads alone do not prove compliance: nine executable checks grade outputs, scope/mutation and failures; manual rubrics cover API discovery, native testing, schema/package semantics, CI, ambiguity, HTML and cross-domain completion. Human review must also distinguish wrong guidance, ignored guidance, selection failures and infrastructure problems. Pending rubrics are never counted as verified success by the summary command. After reviewing all listed criteria and traces, add a separate `review.json` beside the report with `status` (`passed`/`failed`), `reviewer`, and `evidence` (observations and artifact/log locations). The summary reads this without modifying raw reports. Record failure classification in that evidence. Never approve an unexecuted workflow claim as executed correctness.

Review traces for unnecessary reference loads, repeated signature/version queries, retries, and runtime output that erases documentation savings. Compare paired scenario outcomes, median/p90 input, requests and latency, and total tokens per verified success. Repeat one failing scenario with explicit guidance to distinguish selection from guidance/compliance; do not treat reruns as replacements for failed attempts.

Release targets: no coverage/portability loss; critical cases pass all three repetitions; correctness/compliance do not regress; median skill/reference tokens fall 25% and total input 15% without more median retries. Those are targets, not measured results. Three repetitions detect obvious instability, not statistical certainty. Exact context-category token accounting needs a tokenizer or counting endpoint; byte totals cannot establish the 25% token target.

The [coverage ledger](coverage.json) records original references, sources, catalog symbols and examples. Routine catalogs now route through official modules and installed `info.get`; semantic caveats and versioned package guidance remain local. [Optional consumer routing](../templates/consumer-routing.md) can be tested separately from automatic discovery; it is not injected into the default benchmark.

## Current limits

No live Sol Low runs are included: the implementation session has no API key. API adapter and host tests use offline fixtures. Code checks are not adversarial grading against a malicious model; text explanations and workflow claims require human review. Separate hosted CI and listener/GUI checks are needed before closing those issue acceptance criteria. Do not infer behavioral improvement from smaller documents or passing repository tests.
