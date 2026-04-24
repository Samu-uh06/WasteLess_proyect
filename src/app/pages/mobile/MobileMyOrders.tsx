import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Check, UtensilsCrossed, ClipboardList, User, ChefHat, Eye } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

const mockDishes = [
  { id: 1, nombre: "Arroz con Pollo" },
  { id: 2, nombre: "Ensalada César" },
  { id: 3, nombre: "Bandeja Paisa" },
  { id: 4, nombre: "Sopa de Lentejas" },
  { id: 5, nombre: "Tiramisu" },
  { id: 6, nombre: "Jugo Natural" },
  { id: 7, nombre: "Pescado al Horno" },
  { id: 8, nombre: "Pasta Carbonara" },
  { id: 9, nombre: "Huevos Revueltos" },
  { id: 10, nombre: "Arepas con Queso" },
  { id: 11, nombre: "Café con Leche" },
  { id: 12, nombre: "Pan Tostado" },
];

const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"] as const;
const tiposComida = ["desayuno", "almuerzo", "cena"] as const;

const diasSemanaLabels: Record<typeof diasSemana[number], string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
};

const tiposComidaLabels: Record<typeof tiposComida[number], string> = {
  desayuno: "Desayuno",
  almuerzo: "Almuerzo",
  cena: "Cena",
};

const tiposComidaIcons: Record<typeof tiposComida[number], string> = {
  desayuno: "☀️",
  almuerzo: "🍽️",
  cena: "🌙",
};

interface Pedido {
  id: number;
  fecha: string;
  semana: string;
  selecciones: any;
  estado: string;
}

export function MobileMyOrders() {
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("empleadoLoggedIn");
    if (!loggedIn) {
      navigate("/mobile/login");
      return;
    }

    const pedidosData = localStorage.getItem("pedidosEmpleado");
    if (pedidosData) {
      setPedidos(JSON.parse(pedidosData));
    }
  }, [navigate]);

  const handleViewDetails = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setDetailDialogOpen(true);
  };

  const getTotalSelections = (pedido: Pedido) => {
    let total = 0;
    diasSemana.forEach((dia) => {
      tiposComida.forEach((comida) => {
        if (pedido.selecciones[dia]?.[comida]) total++;
      });
    });
    return total;
  };

  const getDishName = (dishId: number) => {
    return mockDishes.find((d) => d.id === dishId)?.nombre || "Platillo desconocido";
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E7000B] text-white p-4 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mobile/home")}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Mis Pedidos</h1>
              <p className="text-xs text-white/80">Historial de pedidos semanales</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {pedidos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClipboardList className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No tienes pedidos</h3>
              <p className="text-sm text-gray-600 mb-6">
                Comienza a hacer tus pedidos semanales para visualizarlos aquí
              </p>
              <Button
                onClick={() => navigate("/mobile/weekly-menu")}
                className="bg-[#E7000B] hover:bg-[#c00009]"
              >
                Hacer Pedido
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {pedidos.map((pedido) => (
                <Card key={pedido.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shrink-0">
                        <ChefHat className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">
                              Pedido #{pedido.id.toString().slice(-4)}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                              <Calendar className="w-3 h-3" />
                              {pedido.semana}
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {pedido.estado}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-3">
                          <Badge className="bg-red-100 text-red-800 text-xs">
                            {getTotalSelections(pedido)} comidas
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetails(pedido)}
                            className="h-8 text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Ver Detalles
                          </Button>
                        </div>

                        <div className="mt-2 text-xs text-gray-500">
                          Realizado el {new Date(pedido.fecha).toLocaleDateString("es-CO", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-3 gap-1 p-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/mobile/home")}
              className="flex-col gap-1 h-auto py-3 text-gray-600"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs">Inicio</span>
            </Button>
            <Button
              variant="ghost"
              className="flex-col gap-1 h-auto py-3 bg-red-50 text-[#E7000B]"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs font-semibold">Mis Pedidos</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/mobile/profile")}
              className="flex-col gap-1 h-auto py-3 text-gray-600"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>

        {/* Detail Dialog */}
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="max-w-md max-h-[80vh] overflow-hidden p-0">
            <DialogHeader className="border-b p-4">
              <DialogTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-green-600" />
                Detalle del Pedido
              </DialogTitle>
            </DialogHeader>
            {selectedPedido && (
              <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-4 space-y-4">
                {/* Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Semana</p>
                    <p className="font-semibold text-sm">{selectedPedido.semana}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Total Comidas</p>
                    <p className="font-semibold text-sm">{getTotalSelections(selectedPedido)}</p>
                  </div>
                </div>

                {/* Selecciones por día */}
                <div className="space-y-3">
                  {diasSemana.map((dia) => {
                    const daySelections = tiposComida.filter(
                      (comida) => selectedPedido.selecciones[dia]?.[comida]
                    );
                    if (daySelections.length === 0) return null;

                    return (
                      <div key={dia} className="border rounded-lg p-3 bg-white">
                        <h4 className="font-semibold text-sm text-gray-900 mb-3">
                          {diasSemanaLabels[dia]}
                        </h4>
                        <div className="space-y-2">
                          {tiposComida.map((comida) => {
                            const dishId = selectedPedido.selecciones[dia]?.[comida];
                            if (!dishId) return null;

                            return (
                              <div
                                key={comida}
                                className="flex items-center gap-2 bg-gray-50 rounded p-2"
                              >
                                <span className="text-lg">{tiposComidaIcons[comida]}</span>
                                <div className="flex-1">
                                  <p className="text-xs text-gray-600 capitalize">
                                    {tiposComidaLabels[comida]}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900">
                                    {getDishName(dishId)}
                                  </p>
                                </div>
                                <Check className="w-4 h-4 text-green-600" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}