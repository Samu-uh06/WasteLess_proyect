// ============================================================
// Layout.tsx  (MODIFICADO)
// Ubicación: src/app/components/Layout.tsx
//
// CAMBIOS respecto al original:
// - Usa AuthContext (useAuth) para obtener el usuario en sesión
// - Expone logout al Sidebar a través de props
// - Mantiene el ChangePasswordDialog para el primer login
// ============================================================

import { Outlet, useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { ChangePasswordDialog } from "./users/ChangePasswordDialog";
import { useState } from "react";

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estado local para simular primer cambio de contraseña
  // (en producción esto vendría del campo requiereCambioContrasena del backend)
  const [requiereCambio, setRequiereCambio] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleCambiarContrasena = (_nuevaContrasena: string) => {
    // En producción: llamar al backend con la nueva contraseña hasheada
    setRequiereCambio(false);
    toast.success("¡Contraseña actualizada exitosamente!");
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6]">
      <Toaster position="top-right" richColors />

      {/* Se pasa onLogout al Sidebar para que muestre el botón de cerrar sesión */}
      <Sidebar onLogout={handleLogout} />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Modal de cambio de contraseña obligatorio (primer login) */}
      <ChangePasswordDialog
        open={requiereCambio}
        nombreUsuario={user?.nombre ?? ""}
        onSubmit={handleCambiarContrasena}
      />
    </div>
  );
}