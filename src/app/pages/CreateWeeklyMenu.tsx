// ============================================================
// src/app/pages/CreateWeeklyMenu.tsx   (REEMPLAZA el existente)
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { ArrowLeft, Calendar, Trash2, Plus, X } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { DatePicker } from "../components/ui/date-picker";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "../components/ui/dialog";
import { Checkbox } from "../components/ui/checkbox";
import { ScrollArea } from "../components/ui/scroll-area";
import { loadActiveDishes, type Dish } from "../services/dishesService";
import { addMenu, emptyWeekPlan, type MealKey } from "../services/weeklyMenuService";

// ── Constantes ────────────────────────────────────────────────
const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const MEAL_TYPES: { key: MealKey; label: string; icon: string }[] = [
  { key: "desayuno",   label: "Desayuno",    icon: "🟠" },
  { key: "almuerzo",   label: "Almuerzo",    icon: "🍽️" },
  { key: "mediaTarde", label: "Media tarde", icon: "🍌" },
];

const COMEDORES = [
  "Comedor Central - Ecopetrol",
  "Comedor Universidad Nacional",
  "Comedor Norte",
  "Comedor Hospital San Ignacio",
];

// ── Tipos ─────────────────────────────────────────────────────
interface DishEntry { id: number; nombre: string; cantidad: number; }

type WeekPlanState = Record<string, Record<MealKey, DishEntry[]>>;

interface CellRef { day: string; meal: MealKey; label: string; icon: string; }

