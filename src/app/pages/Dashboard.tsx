import {
  Package,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const statsCards = [
  {
    title: "Pedidos",
    subtitle: "Activos",
    value: "87",
    change: "+12%",
    details: "45 Completados",
    details2: "32 Pendientes",
    icon: Package,
    iconBg: "bg-[#3b82f6]",
  },
  {
    title: "Impacto Económico",
    subtitle: "Este mes",
    value: "$45,280",
    change: "+23%",
    details: "$38,450 mes anterior",
    icon: DollarSign,
    iconBg: "bg-[#10b981]",
  },
];

const economicData = [
  { month: "Ene", Empresas: 80, Pedidos: 60 },
  { month: "Feb", Empresas: 90, Pedidos: 70 },
  { month: "Mar", Empresas: 95, Pedidos: 80 },
  { month: "Abr", Empresas: 105, Pedidos: 90 },
  { month: "May", Empresas: 120, Pedidos: 100 },
  { month: "Jun", Empresas: 130, Pedidos: 110 },
];

const productionOrders = [
  {
    id: "PED-1234",
    name: "Restaurante El Buen Sabor",
    detail: "Pedido de 45 kg de productos rescatados",
    status: "Completado",
    statusColor: "text-green-600",
    statusBg: "bg-green-100",
    icon: CheckCircle,
    time: "Hace 2 horas",
    amount: "$1,250",
  },
  {
    id: "PED-1238",
    name: "Supermercado La Esquina",
    detail: "Retiro de 120 kg de productos próximos a vencer",
    status: "En progreso",
    statusColor: "text-blue-600",
    statusBg: "bg-blue-100",
    icon: Clock,
    time: "Hace 4 horas",
    amount: "$3,450",
  },
  {
    id: "PED-1236",
    name: "Hotel Plaza Central",
    detail: "Pedido de menú semanal",
    status: "Pendiente",
    statusColor: "text-orange-600",
    statusBg: "bg-orange-100",
    icon: AlertCircle,
    time: "Hace 5 horas",
    amount: "$2,800",
  },
  {
    id: "PED-1237",
    name: "Panadería Don José",
    detail: "Recadero de pan del día anterior",
    status: "Cancelado",
    statusColor: "text-red-600",
    statusBg: "bg-red-100",
    icon: XCircle,
    time: "Hace 1 día",
    amount: "$850",
  },
];

const topDiners = [
  {
    id: "01",
    name: "Supermercado La Esquina",
    pedidos: "23 pedidos",
    amount: "$12,450",
    change: "+15%",
    iconBg: "bg-[#3b82f6]",
  },
  {
    id: "02",
    name: "Hotel Plaza Central",
    pedidos: "12 pedidos",
    amount: "$8,900",
    change: "+8%",
    iconBg: "bg-[#10b981]",
  },
  {
    id: "03",
    name: "Restaurante El Buen Sabo",
    pedidos: "18 pedidos",
    amount: "$6,780",
    change: "+22%",
    iconBg: "bg-[#a855f7]",
  },
  {
    id: "04",
    name: "Cadena de Cafeterías",
    pedidos: "15 pedidos",
    amount: "$5,320",
    change: "+12%",
    iconBg: "bg-[#f59e0b]",
  },
  {
    id: "05",
    name: "Panadería Don José",
    pedidos: "8 pedidos",
    amount: "$3,450",
    change: "+5%",
    iconBg: "bg-[#ec4899]",
  },
];

export function Dashboard() {
  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">
          Bienvenido, José Restrepo - Miércoles, 12 Noviembre 2025 - 8:00 am
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      {stat.title}
                    </p>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                  <div
                    className={`${stat.iconBg} p-2.5 rounded-lg shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-green-600 font-medium">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1 mt-2">
                  {stat.details && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {stat.details}
                    </p>
                  )}
                  {stat.details2 && (
                    <p className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      {stat.details2}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Production Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Ordenes de producción (hoy)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productionOrders.map((order) => {
                const StatusIcon = order.icon;
                return (
                  <div
                    key={order.id}
                    className="flex items-start gap-4 pb-4 border-b last:border-b-0"
                  >
                    <div
                      className={`${order.statusBg} p-2 rounded-lg shrink-0`}
                    >
                      <StatusIcon className={`w-4 h-4 ${order.statusColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                        {order.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-1">{order.id}</p>
                      <p className="text-xs text-gray-500 mb-2">
                        {order.detail}
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs font-medium ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {order.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-gray-900">{order.amount}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Economic Impact Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Impacto Económico 2025
            </CardTitle>
            <p className="text-sm text-gray-500">
              Distribución mensual (miles $)
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={economicData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid key="economic-grid" strokeDasharray="3 3" />
                <XAxis key="economic-xaxis" dataKey="month" />
                <YAxis key="economic-yaxis" />
                <Tooltip key="economic-tooltip" />
                <Legend key="economic-legend" />
                <Area
                  key="area-empresas"
                  type="monotone"
                  dataKey="Empresas"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                />
                <Area
                  key="area-pedidos"
                  type="monotone"
                  dataKey="Pedidos"
                  stackId="1"
                  stroke="#10b981"
                  fill="#10b981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Diners */}
      <div className="grid grid-cols-1 gap-6">
        {/* Top Diners */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Top comedores</CardTitle>
            <button className="text-xs text-blue-600 hover:underline">
              Ver todos
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiners.map((diner) => (
                <div
                  key={diner.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-10 h-10 ${diner.iconBg} rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0`}
                    >
                      {diner.id}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">
                        {diner.name}
                      </p>
                      <p className="text-xs text-gray-500">{diner.pedidos}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900">{diner.amount}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3" />
                      {diner.change}
                    </p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">
                    Total facturado este mes
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    $89,450
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}