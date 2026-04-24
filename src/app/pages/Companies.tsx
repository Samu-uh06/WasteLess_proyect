import { useState } from "react";
import { Plus, Search, Eye, Edit, Building2, UtensilsCrossed, MapPin, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Switch } from "../components/ui/switch";
import { Card, CardContent } from "../components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { CreateCompanyDialog, CompanyFormData } from "../components/companies/CreateCompanyDialog";
import { ViewCompanyDialog } from "../components/companies/ViewCompanyDialog";
import { EditCompanyDialog } from "../components/companies/EditCompanyDialog";
import { CompanyDinersDialog } from "../components/companies/CompanyDinersDialog";
import { toast } from "sonner";

export interface Company {
  id: number;
  nombre: string;
  tipo: "Jurídica" | "Natural";
  tipoIcon: typeof Building2 | typeof UtensilsCrossed;
  tipoColor: string;
  nit: string;
  ciudad: string;
  direccion?: string;
  contacto: string;
  email?: string;
  telefono: string;
  estado: "Activa" | "Inactiva";
  fechaRegistro?: string;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    nombre: "Ecopetrol S.A.",
    tipo: "Jurídica",
    tipoIcon: Building2,
    tipoColor: "bg-blue-100 text-blue-800",
    nit: "899.999.068-1",
    ciudad: "Bogotá",
    direccion: "Cra 13 # 36-24",
    contacto: "María Rodríguez",
    email: "mrodriguez@ecopetrol.com.co",
    telefono: "+57 310 123 4567",
    estado: "Activa",
    fechaRegistro: "2024-01-15",
  },
  {
    id: 2,
    nombre: "Restaurante El Buen Sabor",
    tipo: "Natural",
    tipoIcon: UtensilsCrossed,
    tipoColor: "bg-orange-100 text-orange-800",
    nit: "900.123.456-7",
    ciudad: "Bogotá",
    direccion: "Av. 68 # 75-50",
    contacto: "Carlos Méndez",
    email: "carlos@elsabor.com",
    telefono: "+57 300 456 8876",
    estado: "Activa",
    fechaRegistro: "2024-02-20",
  },
  {
    id: 3,
    nombre: "Universidad Nacional de Colombia",
    tipo: "Jurídica",
    tipoIcon: Building2,
    tipoColor: "bg-blue-100 text-blue-800",
    nit: "899.999.063-3",
    ciudad: "Bogotá",
    direccion: "Ciudad Universitaria",
    contacto: "Ana López",
    email: "alopez@unal.edu.co",
    telefono: "+57 315 789 0123",
    estado: "Activa",
    fechaRegistro: "2024-01-10",
  },
  {
    id: 4,
    nombre: "Comedor Social Norte",
    tipo: "Natural",
    tipoIcon: UtensilsCrossed,
    tipoColor: "bg-orange-100 text-orange-800",
    nit: "900.234.567-8",
    ciudad: "Bogotá",
    direccion: "Calle 100 # 15-20",
    contacto: "Jorge Pérez",
    email: "jperez@comedornorte.com",
    telefono: "+57 301 456 7890",
    estado: "Activa",
    fechaRegistro: "2024-03-05",
  },
  {
    id: 5,
    nombre: "Hospital San Ignacio",
    tipo: "Jurídica",
    tipoIcon: Building2,
    tipoColor: "bg-blue-100 text-blue-800",
    nit: "860.007.336-6",
    ciudad: "Bogotá",
    direccion: "Cra 7 # 40-62",
    contacto: "Patricia Gómez",
    email: "pgomez@husi.org.co",
    telefono: "+57 312 234 5678",
    estado: "Inactiva",
    fechaRegistro: "2023-12-01",
  },
  {
    id: 6,
    nombre: "Fundación Alimentos Para Todos",
    tipo: "Natural",
    tipoIcon: UtensilsCrossed,
    tipoColor: "bg-orange-100 text-orange-800",
    nit: "900.345.678-9",
    ciudad: "Medellín",
    direccion: "Calle 50 # 43-80",
    contacto: "Roberto Silva",
    email: "rsilva@alimentos.org",
    telefono: "+57 304 567 8901",
    estado: "Activa",
    fechaRegistro: "2024-01-25",
  },
];

