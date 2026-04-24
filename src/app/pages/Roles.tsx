import { useState } from "react";
import { Plus, Eye, Edit, Copy, Trash2, Shield, Lock, Users as UsersIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Switch } from "../components/ui/switch";

interface Role {
  id: number;
  nombre: string;
  descripcion: string;
  permisos: string[];
  estado: "Activo" | "Inactivo";
  usuariosAsignados?: number;
}

const availablePermissions = [
  // Dashboard
  { id: "dashboard_ver", label: "Ver Dashboard", categoria: "Dashboard", modulo: "Dashboard" },
  
  // Usuarios
  { id: "usuarios_ver", label: "Ver Usuarios", categoria: "Usuarios", modulo: "Usuarios" },
  { id: "usuarios_crear", label: "Crear Usuarios", categoria: "Usuarios", modulo: "Usuarios" },
  { id: "usuarios_editar", label: "Editar Usuarios", categoria: "Usuarios", modulo: "Usuarios" },
  { id: "usuarios_eliminar", label: "Eliminar Usuarios", categoria: "Usuarios", modulo: "Usuarios" },
  { id: "usuarios_gestion", label: "Gestión de Usuarios", categoria: "Usuarios", modulo: "Usuarios" },
  
  // Platillos
  { id: "platillos_ver", label: "Ver Platillos", categoria: "Platillos", modulo: "Platillos" },
  { id: "platillos_crear", label: "Crear Platillos", categoria: "Platillos", modulo: "Platillos" },
  { id: "platillos_editar", label: "Editar Platillos", categoria: "Platillos", modulo: "Platillos" },
  { id: "platillos_eliminar", label: "Eliminar Platillos", categoria: "Platillos", modulo: "Platillos" },
  { id: "platillos_gestion", label: "Gestión de Platillos", categoria: "Platillos", modulo: "Platillos" },
  
  // Planeación Gastronómica
  { id: "empresas_ver", label: "Ver Empresas", categoria: "Planeación Gastronómica", modulo: "Gestión de Empresas" },
  { id: "empresas_crear", label: "Crear Empresas", categoria: "Planeación Gastronómica", modulo: "Gestión de Empresas" },
  { id: "empresas_editar", label: "Editar Empresas", categoria: "Planeación Gastronómica", modulo: "Gestión de Empresas" },
  { id: "empresas_eliminar", label: "Eliminar Empresas", categoria: "Planeación Gastronómica", modulo: "Gestión de Empresas" },
  
  { id: "comedores_ver", label: "Ver Comedores", categoria: "Planeación Gastronómica", modulo: "Gestión de Comedores" },
  { id: "comedores_crear", label: "Crear Comedores", categoria: "Planeación Gastronómica", modulo: "Gestión de Comedores" },
  { id: "comedores_editar", label: "Editar Comedores", categoria: "Planeación Gastronómica", modulo: "Gestión de Comedores" },
  { id: "comedores_eliminar", label: "Eliminar Comedores", categoria: "Planeación Gastronómica", modulo: "Gestión de Comedores" },
  
  { id: "menu_ver", label: "Ver Menús", categoria: "Planeación Gastronómica", modulo: "Gestión de Menú" },
  { id: "menu_crear", label: "Crear Menús", categoria: "Planeación Gastronómica", modulo: "Gestión de Menú" },
  { id: "menu_editar", label: "Editar Menús", categoria: "Planeación Gastronómica", modulo: "Gestión de Menú" },
  { id: "menu_eliminar", label: "Eliminar Menús", categoria: "Planeación Gastronómica", modulo: "Gestión de Menú" },
  
  // Gestión de Producción
  { id: "pedidos_ver", label: "Ver Pedidos", categoria: "Gestión de Producción", modulo: "Gestión de Pedidos" },
  { id: "pedidos_crear", label: "Crear Pedidos", categoria: "Gestión de Producción", modulo: "Gestión de Pedidos" },
  { id: "pedidos_editar", label: "Editar Pedidos", categoria: "Gestión de Producción", modulo: "Gestión de Pedidos" },
  { id: "pedidos_eliminar", label: "Eliminar Pedidos", categoria: "Gestión de Producción", modulo: "Gestión de Pedidos" },
  { id: "pedidos_gestionar", label: "Gestionar Pedidos", categoria: "Gestión de Producción", modulo: "Gestión de Pedidos" },
  
  { id: "produccion_ver", label: "Ver Órdenes de Producción", categoria: "Gestión de Producción", modulo: "Gestión de Orden de Producción" },
  { id: "produccion_crear", label: "Crear Órdenes de Producción", categoria: "Gestión de Producción", modulo: "Gestión de Orden de Producción" },
  { id: "produccion_editar", label: "Editar Órdenes de Producción", categoria: "Gestión de Producción", modulo: "Gestión de Orden de Producción" },
  { id: "produccion_eliminar", label: "Eliminar Órdenes de Producción", categoria: "Gestión de Producción", modulo: "Gestión de Orden de Producción" },
  
  // Configuración
  { id: "roles_ver", label: "Ver Roles", categoria: "Configuración", modulo: "Gestión de Roles" },
  { id: "roles_crear", label: "Crear Roles", categoria: "Configuración", modulo: "Gestión de Roles" },
  { id: "roles_editar", label: "Editar Roles", categoria: "Configuración", modulo: "Gestión de Roles" },
  { id: "roles_eliminar", label: "Eliminar Roles", categoria: "Configuración", modulo: "Gestión de Roles" },
];