// ── Componente ────────────────────────────────────────────────
export function CreateWeeklyMenu() {
  const navigate = useNavigate();

  // Platillos disponibles — se cargan con useState para que React los controle
  const [availableDishes] = useState<Dish[]>(() => loadActiveDishes());

  // Formulario básico
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState<Date | undefined>();
  const [fechaFin, setFechaFin]       = useState<Date | undefined>();
  const [comedor, setComedor]         = useState("");

  // Planificación: { "Lunes": { desayuno: [], almuerzo: [], mediaTarde: [] }, ... }
  const [weekPlan, setWeekPlan] = useState<WeekPlanState>(
    () => emptyWeekPlan(DAYS) as WeekPlanState
  );

  // Control del Dialog de selección
  const [dialogOpen, setDialogOpen]   = useState(false);
  const [activeCell, setActiveCell]   = useState<CellRef | null>(null);
  // IDs seleccionados temporalmente dentro del Dialog (antes de confirmar)
  const [tempSelected, setTempSelected] = useState<Set<number>>(new Set());

  // ── Abrir dialog para una celda ────────────────────────────
  const openCellDialog = (day: string, meal: MealKey, label: string, icon: string) => {
    setActiveCell({ day, meal, label, icon });
    // Pre-marcar los que ya están en la celda
    const already = weekPlan[day][meal].map((d) => d.id);
    setTempSelected(new Set(already));
    setDialogOpen(true);
  };

  // ── Toggle dentro del Dialog ───────────────────────────────
  const toggleTemp = (id: number) => {
    setTempSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Confirmar selección ────────────────────────────────────
  const confirmSelection = () => {
    if (!activeCell) return;
    const { day, meal } = activeCell;

    const newEntries: DishEntry[] = Array.from(tempSelected).map((id) => {
      const existing = weekPlan[day][meal].find((d) => d.id === id);
      if (existing) return existing; // conservar cantidad previa
      const dish = availableDishes.find((d) => d.id === id)!;
      return { id, nombre: dish.nombre, cantidad: 1 };
    });

    setWeekPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [meal]: newEntries },
    }));
    setDialogOpen(false);
  };

  // ── Quitar un platillo directo desde la celda ──────────────
  const removeDish = (day: string, meal: MealKey, id: number, nombre: string) => {
    setWeekPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: prev[day][meal].filter((d) => d.id !== id),
      },
    }));
    toast.success(`${nombre} eliminado`);
  };

  // ── Cambiar cantidad ───────────────────────────────────────
  const updateQty = (day: string, meal: MealKey, id: number, qty: number) => {
    if (qty < 1) return;
    setWeekPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: prev[day][meal].map((d) => d.id === id ? { ...d, cantidad: qty } : d),
      },
    }));
  };

  // ── Guardar ────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!nombre.trim())              { toast.error("Ingresa el nombre del menú");              return; }
    if (!fechaInicio || !fechaFin)   { toast.error("Selecciona las fechas de inicio y fin");   return; }
    if (!comedor)                    { toast.error("Selecciona un comedor");                    return; }

    const hayPlatillos = Object.values(weekPlan).some(
      (d) => d.desayuno.length || d.almuerzo.length || d.mediaTarde.length
    );
    if (!hayPlatillos) { toast.error("Agrega al menos un platillo al menú"); return; }

    addMenu({
      nombre,
      fechaInicio: fechaInicio.toISOString(),
      fechaFin:    fechaFin.toISOString(),
      comedor,
      platillos:   weekPlan,
    });

    toast.success("Menú semanal creado exitosamente");
    navigate("/planeacion/menu");
  };

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f3f4f6] p-8">
      <div className="max-w-[1600px] mx-auto">

        {/* Header */}
        <Button variant="ghost" size="sm" onClick={() => navigate("/planeacion/menu")}
          className="gap-2 mb-4 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4" /> Volver a Menús
        </Button>

        <div className="flex items-start gap-3 mb-6">
          <div className="bg-blue-100 rounded-lg p-3">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Crear Nuevo Menú Semanal</h1>

            {/* Información General */}
            <Card className="border-blue-200 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-blue-600 rounded-full" />
                  Información General
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Nombre del Menú *</Label>
                    <Input value={nombre} onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Comedor Central - Semana 1" className="h-9 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Inicio *</Label>
                    <DatePicker date={fechaInicio} onDateChange={setFechaInicio}
                      placeholder="Selecciona fecha inicio" className="h-9 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Fecha Fin *</Label>
                    <DatePicker date={fechaFin} onDateChange={setFechaFin}
                      placeholder="Selecciona fecha fin" className="h-9 text-sm" />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-700 mb-1 block">Comedor *</Label>
                    <Select value={comedor} onValueChange={setComedor}>
                      <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Seleccione comedor" /></SelectTrigger>
                      <SelectContent>
                        {COMEDORES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabla de Planificación */}
        <Card className="border-orange-200 shadow-sm">
          <CardContent className="p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
              <div className="w-1 h-4 bg-orange-600 rounded-full" />
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
                      {DAYS.map((day) => (
                        <th key={day} className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[150px]">
                          {day}
                        </th>
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

                        {DAYS.map((day) => {
                          const dishes = weekPlan[day][meal.key];
                          return (
                            <td key={`${day}-${meal.key}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">

                              {/* Botón + */}
                              <button
                                type="button"
                                onClick={() => openCellDialog(day, meal.key, meal.label, meal.icon)}
                                className="w-full border border-gray-200 rounded text-xs h-7 flex items-center justify-center gap-1 hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-500 hover:text-blue-600"
                              >
                                <Plus className="w-3 h-3" />
                                {dishes.length > 0 && (
                                  <span className="font-semibold text-blue-600">{dishes.length}</span>
                                )}
                              </button>

                              {/* Chips de platillos ya asignados */}
                              {dishes.length > 0 && (
                                <div className="mt-1 space-y-0.5">
                                  {dishes.map((dish) => (
                                    <div key={dish.id}
                                      className="bg-blue-500 text-white text-[10px] px-1.5 py-1 rounded flex items-center gap-1 group hover:bg-blue-600 transition-colors"
                                    >
                                      <span className="truncate flex-1" title={dish.nombre}>{dish.nombre}</span>
                                      <input
                                        type="number" min="1" value={dish.cantidad}
                                        onChange={(e) => updateQty(day, meal.key, dish.id, parseInt(e.target.value) || 1)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-8 bg-blue-600 text-white text-center rounded px-0.5 text-[10px] font-semibold focus:outline-none"
                                      />
                                      <button type="button"
                                        onClick={() => removeDish(day, meal.key, dish.id, dish.nombre)}
                                        className="shrink-0 hover:bg-red-500 rounded p-0.5 transition-colors"
                                      >
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

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate("/planeacion/menu")} className="px-6">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-[#e7000b] hover:bg-[#c40009] px-6">
            Crear Menú Semanal
          </Button>
        </div>
      </div>

      {/* Dialog de selección de platillos */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md p-0">
          <DialogHeader className="px-5 pt-5 pb-3 border-b bg-gradient-to-r from-blue-50 to-white">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <span className="text-lg">{activeCell?.icon}</span>
              {activeCell?.day} — {activeCell?.label}
            </DialogTitle>
            <p className="text-xs text-gray-500 mt-0.5">
              {tempSelected.size} platillo{tempSelected.size !== 1 ? "s" : ""} seleccionado{tempSelected.size !== 1 ? "s" : ""}
            </p>
          </DialogHeader>

          <ScrollArea className="h-72">
            <div className="p-3 space-y-1">
              {availableDishes.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">
                  <p>No hay platillos activos disponibles.</p>
                  <p className="text-xs mt-1">Crea platillos en Gestión de Platillos.</p>
                </div>
              ) : (
                availableDishes.map((dish) => {
                  const selected = tempSelected.has(dish.id);
                  return (
                    <div key={dish.id}
                      className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer border transition-colors ${
                        selected ? "bg-blue-50 border-blue-200" : "border-transparent hover:bg-gray-50"
                      }`}
                      onClick={() => toggleTemp(dish.id)}
                    >
                      <Checkbox checked={selected} onCheckedChange={() => toggleTemp(dish.id)} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{dish.nombre}</p>
                        <p className="text-xs text-gray-400">{dish.categoria}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>

          <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button size="sm" onClick={confirmSelection}
              className="bg-[#e7000b] hover:bg-[#c40009]">
              Confirmar selección
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}