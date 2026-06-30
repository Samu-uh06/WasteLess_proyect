import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ChefHat, Edit } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { loadMenuById, loadMenuPlanning, type ApiMenu, type ApiMenuDetail, type MealKey } from "../services/weeklyMenuService";
import { toast } from "sonner";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MEAL_TYPES: { key: MealKey; label: string; icon: string }[] = [
  { key: "desayuno",   label: "Desayuno",    icon: "☀️" },
  { key: "almuerzo",   label: "Almuerzo",    icon: "🍽️" },
  { key: "mediaTarde", label: "Media tarde", icon: "🌙" },
];

const API_TO_MEAL_KEY: Record<string, MealKey> = {
  "Desayuno":    "desayuno",
  "Almuerzo":    "almuerzo",
  "Media tarde": "mediaTarde",
};

export function ViewWeeklyMenu() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuId = Number(searchParams.get("id"));

  const [menu, setMenu] = useState<ApiMenu | null>(null);
  const [planning, setPlanning] = useState<Record<string, Record<MealKey, ApiMenuDetail[]>>>({});

  useEffect(() => {
    if (!menuId) return;
    loadMenuById(menuId).then(setMenu).catch(() => toast.error("Error al cargar menú"));
    loadMenuPlanning(menuId).then(data => {
      const converted: Record<string, Record<MealKey, ApiMenuDetail[]>> = {};
      DAYS.forEach(day => {
        converted[day] = { desayuno: [], almuerzo: [], mediaTarde: [] };
        Object.entries(data.planning[day] || {}).forEach(([apiMeal, items]) => {
          const key = API_TO_MEAL_KEY[apiMeal];
          if (key) converted[day][key] = items as ApiMenuDetail[];
        });
      });
      setPlanning(converted);
    }).catch(() => toast.error("Error al cargar planificación"));
  }, [menuId]);

  const formatDateRange = (start: string, end: string) => {
    try {
      return `${format(new Date(start), "d MMM", { locale: es })} - ${format(new Date(end), "d MMM yyyy", { locale: es })}`;
    } catch { return `${start} - ${end}`; }
  };

  if (!menu) return (
    <div className="min-h-screen bg-[#f3f4f6] p-8 flex items-center justify-center">
      <p className="text-gray-500">Cargando...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-[1600px] mx-auto">
        <Button variant="ghost" size="sm" onClick={() => navigate("/planeacion/menu")} className="gap-2 mb-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" /> Volver a Menús
        </Button>

        <div className="flex items-start gap-3 mb-6">
          <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Ver Menú Semanal</h1>
        </div>

        <div className="space-y-5">
          <Card className="border-blue-200 shadow-sm">
            <CardContent className="p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                Información General
              </h3>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Código</Label>
                  <Input value={menu.codigo} className="h-9 text-sm bg-gray-50" disabled />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Nombre del Menú</Label>
                  <Input value={menu.nombre} className="h-9 text-sm bg-gray-50" disabled />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Semana</Label>
                  <Input value={formatDateRange(menu.fechaInicio, menu.fechaFin)} className="h-9 text-sm bg-gray-50" disabled />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-700 mb-1 block">Comedor</Label>
                  <Input value={menu.nombreComedor} className="h-9 text-sm bg-gray-50" disabled />
                </div>
              </div>
            </CardContent>
          </Card>

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
                        <th className="border-r border-orange-200 p-2 text-left text-xs font-bold text-gray-700 w-28 sticky left-0 bg-orange-50 z-10">Comida</th>
                        {DAYS.map(day => (
                          <th key={day} className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[140px]">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MEAL_TYPES.map((meal, idx) => (
                        <tr key={meal.key} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                          <td className="border-r border-t border-orange-200 p-2 font-semibold text-xs text-gray-700 sticky left-0 bg-gradient-to-r from-orange-50 to-white z-10">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm">{meal.icon}</span>
                              <span className="text-xs">{meal.label}</span>
                            </div>
                          </td>
                          {DAYS.map(day => {
                            const dishes = planning[day]?.[meal.key] || [];
                            return (
                              <td key={`${day}-${meal.key}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">
                                <div className="flex flex-col gap-0.5">
                                  {dishes.map(dish => (
                                    <div key={dish.idDetalle} className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded truncate shadow-sm flex items-center gap-1">
                                      {dish.imagen && <img src={dish.imagen} alt="" className="w-4 h-4 rounded object-cover" />}
                                      <span className="truncate">{dish.nombrePlatillo}</span>
                                    </div>
                                  ))}
                                  {dishes.length === 0 && <span className="text-xs text-gray-400 italic">Sin platillos</span>}
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

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => navigate("/planeacion/menu")} className="px-6">Volver</Button>
          <Button type="button" className="bg-[#e7000b] hover:bg-[#c10009] text-white px-6" onClick={() => navigate(`/planeacion/menu/editar?id=${menu.idMenu}`)}>
            <Edit className="w-4 h-4 mr-2" />Editar
          </Button>
        </div>
      </div>
    </div>
  );
}