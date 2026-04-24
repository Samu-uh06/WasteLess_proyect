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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Building2, UtensilsCrossed, X } from "lucide-react";

interface CreateCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyFormData) => void;
}

export interface CompanyFormData {
  tipo: "juridica" | "natural";
  nombre: string;
  nit: string;
  ciudad: string;
  direccion: string;
  nombreContacto: string;
  email: string;
  telefono: string;
}

export function CreateCompanyDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateCompanyDialogProps) {
  const [formData, setFormData] = useState<CompanyFormData>({
    tipo: "juridica",
    nombre: "",
    nit: "",
    ciudad: "",
    direccion: "",
    nombreContacto: "",
    email: "",
    telefono: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      tipo: "juridica",
      nombre: "",
      nit: "",
      ciudad: "",
      direccion: "",
      nombreContacto: "",
      email: "",
      telefono: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[768px] max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Registrar Nueva Empresa
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Ingrese los datos de la empresa
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
          <div className="px-6 py-6 space-y-6">
            {/* Tipo de Empresa */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <Label className="text-sm font-bold text-gray-900 mb-3 block">
                Tipo de Empresa *
              </Label>
              <RadioGroup
                value={formData.tipo}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    tipo: value as "juridica" | "natural",
                  })
                }
                className="grid grid-cols-2 gap-4"
              >
                <Label
                  htmlFor="juridica"
                  className={`flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.tipo === "juridica"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value="juridica"
                    id="juridica"
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-base text-gray-900">
                      Empresa jurídica
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Solicita pedidos de comida y genera demanda
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">• Recibe el análisis de las métricas</p>
                    <p className="text-xs text-gray-500">• Genera pedidos</p>
                  </div>
                </Label>

                <Label
                  htmlFor="natural"
                  className={`flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.tipo === "natural"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <RadioGroupItem
                    value="natural"
                    id="natural"
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-orange-600" />
                    <span className="font-bold text-base text-gray-900">
                      Empresa Natural
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Solicita pedidos de comida y genera demanda
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">• Recibe el análisis de las métricas</p>
                    <p className="text-xs text-gray-500">• Genera pedidos</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {/* Información Básica */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Información Básica
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre" className="text-sm text-gray-700">
                    Nombre de la empresa *
                  </Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    placeholder="Ej: Ecopetrol S.A."
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nit" className="text-sm text-gray-700">
                      NIT *
                    </Label>
                    <Input
                      id="nit"
                      value={formData.nit}
                      onChange={(e) =>
                        setFormData({ ...formData, nit: e.target.value })
                      }
                      placeholder="899.999.068-1"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="ciudad" className="text-sm text-gray-700">
                      Ciudad *
                    </Label>
                    <Select
                      value={formData.ciudad}
                      onValueChange={(value) =>
                        setFormData({ ...formData, ciudad: value })
                      }
                    >
                      <SelectTrigger id="ciudad" className="mt-2">
                        <SelectValue placeholder="Seleccione ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bogotá">Bogotá</SelectItem>
                        <SelectItem value="Medellín">Medellín</SelectItem>
                        <SelectItem value="Cali">Cali</SelectItem>
                        <SelectItem value="Barranquilla">Barranquilla</SelectItem>
                        <SelectItem value="Cartagena">Cartagena</SelectItem>
                        <SelectItem value="Bucaramanga">Bucaramanga</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="direccion" className="text-sm text-gray-700">
                    Dirección *
                  </Label>
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData({ ...formData, direccion: e.target.value })
                    }
                    placeholder="Cra 13 # 36-24"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="nombreContacto"
                    className="text-sm text-gray-700"
                  >
                    Nombre del contacto *
                  </Label>
                  <Input
                    id="nombreContacto"
                    value={formData.nombreContacto}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nombreContacto: e.target.value,
                      })
                    }
                    placeholder="María Rodríguez"
                    className="mt-2"
                  />
                </div>

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
                      placeholder="contacto@empresa.com"
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
                      placeholder="+57 310 123 4567"
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#4f39f6] hover:bg-[#3f29d6] text-white"
            >
              Registrar Empresa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}