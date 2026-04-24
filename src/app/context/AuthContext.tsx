// ============================================================
// AuthContext.tsx  (MODIFICADO)
// Ubicación: src/app/context/AuthContext.tsx
//
// CAMBIOS:
// - Se importa AuthUser y UserRole desde auth.types.ts
// - Se reemplaza ADMIN_CREDENTIALS por USUARIOS_MOCK (3 roles)
// - login() ahora retorna AuthUser | null en lugar de boolean
// ============================================================

import { createContext, useContext, useState, ReactNode } from "react";
import { AuthUser, UserRole } from "../types/auth.types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (documento: string, contrasena: string) => AuthUser | null;
  logout: () => void;
}

// ⚠️ Credenciales mock para desarrollo
// En producción: reemplazar con llamada al backend/base de datos
const USUARIOS_MOCK: Record<string, { contrasena: string; nombre: string; rol: UserRole }> = {
  "10537827":   { contrasena: "samuel123",   nombre: "Samuel Umego",    rol: "Administrador" },
  "99887766":   { contrasena: "gerente123",  nombre: "Laura Gómez",     rol: "Gerente"       },
  "1234567890": { contrasena: "empleado123", nombre: "Carlos Pérez",    rol: "Empleado"      },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Persiste la sesión en sessionStorage para que sobreviva F5
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem("wasteless_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (documento: string, contrasena: string): AuthUser | null => {
    const encontrado = USUARIOS_MOCK[documento];

    if (encontrado && encontrado.contrasena === contrasena) {
      const authUser: AuthUser = {
        documento,
        nombre: encontrado.nombre,
        rol:    encontrado.rol,
      };
      setUser(authUser);
      sessionStorage.setItem("wasteless_user", JSON.stringify(authUser));
      return authUser;
    }

    return null;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("wasteless_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}