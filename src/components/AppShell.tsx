import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  NotebookPen,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  Menu,
  ShieldAlert,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: MessageSquare },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          onClick={onNavigate}
          activeOptions={{ exact: to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          activeProps={{
            className:
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-sidebar-accent text-sidebar-accent-foreground",
          }}
        >
          <Icon className="size-4 shrink-0" />
          {label}
        </Link>
      ))}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="flex h-full flex-col gap-6 bg-sidebar p-4">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-2 pt-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-primary">
          <Sparkles className="size-4 text-primary-foreground" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-semibold text-sidebar-foreground">Workplace AI</span>
          <span className="block text-xs text-sidebar-foreground/60">Productivity Assistant</span>
        </span>
      </Link>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto rounded-xl border border-sidebar-border p-3">
        <p className="flex items-center gap-2 text-xs font-semibold text-sidebar-foreground">
          <ShieldAlert className="size-3.5" /> Responsible AI
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-sidebar-foreground/60">
          AI output can be inaccurate. Review and edit everything before sharing, and never paste
          confidential data.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="sticky top-0 hidden h-screen lg:block">
        <SidebarBody />
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 border-none p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarBody onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <span className="text-sm font-semibold">Workplace AI</span>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground sm:px-8">
          AI-generated content may be inaccurate or incomplete. Always review before use.
        </footer>
      </div>
    </div>
  );
}
