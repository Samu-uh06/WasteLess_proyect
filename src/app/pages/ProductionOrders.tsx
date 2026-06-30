import { useState, useEffect } from "react";
import { Search, Info, ClipboardList, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "../components/ui/dialog";
import { Card, CardContent } from "../components/ui/card";
import { X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { fetchProductionOrders, type ProductionOrder } from "../services/productionOrdersService";

const estadoClass: Record<string, string> = {
  pendiente:   "bg-yellow-100 text-yellow-800",
  en_proceso:  "bg-blue-100 text-blue-800",
  completado:  "bg-green-100 text-green-800",
};

const estadoLabel: Record<string, string> = {
  pendiente:  "Pendiente",
  en_proceso: "En Proceso",
  completado: "Completado",
};

export function ProductionOrders() {
  const [orders, setOrders]               = useState<ProductionOrder[]>([]);
  const [loading, setLoading]             = useState(true);
  const [searchTerm, setSearchTerm]       = useState("");
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProductionOrders();
      setOrders(data);
    } catch {
      toast.error("No se pudieron cargar las órdenes de producción");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = orders.filter((o) => {
    const text = `${o.codigo} ${o.diaSemana} ${o.nombreComedor} ${o.nombreEmpresa}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Órdenes de Producción</h1>
        <p className="text-sm text-gray-600">
          Visualiza las órdenes generadas automáticamente desde los pedidos finalizados
        </p>
      </div>

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

      <div className="mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar por código, día, comida o comedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Cargando órdenes...
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>O.P</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Comedor</TableHead>
                <TableHead>Capacidad</TableHead>
                <TableHead>Cant. Platillos</TableHead>
                <TableHead>Día</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-center">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-gray-500">
                    No hay órdenes de producción todavía.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((order) => (
                  <TableRow key={order.idOrden}>
                    <TableCell className="font-medium">{order.codigo}</TableCell>
                    <TableCell className="text-sm">
                      {format(new Date(order.fechaDia), "d MMM yyyy", { locale: es })}
                    </TableCell>
                    <TableCell>{order.nombreComedor} - {order.nombreEmpresa}</TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{order.capacidad}</p>
                      <p className="text-xs text-gray-500">personas</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm font-medium">{order.cantPlatillos}</p>
                      <p className="text-xs text-gray-500">unidades</p>
                    </TableCell>
                    <TableCell className="font-medium">{order.diaSemana}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${estadoClass[order.estado] ?? "bg-gray-100 text-gray-800"}`}>
                        {estadoLabel[order.estado] ?? order.estado}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
                          onClick={() => setSelectedOrder(order)}
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
        )}
      </div>

      {/* Modal detalle */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-[500px] p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 rounded-lg p-3 w-14 h-14 flex items-center justify-center">
                  <ClipboardList className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">{selectedOrder?.codigo}</DialogTitle>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full inline-block mt-1 ${estadoClass[selectedOrder?.estado ?? ""] ?? ""}`}>
                    ● {estadoLabel[selectedOrder?.estado ?? ""] ?? selectedOrder?.estado}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSelectedOrder(null)}>
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </DialogHeader>

          {selectedOrder && (
            <div className="px-6 py-5 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-gray-500">Comedor:</span><p className="font-medium">{selectedOrder.nombreComedor}</p></div>
                <div><span className="text-gray-500">Empresa:</span><p className="font-medium">{selectedOrder.nombreEmpresa}</p></div>
                <div><span className="text-gray-500">Día:</span><p className="font-medium">{selectedOrder.diaSemana}</p></div>
                <div><span className="text-gray-500">Fecha:</span><p className="font-medium">{format(new Date(selectedOrder.fechaDia), "d MMM yyyy", { locale: es })}</p></div>
                <div><span className="text-gray-500">Capacidad:</span><p className="font-medium">{selectedOrder.capacidad} personas</p></div>
                <div><span className="text-gray-500">Platillos:</span><p className="font-medium">{selectedOrder.cantPlatillos} unidades</p></div>
              </div>
              <div className="bg-gray-50 rounded p-4 text-center text-sm text-gray-500 mt-2">
                El detalle de empleados estará disponible cuando exista la app móvil.
              </div>
            </div>
          )}

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}