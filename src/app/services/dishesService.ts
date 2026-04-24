// ============================================================
// src/app/services/dishesService.ts
// Fuente única de verdad para platillos — conecta Dishes,
// MenuManagement y OrderDetails.
// ============================================================

export interface Dish {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  calorias: number;
  proteinas?: number;
  carbohidratos?: number;
  grasas?: number;
  imagen: string;
  estado: string;
}

const STORAGE_KEY = "wasteless_dishes";

// Platillos por defecto (los que ya existían en Dishes.tsx).
// Si localStorage ya tiene datos, estos no se usan.
const defaultDishes: Dish[] = [
  {
    id: 1,
    nombre: "Arroz con Pollo",
    categoria: "Plato Fuerte",
    descripcion: "Delicioso arroz con pollo desmechado y vegetales",
    precio: 15000,
    calorias: 450,
    proteinas: 35,
    carbohidratos: 55,
    grasas: 12,
    imagen:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Ensalada César",
    categoria: "Ensalada",
    descripcion: "Ensalada fresca con pollo, crutones y aderezo césar",
    precio: 12000,
    calorias: 320,
    proteinas: 25,
    carbohidratos: 20,
    grasas: 18,
    imagen:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Bandeja Paisa",
    categoria: "Plato Fuerte",
    descripcion: "Plato típico colombiano con frijoles, carne, chicharrón y más",
    precio: 18000,
    calorias: 850,
    proteinas: 45,
    carbohidratos: 75,
    grasas: 35,
    imagen:
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Sopa de Lentejas",
    categoria: "Sopa",
    descripcion: "Sopa casera de lentejas con vegetales frescos",
    precio: 8000,
    calorias: 280,
    proteinas: 15,
    carbohidratos: 42,
    grasas: 5,
    imagen:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Tiramisu",
    categoria: "Postre",
    descripcion: "Postre italiano con café y mascarpone",
    precio: 10000,
    calorias: 380,
    proteinas: 8,
    carbohidratos: 48,
    grasas: 20,
    imagen:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 6,
    nombre: "Jugo Natural de Naranja",
    categoria: "Bebida",
    descripcion: "Jugo 100% natural recién exprimido",
    precio: 5000,
    calorias: 110,
    proteinas: 2,
    carbohidratos: 26,
    grasas: 0,
    imagen:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 7,
    nombre: "Pescado al Horno",
    categoria: "Plato Fuerte",
    descripcion: "Filete de pescado al horno con limón y hierbas",
    precio: 20000,
    calorias: 350,
    proteinas: 38,
    carbohidratos: 10,
    grasas: 14,
    imagen:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 8,
    nombre: "Pasta Carbonara",
    categoria: "Plato Fuerte",
    descripcion: "Pasta con salsa carbonara cremosa y tocino",
    precio: 16000,
    calorias: 520,
    proteinas: 22,
    carbohidratos: 60,
    grasas: 25,
    imagen:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 9,
    nombre: "Huevos Revueltos",
    categoria: "Desayuno",
    descripcion: "Huevos revueltos con tomate y cebolla",
    precio: 8000,
    calorias: 280,
    proteinas: 18,
    carbohidratos: 8,
    grasas: 20,
    imagen:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 10,
    nombre: "Arepas con Queso",
    categoria: "Desayuno",
    descripcion: "Arepas rellenas de queso derretido",
    precio: 6000,
    calorias: 310,
    proteinas: 12,
    carbohidratos: 45,
    grasas: 10,
    imagen:
      "https://images.unsplash.com/photo-1626613838013-14ce59de6c3c?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 11,
    nombre: "Café con Leche",
    categoria: "Bebida",
    descripcion: "Café colombiano con leche espumosa",
    precio: 3000,
    calorias: 80,
    proteinas: 4,
    carbohidratos: 10,
    grasas: 2,
    imagen:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop",
    estado: "Activo",
  },
  {
    id: 12,
    nombre: "Pan Tostado",
    categoria: "Desayuno",
    descripcion: "Pan integral tostado con mantequilla",
    precio: 4000,
    calorias: 200,
    proteinas: 5,
    carbohidratos: 35,
    grasas: 6,
    imagen:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop",
    estado: "Activo",
  },
];

// ── Lectura ──────────────────────────────────────────────────
export function loadDishes(): Dish[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Dish[];
  } catch (e) {
    console.error("Error al cargar platillos:", e);
  }
  // Primera vez: sembrar los platillos por defecto
  saveDishes(defaultDishes);
  return defaultDishes;
}

// Solo los platillos con estado "Activo"
export function loadActiveDishes(): Dish[] {
  return loadDishes().filter((d) => d.estado === "Activo");
}

// ── Escritura ────────────────────────────────────────────────
export function saveDishes(dishes: Dish[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
  } catch (e) {
    console.error("Error al guardar platillos:", e);
  }
}

export function addDish(dish: Omit<Dish, "id">): Dish {
  const dishes = loadDishes();
  const nextId =
    dishes.length > 0 ? Math.max(...dishes.map((d) => d.id)) + 1 : 1;
  const newDish: Dish = { ...dish, id: nextId };
  saveDishes([...dishes, newDish]);
  return newDish;
}

export function updateDish(id: number, updates: Partial<Dish>): Dish {
  const dishes = loadDishes();
  const updated = dishes.map((d) => (d.id === id ? { ...d, ...updates } : d));
  saveDishes(updated);
  const result = updated.find((d) => d.id === id);
  if (!result) throw new Error(`Platillo ${id} no encontrado`);
  return result;
}

export function deleteDish(id: number): void {
  saveDishes(loadDishes().filter((d) => d.id !== id));
}