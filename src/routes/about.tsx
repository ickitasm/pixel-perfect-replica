import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/SiteLayout";
import img from "@/assets/p3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atelier Rana" },
      { name: "description", content: "Our studio, principles and team." },
      { property: "og:title", content: "About — Atelier Rana" },
      { property: "og:description", content: "A small Jakarta studio working with climate, material and light." },
    ],
  }),
  component: About,
});

const TEAM = [["Rana Pratiwi", "Principal Architect"], ["Dimas Wirawan", "Associate"], ["Sari Lestari", "Interior Lead"], ["Bayu Hartono", "Site Supervisor"]];

function About() {
  return (
    <>
      <PageIntro eyebrow="About" title="A small studio, working carefully.">Founded in Jakarta in 2015 (fictional). We believe good buildings are quiet, durable and generous to their climate.</PageIntro>
      <img src={img} alt="Studio courtyard" loading="lazy" className="mx-auto aspect-[16/8] w-full max-w-7xl object-cover px-6" />
      <div className="mx-auto mt-24 grid max-w-7xl gap-10 px-6 md:grid-cols-3">
        {[["Climate first", "Shade, breeze and rain shape the plan before style does."], ["Honest material", "Concrete, brick and timber used plainly and well."], ["Close collaboration", "Clients see progress openly at every stage."]].map(([t, d]) => (
          <div key={t} className="border-t pt-4"><h2 className="text-3xl">{t}</h2><p className="mt-2 text-muted-foreground">{d}</p></div>
        ))}
      </div>
      <div className="mx-auto mt-24 max-w-7xl px-6">
        <p className="label">Team (fictional)</p>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {TEAM.map(([n, r]) => <li key={n} className="border-t pt-3"><p className="text-lg">{n}</p><p className="text-sm text-muted-foreground">{r}</p></li>)}
        </ul>
      </div>
    </>
  );
}
