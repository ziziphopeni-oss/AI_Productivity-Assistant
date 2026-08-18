import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      {
        name: "description",
        content:
          "Get structured briefings on any work topic: executive summary, key findings, trade-offs and next steps.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "Structured AI briefings with findings, trade-offs and a verification checklist.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <ToolWorkspace
      tool="research"
      icon={Search}
      title="AI Research Assistant"
      description="Get a structured briefing on any workplace topic, with a checklist of what to verify yourself."
      ctaLabel="Research topic"
      examples={["The assistant has no live web access — verify all facts and figures"]}
      fields={[
        {
          name: "topic",
          label: "Research question",
          type: "textarea",
          rows: 4,
          required: true,
          placeholder: "What should we consider before adopting a four-day work week?",
        },
        { name: "context", label: "Business context", placeholder: "40-person SaaS company in SA" },
        {
          name: "depth",
          label: "Depth",
          type: "select",
          options: ["Quick brief", "Standard analysis", "Deep dive"],
        },
        {
          name: "audience",
          label: "Audience",
          type: "select",
          options: ["Executive team", "Team leads", "Whole company", "Client"],
        },
      ]}
    />
  );
}
