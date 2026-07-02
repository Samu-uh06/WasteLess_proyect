import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Eye, Pencil, MapPin, Users, Building2, X, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "../components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import {
  loadDiningRooms, createDiningRoom, updateDiningRoom, deleteDiningRoom,
  toggleDiningRoomStatus, type ApiDiningRoom,
} from "../services/dinersService";
import { loadCompanies, type ApiCompany } from "../services/companiesService";

export interface Diner {
  id: number;
  nombre: string;
  idEmpresa: number;
  empresa: string;
  direccion: string;
  capacidad: number;
  empleados: number;
  encargado: string;
  telefono: string;
  horario: string;
  estado: string;
  descripcion?: string;
}

const mapDiner = (d: ApiDiningRoom, companies: ApiCompany[]): Diner => ({
  id: Number(d.idComedor),
  nombre: d.nombre,
  idEmpresa: d.idEmpresa,
  empresa: d.nombreEmpresa || companies.find((c) => Number(c.idEmpresa) === d.idEmpresa)?.nombreEmpresa || "",
  direccion: d.direccion,
  capacidad: d.capacidad,
  empleados: d.totalEmpleados || 0,
  encargado: d.encargado || "",
  telefono: d.telefono || "",
  horario: d.horario || "",
  estado: d.estado === "activo" ? "Activo" : "Inactivo",
  descripcion: d.descripcion,
});

