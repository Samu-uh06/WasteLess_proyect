import { useNavigate } from "react-router";
import { Calendar, ChefHat, ClipboardList, User, LogOut, UtensilsCrossed } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Toaster } from "sonner";
import { useAuth } from "../../context/AuthContext";

interface MenuSemanal {
  id: number;
  codigo: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  comedor: string;
  totalPlatillos: number;
  estado: string;
}

const mockMenus: MenuSemanal[] = [
  {
    id: 1,
    codigo: "MEN-001",
    nombre: "Menú Ejecutivo Semana 1",
    fechaInicio: new Date(2026, 2, 23),
    fechaFin: new Date(2026, 2, 28),
    comedor: "Comedor Central - Ecopetrol",
    totalPlatillos: 18,
    estado: "Activo",
  },
  {
    id: 2,
    codigo: "MEN-002",
    nombre: "Menú Saludable Semana 2",
    fechaInicio: new Date(2026, 2, 30),
    fechaFin: new Date(2026, 3, 4),
    comedor: "Comedor Central - Ecopetrol",
    totalPlatillos: 17,
    estado: "Activo",
  },
];

export function MobileHome() {
  const navigate  = useNavigate();
  const { user, logout } = useAuth();   // ← usa el AuthContext en lugar de localStorage

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`;
  };

  // user siempre existe aquí porque ProtectedRoute ya lo garantiza
  const nombreCorto = user?.nombre?.split(" ")[0] ?? "Empleado";

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">

        {/* Header */}
        <div className="bg-[#E7000B] text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-lg">¡Hola, {nombreCorto}!</h2>
                <p className="text-xs text-white/80">{user?.rol}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <p className="text-xs text-white/80 mb-1">Usuario</p>
            <p className="font-semibold text-sm">{user?.nombre}</p>
            <p className="text-xs text-white/90 mt-1">Documento: {user?.documento}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-4 -mt-6 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
              <CardContent className="p-4">
                <Button
                  onClick={() => navigate("/mobile/weekly-menu")}
                  className="w-full h-auto flex-col gap-3 bg-[#f59e0b] hover:bg-[#d97706] py-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold">Hacer Pedido Semanal</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-red-50 to-white">
              <CardContent className="p-4">
                <Button
                  onClick={() => navigate("/mobile/my-orders")}
                  className="w-full h-auto flex-col gap-3 bg-[#E7000B] hover:bg-[#c00009] py-4"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <ClipboardList className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold">Mis Pedidos</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Menús Disponibles */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Menús Disponibles</h3>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
              {mockMenus.length} activos
            </Badge>
          </div>

          <div className="space-y-3">
            {mockMenus.map((menu) => (
              <Card key={menu.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shrink-0">
                      <ChefHat className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                          {menu.nombre}
                        </h4>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {menu.codigo}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Calendar className="w-3 h-3" />
                        {formatDateRange(menu.fechaInicio, menu.fechaFin)}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-xs">
                          {menu.totalPlatillos} platillos
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => navigate("/mobile/weekly-menu", { state: { menuId: menu.id } })}
                          className="bg-[#E7000B] hover:bg-[#c00009] h-8 text-xs"
                        >
                          Seleccionar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-3 gap-1 p-2">
            <Button
              variant="ghost"
              className="flex-col gap-1 h-auto py-3 bg-red-50 text-[#E7000B]"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs font-semibold">Inicio</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/mobile/my-orders")}
              className="flex-col gap-1 h-auto py-3 text-gray-600"
            >
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs">Mis Pedidos</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/mobile/profile")}
              className="flex-col gap-1 h-auto py-3 text-gray-600"
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Button>
          </div>
        </div>

      </div>
    </>
  );
}