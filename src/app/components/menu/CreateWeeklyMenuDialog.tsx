import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";
import { Plus, X, Calendar } from "lucide-react";
import { DatePicker } from "../ui/date-picker";

interface CreateWeeklyMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: MenuFormData) => void;
}

export interface MenuFormData {
  fechaInicio: Date | undefined;
  fechaFin: Date | undefined;
  comedor: string;
  platillos: {
    [dia: string]: {
      desayuno: string[];
      almuerzo: string[];
      mediaTarde: string[];
    };
  };
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const mealTypes = [
  { key: "desayuno", label: "Desayuno", icon: "☀️" },
  { key: "almuerzo", label: "Almuerzo", icon: "🍽️" },
  { key: "mediaTarde", label: "Media tarde", icon: "🌙" },
];

const mockDishes = [
  "Arroz con Pollo",
  "Ensalada César",
  "Bandeja Paisa",
  "Sopa de Lentejas",
  "Tiramisu",
  "Jugo Natural de Naranja",
  "Pasta Carbonara",
  "Pescado al Horno",
];

const mockComedores = [
  "Comedor Central - Ecopetrol",
  "Comedor Universidad Nacional",
  "Comedor Norte",
  "Comedor Hospital San Ignacio",
];

export function CreateWeeklyMenuDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateWeeklyMenuDialogProps) {
  const [formData, setFormData] = useState<MenuFormData>({
    fechaInicio: undefined,
    fechaFin: undefined,
    comedor: "",
    platillos: daysOfWeek.reduce((acc, day) => {
      acc[day] = { desayuno: [], almuerzo: [], mediaTarde: [] };
      return acc;
    }, {} as MenuFormData["platillos"]),
  });

  const [selectedCell, setSelectedCell] = useState<{
    dia: string;
    meal: string;
  } | null>(null);

  const handleAddDish = (dia: string, mealKey: string, dish: string) => {
    setFormData({
      ...formData,
      platillos: {
        ...formData.platillos,
        [dia]: {
          ...formData.platillos[dia],
          [mealKey]: [...formData.platillos[dia][mealKey as keyof typeof formData.platillos[typeof dia]], dish],
        },
      },
    });
    setSelectedCell(null);
  };

  const handleRemoveDish = (dia: string, mealKey: string, index: number) => {
    const updated = [...formData.platillos[dia][mealKey as keyof typeof formData.platillos[typeof dia]]];
    updated.splice(index, 1);
    setFormData({
      ...formData,
      platillos: {
        ...formData.platillos,
        [dia]: {
          ...formData.platillos[dia],
          [mealKey]: updated,
        },
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fechaInicio || !formData.fechaFin || !formData.comedor) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    onSubmit(formData);
    // Reset form
    setFormData({
      fechaInicio: undefined,
      fechaFin: undefined,
      comedor: "",
      platillos: daysOfWeek.reduce((acc, day) => {
        acc[day] = { desayuno: [], almuerzo: [], mediaTarde: [] };
        return acc;
      }, {} as MenuFormData["platillos"]),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 px-6 py-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <DialogTitle className="text-xl font-bold text-gray-900">
              Crear Nuevo Menú Semanal
            </DialogTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-6">
            {/* Información General */}
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Información General
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-gray-700">Fecha Inicio *</Label>
                  <DatePicker
                    date={formData.fechaInicio}
                    onDateChange={(date) =>
                      setFormData({ ...formData, fechaInicio: date })
                    }
                    placeholder="Selecciona fecha inicio"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700">Fecha Fin *</Label>
                  <DatePicker
                    date={formData.fechaFin}
                    onDateChange={(date) =>
                      setFormData({ ...formData, fechaFin: date })
                    }
                    placeholder="Selecciona fecha fin"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-700">Comedor *</Label>
                  <Select
                    value={formData.comedor}
                    onValueChange={(value) =>
                      setFormData({ ...formData, comedor: value })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Seleccione comedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockComedores.map((comedor) => (
                        <SelectItem key={comedor} value={comedor}>
                          {comedor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Planificación de menú */}
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Planificación de menú (6 días × 3 comidas)
              </h3>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-32">
                        Comida
                      </th>
                      {daysOfWeek.map((day) => (
                        <th
                          key={day}
                          className="px-4 py-3 text-center text-sm font-semibold text-gray-700"
                        >
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mealTypes.map((meal, mealIndex) => (
                      <tr
                        key={meal.key}
                        className={mealIndex !== mealTypes.length - 1 ? "border-b border-gray-200" : ""}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">
                          <div className="flex items-center gap-2">
                            <span>{meal.icon}</span>
                            <span>{meal.label}</span>
                          </div>
                        </td>
                        {daysOfWeek.map((day) => (
                          <td
                            key={`${day}-${meal.key}`}
                            className="px-2 py-2 text-center border-l border-gray-200"
                          >
                            <div className="min-h-[60px] flex flex-col items-center justify-center gap-1">
                              {formData.platillos[day][meal.key as keyof typeof formData.platillos[typeof day]].length > 0 ? (
                                <div className="w-full space-y-1">
                                  {formData.platillos[day][meal.key as keyof typeof formData.platillos[typeof day]].map((dish: string, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded group hover:bg-blue-100"
                                    >
                                      <span className="truncate flex-1 text-left">
                                        {dish}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleRemoveDish(day, meal.key, index)
                                        }
                                        className="opacity-0 group-hover:opacity-100 ml-1 text-red-500 hover:text-red-700"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="w-full h-6 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                    onClick={() =>
                                      setSelectedCell({ dia: day, meal: meal.key })
                                    }
                                  >
                                    + Agregar
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="w-full h-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                  onClick={() =>
                                    setSelectedCell({ dia: day, meal: meal.key })
                                  }
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Selector de platillos */}
              {selectedCell && (
                <div className="mt-4 p-4 bg-white border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-gray-900">
                      Seleccionar platillo para {selectedCell.dia} -{" "}
                      {mealTypes.find((m) => m.key === selectedCell.meal)?.label}
                    </h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCell(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {mockDishes.map((dish) => (
                      <Button
                        key={dish}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="justify-start text-left"
                        onClick={() =>
                          handleAddDish(selectedCell.dia, selectedCell.meal, dish)
                        }
                      >
                        {dish}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="border-t border-gray-200 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#e7000b] hover:bg-[#c40009]"
            >
              Crear
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
