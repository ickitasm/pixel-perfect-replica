import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

const NAV = [
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/career", label: "Career" },
  { to: "/contact", label: "Contact" },
] as const;

export const STUDIO = "Atelier Rana";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="font-display text-2xl tracking-tight">{STUDIO}</Link>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-sm text-foreground underline underline-offset-8" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="text-sm md:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col gap-1 border-t px-6 pb-6 pt-2 md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-3 font-display text-3xl">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">{STUDIO}</p>
          <p className="mt-2 text-sm text-muted-foreground">Fictional demo studio. All content is sample data.</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="label mb-3">Studio</p>
          <p>Jl. Contoh No. 12, Jakarta</p>
          <p>hello@example.com</p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="label mb-3">Demo portal</p>
          <p>Coming in the next phase.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-20 md:pt-28">
      <p className="label">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
      {children && <div className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </section>
  );
}
