import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DemoPortalProvider } from "@/components/portal/DemoPortalContext";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
});

function PortalLayout() {
  return <DemoPortalProvider><Outlet /></DemoPortalProvider>;
}