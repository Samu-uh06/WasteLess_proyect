const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${sessionStorage.getItem("wasteless_token")}`,
});

export interface DashboardStats {
  pedidos: {
    total: number;
    completados: number;
    enProceso: number;
    pendientes: number;
    variacionPorcentual: number;
  };
  impactoEconomico: {
    totalMesActual: number;
    totalMesAnterior: number;
    variacionPorcentual: number;
  };
  ordenesProduccionHoy: {
    idOrden: number;
    codigo: string;
    diaSemana: string;
    estado: string;
    nombreComedor: string;
    nombreEmpresa: string;
    cantPlatillos: number;
    fechaCreacion: string;
  }[];
  topComedores: {
    idComedor: number | string;
    nombreComedor: string;
    nombreEmpresa: string;
    totalPedidos: number;
    facturacionTotal: number;
    variacionPorcentual: number;
  }[];
  totalFacturadoMes: number;
}

async function handle<T>(res: Response, msg: string): Promise<T> {
  const json = await res.json();
  if (!json.success) throw new Error(json.message || msg);
  return json.data as T;
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${BASE_URL}/api/orders/dashboard`, {
    headers: getHeaders(),
  });
  return handle<DashboardStats>(res, "Error al cargar las estadísticas del dashboard");
}