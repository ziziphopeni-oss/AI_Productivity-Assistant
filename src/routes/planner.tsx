import { createFileRoute } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      {
        name: "description",
        content:
          "Break any work goal into a prioritised, time-boxed task plan with risks and a definition of done.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI" },
      {
        property: "og:description",
        content: "Turn goals into prioritised, realistic task plans with AI.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkspace
      tool="planner"
      icon={ListChecks}
      title="AI Task Planner"
      description="Describe your goal and constraints; get a prioritised plan you can edit and share with your team."
      ctaLabel="Build task plan"
      fields={[
        {
          name: "goal",
          label: "Goal or project",
          type: "textarea",
          rows: 4,
          required: true,
          placeholder: "Launch the new customer onboarding flow",
        },
        { name: "deadline", label: "Deadline", placeholder: "In 3 weeks / 30 September" },
        {
          name: "capacity",
          label: "Available time per day",
          type: "select",
          options: ["1 hour", "2 hours", "4 hours", "Full day"],
        },
        {
          name: "constraints",
          label: "Constraints, people & dependencies",
          type: "textarea",
          rows: 4,
          placeholder: "Two developers available; legal review needed before launch",
        },
      ]}
    />
  );
}
