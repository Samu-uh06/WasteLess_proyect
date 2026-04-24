import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { X, User as UserIcon, Mail, Phone, Building2, Shield, Calendar, IdCard } from "lucide-react";

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
  fechaRegistro?: string;
}

interface ViewUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (user: User) => void;
}

export function ViewUserDialog({
  user,
  open,
  onOpenChange,
  onEdit,
}: ViewUserDialogProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                <UserIcon className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {user.nombre}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      user.estado
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    ● {user.estado ? "Activo" : "Inactivo"}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {user.rol}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Información Personal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información Personal
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IdCard className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Tipo de Documento</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.tipoDocumento}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <IdCard className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Documento</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.documento}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Nombre Completo</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.nombre}
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Correo Electrónico</span>
                </div>
                <p className="text-base font-bold text-gray-900 truncate">
                  {user.email}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Teléfono</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.telefono}
                </p>
              </div>
            </div>
          </div>

          {/* Información Laboral */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información Laboral
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Empresa</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.empresa}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Rol</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.rol}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Fecha de Registro</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {user.fechaRegistro || "2024-01-15"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button
            className="bg-[#e7000b] hover:bg-[#c10009] text-white"
            onClick={() => onEdit(user)}
          >
            Editar Usuario
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
