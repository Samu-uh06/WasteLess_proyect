import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ArrowLeft, Calendar, Loader2, CheckCircle2, Factory } from "lucide-react";
import { toast } from "sonner";
import {
  loadWeekDetail,
  updateMealStatus,
  type ApiWeekDetail,
  type ApiMealDetail,
  type EstadoProduccion,
} from "../services/ordersService";
import { createProductionOrder } from "../services/productionOrdersService";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"] as const;
const tiposComida = ["Desayuno", "Almuerzo", "Media tarde"] as const;

const tiposComidaIcons: Record<(typeof tiposComida)[number], string> = {
  Desayuno: "☀️", Almuerzo: "🍽️", "Media tarde": "🥪",
};

const estadoLabels: Record<EstadoProduccion, string> = {
  pendiente: "Pendiente", en_proceso: "En Proceso", completado: "Completado",
};

const estadoDot: Record<EstadoProduccion, string> = {
  pendiente: "bg-yellow-500", en_proceso: "bg-blue-500", completado: "bg-green-500",
};

interface WeekContext {
  weekId: number;
  comedorNombre?: string;
  empresaNombre?: string;
}

function resolveWeekContext(locationState: unknown): WeekContext | null {
  const state = locationState as WeekContext | null;
  if (state?.weekId) return state;
  try {
    const stored = localStorage.getItem("orderWeekDetail");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.weekId) return parsed;
    }
  } catch { /* ignorar */ }
  return null;
}

