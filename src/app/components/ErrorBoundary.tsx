import { useRouteError, useNavigate } from "react-router";
import { useEffect } from "react";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("Route error:", error);
    // Redirect to home on error
    navigate("/", { replace: true });
  }, [error, navigate]);

  return null;
}
