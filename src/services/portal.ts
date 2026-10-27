import { queryOptions } from "@tanstack/react-query";
import { seedClientPortal, seedProjects, type DemoInvoice, type DemoRole } from "@/data/seed";

export type { DemoInvoice, DemoRole };
export const DEMO_ROLES: DemoRole[] = ["Guest", "Client Demo", "Internal Demo"];
export const SAMPLE_PROOFS = ["sample-bank-transfer.pdf", "sample-transfer-receipt.jpg"];

export async function getClientPortal() {
  const project = seedProjects.find((p) => p.id === seedClientPortal.projectId);
  if (!project) throw new Error("Sample project is unavailable");
  return { ...seedClientPortal, project, invoices: seedClientPortal.invoices.map((invoice) => ({ ...invoice })) };
}

export const clientPortalQuery = () => queryOptions({ queryKey: ["demo-client-portal"], queryFn: getClientPortal, staleTime: Infinity });
export type ClientPortalData = Awaited<ReturnType<typeof getClientPortal>>;

export function submitDemoProof(invoices: DemoInvoice[], invoiceId: string, proof: string, role: DemoRole): DemoInvoice[] {
  if (role !== "Client Demo") throw new Error("Choose Client Demo to submit sample proof.");
  if (!SAMPLE_PROOFS.includes(proof)) throw new Error("Choose a fictional sample proof.");
  const invoice = invoices.find((item) => item.id === invoiceId);
  if (!invoice || invoice.status !== "Unpaid") throw new Error("Only unpaid invoices accept sample proof.");
  return invoices.map((item) => item.id === invoiceId ? { ...item, status: "Pending Review", proof } : item);
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount);
}