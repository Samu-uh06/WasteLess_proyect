import { useState } from "react";
import { useNavigate } from "react-router";
import { UtensilsCrossed, Lock, User, LogIn } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { toast, Toaster } from "sonner";

export function MobileLogin() {
  const navigate = useNavigate();
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Limpiar espacios en blanco
    const documentoTrimmed = documento.trim();
    const passwordTrimmed = password.trim();
    
    console.log("Documento ingresado:", documentoTrimmed);
    console.log("Password ingresado:", passwordTrimmed);
    
    // Verificar credenciales mock predeterminadas
    if (documentoTrimmed === "1234567890" && passwordTrimmed === "empleado123") {
      localStorage.setItem("empleadoLoggedIn", "true");
      localStorage.setItem("empleadoData", JSON.stringify({
        id: 1,
        nombre: "Carlos Andrés Pérez",
        documento: "1234567890",
        telefono: "+57 300 123 4567",
        email: "carlos.perez@ecopetrol.com",
        cargo: "Ingeniero de Producción",
        comedor: "Comedor Central - Ecopetrol",
        comedorId: 1,
        empresa: "Ecopetrol S.A."
      }));
      toast.success("¡Bienvenido, Carlos!");
      navigate("/mobile/home");
      return;
    }
    
    // Verificar usuarios registrados
    const usuariosRegistrados = JSON.parse(
      localStorage.getItem("usuariosRegistrados") || "[]"
    );
    
    const usuarioEncontrado = usuariosRegistrados.find(
      (user: any) => user.documento === documentoTrimmed && user.password === passwordTrimmed
    );
    
    if (usuarioEncontrado) {
      localStorage.setItem("empleadoLoggedIn", "true");
      localStorage.setItem("empleadoData", JSON.stringify(usuarioEncontrado));
      toast.success(`¡Bienvenido, ${usuarioEncontrado.nombre.split(" ")[0]}!`);
      navigate("/mobile/home");
    } else {
      toast.error("Credenciales incorrectas");
      console.log("Login fallido - Usuario no encontrado");
    }
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo y Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E7000B] rounded-3xl shadow-xl mb-4">
              <UtensilsCrossed className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">WasteLess</h1>
            <p className="text-gray-600 text-sm">Portal de Empleados</p>
          </div>

          {/* Login Card */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="documento" className="text-gray-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Número de Documento
                  </Label>
                  <Input
                    id="documento"
                    type="text"
                    placeholder="Ingresa tu documento"
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    className="h-12 border-gray-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-gray-300"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-[#E7000B] hover:bg-[#c00009] text-white shadow-lg text-base"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Iniciar Sesión
                </Button>
              </form>

              {/* Credenciales de prueba */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">Credenciales de prueba:</p>
                <p className="text-xs text-blue-800">Documento: <span className="font-mono font-bold">1234567890</span></p>
                <p className="text-xs text-blue-800">Contraseña: <span className="font-mono font-bold">empleado123</span></p>
              </div>

              {/* Link al Registro */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿No tienes cuenta?{" "}
                  <button
                    onClick={() => navigate("/mobile/register")}
                    className="text-[#E7000B] font-semibold hover:underline"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2026 WasteLess - Gestión de Comedores Empresariales
          </p>
        </div>
      </div>
    </>
  );
}