const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export type EstadoProduccion = "pendiente" | "en_proceso" | "completado";

export interface ApiOrderCompany {
  idEmpresa: number;
  nombre: string;
  totalComedores: number;
}

export interface ApiOrderDiningRoom {
  idComedor: number;
  nombre: string;
  totalSemanas: number;
}

export interface ApiOrderWeek {
  idPedido: number;
  semana: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
}

export interface ApiMealDetail {
  idDetalle: number;
  idPedido: number;
  diaSemana: string;
  tipoComida: string;
  idPlatillo: number;
  nombrePlatillo: string;
  imagen?: string | null;
  estadoProduccion: EstadoProduccion;
  observaciones?: string | null;
}

export interface ApiOrderHeader {
  idPedido: number;
  idMenu: number;
  idEmpresa: number;
  idComedor: number;
  nombreEmpresa: string;
  nombreComedor: string;
  nombreMenu: string;
  semana: string;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}

export interface ApiWeekDetail {
  order: ApiOrderHeader;
  planning: Record<string, Record<string, ApiMealDetail[]>>;
}

async function handle<T>(res: Response, errorMsg: string): Promise<T> {
  const json = await res.json();
  if (!json.success) throw new Error(json.message || errorMsg);
  return json.data as T;
}

function normalizeMeal(raw: any): ApiMealDetail {
  return {
    idDetalle: Number(raw.idDetalle),
    idPedido: Number(raw.idPedido),
    diaSemana: raw.diaSemana,
    tipoComida: raw.tipoComida,
    idPlatillo: Number(raw.idPlatillo),
    nombrePlatillo: raw.nombrePlatillo,
    imagen: raw.imagen ?? null,
    estadoProduccion: raw.estadoProduccion as EstadoProduccion,
    observaciones: raw.observaciones ?? null,
  };
}

function normalizeOrderHeader(raw: any): ApiOrderHeader {
  return {
    idPedido: Number(raw.idPedido),
    idMenu: Number(raw.idMenu),
    idEmpresa: Number(raw.idEmpresa),
    idComedor: Number(raw.idComedor),
    nombreEmpresa: raw.nombreEmpresa,
    nombreComedor: raw.nombreComedor,
    nombreMenu: raw.nombreMenu,
    semana: raw.semana,
    fechaInicio: raw.fechaInicio,
    fechaFin: raw.fechaFin,
    estado: raw.estado,
    fechaCreacion: raw.fechaCreacion,
    fechaActualizacion: raw.fechaActualizacion,
  };
}

export async function loadOrderCompanies(): Promise<ApiOrderCompany[]> {
  const res = await fetch(`${BASE_URL}/api/orders/companies`, { headers: getHeaders() });
  const data = await handle<any[]>(res, "Error al cargar empresas");
  return data.map((c) => ({
    idEmpresa: Number(c.idEmpresa),
    nombre: c.nombre,
    totalComedores: Number(c.totalComedores),
  }));
}

export async function loadOrderDiningRooms(idEmpresa: number): Promise<ApiOrderDiningRoom[]> {
  const res = await fetch(`${BASE_URL}/api/orders/companies/${idEmpresa}/dining-rooms`, {
    headers: getHeaders(),
  });
  const data = await handle<any[]>(res, "Error al cargar comedores");
  return data.map((c) => ({
    idComedor: Number(c.idComedor),
    nombre: c.nombre,
    totalSemanas: Number(c.totalSemanas),
  }));
}

export async function loadOrderWeeks(idComedor: number): Promise<ApiOrderWeek[]> {
  const res = await fetch(`${BASE_URL}/api/orders/dining-rooms/${idComedor}/weeks`, {
    headers: getHeaders(),
  });
  const data = await handle<any[]>(res, "Error al cargar semanas");
  return data.map((w) => ({
    idPedido: Number(w.idPedido),
    semana: w.semana,
    fechaInicio: w.fechaInicio,
    fechaFin: w.fechaFin,
    estado: w.estado,
  }));
}

export async function loadWeekDetail(idPedido: number): Promise<ApiWeekDetail> {
  const res = await fetch(`${BASE_URL}/api/orders/weeks/${idPedido}`, { headers: getHeaders() });
  const raw = await handle<any>(res, "Error al cargar el detalle del pedido");

  const planning: Record<string, Record<string, ApiMealDetail[]>> = {};
  Object.entries(raw.planning || {}).forEach(([dia, tipos]) => {
    planning[dia] = {};
    Object.entries(tipos as Record<string, any[]>).forEach(([tipo, items]) => {
      planning[dia][tipo] = (items || []).map(normalizeMeal);
    });
  });

  return { order: normalizeOrderHeader(raw.order), planning };
}

export async function updateMealStatus(
  idDetalle: number,
  estadoProduccion: EstadoProduccion
): Promise<ApiMealDetail> {
  const res = await fetch(`${BASE_URL}/api/orders/meals/${idDetalle}/status`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ estadoProduccion }),
  });
  const raw = await handle<any>(res, "Error al actualizar el estado del platillo");
  return normalizeMeal(raw);
}