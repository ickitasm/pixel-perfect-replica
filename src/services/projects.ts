// Demo service layer. Swap the implementation for a real backend later; UI only uses these functions.
import { queryOptions } from "@tanstack/react-query";
import { seedProjects, type Category, type Project, type Status } from "@/data/seed";

export type { Project, Category, Status };
export const CATEGORIES: Category[] = ["Commercial", "Residential", "Common"];
export const STATUSES: Status[] = ["Completed", "In Progress"];

export interface ProjectFilter {
  q?: string;
  category?: Category;
  status?: Status;
}

export function filterProjects(list: Project[], f: ProjectFilter): Project[] {
  const q = f.q?.trim().toLowerCase();
  return list.filter(
    (p) =>
      p.isPublic &&
      (!f.category || p.category === f.category) &&
      (!f.status || p.status === f.status) &&
      (!q || `${p.title} ${p.location} ${p.description}`.toLowerCase().includes(q)),
  );
}

export async function listProjects(): Promise<Project[]> {
  return [...seedProjects].sort((a, b) => b.year - a.year);
}

export async function getProject(slug: string): Promise<Project | null> {
  return seedProjects.find((p) => p.slug === slug && p.isPublic) ?? null;
}

export const projectsQuery = () => queryOptions({ queryKey: ["projects"], queryFn: listProjects });
export const projectQuery = (slug: string) =>
  queryOptions({ queryKey: ["project", slug], queryFn: () => getProject(slug) });
