import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQuery } from "@/services/projects";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(projectQuery(params.slug));
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Atelier Rana` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.title} — Atelier Rana` },
          { property: "og:description", content: loaderData.description },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Project unavailable — Atelier Rana" }, { name: "robots", content: "noindex" }],
  }),
  component: Detail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-5xl">Project not found</h1>
      <Link to="/projects" className="mt-6 inline-block underline">Back to projects</Link>
    </div>
  ),
  errorComponent: () => <div className="mx-auto max-w-7xl px-6 py-32">This project couldn't load.</div>,
});

function Detail() {
  const { slug } = Route.useParams();
  const { data: p } = useSuspenseQuery(projectQuery(slug));
  if (!p) return null;
  const facts = [
    ["Category", p.category], ["Status", p.status], ["Location", p.location],
    ["Year", String(p.year)], ["Land area", `${p.landArea.toLocaleString()} m²`], ["Building area", `${p.buildingArea.toLocaleString()} m²`],
  ];
  return (
    <article>
      <div className="mx-auto max-w-7xl px-6 pb-10 pt-16">
        <Link to="/projects" className="label hover:text-foreground">← Projects</Link>
        <h1 className="mt-6 text-6xl md:text-8xl">{p.title}</h1>
      </div>
      <img src={p.images[0]} alt={p.title} className="aspect-[16/9] w-full object-cover" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1fr_2fr]">
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-1">
          {facts.map(([k, v]) => (
            <div key={k} className="border-t pt-3"><dt className="label">{k}</dt><dd className="mt-1">{v}</dd></div>
          ))}
        </dl>
        <p className="font-display text-2xl leading-relaxed md:text-3xl">{p.description}</p>
      </div>
      <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">
        {p.images.slice(1).map((src, i) => (
          <img key={i} src={src} alt={`${p.title} view ${i + 2}`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        ))}
      </div>
    </article>
  );
}
