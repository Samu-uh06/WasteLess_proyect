// Servicio para gestionar órdenes de producción
export interface EmpleadoPedido {
  nombre: string;
  numeroDocumento: string;
  telefono: string;
  platilloPedido: string;
}

export interface ProductionOrder {
  id: number;
  codigo: string;
  fecha: string;
  comedor: string;
  capacidadComedor: number;
  cantidadPlatillos: number;
  semana: number;
  dia: string;
  tipoComida: string;
  estado: "Pendiente" | "En Producción" | "Completado";
  statusClass: string;
  platillos: {
    id: number;
    nombre: string;
    cantidadPedida: number;
  }[];
  empleados: EmpleadoPedido[];
  fechaCreacion: string;
}

const STORAGE_KEY = 'wasteless_production_orders';

// Cargar órdenes desde localStorage
export function loadProductionOrders(): ProductionOrder[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error al cargar órdenes de producción:', error);
      return [];
    }
  }
  return [];
}

// Guardar órdenes en localStorage
export function saveProductionOrders(orders: ProductionOrder[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error al guardar órdenes de producción:', error);
  }
}

// Crear nueva orden de producción
export function createProductionOrder(params: {
  comedor: string;
  capacidadComedor: number;
  semana: number;
  dia: string;
  tipoComida: string;
  fecha: Date;
  platillos: {
    id: number;
    nombre: string;
    cantidadPedida: number;
  }[];
  empleados: EmpleadoPedido[];
}): ProductionOrder {
  const orders = loadProductionOrders();
  const nextId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  
  const newOrder: ProductionOrder = {
    id: nextId,
    codigo: `OP-${String(nextId).padStart(4, '0')}`,
    fecha: params.fecha.toISOString().split('T')[0],
    comedor: params.comedor,
    capacidadComedor: params.capacidadComedor,
    cantidadPlatillos: params.platillos.reduce((sum, p) => sum + p.cantidadPedida, 0),
    semana: params.semana,
    dia: params.dia,
    tipoComida: params.tipoComida,
    estado: "Pendiente",
    statusClass: "bg-yellow-100 text-yellow-800",
    platillos: params.platillos,
    empleados: params.empleados,
    fechaCreacion: new Date().toISOString(),
  };

  const updatedOrders = [newOrder, ...orders]; // Nueva orden al principio
  saveProductionOrders(updatedOrders);
  
  return newOrder;
}

// Actualizar orden existente
export function updateProductionOrder(id: number, updates: Partial<ProductionOrder>): ProductionOrder {
  const orders = loadProductionOrders();
  const updatedOrders = orders.map(order => 
    order.id === id ? { ...order, ...updates } : order
  );
  saveProductionOrders(updatedOrders);
  
  const updatedOrder = updatedOrders.find(o => o.id === id);
  if (!updatedOrder) {
    throw new Error(`Order with id ${id} not found`);
  }
  return updatedOrder;
}

// Eliminar orden
export function deleteProductionOrder(id: number): void {
  const orders = loadProductionOrders();
  const filteredOrders = orders.filter(order => order.id !== id);
  saveProductionOrders(filteredOrders);
}