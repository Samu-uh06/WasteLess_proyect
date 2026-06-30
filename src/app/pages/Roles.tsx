import { useState, useCallback } from "react";
import { Plus, Eye, Pencil, Trash2, Shield, Lock, Users as UsersIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Switch } from "../components/ui/switch";
import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

interface Permiso {
  idPermiso: number;
  nombre: string;
  codigo: string;
  descripcion: string;
}

interface Role {
  idRol: number;
  nombre: string;
  descripcion: string;
  permisos: Permiso[];
  estado: string;
  totalUsuarios: number;
}

interface EditDialogProps {
  role: Role;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const availablePermissions = [
  { id: 1,  label: "Ver Roles",               categoria: "Configuración" },
  { id: 2,  label: "Crear Roles",             categoria: "Configuración" },
  { id: 3,  label: "Editar Roles",            categoria: "Configuración" },
  { id: 4,  label: "Eliminar Roles",          categoria: "Configuración" },
  { id: 5,  label: "Ver Usuarios",            categoria: "Usuarios" },
  { id: 6,  label: "Crear Usuarios",          categoria: "Usuarios" },
  { id: 7,  label: "Editar Usuarios",         categoria: "Usuarios" },
  { id: 8,  label: "Eliminar Usuarios",       categoria: "Usuarios" },
  { id: 9,  label: "Ver Platillos",           categoria: "Platillos" },
  { id: 10, label: "Crear Platillos",         categoria: "Platillos" },
  { id: 11, label: "Editar Platillos",        categoria: "Platillos" },
  { id: 12, label: "Eliminar Platillos",      categoria: "Platillos" },
  { id: 13, label: "Ver Empresas",            categoria: "Empresas" },
  { id: 14, label: "Crear Empresas",          categoria: "Empresas" },
  { id: 15, label: "Editar Empresas",         categoria: "Empresas" },
  { id: 16, label: "Eliminar Empresas",       categoria: "Empresas" },
];

const permissionsByCategory = availablePermissions.reduce((acc, perm) => {
  if (!acc[perm.categoria]) acc[perm.categoria] = [];
  acc[perm.categoria].push(perm);
  return acc;
}, {} as Record<string, typeof availablePermissions>);

function EditRolDialog({ role, open, onClose, onSaved }: EditDialogProps) {
  const [nombre, setNombre] = useState(role.nombre);
  const [descripcion, setDescripcion] = useState(role.descripcion);
  const [permisos, setPermisos] = useState<number[]>(role.permisos.map((p) => Number(p.idPermiso)));

  const toggle = (id: number) => {
    setPermisos((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/roles/${role.idRol}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ nombre, descripcion }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();

      await fetch(`${BASE_URL}/api/roles/${role.idRol}/permissions`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ permisos }),
      });

