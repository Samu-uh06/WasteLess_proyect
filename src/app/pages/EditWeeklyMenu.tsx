import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowLeft, ChefHat, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";
import { DatePicker } from "../components/ui/date-picker";
import { ScrollArea } from "../components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import {
  loadMenuById, loadMenuPlanning, updateMenu, assignDishToMenu, removeDishFromMenu,
  loadDiningRooms, loadDishesForMenu,
  type ApiMenu, type ApiDiningRoom, type ApiDish, type ApiMenuDetail, type MealKey,
} from "../services/weeklyMenuService";

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MEAL_TYPES: { key: MealKey; label: string; icon: string }[] = [
  { key: "desayuno",   label: "Desayuno",    icon: "🟠" },
  { key: "almuerzo",   label: "Almuerzo",    icon: "🍽️" },
  { key: "mediaTarde", label: "Media tarde", icon: "🌙" },
];

const MEAL_KEY_TO_API: Record<MealKey, string> = {
  desayuno:   "Desayuno",
  almuerzo:   "Almuerzo",
  mediaTarde: "Media tarde",
};

const API_TO_MEAL_KEY: Record<string, MealKey> = {
  "Desayuno":    "desayuno",
  "Almuerzo":    "almuerzo",
  "Media tarde": "mediaTarde",
};

interface CellRef { day: string; meal: MealKey; label: string; icon: string; }

