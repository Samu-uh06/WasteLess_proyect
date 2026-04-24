import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { User, X } from "lucide-react";

interface User {
  id: number;
  tipoDocumento: string;
  documento: string;
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  rol: string;
  estado: boolean;
}

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (id: number, data: Partial<User>) => void;
}

export function EditUserDialog({
  user,
  open,
  onOpenChange,
  onSubmit,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setFormData({
        tipoDocumento: user.tipoDocumento,
        documento: user.documento,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        empresa: user.empresa,
        rol: user.rol,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      onSubmit(user.id, formData);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Editar Usuario
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Actualice los datos del usuario
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-4">
            {/* Documento */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-tipoDocumento" className="text-sm text-gray-700">
                  Tipo de documento *
                </Label>
                <Select
                  value={formData.tipoDocumento || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoDocumento: value })
                  }
                >
                  <SelectTrigger id="edit-tipoDocumento" className="mt-2">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                    <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                    <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                    <SelectItem value="PP">Pasaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-documento" className="text-sm text-gray-700">
                  Número de documento *
                </Label>
                <Input
                  id="edit-documento"
                  value={formData.documento || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, documento: e.target.value })
                  }
                  placeholder="1234567890"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Nombre */}
            <div>
              <Label htmlFor="edit-nombre" className="text-sm text-gray-700">
                Nombre completo *
              </Label>
              <Input
                id="edit-nombre"
                value={formData.nombre || ""}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Juan Pérez"
                className="mt-2"
              />
            </div>

            {/* Email y Teléfono */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-email" className="text-sm text-gray-700">
                  Correo electrónico *
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="usuario@ejemplo.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="edit-telefono" className="text-sm text-gray-700">
                  Teléfono *
                </Label>
                <Input
                  id="edit-telefono"
                  value={formData.telefono || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                  placeholder="+57 300 123 4567"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Empresa y Rol */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-empresa" className="text-sm text-gray-700">
                  Empresa *
                </Label>
                <Select
                  value={formData.empresa || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, empresa: value })
                  }
                >
                  <SelectTrigger id="edit-empresa" className="mt-2">
                    <SelectValue placeholder="Seleccione empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ecopetrol S.A.">Ecopetrol S.A.</SelectItem>
                    <SelectItem value="Universidad Nacional">
                      Universidad Nacional
                    </SelectItem>
                    <SelectItem value="Hospital San Ignacio">
                      Hospital San Ignacio
                    </SelectItem>
                    <SelectItem value="Sena">Sena</SelectItem>
                    <SelectItem value="Prodigal A3">Prodigal A3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="edit-rol" className="text-sm text-gray-700">
                  Rol *
                </Label>
                <Select
                  value={formData.rol || ""}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rol: value })
                  }
                >
                  <SelectTrigger id="edit-rol" className="mt-2">
                    <SelectValue placeholder="Seleccione rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrador">Administrador</SelectItem>
                    <SelectItem value="Empleado">Empleado</SelectItem>
                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                    <SelectItem value="Cocinero">Cocinero</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#e7000b] hover:bg-[#c10009] text-white"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
