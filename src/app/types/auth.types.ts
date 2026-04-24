export type UserRole = 'Administrador' | 'Gerente' | 'Empleado';

export interface AuthUser {
  documento: string;
  nombre: string;
  rol: UserRole;
}