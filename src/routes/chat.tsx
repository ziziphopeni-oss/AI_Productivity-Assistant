import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Loader2, MessageSquare, Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot Assistant — Workplace AI" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant for quick drafting, planning and problem-solving help at work.",
      },
      { property: "og:title", content: "AI Chatbot Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "A conversational AI assistant for everyday workplace tasks.",
      },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = [
  "Help me prepare an agenda for a project kickoff",
  "Rewrite this update so it sounds more confident",
  "What questions should I ask in a vendor review?",
];

function ChatPage() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function submit(text: string) {
    const value = text.trim();
    if (!value || busy) return;
    void sendMessage({ text: value });
    setInput("");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-8">
      <PageHeader
        icon={MessageSquare}
        title="AI Chatbot Assistant"
        description="Ask anything about your day-to-day work. Answers are drafts — review before acting on them."
      />

      <Card className="flex min-h-[60vh] flex-col shadow-[var(--shadow-card)]">
        <CardContent className="flex flex-1 flex-col gap-4 pt-6">
          <div className="flex-1 space-y-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <Sparkles className="size-6 text-primary" />
                <p className="text-sm text-muted-foreground">Start with one of these:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m) => {
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                const isUser = m.role === "user";
                return (
                  <div key={m.id} className={isUser ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className={
                        isUser
                          ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                          : "prose-ai max-w-[85%] rounded-2xl rounded-bl-sm bg-muted px-4 py-2.5 text-sm text-foreground"
                      }
                    >
                      {isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}
                    </div>
                  </div>
                );
              })
            )}
            {busy ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" /> Thinking…
              </div>
            ) : null}
            {error ? (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                The assistant could not respond. Please try again in a moment.
              </p>
            ) : null}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-end gap-2 border-t border-border pt-4"
          >
            <Textarea
              value={input}
              rows={2}
              placeholder="Ask the assistant…"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit(input);
                }
              }}
              className="min-h-0 resize-none"
            />
            <Button type="submit" size="icon" disabled={busy} aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
          <p className="text-center text-xs text-muted-foreground">
            AI responses may be inaccurate. Don&apos;t share confidential information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
