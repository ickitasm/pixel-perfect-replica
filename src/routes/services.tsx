import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Atelier Rana" },
      { name: "description", content: "Architecture, interior design, master planning and site supervision." },
      { property: "og:title", content: "Services — Atelier Rana" },
      { property: "og:description", content: "From first sketch to handover." },
    ],
  }),
  component: Services,
});

const S = [
  ["01", "Architecture", "Concept, schematic and detailed design for new buildings and renovations."],
  ["02", "Interior", "Spaces, joinery and material palettes resolved together with the architecture."],
  ["03", "Planning", "Site studies, feasibility and master plans for larger or phased developments."],
  ["04", "Supervision", "Regular site visits, progress reports and coordination with contractors."],
];

function Services() {
  return (
    <>
      <PageIntro eyebrow="Services" title="From first sketch to handover.">One small team follows each project from the first conversation to the final site visit.</PageIntro>
      <div className="mx-auto max-w-7xl px-6">
        {S.map(([n, t, d]) => (
          <div key={n} className="grid gap-4 border-t py-10 md:grid-cols-[6rem_1fr_1.5fr]">
            <span className="label">{n}</span>
            <h2 className="text-4xl">{t}</h2>
            <p className="text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
