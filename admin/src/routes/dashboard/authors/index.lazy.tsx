import AuthorPage from "@/views/dashboard/authors";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard/authors/")({
  component: AuthorPage,
});
