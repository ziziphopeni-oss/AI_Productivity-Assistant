import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: draft emails, summarize meetings, plan work, research topics and chat with an assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "A clean SaaS dashboard of AI tools for professionals: emails, meeting notes, task plans and research.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Turn bullet points into polished, on-tone business emails.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Summaries, decisions and owner-assigned action items from raw notes.",
  },
  {
    to: "/planner",
    icon: ListChecks,
    title: "AI Task Planner",
    body: "Break goals into prioritised, time-boxed tasks with risks flagged.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    body: "Structured briefings with findings, trade-offs and next steps.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    body: "Ask anything about your work and iterate in conversation.",
  },
] as const;

const STATS = [
  { icon: Clock, label: "Faster drafting", value: "Minutes, not hours" },
  { icon: Sparkles, label: "Structured prompts", value: "Guided inputs" },
  { icon: ShieldCheck, label: "Human in the loop", value: "Every output editable" },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-8">
      <section className="overflow-hidden rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-[var(--shadow-elevated)] sm:p-12">
        <p className="text-xs font-medium uppercase tracking-widest opacity-80">
          Workplace productivity
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          AI Workplace Productivity Assistant
        </h1>
        <p className="mt-3 max-w-xl text-sm opacity-90 sm:text-base">
          Automate the repetitive parts of your workday — writing, summarizing, planning and
          researching — while staying firmly in control of the final output.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary">
            <Link to="/email">
              Start with an email <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/40 bg-transparent">
            <Link to="/chat">Open the chatbot</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {STATS.map(({ icon: Icon, label, value }) => (
          <Card key={label} className="shadow-[var(--shadow-card)]">
            <CardContent className="flex items-center gap-3 pt-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent">
                <Icon className="size-4 text-accent-foreground" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{value}</span>
                <span className="block text-xs text-muted-foreground">{label}</span>
              </span>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Your AI toolkit</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, body }) => (
            <Link key={to} to={to} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow-elevated)]">
                <CardHeader className="space-y-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-4 text-primary" />
                  </span>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <Card className="border-accent bg-accent/40">
          <CardHeader className="flex flex-row items-center gap-2 space-y-0">
            <ShieldCheck className="size-4 text-accent-foreground" />
            <CardTitle className="text-base">Responsible AI use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Every output on this platform is AI-generated and may be incomplete, biased or
              factually wrong. Treat it as a first draft, never as a final decision.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Review and edit all content before sending or publishing it.</li>
              <li>Do not enter confidential, personal or regulated data into prompts.</li>
              <li>Verify facts, figures, names and dates independently.</li>
              <li>A human remains accountable for every decision taken from this output.</li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
