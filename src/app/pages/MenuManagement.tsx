import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Eye, Edit, Calendar, UtensilsCrossed, ChefHat, X, Sparkles, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
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
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { toast } from "sonner";
import { Checkbox } from "../components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { DatePicker } from "../components/ui/date-picker";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { ScrollArea } from "../components/ui/scroll-area";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { loadActiveDishes, type Dish } from "../services/dishesService";

// ── Interfaces ───────────────────────────────────────────────────────────────

interface DiaComidas {
  desayuno: number[];
  almuerzo: number[];
  cena: number[];
}

interface MenuSemanal {
  id: number;
  codigo: string;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  comedor: string;
  dias: {
    lunes: DiaComidas;
    martes: DiaComidas;
    miercoles: DiaComidas;
    jueves: DiaComidas;
    viernes: DiaComidas;
    sabado: DiaComidas;
  };
  estado: string;
}

// ── Persistencia de menús ────────────────────────────────────────────────────

const MENUS_KEY = "wasteless_menus";

const diasVacios = (): MenuSemanal["dias"] => ({
  lunes:     { desayuno: [], almuerzo: [], cena: [] },
  martes:    { desayuno: [], almuerzo: [], cena: [] },
  miercoles: { desayuno: [], almuerzo: [], cena: [] },
  jueves:    { desayuno: [], almuerzo: [], cena: [] },
  viernes:   { desayuno: [], almuerzo: [], cena: [] },
  sabado:    { desayuno: [], almuerzo: [], cena: [] },
});

function sanitizeDias(dias: unknown): MenuSemanal["dias"] {
  const base = diasVacios();
  if (!dias || typeof dias !== "object") return base;
  const d = dias as Record<string, unknown>;
  (["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"] as const).forEach((dia) => {
    const slot = d[dia];
    if (slot && typeof slot === "object") {
      const s = slot as Record<string, unknown>;
      base[dia].desayuno = Array.isArray(s.desayuno) ? s.desayuno : [];
      base[dia].almuerzo = Array.isArray(s.almuerzo) ? s.almuerzo : [];
      base[dia].cena     = Array.isArray(s.cena)     ? s.cena     : [];
    }
  });
  return base;
}

function loadMenusFromStorage(fallback: MenuSemanal[]): MenuSemanal[] {
  try {
    const stored = localStorage.getItem(MENUS_KEY);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored);
    return parsed.map((m: MenuSemanal) => ({
      ...m,
      fechaInicio: new Date(m.fechaInicio),
      fechaFin: new Date(m.fechaFin),
      dias: sanitizeDias(m.dias),
    }));
  } catch {
    return fallback;
  }
}

function saveMenusToStorage(menus: MenuSemanal[]): void {
  try {
    localStorage.setItem(MENUS_KEY, JSON.stringify(menus));
  } catch (e) {
    console.error("Error al guardar menús:", e);
  }
}

// ── Datos de ejemplo (usados solo la primera vez, antes de que exista localStorage) ──

const mockMenus: MenuSemanal[] = [
  {
    id: 1,
    codigo: "MEN-001",
    nombre: "Menú Ejecutivo Semana 1",
    fechaInicio: new Date(2025, 2, 3),
    fechaFin: new Date(2025, 2, 8),
    comedor: "Comedor Central - Ecopetrol",
    dias: {
      lunes: { desayuno: [9, 11, 12], almuerzo: [1, 2, 6], cena: [4, 5] },
      martes: { desayuno: [10, 11], almuerzo: [3, 2, 6], cena: [7, 5] },
      miercoles: { desayuno: [9, 11, 12], almuerzo: [8, 2, 6], cena: [1, 4, 5] },
      jueves: { desayuno: [10, 11], almuerzo: [7, 2, 6], cena: [3, 4] },
      viernes: { desayuno: [9, 11, 12], almuerzo: [1, 2, 6], cena: [8, 5] },
      sabado: { desayuno: [10, 11, 12], almuerzo: [3, 2, 6], cena: [7, 4, 5] },
    },
    estado: "Activo",
  },
  {
    id: 2,
    codigo: "MEN-002",
    nombre: "Menú Saludable Semana 2",
    fechaInicio: new Date(2025, 2, 10),
    fechaFin: new Date(2025, 2, 15),
    comedor: "Comedor Universidad Nacional",
    dias: {
      lunes: { desayuno: [10, 11], almuerzo: [8, 2, 6], cena: [4, 5] },
      martes: { desayuno: [9, 11, 12], almuerzo: [1, 2, 6], cena: [7, 5] },
      miercoles: { desayuno: [10, 11], almuerzo: [3, 2, 6], cena: [8, 4] },
      jueves: { desayuno: [9, 11, 12], almuerzo: [7, 2, 6], cena: [1, 5] },
      viernes: { desayuno: [10, 11], almuerzo: [8, 2, 6], cena: [3, 4, 5] },
      sabado: { desayuno: [9, 11, 12], almuerzo: [1, 2, 6], cena: [7, 4] },
    },
    estado: "Activo",
  },
];

