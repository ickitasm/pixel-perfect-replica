# Architecture Studio — Website + Demo Portal (Plan)

Demo-only prototype. All data fictional, stored in browser memory/localStorage behind a replaceable service layer. No real login, payments, storage or notifications.

## 1. Sitemap

```text
Public
  /                     Home (animated hero title, featured projects)
  /projects             Grid + search + filters (category, status, year)
  /projects/$slug       Detail: gallery, location, land/building area, year, status
  /services             Architecture, interior, planning, supervision
  /about                Studio, principles, team
  /career               Open roles (demo apply form, simulated)
  /contact              Contact form (simulated submit), studio info

Demo portal (phase 2+)
  /portal               Role switcher: Guest / Client Demo / Internal Demo
  /portal/client        Overview of assigned project
    tabs: Designs, Progress, Reports & Photos, Documents, Materials, Invoices
  /portal/internal      Project list + activity history
  /portal/internal/projects/$id   Edit project, client, milestones, reports,
                                  documents, materials, invoices, payment review
```

## 2. Roles and permissions (demo only)

| Area | Guest | Client Demo | Internal Demo |
|---|---|---|---|
| Public site | yes | yes | yes |
| Assigned project (read) | no | own only | all |
| Upload payment proof | no | yes | no |
| Create/edit projects, milestones, reports, materials, invoices | no | no | yes |
| Approve/reject proof, issue receipt | no | no | yes |

Role is a dropdown with a persistent "DEMO MODE — not real authentication" banner. No credentials collected.

## 3. User journeys

- Visitor: Home -> Projects -> filter -> Project Detail -> Contact.
- Client Demo: switch role -> project overview -> view renders and milestones -> read daily report -> open invoice -> submit payment proof (sample file) -> see "Pending review" -> later "Approved" + receipt.
- Internal Demo: switch role -> create project -> assign demo client -> add milestone/report/material -> create installment invoice -> review proof -> approve or reject with note -> issue receipt -> every step logged in activity history.

## 4. Data entities

```text
Project (id, slug, title, category[Commercial|Residential|Common],
         status[Completed|In Progress], location, landArea, buildingArea,
         year, description, images[], isPublic, clientId?)
Client (id, name)                         1 Client -> many Projects
Milestone (projectId, title, due, percent, state)
DailyReport (projectId, date, note, photos[])
Document (projectId, name, kind[render|drawing|contract], visibleToClient)
Material (projectId, item, spec, qty, unit, status)
Invoice (projectId, number, installment, amount, due,
         status[Unpaid|Proof submitted|Approved|Rejected|Paid])
PaymentProof (invoiceId, fileName, submittedAt, reviewNote?)
Receipt (invoiceId, number, issuedAt)
Activity (projectId, actorRole, action, at)
```

## 5. Demo vs production

| Feature | In demo | Production later |
|---|---|---|
| Login | Role dropdown | Real accounts (e.g. Google sign-in) |
| Data | Seed file + localStorage | Cloud database with access rules |
| Files | Sample filenames / placeholder images | Private file storage |
| Payments | Simulated proof + status changes | Real verification, receipts |
| Notifications | On-screen toasts | Email / WhatsApp |
| Locking, schedules, e-signature | Not included | Out of scope |

## 6. Phases

1. **Foundation + public portfolio (this step after approval):** design tokens, typography, shared layout (header, mobile menu, footer), seeded project data + service layer, all 7 public pages, search/filters, animated hero with reduced-motion support, generated architectural imagery, page metadata.
2. **Portal shell:** role switcher, demo banner, client overview read-only tabs.
3. **Client actions:** payment proof submission, statuses, receipts.
4. **Internal tools:** project CRUD, client assignment, milestones, reports, documents, materials, invoices, proof review, activity history.
5. **Polish:** empty states, accessibility pass, responsive QA.

## Design direction

Editorial and quiet: warm off-white paper background, near-black ink, one muted clay accent. Serif display headings (e.g. Cormorant / Instrument Serif) with a clean grotesk body. Full-bleed imagery, generous whitespace, thin rules, small uppercase labels.

## Assumptions needing owner approval

- Studio name: placeholder "Atelier Rana" (fictional) until you supply the real one.
- Location context: Indonesia (Jakarta), areas in m², amounts in IDR.
- Language: English only.
- About 8 fictional projects with AI-generated images.
- Contact and career forms show a "simulated, not sent" message.

## Technical notes

- Keep current stack (TanStack Start, Tailwind v4). Separate route files per page.
- `src/data/seed.ts` holds records; `src/services/projects.ts` exposes async functions (list, get, filter) so a real backend can replace it without touching UI.
- Filters stored in URL search params for shareable links.
- Hero animation via CSS with `prefers-reduced-motion` fallback.