export function Diners() {
  const [diners, setDiners] = useState<Diner[]>([]);
  const [companies, setCompanies] = useState<ApiCompany[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dinerToDelete, setDinerToDelete] = useState<Diner | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDiner, setSelectedDiner] = useState<Diner | null>(null);
  const [formData, setFormData] = useState<Partial<Diner>>({});

  const fetchDiners = useCallback(async (companiesData?: ApiCompany[]) => {
    try {
      const data = await loadDiningRooms();
      setDiners(data.map((d) => mapDiner(d, companiesData ?? companies)));
    } catch {
      toast.error("Error al cargar comedores");
    }
  }, [companies]);

  useEffect(() => {
    (async () => {
      try {
        const companiesData = await loadCompanies();
        setCompanies(companiesData);
        const data = await loadDiningRooms();
        setDiners(data.map((d) => mapDiner(d, companiesData)));
      } catch {
        toast.error("Error al cargar datos");
      }
    })();
  }, []);

  const filteredDiners = diners.filter(
    (diner) =>
      diner.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diner.empresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDiningRoom({
        nombre: formData.nombre || "",
        idEmpresa: formData.idEmpresa || 0,
        direccion: formData.direccion || "",
        capacidad: formData.capacidad || 0,
        totalEmpleados: formData.empleados,
        encargado: formData.encargado,
        telefono: formData.telefono,
        horario: formData.horario,
        descripcion: formData.descripcion,
      });
      await fetchDiners();
      setIsDialogOpen(false);
      setFormData({});
      toast.success("Comedor creado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al crear el comedor");
    }
  };

  const handleViewDiner = (diner: Diner) => {
    setSelectedDiner(diner);
    setViewDialogOpen(true);
  };

  const handleEditClick = (diner: Diner) => {
    setSelectedDiner(diner);
    setFormData(diner);
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleEditDiner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDiner) return;
    try {
      await updateDiningRoom(selectedDiner.id, {
        nombre: formData.nombre,
        idEmpresa: formData.idEmpresa,
        direccion: formData.direccion,
        capacidad: formData.capacidad,
        totalEmpleados: formData.empleados,
        encargado: formData.encargado,
        telefono: formData.telefono,
        horario: formData.horario,
        descripcion: formData.descripcion,
      });
      await fetchDiners();
      setEditDialogOpen(false);
      toast.success("Comedor actualizado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al actualizar el comedor");
    }
  };

  const handleToggleStatus = async (diner: Diner) => {
    try {
      const nuevoEstado = diner.estado === "Activo" ? "inactivo" : "activo";
      await toggleDiningRoomStatus(diner.id, nuevoEstado);
      await fetchDiners();
      toast.success("Estado del comedor actualizado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al cambiar el estado");
    }
  };

  const handleDeleteClick = (diner: Diner) => {
    setDinerToDelete(diner);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDiner = async () => {
    if (!dinerToDelete) return;
    try {
      await deleteDiningRoom(dinerToDelete.id);
      await fetchDiners();
      setDeleteDialogOpen(false);
      toast.success("Comedor eliminado exitosamente");
      setDinerToDelete(null);
    } catch (err: any) {
      toast.error(err?.message || "Error al eliminar el comedor");
    }
  };

  const totalCapacity = diners.reduce((sum, diner) => sum + diner.capacidad, 0);
  const totalEmployees = diners.reduce((sum, diner) => sum + diner.empleados, 0);

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Comedores</h1>
        <p className="text-sm text-gray-600">Administra los comedores de las empresas y sus capacidades</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Total Comedores</p>
              <div className="bg-[#8b5cf6] p-2 rounded-lg"><Building2 className="w-5 h-5 text-white" /></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{diners.length}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Capacidad Total</p>
              <div className="bg-[#3b82f6] p-2 rounded-lg"><Users className="w-5 h-5 text-white" /></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalCapacity}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Total Empleados</p>
              <div className="bg-[#10b981] p-2 rounded-lg"><Users className="w-5 h-5 text-white" /></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalEmployees}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">Empresas</p>
              <div className="bg-[#f59e0b] p-2 rounded-lg"><Building2 className="w-5 h-5 text-white" /></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{companies.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Create */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input type="text" placeholder="Buscar comedores por nombre o empresa..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Button onClick={() => { setFormData({}); setIsDialogOpen(true); }} className="bg-[#e7000b] hover:bg-[#c10009] text-white">
          <Plus className="w-4 h-4 mr-2" />Crear
        </Button>
      </div>

      {/* Diners Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Empleados</TableHead>
              <TableHead>Encargado</TableHead>
              <TableHead>Horario</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiners.map((diner) => (
              <TableRow key={diner.id}>
                <TableCell className="font-medium">{diner.nombre}</TableCell>
                <TableCell>{diner.empresa}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{diner.direccion}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Users className="w-3 h-3" />{diner.capacidad} personas
                  </span>
                </TableCell>
                <TableCell>{diner.empleados}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{diner.encargado}</p>
                    <p className="text-xs text-gray-500">{diner.telefono}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{diner.horario}</TableCell>
                <TableCell>
                  <Switch
                    checked={diner.estado === "Activo"}
                    onCheckedChange={() => handleToggleStatus(diner)}
                    className={diner.estado === "Activo" ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleViewDiner(diner)} className="bg-green-400/80 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors" title="Ver detalles">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEditClick(diner)} className="bg-blue-400/80 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors" title="Editar">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteClick(diner)} className="bg-red-400/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors" title="Eliminar">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto p-0" showCloseButton={false}>
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                  <Building2 className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-semibold text-gray-900">{selectedDiner?.nombre}</DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedDiner?.empresa}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setViewDialogOpen(false)}><X className="h-5 w-5 text-gray-400" /></Button>
            </div>
          </DialogHeader>
          {selectedDiner && (
            <div className="px-6 py-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Información General</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Nombre</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.nombre}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Empresa</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.empresa}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Estado</p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-0.5">{selectedDiner.estado}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Ubicación y Horario</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Dirección</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.direccion}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Horario</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.horario}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Capacidad y Empleados</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-blue-50 border border-blue-200 rounded p-2">
                    <p className="text-xs text-blue-600">Capacidad</p>
                    <p className="text-base font-medium text-blue-900 mt-0.5">{selectedDiner.capacidad} personas</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <p className="text-xs text-green-600">Total Empleados</p>
                    <p className="text-base font-medium text-green-900 mt-0.5">{selectedDiner.empleados} empleados</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Información de Contacto</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Encargado</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.encargado}</p>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium text-gray-900 mt-0.5">{selectedDiner.telefono}</p>
                  </div>
                </div>
              </div>
              {selectedDiner.descripcion && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Descripción</h3>
                  <div className="bg-gray-50 rounded p-3">
                    <p className="text-sm text-gray-700">{selectedDiner.descripcion}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <DialogTitle className="text-xl font-bold">Editar Comedor</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditDiner}>
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nombre">Nombre *</Label>
                  <Input id="edit-nombre" value={formData.nombre || ""} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-empresa">Empresa *</Label>
                  <Select
                    value={String(formData.idEmpresa || "")}
                    onValueChange={(value) => {
                      const company = companies.find((c) => String(c.idEmpresa) === value);
                      setFormData({ ...formData, idEmpresa: Number(value), empresa: company?.nombreEmpresa || "" });
                    }}
                  >
                    <SelectTrigger id="edit-empresa" className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.idEmpresa} value={String(company.idEmpresa)}>{company.nombreEmpresa}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-direccion">Dirección *</Label>
                <Input id="edit-direccion" value={formData.direccion || ""} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} className="mt-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-capacidad">Capacidad *</Label>
                  <Input id="edit-capacidad" type="number" value={formData.capacidad || ""} onChange={(e) => setFormData({ ...formData, capacidad: Number(e.target.value) })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-empleados">Total Empleados *</Label>
                  <Input id="edit-empleados" type="number" value={formData.empleados || ""} onChange={(e) => setFormData({ ...formData, empleados: Number(e.target.value) })} className="mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-encargado">Encargado *</Label>
                  <Input id="edit-encargado" value={formData.encargado || ""} onChange={(e) => setFormData({ ...formData, encargado: e.target.value })} className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="edit-telefono">Teléfono *</Label>
                  <Input id="edit-telefono" value={formData.telefono || ""} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-horario">Horario *</Label>
                <Input id="edit-horario" value={formData.horario || ""} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} className="mt-2" />
              </div>
              <div>
                <Label htmlFor="edit-descripcion">Descripción</Label>
                <Textarea id="edit-descripcion" value={formData.descripcion || ""} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} className="mt-2" rows={3} />
              </div>
            </div>
            <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#e7000b] hover:bg-[#c10009] text-white">Guardar Cambios</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Diner Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Comedor</DialogTitle>
            <DialogDescription>Complete la información del comedor que se asignará a una empresa</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre del comedor *</Label>
                  <Input id="nombre" value={formData.nombre || ""} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Comedor Central" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="empresa">Empresa *</Label>
                  <Select
                    value={String(formData.idEmpresa || "")}
                    onValueChange={(value) => {
                      const company = companies.find((c) => String(c.idEmpresa) === value);
                      setFormData({ ...formData, idEmpresa: Number(value), empresa: company?.nombreEmpresa || "" });
                    }}
                  >
                    <SelectTrigger><SelectValue placeholder="Seleccione empresa" /></SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.idEmpresa} value={String(company.idEmpresa)}>{company.nombreEmpresa}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="direccion">Dirección *</Label>
                <Input id="direccion" value={formData.direccion || ""} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} placeholder="Cra 13 # 36-24, Bogotá" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="capacidad">Capacidad (personas) *</Label>
                  <Input id="capacidad" type="number" value={formData.capacidad || ""} onChange={(e) => setFormData({ ...formData, capacidad: Number(e.target.value) })} placeholder="250" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="empleados">Total empleados *</Label>
                  <Input id="empleados" type="number" value={formData.empleados || ""} onChange={(e) => setFormData({ ...formData, empleados: Number(e.target.value) })} placeholder="450" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="encargado">Encargado *</Label>
                  <Input id="encargado" value={formData.encargado || ""} onChange={(e) => setFormData({ ...formData, encargado: e.target.value })} placeholder="María Rodríguez" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input id="telefono" value={formData.telefono || ""} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="+57 310 123 4567" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="horario">Horario *</Label>
                <Input id="horario" value={formData.horario || ""} onChange={(e) => setFormData({ ...formData, horario: e.target.value })} placeholder="7:00 AM - 3:00 PM" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea id="descripcion" value={formData.descripcion || ""} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Información adicional sobre el comedor" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-[#e7000b] hover:bg-[#c10009] text-white">Crear Comedor</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar este comedor?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el comedor{" "}
              <span className="font-semibold">{dinerToDelete?.nombre}</span> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDiner} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}