import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Building2, UtensilsCrossed, X } from "lucide-react";
import { type City } from "../../services/companiesService";

interface CreateCompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyFormData) => void;
  cities: City[];
}

export interface CompanyFormData {
  tipo: "juridica" | "natural";
  nombre: string;
  nit: string;
  nombreResponsable: string;
  tipoDocumento: string;
  numeroDocumento: string;
  ciudad: string;
  direccion: string;
  nombreContacto: string;
  email: string;
  telefono: string;
}

const TIPOS_DOCUMENTO = [
  { value: "CC", label: "Cédula de Ciudadanía" },
  { value: "CE", label: "Cédula de Extranjería" },
  { value: "NIT", label: "NIT" },
  { value: "PA", label: "Pasaporte" },
  { value: "TI", label: "Tarjeta de Identidad" },
];

const EMPTY_FORM: CompanyFormData = {
  tipo: "juridica",
  nombre: "",
  nit: "",
  nombreResponsable: "",
  tipoDocumento: "",
  numeroDocumento: "",
  ciudad: "",
  direccion: "",
  nombreContacto: "",
  email: "",
  telefono: "",
};

export function CreateCompanyDialog({ open, onOpenChange, onSubmit, cities }: CreateCompanyDialogProps) {
  const [formData, setFormData] = useState<CompanyFormData>(EMPTY_FORM);
  const isNatural = formData.tipo === "natural";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(EMPTY_FORM);
  };

  const handleTipoChange = (value: "juridica" | "natural") => {
    setFormData({ ...EMPTY_FORM, tipo: value });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[768px] max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 rounded-lg p-2 flex items-center justify-center w-10 h-10">
                <Building2 className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">Registrar Nueva Empresa</DialogTitle>
                <p className="text-sm text-gray-600">Ingrese los datos de la empresa</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
              <X className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-6">
            {/* Tipo */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <Label className="text-sm font-bold text-gray-900 mb-3 block">Tipo de Empresa *</Label>
              <RadioGroup value={formData.tipo} onValueChange={(v) => handleTipoChange(v as "juridica" | "natural")} className="grid grid-cols-2 gap-4">
                <Label htmlFor="juridica" className={`flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.tipo === "juridica" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
                  <RadioGroupItem value="juridica" id="juridica" className="sr-only" />
                  <div className="flex items-center gap-2"><Building2 className="w-5 h-5 text-blue-600" /><span className="font-bold text-base text-gray-900">Empresa jurídica</span></div>
                  <p className="text-xs text-gray-600">Solicita pedidos de comida y genera demanda</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">• Recibe el análisis de las métricas</p>
                    <p className="text-xs text-gray-500">• Genera pedidos</p>
                  </div>
                </Label>
                <Label htmlFor="natural" className={`flex flex-col gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.tipo === "natural" ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white hover:bg-gray-50"}`}>
                  <RadioGroupItem value="natural" id="natural" className="sr-only" />
                  <div className="flex items-center gap-2"><UtensilsCrossed className="w-5 h-5 text-orange-600" /><span className="font-bold text-base text-gray-900">Empresa Natural</span></div>
                  <p className="text-xs text-gray-600">Solicita pedidos de comida y genera demanda</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">• Recibe el análisis de las métricas</p>
                    <p className="text-xs text-gray-500">• Genera pedidos</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>

            {/* Información Básica */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Información Básica</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nombre" className="text-sm text-gray-700">Nombre de la empresa *</Label>
                  <Input id="nombre" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Ej: Ecopetrol S.A." className="mt-2" required />
                </div>

                {!isNatural ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nit" className="text-sm text-gray-700">NIT *</Label>
                      <Input id="nit" value={formData.nit} onChange={(e) => setFormData({ ...formData, nit: e.target.value })} placeholder="899.999.068-1" className="mt-2" required />
                    </div>
                    <div>
                      <Label htmlFor="ciudad" className="text-sm text-gray-700">Ciudad *</Label>
                      <Select value={formData.ciudad} onValueChange={(v) => setFormData({ ...formData, ciudad: v })}>
                        <SelectTrigger id="ciudad" className="mt-2"><SelectValue placeholder="Seleccione ciudad" /></SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => <SelectItem key={c.idCiudad} value={c.nombre}>{c.nombre}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nombreResponsable" className="text-sm text-gray-700">Nombre del responsable *</Label>
                      <Input id="nombreResponsable" value={formData.nombreResponsable} onChange={(e) => setFormData({ ...formData, nombreResponsable: e.target.value })} placeholder="Ej: Juan Carlos Pérez" className="mt-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipoDocumento" className="text-sm text-gray-700">Tipo de documento *</Label>
                        <Select value={formData.tipoDocumento} onValueChange={(v) => setFormData({ ...formData, tipoDocumento: v })}>
                          <SelectTrigger id="tipoDocumento" className="mt-2"><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
                          <SelectContent>
                            {TIPOS_DOCUMENTO.map((td) => <SelectItem key={td.value} value={td.value}>{td.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="numeroDocumento" className="text-sm text-gray-700">Número de documento *</Label>
                        <Input id="numeroDocumento" value={formData.numeroDocumento} onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })} placeholder="Ej: 1234567890" className="mt-2" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="ciudadNatural" className="text-sm text-gray-700">Ciudad *</Label>
                      <Select value={formData.ciudad} onValueChange={(v) => setFormData({ ...formData, ciudad: v })}>
                        <SelectTrigger id="ciudadNatural" className="mt-2"><SelectValue placeholder="Seleccione ciudad" /></SelectTrigger>
                        <SelectContent>
                          {cities.map((c) => <SelectItem key={c.idCiudad} value={c.nombre}>{c.nombre}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="direccion" className="text-sm text-gray-700">Dirección *</Label>
                  <Input id="direccion" value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} placeholder="Cra 13 # 36-24" className="mt-2" required />
                </div>
              </div>
            </div>

            {/* Información de Contacto */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Información de Contacto</h3>
              <div className="space-y-4">
                {!isNatural && (
                  <>
                    <div>
                      <Label htmlFor="nombreContacto" className="text-sm text-gray-700">Nombre del contacto *</Label>
                      <Input id="nombreContacto" value={formData.nombreContacto} onChange={(e) => setFormData({ ...formData, nombreContacto: e.target.value })} placeholder="María Rodríguez" className="mt-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tipoDocumentoJuridica" className="text-sm text-gray-700">Tipo de documento *</Label>
                        <Select value={formData.tipoDocumento} onValueChange={(v) => setFormData({ ...formData, tipoDocumento: v })}>
                          <SelectTrigger id="tipoDocumentoJuridica" className="mt-2"><SelectValue placeholder="Seleccione tipo" /></SelectTrigger>
                          <SelectContent>
                            {TIPOS_DOCUMENTO.map((td) => <SelectItem key={td.value} value={td.value}>{td.label}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="numeroDocumentoJuridica" className="text-sm text-gray-700">Número de documento *</Label>
                        <Input id="numeroDocumentoJuridica" value={formData.numeroDocumento} onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })} placeholder="Ej: 1234567890" className="mt-2" required />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm text-gray-700">Correo electrónico *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="contacto@empresa.com" className="mt-2" required />
                  </div>
                  <div>
                    <Label htmlFor="telefono" className="text-sm text-gray-700">Teléfono *</Label>
                    <Input id="telefono" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="+57 310 123 4567" className="mt-2" required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-5 flex items-center justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit" className="bg-[#e7000b] hover:bg-[#c10009] text-white">Registrar Empresa</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}