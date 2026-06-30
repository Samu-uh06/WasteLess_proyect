interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Role {
  idRol: number;
  nombre: string;
  descripcion: string;
}

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export async function loadRoles(): Promise<Role[]> {
  const res = await fetch(`${BASE_URL}/api/roles`, { headers: getHeaders() });
  const json = await res.json();
  return json.success ? json.data : [];
}