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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { User, X } from "lucide-react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
}

export interface UserFormData {
  tipoDocumento: string;
  documento: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  empresa: string;
  rol: string;
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateUserDialogProps) {
  const [formData, setFormData] = useState<UserFormData>({
    tipoDocumento: "",
    documento: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    rol: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      tipoDocumento: "",
      documento: "",
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      empresa: "",
      rol: "",
    });
  };

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
                  Crear Nuevo Usuario
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Ingrese los datos del usuario
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
                <Label htmlFor="tipoDocumento" className="text-sm text-gray-700">
                  Tipo de documento *
                </Label>
                <Select
                  value={formData.tipoDocumento}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipoDocumento: value })
                  }
                >
                  <SelectTrigger id="tipoDocumento" className="mt-2">
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
                <Label htmlFor="documento" className="text-sm text-gray-700">
                  Número de documento *
                </Label>
                <Input
                  id="documento"
                  value={formData.documento}
                  onChange={(e) =>
                    setFormData({ ...formData, documento: e.target.value })
                  }
                  placeholder="1234567890"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Nombre y Apellido */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre" className="text-sm text-gray-700">
                  Nombre *
                </Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Juan"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="apellido" className="text-sm text-gray-700">
                  Apellido *
                </Label>
                <Input
                  id="apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                  placeholder="Pérez"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Email y Teléfono */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm text-gray-700">
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="usuario@ejemplo.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="telefono" className="text-sm text-gray-700">
                  Teléfono *
                </Label>
                <Input
                  id="telefono"
                  value={formData.telefono}
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
                <Label htmlFor="empresa" className="text-sm text-gray-700">
                  Empresa *
                </Label>
                <Select
                  value={formData.empresa}
                  onValueChange={(value) =>
                    setFormData({ ...formData, empresa: value })
                  }
                >
                  <SelectTrigger id="empresa" className="mt-2">
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
                <Label htmlFor="rol" className="text-sm text-gray-700">
                  Rol *
                </Label>
                <Select
                  value={formData.rol}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rol: value })
                  }
                >
                  <SelectTrigger id="rol" className="mt-2">
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
              Crear Usuario
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
