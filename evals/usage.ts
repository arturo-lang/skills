
import type { Event } from "./host";

type Usage = {
  input_tokens: number;
  output_tokens: number;
  input_tokens_details?: { cached_tokens: number };
  output_tokens_details?: { reasoning_tokens: number };
};

export function recordedUsage(events: Event[], subscription: boolean): Usage[] {
  if (!subscription)
    return events
      .filter((e) => e.kind === "response" && e.usage)
      .map((e) => e.usage as Usage);
  const event = events.findLast(
    (e) => e.method === "thread/tokenUsage/updated",
  );
  const total = (
    event?.params as
      | {
          tokenUsage?: {
            total?: {
              inputTokens: number;
              outputTokens: number;
              cachedInputTokens: number;
              reasoningOutputTokens: number;
            };
          };
        }
      | undefined
  )?.tokenUsage?.total;
  return total
    ? [
        {
          input_tokens: total.inputTokens,
          output_tokens: total.outputTokens,
          input_tokens_details: { cached_tokens: total.cachedInputTokens },
          output_tokens_details: {
            reasoning_tokens: total.reasoningOutputTokens,
          },
        },
      ]
    : [];
}