const initialRoles: Role[] = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Acceso total al sistema",
    permisos: availablePermissions.map((p) => p.id),
    estado: "Activo",
    usuariosAsignados: 2,
  },
  {
    id: 2,
    nombre: "Gerente",
    descripcion: "Gestión de operaciones y reportes",
    permisos: [
      "usuarios_ver",
      "empresas_ver",
      "empresas_crear",
      "empresas_editar",
      "platillos_ver",
      "menu_ver",
      "pedidos_ver",
      "pedidos_gestionar",
      "produccion_ver",
      "reportes_ver",
      "reportes_exportar",
    ],
    estado: "Activo",
    usuariosAsignados: 3,
  },
  {
    id: 3,
    nombre: "Coordinador",
    descripcion: "Coordinación de producción y menús",
    permisos: [
      "platillos_ver",
      "platillos_crear",
      "platillos_editar",
      "menu_ver",
      "menu_crear",
      "menu_editar",
      "pedidos_ver",
      "produccion_ver",
      "produccion_crear",
    ],
    estado: "Activo",
    usuariosAsignados: 5,
  },
  {
    id: 4,
    nombre: "Supervisor",
    descripcion: "Supervisión de pedidos y producción",
    permisos: [
      "platillos_ver",
      "menu_ver",
      "pedidos_ver",
      "pedidos_gestionar",
      "produccion_ver",
      "produccion_crear",
    ],
    estado: "Activo",
    usuariosAsignados: 8,
  },
  {
    id: 5,
    nombre: "Analista",
    descripcion: "Análisis y reportería",
    permisos: [
      "empresas_ver",
      "platillos_ver",
      "menu_ver",
      "pedidos_ver",
      "produccion_ver",
      "reportes_ver",
      "reportes_exportar",
    ],
    estado: "Inactivo",
    usuariosAsignados: 0,
  },
];

