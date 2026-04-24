import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ChefHat, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

export function ViewWeeklyMenu() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("id");

  const [menuData, setMenuData] = useState<MenuSemanal | null>(null);

  useEffect(() => {
    // En producción, esto cargaría el menú desde el backend usando el menuId
    if (menuId) {
      const menu = mockMenus.find(m => m.id === parseInt(menuId));
      if (menu) {
        setMenuData(menu);
      }
    }
  }, [menuId]);

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`;
  };

  if (!menuData) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] p-8">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

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
                Ver Menú Semanal
              </h1>
            </div>
          </div>
        </div>

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
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Código</Label>
                  <Input
                    value={menuData.codigo}
                    className="h-9 text-sm bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Nombre del Menú</Label>
                  <Input
                    value={menuData.nombre}
                    className="h-9 text-sm bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Semana</Label>
                  <Input
                    value={formatDateRange(menuData.fechaInicio, menuData.fechaFin)}
                    className="h-9 text-sm bg-gray-50"
                    disabled
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Comedor</Label>
                  <Input
                    value={menuData.comedor}
                    className="h-9 text-sm bg-gray-50"
                    disabled
                  />
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
                            const selectedDishes = menuData.dias?.[dia]?.[comida] || [];
                            return (
                              <td key={`${dia}-${comida}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">
                                <div className="flex flex-col gap-0.5">
                                  {selectedDishes.map((dishId) => {
                                    const dish = mockDishes.find((d) => d.id === dishId);
                                    return dish ? (
                                      <div
                                        key={dishId}
                                        className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded truncate shadow-sm"
                                        title={dish.nombre}
                                      >
                                        {dish.nombre}
                                      </div>
                                    ) : null;
                                  })}
                                  {selectedDishes.length === 0 && (
                                    <span className="text-xs text-gray-400 italic">Sin platillos</span>
                                  )}
                                </div>
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
            Volver
          </Button>
          <Button
            type="button"
            className="bg-[#e7000b] hover:bg-[#c10009] text-white px-6"
            onClick={() => navigate(`/planeacion/menu/editar?id=${menuData.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
}
