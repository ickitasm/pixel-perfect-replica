import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/SiteLayout";
import { DemoForm } from "@/components/site/DemoForm";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career — Atelier Rana" },
      { name: "description", content: "Open positions at Atelier Rana." },
      { property: "og:title", content: "Career — Atelier Rana" },
      { property: "og:description", content: "Join a small, careful architecture studio." },
    ],
  }),
  component: Career,
});

const ROLES = [["Junior Architect", "Full-time · Jakarta"], ["Interior Designer", "Full-time · Jakarta"], ["Architecture Intern", "6 months · Jakarta"]];

function Career() {
  return (
    <>
      <PageIntro eyebrow="Career" title="Work with us." />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
        <ul>
          {ROLES.map(([t, m]) => <li key={t} className="border-t py-6"><h2 className="text-3xl">{t}</h2><p className="mt-1 text-sm text-muted-foreground">{m}</p></li>)}
        </ul>
        <DemoForm submitLabel="Send application (simulated)" fields={[{ name: "name", label: "Name" }, { name: "email", label: "Email", type: "email" }, { name: "role", label: "Position" }, { name: "note", label: "Portfolio link or note", textarea: true }]} />
      </div>
    </>
  );
}
