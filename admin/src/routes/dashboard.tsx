import SideBar from "@/components/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";
export const Route = createFileRoute("/dashboard")({
  component: _layout,
});

export default function _layout() {
  return <SideBar />;
}
