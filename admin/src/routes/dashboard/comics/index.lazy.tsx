import ComicsPage from "@/views/dashboard/comics";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/comics/")({
  component: ComicsPage,
});
