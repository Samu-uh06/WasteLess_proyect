import { createContext, useContext, useState, useRef, ReactNode } from "react";
import { AuthUser, UserRole } from "../types/auth.types";

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL;

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (documento: string, contrasena: string) => Promise<AuthUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = sessionStorage.getItem("wasteless_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem("wasteless_token")
  );

  const userRef = useRef(user);

  const login = async (documento: string, contrasena: string): Promise<AuthUser | null> => {
    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: documento, password: contrasena }),
      });

      const json = await res.json();
      if (!json.success) return null;

      const data = json.data;
      const authUser: AuthUser = {
        documento: data.user.idUsuario,
        nombre: data.user.email,
        rol: (data.user.nombreRol as UserRole) ?? "Empleado",
      };

      userRef.current = authUser;
      setUser(authUser);
      setToken(data.token);
      sessionStorage.setItem("wasteless_user", JSON.stringify(authUser));
      sessionStorage.setItem("wasteless_token", data.token);
      return authUser;
    } catch {
      return null;
    }
  };

  const logout = () => {
    userRef.current = null;
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("wasteless_user");
    sessionStorage.removeItem("wasteless_token");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!(userRef.current ?? user),
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}