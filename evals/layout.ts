// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import type { Scenario } from "./host";
import migration from "./layout-migration.json";

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
      const paths = migration.paths as Record<string, string>;
      return (paths[`skills/${path}`] ?? `skills/${path}`).replace(
        /^skills\//,
        "",
      );
    }),
    allowedReferenceDomains: scenario.allowed,
    referenceDomains: migration.referenceDomains,
  };
}