export function EditWeeklyMenu() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const menuId = Number(searchParams.get("id"));

  const [menu, setMenu] = useState<ApiMenu | null>(null);
  const [diningRooms, setDiningRooms] = useState<ApiDiningRoom[]>([]);
  const [availableDishes, setAvailableDishes] = useState<ApiDish[]>([]);
  const [planning, setPlanning] = useState<Record<string, Record<MealKey, ApiMenuDetail[]>>>({});

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>();
  const [fechaFin, setFechaFin] = useState<Date | undefined>();
  const [idComedor, setIdComedor] = useState<number | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeCell, setActiveCell] = useState<CellRef | null>(null);
  const [tempSelected, setTempSelected] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!menuId) return;
    loadMenuById(menuId).then(m => {
      setMenu(m);
      setCodigo(m.codigo);
      setNombre(m.nombre);
      setFechaInicio(new Date(m.fechaInicio));
      setFechaFin(new Date(m.fechaFin));
      setIdComedor(m.idComedor);
    }).catch(() => toast.error("Error al cargar menú"));

    loadMenuPlanning(menuId).then(data => {
      // Convertir planning de la API al formato del estado local
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

    loadDiningRooms().then(setDiningRooms).catch(() => {});
    loadDishesForMenu().then(setAvailableDishes).catch(() => {});
  }, [menuId]);

  const openCellDialog = (day: string, meal: MealKey, label: string, icon: string) => {
    setActiveCell({ day, meal, label, icon });
    const already = (planning[day]?.[meal] || []).map(d => d.idPlatillo);
    setTempSelected(new Set(already));
    setDialogOpen(true);
  };

  const confirmSelection = async () => {
    if (!activeCell || !menuId) return;
    const { day, meal } = activeCell;
    const currentIds = (planning[day]?.[meal] || []).map(d => d.idPlatillo);
    const toAdd = Array.from(tempSelected).filter(id => !currentIds.includes(id));
    const toRemove = (planning[day]?.[meal] || []).filter(d => !tempSelected.has(d.idPlatillo));

    try {
      for (const item of toRemove) {
        await removeDishFromMenu(menuId, item.idDetalle);
      }
      for (const id of toAdd) {
        await assignDishToMenu(menuId, {
          diaSemana: day,
          tipoComida: MEAL_KEY_TO_API[meal],
          idPlatillo: id,
        });
      }
      const data = await loadMenuPlanning(menuId);
      const converted: Record<string, Record<MealKey, ApiMenuDetail[]>> = {};
      DAYS.forEach(d => {
        converted[d] = { desayuno: [], almuerzo: [], mediaTarde: [] };
        Object.entries(data.planning[d] || {}).forEach(([apiMeal, items]) => {
          const key = API_TO_MEAL_KEY[apiMeal];
          if (key) converted[d][key] = items as ApiMenuDetail[];
        });
      });
      setPlanning(converted);
      toast.success("Platillos actualizados");
    } catch (err: any) {
      toast.error(err?.message || "Error al actualizar platillos");
    }
    setDialogOpen(false);
  };

  const handleRemoveDish = async (day: string, meal: MealKey, item: ApiMenuDetail) => {
    if (!menuId) return;
    try {
      await removeDishFromMenu(menuId, item.idDetalle);
      setPlanning(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [meal]: prev[day][meal].filter(d => d.idDetalle !== item.idDetalle),
        },
      }));
      toast.success(`${item.nombrePlatillo} eliminado`);
    } catch (err: any) {
      toast.error(err?.message || "Error al eliminar platillo");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !fechaInicio || !fechaFin || !idComedor || !codigo) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      await updateMenu(menuId, {
        codigo,
        nombre,
        idComedor,
        fechaInicio: fechaInicio.toISOString().split("T")[0],
        fechaFin: fechaFin.toISOString().split("T")[0],
      });
      toast.success("Menú actualizado exitosamente");
      navigate("/planeacion/menu");
    } catch (err: any) {
      toast.error(err?.message || "Error al actualizar menú");
    } finally {
      setLoading(false);
    }
  };

  if (!menu) return <div className="min-h-screen bg-[#f3f4f6] p-8 flex items-center justify-center"><p className="text-gray-500">Cargando...</p></div>;

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
          <h1 className="text-2xl font-bold text-gray-900 mt-1">Editar Menú Semanal</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Card className="border-blue-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                  Información General
                </h3>
                <div className="grid grid-cols-5 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Código *</Label>
                    <Input value={codigo} onChange={e => setCodigo(e.target.value)} className="h-9 text-sm" required />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Nombre del Menú *</Label>
                    <Input value={nombre} onChange={e => setNombre(e.target.value)} className="h-9 text-sm" required />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Inicio *</Label>
                    <DatePicker date={fechaInicio} onDateChange={setFechaInicio} placeholder="Fecha inicio" className="h-9 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Fin *</Label>
                    <DatePicker date={fechaFin} onDateChange={setFechaFin} placeholder="Fecha fin" className="h-9 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Comedor *</Label>
                    <Select value={idComedor ? String(idComedor) : ""} onValueChange={v => setIdComedor(Number(v))}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Seleccione comedor" /></SelectTrigger>
                      <SelectContent>
                        {diningRooms.map(d => (
                          <SelectItem key={d.idComedor} value={String(d.idComedor)}>{d.nombre}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                            <th key={day} className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[150px]">{day}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {MEAL_TYPES.map((meal, idx) => (
                          <tr key={meal.key} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                            <td className="border-r border-t border-orange-200 p-2 sticky left-0 bg-gradient-to-r from-orange-50 to-white z-10">
                              <div className="flex items-center gap-1.5">
                                <span className="text-sm">{meal.icon}</span>
                                <span className="text-xs font-semibold text-gray-700">{meal.label}</span>
                              </div>
                            </td>
                            {DAYS.map(day => {
                              const dishes = planning[day]?.[meal.key] || [];
                              return (
                                <td key={`${day}-${meal.key}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">
                                  <button type="button" onClick={() => openCellDialog(day, meal.key, meal.label, meal.icon)}
                                    className="w-full border border-gray-200 rounded text-xs h-7 flex items-center justify-center gap-1 hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-500 hover:text-blue-600">
                                    <Plus className="w-3 h-3" />
                                    {dishes.length > 0 && <span className="font-semibold text-blue-600">{dishes.length}</span>}
                                  </button>
                                  {dishes.length > 0 && (
                                    <div className="mt-1 space-y-0.5">
                                      {dishes.map(dish => (
                                        <div key={dish.idDetalle} className="bg-blue-500 text-white text-[10px] px-1.5 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition-colors">
                                          <span className="truncate flex-1" title={dish.nombrePlatillo}>{dish.nombrePlatillo}</span>
                                          <button type="button" onClick={() => handleRemoveDish(day, meal.key, dish)}
                                            className="shrink-0 hover:bg-red-500 rounded p-0.5 transition-colors">
                                            <X className="w-2.5 h-2.5" />
                                          </button>
                                        </div>
                                      ))}
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

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={() => navigate("/planeacion/menu")} className="px-6">Cancelar</Button>
            <Button type="submit" disabled={loading} className="bg-[#e7000b] hover:bg-[#c10009] text-white shadow-lg px-6">
              {loading ? "Guardando..." : "💾 Guardar Cambios"}
            </Button>
          </div>
        </form>
      </div>

      {/* Dialog selector de platillos */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md p-0">
          <DialogHeader className="px-5 pt-5 pb-3 border-b bg-gradient-to-r from-blue-50 to-white">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <span className="text-lg">{activeCell?.icon}</span>
              {activeCell?.day} — {activeCell?.label}
            </DialogTitle>
            <p className="text-xs text-gray-500 mt-0.5">{tempSelected.size} platillos seleccionados</p>
          </DialogHeader>
          <ScrollArea className="h-72">
            <div className="p-3 space-y-1">
              {availableDishes.map(dish => {
                const selected = tempSelected.has(dish.idPlatillo);
                return (
                  <div key={dish.idPlatillo}
                    className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-colors ${selected ? "bg-blue-50 border-blue-200" : "border-transparent hover:bg-gray-50"}`}
                    onClick={() => setTempSelected(prev => { const next = new Set(prev); next.has(dish.idPlatillo) ? next.delete(dish.idPlatillo) : next.add(dish.idPlatillo); return next; })}>
                    <Checkbox checked={selected} />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {dish.imagen && <img src={dish.imagen} alt={dish.nombre} className="w-10 h-10 rounded-lg object-cover" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{dish.nombre}</p>
                        <p className="text-xs text-gray-400">{dish.nombreCategoria}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button size="sm" onClick={confirmSelection} className="bg-[#e7000b] hover:bg-[#c40009]">Confirmar selección</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}