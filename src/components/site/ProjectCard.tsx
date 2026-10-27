import { Link } from "@tanstack/react-router";
import type { Project } from "@/services/projects";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link to="/projects/$slug" params={{ slug: p.slug }} className="group block">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img src={p.images[0]} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl">{p.title}</h3>
        <span className="label">{p.year}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        {p.category} · {p.location} · {p.status}
      </p>
    </Link>
  );
}
