import { expect, test } from "bun:test";
import type { Event } from "./host";
import { recordedUsage } from "./usage";

test("stopped subscription attempts retain latest cumulative usage without double counting", () => {
  const update = (inputTokens: number): Event => ({
    method: "thread/tokenUsage/updated",
    params: {
      tokenUsage: {
        total: {
          inputTokens,
          outputTokens: 30,
          cachedInputTokens: 50,
          reasoningOutputTokens: 4,
        },
      },
    },
  });
  const events = [update(100), update(200)];
  expect(recordedUsage(events, true)).toEqual([
    {
      input_tokens: 200,
      output_tokens: 30,
      input_tokens_details: { cached_tokens: 50 },
      output_tokens_details: { reasoning_tokens: 4 },
    },
  ]);
  events.push({
    kind: "response",
    usage: { input_tokens: 200, output_tokens: 30 },
  });
  expect(recordedUsage(events, true)).toHaveLength(1);
  expect(recordedUsage(events, false)).toEqual([
    { input_tokens: 200, output_tokens: 30 },
  ]);
  expect(recordedUsage([], true)).toEqual([]);
});
