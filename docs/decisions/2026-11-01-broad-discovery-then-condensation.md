# ADR 009 — Broad discovery with Sol Low, condensation with Sol xHigh

Copyright © RickBarretto, Arturo programming language.

Decision date and recording date: 2026-11-01. Basis: the maintainer's explicit instruction in the ADR follow-up. Historical precedents: [ADR 002](2026-10-29-expand-coverage-then-group-by-task.md), [ADR 006](2026-10-30-condense-metadata-and-reference-routing.md), and [ADR 008](2026-11-01-single-arturo-skill.md).

This records an authoring strategy, not a claim that the earlier commits used these model settings or that the strategy has been benchmarked. The reviewed commit messages do not establish historical model/effort attribution.

## Context and decision

Explore broadly before committing to a narrow skill architecture. Use **GPT-6.1 Sol at low reasoning effort** to search and gather as much relevant Arturo capability coverage as possible, then **GPT-6.1 Sol at xHigh reasoning effort** to reconcile, specialize and condense that material into a smaller set of activation instructions and task-specific references. Return to Sol Low to verify that the condensed result works for its intended consumer.

Low and xHigh here are reasoning settings of `gpt-6.1-sol`, not different model identities. The [official model guidance reviewed on this date](https://developers.openai.com/api/docs/guides/latest-model) lists `low` and `xhigh`; it does not establish the effectiveness of this repository's workflow. The choice of roles is a project preference to evaluate, not a universal model-performance claim.

## Broad search — Sol Low

Search the official language/library documentation, examples and tests, relevant package releases, existing project code, issues and history. Start with the requested scope and expand across related modules, packages and cross-domain tasks before choosing the final packaging. Search for missing capabilities as well as examples that confirm an initial draft.

Produce a candidate coverage inventory: task/activation boundary, capability, authoritative source/revision, runtime/package version, relevant examples, non-obvious semantics, effects and verification status. Use `info.get` for installed built-ins and bounded code execution for behavior metadata cannot establish. Keep source-reviewed, metadata-inspected, executed and asserted claims separate. Record unknown, unsupported or unavailable areas explicitly; breadth is an exploration goal, not permission to invent APIs or claim exhaustive coverage.

Temporary per-module or per-package skill drafts can help expose gaps and overlaps. They are exploration artifacts, not a commitment to publish one skill per topic. Store broad catalogs, raw findings and execution evidence outside the installed entry point so the consumer does not pay for the entire search.

## Handoff and condensation — Sol xHigh

Freeze a reviewable snapshot of the candidate inventory, sources, drafts, examples, failures and known gaps. Record the model/effort and relevant revisions for both stages. The condensation pass must see unresolved contradictions and negative evidence, not just the successful summary.

Group by actual user tasks, resolve contradictory claims against sources/runtime evidence, and remove redundant instructions or general knowledge. Retain only instructions that affect behavior in SKILL.md. Prefer runtime discovery for ordinary built-in signatures and conditional references for limitations, recurring pitfalls and version-specific behavior. Keep every external package's guidance in its own reference file with its provenance and notices.

Maintain a disposition for each candidate capability: retained directly, moved to a reference, replaced by a verified discovery route, or deferred/removed with a concrete reason and evidence. A smaller activation set must not silently become a smaller capability set. Preserve critical syntax/evaluation/scope/mutation rules, minimum versions, edge cases, runnable checks and licensing. Unsupported or incorrect material should be corrected or explicitly deferred, not retained for a coverage count.

Specialization means exposing the **small subset relevant to each task**, not automatically creating more installed skills. Under ADR 008, keep one `arturo` entry point and specialize through its references. Any later split needs a separate demonstrated activation boundary and decision; an exploratory draft count is not a release target.

## Verification — Sol Low

Compare the same realistic tasks before/after condensation using Sol Low, identical tools/environment and recorded versions. Include automatic selection, explicit relevant guidance and a no-skill control; keep held-out checks outside agent workspaces. Exercise standard-library discovery, selected external packages, cross-domain work, instruction compliance and code correctness. Use the [evaluation procedure](../../evals/README.md) and repeated runs rather than judging only the xHigh editor's output.

Measure total workflow context and model usage, loaded references, runtime output, retries, completion and correctness. Smaller files alone are insufficient: discovery overhead or repeated repairs can erase their savings. Restore the smallest useful guidance when Low demonstrates a regression, then rerun affected scenarios. If live model access is unavailable, report the document/check results and leave behavioral claims unverified.

## Consequences

This separates coverage discovery from consumer-facing packaging and uses higher reasoning effort for synthesis without requiring consumers to run at that effort. It adds a handoff and review pass, and both stages can still omit facts or compress away important distinctions. Coverage dispositions, source checks and Low regression tasks are the safeguards. Cost, latency and reliability benefits remain hypotheses until measured. The model-specific strategy belongs in contributor/decision documentation; portable Arturo guidance must not depend on an OpenAI model or agent host.
