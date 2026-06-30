const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export interface ApiDiningRoom {
  idComedor: number;
  nombre: string;
  idEmpresa: number;
  nombreEmpresa?: string;
  direccion: string;
  capacidad: number;
  totalEmpleados?: number;
  encargado?: string;
  telefono?: string;
  horario?: string;
  descripcion?: string;
  estado: string;
  fechaCreacion?: string;
}

export interface DiningRoomPayload {
  nombre: string;
  idEmpresa: number;
  direccion: string;
  capacidad: number;
  totalEmpleados?: number;
  encargado?: string;
  telefono?: string;
  horario?: string;
  descripcion?: string;
}

export async function loadDiningRooms(): Promise<ApiDiningRoom[]> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function createDiningRoom(data: DiningRoomPayload): Promise<ApiDiningRoom> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al crear comedor");
  return json.data;
}

export async function updateDiningRoom(id: number, data: Partial<DiningRoomPayload>): Promise<ApiDiningRoom> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al actualizar comedor");
  return json.data;
}

export async function deleteDiningRoom(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al eliminar comedor");
}

export async function toggleDiningRoomStatus(id: number, estado: string): Promise<ApiDiningRoom> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ estado }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al cambiar estado");
  return json.data;
}