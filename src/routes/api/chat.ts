import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import {
  CHAT_MODEL,
  createLovableAiGatewayProvider,
  requireGatewayKey,
} from "@/lib/ai-gateway.server";

const SYSTEM = `You are the AI Workplace Productivity Assistant.
You help professionals draft communication, plan work, summarize meetings and research topics.
Be concise, practical and well-structured. Use markdown.
Never invent facts, figures, policies or sources; state clearly when something must be verified by a human.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages: UIMessage[] };

        try {
          const gateway = createLovableAiGatewayProvider(requireGatewayKey());
          const result = streamText({
            model: gateway(CHAT_MODEL),
            system: SYSTEM,
            messages: await convertToModelMessages(messages),
          });
          return result.toUIMessageStreamResponse();
        } catch (error) {
          return new Response(
            JSON.stringify({ error: (error as Error)?.message ?? "AI request failed" }),
            { status: 500, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
