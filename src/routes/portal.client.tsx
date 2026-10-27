import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ClientPortal, CLIENT_TABS, type ClientTab } from "@/components/portal/ClientPortal";
import { clientPortalQuery } from "@/services/portal";

export const Route = createFileRoute("/portal/client")({
  validateSearch: (search: Record<string, unknown>): { tab: ClientTab } => ({ tab: CLIENT_TABS.find((item) => item.value === search["tab"])?.value ?? "overview" }),
  head: () => ({ meta: [
    { title: "My Project — Atelier Rana Demo Client Portal" },
    { name: "description", content: "Explore the fictional Omah Sunyi project, designs, progress, documents, materials and demo billing." },
    { property: "og:title", content: "My Project — Atelier Rana Demo Client Portal" },
    { property: "og:description", content: "Omah Sunyi’s fictional client workspace. No real uploads, login or payments." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(clientPortalQuery()),
  component: ClientPage,
});

function ClientPage() {
  const { data } = useSuspenseQuery(clientPortalQuery());
  const { tab } = Route.useSearch();
  const navigate = Route.useNavigate();
  return <ClientPortal data={data} tab={tab} onTabChange={(next) => navigate({ search: { tab: next }, resetScroll: false })} />;
}