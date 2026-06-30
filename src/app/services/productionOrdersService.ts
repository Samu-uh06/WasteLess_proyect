const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export interface ProductionOrder {
  idOrden: number;
  codigo: string;
  idPedido: number;
  diaSemana: string;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
  nombreComedor: string;
  nombreEmpresa: string;
  capacidad: number;
  cantPlatillos: number;
  fechaDia: string;
}

async function handle<T>(res: Response, msg: string): Promise<T> {
  const json = await res.json();
  if (!json.success) throw new Error(json.message || msg);
  return json.data as T;
}

export async function fetchProductionOrders(): Promise<ProductionOrder[]> {
  const res = await fetch(`${BASE_URL}/api/production-orders`, { headers: getHeaders() });
  return handle<ProductionOrder[]>(res, "Error al cargar órdenes de producción");
}

export async function createProductionOrder(
  idPedido: number,
  diaSemana: string
): Promise<ProductionOrder> {
  const res = await fetch(`${BASE_URL}/api/production-orders`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ idPedido, diaSemana }),
  });
  return handle<ProductionOrder>(res, "Error al crear orden de producción");
}