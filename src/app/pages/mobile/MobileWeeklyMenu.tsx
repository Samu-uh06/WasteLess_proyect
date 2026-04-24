import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Calendar, UtensilsCrossed, ChefHat, Info } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import { toast, Toaster } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";

const mockDishes = [
  {
    id: 1,
    nombre: "Arroz con Pollo",
    categoria: "Plato Fuerte",
    descripcion: "Delicioso arroz con pollo desmechado y vegetales",
    calorias: 450,
    imagen: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    nombre: "Ensalada César",
    categoria: "Ensalada",
    descripcion: "Ensalada fresca con pollo, crutones y aderezo césar",
    calorias: 320,
    imagen: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    nombre: "Bandeja Paisa",
    categoria: "Plato Fuerte",
    descripcion: "Plato típico colombiano con frijoles, carne, chicharrón y más",
    calorias: 850,
    imagen: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    nombre: "Sopa de Lentejas",
    categoria: "Sopa",
    descripcion: "Sopa casera de lentejas con vegetales frescos",
    calorias: 250,
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop",
  },
  {
    id: 5,
    nombre: "Tiramisu",
    categoria: "Postre",
    descripcion: "Delicioso postre italiano con café y mascarpone",
    calorias: 380,
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
  },
  {
    id: 6,
    nombre: "Jugo Natural",
    categoria: "Bebida",
    descripcion: "Jugo natural de frutas frescas",
    calorias: 120,
    imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
  },
  {
    id: 7,
    nombre: "Pescado al Horno",
    categoria: "Plato Fuerte",
    descripcion: "Filete de pescado al horno con limón y hierbas",
    calorias: 350,
    imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop",
  },
  {
    id: 8,
    nombre: "Pasta Carbonara",
    categoria: "Plato Fuerte",
    descripcion: "Pasta con salsa carbonara cremosa y tocino",
    calorias: 520,
    imagen: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop",
  },
  {
    id: 9,
    nombre: "Huevos Revueltos",
    categoria: "Desayuno",
    descripcion: "Huevos revueltos con tomate y cebolla",
    calorias: 280,
    imagen: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&h=200&fit=crop",
  },
  {
    id: 10,
    nombre: "Arepas con Queso",
    categoria: "Desayuno",
    descripcion: "Arepas rellenas de queso derretido",
    calorias: 310,
    imagen: "https://images.unsplash.com/photo-1626613838013-14ce59de6c3c?w=200&h=200&fit=crop",
  },
  {
    id: 11,
    nombre: "Café con Leche",
    categoria: "Bebida",
    descripcion: "Café colombiano con leche espumosa",
    calorias: 80,
    imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
  },
  {
    id: 12,
    nombre: "Pan Tostado",
    categoria: "Desayuno",
    descripcion: "Pan integral tostado con mantequilla",
    calorias: 200,
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
  },
];

const menuSemanal = {
  lunes: {
    desayuno: [9, 11, 12],
    almuerzo: [1, 2, 6],
    cena: [4, 5],
  },
  martes: {
    desayuno: [10, 11],
    almuerzo: [3, 2, 6],
    cena: [7, 5],
  },
  miercoles: {
    desayuno: [9, 11, 12],
    almuerzo: [8, 2, 6],
    cena: [1, 4, 5],
  },
  jueves: {
    desayuno: [10, 11],
    almuerzo: [7, 2, 6],
    cena: [3, 4],
  },
  viernes: {
    desayuno: [9, 11, 12],
    almuerzo: [1, 2, 6],
    cena: [8, 5],
  },
  sabado: {
    desayuno: [10, 11, 12],
    almuerzo: [3, 2, 6],
    cena: [7, 4, 5],
  },
};

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

const tiposComidaIcons: Record<typeof tiposComida[number], string> = {
  desayuno: "☀️",
  almuerzo: "🍽️",
  cena: "🌙",
};

type SelectionState = {
  [key in typeof diasSemana[number]]: {
    [key in typeof tiposComida[number]]?: number;
  };
};

