// ============================================================
// ChangePasswordDialog.tsx  (ARCHIVO NUEVO)
// Ubicación: src/app/components/users/ChangePasswordDialog.tsx
//
// Modal que se muestra al usuario cuando requiereCambioContrasena === true.
// El usuario debe cambiar su contraseña antes de continuar.
// ============================================================
 
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Lock, Eye, EyeOff } from "lucide-react";
 
interface ChangePasswordDialogProps {
  open: boolean;
  nombreUsuario: string;
  onSubmit: (nuevaContrasena: string) => void;
}
 
export function ChangePasswordDialog({
  open,
  nombreUsuario,
  onSubmit,
}: ChangePasswordDialogProps) {
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [mostrarNueva, setMostrarNueva] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [error, setError] = useState("");
 
  const validarContrasena = (pass: string): string => {
    if (pass.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
    if (!/[A-Z]/.test(pass)) return "Debe incluir al menos una mayúscula.";
    if (!/[0-9]/.test(pass)) return "Debe incluir al menos un número.";
    if (!/[!@#$%&*]/.test(pass)) return "Debe incluir al menos un carácter especial (!@#$%&*).";
    return "";
  };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
 
    const validationError = validarContrasena(nuevaContrasena);
    if (validationError) {
      setError(validationError);
      return;
    }
 
    if (nuevaContrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }
 
    onSubmit(nuevaContrasena);
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };
 
  return (
    // preventClose: el usuario NO puede cerrar este modal sin cambiar la contraseña
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-[450px] p-0"
        // Desactivar cierre con ESC o click fuera
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
              <Lock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Cambio de contraseña requerido
              </DialogTitle>
              <p className="text-sm text-gray-600">
                Hola <strong>{nombreUsuario}</strong>, debes crear una nueva contraseña
                para continuar.
              </p>
            </div>
          </div>
        </DialogHeader>
 
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-4">
            <p className="text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              ⚠️ Tu cuenta fue creada con una contraseña temporal. Por seguridad,
              debes establecer una contraseña personal antes de continuar.
            </p>
 
            {/* Nueva contraseña */}
            <div>
              <Label htmlFor="nuevaContrasena" className="text-sm text-gray-700">
                Nueva contraseña *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="nuevaContrasena"
                  type={mostrarNueva ? "text" : "password"}
                  value={nuevaContrasena}
                  onChange={(e) => setNuevaContrasena(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setMostrarNueva(!mostrarNueva)}
                >
                  {mostrarNueva ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
 
            {/* Confirmar contraseña */}
            <div>
              <Label htmlFor="confirmarContrasena" className="text-sm text-gray-700">
                Confirmar contraseña *
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmarContrasena"
                  type={mostrarConfirmar ? "text" : "password"}
                  value={confirmarContrasena}
                  onChange={(e) => setConfirmarContrasena(e.target.value)}
                  placeholder="Repite tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                >
                  {mostrarConfirmar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
 
            {/* Requisitos */}
            <ul className="text-xs text-gray-400 space-y-1 mt-1">
              <li className={nuevaContrasena.length >= 8 ? "text-green-500" : ""}>
                ✓ Al menos 8 caracteres
              </li>
              <li className={/[A-Z]/.test(nuevaContrasena) ? "text-green-500" : ""}>
                ✓ Al menos una mayúscula
              </li>
              <li className={/[0-9]/.test(nuevaContrasena) ? "text-green-500" : ""}>
                ✓ Al menos un número
              </li>
              <li className={/[!@#$%&*]/.test(nuevaContrasena) ? "text-green-500" : ""}>
                ✓ Al menos un carácter especial (!@#$%&*)
              </li>
            </ul>
 
            {/* Error */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {error}
              </p>
            )}
          </div>
 
          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button
              type="submit"
              className="w-full bg-[#e7000b] hover:bg-[#c10009] text-white"
            >
              Guardar nueva contraseña
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}