export function Roles() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    permisos: [] as string[],
  });

  // Calculate stats
  const stats = {
    total: roles.length,
    activos: roles.filter((r) => r.estado === "Activo").length,
    inactivos: roles.filter((r) => r.estado === "Inactivo").length,
    usuariosTotal: roles.reduce((sum, r) => sum + (r.usuariosAsignados || 0), 0),
  };

  const statsCards = [
    {
      title: "Total Roles",
      value: stats.total.toString(),
      icon: Shield,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Roles Activos",
      value: stats.activos.toString(),
      icon: Shield,
      iconBg: "bg-[#10b981]",
    },
    {
      title: "Roles Inactivos",
      value: stats.inactivos.toString(),
      icon: Lock,
      iconBg: "bg-[#6b7280]",
    },
    {
      title: "Usuarios Asignados",
      value: stats.usuariosTotal.toString(),
      icon: UsersIcon,
      iconBg: "bg-[#e7000b]",
    },
  ];


  const handlePermissionToggle = (permission: string) => {
    setFormData((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(permission)
        ? prev.permisos.filter((p) => p !== permission)
        : [...prev.permisos, permission],
    }));
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    const newRole: Role = {
      id: roles.length + 1,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      permisos: formData.permisos,
      estado: "Activo",
      usuariosAsignados: 0,
    };
    setRoles([...roles, newRole]);
    setIsCreateDialogOpen(false);
    setFormData({ nombre: "", descripcion: "", permisos: [] });
    toast.success("Rol creado exitosamente");
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      nombre: role.nombre,
      descripcion: role.descripcion,
      permisos: role.permisos,
    });
    setIsEditDialogOpen(true);
  };

  const handleEditRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole) {
      setRoles(
        roles.map((role) =>
          role.id === selectedRole.id
            ? {
                ...role,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                permisos: formData.permisos,
              }
            : role
        )
      );
      setIsEditDialogOpen(false);
      toast.success("Rol actualizado exitosamente");
    }
  };

  const handleCopyRole = (role: Role) => {
    const copiedRole: Role = {
      ...role,
      id: roles.length + 1,
      nombre: `${role.nombre} (Copia)`,
      usuariosAsignados: 0,
    };
    setRoles([...roles, copiedRole]);
    toast.success("Rol duplicado exitosamente");
  };

  // Función para verificar si un rol tiene usuarios asignados
  const hasAssignedUsers = (roleId: number): boolean => {
    const role = roles.find(r => r.id === roleId);
    return (role?.usuariosAsignados || 0) > 0;
  };

  const handleDeleteClick = (role: Role) => {
    if (role.nombre === "Administrador") {
      toast.error("No se puede eliminar el rol de Administrador");
      return;
    }
    if (hasAssignedUsers(role.id)) {
      toast.error("No se puede eliminar este rol porque tiene usuarios asignados");
      return;
    }
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteRole = () => {
    if (selectedRole) {
      setRoles(roles.filter((role) => role.id !== selectedRole.id));
      setIsDeleteDialogOpen(false);
      toast.success("Rol eliminado exitosamente");
    }
  };

  const handleToggleStatus = (role: Role) => {
    if (role.nombre === "Administrador") {
      toast.error("No se puede cambiar el estado del rol de Administrador");
      return;
    }
    if (hasAssignedUsers(role.id)) {
      toast.error("No se puede cambiar el estado de este rol porque tiene usuarios asignados");
      return;
    }
    setRoles(
      roles.map((r) =>
        r.id === role.id
          ? { ...r, estado: r.estado === "Activo" ? "Inactivo" : "Activo" }
          : r
      )
    );
    toast.success("Estado del rol actualizado exitosamente");
  };

  // Group permissions by category and module
  const permissionsByCategoryAndModule = availablePermissions.reduce((acc, perm) => {
    if (!acc[perm.categoria]) {
      acc[perm.categoria] = {};
    }
    if (!acc[perm.categoria][perm.modulo]) {
      acc[perm.categoria][perm.modulo] = [];
    }
    acc[perm.categoria][perm.modulo].push(perm);
    return acc;
  }, {} as Record<string, Record<string, typeof availablePermissions>>);

  // Group permissions by category (for view dialog)
  const permissionsByCategory = availablePermissions.reduce((acc, perm) => {
    if (!acc[perm.categoria]) {
      acc[perm.categoria] = [];
    }
    acc[perm.categoria].push(perm);
    return acc;
  }, {} as Record<string, typeof availablePermissions>);

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Roles</h1>
        <p className="text-sm text-gray-600">
          Administración de roles y permisos del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-end items-center mb-6">
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#e7000b] hover:bg-[#c10009] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Rol
        </Button>
      </div>

      {/* Roles Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Rol</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead>Usuarios</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="font-medium">{role.nombre}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {role.descripcion}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-gray-900">
                    {role.permisos.length} permisos
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">
                    {role.usuariosAsignados} usuarios
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      role.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {role.estado}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                      onClick={() => handleViewRole(role)}
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                      onClick={() => handleEditClick(role)}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Switch
                      checked={role.estado === "Activo"}
                      onCheckedChange={() => handleToggleStatus(role)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-900 hover:bg-red-50 h-8 w-8 p-0"
                      onClick={() => handleDeleteClick(role)}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Role Dialog */}
      <Dialog
        open={isCreateDialogOpen || isEditDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsCreateDialogOpen(false);
            setIsEditDialogOpen(false);
            setFormData({ nombre: "", descripcion: "", permisos: [] });
          }
        }}
      >
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditDialogOpen ? "Editar Rol" : "Crear Nuevo Rol"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={isEditDialogOpen ? handleEditRole : handleCreateRole}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre del rol *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Ej: Supervisor"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Input
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  placeholder="Breve descripción del rol"
                />
              </div>
              <div className="grid gap-2">
                <Label>Permisos ({formData.permisos.length} seleccionados)</Label>
                <div className="border rounded-lg max-h-96 overflow-y-auto">
                  {Object.entries(permissionsByCategoryAndModule).map(
                    ([categoria, modulos]) => (
                      <div key={categoria} className="p-4 border-b last:border-b-0">
                        <h3 className="font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                          <span className="text-red-600">●</span>
                          {categoria}
                        </h3>
                        <div className="space-y-3 ml-4">
                          {Object.entries(modulos).map(([modulo, perms]) => (
                            <div key={modulo}>
                              <h4 className="font-semibold text-xs text-gray-700 mb-2">
                                {modulo}
                              </h4>
                              <div className="grid grid-cols-2 gap-2 ml-2">
                                {perms.map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={permission.id}
                                      checked={formData.permisos.includes(permission.id)}
                                      onCheckedChange={() =>
                                        handlePermissionToggle(permission.id)
                                      }
                                    />
                                    <label
                                      htmlFor={permission.id}
                                      className="text-xs leading-none cursor-pointer text-gray-600"
                                    >
                                      {permission.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  setIsEditDialogOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#e7000b] hover:bg-[#c10009] text-white"
              >
                {isEditDialogOpen ? "Guardar Cambios" : "Crear Rol"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Role Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalles del Rol</DialogTitle>
          </DialogHeader>
          {selectedRole && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Nombre</Label>
                  <p className="text-lg font-bold text-gray-900 mt-1">
                    {selectedRole.nombre}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Estado</Label>
                  <p className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        selectedRole.estado === "Activo"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedRole.estado}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Descripción</Label>
                <p className="text-base text-gray-900 mt-1">
                  {selectedRole.descripcion}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-3 block">
                  Permisos Asignados ({selectedRole.permisos.length})
                </Label>
                <div className="border rounded-lg max-h-80 overflow-y-auto">
                  {Object.entries(permissionsByCategory).map(
                    ([categoria, perms]) => {
                      const categoryPerms = perms.filter((p) =>
                        selectedRole.permisos.includes(p.id)
                      );
                      if (categoryPerms.length === 0) return null;
                      return (
                        <div
                          key={categoria}
                          className="p-4 border-b last:border-b-0"
                        >
                          <h4 className="font-bold text-sm text-gray-900 mb-2">
                            {categoria}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {categoryPerms.map((perm) => (
                              <span
                                key={perm.id}
                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {perm.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  👥 <strong>{selectedRole.usuariosAsignados} usuarios</strong>{" "}
                  tienen asignado este rol
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Cerrar
            </Button>
            <Button
              className="bg-[#e7000b] hover:bg-[#c10009] text-white"
              onClick={() => {
                if (selectedRole) {
                  setIsViewDialogOpen(false);
                  handleEditClick(selectedRole);
                }
              }}
            >
              Editar Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Está seguro de eliminar el rol "{selectedRole?.nombre}"? Esta
              acción no se puede deshacer y los usuarios con este rol perderán sus
              permisos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteRole}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}