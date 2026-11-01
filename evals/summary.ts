// Copyright © RickBarretto, Arturo programming language. MIT licensed.
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
export function percentile(values: number[], fraction: number): number | null {
  if (!values.length) return null;
  const sorted = values.toSorted((a, b) => a - b);
  return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)];
}
if (import.meta.main) {
  const root = resolve(Bun.argv[2] ?? ".");
  const reports = [];
  for (const name of await readdir(root)) {
    try {
      const report = JSON.parse(
        await readFile(resolve(root, name, "report.json"), "utf8"),
      );
      try {
        const review = JSON.parse(
          await readFile(resolve(root, name, "review.json"), "utf8"),
        );
        if (
          !review.reviewer ||
          !review.evidence ||
          !["passed", "failed"].includes(review.status)
        )
          throw new Error(
            "Review needs reviewer, evidence and passed/failed status",
          );
        report.manualReviewStatus = review.status;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      reports.push(report);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
  const groups = new Map<string, typeof reports>();
  for (const report of reports) {
    const key = `${report.revision}/${report.skillHash}/${report.mode}`;
    const group = groups.get(key) ?? [];
    group.push(report);
    groups.set(key, group);
  }
  for (const [group, runs] of groups) {
    const success = runs.filter(
      (r) =>
        r.finished &&
        !r.infrastructureError &&
        (r.correctness?.passed ||
          (r.correctness === null && r.manualReviewStatus === "passed")) &&
        ["not-required", "passed"].includes(r.manualReviewStatus),
    );
    const inputs = runs.map((r) => r.usage.cumulativeInputTokens as number);
    console.log(
      JSON.stringify(
        {
          group,
          attempts: runs.length,
          verifiedSuccesses: success.length,
          manualReviewsPending: runs.filter(
            (r) => r.manualReviewStatus === "pending",
          ).length,
          infrastructureFailures: runs.filter((r) => r.infrastructureError)
            .length,
          selectionFailures: runs.filter(
            (r) =>
              r.selection &&
              (r.selection.missing.length || r.selection.irrelevant.length),
          ).length,
          medianInputTokens: percentile(inputs, 0.5),
          p90InputTokens: percentile(inputs, 0.9),
          medianRequests: percentile(
            runs.map((r) => r.usage.requests),
            0.5,
          ),
          medianElapsedMs: percentile(
            runs.map((r) => r.elapsedMs),
            0.5,
          ),
          totalInputTokensPerVerifiedSuccess: success.length
            ? inputs.reduce((a, b) => a + b, 0) / success.length
            : null,
          medianSkillBytes: percentile(
            runs.map((r) => r.contextBytes.entry + r.contextBytes.reference),
            0.5,
          ),
          warning:
            "Compare identical scenario sets and provisioning. Pending human rubrics prevent a release verdict; bytes are not tokens.",
        },
        null,
        2,
      ),
    );
  }
}
