import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="sticky top-14 z-20 -mx-4 flex items-start gap-4 border-b border-border bg-background/85 px-4 py-4 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
      <span className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary sm:flex">
        <Icon className="size-5 text-primary-foreground" />
      </span>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gradient-hot sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-[oklch(0.6_0.17_350)]">{description}</p>
      </div>
    </div>
  );
}
