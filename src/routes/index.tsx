import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectsQuery } from "@/services/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import hero from "@/assets/p1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Rana — Architecture Studio" },
      { name: "description", content: "A minimalist architecture studio designing residential, commercial and public spaces in Indonesia." },
      { property: "og:title", content: "Atelier Rana — Architecture Studio" },
      { property: "og:description", content: "Quiet, considered architecture for living, working and gathering." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery()),
  component: Home,
});

function Home() {
  const { data } = useSuspenseQuery(projectsQuery());
  const words = ["Space", "shaped", "by", "light."];
  return (
    <>
      <section className="relative h-[88vh] min-h-[520px] overflow-hidden">
        <img src={hero} alt="Rumah Teduh at dusk" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="text-on-image relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16">
          <h1 className="text-6xl leading-none md:text-[9rem]">
            {words.map((w, i) => (
              <span key={w} className="animate-rise mr-[0.25em] inline-block" style={{ animationDelay: `${i * 140}ms` }}>{w}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-sm opacity-90">Atelier Rana designs houses, workplaces and public rooms across Indonesia.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="label">Selected work</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Recent projects</h2>
          </div>
          <Link to="/projects" className="text-sm underline underline-offset-4">All projects</Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {data.slice(0, 4).map((p) => <ProjectCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-4xl px-6 text-center">
        <p className="font-display text-3xl leading-snug md:text-4xl">“We work slowly and precisely — with climate, material and the people who will live in what we build.”</p>
        <Link to="/contact" className="mt-10 inline-block bg-primary px-6 py-3 text-sm text-primary-foreground">Start a conversation</Link>
      </section>
    </>
  );
}