export function Companies() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dinersDialogOpen, setDinersDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  // Calculate stats dynamically
  const stats = {
    total: companies.length,
    juridicas: companies.filter((c) => c.tipo === "Jurídica").length,
    naturales: companies.filter((c) => c.tipo === "Natural").length,
    activas: companies.filter((c) => c.estado === "Activa").length,
  };

  const statsCards = [
    {
      title: "Total Empresas",
      value: stats.total.toString(),
      icon: Building2,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Empresas Jurídicas",
      value: stats.juridicas.toString(),
      icon: Building2,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Empresas Naturales",
      value: stats.naturales.toString(),
      icon: UtensilsCrossed,
      iconBg: "bg-[#f97316]",
    },
    {
      title: "Empresas Activas",
      value: stats.activas.toString(),
      icon: Building2,
      iconBg: "bg-[#10b981]",
    },
  ];

  const filterTabs = [
    { id: "all", label: "Todas", count: stats.total },
    { id: "juridica", label: "Jurídicas", count: stats.juridicas },
    { id: "natural", label: "Naturales", count: stats.naturales },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.nit.includes(searchTerm);

    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "juridica" && company.tipo === "Jurídica") ||
      (selectedTab === "natural" && company.tipo === "Natural");

    return matchesSearch && matchesTab;
  });

  const handleCreateCompany = (formData: CompanyFormData) => {
    const newCompany: Company = {
      id: companies.length + 1,
      nombre: formData.nombre,
      tipo: formData.tipo === "juridica" ? "Jurídica" : "Natural",
      tipoIcon: formData.tipo === "juridica" ? Building2 : UtensilsCrossed,
      tipoColor:
        formData.tipo === "juridica"
          ? "bg-blue-100 text-blue-800"
          : "bg-orange-100 text-orange-800",
      nit: formData.nit,
      ciudad: formData.ciudad,
      direccion: formData.direccion,
      contacto: formData.nombreContacto,
      email: formData.email,
      telefono: formData.telefono,
      estado: "Activa",
      fechaRegistro: new Date().toISOString().split("T")[0],
    };

    setCompanies([...companies, newCompany]);
    setCreateDialogOpen(false);
    toast.success("Empresa registrada exitosamente");
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

  const handleEditCompany = (id: number, data: Partial<Company>) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, ...data } : company
      )
    );
    setEditDialogOpen(false);
    toast.success("Empresa actualizada exitosamente");
  };

  const handleToggleStatus = (id: number) => {
    if (hasActiveDiners(id)) {
      toast.error("No se puede cambiar el estado de esta empresa porque tiene comedores activos");
      return;
    }
    setCompanies(
      companies.map((company) =>
        company.id === id
          ? {
              ...company,
              estado: company.estado === "Activa" ? "Inactiva" : "Activa",
            }
          : company
      )
    );
    toast.success("Estado de la empresa actualizado exitosamente");
  };

  const handleViewDiners = (company: Company) => {
    setSelectedCompany(company);
    setDinersDialogOpen(true);
  };

  // Función para verificar si una empresa tiene comedores activos
  const hasActiveDiners = (companyId: number): boolean => {
    // Mock: simular verificación de comedores activos
    // En producción esto vendría del backend
    const companiesWithActiveDiners = [1, 2, 3]; // IDs de empresas con comedores activos
    return companiesWithActiveDiners.includes(companyId);
  };

  const handleDeleteClick = (company: Company) => {
    if (hasActiveDiners(company.id)) {
      toast.error("No se puede eliminar esta empresa porque tiene comedores activos asignados");
      return;
    }
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleDeleteCompany = () => {
    if (companyToDelete) {
      setCompanies(companies.filter((company) => company.id !== companyToDelete.id));
      setDeleteDialogOpen(false);
      toast.success("Empresa eliminada exitosamente");
      setCompanyToDelete(null);
    }
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Empresas</h1>
        <p className="text-sm text-gray-600">
          Administración de empresas clientes y restaurantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className={`${stat.iconBg} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Register */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre, NIT o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="bg-[#e7000b] hover:bg-[#c10009] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Registrar Empresa
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              selectedTab === tab.id
                ? "bg-[#6366f1] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Companies Table */}
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
                        <TypeIcon
                          className={`w-5 h-5 ${
                            company.tipo === "Cliente"
                              ? "text-blue-600"
                              : "text-orange-600"
                          }`}
                        />
                      </div>
                      <span className="font-medium">{company.nombre}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${company.tipoColor}`}
                    >
                      <TypeIcon className="w-3.5 h-3.5" />
                      {company.tipo}
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
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        company.estado === "Activa"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {company.estado}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                        onClick={() => handleViewCompany(company)}
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                        onClick={() => handleEditClick(company)}
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        onClick={() => handleDeleteClick(company)}
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={company.estado === "Activa"}
                        onCheckedChange={() => handleToggleStatus(company.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      <CreateCompanyDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateCompany}
      />

      <ViewCompanyDialog
        company={selectedCompany}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        onEdit={handleEditClick}
      />

      <EditCompanyDialog
        company={selectedCompany}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditCompany}
      />

      <CompanyDinersDialog
        company={selectedCompany}
        open={dinersDialogOpen}
        onOpenChange={setDinersDialogOpen}
      />

      {/* Delete Confirmation Dialog */}
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
            <AlertDialogAction
              onClick={handleDeleteCompany}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}