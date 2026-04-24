// ============================================================
// src/app/services/weeklyMenuService.ts   (ARCHIVO NUEVO)
//
// Servicio de persistencia del menú semanal.
// Guarda y carga la planificación en localStorage para que
// sobreviva recargas de página.
// ============================================================
 
export interface DishWithQuantity {
  id: number;
  nombre: string;
  cantidad: number;
}
 
// Estructura de la planificación: { "Lunes": { desayuno: [...], almuerzo: [...], mediaTarde: [...] } }
export type MealKey = "desayuno" | "almuerzo" | "mediaTarde";
 
export type DayPlan = Record<MealKey, DishWithQuantity[]>;
 
export type WeekPlan = Record<string, DayPlan>;
 
export interface WeeklyMenu {
  id: string;
  nombre: string;
  fechaInicio: string;   // ISO string
  fechaFin: string;      // ISO string
  comedor: string;
  platillos: WeekPlan;
  creadoEn: string;      // ISO string
}
 
const STORAGE_KEY = "wasteless_menus";
 
// ── Helpers ───────────────────────────────────────────────────
 
/** Devuelve todos los menús guardados */
export function loadMenus(): WeeklyMenu[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as WeeklyMenu[]) : [];
  } catch {
    return [];
  }
}
 
/** Guarda un array completo de menús */
export function saveMenus(menus: WeeklyMenu[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  } catch (e) {
    console.error("Error al guardar menús:", e);
  }
}
 
/** Agrega un nuevo menú y lo persiste */
export function addMenu(menu: Omit<WeeklyMenu, "id" | "creadoEn">): WeeklyMenu {
  const menus = loadMenus();
  const newMenu: WeeklyMenu = {
    ...menu,
    id: `menu_${Date.now()}`,
    creadoEn: new Date().toISOString(),
  };
  saveMenus([...menus, newMenu]);
  return newMenu;
}
 
/** Actualiza un menú existente por id */
export function updateMenu(id: string, updates: Partial<WeeklyMenu>): void {
  const menus = loadMenus().map((m) => (m.id === id ? { ...m, ...updates } : m));
  saveMenus(menus);
}
 
/** Elimina un menú por id */
export function deleteMenu(id: string): void {
  saveMenus(loadMenus().filter((m) => m.id !== id));
}
 
/** Devuelve un WeekPlan vacío (todos los días y comidas en []) */
export function emptyWeekPlan(days: string[]): WeekPlan {
  return days.reduce<WeekPlan>((acc, day) => {
    acc[day] = { desayuno: [], almuerzo: [], mediaTarde: [] };
    return acc;
  }, {});
}