      toast.success("Rol actualizado exitosamente");
      onSaved();
      onClose();
    } catch {
      toast.error("Error al actualizar el rol");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Editar Rol</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Nombre del rol *</Label>
              <Input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Supervisor" />
            </div>
            <div className="grid gap-2">
              <Label>Descripción *</Label>
              <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Breve descripción del rol" />
            </div>
            <div className="grid gap-2">
              <Label>Permisos ({permisos.length} seleccionados)</Label>
              <div className="border rounded-lg max-h-96 overflow-y-auto">
                {Object.entries(permissionsByCategory).map(([categoria, perms]) => (
                  <div key={categoria} className="p-4 border-b last:border-b-0">
                    <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2"><span className="text-red-600">●</span>{categoria}</h3>
                    <div className="grid grid-cols-2 gap-2 ml-4">
                      {perms.map((perm) => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`edit-perm-${perm.id}`}
                            checked={permisos.includes(perm.id)}
                            onChange={() => toggle(perm.id)}
                            className="w-4 h-4 accent-red-600 cursor-pointer"
                          />
                          <label htmlFor={`edit-perm-${perm.id}`} className="text-xs cursor-pointer text-gray-600">{perm.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-[#e7000b] hover:bg-[#c10009] text-white">Guardar Cambios</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Roles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "", permisos: [] as number[] });

  const loadRoles = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/api/roles`, { headers: getHeaders() });
    const json = await res.json();
    if (json.success) setRoles(json.data);
  }, []);

  useEffect(() => {
    loadRoles().catch(() => toast.error("Error al cargar roles"));
  }, [loadRoles]);

  const stats = {
    total: roles.length,
    activos: roles.filter((r) => r.estado === "activo").length,
    inactivos: roles.filter((r) => r.estado !== "activo").length,
    usuariosTotal: roles.reduce((sum, r) => sum + (r.totalUsuarios || 0), 0),
  };

  const statsCards = [
    { title: "Total Roles",        value: stats.total.toString(),         icon: Shield,    iconBg: "bg-[#3b82f6]" },
    { title: "Roles Activos",      value: stats.activos.toString(),       icon: Shield,    iconBg: "bg-[#10b981]" },
    { title: "Roles Inactivos",    value: stats.inactivos.toString(),     icon: Lock,      iconBg: "bg-[#6b7280]" },
    { title: "Usuarios Asignados", value: stats.usuariosTotal.toString(), icon: UsersIcon, iconBg: "bg-[#e7000b]" },
  ];

  const handlePermissionToggle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      permisos: prev.permisos.includes(id) ? prev.permisos.filter((p) => p !== id) : [...prev.permisos, id],
    }));
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/roles`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ nombre: formData.nombre, descripcion: formData.descripcion }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();

      if (formData.permisos.length > 0) {
        await fetch(`${BASE_URL}/api/roles/${json.data.idRol}/permissions`, {
          method: "PUT",
          headers: getHeaders(),
          body: JSON.stringify({ permisos: formData.permisos }),
        });
      }

      await loadRoles();
      setIsCreateDialogOpen(false);
      setFormData({ nombre: "", descripcion: "", permisos: [] });
      toast.success("Rol creado exitosamente");
    } catch {
      toast.error("Error al crear el rol");
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    try {
      const res = await fetch(`${BASE_URL}/api/roles/${selectedRole.idRol}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      await loadRoles();
      setIsDeleteDialogOpen(false);
      toast.success("Rol eliminado exitosamente");
    } catch {
      toast.error("Error al eliminar el rol");
    }
  };

  const handleToggleStatus = async (role: Role) => {
    if (role.nombre === "Administrador") {
      toast.error("No se puede cambiar el estado del rol de Administrador");
      return;
    }
    try {
      const nuevoEstado = role.estado === "activo" ? "inactivo" : "activo";
      const res = await fetch(`${BASE_URL}/api/roles/${role.idRol}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      await loadRoles();
      toast.success("Estado actualizado exitosamente");
    } catch {
      toast.error("Error al cambiar el estado");
    }
  };

  const handleViewRole = (role: Role) => { setSelectedRole(role); setIsViewDialogOpen(true); };

  const handleEditClick = async (role: Role) => {
    setIsViewDialogOpen(false);
    try {
      const res = await fetch(`${BASE_URL}/api/roles/${role.idRol}`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setEditRole(json.data);
    } catch {
      toast.error("Error al cargar el rol");
    }
  };

  const handleDeleteClick = (role: Role) => {
    if (role.nombre === "Administrador") { toast.error("No se puede eliminar el rol de Administrador"); return; }
    if (role.totalUsuarios > 0) { toast.error("No se puede eliminar este rol porque tiene usuarios asignados"); return; }
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Roles</h1>
        <p className="text-sm text-gray-600">Administración de roles y permisos del sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}><Icon className="w-5 h-5 text-white" /></div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end mb-6">
        <Button onClick={() => { setFormData({ nombre: "", descripcion: "", permisos: [] }); setIsCreateDialogOpen(true); }} className="bg-[#e7000b] hover:bg-[#c10009] text-white">
          <Plus className="w-4 h-4 mr-2" />Crear
        </Button>
      </div>

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
              <TableRow key={role.idRol}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-red-600" />
                    </div>
                    <span className="font-medium">{role.nombre}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{role.descripcion}</TableCell>
                <TableCell><span className="text-sm font-medium text-gray-900">{role.permisos.length} permisos</span></TableCell>
                <TableCell><span className="text-sm text-gray-600">{role.totalUsuarios} usuarios</span></TableCell>
                <TableCell>
                  <Switch
                    checked={role.estado === "activo"}
                    onCheckedChange={() => handleToggleStatus(role)}
                    className={role.estado === "activo" ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleViewRole(role)} className="bg-green-400/80 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors" title="Ver">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEditClick(role)} className="bg-blue-400/80 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(role)} className="bg-red-400/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => { if (!open) setIsCreateDialogOpen(false); }}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Crear Nuevo Rol</DialogTitle></DialogHeader>
          <form onSubmit={handleCreateRole}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nombre del rol *</Label>
                <Input value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Supervisor" />
              </div>
              <div className="grid gap-2">
                <Label>Descripción *</Label>
                <Input value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Breve descripción del rol" />
              </div>
              <div className="grid gap-2">
                <Label>Permisos ({formData.permisos.length} seleccionados)</Label>
                <div className="border rounded-lg max-h-96 overflow-y-auto">
                  {Object.entries(permissionsByCategory).map(([categoria, perms]) => (
                    <div key={categoria} className="p-4 border-b last:border-b-0">
                      <h3 className="font-bold text-sm text-gray-900 mb-3 flex items-center gap-2"><span className="text-red-600">●</span>{categoria}</h3>
                      <div className="grid grid-cols-2 gap-2 ml-4">
                        {perms.map((perm) => (
                          <div key={perm.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`create-perm-${perm.id}`}
                              checked={formData.permisos.includes(perm.id)}
                              onChange={() => handlePermissionToggle(perm.id)}
                              className="w-4 h-4 accent-red-600 cursor-pointer"
                            />
                            <label htmlFor={`create-perm-${perm.id}`} className="text-xs cursor-pointer text-gray-600">{perm.label}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#e7000b] hover:bg-[#c10009] text-white">Crear Rol</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog — componente separado, monta con datos ya listos */}
      {editRole && (
        <EditRolDialog
          role={editRole}
          open={!!editRole}
          onClose={() => setEditRole(null)}
          onSaved={loadRoles}
        />
      )}

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Detalles del Rol</DialogTitle></DialogHeader>
          {selectedRole && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-sm text-gray-600">Nombre</Label><p className="text-lg font-bold text-gray-900 mt-1">{selectedRole.nombre}</p></div>
                <div>
                  <Label className="text-sm text-gray-600">Estado</Label>
                  <p className="mt-1"><span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${selectedRole.estado === "activo" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>{selectedRole.estado === "activo" ? "Activo" : "Inactivo"}</span></p>
                </div>
              </div>
              <div><Label className="text-sm text-gray-600">Descripción</Label><p className="text-base text-gray-900 mt-1">{selectedRole.descripcion}</p></div>
              <div>
                <Label className="text-sm text-gray-600 mb-3 block">Permisos Asignados ({selectedRole.permisos.length})</Label>
                <div className="border rounded-lg max-h-80 overflow-y-auto">
                  {Object.entries(permissionsByCategory).map(([categoria, perms]) => {
                    const assigned = perms.filter((p) => selectedRole.permisos.some((sp) => sp.idPermiso === p.id));
                    if (assigned.length === 0) return null;
                    return (
                      <div key={categoria} className="p-4 border-b last:border-b-0">
                        <h4 className="font-bold text-sm text-gray-900 mb-2">{categoria}</h4>
                        <div className="flex flex-wrap gap-2">
                          {assigned.map((perm) => <span key={perm.id} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{perm.label}</span>)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">👥 <strong>{selectedRole.totalUsuarios} usuarios</strong> tienen asignado este rol</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>Cerrar</Button>
            <Button className="bg-[#e7000b] hover:bg-[#c10009] text-white" onClick={() => { if (selectedRole) handleEditClick(selectedRole); }}>Editar Rol</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>¿Está seguro de eliminar el rol "{selectedRole?.nombre}"? Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeleteRole}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}