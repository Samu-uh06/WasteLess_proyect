import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ChefHat, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { DatePicker } from "../components/ui/date-picker";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";

// Platillos desde Gestión de Platillos
const mockDishes = [
  {
    id: 1,
    nombre: "Arroz con Pollo",
    categoria: "Plato Fuerte",
    descripcion: "Delicioso arroz con pollo desmechado y vegetales",
    precio: 15000,
    calorias: 450,
    imagen: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Ensalada César",
    categoria: "Ensalada",
    descripcion: "Ensalada fresca con pollo, crutones y aderezo césar",
    precio: 12000,
    calorias: 320,
    imagen: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Bandeja Paisa",
    categoria: "Plato Fuerte",
    descripcion: "Plato típico colombiano con frijoles, carne, chicharrón y más",
    precio: 18000,
    calorias: 850,
    imagen: "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Sopa de Lentejas",
    categoria: "Sopa",
    descripcion: "Sopa casera de lentejas con vegetales frescos",
    precio: 8000,
    calorias: 250,
    imagen: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Tiramisu",
    categoria: "Postre",
    descripcion: "Delicioso postre italiano con café y mascarpone",
    precio: 10000,
    calorias: 380,
    imagen: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 6,
    nombre: "Jugo Natural de Naranja",
    categoria: "Bebida",
    descripcion: "Jugo 100% natural de naranja recién exprimida",
    precio: 5000,
    calorias: 110,
    imagen: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 7,
    nombre: "Pescado al Horno",
    categoria: "Plato Fuerte",
    descripcion: "Filete de pescado horneado con hierbas y limón",
    precio: 20000,
    calorias: 350,
    imagen: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 8,
    nombre: "Pasta Carbonara",
    categoria: "Plato Fuerte",
    descripcion: "Pasta con salsa carbonara cremosa y tocino",
    precio: 16000,
    calorias: 520,
    imagen: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 9,
    nombre: "Huevos Revueltos",
    categoria: "Desayuno",
    descripcion: "Huevos revueltos con tomate y cebolla",
    precio: 8000,
    calorias: 280,
    imagen: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 10,
    nombre: "Arepas con Queso",
    categoria: "Desayuno",
    descripcion: "Arepas rellenas de queso derretido",
    precio: 6000,
    calorias: 310,
    imagen: "https://images.unsplash.com/photo-1626613838013-14ce59de6c3c?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 11,
    nombre: "Café con Leche",
    categoria: "Bebida",
    descripcion: "Café colombiano con leche espumosa",
    precio: 3000,
    calorias: 80,
    imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 12,
    nombre: "Pan Tostado",
    categoria: "Desayuno",
    descripcion: "Pan integral tostado con mantequilla",
    precio: 4000,
    calorias: 200,
    imagen: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
    estado: "Activo",
  },
];

interface DiaComidas {
  desayuno: number[];
  almuerzo: number[];
  cena: number[];
}

interface MenuSemanal {
  id: number;
  codigo: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  comedor: string;
  dias: {
    lunes: DiaComidas;
    martes: DiaComidas;
    miercoles: DiaComidas;
    jueves: DiaComidas;
    viernes: DiaComidas;
    sabado: DiaComidas;
  };
  estado: string;
}

