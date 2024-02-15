import SideBar from "@/components/sidebar";
import { checkIsAuthenticated } from "@/utils/auth.utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import React from "react";
export const Route = createFileRoute("/dashboard")({
  component: _layout,
  beforeLoad: async ({ location }) => {
    console.log("beforeLoad");
    const isAuthenticated = await checkIsAuthenticated({});
    if (!isAuthenticated.authenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

export default function _layout() {
  return <SideBar />;
}
