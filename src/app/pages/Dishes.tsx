import { useState } from "react";
import { Plus, Search, Eye, Edit, Trash2, UtensilsCrossed, ChefHat, Upload, ChevronDown } from "lucide-react";
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
import { Card, CardContent } from "../components/ui/card";
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
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Switch } from "../components/ui/switch";
import {
  type Dish,
  loadDishes,
  saveDishes,
} from "../services/dishesService";

const categories = [
  { value: "entrada", label: "Entrada" },
  { value: "plato-fuerte", label: "Plato Fuerte" },
  { value: "postre", label: "Postre" },
  { value: "bebida", label: "Bebida" },
  { value: "ensalada", label: "Ensalada" },
  { value: "sopa", label: "Sopa" },
];

export function Dishes() {
  const [dishes, setDishes] = useState<Dish[]>(() => loadDishes());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [dishToDelete, setDishToDelete] = useState<Dish | null>(null);
  const [formData, setFormData] = useState<Partial<Dish>>({});
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Calculate stats
  const stats = {
    total: dishes.length,
    platosFuertes: dishes.filter((d) => d.categoria === "Plato Fuerte").length,
    postres: dishes.filter((d) => d.categoria === "Postre").length,
    bebidas: dishes.filter((d) => d.categoria === "Bebida").length,
  };

  const statsCards = [
    {
      title: "Total Platillos",
      value: stats.total.toString(),
      icon: UtensilsCrossed,
      iconBg: "bg-[#10b981]",
    },
    {
      title: "Platos Fuertes",
      value: stats.platosFuertes.toString(),
      icon: ChefHat,
      iconBg: "bg-[#3b82f6]",
    },
    {
      title: "Postres",
      value: stats.postres.toString(),
      icon: UtensilsCrossed,
      iconBg: "bg-[#f59e0b]",
    },
    {
      title: "Bebidas",
      value: stats.bebidas.toString(),
      icon: UtensilsCrossed,
      iconBg: "bg-[#e7000b]",
    },
  ];

  const filterTabs = [
    { id: "all", label: "Todos", count: stats.total },
    { id: "Plato Fuerte", label: "Platos Fuertes", count: stats.platosFuertes },
    { id: "Postre", label: "Postres", count: stats.postres },
    { id: "Bebida", label: "Bebidas", count: stats.bebidas },
  ];

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      dish.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = selectedTab === "all" || dish.categoria === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleViewDish = (dish: Dish) => {
    setSelectedDish(dish);
    setViewDialogOpen(true);
  };

  const handleEditClick = (dish: Dish) => {
    setSelectedDish(dish);
    setFormData(dish);
    setImagePreview(dish.imagen);
    setViewDialogOpen(false);
    setEditDialogOpen(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Por favor selecciona un archivo de imagen válido");
    }
  };

  const handleEditDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDish) {
      // Editar platillo existente
      const updated = dishes.map((dish) =>
        dish.id === selectedDish.id
          ? { ...dish, ...formData, imagen: imagePreview || dish.imagen }
          : dish
      );
      saveDishes(updated);
      setDishes(updated);
      setEditDialogOpen(false);
      toast.success("Platillo actualizado exitosamente");
    } else {
      // Crear nuevo platillo
      const newDish: Dish = {
        id: dishes.length > 0 ? Math.max(...dishes.map((d) => d.id)) + 1 : 1,
        nombre: formData.nombre || "",
        categoria: formData.categoria || "",
        descripcion: formData.descripcion || "",
        precio: formData.precio || 0,
        calorias: formData.calorias || 0,
        proteinas: formData.proteinas || 0,
        carbohidratos: formData.carbohidratos || 0,
        grasas: formData.grasas || 0,
        imagen:
          imagePreview ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
        estado: "Activo",
      };
      const withNew = [...dishes, newDish];
      saveDishes(withNew);
      setDishes(withNew);
      setEditDialogOpen(false);
      toast.success("Platillo creado exitosamente");
    }
    // Limpiar estados
    setSelectedImage(null);
    setImagePreview(null);
    setFormData({});
    setSelectedDish(null);
  };

  // Verifica si un platillo está asignado a algún menú activo
  const isDishInActiveMenu = (dishId: number): boolean => {
    try {
      const stored = localStorage.getItem("wasteless_menus");
      if (!stored) return false;
      const menus: Array<{
        estado: string;
        dias: Record<string, Record<string, number[]>>;
      }> = JSON.parse(stored);
      return menus
        .filter((m) => m.estado === "Activo")
        .some((m) =>
          Object.values(m.dias).some((dia) =>
            Object.values(dia).some((ids) => ids.includes(dishId))
          )
        );
    } catch {
      return false;
    }
  };

  const handleDeleteClick = (dish: Dish) => {
    if (isDishInActiveMenu(dish.id)) {
      toast.error(
        "No se puede eliminar este platillo porque está asignado a un menú activo"
      );
      return;
    }
    setDishToDelete(dish);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDish = () => {
    if (dishToDelete) {
      const filtered = dishes.filter((dish) => dish.id !== dishToDelete.id);
      saveDishes(filtered);
      setDishes(filtered);
      setDeleteDialogOpen(false);
      toast.success("Platillo eliminado exitosamente");
      setDishToDelete(null);
    }
  };

  const handleToggleStatus = (dish: Dish) => {
    if (isDishInActiveMenu(dish.id)) {
      toast.error(
        "No se puede cambiar el estado de este platillo porque está asignado a un menú activo"
      );
      return;
    }
    const toggled = dishes.map((d) =>
      d.id === dish.id
        ? { ...d, estado: d.estado === "Activo" ? "Inactivo" : "Activo" }
        : d
    );
    saveDishes(toggled);
    setDishes(toggled);
    toast.success("Estado del platillo actualizado exitosamente");
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Platillos</h1>
          <p className="text-sm text-gray-600">
            Crea y administra los platillos que se usarán en los menús
          </p>
        </div>
        <Button
          className="bg-[#e7000b] hover:bg-[#c10009] text-white"
          onClick={() => {
            setSelectedDish(null);
            setFormData({});
            setSelectedImage(null);
            setImagePreview(null);
            setEditDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Crear Platillo
        </Button>
      </div>

      {/* Stats */}
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

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar platillos por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-6 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedTab === tab.id
                ? "bg-[#10b981] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Dishes Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Calorías</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDishes.map((dish) => (
              <TableRow key={dish.id}>
                <TableCell>
                  <img
                    src={dish.imagen}
                    alt={dish.nombre}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{dish.nombre}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {dish.categoria}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {dish.descripcion}
                </TableCell>
                <TableCell>${dish.precio.toLocaleString()}</TableCell>
                <TableCell>{dish.calorias} kcal</TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {dish.estado}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                      onClick={() => handleViewDish(dish)}
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                      onClick={() => handleEditClick(dish)}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                      onClick={() => handleDeleteClick(dish)}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Switch
                      checked={dish.estado === "Activo"}
                      onCheckedChange={() => handleToggleStatus(dish)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {selectedDish && (
                  <>
                    <img
                      src={selectedDish.imagen}
                      alt={selectedDish.nombre}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        {selectedDish.nombre}
                      </DialogTitle>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-800 inline-block mt-1">
                        {selectedDish.categoria}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewDialogOpen(false)}
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
          </DialogHeader>

          {selectedDish && (
            <div className="px-6 py-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Descripción</h3>
                <p className="text-base text-gray-700">{selectedDish.descripcion}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información General
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Precio</p>
                    <p className="text-xl font-bold text-gray-900">
                      ${selectedDish.precio.toLocaleString()} COP
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Calorías</p>
                    <p className="text-xl font-bold text-gray-900">
                      {selectedDish.calorias} kcal
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Información Nutricional
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Proteínas</p>
                    <p className="text-xl font-bold text-blue-900">
                      {selectedDish.proteinas || 0}g
                    </p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Carbohidratos</p>
                    <p className="text-xl font-bold text-green-900">
                      {selectedDish.carbohidratos || 0}g
                    </p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Grasas</p>
                    <p className="text-xl font-bold text-orange-900">
                      {selectedDish.grasas || 0}g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Cerrar
            </Button>
            <Button
              className="bg-[#10b981] hover:bg-[#059669] text-white"
              onClick={() => selectedDish && handleEditClick(selectedDish)}
            >
              Editar Platillo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit / Create Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="border-b border-gray-200 px-6 py-6">
            <DialogTitle className="text-xl font-bold">
              {selectedDish ? "Editar Platillo" : "Crear Nuevo Platillo"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditDish}>
            <div className="px-6 py-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-nombre">Nombre *</Label>
                  <Input
                    id="edit-nombre"
                    value={formData.nombre || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-categoria">Categoría *</Label>
                  <Select
                    value={formData.categoria || ""}
                    onValueChange={(value) =>
                      setFormData({ ...formData, categoria: value })
                    }
                  >
                    <SelectTrigger id="edit-categoria" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.label}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-descripcion">Descripción *</Label>
                <Textarea
                  id="edit-descripcion"
                  value={formData.descripcion || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, descripcion: e.target.value })
                  }
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-precio">Precio (COP) *</Label>
                  <Input
                    id="edit-precio"
                    type="number"
                    value={formData.precio || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, precio: Number(e.target.value) })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-calorias">Calorías *</Label>
                  <Input
                    id="edit-calorias"
                    type="number"
                    value={formData.calorias || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, calorias: Number(e.target.value) })
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="edit-proteinas">Proteínas (g)</Label>
                  <Input
                    id="edit-proteinas"
                    type="number"
                    value={formData.proteinas || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, proteinas: Number(e.target.value) })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-carbohidratos">Carbohidratos (g)</Label>
                  <Input
                    id="edit-carbohidratos"
                    type="number"
                    value={formData.carbohidratos || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        carbohidratos: Number(e.target.value),
                      })
                    }
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-grasas">Grasas (g)</Label>
                  <Input
                    id="edit-grasas"
                    type="number"
                    value={formData.grasas || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, grasas: Number(e.target.value) })
                    }
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="mt-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#10b981] transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedImage(null);
                          setImagePreview(null);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        Eliminar imagen
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Seleccionar imagen del platillo
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Arrastra un archivo aquí o
                        </p>
                      </div>
                      <div>
                        <input
                          type="file"
                          id="image-upload"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          onClick={() =>
                            document.getElementById("image-upload")?.click()
                          }
                          className="bg-[#10b981] hover:bg-[#059669] text-white"
                          size="sm"
                        >
                          Seleccionar archivo
                          <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="border-t border-gray-200 bg-gray-50 px-6 py-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditDialogOpen(false);
                  setSelectedImage(null);
                  setImagePreview(null);
                  setFormData({});
                  setSelectedDish(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#e7000b] hover:bg-[#c40009] text-white"
              >
                {selectedDish ? "Guardar Cambios" : "Crear platillo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar este platillo?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el platillo{" "}
              <span className="font-semibold">{dishToDelete?.nombre}</span> del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDish}
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