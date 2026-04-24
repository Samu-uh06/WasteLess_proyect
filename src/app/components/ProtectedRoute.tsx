// ============================================================
// ProtectedRoute.tsx  (MODIFICADO)
// Ubicación: src/app/components/ProtectedRoute.tsx
//
// CAMBIOS:
// - Acepta prop allowedRoles para verificar el rol del usuario
// - Si no está autenticado → redirige a /login
// - Si el rol no está permitido → redirige al home de su rol
// ============================================================

import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { canAccess, ROLE_HOME } from "../utils/rbac";
import { UserRole } from "../types/auth.types";

interface Props {
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const { user: ctxUser, isAuthenticated } = useAuth();
  const location = useLocation();

  // Fallback: leer directamente de sessionStorage para el ciclo de render
  // inmediatamente posterior al login(), antes de que el estado de React
  // se propague. Sin esto, ProtectedRoute ve isAuthenticated=false y
  // redirige al login en el mismo tick en que navigate() fue llamado.
  const user = ctxUser ?? (() => {
    const stored = sessionStorage.getItem("wasteless_user");
    return stored ? JSON.parse(stored) : null;
  })();

  // No autenticado → al login, guardando de dónde venía
  if (!isAuthenticated && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Tiene allowedRoles definidos → verificar si el rol del usuario está en la lista
  if (allowedRoles && user && !allowedRoles.includes(user.rol as UserRole)) {
    return <Navigate to={ROLE_HOME[user.rol as UserRole]} replace />;
  }

  return <Outlet />;
}