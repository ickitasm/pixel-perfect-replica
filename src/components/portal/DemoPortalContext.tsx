import { createContext, useContext, useState, type ReactNode } from "react";
import { DEMO_ROLES, type DemoRole } from "@/services/portal";
import { Link } from "@tanstack/react-router";
import { FlaskConical, ArrowLeft } from "lucide-react";

const DemoContext = createContext<{ role: DemoRole; setRole: (role: DemoRole) => void } | null>(null);

export function useDemoRole() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("Demo role requires the portal layout");
  return context;
}

export function DemoPortalProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<DemoRole>("Guest");
  return (
    <DemoContext.Provider value={{ role, setRole }}>
      <section className="border-b bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-start gap-3">
            <FlaskConical className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div><p className="text-sm font-semibold">DEMO MODE — not real authentication</p><p className="mt-1 text-xs text-muted-foreground">Fictional records only · No real uploads or payments</p></div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="demo-role" className="text-xs font-semibold">Demo role</label>
            <select id="demo-role" value={role} onChange={(event) => { const next = DEMO_ROLES.find((item) => item === event.target.value); if (next) setRole(next); }} className="h-10 rounded-md border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {DEMO_ROLES.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 pt-6"><Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />Back to studio</Link></div>
      {children}
    </DemoContext.Provider>
  );
}