import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Eye, Edit, Trash2, User as UserIcon, Users as UsersIcon, Shield, Pencil } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { CreateUserDialog, UserFormData } from "../components/users/CreateUserDialog";
import { ViewUserDialog } from "../components/users/ViewUserDialog";
import { EditUserDialog } from "../components/users/EditUserDialog";
import { toast } from "sonner";
import {
  generarContrasenaAleatoria,
  enviarCorreoBienvenida,
} from "../utils/emailService";

const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export interface User {
  id: number;
  tipoDocumento: string;
  documento: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  rol: string;
  idRol: number;
  estado: boolean;
  fechaRegistro?: string;
}

const mapUser = (u: any): User => ({
  id: Number(u.idUsuario),
  tipoDocumento: u.tipoDocumento,
  documento: u.numeroDocumento,
  nombre: u.nombreCompleto,
  email: u.email,
  telefono: u.telefono || "",
  empresa: u.empresa || "",
  rol: u.nombreRol || "",
  idRol: Number(u.idRol),
  estado: u.estado === "activo",
  fechaRegistro: u.fechaCreacion?.split("T")[0],
});

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users`, { headers: getHeaders() });
      const json = await res.json();
      if (json.success) setUsers(json.data.map(mapUser));
    } catch {
      toast.error("Error al cargar usuarios");
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const stats = {
    total: users.length,
    activos: users.filter((u) => u.estado).length,
    inactivos: users.filter((u) => !u.estado).length,
    administradores: users.filter((u) => u.rol === "Administrador").length,
  };

  const statsCards = [
    { title: "Total Usuarios",      value: stats.total.toString(),          icon: UsersIcon, iconBg: "bg-[#3b82f6]" },
    { title: "Usuarios Activos",    value: stats.activos.toString(),        icon: UsersIcon, iconBg: "bg-[#10b981]" },
    { title: "Usuarios Inactivos",  value: stats.inactivos.toString(),      icon: UsersIcon, iconBg: "bg-[#6b7280]" },
    { title: "Administradores",     value: stats.administradores.toString(),icon: Shield,    iconBg: "bg-[#e7000b]" },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.documento.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleCreateUser = async (formData: UserFormData) => {
    try {
      const contrasena = generarContrasenaAleatoria();

      const res = await fetch(`${BASE_URL}/api/users`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          nombres: formData.nombre,
          apellidos: formData.apellido,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.documento,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          idRol: Number(formData.rol),
          password: contrasena,
        }),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      await enviarCorreoBienvenida({
        email: formData.email,
        nombre: `${formData.nombre} ${formData.apellido}`,
        documento: formData.documento,
        rol: formData.rol,
        contrasena,
      });

      await loadUsers();
      setCreateDialogOpen(false);
      toast.success("Usuario creado y correo enviado exitosamente");
    } catch (err: any) {
      toast.error(err.message || "Error al crear el usuario");
    }
  };

  const handleEditUser = async (id: number, formData: Partial<User>) => {
    try {
      const user = users.find((u) => u.id === id);
      const [nombres, ...rest] = (formData.nombre || "").split(" ");
      const apellidos = rest.join(" ");
      const res = await fetch(`${BASE_URL}/api/users/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          nombres,
          apellidos,
          tipoDocumento: formData.tipoDocumento,
          numeroDocumento: formData.documento,
          email: formData.email,
          telefono: formData.telefono,
          empresa: formData.empresa,
          idRol: formData.idRol || user?.idRol,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      await loadUsers();
      setEditDialogOpen(false);
      toast.success("Usuario actualizado exitosamente");
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar el usuario");
    }
  };

  const handleToggleEstado = async (user: User) => {
    try {
      const nuevoEstado = user.estado ? "inactivo" : "activo";
      const res = await fetch(`${BASE_URL}/api/users/${user.id}/status`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      const json = await res.json();
      if (!json.success) throw new Error();
      await loadUsers();
      toast.success("Estado actualizado exitosamente");
    } catch {
      toast.error("Error al cambiar el estado");
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const res = await fetch(`${BASE_URL}/api/users/${userToDelete.id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      await loadUsers();
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      toast.success("Usuario eliminado exitosamente");
    } catch (err: any) {
      toast.error(err.message || "Error al eliminar el usuario");
    }
  };

    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-sm text-gray-600">Administra los usuarios del sistema y sus roles</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`${card.iconBg} rounded-lg p-2`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar por nombre, email o documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-80"
          />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-[#e7000b] hover:bg-[#c10009] text-white">
          <Plus className="w-4 h-4 mr-2" />Crear
        </Button>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-white border-b border-gray-200 hover:bg-white">
              <TableHead className="text-gray-500 font-medium text-sm py-4 pl-6">Usuario</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4">Documento</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4">Email</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4">Empresa</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4">Rol</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4">Estado</TableHead>
              <TableHead className="text-gray-500 font-medium text-sm py-4 pr-6 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
              const rolColors: Record<string, string> = {
                Administrador: "bg-red-100 text-red-600",
                Empleado: "bg-gray-100 text-gray-600",
                Supervisor: "bg-purple-100 text-purple-600",
                Cocinero: "bg-orange-100 text-orange-600",
              };
              const rolColor = rolColors[user.rol] ?? "bg-gray-100 text-gray-600";
              return (
                <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{user.nombre}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{user.telefono}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <p className="text-gray-900 text-sm font-medium">{user.tipoDocumento}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{user.documento}</p>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-600">{user.email}</TableCell>
                  <TableCell className="py-4 text-sm text-gray-600">{user.empresa}</TableCell>
                  <TableCell className="py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${rolColor}`}>{user.rol}</span>
                  </TableCell>

                  {/* ← ESTADO con Switch */}
                  <TableCell className="py-4">
                    <Switch
                      checked={user.estado}
                      onCheckedChange={() => handleToggleEstado(user)}
                      className={user.estado ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                    />
                  </TableCell>

                  {/* ← ACCIONES sin Switch */}
                <TableCell className="py-4 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setSelectedUser(user); setViewDialogOpen(true); }}
                      className="bg-green-400/80 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setSelectedUser(user); setEditDialogOpen(true); }}
                      className="bg-blue-400/80 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setUserToDelete(user); setDeleteDialogOpen(true); }}
                      className="bg-red-400/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <CreateUserDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} onSubmit={handleCreateUser} />

      {selectedUser && (
        <ViewUserDialog open={viewDialogOpen} onOpenChange={setViewDialogOpen} user={selectedUser}
          onEdit={(user) => { setSelectedUser(user); setViewDialogOpen(false); setEditDialogOpen(true); }} />
      )}

      {selectedUser && (
        <EditUserDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} user={selectedUser} onSubmit={handleEditUser} />
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar usuario?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente a{" "}
              <strong>{userToDelete?.nombre}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}