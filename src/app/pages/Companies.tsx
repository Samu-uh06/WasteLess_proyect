import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Eye, Pencil, Building2, UtensilsCrossed, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { CreateCompanyDialog, CompanyFormData } from "../components/companies/CreateCompanyDialog";
import { ViewCompanyDialog } from "../components/companies/ViewCompanyDialog";
import { EditCompanyDialog } from "../components/companies/EditCompanyDialog";
import { CompanyDinersDialog } from "../components/companies/CompanyDinersDialog";
import { toast } from "sonner";
import {
  loadCompanies, createCompany, deleteCompany, toggleCompanyStatus,
  loadCities, type ApiCompany, type City,
  updateCompany,
} from "../services/companiesService";

export interface Company {
  id: number;
  nombre: string;
  tipo: "Jurídica" | "Natural";
  tipoIcon: typeof Building2 | typeof UtensilsCrossed;
  tipoColor: string;
  nit: string;
  idCiudad: number;
  ciudad: string;
  direccion?: string;
  contacto: string;
  email?: string;
  telefono: string;
  estado: "Activa" | "Inactiva";
  fechaRegistro?: string;
}

const mapApiCompany = (c: ApiCompany): Company => ({
  id: Number(c.idEmpresa),
  nombre: c.nombreEmpresa,
  tipo: c.tipoEmpresa,
  tipoIcon: c.tipoEmpresa === "Jurídica" ? Building2 : UtensilsCrossed,
  tipoColor: c.tipoEmpresa === "Jurídica" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800",
  nit: c.nit ?? "",
  idCiudad: c.idCiudad,
  ciudad: c.nombreCiudad ?? "",
  direccion: c.direccion,
  contacto: c.contacto?.nombre ?? "",
  email: c.contacto?.email,
  telefono: c.contacto?.telefono ?? "",
  estado: c.estado === "activo" || c.estado === "Activo" ? "Activa" : "Inactiva",
  fechaRegistro: c.fechaRegistro,
});

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dinersDialogOpen, setDinersDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  const fetchCompanies = useCallback(async () => {
    try {
      const data = await loadCompanies();
      setCompanies(data.map(mapApiCompany));
    } catch {
      toast.error("Error al cargar empresas");
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
    loadCities().then(setCities).catch(() => toast.error("Error al cargar ciudades"));
  }, [fetchCompanies]);

  const stats = {
    total: companies.length,
    juridicas: companies.filter((c) => c.tipo === "Jurídica").length,
    naturales: companies.filter((c) => c.tipo === "Natural").length,
    activas: companies.filter((c) => c.estado === "Activa").length,
  };

  const statsCards = [
    { title: "Total Empresas",     value: stats.total.toString(),     icon: Building2,       iconBg: "bg-[#3b82f6]" },
    { title: "Empresas Jurídicas", value: stats.juridicas.toString(), icon: Building2,       iconBg: "bg-[#3b82f6]" },
    { title: "Empresas Naturales", value: stats.naturales.toString(), icon: UtensilsCrossed, iconBg: "bg-[#f97316]" },
    { title: "Empresas Activas",   value: stats.activas.toString(),   icon: Building2,       iconBg: "bg-[#10b981]" },
  ];

  const filterTabs = [
    { id: "all",      label: "Todas",     count: stats.total },
    { id: "juridica", label: "Jurídicas", count: stats.juridicas },
    { id: "natural",  label: "Naturales", count: stats.naturales },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.nit.includes(searchTerm) ||
      company.ciudad.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "juridica" && company.tipo === "Jurídica") ||
      (selectedTab === "natural" && company.tipo === "Natural");
    return matchesSearch && matchesTab;
  });

  const handleCreateCompany = async (formData: CompanyFormData) => {
    try {
      const ciudad = cities.find((c) => c.nombre === formData.ciudad);
      if (!ciudad) { toast.error("Ciudad no válida"); return; }

      const nit = formData.tipo === "natural"
        ? `${formData.tipoDocumento}-${formData.numeroDocumento}`
        : formData.nit;

      await createCompany({
        nombreEmpresa: formData.nombre,
        tipoEmpresa: formData.tipo === "juridica" ? "Jurídica" : "Natural",
        nit,
        idCiudad: ciudad.idCiudad,
        direccion: formData.direccion,
        nombreContacto: formData.tipo === "natural" ? formData.nombreResponsable : formData.nombreContacto,
        emailContacto: formData.email,
        telefonoContacto: formData.telefono,
      });

      await fetchCompanies();
      setCreateDialogOpen(false);
      toast.success("Empresa registrada exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al registrar la empresa");
    }
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setViewDialogOpen(true);
  };

  const handleEditClick = (company: Company) => {
    setSelectedCompany(company);
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleEditCompany = async (id: number, data: Partial<Company>) => {
    try {
      const ciudad = cities.find((c) => c.nombre === data.ciudad);
      await updateCompany(id, {
        nombreEmpresa: data.nombre,
        tipoEmpresa: data.tipo,
        nit: data.nit,
        idCiudad: ciudad?.idCiudad || data.idCiudad,
        direccion: data.direccion,
        nombreContacto: data.contacto,
        emailContacto: data.email,
        telefonoContacto: data.telefono,
      });
      await fetchCompanies();
      setEditDialogOpen(false);
      toast.success("Empresa actualizada exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al actualizar la empresa");
    }
  };

  const handleToggleStatus = async (company: Company) => {
    try {
      const nuevoEstado = company.estado === "Activa" ? "inactiva" : "activa";
      await toggleCompanyStatus(company.id, nuevoEstado);
      await fetchCompanies();
      toast.success("Estado de la empresa actualizado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al cambiar el estado");
    }
  };

  const handleDeleteClick = (company: Company) => {
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCompany = async () => {
    if (!companyToDelete) return;
    try {
      await deleteCompany(companyToDelete.id);
      await fetchCompanies();
      toast.success("Empresa eliminada exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al eliminar la empresa");
    } finally {
      setDeleteDialogOpen(false);
      setCompanyToDelete(null);
    }
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Empresas</h1>
        <p className="text-sm text-gray-600">Administración de empresas clientes y restaurantes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}><Icon className="w-5 h-5 text-white" /></div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input type="text" placeholder="Buscar por nombre, NIT o ciudad..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)} className="bg-[#e7000b] hover:bg-[#c10009] text-white">
          <Plus className="w-4 h-4 mr-2" />Registrar
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        {filterTabs.map((tab) => (
          <button key={tab.id} onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${selectedTab === tab.id ? "bg-[#6366f1] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>NIT</TableHead>
              <TableHead>Ciudad</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCompanies.map((company) => {
              const TypeIcon = company.tipoIcon;
              return (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                        <TypeIcon className={`w-5 h-5 ${company.tipo === "Jurídica" ? "text-blue-600" : "text-orange-600"}`} />
                      </div>
                      <span className="font-medium">{company.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${company.tipoColor}`}>
                      <TypeIcon className="w-3.5 h-3.5" />{company.tipo}
                    </span>
                  </TableCell>
                  <TableCell>{company.nit}</TableCell>
                  <TableCell>{company.ciudad}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{company.contacto}</p>
                      <p className="text-xs text-gray-500">{company.telefono}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={company.estado === "Activa"}
                      onCheckedChange={() => handleToggleStatus(company)}
                      className={company.estado === "Activa" ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleViewCompany(company)} className="bg-green-400/80 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors" title="Ver">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditClick(company)} className="bg-blue-400/80 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteClick(company)} className="bg-red-400/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <CreateCompanyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateCompany}
        cities={cities}
      />

      <ViewCompanyDialog company={selectedCompany} open={viewDialogOpen} onOpenChange={setViewDialogOpen} onEdit={handleEditClick} />
      <EditCompanyDialog company={selectedCompany} open={editDialogOpen} onOpenChange={setEditDialogOpen} onSubmit={handleEditCompany} cities={cities} />
      <CompanyDinersDialog company={selectedCompany} open={dinersDialogOpen} onOpenChange={setDinersDialogOpen} />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar esta empresa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la empresa{" "}
              <span className="font-semibold">{companyToDelete?.nombre}</span> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCompany} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}