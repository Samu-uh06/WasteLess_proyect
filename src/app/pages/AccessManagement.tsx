import { useState } from "react";
import { Search, Eye, Calendar, Clock, Users as UsersIcon, UserCheck, Shield, Filter } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { X, MapPin, Monitor, Smartphone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface AccessLog {
  id: number;
  usuario: string;
  documento: string;
  email: string;
  rol: string;
  fechaCompleta: string;
  fecha: string;
  hora: string;
  año: number;
  mes: string;
  dia: number;
  dispositivo: string;
  navegador: string;
  ip: string;
  ubicacion: string;
  accion: string;
  duracionSesion?: string;
  exitoso: boolean;
}

const mockAccessLogs: AccessLog[] = [
  {
    id: 1,
    usuario: "Samuel Umego",
    documento: "10537827",
    email: "samuelumego@gmail.com",
    rol: "Administrador",
    fechaCompleta: "2025-02-20 08:30:45",
    fecha: "20/02/2025",
    hora: "08:30:45",
    año: 2025,
    mes: "Febrero",
    dia: 20,
    dispositivo: "Desktop",
    navegador: "Chrome 121",
    ip: "192.168.1.100",
    ubicacion: "Bogotá, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "2h 15m",
    exitoso: true,
  },
  {
    id: 2,
    usuario: "Miguel Appel",
    documento: "98273364",
    email: "miguelyappel@hotmail.com",
    rol: "Empleado",
    fechaCompleta: "2025-02-20 09:15:22",
    fecha: "20/02/2025",
    hora: "09:15:22",
    año: 2025,
    mes: "Febrero",
    dia: 20,
    dispositivo: "Mobile",
    navegador: "Safari iOS",
    ip: "192.168.1.105",
    ubicacion: "Medellín, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "1h 45m",
    exitoso: true,
  },
  {
    id: 3,
    usuario: "Ana María Delgado",
    documento: "77654321",
    email: "anamaria@hotmail.com",
    rol: "Empleado",
    fechaCompleta: "2025-02-20 10:00:10",
    fecha: "20/02/2025",
    hora: "10:00:10",
    año: 2025,
    mes: "Febrero",
    dia: 20,
    dispositivo: "Desktop",
    navegador: "Firefox 122",
    ip: "192.168.1.110",
    ubicacion: "Cali, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "3h 30m",
    exitoso: true,
  },
  {
    id: 4,
    usuario: "Andrés Gómez",
    documento: "110987654",
    email: "andresgomez@hotmail.com",
    rol: "Supervisor",
    fechaCompleta: "2025-02-20 11:45:33",
    fecha: "20/02/2025",
    hora: "11:45:33",
    año: 2025,
    mes: "Febrero",
    dia: 20,
    dispositivo: "Tablet",
    navegador: "Chrome Android",
    ip: "192.168.1.115",
    ubicacion: "Barranquilla, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "45m",
    exitoso: true,
  },
  {
    id: 5,
    usuario: "José Maria Martínez",
    documento: "89308927",
    email: "josemaria@hotmail.com",
    rol: "Empleado",
    fechaCompleta: "2025-02-20 07:30:00",
    fecha: "20/02/2025",
    hora: "07:30:00",
    año: 2025,
    mes: "Febrero",
    dia: 20,
    dispositivo: "Desktop",
    navegador: "Edge 121",
    ip: "192.168.1.120",
    ubicacion: "Bogotá, Colombia",
    accion: "Intento fallido",
    exitoso: false,
  },
  {
    id: 6,
    usuario: "Samuel Umego",
    documento: "10537827",
    email: "samuelumego@gmail.com",
    rol: "Administrador",
    fechaCompleta: "2025-02-19 14:20:15",
    fecha: "19/02/2025",
    hora: "14:20:15",
    año: 2025,
    mes: "Febrero",
    dia: 19,
    dispositivo: "Desktop",
    navegador: "Chrome 121",
    ip: "192.168.1.100",
    ubicacion: "Bogotá, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "4h 10m",
    exitoso: true,
  },
  {
    id: 7,
    usuario: "Miguel Appel",
    documento: "98273364",
    email: "miguelyappel@hotmail.com",
    rol: "Empleado",
    fechaCompleta: "2025-02-19 15:30:45",
    fecha: "19/02/2025",
    hora: "15:30:45",
    año: 2025,
    mes: "Febrero",
    dia: 19,
    dispositivo: "Mobile",
    navegador: "Safari iOS",
    ip: "192.168.1.105",
    ubicacion: "Medellín, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "2h 20m",
    exitoso: true,
  },
  {
    id: 8,
    usuario: "Ana María Delgado",
    documento: "77654321",
    email: "anamaria@hotmail.com",
    rol: "Empleado",
    fechaCompleta: "2025-02-19 08:15:30",
    fecha: "19/02/2025",
    hora: "08:15:30",
    año: 2025,
    mes: "Febrero",
    dia: 19,
    dispositivo: "Desktop",
    navegador: "Chrome 121",
    ip: "192.168.1.110",
    ubicacion: "Cali, Colombia",
    accion: "Inicio de sesión",
    duracionSesion: "5h 45m",
    exitoso: true,
  },
];

export function AccessManagement() {
  const [logs, setLogs] = useState<AccessLog[]>(mockAccessLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AccessLog | null>(null);

  // Calculate stats
  const stats = {
    total: logs.length,
    hoy: logs.filter((l) => l.fecha === "20/02/2025").length,
    exitosos: logs.filter((l) => l.exitoso).length,
    fallidos: logs.filter((l) => !l.exitoso).length,
    usuariosUnicos: new Set(logs.map((l) => l.documento)).size,
  };

  const statsCards = [
    {
      title: "Total Accesos",
      value: stats.total.toString(),
      icon: UserCheck,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Accesos Hoy",
      value: stats.hoy.toString(),
      icon: Clock,
      iconBg: "bg-[#10b981]",
    },
    {
      title: "Usuarios Únicos",
      value: stats.usuariosUnicos.toString(),
      icon: UsersIcon,
      iconBg: "bg-[#f59e0b]",
    },
    {
      title: "Intentos Fallidos",
      value: stats.fallidos.toString(),
      icon: Shield,
      iconBg: "bg-[#e7000b]",
    },
  ];

  const dateFilters = [
    { id: "all", label: "Todos" },
    { id: "20/02/2025", label: "Hoy (20 Feb)" },
    { id: "19/02/2025", label: "Ayer (19 Feb)" },
    { id: "semana", label: "Esta Semana" },
  ];

  const filteredLogs = logs.filter((log) => {
    return (
      log.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.documento.includes(searchTerm) ||
      log.ip.includes(searchTerm)
    );
  });

  const handleViewLog = (log: AccessLog) => {
    setSelectedLog(log);
    setViewDialogOpen(true);
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Accesos</h1>
        <p className="text-sm text-gray-600">
          Registro y seguimiento de accesos al sistema
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

      {/* Filters */}
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por usuario, email, documento o IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>
      </div>

      {/* Access Logs Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Año</TableHead>
              <TableHead>Dispositivo</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{log.usuario}</p>
                      <p className="text-xs text-gray-500">{log.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      log.rol === "Administrador"
                        ? "bg-red-100 text-red-800"
                        : log.rol === "Supervisor"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {log.rol}
                  </span>
                </TableCell>
                <TableCell className="font-medium text-sm">{log.fecha}</TableCell>
                <TableCell className="text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {log.hora}
                  </div>
                </TableCell>
                <TableCell className="font-medium text-sm">{log.año}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {log.dispositivo === "Mobile" || log.dispositivo === "Tablet" ? (
                      <Smartphone className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Monitor className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="text-sm">{log.dispositivo}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-mono">{log.ip}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      log.exitoso
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {log.exitoso ? "✓ Exitoso" : "✗ Fallido"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                      onClick={() => handleViewLog(log)}
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    Detalles de Acceso
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Registro #{selectedLog?.id} - {selectedLog?.fechaCompleta}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewDialogOpen(false)}
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </DialogHeader>

          {selectedLog && (
            <div className="px-6 py-6 space-y-6">
              {/* Estado del Acceso - Banner horizontal */}
              <div
                className={`rounded-lg p-4 ${
                  selectedLog.exitoso
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        selectedLog.exitoso ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {selectedLog.exitoso ? (
                        <UserCheck className="w-6 h-6 text-green-600" />
                      ) : (
                        <Shield className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {selectedLog.accion}
                      </h3>
                      <p
                        className={`text-sm ${
                          selectedLog.exitoso ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {selectedLog.exitoso
                          ? "Acceso autorizado al sistema"
                          : "Intento de acceso no autorizado"}
                      </p>
                    </div>
                  </div>
                  {selectedLog.duracionSesion && selectedLog.exitoso && (
                    <div className="flex items-center gap-2 bg-white/60 rounded-lg px-4 py-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Duración</p>
                        <p className="text-sm font-bold text-gray-900">
                          {selectedLog.duracionSesion}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información del Usuario - Horizontal */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Información del Usuario
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Nombre</p>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedLog.usuario}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Documento</p>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedLog.documento}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="text-sm font-bold text-gray-900 truncate" title={selectedLog.email}>
                      {selectedLog.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Rol</p>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        selectedLog.rol === "Administrador"
                          ? "bg-red-100 text-red-800"
                          : selectedLog.rol === "Supervisor"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedLog.rol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fecha y Hora - Horizontal compacto */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Fecha y Hora del Acceso
                </h3>
                <div className="flex gap-3">
                  <div className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p className="text-xs text-gray-600">Fecha</p>
                    </div>
                    <p className="text-base font-bold text-blue-900">
                      {selectedLog.fecha}
                    </p>
                  </div>
                  <div className="flex-1 bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-green-600" />
                      <p className="text-xs text-gray-600">Hora</p>
                    </div>
                    <p className="text-base font-bold text-green-900">
                      {selectedLog.hora}
                    </p>
                  </div>
                  <div className="flex-1 bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <p className="text-xs text-gray-600">Año</p>
                    </div>
                    <p className="text-base font-bold text-orange-900">
                      {selectedLog.año}
                    </p>
                  </div>
                  <div className="flex-1 bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <p className="text-xs text-gray-600">Mes</p>
                    </div>
                    <p className="text-base font-bold text-purple-900">
                      {selectedLog.mes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Información Técnica - Horizontal */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Información Técnica
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      {selectedLog.dispositivo === "Mobile" ||
                      selectedLog.dispositivo === "Tablet" ? (
                        <Smartphone className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Monitor className="w-4 h-4 text-gray-600" />
                      )}
                      <p className="text-xs text-gray-600">Dispositivo</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedLog.dispositivo}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Navegador</p>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedLog.navegador}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Dirección IP</p>
                    <p className="text-sm font-bold text-gray-900 font-mono">
                      {selectedLog.ip}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <p className="text-xs text-gray-600">Ubicación</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">
                      {selectedLog.ubicacion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}