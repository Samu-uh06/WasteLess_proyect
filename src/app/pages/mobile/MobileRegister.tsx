import { useState } from "react";
import { useNavigate } from "react-router";
import { UtensilsCrossed, Lock, User, Mail, Phone, Building2, MapPin, Briefcase, UserPlus, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { toast, Toaster } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Mock data para comedores disponibles
const mockComedores = [
  { id: 1, nombre: "Comedor Central - Ecopetrol", empresa: "Ecopetrol S.A." },
  { id: 2, nombre: "Comedor Norte - Ecopetrol", empresa: "Ecopetrol S.A." },
  { id: 3, nombre: "Comedor Principal - Bancolombia", empresa: "Bancolombia" },
  { id: 4, nombre: "Comedor Ejecutivo - Avianca", empresa: "Avianca" },
];

export function MobileRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    telefono: "",
    cargo: "",
    comedorId: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim()) {
      toast.error("Por favor ingresa tu nombre completo");
      return;
    }

    if (!formData.documento.trim() || formData.documento.length < 6) {
      toast.error("Por favor ingresa un documento válido");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast.error("Por favor ingresa un email válido");
      return;
    }

    if (!formData.telefono.trim() || formData.telefono.length < 10) {
      toast.error("Por favor ingresa un teléfono válido");
      return;
    }

    if (!formData.cargo.trim()) {
      toast.error("Por favor ingresa tu cargo");
      return;
    }

    if (!formData.comedorId) {
      toast.error("Por favor selecciona un comedor");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    // Obtener info del comedor seleccionado
    const comedorSeleccionado = mockComedores.find(
      (c) => c.id.toString() === formData.comedorId
    );

    if (!comedorSeleccionado) {
      toast.error("Comedor no válido");
      return;
    }

    // Guardar usuario en localStorage (simulación)
    const nuevoUsuario = {
      id: Date.now(),
      nombre: formData.nombre,
      documento: formData.documento,
      email: formData.email,
      telefono: formData.telefono,
      cargo: formData.cargo,
      comedor: comedorSeleccionado.nombre,
      comedorId: comedorSeleccionado.id,
      empresa: comedorSeleccionado.empresa,
      password: formData.password,
    };

    // Guardar en lista de usuarios registrados
    const usuariosRegistrados = JSON.parse(
      localStorage.getItem("usuariosRegistrados") || "[]"
    );
    localStorage.setItem(
      "usuariosRegistrados",
      JSON.stringify([...usuariosRegistrados, nuevoUsuario])
    );

    toast.success("✅ ¡Registro exitoso! Ahora puedes iniciar sesión");
    
    // Redirigir al login después de 1.5 segundos
    setTimeout(() => {
      navigate("/mobile/login");
    }, 1500);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 pb-8">
        <div className="w-full max-w-md mx-auto">
          {/* Logo y Header */}
          <div className="text-center mb-6 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/mobile/login")}
              className="mb-4 text-gray-600"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Login
            </Button>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E7000B] rounded-2xl shadow-xl mb-3">
              <UtensilsCrossed className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Crear Cuenta</h1>
            <p className="text-gray-600 text-sm">Portal de Empleados WasteLess</p>
          </div>

          {/* Register Card */}
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Nombre Completo */}
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-gray-700 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    Nombre Completo
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Juan Pérez González"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Documento */}
                <div className="space-y-2">
                  <Label htmlFor="documento" className="text-gray-700 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    Número de Documento
                  </Label>
                  <Input
                    id="documento"
                    type="text"
                    placeholder="1234567890"
                    value={formData.documento}
                    onChange={(e) => handleChange("documento", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    Email Corporativo
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="juan.perez@empresa.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Teléfono */}
                <div className="space-y-2">
                  <Label htmlFor="telefono" className="text-gray-700 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="+57 300 123 4567"
                    value={formData.telefono}
                    onChange={(e) => handleChange("telefono", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Cargo */}
                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-gray-700 flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4" />
                    Cargo
                  </Label>
                  <Input
                    id="cargo"
                    type="text"
                    placeholder="Ingeniero de Sistemas"
                    value={formData.cargo}
                    onChange={(e) => handleChange("cargo", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Comedor */}
                <div className="space-y-2">
                  <Label htmlFor="comedor" className="text-gray-700 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    Comedor Asignado
                  </Label>
                  <Select
                    value={formData.comedorId}
                    onValueChange={(value) => handleChange("comedorId", value)}
                  >
                    <SelectTrigger className="h-11 border-gray-300">
                      <SelectValue placeholder="Selecciona tu comedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockComedores.map((comedor) => (
                        <SelectItem key={comedor.id} value={comedor.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="font-medium text-sm">{comedor.nombre}</p>
                              <p className="text-xs text-gray-500">{comedor.empresa}</p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4" />
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                {/* Confirmar Contraseña */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4" />
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repite tu contraseña"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="h-11 border-gray-300"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-[#E7000B] hover:bg-[#c00009] text-white shadow-lg text-base mt-6"
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Crear Cuenta
                </Button>
              </form>

              {/* Link al Login */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{" "}
                  <button
                    onClick={() => navigate("/mobile/login")}
                    className="text-[#E7000B] font-semibold hover:underline"
                  >
                    Inicia Sesión
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
