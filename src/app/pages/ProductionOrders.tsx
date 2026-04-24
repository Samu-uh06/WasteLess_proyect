import { useState, useEffect } from "react";
import { Search, Info, ClipboardList } from "lucide-react";
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
import { X } from "lucide-react";
import { loadProductionOrders, type ProductionOrder } from "../services/productionOrdersService";

export function ProductionOrders() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);

  // Cargar órdenes al montar el componente
  useEffect(() => {
    const loadedOrders = loadProductionOrders();
    setOrders(loadedOrders);
  }, []);

  // Recargar órdenes cuando se cierra el diálogo de vista
  useEffect(() => {
    if (!viewDialogOpen) {
      const loadedOrders = loadProductionOrders();
      setOrders(loadedOrders);
    }
  }, [viewDialogOpen]);

  const filteredOrders = orders.filter((order) => {
    const searchableText = `${order.codigo} ${order.dia} ${order.tipoComida} ${order.comedor}`.toLowerCase();
    return searchableText.includes(searchTerm.toLowerCase());
  });

  const handleViewOrder = (order: ProductionOrder) => {
    setSelectedOrder(order);
    setViewDialogOpen(true);
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Órdenes de Producción
        </h1>
        <p className="text-sm text-gray-600">
          Visualiza las órdenes generadas automáticamente desde los pedidos finalizados
        </p>
      </div>

      {/* Stats Card */}
      <Card className="mb-6 border-0 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Órdenes</p>
              <p className="text-4xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="bg-[#f59e0b] p-4 rounded-lg">
              <ClipboardList className="w-10 h-10 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por código, día, comida o comedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>O.P</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Comedor</TableHead>
              <TableHead>Capacidad</TableHead>
              <TableHead>Cant. Platillos</TableHead>
              <TableHead>Día - Comida</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No hay órdenes de producción. Cambia el estado de un pedido a "Finalizado" para crear una.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.codigo}</TableCell>
                  <TableCell className="text-sm">{order.fecha}</TableCell>
                  <TableCell>{order.comedor}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{order.capacidadComedor}</p>
                    <p className="text-xs text-gray-500">personas</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{order.cantidadPlatillos}</p>
                    <p className="text-xs text-gray-500">unidades</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{order.dia}</p>
                    <p className="text-xs text-gray-500">{order.tipoComida}</p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${order.statusClass}`}
                    >
                      {order.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                        onClick={() => handleViewOrder(order)}
                        title="Ver detalles"
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                  <ClipboardList className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedOrder?.codigo}
                  </DialogTitle>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full inline-block mt-1 ${selectedOrder?.statusClass}`}
                  >
                    ● {selectedOrder?.estado}
                  </span>
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

          {selectedOrder && (
            <div className="px-6 py-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">
                  Empleados que Hicieron el Pedido ({selectedOrder.empleados?.length || 0})
                </h3>
                <div className="bg-gray-50 rounded p-4 max-h-[400px] overflow-y-auto">
                  {selectedOrder.empleados && selectedOrder.empleados.length > 0 ? (
                    <div className="space-y-2">
                      {selectedOrder.empleados.map((empleado, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white rounded p-3 border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {empleado.nombre}
                            </p>
                            <div className="flex gap-4 mt-1">
                              <p className="text-xs text-gray-500">
                                Doc: {empleado.numeroDocumento}
                              </p>
                              <p className="text-xs text-gray-500">
                                Tel: {empleado.telefono}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {empleado.platilloPedido}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p className="text-sm">No hay empleados registrados para esta orden</p>
                    </div>
                  )}
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