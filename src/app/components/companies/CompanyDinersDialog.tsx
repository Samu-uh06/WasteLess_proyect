import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Plus, X, MapPin, Edit, Trash2, UtensilsCrossed } from "lucide-react";
import { Company } from "../../pages/Companies";

interface Comedor {
  id: number;
  nombre: string;
  direccion: string;
  capacidad: number;
  estado: "Activo" | "Inactivo";
}

interface CompanyDinersDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CompanyDinersDialog({
  company,
  open,
  onOpenChange,
}: CompanyDinersDialogProps) {
  const [comedores, setComedores] = useState<Comedor[]>([
    {
      id: 1,
      nombre: "Comedor Principal",
      direccion: "Cra 13 # 36-24, Piso 2",
      capacidad: 150,
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "Comedor Sede Norte",
      direccion: "Av. 68 # 75-50",
      capacidad: 80,
      estado: "Activo",
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComedor, setNewComedor] = useState({
    nombre: "",
    direccion: "",
    capacidad: "",
  });

  const handleAddComedor = () => {
    if (newComedor.nombre && newComedor.direccion && newComedor.capacidad) {
      setComedores([
        ...comedores,
        {
          id: comedores.length + 1,
          nombre: newComedor.nombre,
          direccion: newComedor.direccion,
          capacidad: parseInt(newComedor.capacidad),
          estado: "Activo",
        },
      ]);
      setNewComedor({ nombre: "", direccion: "", capacidad: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteComedor = (id: number) => {
    setComedores(comedores.filter((c) => c.id !== id));
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
                <UtensilsCrossed className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Comedores de {company.nombre}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Gestiona los comedores asociados a esta empresa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="bg-[#4f39f6] hover:bg-[#3f29d6] text-white"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Comedor
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Add Comedor Form */}
          {showAddForm && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-4">
              <h4 className="font-bold text-gray-900">Nuevo Comedor</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre" className="text-sm text-gray-700">
                    Nombre del comedor *
                  </Label>
                  <Input
                    id="nombre"
                    value={newComedor.nombre}
                    onChange={(e) =>
                      setNewComedor({ ...newComedor, nombre: e.target.value })
                    }
                    placeholder="Comedor Principal"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="capacidad" className="text-sm text-gray-700">
                    Capacidad *
                  </Label>
                  <Input
                    id="capacidad"
                    type="number"
                    value={newComedor.capacidad}
                    onChange={(e) =>
                      setNewComedor({
                        ...newComedor,
                        capacidad: e.target.value,
                      })
                    }
                    placeholder="150"
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="direccion" className="text-sm text-gray-700">
                  Dirección *
                </Label>
                <Input
                  id="direccion"
                  value={newComedor.direccion}
                  onChange={(e) =>
                    setNewComedor({ ...newComedor, direccion: e.target.value })
                  }
                  placeholder="Cra 13 # 36-24, Piso 2"
                  className="mt-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewComedor({ nombre: "", direccion: "", capacidad: "" });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  size="sm"
                  className="bg-[#4f39f6] hover:bg-[#3f29d6] text-white"
                  onClick={handleAddComedor}
                >
                  Guardar Comedor
                </Button>
              </div>
            </div>
          )}

          {/* Comedores List */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Dirección</TableHead>
                    <TableHead>Capacidad</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-center">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {comedores.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        <UtensilsCrossed className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="text-sm text-gray-500">
                          No hay comedores registrados
                        </p>
                        <Button
                          variant="link"
                          className="text-blue-600 mt-2"
                          onClick={() => setShowAddForm(true)}
                        >
                          Agregar el primer comedor
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    comedores.map((comedor) => (
                      <TableRow key={comedor.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                              <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                            </div>
                            <span className="font-medium">{comedor.nombre}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            {comedor.direccion}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            {comedor.capacidad} personas
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                              comedor.estado === "Activo"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {comedor.estado}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-900 hover:bg-red-50 h-8 w-8 p-0"
                              onClick={() => handleDeleteComedor(comedor.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              💡 <strong>Información:</strong> Cada empresa puede tener múltiples
              comedores. Los comedores están asociados a menús específicos y
              permiten a los trabajadores seleccionar sus comidas.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}