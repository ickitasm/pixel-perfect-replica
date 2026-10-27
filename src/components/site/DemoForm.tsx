import { useState, type FormEvent } from "react";

export function DemoForm({ fields, submitLabel }: { fields: { name: string; label: string; type?: string; textarea?: boolean }[]; submitLabel: string }) {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent) => { e.preventDefault(); setSent(true); };
  if (sent)
    return (
      <div role="status" className="border p-6">
        <p className="label">Simulated</p>
        <p className="mt-2">Thank you. This is a demo — nothing was sent or stored.</p>
        <button className="mt-4 text-sm underline" onClick={() => setSent(false)}>Reset form</button>
      </div>
    );
  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {fields.map((f) => (
        <label key={f.name} className="grid gap-2">
          <span className="label">{f.label}</span>
          {f.textarea ? (
            <textarea required name={f.name} rows={4} className="border-b bg-transparent py-2 outline-none focus:border-foreground" />
          ) : (
            <input required name={f.name} type={f.type ?? "text"} className="border-b bg-transparent py-2 outline-none focus:border-foreground" />
          )}
        </label>
      ))}
      <p className="text-xs text-muted-foreground">Demo only. Please don't enter real personal data.</p>
      <button className="justify-self-start bg-primary px-6 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-85">{submitLabel}</button>
    </form>
  );
}
