const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export type MealKey = "desayuno" | "almuerzo" | "mediaTarde";

export interface ApiDiningRoom {
  idComedor: number;
  nombre: string;
  nombreEmpresa: string;
  estado: string;
}

export interface ApiDish {
  idPlatillo: number;
  nombre: string;
  imagen?: string;
  precio: number;
  nombreCategoria?: string;
}

export interface ApiMenuDetail {
  idDetalle: number;
  idMenu: number;
  diaSemana: string;
  tipoComida: string;
  idPlatillo: number;
  nombrePlatillo: string;
  precio: number;
  imagen?: string;
}

export interface ApiMenu {
  idMenu: number;
  codigo: string;
  nombre: string;
  idComedor: number;
  nombreComedor: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  fechaCreacion?: string;
}

export interface ApiMenuPlanning {
  menu: ApiMenu;
  planning: Record<string, Record<string, ApiMenuDetail[]>>;
}

export async function loadMenus(): Promise<ApiMenu[]> {
  const res = await fetch(`${BASE_URL}/api/menus`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function loadMenuById(id: number): Promise<ApiMenu> {
  const res = await fetch(`${BASE_URL}/api/menus/${id}`, { headers: getHeaders() });
  const json = await res.json();
  return json.data;
}

export async function loadMenuPlanning(id: number): Promise<ApiMenuPlanning> {
  const res = await fetch(`${BASE_URL}/api/menus/${id}/planning`, { headers: getHeaders() });
  const json = await res.json();
  return json.data;
}

export async function createMenu(data: {
  codigo: string;
  nombre: string;
  idComedor: number;
  fechaInicio: string;
  fechaFin: string;
}): Promise<ApiMenu> {
  const res = await fetch(`${BASE_URL}/api/menus`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al crear menú");
  return json.data;
}

export async function updateMenu(id: number, data: {
  codigo: string;
  nombre: string;
  idComedor: number;
  fechaInicio: string;
  fechaFin: string;
}): Promise<ApiMenu> {
  const res = await fetch(`${BASE_URL}/api/menus/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al actualizar menú");
  return json.data;
}

export async function deleteMenu(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/menus/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al eliminar menú");
}

export async function toggleMenuStatus(id: number, estado: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/menus/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ estado }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al cambiar estado");
}

export async function assignDishToMenu(idMenu: number, data: {
  diaSemana: string;
  tipoComida: string;
  idPlatillo: number;
}): Promise<ApiMenuDetail> {
  const res = await fetch(`${BASE_URL}/api/menus/${idMenu}/dishes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al asignar platillo");
  return json.data;
}

export async function removeDishFromMenu(idMenu: number, idDetalle: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/menus/${idMenu}/dishes/${idDetalle}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Error al eliminar platillo del menú");
}

export async function loadDiningRooms(): Promise<ApiDiningRoom[]> {
  const res = await fetch(`${BASE_URL}/api/dining-rooms`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function loadDishesForMenu(): Promise<ApiDish[]> {
  const res = await fetch(`${BASE_URL}/api/dishes?limit=100`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

// Helpers de compatibilidad
export function emptyWeekPlan(days: string[]): Record<string, Record<MealKey, any[]>> {
  return days.reduce((acc, day) => {
    acc[day] = { desayuno: [], almuerzo: [], mediaTarde: [] };
    return acc;
  }, {} as Record<string, Record<MealKey, any[]>>);
}

export function addMenu() { /* deprecated - usar createMenu */ }
export function saveMenus() { /* deprecated */ }