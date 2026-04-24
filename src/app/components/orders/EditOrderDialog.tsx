import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Package, X } from "lucide-react";

interface Order {
  id: number;
  codigo: string;
  proveedor: string;
  producto: string;
  cantidad: string;
  restaurante: string;
  estado: string;
  statusClass: string;
  fechaCreacion: string;
  descripcion?: string;
  direccion?: string;
  contacto?: string;
}

interface EditOrderDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: Partial<Order>) => void;
}

export function EditOrderDialog({
  order,
  open,
  onOpenChange,
  onSubmit,
}: EditOrderDialogProps) {
  const [formData, setFormData] = useState<Partial<Order>>({});

  useEffect(() => {
    if (order) {
      setFormData({
        proveedor: order.proveedor,
        producto: order.producto,
        cantidad: order.cantidad,
        restaurante: order.restaurante,
        estado: order.estado,
        descripcion: order.descripcion,
        direccion: order.direccion,
        contacto: order.contacto,
      });
    } else {
      setFormData({
        proveedor: "",
        producto: "",
        cantidad: "",
        restaurante: "Sin asignar",
        estado: "Pendiente",
        descripcion: "",
        direccion: "",
        contacto: "",
      });
    }
  }, [order]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (order) {
      onSubmit(order.id, formData);
    } else {
      // Crear nuevo pedido con ID temporal
      onSubmit(0, formData);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
                <Package className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {order ? "Editar Pedido" : "Crear Nuevo Pedido"}
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  {order
                    ? `Actualice la información del pedido ${order.codigo}`
                    : "Complete la información del nuevo pedido"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-4">
            {/* Proveedor */}
            <div>
              <Label htmlFor="edit-proveedor" className="text-sm text-gray-700">
                Proveedor *
              </Label>
              <Input
                id="edit-proveedor"
                value={formData.proveedor || ""}
                onChange={(e) =>
                  setFormData({ ...formData, proveedor: e.target.value })
                }
                placeholder="Nombre del proveedor"
                className="mt-2"
              />
            </div>

            {/* Contacto y Dirección */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-contacto" className="text-sm text-gray-700">
                  Contacto
                </Label>
                <Input
                  id="edit-contacto"
                  value={formData.contacto || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, contacto: e.target.value })
                  }
                  placeholder="Persona de contacto"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-direccion" className="text-sm text-gray-700">
                  Dirección
                </Label>
                <Input
                  id="edit-direccion"
                  value={formData.direccion || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, direccion: e.target.value })
                  }
                  placeholder="Dirección del proveedor"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Producto y Cantidad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-producto" className="text-sm text-gray-700">
                  Producto *
                </Label>
                <Input
                  id="edit-producto"
                  value={formData.producto || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, producto: e.target.value })
                  }
                  placeholder="Tipo de producto"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-cantidad" className="text-sm text-gray-700">
                  Cantidad *
                </Label>
                <Input
                  id="edit-cantidad"
                  value={formData.cantidad || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, cantidad: e.target.value })
                  }
                  placeholder="Ej: 50 kg"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <Label htmlFor="edit-descripcion" className="text-sm text-gray-700">
                Descripción
              </Label>
              <Textarea
                id="edit-descripcion"
                value={formData.descripcion || ""}
                onChange={(e) =>
                  setFormData({ ...formData, descripcion: e.target.value })
                }
                placeholder="Descripción detallada del producto"
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Restaurante y Estado */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-restaurante" className="text-sm text-gray-700">
                  Restaurante Destino
                </Label>
                <Select
                  value={formData.restaurante || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, restaurante: value })
                  }
                >
                  <SelectTrigger id="edit-restaurante" className="mt-2">
                    <SelectValue placeholder="Seleccione restaurante" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sin asignar">Sin asignar</SelectItem>
                    <SelectItem value="Restaurante El Buen Sabor">
                      Restaurante El Buen Sabor
                    </SelectItem>
                    <SelectItem value="Comedor Social Norte">
                      Comedor Social Norte
                    </SelectItem>
                    <SelectItem value="Restaurante Popular">
                      Restaurante Popular
                    </SelectItem>
                    <SelectItem value="Fundación Alimentos">
                      Fundación Alimentos
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-estado" className="text-sm text-gray-700">
                  Estado *
                </Label>
                <Select
                  value={formData.estado || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, estado: value })
                  }
                >
                  <SelectTrigger id="edit-estado" className="mt-2">
                    <SelectValue placeholder="Seleccione estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Validado">Validado</SelectItem>
                    <SelectItem value="Aceptado">Aceptado</SelectItem>
                    <SelectItem value="En Producción">En Producción</SelectItem>
                    <SelectItem value="Entregado">Entregado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#e7000b] hover:bg-[#c10009] text-white"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}