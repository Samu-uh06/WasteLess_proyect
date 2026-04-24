// ============================================================
// CAMBIOS EN ESTE ARCHIVO:
//
// 1. Se importa `generarContrasenaAleatoria` y `enviarCorreoBienvenida`
//    desde el nuevo archivo de utilidades.
//
// 2. Se añade el campo `contrasena` y `requiereCambioContrasena` al
//    tipo User para rastrear el primer inicio de sesión.
//
// 3. handleCreateUser ahora:
//    - Genera una contraseña aleatoria
//    - Guarda la contraseña en el usuario (en producción iría al backend)
//    - Envía el correo de bienvenida con las credenciales
//    - Marca requiereCambioContrasena = true
//
// BUSCA LOS COMENTARIOS "// ✅ NUEVO" PARA VER CADA CAMBIO
// ============================================================

import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, User as UserIcon, Users as UsersIcon, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
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
import { CreateUserDialog, UserFormData } from "../components/users/CreateUserDialog";
import { ViewUserDialog } from "../components/users/ViewUserDialog";
import { EditUserDialog } from "../components/users/EditUserDialog";
import { toast } from "sonner";

// ✅ NUEVO: Importar utilidades de email
import { generarContrasenaAleatoria, enviarCorreoBienvenida } from "../utils/emailService";

export interface User {
  id: number;
  tipoDocumento: string;
  documento: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  rol: string;
  estado: boolean;
  fechaRegistro?: string;
  // ✅ NUEVO: Campos para manejo de contraseña temporal
  contrasena?: string;
  requiereCambioContrasena?: boolean;
}

const initialUsers: User[] = [
  {
    id: 1,
    tipoDocumento: "CC",
    documento: "10537827",
    nombre: "Samuel Umego",
    email: "samuelumego@gmail.com",
    telefono: "+57 310 123 4567",
    empresa: "Sena",
    rol: "Administrador",
    estado: true,
    fechaRegistro: "2024-01-15",
    requiereCambioContrasena: false,
  },
  {
    id: 2,
    tipoDocumento: "CC",
    documento: "98273364",
    nombre: "Miguel Appel",
    email: "miguelyappel@hotmail.com",
    telefono: "+57 300 456 7890",
    empresa: "Prodigal A3",
    rol: "Empleado",
    estado: true,
    fechaRegistro: "2024-02-10",
    requiereCambioContrasena: false,
  },
  {
    id: 3,
    tipoDocumento: "CC",
    documento: "77654321",
    nombre: "Ana María Delgado",
    email: "anamaria@hotmail.com",
    telefono: "+57 315 789 0123",
    empresa: "Prodigal A3",
    rol: "Empleado",
    estado: true,
    fechaRegistro: "2024-01-20",
    requiereCambioContrasena: false,
  },
  {
    id: 4,
    tipoDocumento: "CC",
    documento: "110987654",
    nombre: "Andrés Gómez",
    email: "andresgomez@hotmail.com",
    telefono: "+57 312 345 6789",
    empresa: "Ecopetrol S.A.",
    rol: "Supervisor",
    estado: true,
    fechaRegistro: "2024-03-05",
    requiereCambioContrasena: false,
  },
  {
    id: 5,
    tipoDocumento: "CC",
    documento: "89308927",
    nombre: "José Maria Martínez",
    email: "josemaria@hotmail.com",
    telefono: "+57 320 987 6543",
    empresa: "Universidad Nacional",
    rol: "Empleado",
    estado: false,
    fechaRegistro: "2023-12-01",
    requiereCambioContrasena: false,
  },
];

