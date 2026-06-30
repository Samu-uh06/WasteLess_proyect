const BASE_URL = (import.meta as unknown as { env: { VITE_API_URL: string } }).env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export interface City {
  idCiudad: number;
  nombre: string;
  departamento: string;
}

export interface ApiCompany {
  idEmpresa: number;
  nombreEmpresa: string;
  tipoEmpresa: "Jurídica" | "Natural";
  nit: string;
  idCiudad: number;
  nombreCiudad?: string;
  departamento?: string;
  direccion?: string;
  contacto?: {
    nombre?: string;
    email?: string;
    telefono?: string;
  };
  estado: string;
  fechaRegistro?: string;
  fechaActualizacion?: string;
}

export interface CreateCompanyPayload {
  nombreEmpresa?: string;
  tipoEmpresa?: "Jurídica" | "Natural";
  nit?: string;
  idCiudad?: number;
  direccion?: string;
  nombreContacto?: string;
  emailContacto?: string;
  telefonoContacto?: string;
}

export async function loadCities(): Promise<City[]> {
  const res = await fetch(`${BASE_URL}/api/companies/cities`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function loadCompanies(): Promise<ApiCompany[]> {
  const res = await fetch(`${BASE_URL}/api/companies`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function createCompany(data: CreateCompanyPayload): Promise<ApiCompany> {
  const res = await fetch(`${BASE_URL}/api/companies`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al crear empresa");
  return json.data;
}

export async function updateCompany(id: number, data: CreateCompanyPayload): Promise<ApiCompany> {
  const res = await fetch(`${BASE_URL}/api/companies/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al actualizar empresa");
  return json.data;
}

export async function deleteCompany(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/companies/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al eliminar empresa");
}

export async function toggleCompanyStatus(id: number, estado: string): Promise<ApiCompany> {
  const res = await fetch(`${BASE_URL}/api/companies/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ estado }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al cambiar estado");
  return json.data;
}