import { useNavigate } from "react-router";
import { useEffect } from "react";

export function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard after component mounts
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
}