export function Users() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRol, setSelectedRol] = useState("all");

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Calculate stats
  const stats = {
    total: users.length,
    activos: users.filter((u) => u.estado).length,
    inactivos: users.filter((u) => !u.estado).length,
    administradores: users.filter((u) => u.rol === "Administrador").length,
  };

  const statsCards = [
    {
      title: "Total Usuarios",
      value: stats.total.toString(),
      icon: UsersIcon,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Usuarios Activos",
      value: stats.activos.toString(),
      icon: UsersIcon,
      iconBg: "bg-[#10b981]",
    },
    {
      title: "Usuarios Inactivos",
      value: stats.inactivos.toString(),
      icon: UsersIcon,
      iconBg: "bg-[#6b7280]",
    },
    {
      title: "Administradores",
      value: stats.administradores.toString(),
      icon: Shield,
      iconBg: "bg-[#e7000b]",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.documento.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = selectedRol === "all" || user.rol === selectedRol;
    return matchesSearch && matchesRol;
  });

  // ✅ NUEVO: handleCreateUser ahora genera contraseña y envía correo
  const handleCreateUser = async (formData: UserFormData) => {
    // 1. Generar contraseña aleatoria segura
    const contrasenaGenerada = generarContrasenaAleatoria();

    // 2. Crear el nuevo usuario con la contraseña temporal
    const newUser: User = {
      id: users.length + 1,
      tipoDocumento: formData.tipoDocumento,
      documento: formData.documento,
      nombre: `${formData.nombre} ${formData.apellido}`,
      email: formData.email,
      telefono: formData.telefono,
      empresa: formData.empresa,
      rol: formData.rol,
      estado: true,
      fechaRegistro: new Date().toISOString().split("T")[0],
      contrasena: contrasenaGenerada,         // Contraseña temporal
      requiereCambioContrasena: true,          // Obligar cambio al primer login
    };

    setUsers([...users, newUser]);
    setCreateDialogOpen(false);

    // 3. Enviar correo con credenciales
    try {
      await enviarCorreoBienvenida({
        email: formData.email,
        nombre: `${formData.nombre} ${formData.apellido}`,
        documento: formData.documento,
        rol: formData.rol,
        contrasena: contrasenaGenerada,
      });
      toast.success(
        `Usuario creado exitosamente. Se enviaron las credenciales a ${formData.email}`
      );
    } catch (error) {
      console.error("Error enviando correo:", error);
      // El usuario se creó, pero el correo falló
      toast.warning(
        "Usuario creado, pero no se pudo enviar el correo. Verifica la configuración de EmailJS."
      );
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialogOpen(true);
  };

  const handleEditUser = (id: number, formData: Partial<User>) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, ...formData }
          : u
      )
    );
    setEditDialogOpen(false);
    toast.success("Usuario actualizado exitosamente");
  };

  const handleToggleEstado = (userId: number) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, estado: !u.estado } : u
      )
    );
    toast.success("Estado del usuario actualizado");
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    toast.success("Usuario eliminado exitosamente");
  };

  // El resto del JSX es idéntico al original — solo se cambió handleCreateUser arriba
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
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

      {/* Header and filters */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, email o documento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-80"
            />
          </div>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-[#e7000b] hover:bg-[#c10009] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Usuario
        </Button>
      </div>

      {/* Table */}
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
              // Colores de badge por rol
              const rolColors: Record<string, string> = {
                Administrador: "bg-red-100 text-red-600",
                Empleado:      "bg-gray-100 text-gray-600",
                Supervisor:    "bg-purple-100 text-purple-600",
                Cocinero:      "bg-orange-100 text-orange-600",
              };
              const rolColor = rolColors[user.rol] ?? "bg-gray-100 text-gray-600";

              return (
                <TableRow key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

                  {/* Usuario: avatar + nombre + teléfono */}
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

                  {/* Documento: tipo encima, número abajo */}
                  <TableCell className="py-4">
                    <p className="text-gray-900 text-sm font-medium">{user.tipoDocumento}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{user.documento}</p>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="py-4 text-sm text-gray-600">{user.email}</TableCell>

                  {/* Empresa */}
                  <TableCell className="py-4 text-sm text-gray-600">{user.empresa}</TableCell>

                  {/* Rol badge */}
                  <TableCell className="py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${rolColor}`}>
                      {user.rol}
                    </span>
                  </TableCell>

                  {/* Estado badge */}
                  <TableCell className="py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                      user.estado
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {user.estado ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>

                  {/* Acciones: iconos individuales + toggle */}
                  <TableCell className="py-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        title="Ver"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setSelectedUser(user); setEditDialogOpen(true); }}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setUserToDelete(user); setDeleteDialogOpen(true); }}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <Switch
                        checked={user.estado}
                        onCheckedChange={() => handleToggleEstado(user.id)}
                      />
                    </div>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={(data) => { handleCreateUser(data); }}
      />

      {selectedUser && (
        <ViewUserDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          user={selectedUser}
          onEdit={(user) => {
            setSelectedUser(user);
            setViewDialogOpen(false);
            setEditDialogOpen(true);
          }}
        />
      )}

      {selectedUser && (
        <EditUserDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          user={selectedUser}
          onSubmit={handleEditUser}
        />
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
            <AlertDialogAction
              onClick={handleDeleteUser}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}