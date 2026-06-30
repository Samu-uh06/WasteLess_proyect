const BASE_URL = import.meta.env.VITE_API_URL;

export interface Category {
  idCategoria: string;
  nombre: string;
}

export interface Dish {
  id: number;
  nombre: string;
  categoria: string;
  idCategoria: number;
  descripcion: string;
  precio: number;
  calorias: number;
  proteinas?: number;
  carbohidratos?: number;
  grasas?: number;
  imagen: string | null;
  estado: string;
  bebida: boolean;
}

interface ApiDish {
  idPlatillo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  informacionNutricional?: {
    calorias?: number;
    proteinas?: number;
    carbohidratos?: number;
    grasas?: number;
  };
  calorias?: number;
  proteinas?: number;
  carbohidratos?: number;
  grasas?: number;
  imagen: string | null;
  idCategoria: number;
  nombreCategoria?: string;
  estado: string;
  bebida: boolean;
}

const mapDish = (d: ApiDish): Dish => ({
  id: Number(d.idPlatillo),
  nombre: d.nombre ?? "",
  descripcion: d.descripcion ?? "",
  precio: d.precio ?? 0,
  categoria: d.nombreCategoria ?? String(d.idCategoria),
  idCategoria: Number(d.idCategoria),
  calorias: d.informacionNutricional?.calorias ?? d.calorias ?? 0,
  proteinas: d.informacionNutricional?.proteinas ?? d.proteinas ?? 0,
  carbohidratos: d.informacionNutricional?.carbohidratos ?? d.carbohidratos ?? 0,
  grasas: d.informacionNutricional?.grasas ?? d.grasas ?? 0,
  imagen: d.imagen ?? null,
  estado: d.estado ?? "activo",
  bebida: d.bebida ?? false,
});

const getHeaders = (isFormData = false) => {
  const token = sessionStorage.getItem("wasteless_token");
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };
  if (!isFormData) headers["Content-Type"] = "application/json";
  return headers;
};

export async function loadCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/api/dishes/categories`, { headers: getHeaders() });
  const json = await res.json();
  return json.data || [];
}

export async function loadDishes(): Promise<Dish[]> {
  const res = await fetch(`${BASE_URL}/api/dishes`, { headers: getHeaders() });
  const json = await res.json();
  const raw: ApiDish[] = json.data || json;
  return raw.map(mapDish);
}

export async function loadActiveDishes(): Promise<Dish[]> {
  const dishes = await loadDishes();
  return dishes.filter((d) => d.estado === "activo");
}

export async function addDish(data: {
  nombre: string;
  descripcion: string;
  precio: number;
  idCategoria: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  bebida: boolean;
  imagen?: File | null;
}): Promise<Dish> {
  if (data.imagen) {
    const form = new FormData();
    form.append("nombre", data.nombre);
    form.append("descripcion", data.descripcion);
    form.append("precio", String(data.precio));
    form.append("idCategoria", String(data.idCategoria));
    form.append("calorias", String(data.calorias));
    form.append("proteinas", String(data.proteinas));
    form.append("carbohidratos", String(data.carbohidratos));
    form.append("grasas", String(data.grasas));
    form.append("bebida", String(data.bebida));
    form.append("imagen", data.imagen);
    const res = await fetch(`${BASE_URL}/api/dishes`, {
      method: "POST",
      headers: getHeaders(true),
      body: form,
    });
    const json = await res.json();
    return mapDish(json.data || json);
  }

  const res = await fetch(`${BASE_URL}/api/dishes`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      idCategoria: data.idCategoria,
      calorias: data.calorias,
      proteinas: data.proteinas,
      carbohidratos: data.carbohidratos,
      grasas: data.grasas,
      bebida: data.bebida,
    }),
  });
  const json = await res.json();
  return mapDish(json.data || json);
}

export async function updateDish(id: number, data: {
  nombre: string;
  descripcion: string;
  precio: number;
  idCategoria: number;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  bebida: boolean;
  imagen?: File | null;
}): Promise<Dish> {
  if (data.imagen) {
    const form = new FormData();
    form.append("nombre", data.nombre);
    form.append("descripcion", data.descripcion);
    form.append("precio", String(data.precio));
    form.append("idCategoria", String(data.idCategoria));
    form.append("calorias", String(data.calorias));
    form.append("proteinas", String(data.proteinas));
    form.append("carbohidratos", String(data.carbohidratos));
    form.append("grasas", String(data.grasas));
    form.append("bebida", String(data.bebida));
    form.append("imagen", data.imagen);
    const res = await fetch(`${BASE_URL}/api/dishes/${id}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: form,
    });
    const json = await res.json();
    return mapDish(json.data || json);
  }

  const res = await fetch(`${BASE_URL}/api/dishes/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      idCategoria: data.idCategoria,
      calorias: data.calorias,
      proteinas: data.proteinas,
      carbohidratos: data.carbohidratos,
      grasas: data.grasas,
      bebida: data.bebida,
    }),
  });
  const json = await res.json();
  return mapDish(json.data || json);
}

export async function deleteDish(id: number): Promise<void> {
  await fetch(`${BASE_URL}/api/dishes/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
}

export async function toggleDishStatus(id: number, estado: string): Promise<Dish> {
  const res = await fetch(`${BASE_URL}/api/dishes/${id}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ estado }),
  });
  const json = await res.json();
  return mapDish(json.data || json);
}