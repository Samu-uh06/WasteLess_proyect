import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Building2, X, Edit, MapPin, Calendar, User, Mail, Phone, Package, TrendingUp } from "lucide-react";
import { Company } from "../../pages/Companies";

interface ViewCompanyDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (company: Company) => void;
}

export function ViewCompanyDialog({
  company,
  open,
  onOpenChange,
  onEdit,
}: ViewCompanyDialogProps) {
  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center w-14 h-14">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  {company.nombre}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    👥 Empresa Cliente
                  </span>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      company.estado === "Activa"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    ● {company.estado}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-6">
          {/* Información General */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información General
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">NIT</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.nit}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Ciudad</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.ciudad}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Dirección</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.direccion || "Cra 13 # 36-24"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Fecha de Registro</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.fechaRegistro || "2024-01-15"}
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Contacto</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.contacto}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Email</span>
                </div>
                <p className="text-base font-bold text-gray-900 truncate">
                  {company.email || "mrodriguez@ecopetrol.com.co"}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Teléfono</span>
                </div>
                <p className="text-base font-bold text-gray-900">
                  {company.telefono}
                </p>
              </div>
            </div>
          </div>

          {/* Indicadores de Cliente */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Indicadores de Cliente
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Pedidos Realizados
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">145</p>
                <p className="text-xs text-gray-600">
                  Total de pedidos generados
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💵</span>
                    <span className="text-sm text-gray-600">
                      Facturación Total
                    </span>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  $ 45.280.000
                </p>
                <p className="text-xs text-gray-600">Monto total facturado</p>
              </div>
            </div>
          </div>

          {/* Rol: Empresa Cliente */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-bold text-gray-900 mb-2">
              Rol: Empresa Cliente
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Genera demanda de productos alimenticios</li>
              <li>• Solicita pedidos de comida para sus operaciones</li>
              <li>• Recibe facturación por los servicios</li>
              <li>• Contribuye al aprovechamiento de alimentos</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}