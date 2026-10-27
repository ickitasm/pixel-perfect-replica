<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- UI reads data only through src/services/* (seed data in src/data/seed.ts) — so a real backend can replace the demo layer without touching components.
- Portal is demo-only (role switcher, no real auth/payments) — never present it as secure.
- Public site chrome (header/footer) lives in __root.tsx; project filters are URL search params — shareable links.
- Demo portal uses a shared /portal layout with in-memory role context, URL-selected client tabs and React Query session data; no credentials, file contents or payment data are transmitted.
