# Subscription evaluation evidence



## Frozen comparison

Baseline: `c2743e049cfab07e80f6e80acebfe7f2a26c1321`. Candidate and harness: `4b7811bdb941e301fa8227dc6cff4d7ffa3ad3b9`. Model: `gpt-6.1-sol`, reasoning low, Codex CLI 0.166.0, Arturo 0.10.0 Linux amd64. Authentication was ChatGPT; no API key was provided.

Guidance selection uses the harness inventory, not native Codex discovery. Both revisions use identical prompts, tool definitions, fixtures and graders. Explicit preview guidance includes the Lanx and package-management references for both revisions. The runtime preflight must execute file write/read and Arturo before scored attempts.

## Invalid initial batch

The initial 72 ambiguity attempts disabled the code-mode host required for tool exposure. The first runtime pilot exposed the error: it returned code in prose and reported workspace tools unavailable. All 72 attempts are marked infrastructure failures; they establish neither selection nor compliance. Original reports, prompts, traces and separate invalidation reviews are retained in `invalid-infrastructure.tar.gz`, with an adjacent SHA-256 file. They are excluded from the corrected comparison. The corrected runtime pilot actually called write_file and run_arturo and passed the held-out typed-function grader.

## Corrected preview comparison

All 18 preview attempts completed without transport failures. Manual review checked the final targeted clarification and the entire bounded-tool trace.

| Revision  | No skill | Automatic | Explicit references |
| --------- | -------- | --------- | ------------------- |
| Baseline  | 0/3      | 1/3       | 3/3                 |
| Candidate | 0/3      | 1/3       | 3/3                 |

Each successful answer named Lanx and asked which tool was intended before acquisition. Automatic failures omitted Lanx and missed relevant guidance; explicit guidance reliably produced the targeted clarification. No networking reference or acquisition was used. This does not satisfy the requirement that every critical candidate repetition pass: automatic selection remains inconsistent. Three repetitions do not establish statistical certainty.

## Provisioning

External code ran only inside the offline bounded runtime. Schema v0.3.0: `581d6da594da8166e96fb4ede668c128ef04bc4f`; HTML v1.0.0-rc.1: `3dbc7bfb29ae5fa0430d9b6eec88699afbf6e929`; Recase v1.0.4: `b6691478050834d32092f8efbd3eddf013918ca3`; Unidecode v0.0.3: `c5d0ee94934856f473e074cd929088760572a5aa`. Sources were fetched from the upstream repositories linked in the skill references.

Schema, Recase and Unidecode cache specs were constructed locally with reviewed entry paths and no dependencies; they were not claimed as registry acquisition. All three pinned imports passed an offline preflight. Existing Unitt 3.1.1, Lanx 0.2.0 and Mimetypes 1.0.0 caches were copied unchanged and fingerprinted. The copied global launchers retain host-specific paths and do not work inside the sandbox; agents must verify them and use native cached entries when needed. Both revisions receive this same limitation. HTML source checkouts and a raw cross-domain HTTP-response fixture are identical across revisions.

## Native Unitt comparison

All 18 generated projects independently passed native/direct execution, deliberate assertion failure, and restoration: each phase executed four assertions, negative runs had exactly one failed assertion and exit 1, and restored runs exited 0. Configuration selected checks/.check.art and no replacement runner was introduced. Twelve projects used supplied guidance; all twelve had the required standalone/filename report guard. The three no-skill baseline projects omitted standalone? and therefore failed the full manual rubric despite passing native/direct execution. The no-skill candidate projects happened to include it; this uncontrolled variation is not evidence that absent guidance changed behavior.

| Revision  | No skill: full rubric | Automatic | Explicit references |
| --------- | --------------------- | --------- | ------------------- |
| Baseline  | 0/3                   | 3/3       | 3/3                 |
| Candidate | 3/3                   | 3/3       | 3/3                 |

The independent review helper is `bun run evals/review-native.ts RESULTS_ROOT PACKAGES_DIR`. It processes completed stage1 groups, checks the six native/direct pass/fail/restore executions, and writes separate review-execution.json files. Its limited assertion mutator refuses unsupported syntax; such cases require manual review. It does not replace manual inspection of source, reporting scope, commands, or traces.

## Remaining evidence

The remaining campaign was stopped at the user’s request to publish the PR and inconsistencies. It retained 65 additional completed attempts that passed executable checks, plus three intentionally interrupted attempts. Manual rubrics remain pending where applicable; the full paired matrix was not completed. Interrupted attempts are excluded from behavioral conclusions. Their reports retain the original transport-exit error and separate interruption reviews explain the cause. `remaining-partial.tar.gz` and its SHA-256 file preserve these attempts, with a readable `remaining-partial-summary.json`. #12 has separate hosted evidence. #10 and #14 remain open; the PR remains draft.

## Reading the artifacts

`priority-comparison.tar.gz` preserves the 36 completed preview/native attempts, skill snapshots, prompts, events, generated artifacts and separate review files; its adjacent SHA-256 file checks the archive bytes. `review-execution.json` records independent native-project runs. Raw reports remain unchanged. Reviews are Codex’s provisional semantic assessments, pending code-owner investigation and approval. They do not replace owner review or establish the missing full matrix.

The original local campaign directories are `/tmp/arturo-subscription-campaign` (invalid) and `/tmp/arturo-subscription-campaign-v2` (corrected). Authentication homes are not archived. No API credentials or copied auth.json files are part of the evidence bundles. Upstream license texts for recorded excerpts are in UPSTREAM-NOTICES.md.
