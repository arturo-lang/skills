# Sol Low behavioral evaluation



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

## Subscription transport

The opt-in subscription transport remains available for language scenarios. It uses ChatGPT authentication, never API fallback. Historical package campaigns are retired: there is no requirement to finish their comparison matrix. Package scenarios cannot be selected for new runs.

Existing archives and offline review tools remain available. Historical package scenario fixtures are retained only for offline tests. See [transparency](../TRANSPARENCY.md) for results and limits.
