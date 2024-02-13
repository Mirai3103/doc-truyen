import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import SideBar from "@/components/sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <SideBar />
      <TanStackRouterDevtools />
    </>
  ),
});
