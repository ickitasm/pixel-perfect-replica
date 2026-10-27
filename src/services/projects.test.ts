import { describe, it, expect } from "vitest";
import { filterProjects } from "./projects";
import { seedProjects } from "@/data/seed";

describe("filterProjects", () => {
  it("filters by category", () => {
    const r = filterProjects(seedProjects, { category: "Common" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((p) => p.category === "Common")).toBe(true);
  });
  it("filters by status", () => {
    expect(filterProjects(seedProjects, { status: "In Progress" }).every((p) => p.status === "In Progress")).toBe(true);
  });
  it("searches location", () => {
    expect(filterProjects(seedProjects, { q: "ubud" }).map((p) => p.slug)).toEqual(["omah-sunyi"]);
  });
});
