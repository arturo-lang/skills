import type { Scenario } from "./host";
import referenceDomains from "./reference-domains.json";

/** Keep prompts/checks fixed while translating expectations for the installed layout. */
export function scenarioForLayout(
  scenario: Scenario,
  installed: string[],
): Scenario {
  if (!installed.includes("arturo")) return scenario;
  return {
    ...scenario,
    required: scenario.required.length ? ["arturo"] : [],
    allowed: scenario.allowed.length ? ["arturo"] : [],
    references: scenario.references.map((path) => {
      // Active scenarios use unchanged reference basenames across layouts.
      return path.replace(/^arturo-[^/]+\/references\//, "arturo/references/");
    }),
    allowedReferenceDomains: scenario.allowed,
    referenceDomains,
  };
}
