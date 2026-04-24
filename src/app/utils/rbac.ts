// src/app/utils/rbac.ts
import { UserRole } from '../types/auth.types';

// A dónde redirigir a cada rol después del login
export const ROLE_HOME: Record<UserRole, string> = {
  Administrador: '/',
  Gerente:       '/produccion/pedidos',
  Empleado:      '/mobile/home',
};

// Qué rutas puede visitar cada rol (por prefijo)
export const ROLE_ALLOWED_PATHS: Record<UserRole, string[]> = {
  Administrador: ['/'],  // acceso total
  Gerente: [
    '/produccion/pedidos',
    '/produccion/ordenes',
    '/planeacion/menu',
    '/planeacion/empresas',
    '/planeacion/comedores',
    '/platillos/gestion',
  ],
  Empleado: [
    '/mobile/home',
    '/mobile/weekly-menu',
    '/mobile/my-orders',
    '/mobile/profile',
  ],
};

export function canAccess(rol: UserRole, pathname: string): boolean {
  if (rol === 'Administrador') return true;
  return ROLE_ALLOWED_PATHS[rol].some(path => pathname.startsWith(path));
}