import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowUpRight, Check, Clock3, FileText, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clientPortalQuery, formatRupiah, SAMPLE_PROOFS, submitDemoProof, type ClientPortalData, type DemoInvoice } from "@/services/portal";
import { useDemoRole } from "./DemoPortalContext";

export const CLIENT_TABS = [
  { value: "overview", label: "My Project" },
  { value: "design", label: "Design & Output" },
  { value: "timeline", label: "Progress Timeline" },
  { value: "reports", label: "Progress Reports" },
  { value: "documents", label: "Documents" },
  { value: "materials", label: "Material List" },
  { value: "billing", label: "Billing" },
] as const;
export type ClientTab = typeof CLIENT_TABS[number]["value"];

function Status({ children }: { children: string }) {
  return <span className="inline-flex items-center gap-1.5 text-xs font-medium"><span className={children === "Completed" || children === "Paid" || children === "Approved" ? "size-1.5 rounded-full bg-primary" : "size-1.5 rounded-full bg-accent"} />{children}</span>;
}

export function ClientPortal({ data, tab, onTabChange }: { data: ClientPortalData; tab: ClientTab; onTabChange: (tab: ClientTab) => void }) {
  const { role, setRole } = useDemoRole();
  const [preview, setPreview] = useState<{ title: string; text?: string; image?: string | undefined } | null>(null);
  const project = data.project;
  if (role === "Guest") return <section className="mx-auto max-w-7xl px-6 py-16"><p className="label">Client space</p><h1 className="mt-4 text-5xl">Guest view</h1><p className="mt-6 text-muted-foreground">No sample project selected.</p><Button className="mt-8" onClick={() => setRole("Client Demo")}>Choose Client Demo<ArrowUpRight /></Button></section>;
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-10 md:pt-16">
      {role === "Internal Demo" && <p className="mb-6 border-l-2 border-accent pl-4 text-sm text-muted-foreground">Internal Demo · Read-only client preview. Payment-proof submission is available in Client Demo only.</p>}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="label">Client project / AR–026</p><h1 className="mt-3 text-5xl md:text-7xl">{project.title}</h1><p className="mt-3 text-sm text-muted-foreground">{project.location} <span aria-hidden="true">/</span> {data.client}</p></div>
        <div className="pb-1"><Status>{project.status}</Status><p className="mt-2 text-xs text-muted-foreground">Project lead · {data.lead}</p></div>
      </div>
      <Tabs value={tab} onValueChange={(value) => { const next = CLIENT_TABS.find((item) => item.value === value); if (next) onTabChange(next.value); }} className="mt-10">
        <div className="overflow-x-auto border-b">
          <TabsList aria-label="Client project sections" className="h-auto min-w-max justify-start gap-4 rounded-none bg-transparent p-0">
            {CLIENT_TABS.map((item) => <TabsTrigger key={item.value} value={item.value} className="rounded-none border-b-2 border-transparent px-1 py-4 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none">{item.label}</TabsTrigger>)}
          </TabsList>
        </div>
        <TabsContent value="overview" className="mt-8">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div><img src={project.images[0]} alt="Omah Sunyi fictional courtyard design" className="aspect-[3/2] w-full object-cover" /><p className="mt-2 text-xs text-muted-foreground">Fictional project · Illustrative design render</p></div>
            <div><p className="label">Project overview</p><h2 className="mt-3 text-3xl">A retreat, rooted in place.</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y py-6">{[["Land area", `${project.landArea} m²`], ["Building area", `${project.buildingArea} m²`], ["Category", project.category], ["Target handover", "February 2027"]].map(([label, value]) => <div key={label}><dt className="label">{label}</dt><dd className="mt-2 text-sm">{value}</dd></div>)}</dl>
              <div className="mt-6 flex items-center justify-between"><h3 className="text-2xl">Overall progress</h3><span className="text-xl">{data.progress}%</span></div>
              <div role="progressbar" aria-label="Overall project progress" aria-valuenow={data.progress} aria-valuemin={0} aria-valuemax={100} className="mt-3 flex h-1.5 bg-secondary"><span className="w-[62%] bg-accent" /></div>
              <p className="mt-4 text-xs text-muted-foreground">Next · {data.nextMilestone}</p>
              <Button variant="link" className="mt-4 px-0" onClick={() => onTabChange("timeline")}>View timeline<ArrowUpRight /></Button>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y py-6"><div><p className="label">Latest update · {data.reports[0]?.date}</p><h3 className="mt-2 text-2xl">{data.reports[0]?.title}</h3></div><Button variant="outline" onClick={() => onTabChange("reports")}>Read report<ArrowUpRight /></Button></div>
        </TabsContent>
        <TabsContent value="design" className="mt-8"><SectionTitle title="Design & Output" detail="Omah Sunyi / Design development" /><div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">{data.designs.map((design) => <article key={design.id}><Button variant="ghost" className="h-auto w-full overflow-hidden p-0 hover:bg-transparent" onClick={() => setPreview({ title: design.title, image: project.images[design.imageIndex] })} aria-label={`Preview ${design.title}`}><img src={project.images[design.imageIndex]} alt={design.title} className="aspect-[4/3] w-full object-cover" /></Button><h3 className="mt-4 text-2xl">{design.title}</h3><p className="mt-1 text-xs text-muted-foreground">{design.revision}</p></article>)}</div></TabsContent>
        <TabsContent value="timeline" className="mt-8"><SectionTitle title="Progress Timeline" detail="Target handover / February 2027" /><ol className="mt-8 max-w-3xl">{data.milestones.map((milestone) => <li key={milestone.title} className="flex gap-5 border-b py-6"><span className="flex size-9 shrink-0 items-center justify-center rounded-full border">{milestone.status === "Completed" ? <Check className="size-4" /> : <Clock3 className="size-4 text-accent" />}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl">{milestone.title}</h3><Status>{milestone.status}</Status></div><p className="mt-1 text-xs text-muted-foreground">{milestone.date}</p><p className="mt-3 text-sm text-muted-foreground">{milestone.note}</p></div></li>)}</ol></TabsContent>
        <TabsContent value="reports" className="mt-8"><SectionTitle title="Progress Reports" detail="Site coordination / October 2026" /><div className="mt-6 grid gap-10 md:grid-cols-2">{data.reports.map((report) => <article key={report.id}><img src={project.images[report.imageIndex]} alt={report.caption} className="aspect-[16/9] w-full object-cover" /><p className="mt-2 text-xs text-muted-foreground">{report.caption}</p><p className="label mt-5">{report.date}</p><h3 className="mt-2 text-3xl">{report.title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{report.note}</p></article>)}</div></TabsContent>
        <TabsContent value="documents" className="mt-8"><SectionTitle title="Documents" detail="Fictional sample previews / No private files" /><div className="mt-6">{data.documents.map((document) => <article key={document.id} className="flex flex-wrap items-center justify-between gap-4 border-b py-6"><div className="flex items-center gap-4"><FileText className="size-5 shrink-0 text-accent" /><div><h3 className="text-2xl">{document.title}</h3><p className="mt-1 text-xs text-muted-foreground">{document.kind} · {document.revision}</p></div></div><Button variant="outline" onClick={() => setPreview({ title: document.title, text: document.content })}>Preview sample<ArrowUpRight /></Button></article>)}</div></TabsContent>
        <TabsContent value="materials" className="mt-8"><SectionTitle title="Material List" detail="Finish & procurement schedule / Revision 02" /><div className="mt-6 overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><caption className="sr-only">Fictional project materials</caption><thead className="border-b"><tr>{["Material", "Specification", "Quantity", "Status"].map((heading) => <th key={heading} scope="col" className="py-4 pr-6 text-xs font-medium text-muted-foreground">{heading}</th>)}</tr></thead><tbody>{data.materials.map((material) => <tr key={material.item} className="border-b"><th scope="row" className="py-5 pr-6 font-medium">{material.item}</th><td className="py-5 pr-6 text-muted-foreground">{material.spec}</td><td className="py-5 pr-6">{material.quantity}</td><td className="py-5"><Status>{material.status}</Status></td></tr>)}</tbody></table></div></TabsContent>
        <TabsContent value="billing" className="mt-8"><Billing data={data} /></TabsContent>
      </Tabs>
      <Dialog open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}><DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto"><DialogHeader><DialogTitle>{preview?.title}</DialogTitle><DialogDescription>Fictional sample — not a private project file.</DialogDescription></DialogHeader>{preview?.image && <img src={preview.image} alt={preview.title} className="max-h-[65vh] w-full object-contain" />}{preview?.text && <p className="text-sm leading-relaxed text-muted-foreground">{preview.text}</p>}</DialogContent></Dialog>
    </section>
  );
}

function SectionTitle({ title, detail }: { title: string; detail: string }) {
  return <div className="flex flex-wrap items-end justify-between gap-3"><h2 className="text-3xl md:text-4xl">{title}</h2><p className="text-xs text-muted-foreground">{detail}</p></div>;
}

function Billing({ data }: { data: ClientPortalData }) {
  const { role } = useDemoRole();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<DemoInvoice | null>(null);
  const [proof, setProof] = useState(SAMPLE_PROOFS[0]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  function submit() {
    if (!selected) return;
    try {
      const invoices = submitDemoProof(data.invoices, selected.id, proof, role);
      queryClient.setQueryData(clientPortalQuery().queryKey, { ...data, invoices });
      setNotice(`${selected.number}: sample proof submitted — Pending Review. No payment has been confirmed.`);
      setSelected(null);
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Sample submission failed."); }
  }
  return <>
    <SectionTitle title="Billing" detail="All amounts in IDR / Fictional invoices" />
    <div className="mt-6 grid gap-6 border-y py-6 sm:grid-cols-3">{[["Project fees", data.invoices.reduce((sum, invoice) => sum + invoice.amount, 0)], ["Settled (sample)", data.invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0)], ["Unconfirmed balance", data.invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0)]].map(([label, amount]) => <div key={label}><p className="label">{label}</p><p className="mt-2 text-xl">{formatRupiah(Number(amount))}</p></div>)}</div>
    <p className="mt-5 text-sm text-muted-foreground">Submitting sample proof sets an invoice to Pending Review, not Paid. Settled invoices below are pre-filled fictional records.</p>
    <p role="status" className="mt-4 text-sm text-accent">{notice}</p>
    <div className="mt-2">{data.invoices.map((invoice) => <article key={invoice.id} className="grid items-center gap-4 border-b py-6 md:grid-cols-[1fr_180px_180px]"><div><p className="label">{invoice.number}</p><h3 className="mt-2 text-2xl">{invoice.title}</h3><p className="mt-2 text-xs text-muted-foreground">Due {invoice.due}</p>{invoice.proof && <p className="mt-2 break-all text-xs text-muted-foreground">Sample proof · {invoice.proof}</p>}</div><div><p className="text-lg">{formatRupiah(invoice.amount)}</p><div className="mt-2"><Status>{invoice.status}</Status></div></div><div>{invoice.status === "Unpaid" ? <Button variant="outline" disabled={role !== "Client Demo"} onClick={() => { setSelected(invoice); setProof(SAMPLE_PROOFS[0]); setError(""); }}><Paperclip />Simulate proof</Button> : <p className="text-xs text-muted-foreground">{invoice.status === "Pending Review" ? "Awaiting simulated review" : "Sample payment recorded"}</p>}</div></article>)}</div>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => { if (!open) setSelected(null); }}><DialogContent><DialogHeader><DialogTitle>Simulate payment proof</DialogTitle><DialogDescription>{selected?.number} · No actual file is uploaded. This does not confirm payment.</DialogDescription></DialogHeader><label htmlFor="sample-proof" className="text-sm font-medium">Fictional proof</label><select id="sample-proof" value={proof} onChange={(event) => setProof(event.target.value)} className="h-11 w-full rounded-md border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring">{SAMPLE_PROOFS.map((sample) => <option key={sample}>{sample}</option>)}</select><p className="text-xs text-muted-foreground">Result: Pending Review. Demo changes last for this browser session and reset on refresh.</p>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<div className="flex flex-wrap justify-end gap-2"><Button variant="outline" onClick={() => setSelected(null)}><X />Cancel</Button><Button onClick={submit}><Paperclip />Submit sample proof</Button></div></DialogContent></Dialog>
  </>;
}