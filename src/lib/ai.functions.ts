import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider, CHAT_MODEL, requireGatewayKey } from "./ai-gateway.server";
import { SYSTEM_PROMPTS, buildPrompt, type ToolId } from "./prompts";

const GenerateInput = z.object({
  tool: z.enum(["email", "notes", "planner", "research"]),
  fields: z.record(z.string()),
});

export const generateContent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => GenerateInput.parse(input))
  .handler(async ({ data }) => {
    const gateway = createLovableAiGatewayProvider(requireGatewayKey());
    const tool = data.tool as ToolId;

    try {
      const result = streamText({
        model: gateway(CHAT_MODEL),
        system: SYSTEM_PROMPTS[tool],
        prompt: buildPrompt(tool, data.fields),
      });
      return { ok: true as const, text: await result.text };
    } catch (error: unknown) {
      const status = (error as { statusCode?: number; status?: number })?.statusCode ??
        (error as { status?: number })?.status;
      const message =
        status === 429
          ? "The AI service is busy right now. Please wait a moment and try again."
          : status === 402
            ? "AI credits are exhausted for this workspace. Add credits in Lovable to continue."
            : status === 403
              ? "AI access is blocked by workspace policy. Contact your workspace admin."
              : (error as Error)?.message || "The AI request failed.";
      return { ok: false as const, error: message };
    }
  });
