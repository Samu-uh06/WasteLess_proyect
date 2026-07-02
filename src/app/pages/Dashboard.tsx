import { useState, useEffect } from "react";
import {
  Package,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import { fetchDashboardStats, type DashboardStats } from "../services/dashboardService";

const estadoConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: typeof CheckCircle }
> = {
  completado: { label: "Completado", color: "text-green-600", bg: "bg-green-100", icon: CheckCircle },
  en_proceso: { label: "En Proceso", color: "text-blue-600", bg: "bg-blue-100", icon: Clock },
  pendiente: { label: "Pendiente", color: "text-orange-600", bg: "bg-orange-100", icon: AlertCircle },
};

const formatCurrency = (value: number) =>
  value.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

function Variacion({ value }: { value: number }) {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  return (
    <span className={`text-xs font-medium flex items-center gap-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
      <Icon className="w-3 h-3" />
      {isPositive ? "+" : ""}{value}%
    </span>
  );
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch {
        toast.error("No se pudieron cargar las estadísticas del dashboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="p-8 bg-[#f3f4f6] min-h-screen flex items-center justify-center">
        <div className="flex items-center text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Cargando dashboard...
        </div>
      </div>
    );
  }

  const { pedidos, impactoEconomico, ordenesProduccionHoy, topComedores, totalFacturadoMes } = stats;

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          {capitalize(format(now, "EEEE, d MMMM yyyy - h:mm a", { locale: es }))}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Pedidos */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pedidos</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <div className="bg-[#3b82f6] p-2.5 rounded-lg shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">{pedidos.total}</div>
            <Variacion value={pedidos.variacionPorcentual} />
            <div className="space-y-1 mt-2">
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                {pedidos.completados} Completados
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {pedidos.enProceso} En Proceso
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                {pedidos.pendientes} Pendientes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Impacto Económico */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Impacto Económico</p>
                <p className="text-xs text-gray-500">Este mes</p>
              </div>
              <div className="bg-[#10b981] p-2.5 rounded-lg shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {formatCurrency(impactoEconomico.totalMesActual)}
            </div>
            <Variacion value={impactoEconomico.variacionPorcentual} />
            <div className="space-y-1 mt-2">
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {formatCurrency(impactoEconomico.totalMesAnterior)} mes anterior
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Órdenes de producción (hoy) */}
      <div className="mb-8">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Órdenes de producción (hoy)</CardTitle>
          </CardHeader>
          <CardContent>
            {ordenesProduccionHoy.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No hay órdenes de producción generadas hoy todavía.
              </p>
            ) : (
              <div className="space-y-4">
                {ordenesProduccionHoy.map((order) => {
                  const config = estadoConfig[order.estado] ?? estadoConfig.pendiente;
                  const StatusIcon = config.icon;
                  return (
                    <div
                      key={order.idOrden}
                      className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                    >
                      <div className={`${config.bg} p-2 rounded-lg shrink-0`}>
                        <StatusIcon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                          {order.nombreComedor} - {order.nombreEmpresa}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">
                          {order.codigo} · {order.diaSemana}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {order.cantPlatillos} platillo{order.cantPlatillos !== 1 ? "s" : ""} en producción
                        </p>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(order.fechaCreacion), { addSuffix: true, locale: es })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Comedores */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Top comedores</CardTitle>
          </CardHeader>
          <CardContent>
            {topComedores.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                Todavía no hay comedores con pedidos registrados.
              </p>
            ) : (
              <div className="space-y-4">
                {topComedores.map((comedor, index) => (
                  <div key={comedor.idComedor} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-[#3b82f6] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {comedor.nombreComedor} - {comedor.nombreEmpresa}
                        </p>
                        <p className="text-xs text-gray-500">{comedor.totalPedidos} pedidos</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900">{formatCurrency(comedor.facturacionTotal)}</p>
                      <Variacion value={comedor.variacionPorcentual} />
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Total facturado este mes</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(totalFacturadoMes)}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}