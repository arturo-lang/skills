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

Run identical scenarios three times for each condition (`--mode none`, `automatic`, `explicit`) against both baseline and candidate skill trees. `--root CHECKOUT` selects the skills to expose, independently of the harness. Choose and record an immutable baseline commit for the comparison. Extract its tracked tree into a temporary directory with `git archive <baseline>`, then point `--root` there and pass `--revision <baseline>`. Historical baselines and results are recorded in [the decision log](../DECISIONS.md). The harness's scenario prompts and held-out checks stay fixed across revisions. An archive has no Git revision metadata; record the archive commit separately with the results.

Linux, Arturo, bubblewrap and `/usr/bin/prlimit` are required. The host refuses execution if sandbox preflight fails. Generated code runs with a private home, no network, no host repository/credentials, CPU/address-space/file/process limits, a ten-second deadline and bounded captured output. Agent tools expose only task artifacts and selected installed skill files. Hidden checks and rubrics are not supplied to the agent; grading begins after completion in a separate workspace. This is a constrained tool host, not proof of portability to every assistant.

Use `--fixtures-dir ROOT` to seed raw project files or a reviewed package checkout from `ROOT/<scenario-id>/` into each fresh task workspace. The host records a fixture fingerprint and lists supplied top-level artifacts in the task context. Include only task inputs, never expected answers or grader files. Use identical fixtures for baseline/candidate comparisons.

External package scenarios require a deliberately preprovisioned standard Arturo package directory via `--packages-dir PATH`. It is mounted read-only at the isolated package location. Match the exact releases in the scenario and record their source revisions; the harness does not acquire packages. GUI, live preview and hosted CI scenarios require human/integration review; runtime networking remains disabled. Package acquisition failures must be classified as infrastructure failures, not agent failures.

## Evidence and decisions

The output also retains an immutable skill snapshot and SHA-256 fingerprints of skills and any supplied package directory. Each attempt writes metadata, prompts, JSONL API/tool events, generated artifacts and a report under a new directory. Raw API usage records total input/output, cached input and reasoning tokens per request; reports sum input across requests. Entry/reference/runtime/artifact bytes identify context sources but are **not token estimates**. Prompt files preserve injected descriptions and explicit references. Keep all attempts, including failures.

Selection results distinguish missing required domains from irrelevant loads. Language is allowed as supporting guidance for Arturo tasks. A no-skills condition has no selection score. Reads alone do not prove compliance: executable checks grade outputs, scope/mutation and failures; manual rubrics cover API discovery, native testing, schema/package semantics, CI, ambiguity, HTML and cross-domain completion. Human review must also distinguish wrong guidance, ignored guidance, selection failures and infrastructure problems. Pending rubrics are never counted as verified success by the summary command. After reviewing all listed criteria and traces, add a separate `review.json` beside the report with `status` (`passed`/`failed`), `reviewer`, and `evidence` (observations and artifact/log locations). The summary reads this without modifying raw reports. Record failure classification in that evidence. Never approve an unexecuted workflow claim as executed correctness.

Review traces for unnecessary reference loads, repeated signature/version queries, retries, and runtime output that erases documentation savings. Compare paired scenario outcomes, median/p90 input, requests and latency, and total tokens per verified success. Repeat one failing scenario with explicit guidance to distinguish selection from guidance/compliance; do not treat reruns as replacements for failed attempts.

Define acceptance criteria before collecting results: preserve coverage and portability, require critical cases to pass each repetition, and compare correctness/compliance, context consumption and retries against the chosen baseline. Record numeric targets and outcomes with the dated evaluation evidence. Repeated runs detect instability but do not alone establish statistical certainty. Exact context-category token accounting needs a tokenizer or counting endpoint; byte totals cannot establish a token-reduction target.

The [coverage ledger](coverage.json) records original references, sources, catalog symbols and examples, with current destinations and previous paths. Routine catalogs now route through official modules and installed `info.get`; semantic caveats and versioned package guidance remain local. [Optional consumer routing](../templates/consumer-routing.md) can be tested separately from automatic discovery; it is not injected into the default benchmark.

## Interpretation limits

Offline adapter/host tests do not establish live model performance. Text explanations and workflow claims require human review; the code graders are not adversarial evaluation against a malicious model. Hosted CI and listener/GUI behavior need separate execution evidence. Keep dated results and environment limitations in evaluation artifacts or [decision records](../DECISIONS.md), rather than using this guide as a run-status report.

## Comparing the single-skill layout

Prompts, executable checks and human rubrics remain fixed. The harness detects an installed `arturo` skill and translates required/allowed skill names and explicit-reference paths using [the relocation map](layout-migration.json). Ten-skill baselines keep their original routing expectations. For the consolidated layout, reports also flag unrelated reference loads using the original task domains; a single activated skill is not sufficient evidence of precise loading. Shared inspection and routing indexes do not count as unrelated domains. The CSV negative control must still avoid all Arturo guidance. No live model result is implied by this translation.

## Subscription campaign

A manual Codex subscription campaign is separate from the paid API benchmark above. Never fall back to API billing or purchased credits. Stop at included usage limits and preserve incomplete progress.

Freeze immutable baseline and candidate commits, identical prompts, fixtures and graders. Run every release scenario three times in each of none, automatic and explicit conditions for both revisions (18 attempts per scenario). Use fresh sessions with no unrelated global/project instructions, plugins, skills or prior conversation. Verify isolation before scoring; keep hidden graders outside the session. Record the actual model, reasoning setting, CLI/runtime versions and exposed guidance; hold them fixed across the campaign.

Start with native testing and ambiguity. Supplement the existing Lanx case with another package typo, an unknown name without a supported candidate, and a correct-name control. Grade investigation and targeted clarification before supplying follow-up answers. Do not rewrite historical benchmark prompts to add these cases.

Save prompts, transcripts, reference reads, commands, generated artifacts and outcomes for every attempt. Review separately for missed guidance, incorrect guidance, ignored instructions, incorrect code and infrastructure failures. Keep failed attempts and reviewer evidence; all critical candidate repetitions must pass. Report regressions and unavailable metrics honestly. Subscription results do not establish API-harness performance. Until isolation and the complete matrix are observed, #10 and behavioral closure of #14 remain pending.

### Subscription transport

`bun run evals --run --subscription --mode automatic --repeat 3 --scenario preview-ambiguity --out /tmp/arturo-subscription` uses the installed Codex app-server with `gpt-6.1-sol`/low and ChatGPT authentication forced. It never uses an API key. This opt-in transport creates a temporary private Codex home, copies authentication locally, disables shell, plugins, delegation, web search and host skill discovery, then supplies only the four bounded evaluation tools. Temporary authentication is removed at completion; do not publish temporary homes. It requires Codex 0.166.0's experimental dynamic-tool protocol and local auth.json authentication; other credential backends are not implemented.

Skill discovery is the harness inventory, not native Codex skill discovery. The fixed base instructions differ from the API transport. Reports identify the transport; summaries keep transports separate. Thread token totals are recorded from Codex events; API-request counts are unavailable. A fresh session has a three-minute deadline and at most 48 tool calls. The live campaign must separately provision reviewed external package sources and raw fixtures as described above. Retain pending manual review until all rubric criteria have been checked.