export function MobileWeeklyMenu() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<typeof diasSemana[number]>("lunes");
  const [selections, setSelections] = useState<SelectionState>({
    lunes: {},
    martes: {},
    miercoles: {},
    jueves: {},
    viernes: {},
    sabado: {},
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [dishInfoDialog, setDishInfoDialog] = useState<number | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("empleadoLoggedIn");
    if (!loggedIn) {
      navigate("/mobile/login");
    }
  }, [navigate]);

  const handleSelectDish = (comida: typeof tiposComida[number], dishId: number) => {
    setSelections((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [comida]: dishId,
      },
    }));
  };

  const getTotalSelections = () => {
    let total = 0;
    diasSemana.forEach((dia) => {
      tiposComida.forEach((comida) => {
        if (selections[dia][comida]) total++;
      });
    });
    return total;
  };

  const handleConfirmOrder = () => {
    const totalSelections = getTotalSelections();
    if (totalSelections === 0) {
      toast.error("Debes seleccionar al menos una comida");
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleFinalConfirm = () => {
    // Guardar pedido en localStorage
    const pedido = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      semana: "23 Mar - 28 Mar 2026",
      selecciones: selections,
      estado: "Confirmado",
    };

    const pedidosExistentes = JSON.parse(localStorage.getItem("pedidosEmpleado") || "[]");
    localStorage.setItem("pedidosEmpleado", JSON.stringify([...pedidosExistentes, pedido]));

    setConfirmDialogOpen(false);
    toast.success("✅ Pedido confirmado exitosamente!");
    navigate("/mobile/my-orders");
  };

  const getDishInfo = (dishId: number) => mockDishes.find((d) => d.id === dishId);

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* Header */}
        <div className="bg-[#E7000B] text-white p-4 shadow-lg sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mobile/home")}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="font-bold text-lg">Hacer Pedido Semanal</h1>
              <p className="text-xs text-white/80">Menú Ejecutivo Semana 1</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">23 Mar - 28 Mar 2026</span>
            </div>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              {getTotalSelections()}/18 seleccionadas
            </Badge>
          </div>
        </div>

        {/* Days Selector */}
        <div className="bg-white border-b border-gray-200 sticky top-[136px] z-10">
          <ScrollArea className="w-full">
            <div className="flex gap-2 p-3 overflow-x-auto">
              {diasSemana.map((dia) => {
                const daySelections = tiposComida.filter((comida) => selections[dia][comida]).length;
                return (
                  <button
                    key={dia}
                    onClick={() => setSelectedDay(dia)}
                    className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                      selectedDay === dia
                        ? "bg-[#E7000B] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-xs font-semibold">{diasSemanaLabels[dia]}</span>
                    <Badge
                      className={`text-[10px] h-5 ${
                        selectedDay === dia ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {daySelections}/3
                    </Badge>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-6">
          {tiposComida.map((comida) => {
            const availableDishes = menuSemanal[selectedDay][comida];
            return (
              <div key={comida}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tiposComidaIcons[comida]}</span>
                  <h3 className="font-bold text-gray-900 capitalize">{comida}</h3>
                  {selections[selectedDay][comida] && (
                    <Badge className="bg-green-100 text-green-800 ml-auto">
                      <Check className="w-3 h-3 mr-1" />
                      Seleccionado
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {availableDishes.map((dishId) => {
                    const dish = mockDishes.find((d) => d.id === dishId);
                    if (!dish) return null;

                    const isSelected = selections[selectedDay][comida] === dishId;

                    return (
                      <Card
                        key={dishId}
                        className={`border-2 transition-all ${
                          isSelected
                            ? "border-green-500 bg-green-50 shadow-md"
                            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                        }`}
                      >
                        <CardContent className="p-3">
                          <div className="flex gap-3">
                            <img
                              src={dish.imagen}
                              alt={dish.nombre}
                              className="w-20 h-20 rounded-lg object-cover shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                                  {dish.nombre}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setDishInfoDialog(dishId)}
                                  className="h-6 w-6 p-0 text-blue-600 shrink-0"
                                >
                                  <Info className="w-4 h-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                                {dish.descripcion}
                              </p>
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {dish.categoria}
                                  </Badge>
                                  <Badge className="bg-orange-100 text-orange-800 text-xs">
                                    {dish.calorias} cal
                                  </Badge>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleSelectDish(comida, dishId)}
                                  className={`h-8 text-xs ${
                                    isSelected
                                      ? "bg-[#10b981] hover:bg-[#059669]"
                                      : "bg-[#E7000B] hover:bg-[#c00009]"
                                  }`}
                                >
                                  {isSelected ? (
                                    <>
                                      <Check className="w-3 h-3 mr-1" />
                                      Seleccionado
                                    </>
                                  ) : (
                                    "Seleccionar"
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fixed Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <Button
            onClick={handleConfirmOrder}
            className="w-full h-12 bg-[#10b981] hover:bg-[#059669] text-white shadow-lg"
            disabled={getTotalSelections() === 0}
          >
            <Check className="w-5 h-5 mr-2" />
            Confirmar Pedido ({getTotalSelections()} selecciones)
          </Button>
        </div>

        {/* Confirm Dialog */}
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-green-600" />
                Confirmar Pedido Semanal
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-4">
                Has seleccionado <span className="font-bold text-green-600">{getTotalSelections()} comidas</span> para
                la semana del 23 al 28 de Marzo 2026.
              </p>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">Resumen por día:</p>
                <div className="space-y-1">
                  {diasSemana.map((dia) => {
                    const count = tiposComida.filter((comida) => selections[dia][comida]).length;
                    return (
                      <div key={dia} className="flex items-center justify-between text-xs">
                        <span className="text-blue-800">{diasSemanaLabels[dia]}:</span>
                        <Badge className="bg-blue-100 text-blue-800 text-[10px]">{count} comidas</Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleFinalConfirm}
                className="bg-[#10b981] hover:bg-[#059669]"
              >
                Confirmar Pedido
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Dish Info Dialog */}
        <Dialog open={dishInfoDialog !== null} onOpenChange={() => setDishInfoDialog(null)}>
          <DialogContent className="max-w-md">
            {dishInfoDialog && getDishInfo(dishInfoDialog) && (
              <>
                <DialogHeader>
                  <DialogTitle>Información del Platillo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <img
                    src={getDishInfo(dishInfoDialog)!.imagen}
                    alt={getDishInfo(dishInfoDialog)!.nombre}
                    className="w-full h-48 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg mb-2">{getDishInfo(dishInfoDialog)!.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-3">{getDishInfo(dishInfoDialog)!.descripcion}</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">{getDishInfo(dishInfoDialog)!.categoria}</Badge>
                      <Badge className="bg-orange-100 text-orange-800">
                        {getDishInfo(dishInfoDialog)!.calorias} calorías
                      </Badge>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setDishInfoDialog(null)}>Cerrar</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}