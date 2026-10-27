import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/SiteLayout";
import { DemoForm } from "@/components/site/DemoForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier Rana" },
      { name: "description", content: "Get in touch with Atelier Rana about a new project." },
      { property: "og:title", content: "Contact — Atelier Rana" },
      { property: "og:description", content: "Tell us about your site and your plans." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Tell us about your project." />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2">
        <div className="space-y-6 text-muted-foreground">
          <div><p className="label">Studio</p><p className="mt-2">Jl. Contoh No. 12, Kebayoran Baru, Jakarta</p></div>
          <div><p className="label">Email</p><p className="mt-2">hello@example.com</p></div>
          <div><p className="label">Hours</p><p className="mt-2">Mon–Fri, 09:00–17:00 WIB</p></div>
          <p className="text-xs">All details are fictional placeholders.</p>
        </div>
        <DemoForm submitLabel="Send message (simulated)" fields={[{ name: "name", label: "Name" }, { name: "email", label: "Email", type: "email" }, { name: "msg", label: "Project details", textarea: true }]} />
      </div>
    </>
  );
}
