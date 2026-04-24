import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Building2,
  LogOut,
  UtensilsCrossed,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Toaster } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

interface EmpleadoData {
  id: number;
  nombre: string;
  documento: string;
  telefono: string;
  email: string;
  cargo: string;
  comedor: string;
  comedorId: number;
  empresa: string;
}

export function MobileProfile() {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState<EmpleadoData | null>(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("empleadoLoggedIn");
    if (!loggedIn) {
      navigate("/mobile/login");
      return;
    }

    const empleadoData = localStorage.getItem("empleadoData");
    if (empleadoData) {
      setEmpleado(JSON.parse(empleadoData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("empleadoLoggedIn");
    localStorage.removeItem("empleadoData");
    navigate("/mobile/login");
  };

  if (!empleado) return null;

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-[#E7000B] text-white p-4 pb-16 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mobile/home")}
              className="text-white hover:bg-white/20 -ml-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Mi Perfil</h1>
              <p className="text-xs text-white/80">Información personal</p>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="px-4 -mt-12">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center mb-4 shadow-md">
                  <User className="w-12 h-12 text-[#E7000B]" />
                </div>
                <h2 className="font-bold text-xl text-gray-900 mb-1">{empleado.nombre}</h2>
                <p className="text-sm text-gray-600">{empleado.cargo}</p>
                <p className="text-xs text-gray-500 mt-1">Doc: {empleado.documento}</p>
              </div>

              {/* Info Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{empleado.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Teléfono</p>
                    <p className="text-sm font-semibold text-gray-900">{empleado.telefono}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Empresa</p>
                    <p className="text-sm font-semibold text-gray-900">{empleado.empresa}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Comedor Asignado</p>
                    <p className="text-sm font-semibold text-gray-900">{empleado.comedor}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-600">Cargo</p>
                    <p className="text-sm font-semibold text-gray-900">{empleado.cargo}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => navigate("/mobile/my-orders")}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <ClipboardList className="w-5 h-5 text-[#E7000B]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">Mis Pedidos</p>
                      <p className="text-xs text-gray-600">Ver historial de pedidos</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <button
                  onClick={() => setLogoutDialogOpen(true)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <LogOut className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-red-600 text-sm">Cerrar Sesión</p>
                      <p className="text-xs text-gray-600">Salir de tu cuenta</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="grid grid-cols-3 gap-1 p-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/mobile/home")}
              className="flex-col gap-1 h-auto py-3 text-gray-600"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span className="text-xs">Inicio</span>
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
              className="flex-col gap-1 h-auto py-3 bg-red-50 text-[#E7000B]"
            >
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold">Perfil</span>
            </Button>
          </div>
        </div>

        {/* Logout Dialog */}
        <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
              <AlertDialogDescription>
                ¿Estás seguro de que deseas cerrar tu sesión? Deberás iniciar sesión nuevamente para
                acceder a tu cuenta.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Cerrar Sesión
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}