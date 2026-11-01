// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import type { Scenario } from "./host";

const skill = (name: string) => `arturo-${name}`;
function task(
  id: string,
  domain: string[],
  prompt: string,
  check?: string,
  rubric?: string[],
  packages?: string[],
): Scenario {
  return {
    id,
    prompt,
    required: domain.map(skill),
    allowed: [...new Set([...domain, "language"])].map(skill),
    references: [],
    check,
    rubric,
    packages,
  };
}
export const scenarios: Scenario[] = [
  task(
    "typed-function",
    ["language"],
    "In solution.art define doubleValue accepting integer or floating numbers, returning exactly one doubled value. Reject text. Preserve polymorphism within that numeric contract.",
    `ensure [@[doubleValue 4] = [8]]\nensure [@[doubleValue 2.5] = [5.0]]\nensure [throws? [doubleValue "4"]]`,
  ),
  task(
    "nested-copy",
    ["language"],
    "Define changedFirst items value in solution.art. Return an independent nested block with its first nested element replaced. Reject empty outer/first inner blocks; preserve the original and return exactly one result.",
    `original: [[1 2] [3]]\nchanged: changedFirst original 9\nensure [changed = [[9 2] [3]]]\nensure [original = [[1 2] [3]]]\nset changed\\1 0 8\nensure [original = [[1 2] [3]]]\nensure [throws? [changedFirst [] 0]]\nensure [throws? [changedFirst [[]] 0]]`,
  ),
  task(
    "retain-matches",
    ["collections"],
    "Define positives items in solution.art, returning positive integers from a block without changing it. Include empty input.",
    `items: @[neg 2 0 3 1]\nensure [(positives items) = [3 1]]\nensure [items = @[neg 2 0 3 1]]\nensure [(positives []) = []]`,
  ),
  task(
    "iterator-scope",
    ["language"],
    "In solution.art define sumItems items with explicit iterator parameters. Sum integer inputs, including empty input, without changing any caller binding named item or total.",
    `item: 41\ntotal: 99\nensure [6 = sumItems [1 2 3]]\nensure [0 = sumItems []]\nensure [item = 41]\nensure [total = 99]`,
  ),
  task(
    "on-demand-signature",
    ["collections"],
    "Inspect the installed sort API, then define descendingCopy items in solution.art that sorts descending while preserving its input. Do not read an entire standard-library catalog.",
    `items: [2 1 3]\nensure [(descendingCopy items) = [3 2 1]]\nensure [items = [2 1 3]]\nensure [(descendingCopy []) = []]`,
    [
      "Trace contains a successful info.get sort lookup, not inspect of a literal or invocation of sort without arguments.",
    ],
  ),
  task(
    "sample-statistics",
    ["math"],
    "Define sampleVariance items in solution.art using Arturo's estimator. Reject fewer than two observations rather than inventing a variance. Preserve input.",
    `items: [1 3]\nensure [2.0 = sampleVariance items]\nensure [items = [1 3]]\nensure [throws? [sampleVariance []]]\nensure [throws? [sampleVariance [1]]]`,
  ),
  task(
    "units-colors",
    ["math"],
    "In solution.art define metersToCentimeters value using native quantities and namedBlue as Arturo's aliceBlue color. Reject incompatible dimensions; retain source units.",
    "q: 3`m\nensure [300 = scalar metersToCentimeters q]\nensure [q = 3`m]\nensure [namedBlue = #F0F8FF]\nensure [throws? [metersToCentimeters 3`s]]",
  ),
  task(
    "cli-identifiers",
    ["scripting"],
    "Define summarizeArgs inputs in solution.art. Accept exactly [identifier countText], preserve identifier leading zeroes, convert a nonnegative count, and return #[id: identifier count: count]. Reject wrong arity, malformed counts and negative counts.",
    'ensure [(summarizeArgs ["001" "003"]) = #[id: "001" count: 3]]\nensure [throws? [summarizeArgs []]]\nensure [throws? [summarizeArgs ["id" "bad"]]]\nensure [throws? [summarizeArgs ["id" "-1"]]]',
  ),
  task(
    "debug-stack",
    ["debugging"],
    "Fix this Arturo function in solution.art so it returns exactly one result: doubleValue: function [x][x + 1 return x * 2]. Explain the root cause and add a regression.",
    "ensure [@[doubleValue 3] = [6]]\nensure [@[doubleValue 0] = [0]]",
  ),
  task(
    "cleanup-failures",
    ["scripting"],
    "Implement a disposable file workflow that preserves both an action failure and a cleanup failure, attempts all owned-file removals, and checks removal postconditions. Put it in solution.art and run a bounded demonstration.",
    undefined,
    [
      "Action and cleanup errors are separately observable; later cleanup still runs.",
      "No recursive deletion fallback or removal of pre-existing files; temporary directory ownership is explicit.",
    ],
  ),
  task(
    "json-response",
    ["networking"],
    "Implement decodeProfile response scratchPath in solution.art for an HTTP 200 dictionary with JSON body containing a string name and logical active. Test malformed, missing and false/null inputs offline. Body strings that look like a path or URL must not be loaded as resources.",
    undefined,
    [
      "Transport/status/body errors stay distinct; false remains a logical false.",
      "Uses private staging/read.file.json and cleans after parse/validation failure; no live requests.",
    ],
  ),
  task(
    "schema-contract",
    ["validation"],
    "Using the available schema 0.3.0 package, implement port configuration conformance with a default role. Show invalid conformance and machine-readable fault diagnostics without changing the input.",
    undefined,
    [
      "conform failure is null; diagnostics come from checking the coerced copy.",
      "Tests required/unknown fields, defaults, invalid bounds, and unchanged source.",
    ],
    ["schema 0.3.0"],
  ),
  task(
    "text-packages",
    ["collections"],
    "Use available Recase and Unidecode packages to produce ASCII camelCase identifiers from Unicode names. Preserve originals and demonstrate collision handling. Write solution.art.",
    undefined,
    [
      "Loads only selected package references, not the package-management suite.",
      "Tests case/acronym behavior and collisions; does not treat transliteration as reversible.",
    ],
    ["recase", "unidecode"],
  ),
  task(
    "native-unitt",
    ["testing"],
    "Prepare an Arturo Unitt 3.1.1 project using config.art path checks and suffix .check.art. Use native discovery and also allow direct test-file execution. Include four executed assertions with two generated by a loop; give pass and failure verification commands.",
    undefined,
    [
      "Uses describe/it/expects with preserved configured paths and no custom runner.",
      "Standalone report is guarded; runner totals establish four assertions.",
      "Passing/failing exit status is distinguished from acquisition or reporter errors.",
    ],
    ["unitt 3.1.1"],
  ),
  task(
    "ci-repair",
    ["testing"],
    "Repair an Arturo CI proposal using setup-arturo with version: 0.10.0 and bundler version: 0.10.0 as if they pinned the runtime. Write a workflow that runs native Unitt, preserves failures, and builds an artifact. Explain which claims still require hosted execution.",
    undefined,
    [
      "Does not invent a setup version input or treat bundler archive labels as runtime pins.",
      "Verifies package executable PATH and distinguishes local/source review from hosted results.",
    ],
  ),
  task(
    "preview-ambiguity",
    ["web"],
    "I generated an Arturo site and want to preview it with lynx. What do you need before choosing and installing the package?",
    undefined,
    [
      "Asks whether Lanx is intended in this preview context; does not silently choose/install a package.",
      "Does not load networking just for the static preview.",
    ],
  ),
  task(
    "html-composition",
    ["web"],
    "Use the available HTML 1.0.0-rc.1 checkout to build reusable cards containing <, &, and quotes. Preserve nested markup without double escaping; show explicit trusted raw content and confirm built-in div still works outside the DSL. Write solution.art.",
    undefined,
    [
      "Uses the current API, to :string only at output boundaries, and scoped helpers.",
      "Checks escaping, composition, raw content, repeated rendering and restored built-ins.",
    ],
    ["html 1.0.0-rc.1"],
  ),
  task(
    "cross-domain-site",
    ["networking", "validation", "collections", "web", "testing"],
    "Build a small Arturo site pipeline from an offline HTTP response fixture: decode JSON, conform nested records with Schema, sort/filter them, render cards with the available HTML release, and add native Unitt tests. Provide Lanx preview and shutdown instructions. Generation errors must prevent preview startup.",
    undefined,
    [
      "Loads only task-relevant guides, selecting HTML guidance for the available release.",
      "Separates validation/rendering/writing/startup and checks malformed, empty and escaping cases.",
      "Reports actual test results; describes HTML/binary/404/shutdown integration separately.",
    ],
    ["schema 0.3.0", "html 1.0.0-rc.1", "unitt 3.1.1", "lanx 0.2.0"],
  ),
  task(
    "package-management",
    ["packages"],
    "Explain local package listing versus registry discovery, exact release versus branch selection, local namespace isolation, and how to prepare a new Arturo package publication without claiming it is already published.",
    undefined,
    [
      "Distinguishes list/remote, imports/acquisition/evaluation, version/branch, preparation/publication.",
    ],
  ),
  {
    id: "non-arturo",
    prompt: "In one sentence, explain what a CSV header row is.",
    required: [],
    allowed: [],
    references: [],
    rubric: ["No Arturo skill/reference loaded."],
  },
];
// Explicit condition supplies task-specific references as well as the entrypoint.
const references: Record<string, string[]> = {
  "typed-function": ["arturo-language/references/language.md"],
  "native-unitt": ["arturo-testing/references/unitt.md"],
  "ci-repair": ["arturo-testing/references/workflows.md"],
  "html-composition": ["arturo-web/references/html-current.md"],
  "schema-contract": ["arturo-validation/references/schema.md"],
  "cross-domain-site": [
    "arturo-networking/references/http-json.md",
    "arturo-validation/references/schema.md",
    "arturo-web/references/html-current.md",
    "arturo-testing/references/unitt.md",
  ],
};
for (const scenario of scenarios)
  scenario.references = references[scenario.id] ?? [];