const mockComedores = [
  { id: 1, nombre: "Comedor Central - Ecopetrol", empresa: "Ecopetrol S.A." },
  { id: 2, nombre: "Comedor Universidad Nacional", empresa: "Universidad Nacional" },
  { id: 3, nombre: "Comedor Hospital San Ignacio", empresa: "Hospital San Ignacio" },
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

// Mock data - en producción esto vendría del backend
const mockMenus: MenuSemanal[] = [
  {
    id: 1,
    codigo: "MEN-001",
    nombre: "Menú Ejecutivo Semana 1",
    fechaInicio: new Date(2025, 2, 3),
    fechaFin: new Date(2025, 2, 8),
    comedor: "Comedor Central - Ecopetrol",
    dias: {
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
    },
    estado: "Activo",
  },
  {
    id: 2,
    codigo: "MEN-002",
    nombre: "Menú Saludable Semana 2",
    fechaInicio: new Date(2025, 2, 10),
    fechaFin: new Date(2025, 2, 15),
    comedor: "Comedor Universidad Nacional",
    dias: {
      lunes: {
        desayuno: [10, 11],
        almuerzo: [8, 2, 6],
        cena: [4, 5],
      },
      martes: {
        desayuno: [9, 11, 12],
        almuerzo: [1, 2, 6],
        cena: [7, 5],
      },
      miercoles: {
        desayuno: [10, 11],
        almuerzo: [3, 2, 6],
        cena: [8, 4],
      },
      jueves: {
        desayuno: [9, 11, 12],
        almuerzo: [7, 2, 6],
        cena: [1, 5],
      },
      viernes: {
        desayuno: [10, 11],
        almuerzo: [8, 2, 6],
        cena: [3, 4, 5],
      },
      sabado: {
        desayuno: [9, 11, 12],
        almuerzo: [1, 2, 6],
        cena: [7, 4],
      },
    },
    estado: "Activo",
  },
];

export function EditWeeklyMenu() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("id");

  const [formData, setFormData] = useState<Partial<MenuSemanal>>({});

  useEffect(() => {
    // En producción, esto cargaría el menú desde el backend usando el menuId
    if (menuId) {
      const menu = mockMenus.find(m => m.id === parseInt(menuId));
      if (menu) {
        setFormData(menu);
      }
    }
  }, [menuId]);

  const handleToggleDish = (dia: typeof diasSemana[number], comida: typeof tiposComida[number], dishId: number) => {
    setFormData((prev) => {
      const currentDias = prev.dias || {
        lunes: { desayuno: [], almuerzo: [], cena: [] },
        martes: { desayuno: [], almuerzo: [], cena: [] },
        miercoles: { desayuno: [], almuerzo: [], cena: [] },
        jueves: { desayuno: [], almuerzo: [], cena: [] },
        viernes: { desayuno: [], almuerzo: [], cena: [] },
        sabado: { desayuno: [], almuerzo: [], cena: [] },
      };

      const currentComida = currentDias[dia][comida] || [];
      const newComida = currentComida.includes(dishId)
        ? currentComida.filter((id) => id !== dishId)
        : [...currentComida, dishId];

      return {
        ...prev,
        dias: {
          ...currentDias,
          [dia]: {
            ...currentDias[dia],
            [comida]: newComida,
          },
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!formData.nombre || !formData.fechaInicio || !formData.fechaFin || !formData.comedor) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    // En producción, aquí se enviaría la actualización al backend
    toast.success("💾 Menú actualizado exitosamente");
    navigate("/planeacion/menu");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/planeacion/menu")}
            className="gap-2 mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Menús
          </Button>

          <div className="flex items-start gap-3">
            <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Editar Menú Semanal
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Información básica */}
            <Card className="border-blue-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  Información General
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <Label htmlFor="nombre" className="text-xs font-semibold text-gray-700 mb-1 block">Nombre del Menú *</Label>
                    <Input
                      id="nombre"
                      value={formData.nombre || ""}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Ej: Menú Ejecutivo Semana 1"
                      className="h-9 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fechaInicio" className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Inicio *</Label>
                    <DatePicker
                      date={formData.fechaInicio}
                      onDateChange={(date) => setFormData({ ...formData, fechaInicio: date })}
                      placeholder="Selecciona fecha inicio"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fechaFin" className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Fin *</Label>
                    <DatePicker
                      date={formData.fechaFin}
                      onDateChange={(date) => setFormData({ ...formData, fechaFin: date })}
                      placeholder="Selecciona fecha fin"
                      className="h-9 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="comedor" className="text-xs font-semibold text-gray-700 mb-1 block">Comedor *</Label>
                    <Select
                      value={formData.comedor || ""}
                      onValueChange={(value) => setFormData({ ...formData, comedor: value })}
                    >
                      <SelectTrigger id="comedor" className="h-9 text-sm">
                        <SelectValue placeholder="Seleccione comedor" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockComedores.map((comedor) => (
                          <SelectItem key={comedor.id} value={comedor.nombre}>
                            {comedor.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabla de platillos */}
            <Card className="border-orange-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                  Planificación de Platillos (6 días × 3 comidas)
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-orange-50">
                          <th className="border-r border-orange-200 p-2 text-left text-xs font-bold text-gray-700 w-28 sticky left-0 bg-orange-50 z-10">
                            Comida
                          </th>
                          {diasSemana.map((dia) => (
                            <th
                              key={dia}
                              className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[140px]"
                            >
                              {diasSemanaLabels[dia]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tiposComida.map((comida, idx) => (
                          <tr key={comida} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                            <td className="border-r border-t border-orange-200 p-2 font-semibold text-xs text-gray-700 sticky left-0 bg-gradient-to-r from-orange-50 to-white z-10">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm">{tiposComidaIcons[comida]}</span>
                                <span className="text-xs">{tiposComidaLabels[comida]}</span>
                              </div>
                            </td>
                            {diasSemana.map((dia) => {
                              const selectedDishes = formData.dias?.[dia]?.[comida] || [];
                              return (
                                <td key={`${dia}-${comida}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full text-xs h-auto py-1.5 px-2 hover:bg-blue-50 hover:border-blue-300 transition-colors font-normal"
                                      >
                                        {selectedDishes.length > 0
                                          ? `${selectedDishes.length} ✓`
                                          : "+"}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[340px] p-0" align="start">
                                      <div className="bg-gradient-to-r from-blue-50 to-white p-3 border-b">
                                        <h4 className="font-bold text-xs flex items-center gap-1.5">
                                          <span className="text-base">{tiposComidaIcons[comida]}</span>
                                          {diasSemanaLabels[dia]} - {tiposComidaLabels[comida]}
                                        </h4>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                          {selectedDishes.length} platillo{selectedDishes.length !== 1 ? "s" : ""}
                                        </p>
                                      </div>
                                      <ScrollArea className="h-[320px]">
                                        <div className="p-2 space-y-1">
                                          {mockDishes.map((dish) => (
                                            <div
                                              key={dish.id}
                                              className={`flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border ${
                                                selectedDishes.includes(dish.id) ? "bg-blue-50 border-blue-200" : "border-transparent"
                                              }`}
                                              onClick={() => handleToggleDish(dia, comida, dish.id)}
                                            >
                                              <Checkbox
                                                id={`${dia}-${comida}-${dish.id}`}
                                                checked={selectedDishes.includes(dish.id)}
                                                onCheckedChange={() => handleToggleDish(dia, comida, dish.id)}
                                                className="mt-0.5"
                                              />
                                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                                <img
                                                  src={dish.imagen}
                                                  alt={dish.nombre}
                                                  className="w-10 h-10 rounded-lg object-cover shadow-sm"
                                                />
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-xs font-semibold text-gray-900 truncate">
                                                    {dish.nombre}
                                                  </p>
                                                  <div className="flex items-center gap-1.5 mt-0.5">
                                                    <Badge variant="outline" className="text-[10px] px-1 py-0">
                                                      {dish.categoria}
                                                    </Badge>
                                                    <span className="text-[10px] text-gray-500">
                                                      ${dish.precio.toLocaleString()}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </ScrollArea>
                                    </PopoverContent>
                                  </Popover>
                                  {selectedDishes.length > 0 && (
                                    <div className="mt-1 space-y-1">
                                      {/* Lista de platillos con botón eliminar individual */}
                                      <div className="flex flex-col gap-0.5">
                                        {selectedDishes.map((dishId) => {
                                          const dish = mockDishes.find((d) => d.id === dishId);
                                          return dish ? (
                                            <div
                                              key={dishId}
                                              className="bg-blue-500 text-white text-[10px] px-1.5 py-1 rounded flex items-center justify-between gap-1 group hover:bg-blue-600 transition-colors"
                                            >
                                              <span className="truncate flex-1" title={dish.nombre}>
                                                {dish.nombre}
                                              </span>
                                              <button
                                                type="button"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleToggleDish(dia, comida, dishId);
                                                  toast.success(`${dish.nombre} eliminado`);
                                                }}
                                                className="shrink-0 hover:bg-red-500 rounded p-0.5 transition-colors"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </button>
                                            </div>
                                          ) : null;
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/planeacion/menu")}
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#e7000b] hover:bg-[#c10009] text-white shadow-lg px-6"
            >
              💾 Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
