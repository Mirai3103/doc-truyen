import TagPage from "@/views/dashboard/categories";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/tags/")({
  component: TagPage,
});
