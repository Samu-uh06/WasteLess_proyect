// ============================================================
// AdminLogin.tsx  (MODIFICADO)
// Ubicación: src/app/pages/AdminLogin.tsx
//
// CAMBIOS:
// - Se importa ROLE_HOME desde rbac.ts
// - handleSubmit usa el AuthUser retornado por login()
//   para redirigir a la ruta correcta según el rol
// - Se actualiza el subtítulo a "Acceso al sistema"
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { ROLE_HOME } from "../utils/rbac";

export function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [documento, setDocumento] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!documento.trim() || !contrasena.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setCargando(true);

    // Pequeño delay para simular validación (quitar en producción con API real)
    await new Promise((r) => setTimeout(r, 600));

    const usuario = login(documento.trim(), contrasena);

    if (usuario) {
      // Redirige según el rol: Administrador → "/", Gerente → "/produccion/pedidos", Empleado → "/mobile/home"
      navigate(ROLE_HOME[usuario.rol], { replace: true });
    } else {
      setError("Usuario o contraseña incorrectos.");
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#e7000b] rounded-2xl mb-4 shadow-lg">
            <span className="text-white text-2xl font-bold">W</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">WasteLess</h1>
          <p className="text-gray-500 mt-1">Acceso al sistema</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Usuario */}
            <div>
              <Label htmlFor="documento" className="text-sm text-gray-700">
                Usuario (documento de identidad)
              </Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="documento"
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="Ej: 10537827"
                  className="pl-9"
                  autoComplete="username"
                  disabled={cargando}
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <Label htmlFor="contrasena" className="text-sm text-gray-700">
                Contraseña
              </Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="contrasena"
                  type={mostrarContrasena ? "text" : "password"}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  placeholder="Tu contraseña"
                  className="pl-9 pr-10"
                  autoComplete="current-password"
                  disabled={cargando}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setMostrarContrasena(!mostrarContrasena)}
                  tabIndex={-1}
                >
                  {mostrarContrasena
                    ? <EyeOff className="w-4 h-4" />
                    : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#e7000b] hover:bg-[#c10009] text-white h-11 text-base font-medium"
              disabled={cargando}
            >
              {cargando ? "Verificando..." : "Ingresar"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} WasteLess · Solo para uso interno
        </p>
      </div>
    </div>
  );
}