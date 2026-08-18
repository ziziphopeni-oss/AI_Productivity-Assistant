import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import type { LucideIcon } from "lucide-react";
import { Copy, Eye, Loader2, Pencil, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { generateContent } from "@/lib/ai.functions";
import type { ToolId } from "@/lib/prompts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "input" | "textarea" | "select";
  options?: string[];
  rows?: number;
  required?: boolean;
};

export function ToolWorkspace({
  tool,
  icon,
  title,
  description,
  fields,
  ctaLabel,
  examples,
}: {
  tool: ToolId;
  icon: LucideIcon;
  title: string;
  description: string;
  fields: Field[];
  ctaLabel: string;
  examples?: string[];
}) {
  const run = useServerFn(generateContent);
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === "select" ? (f.options?.[0] ?? "") : ""])),
  );
  const [output, setOutput] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  const missing = fields.filter((f) => f.required && !values[f.name]?.trim());

  async function handleGenerate() {
    if (missing.length > 0) {
      toast.error(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setLoading(true);
    try {
      const labelled = Object.fromEntries(
        fields.map((f) => [f.label, values[f.name] ?? ""]),
      ) as Record<string, string>;
      const res = await run({ data: { tool, fields: labelled } });
      if (res.ok) {
        setOutput(res.text);
        setEditing(false);
      } else {
        toast.error(res.error);
      }
    } catch {
      toast.error("Could not reach the AI service. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8 sm:px-8">
      <PageHeader icon={icon} title={title} description={description} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
        <Card className="h-fit shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Structured prompt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name}>
                  {f.label}
                  {f.required ? <span className="text-destructive"> *</span> : null}
                </Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.name}
                    rows={f.rows ?? 5}
                    placeholder={f.placeholder ?? ""}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <Select value={values[f.name] ?? ""} onValueChange={(v) => set(f.name, v)}>
                    <SelectTrigger id={f.name}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {(f.options ?? []).map((o) => (
                        <SelectItem key={o} value={o}>
                          {o}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.name}
                    placeholder={f.placeholder ?? ""}
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
              </div>
            ))}

            <Button className="w-full" onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> {ctaLabel}
                </>
              )}
            </Button>

            {examples && examples.length > 0 ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                Tip: {examples.join(" · ")}
              </p>
            ) : null}
          </CardContent>
        </Card>

        <Card className="min-h-[28rem] shadow-[var(--shadow-card)]">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Draft output</CardTitle>
            {output ? (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing((e) => !e)}>
                  {editing ? <Eye className="size-4" /> : <Pencil className="size-4" />}
                  {editing ? "Preview" : "Edit"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    void navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard");
                  }}
                >
                  <Copy className="size-4" /> Copy
                </Button>
                <Button variant="ghost" size="sm" onClick={handleGenerate} disabled={loading}>
                  <RotateCcw className="size-4" /> Regenerate
                </Button>
              </div>
            ) : null}
          </CardHeader>
          <CardContent>
            {!output ? (
              <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
                <Sparkles className="mb-2 size-5 text-primary" />
                Fill in the prompt and generate a first draft.
              </div>
            ) : editing ? (
              <Textarea
                className="min-h-[24rem] font-mono text-xs"
                value={output}
                onChange={(e) => setOutput(e.target.value)}
              />
            ) : (
              <div className="prose-ai text-sm text-foreground">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            )}
            {output ? (
              <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
                Responsible AI: this draft is AI-generated and may contain errors. Verify facts,
                names and commitments before sending.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
