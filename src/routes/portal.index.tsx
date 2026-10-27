import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoRole } from "@/components/portal/DemoPortalContext";

export const Route = createFileRoute("/portal/")({
  head: () => ({ meta: [
    { title: "Demo Portal — Atelier Rana" },
    { name: "description", content: "Explore Atelier Rana’s fictional client project portal. No real authentication or payments." },
    { property: "og:title", content: "Demo Portal — Atelier Rana" },
    { property: "og:description", content: "A fictional client project experience from Atelier Rana." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PortalEntry,
});

function PortalEntry() {
  const { role, setRole } = useDemoRole();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-12 md:pt-20">
      <p className="label">Atelier Rana / Client space</p>
      <h1 className="mt-4 text-5xl md:text-7xl">Demo Client Portal</h1>
      <p className="mt-6 max-w-lg text-muted-foreground">{role === "Guest" ? "Guest view. Choose Client Demo to explore a fictional assigned project." : role === "Internal Demo" ? "Internal Demo is a read-only preview. Internal management tools are not included in this phase." : "Dewi & Arif Santoso · Omah Sunyi"}</p>
      <div className="mt-10 flex flex-wrap gap-3">
        {role === "Guest" ? <Button onClick={() => setRole("Client Demo")}>Choose Client Demo<ArrowUpRight /></Button> : <Button asChild><Link to="/portal/client">{role === "Internal Demo" ? "Open client preview" : "Open My Project"}<ArrowUpRight /></Link></Button>}
      </div>
    </section>
  );
}