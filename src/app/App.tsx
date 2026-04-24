// ============================================================
// App.tsx  (MODIFICADO)
// Ubicación: src/app/App.tsx
//
// CAMBIO: Se envuelve RouterProvider con AuthProvider
// para que el contexto de autenticación esté disponible
// en toda la aplicación (rutas, Layout, componentes, etc.)
// ============================================================

import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";  // ✅ NUEVO

export default function App() {
  return (
    <AuthProvider>          {/* ✅ NUEVO */}
      <RouterProvider router={router} />
    </AuthProvider>
  );
}