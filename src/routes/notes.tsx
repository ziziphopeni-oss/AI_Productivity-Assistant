import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      {
        name: "description",
        content:
          "Turn raw meeting transcripts into structured summaries, decisions and owner-assigned action items.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI" },
      {
        property: "og:description",
        content: "Summarize meetings into decisions, action items and open questions with AI.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <ToolWorkspace
      tool="notes"
      icon={NotebookPen}
      title="Meeting Notes Summarizer"
      description="Paste raw notes or a transcript and get a structured summary with decisions and action items."
      ctaLabel="Summarize meeting"
      examples={["Anonymise names if the notes are confidential"]}
      fields={[
        { name: "title", label: "Meeting title", placeholder: "Weekly product sync" },
        { name: "attendees", label: "Attendees", placeholder: "Zizipho, Sarah, Dev team" },
        {
          name: "transcript",
          label: "Raw notes or transcript",
          type: "textarea",
          rows: 12,
          required: true,
          placeholder: "Paste the meeting transcript or your rough notes here…",
        },
        {
          name: "focus",
          label: "Summary focus",
          type: "select",
          options: ["Balanced", "Decisions & actions only", "Executive brief", "Detailed minutes"],
        },
      ]}
    />
  );
}
