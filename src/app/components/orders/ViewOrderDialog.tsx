import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { X, Package, Building2, Calendar, User, MapPin, Clock } from "lucide-react";

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
  telefono?: string;
}

interface ViewOrderDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (order: Order) => void;
}

export function ViewOrderDialog({
  order,
  open,
  onOpenChange,
  onEdit,
}: ViewOrderDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {order.codigo}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${order.statusClass}`}>
                    ● {order.estado}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-4">
          {/* Información del Proveedor */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Información del Proveedor
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Proveedor</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.proveedor}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Contacto</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.contacto || "María González"}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Dirección</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.direccion || "Calle 45 #23-12, Bogotá"}
                </p>
              </div>
            </div>
          </div>

          {/* Información del Producto */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Información del Producto
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Producto</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.producto}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Cantidad</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.cantidad}
                </p>
              </div>

              <div className="bg-gray-50 rounded p-2">
                <p className="text-xs text-gray-500">Fecha Creación</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">
                  {order.fechaCreacion}
                </p>
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Descripción del Producto
            </h3>
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-700">
                {order.descripcion || "Productos frescos en buen estado para rescate alimentario"}
              </p>
            </div>
          </div>

          {/* Información de Entrega */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              Información de Entrega
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-xs text-blue-600">Restaurante Destino</p>
              <p className="text-sm font-bold text-blue-900 mt-0.5">
                {order.restaurante}
              </p>
            </div>
          </div>

          {/* Estado Timeline */}
          <div className={`rounded p-3 ${
            order.estado === "Pendiente" ? "bg-yellow-50 border border-yellow-200" :
            order.estado === "Validado" ? "bg-blue-50 border border-blue-200" :
            order.estado === "Aceptado" ? "bg-purple-50 border border-purple-200" :
            order.estado === "En Producción" ? "bg-orange-50 border border-orange-200" :
            "bg-green-50 border border-green-200"
          }`}>
            <div className="flex items-start gap-3">
              <Clock className={`w-5 h-5 flex-shrink-0 ${
                order.estado === "Pendiente" ? "text-yellow-600" :
                order.estado === "Validado" ? "text-blue-600" :
                order.estado === "Aceptado" ? "text-purple-600" :
                order.estado === "En Producción" ? "text-orange-600" :
                "text-green-600"
              }`} />
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  Estado Actual: {order.estado}
                </h4>
                <p className="text-xs text-gray-700 mt-0.5">
                  {order.estado === "Pendiente" && "Este pedido está pendiente de validación"}
                  {order.estado === "Validado" && "Este pedido ha sido validado y está listo para asignar"}
                  {order.estado === "Aceptado" && "Este pedido ha sido aceptado por el restaurante"}
                  {order.estado === "En Producción" && "Este pedido está siendo procesado"}
                  {order.estado === "Entregado" && "Este pedido ha sido entregado exitosamente"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button
            className="bg-[#e7000b] hover:bg-[#c10009] text-white"
            onClick={() => onEdit(order)}
          >
            Editar Pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}