const mockComedores = [
  { id: 1, nombre: "Comedor Central - Ecopetrol", empresa: "Ecopetrol S.A." },
  { id: 2, nombre: "Comedor Universidad Nacional", empresa: "Universidad Nacional" },
  { id: 3, nombre: "Comedor Hospital San Ignacio", empresa: "Hospital San Ignacio" },
];

const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"] as const;
const tiposComida = ["desayuno", "almuerzo", "cena"] as const;

const diasSemanaLabels: Record<typeof diasSemana[number], string> = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
};

const tiposComidaLabels: Record<typeof tiposComida[number], string> = {
  desayuno: "Desayuno",
  almuerzo: "Almuerzo",
  cena: "Cena",
};

const tiposComidaIcons: Record<typeof tiposComida[number], string> = {
  desayuno: "☀️",
  almuerzo: "🍽️",
  cena: "🌙",
};

// ── Componente ───────────────────────────────────────────────────────────────

export function MenuManagement() {
  const navigate = useNavigate();

  const [menus, setMenus] = useState<MenuSemanal[]>(() =>
    loadMenusFromStorage(mockMenus)
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuSemanal | null>(null);
  const [menuToDelete, setMenuToDelete] = useState<MenuSemanal | null>(null);
  const [formData, setFormData] = useState<Partial<MenuSemanal>>({});

  // Platillos sincronizados desde Gestión de Platillos
  const [availableDishes, setAvailableDishes] = useState<Dish[]>(() =>
    loadActiveDishes()
  );

  // Recargar platillos al volver el foco a esta ventana
  // (por si el usuario fue a Gestión de Platillos y creó/editó uno)
  useEffect(() => {
    const onFocus = () => setAvailableDishes(loadActiveDishes());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const filteredMenus = menus.filter(
    (menu) =>
      menu.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.comedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasActiveOrders = (menuId: number): boolean => {
    const menusWithActiveOrders = [1, 2];
    return menusWithActiveOrders.includes(menuId);
  };

  const getTotalPlatillos = (menu: MenuSemanal) => {
    if (!menu.dias) return 0;
    let total = 0;
    diasSemana.forEach((dia) => {
      if (!menu.dias[dia]) return;
      tiposComida.forEach((comida) => {
        total += menu.dias[dia][comida]?.length ?? 0;
      });
    });
    return total;
  };

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`;
  };

  const generateCodigo = () => {
    const maxId = menus.length > 0 ? Math.max(...menus.map((m) => m.id)) : 0;
    return `MEN-${String(maxId + 1).padStart(3, "0")}`;
  };

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleViewMenu = (menu: MenuSemanal) => {
    navigate(`/planeacion/menu/ver?id=${menu.id}`);
  };

  const handleEditClick = (menu: MenuSemanal) => {
    navigate(`/planeacion/menu/editar?id=${menu.id}`);
  };

  const handleToggleDish = (
    dia: typeof diasSemana[number],
    comida: typeof tiposComida[number],
    dishId: number
  ) => {
    setFormData((prev) => {
      const currentDias = prev.dias || {
        lunes: { desayuno: [], almuerzo: [], cena: [] },
        martes: { desayuno: [], almuerzo: [], cena: [] },
        miercoles: { desayuno: [], almuerzo: [], cena: [] },
        jueves: { desayuno: [], almuerzo: [], cena: [] },
        viernes: { desayuno: [], almuerzo: [], cena: [] },
        sabado: { desayuno: [], almuerzo: [], cena: [] },
      };
      const currentComida = currentDias[dia][comida] || [];
      const newComida = currentComida.includes(dishId)
        ? currentComida.filter((id) => id !== dishId)
        : [...currentComida, dishId];
      return {
        ...prev,
        dias: {
          ...currentDias,
          [dia]: { ...currentDias[dia], [comida]: newComida },
        },
      };
    });
  };

  const handleEditMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMenu) {
      // Editar menú existente
      const updated = menus.map((menu) =>
        menu.id === selectedMenu.id
          ? ({ ...menu, ...formData } as MenuSemanal)
          : menu
      );
      saveMenusToStorage(updated);
      setMenus(updated);
      setEditDialogOpen(false);
      toast.success("Menú actualizado exitosamente");
    } else {
      // Crear nuevo menú
      const newMenu: MenuSemanal = {
        id: Math.max(...menus.map((m) => m.id), 0) + 1,
        codigo: generateCodigo(),
        nombre: formData.nombre || "",
        fechaInicio: formData.fechaInicio || new Date(),
        fechaFin: formData.fechaFin || addDays(new Date(), 5),
        comedor: formData.comedor || "",
        dias: formData.dias || {
          lunes: { desayuno: [], almuerzo: [], cena: [] },
          martes: { desayuno: [], almuerzo: [], cena: [] },
          miercoles: { desayuno: [], almuerzo: [], cena: [] },
          jueves: { desayuno: [], almuerzo: [], cena: [] },
          viernes: { desayuno: [], almuerzo: [], cena: [] },
          sabado: { desayuno: [], almuerzo: [], cena: [] },
        },
        estado: "Activo",
      };
      const withNew = [...menus, newMenu];
      saveMenusToStorage(withNew);
      setMenus(withNew);
      setEditDialogOpen(false);
      toast.success("✅ Menú semanal creado exitosamente");
    }
    setFormData({});
    setSelectedMenu(null);
  };

  const handleDeleteClick = (menu: MenuSemanal) => {
    if (hasActiveOrders(menu.id)) {
      toast.error("No se puede eliminar este menú porque tiene pedidos activos");
      return;
    }
    setMenuToDelete(menu);
    setDeleteDialogOpen(true);
  };

  const handleDeleteMenu = () => {
    if (menuToDelete) {
      const filtered = menus.filter((menu) => menu.id !== menuToDelete.id);
      saveMenusToStorage(filtered);
      setMenus(filtered);
      setDeleteDialogOpen(false);
      toast.success("Menú eliminado exitosamente");
    }
    setMenuToDelete(null);
  };

  const handleToggleStatus = (menuId: number) => {
    if (hasActiveOrders(menuId)) {
      toast.error("No se puede cambiar el estado de este menú porque tiene pedidos activos");
      return;
    }
    const toggled = menus.map((menu) =>
      menu.id === menuId
        ? { ...menu, estado: menu.estado === "Activo" ? "Inactivo" : "Activo" }
        : menu
    );
    saveMenusToStorage(toggled);
    setMenus(toggled);
    toast.success("Estado del menú actualizado exitosamente");
  };

  const totalMenus = menus.length;
  const menusActivos = menus.filter((m) => m.estado === "Activo").length;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Menús Semanales</h1>
          <p className="text-sm text-gray-600">
            Planifica menús para 6 días con 3 comidas diarias
          </p>
        </div>
        <Button
          className="bg-[#e7000b] hover:bg-[#c10009] text-white shadow-lg"
          onClick={() => navigate("/planeacion/menu/crear")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Menú Semanal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Total Menús</p>
              <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-xl shadow-md">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
              {totalMenus}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Menús Activos</p>
              <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-3 rounded-xl shadow-md">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
              {menusActivos}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Comedores Asignados</p>
              <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-3 rounded-xl shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent">
              {mockComedores.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar por nombre, código o comedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>
      </div>

      {/* Menus Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-bold">Código</TableHead>
              <TableHead className="font-bold">Nombre del Menú</TableHead>
              <TableHead className="font-bold">Semana</TableHead>
              <TableHead className="font-bold">Comedor</TableHead>
              <TableHead className="font-bold">Platillos</TableHead>
              <TableHead className="font-bold">Estado</TableHead>
              <TableHead className="text-center font-bold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMenus.map((menu) => (
              <TableRow key={menu.id} className="hover:bg-gray-50 transition-colors">
                <TableCell>
                  <Badge variant="outline" className="font-mono text-xs">
                    {menu.codigo}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      <ChefHat className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold text-gray-900">{menu.nombre}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {formatDateRange(menu.fechaInicio, menu.fechaFin)}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {menu.comedor}
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {getTotalPlatillos(menu)} platillos
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      menu.estado === "Activo"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }
                  >
                    {menu.estado}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-9 w-9 p-0 rounded-lg"
                      onClick={() => handleViewMenu(menu)}
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 h-9 w-9 p-0 rounded-lg"
                      onClick={() => handleEditClick(menu)}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Switch
                      checked={menu.estado === "Activo"}
                      onCheckedChange={() => handleToggleStatus(menu.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 w-9 p-0 rounded-lg"
                      onClick={() => handleDeleteClick(menu)}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit / Create Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-[1400px] max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-50 to-white">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-blue-600" />
              {selectedMenu ? "Editar Menú Semanal" : "Crear Nuevo Menú Semanal"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditMenu}>
            <ScrollArea className="h-[calc(90vh-140px)]">
              <div className="px-6 py-5 space-y-5">
                {/* Información básica */}
                <Card className="border-blue-200 shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                      Información General
                    </h3>
                    <div className="grid grid-cols-4 gap-3">
                      <div>
                        <Label htmlFor="nombre" className="text-xs font-semibold text-gray-700 mb-1 block">
                          Nombre del Menú *
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre || ""}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          placeholder="Ej: Menú Ejecutivo Semana 1"
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fechaInicio" className="text-xs font-semibold text-gray-700 mb-1 block">
                          Fecha Inicio *
                        </Label>
                        <DatePicker
                          date={formData.fechaInicio}
                          onDateChange={(date) => setFormData({ ...formData, fechaInicio: date })}
                          placeholder="Selecciona fecha inicio"
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fechaFin" className="text-xs font-semibold text-gray-700 mb-1 block">
                          Fecha Fin *
                        </Label>
                        <DatePicker
                          date={formData.fechaFin}
                          onDateChange={(date) => setFormData({ ...formData, fechaFin: date })}
                          placeholder="Selecciona fecha fin"
                          className="h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="comedor" className="text-xs font-semibold text-gray-700 mb-1 block">
                          Comedor *
                        </Label>
                        <Select
                          value={formData.comedor || ""}
                          onValueChange={(value) => setFormData({ ...formData, comedor: value })}
                        >
                          <SelectTrigger id="comedor" className="h-9 text-sm">
                            <SelectValue placeholder="Seleccione comedor" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockComedores.map((comedor) => (
                              <SelectItem key={comedor.id} value={comedor.nombre}>
                                {comedor.nombre}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabla de platillos */}
                <Card className="border-orange-200 shadow-sm">
                  <CardContent className="p-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
                      Planificación de Platillos (6 días × 3 comidas)
                      <span className="ml-auto text-xs font-normal text-gray-500">
                        {availableDishes.length} platillo{availableDishes.length !== 1 ? "s" : ""} disponible{availableDishes.length !== 1 ? "s" : ""}
                      </span>
                    </h3>

                    {availableDishes.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        No hay platillos activos. Ve a{" "}
                        <span className="font-semibold text-blue-600">Gestión de Platillos</span>{" "}
                        para agregar algunos.
                      </div>
                    ) : (
                      <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-orange-50">
                                <th className="border-r border-orange-200 p-2 text-left text-xs font-bold text-gray-700 w-28 sticky left-0 bg-orange-50 z-10">
                                  Comida
                                </th>
                                {diasSemana.map((dia) => (
                                  <th
                                    key={dia}
                                    className="border-r last:border-r-0 border-orange-200 p-2 text-center text-xs font-bold text-gray-700 min-w-[140px]"
                                  >
                                    {diasSemanaLabels[dia]}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {tiposComida.map((comida, idx) => (
                                <tr key={comida} className={idx % 2 === 0 ? "bg-white" : "bg-orange-50/30"}>
                                  <td className="border-r border-t border-orange-200 p-2 font-semibold text-xs text-gray-700 sticky left-0 bg-gradient-to-r from-orange-50 to-white z-10">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-sm">{tiposComidaIcons[comida]}</span>
                                      <span className="text-xs">{tiposComidaLabels[comida]}</span>
                                    </div>
                                  </td>
                                  {diasSemana.map((dia) => {
                                    const selectedDishes = formData.dias?.[dia]?.[comida] || [];
                                    return (
                                      <td
                                        key={`${dia}-${comida}`}
                                        className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top"
                                      >
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <Button
                                              type="button"
                                              variant="outline"
                                              className="w-full text-xs h-auto py-1.5 px-2 hover:bg-blue-50 hover:border-blue-300 transition-colors font-normal"
                                            >
                                              {selectedDishes.length > 0
                                                ? `${selectedDishes.length} ✓`
                                                : "+"}
                                            </Button>
                                          </PopoverTrigger>
                                          <PopoverContent className="w-[340px] p-0" align="start">
                                            <div className="bg-gradient-to-r from-blue-50 to-white p-3 border-b">
                                              <h4 className="font-bold text-xs flex items-center gap-1.5">
                                                <span className="text-base">{tiposComidaIcons[comida]}</span>
                                                {diasSemanaLabels[dia]} - {tiposComidaLabels[comida]}
                                              </h4>
                                              <p className="text-xs text-gray-600 mt-0.5">
                                                {selectedDishes.length} platillo{selectedDishes.length !== 1 ? "s" : ""}
                                              </p>
                                            </div>
                                            <ScrollArea className="h-[320px]">
                                              <div className="p-2 space-y-1">
                                                {availableDishes.map((dish) => (
                                                  <div
                                                    key={dish.id}
                                                    className={`flex items-start space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer border ${
                                                      selectedDishes.includes(dish.id)
                                                        ? "bg-blue-50 border-blue-200"
                                                        : "border-transparent"
                                                    }`}
                                                    onClick={() => handleToggleDish(dia, comida, dish.id)}
                                                  >
                                                    <Checkbox
                                                      id={`${dia}-${comida}-${dish.id}`}
                                                      checked={selectedDishes.includes(dish.id)}
                                                      onCheckedChange={() =>
                                                        handleToggleDish(dia, comida, dish.id)
                                                      }
                                                      className="mt-0.5"
                                                    />
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                      <img
                                                        src={dish.imagen}
                                                        alt={dish.nombre}
                                                        className="w-10 h-10 rounded-lg object-cover shadow-sm"
                                                      />
                                                      <div className="flex-1 min-w-0">
                                                        <p className="text-xs font-semibold text-gray-900 truncate">
                                                          {dish.nombre}
                                                        </p>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                          <Badge
                                                            variant="outline"
                                                            className="text-[10px] px-1 py-0"
                                                          >
                                                            {dish.categoria}
                                                          </Badge>
                                                          <span className="text-[10px] text-gray-500">
                                                            ${dish.precio.toLocaleString()}
                                                          </span>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </ScrollArea>
                                          </PopoverContent>
                                        </Popover>
                                        {selectedDishes.length > 0 && (
                                          <div className="mt-1">
                                            <div className="flex flex-col gap-0.5">
                                              {selectedDishes.map((dishId) => {
                                                const dish = availableDishes.find((d) => d.id === dishId);
                                                return dish ? (
                                                  <div
                                                    key={dishId}
                                                    className="bg-blue-500 text-white text-[10px] px-1.5 py-1 rounded flex items-center justify-between gap-1 group hover:bg-blue-600 transition-colors"
                                                  >
                                                    <span className="truncate flex-1" title={dish.nombre}>
                                                      {dish.nombre}
                                                    </span>
                                                    <button
                                                      type="button"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleDish(dia, comida, dishId);
                                                        toast.success(`${dish.nombre} eliminado`);
                                                      }}
                                                      className="shrink-0 hover:bg-red-500 rounded p-0.5 transition-colors"
                                                    >
                                                      <Trash2 className="w-3 h-3" />
                                                    </button>
                                                  </div>
                                                ) : null;
                                              })}
                                            </div>
                                          </div>
                                        )}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>

            <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setFormData({});
                  setSelectedMenu(null);
                }}
                className="text-sm h-9"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white shadow-lg text-sm h-9"
              >
                {selectedMenu ? "💾 Guardar" : "✨ Crear"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el menú seleccionado. No podrás recuperarlo después.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-sm h-9">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white shadow-lg text-sm h-9"
              onClick={handleDeleteMenu}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}