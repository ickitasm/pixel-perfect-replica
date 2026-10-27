import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CATEGORIES, STATUSES, filterProjects, projectsQuery, type Category, type Status } from "@/services/projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import { PageIntro } from "@/components/site/SiteLayout";

type Search = { q?: string | undefined; category?: Category | undefined; status?: Status | undefined };

export const Route = createFileRoute("/projects/")({
  validateSearch: (s: { q?: unknown; category?: unknown; status?: unknown }): Search => ({
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    category: CATEGORIES.includes(s.category as Category) ? (s.category as Category) : undefined,
    status: STATUSES.includes(s.status as Status) ? (s.status as Status) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Projects — Atelier Rana" },
      { name: "description", content: "Browse residential, commercial and public projects by Atelier Rana." },
      { property: "og:title", content: "Projects — Atelier Rana" },
      { property: "og:description", content: "Residential, commercial and common projects, completed and in progress." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(projectsQuery()),
  component: Projects,
});

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button aria-pressed={active} onClick={onClick} className={`border px-4 py-2 text-sm transition-colors ${active ? "border-foreground bg-primary text-primary-foreground" : "hover:border-foreground"}`}>
      {children}
    </button>
  );
}

function Projects() {
  const { data } = useSuspenseQuery(projectsQuery());
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/projects/" });
  const set = (patch: Partial<Search>) => navigate({ search: (s) => ({ ...s, ...patch }), replace: true });
  const list = filterProjects(data, search);

  return (
    <>
      <PageIntro eyebrow="Index" title="Projects" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 border-y py-6 lg:flex-row lg:items-center lg:justify-between">
          <input type="search" aria-label="Search projects" placeholder="Search by name or location" value={search.q ?? ""} onChange={(e) => set({ q: e.target.value || undefined })} className="w-full border-b bg-transparent py-2 outline-none focus:border-foreground lg:w-72" />
          <div className="flex flex-wrap gap-2">
            <Chip active={!search.category} onClick={() => set({ category: undefined })}>All</Chip>
            {CATEGORIES.map((c) => <Chip key={c} active={search.category === c} onClick={() => set({ category: c })}>{c}</Chip>)}
            <span className="mx-2 hidden w-px bg-border sm:block" />
            {STATUSES.map((s) => <Chip key={s} active={search.status === s} onClick={() => set({ status: search.status === s ? undefined : s })}>{s}</Chip>)}
          </div>
        </div>
        <p className="label mt-6" aria-live="polite">{list.length} project{list.length === 1 ? "" : "s"}</p>
        {list.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No projects match these filters.</p>
        ) : (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => <ProjectCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