export function OrderDetails() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [context] = useState(() => resolveWeekContext(location.state));
  const [detail, setDetail]         = useState<ApiWeekDetail | null>(null);
  const [loading, setLoading]       = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [passingToProduction, setPassingToProduction] = useState(false);
  const [daysSentToProduction, setDaysSentToProduction] = useState<Set<string>>(new Set());

  const fetchDetail = useCallback(async () => {
    if (!context) return;
    setLoading(true);
    try {
      const data = await loadWeekDetail(context.weekId);
      setDetail(data);
    } catch {
      toast.error("No se pudo cargar el detalle del pedido");
    } finally {
      setLoading(false);
    }
  }, [context]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  // Días que tienen TODAS sus comidas en "completado"
  const completeDays = detail
    ? diasSemana.filter((dia) => {
        const diaPlanning = detail.planning[dia];
        if (!diaPlanning) return false;
        return tiposComida.every((tipo) => {
          const items = diaPlanning[tipo] ?? [];
          return items.length > 0 && items.every((m) => m.estadoProduccion === "completado");
        });
      })
    : [];

  // Días completos que aún no se han pasado a producción en esta sesión
  const eligibleDays = completeDays.filter((d) => !daysSentToProduction.has(d));

  const handleEstadoChange = async (item: ApiMealDetail, nuevoEstado: EstadoProduccion) => {
    if (!detail || item.estadoProduccion === nuevoEstado) return;
    const prev = item.estadoProduccion;

    const applyLocal = (estado: EstadoProduccion) => {
      setDetail((d) => {
        if (!d) return d;
        const dia = d.planning[item.diaSemana];
        return {
          ...d,
          planning: {
            ...d.planning,
            [item.diaSemana]: {
              ...dia,
              [item.tipoComida]: (dia?.[item.tipoComida] ?? []).map((m) =>
                m.idDetalle === item.idDetalle ? { ...m, estadoProduccion: estado } : m
              ),
            },
          },
        };
      });
    };

    applyLocal(nuevoEstado);
    setUpdatingId(item.idDetalle);
    try {
      await updateMealStatus(item.idDetalle, nuevoEstado);
    } catch {
      toast.error(`No se pudo actualizar "${item.nombrePlatillo}"`);
      applyLocal(prev);
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePasarAProduccion = async () => {
    if (!detail || eligibleDays.length === 0) return;
    setPassingToProduction(true);
    let created = 0;
    const alreadyExists: string[] = [];

    for (const dia of eligibleDays) {
      try {
        await createProductionOrder(detail.order.idPedido, dia);
        setDaysSentToProduction((prev) => new Set([...prev, dia]));
        created++;
      } catch (err: any) {
        if (err?.message?.includes("Ya existe")) {
          alreadyExists.push(dia);
          setDaysSentToProduction((prev) => new Set([...prev, dia]));
        } else {
          toast.error(`Error al crear orden para ${dia}`);
        }
      }
    }

    setPassingToProduction(false);

    if (created > 0) {
      toast.success(`${created} orden${created > 1 ? "es" : ""} de producción creada${created > 1 ? "s" : ""} correctamente`);
    }
    if (alreadyExists.length > 0) {
      toast.info(`${alreadyExists.join(", ")}: ya tenía${alreadyExists.length > 1 ? "n" : ""} orden de producción`);
    }
  };

  const formatDateRange = (start: string, end: string) =>
    `${format(new Date(start), "d MMM", { locale: es })} - ${format(new Date(end), "d MMM yyyy", { locale: es })}`;

  if (!context) {
    return (
      <div className="p-8 bg-[#f3f4f6] min-h-screen">
        <div className="text-center pt-20">
          <p className="text-gray-600 mb-4">No hay datos disponibles para mostrar</p>
          <Button onClick={() => navigate("/produccion/pedidos")}>Volver a Pedidos</Button>
        </div>
      </div>
    );
  }

  if (loading || !detail) {
    return (
      <div className="p-8 bg-[#f3f4f6] min-h-screen flex items-center justify-center">
        <div className="flex items-center text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Cargando pedido...
        </div>
      </div>
    );
  }

  const { order, planning } = detail;

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <Button variant="ghost" className="mb-4 hover:bg-gray-100" onClick={() => navigate("/produccion/pedidos")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Pedidos
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {order.nombreComedor} - {order.semana}
            </h1>
            <p className="text-sm text-gray-600">
              {order.nombreEmpresa} · {order.nombreMenu} · {formatDateRange(order.fechaInicio, order.fechaFin)}
            </p>
          </div>
        </div>
      </div>

      {/* Banner días listos para producción */}
      {eligibleDays.length > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-800">
          <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
          <span>
            {eligibleDays.length === 1
              ? `El día ${eligibleDays[0]} tiene todas sus comidas completadas y puede pasarse a producción.`
              : `Los días ${eligibleDays.join(", ")} tienen todas sus comidas completadas y pueden pasarse a producción.`}
          </span>
        </div>
      )}

      <Card className="border-orange-200 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
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
                    {diasSemana.map((dia) => {
                      const isDayComplete = completeDays.includes(dia);
                      const alreadySent   = daysSentToProduction.has(dia);
                      return (
                        <th key={dia} className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[160px]">
                          <div className="flex flex-col items-center gap-1">
                            {dia}
                            {isDayComplete && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-normal ${alreadySent ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                                {alreadySent ? "En producción" : "✓ Listo"}
                              </span>
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {tiposComida.map((comida, idx) => (
                    <tr key={comida} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                      <td className="border-r border-t border-orange-200 p-2 font-semibold text-xs text-gray-700 sticky left-0 bg-gradient-to-r from-orange-50 to-white z-10">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{tiposComidaIcons[comida]}</span>
                          <span className="text-xs">{comida}</span>
                        </div>
                      </td>
                      {diasSemana.map((dia) => {
                        const items = planning[dia]?.[comida] ?? [];
                        return (
                          <td key={`${dia}-${comida}`} className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top">
                            {items.length === 0 ? (
                              <p className="text-[10px] text-gray-400 text-center py-2">Sin platillo</p>
                            ) : (
                              <div className="flex flex-col gap-1.5">
                                {items.map((item) => (
                                  <div key={item.idDetalle} className="bg-gray-50 border border-gray-200 rounded p-1.5">
                                    <p className="text-[11px] font-semibold text-gray-800 truncate mb-1" title={item.nombrePlatillo}>
                                      {item.nombrePlatillo}
                                    </p>
                                    <Select
                                      value={item.estadoProduccion}
                                      disabled={updatingId === item.idDetalle}
                                      onValueChange={(value: EstadoProduccion) => handleEstadoChange(item, value)}
                                    >
                                      <SelectTrigger className="h-6 text-[10px] border-gray-300">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {(Object.keys(estadoLabels) as EstadoProduccion[]).map((key) => (
                                          <SelectItem key={key} value={key}>
                                            <div className="flex items-center gap-2">
                                              <div className={`w-2 h-2 rounded-full ${estadoDot[key]}`}></div>
                                              {estadoLabels[key]}
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
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

      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          className="text-sm h-9"
          onClick={() => navigate("/produccion/pedidos")}
        >
          Volver a Pedidos
        </Button>
        <Button
          disabled={eligibleDays.length === 0 || passingToProduction}
          className="bg-gradient-to-r from-[#10b981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white text-sm h-9 disabled:opacity-50"
          onClick={handlePasarAProduccion}
        >
          {passingToProduction ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Procesando...</>
          ) : (
            <><Factory className="w-4 h-4 mr-2" />Pasar a Producción {eligibleDays.length > 0 ? `(${eligibleDays.length})` : ""}</>
          )}
        </Button>
      </div>
    </div>
  );
}