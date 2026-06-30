import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Plus, Search, Eye, Pencil, Calendar, UtensilsCrossed, ChefHat, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../components/ui/alert-dialog";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  loadMenus, deleteMenu, toggleMenuStatus,
  type ApiMenu,
} from "../services/weeklyMenuService";

export function MenuManagement() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<ApiMenu[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [menuToDelete, setMenuToDelete] = useState<ApiMenu | null>(null);

  const fetchMenus = useCallback(async () => {
    try {
      const data = await loadMenus();
      setMenus(data);
    } catch {
      toast.error("Error al cargar menús");
    }
  }, []);

  useEffect(() => { fetchMenus(); }, [fetchMenus]);

  const filteredMenus = menus.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.nombreComedor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMenus = menus.length;
  const menusActivos = menus.filter(m => m.estado === "activo").length;
  const comedoresAsignados = new Set(menus.map(m => m.idComedor)).size;

  const formatDateRange = (start: string, end: string) => {
    try {
      return `${format(new Date(start), "d MMM", { locale: es })} - ${format(new Date(end), "d MMM yyyy", { locale: es })}`;
    } catch { return `${start} - ${end}`; }
  };

  const handleToggleStatus = async (menu: ApiMenu) => {
    try {
      const nuevoEstado = menu.estado === "activo" ? "inactivo" : "activo";
      await toggleMenuStatus(menu.idMenu, nuevoEstado);
      await fetchMenus();
      toast.success("Estado del menú actualizado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al cambiar el estado");
    }
  };

  const handleDeleteClick = (menu: ApiMenu) => {
    setMenuToDelete(menu);
    setDeleteDialogOpen(true);
  };

  const handleDeleteMenu = async () => {
    if (!menuToDelete) return;
    try {
      await deleteMenu(menuToDelete.idMenu);
      await fetchMenus();
      toast.success("Menú eliminado exitosamente");
    } catch (err: any) {
      toast.error(err?.message || "Error al eliminar menú");
    } finally {
      setDeleteDialogOpen(false);
      setMenuToDelete(null);
    }
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Menús Semanales</h1>
        <p className="text-sm text-gray-600">Planifica menús para 6 días con 3 comidas diarias</p>
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
            <p className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">{totalMenus}</p>
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
            <p className="text-4xl font-bold bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">{menusActivos}</p>
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
            <p className="text-4xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent">{comedoresAsignados}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search + Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Buscar por nombre, código o comedor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>
        <Button className="bg-[#e7000b] hover:bg-[#c10009] text-white shadow-lg" onClick={() => navigate("/planeacion/menu/crear")}>
          <Plus className="w-4 h-4 mr-2" />Crear
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-bold">Código</TableHead>
              <TableHead className="font-bold">Nombre del Menú</TableHead>
              <TableHead className="font-bold">Semana</TableHead>
              <TableHead className="font-bold">Comedor</TableHead>
              <TableHead className="font-bold">Estado</TableHead>
              <TableHead className="text-center font-bold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMenus.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <ChefHat className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-500">No hay menús registrados</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredMenus.map((menu) => (
                <TableRow key={menu.idMenu} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-xs">{menu.codigo}</Badge>
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
                  <TableCell className="text-sm text-gray-600">{menu.nombreComedor}</TableCell>
                  <TableCell>
                    <Switch
                      checked={menu.estado === "activo"}
                      onCheckedChange={() => handleToggleStatus(menu)}
                      className={menu.estado === "activo" ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-red-500"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => navigate(`/planeacion/menu/ver?id=${menu.idMenu}`)} className="bg-green-400/80 hover:bg-green-500 text-white p-2.5 rounded-xl transition-colors" title="Ver detalles">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => navigate(`/planeacion/menu/editar?id=${menu.idMenu}`)} className="bg-blue-400/80 hover:bg-blue-500 text-white p-2.5 rounded-xl transition-colors" title="Editar">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeleteClick(menu)} className="bg-red-400/80 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors" title="Eliminar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="max-w-[450px]">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción eliminará el menú <span className="font-semibold">{menuToDelete?.nombre}</span>. No podrás recuperarlo.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-sm h-9">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-gradient-to-r from-[#dc2626] to-[#b91c1c] hover:from-[#b91c1c] hover:to-[#991b1b] text-white shadow-lg text-sm h-9" onClick={handleDeleteMenu}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}