import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: () => <Navigate to="/" />,
});
