import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { ToolWorkspace } from "@/components/ToolWorkspace";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      {
        name: "description",
        content:
          "Draft clear, professional workplace emails in seconds with structured AI prompts and fully editable output.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI" },
      {
        property: "og:description",
        content: "Generate professional business emails with AI and edit them before sending.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <ToolWorkspace
      tool="email"
      icon={Mail}
      title="Smart Email Generator"
      description="Turn a few bullet points into a polished, professional email you can review and edit."
      ctaLabel="Generate email"
      examples={["Add real names and dates", "Keep sensitive data out of prompts"]}
      fields={[
        { name: "recipient", label: "Recipient & role", placeholder: "Thabo, Finance Manager" },
        {
          name: "purpose",
          label: "Purpose of the email",
          type: "textarea",
          rows: 4,
          required: true,
          placeholder: "Request approval for the Q3 software budget increase of 12%",
        },
        {
          name: "keyPoints",
          label: "Key points to include",
          type: "textarea",
          rows: 4,
          placeholder: "- Current licences expire 30 Sept\n- Two new team members joining",
        },
        {
          name: "tone",
          label: "Tone",
          type: "select",
          options: ["Professional", "Friendly", "Formal", "Concise", "Persuasive", "Apologetic"],
        },
        {
          name: "length",
          label: "Length",
          type: "select",
          options: ["Short (under 100 words)", "Medium", "Detailed"],
        },
      ]}
    />
  );
}
