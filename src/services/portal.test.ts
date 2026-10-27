import { describe, expect, it } from "vitest";
import { getClientPortal, SAMPLE_PROOFS, submitDemoProof } from "./portal";

describe("demo payment proofs", () => {
  it("sets a submitted proof to Pending Review, not Paid", async () => {
    const data = await getClientPortal();
    const result = submitDemoProof(data.invoices, "inv3", SAMPLE_PROOFS[0], "Client Demo");
    expect(result.find((invoice) => invoice.id === "inv3")?.status).toBe("Pending Review");
    expect(data.invoices.find((invoice) => invoice.id === "inv3")?.status).toBe("Unpaid");
    expect(result.filter((invoice) => invoice.status === "Paid").map((invoice) => invoice.id)).toEqual(["inv1", "inv2"]);
  });
  it("rejects actual filenames rather than accepting real uploads", async () => {
    const data = await getClientPortal();
    expect(() => submitDemoProof(data.invoices, "inv3", "real-receipt.pdf", "Client Demo")).toThrow("fictional sample proof");
  });
  it.each(["Guest", "Internal Demo"] as const)("does not allow %s to submit proof", async (role) => {
    const data = await getClientPortal();
    expect(() => submitDemoProof(data.invoices, "inv3", SAMPLE_PROOFS[0], role)).toThrow("Client Demo");
  });
  it("does not resubmit pending invoices or change settled invoices", async () => {
    const data = await getClientPortal();
    const pending = submitDemoProof(data.invoices, "inv3", SAMPLE_PROOFS[0], "Client Demo");
    expect(() => submitDemoProof(pending, "inv3", SAMPLE_PROOFS[0], "Client Demo")).toThrow("Only unpaid");
    expect(() => submitDemoProof(pending, "inv1", SAMPLE_PROOFS[0], "Client Demo")).toThrow("Only unpaid");
  });
});