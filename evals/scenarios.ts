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
    "expressive-syntax",
    ["language"],
    "Write solution.art with typed doubleValue (integer or floating input, exactly one doubled result), and changedFirst items value returning an independent flat block with its first element replaced, rejecting empty input. Follow Arturo conventions for expressive symbols, single-expression bodies and explicit multi-step bodies. Keep data and parameter blocks intact.",
    'ensure [@[doubleValue 4] = [8]]\nensure [@[doubleValue 2.5] = [5.0]]\nensure [throws? [doubleValue "4"]]\nitems: [1 2]\nensure [@[changedFirst items 9] = [[9 2]]]\nensure [items = [1 2]]\nensure [throws? [changedFirst [] 9]]',
    [
      "Uses documented symbols such as $ and * rather than function/mul when writing new functions; spells logical functions such as and?, or? and not? explicitly rather than using logical symbols.",
      "Uses -> for the single-expression function and assertions where appropriate; retains [] for data, typed parameters and the multi-step copy/update body.",
      "Keeps spacing, grouping and statement boundaries readable; does not change arity, evaluation, mutation or package predicates to shorten the code.",
    ],
  ),
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
  "expressive-syntax": [
    "arturo-language/references/language.md",
    "arturo/references/formatting.md",
  ],
  "typed-function": ["arturo-language/references/language.md"],
};
for (const scenario of scenarios)
  scenario.references = references[scenario.id] ?? [];
