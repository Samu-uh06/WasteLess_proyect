import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import { createProductionOrder, type EmpleadoPedido } from "../services/productionOrdersService";
import { loadDishes, type Dish } from "../services/dishesService";
import { toast } from "sonner";

// Mock de empleados para generar datos realistas
const mockEmpleados = [
  { nombre: "Carlos Martínez", numeroDocumento: "1012345678", telefono: "3201234567" },
  { nombre: "María González", numeroDocumento: "1023456789", telefono: "3112345678" },
  { nombre: "Juan Pérez", numeroDocumento: "1034567890", telefono: "3123456789" },
  { nombre: "Ana López", numeroDocumento: "1045678901", telefono: "3134567890" },
  { nombre: "Luis Rodríguez", numeroDocumento: "1056789012", telefono: "3145678901" },
  { nombre: "Laura Sánchez", numeroDocumento: "1067890123", telefono: "3156789012" },
  { nombre: "Pedro Ramírez", numeroDocumento: "1078901234", telefono: "3167890123" },
  { nombre: "Sandra Torres", numeroDocumento: "1089012345", telefono: "3178901234" },
  { nombre: "Miguel Ángel Díaz", numeroDocumento: "1090123456", telefono: "3189012345" },
  { nombre: "Diana Vargas", numeroDocumento: "1101234567", telefono: "3190123456" },
  { nombre: "Jorge Castro", numeroDocumento: "1112345678", telefono: "3201234568" },
  { nombre: "Claudia Moreno", numeroDocumento: "1123456789", telefono: "3212345679" },
  { nombre: "Ricardo Herrera", numeroDocumento: "1134567890", telefono: "3223456780" },
  { nombre: "Patricia Jiménez", numeroDocumento: "1145678901", telefono: "3234567891" },
  { nombre: "Fernando Ortiz", numeroDocumento: "1156789012", telefono: "3245678902" },
  { nombre: "Gabriela Romero", numeroDocumento: "1167890123", telefono: "3256789013" },
  { nombre: "Andrés Silva", numeroDocumento: "1178901234", telefono: "3267890124" },
  { nombre: "Mónica Ruiz", numeroDocumento: "1189012345", telefono: "3278901235" },
  { nombre: "Roberto Méndez", numeroDocumento: "1190123456", telefono: "3289012346" },
  { nombre: "Carolina Cruz", numeroDocumento: "1201234567", telefono: "3290123457" },
  { nombre: "Alejandro Flores", numeroDocumento: "1212345678", telefono: "3301234568" },
  { nombre: "Valentina Ríos", numeroDocumento: "1223456789", telefono: "3312345679" },
  { nombre: "Sebastián Gutiérrez", numeroDocumento: "1234567890", telefono: "3323456780" },
  { nombre: "Isabella Morales", numeroDocumento: "1245678901", telefono: "3334567891" },
  { nombre: "Daniel Reyes", numeroDocumento: "1256789012", telefono: "3345678902" },
  { nombre: "Camila Vega", numeroDocumento: "1267890123", telefono: "3356789013" },
  { nombre: "Mateo Navarro", numeroDocumento: "1278901234", telefono: "3367890124" },
  { nombre: "Sofía Parra", numeroDocumento: "1289012345", telefono: "3378901235" },
  { nombre: "Lucas Medina", numeroDocumento: "1290123456", telefono: "3389012346" },
  { nombre: "Valeria Cortés", numeroDocumento: "1301234567", telefono: "3390123457" },
];

interface PedidoDia {
  cantidad: number;
  estado: "Pendiente" | "Finalizado";
  platillos: {
    id: number;
    cantidadPedida: number;
  }[];
}

interface PedidoSemana {
  semana: number;
  fechaInicio: Date;
  fechaFin: Date;
  dias: {
    lunes: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
    martes: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
    miercoles: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
    jueves: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
    viernes: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
    sabado: {
      desayuno: PedidoDia;
      almuerzo: PedidoDia;
      cena: PedidoDia;
    };
  };
}

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
  almuerzo: "🍽",
  cena: "🌙",
};

function cargarDatosDetalle(locationState: unknown) {
  const state = locationState as { semana?: Record<string,unknown>; comedorNombre?: string } | null;
  let semana = state?.semana;
  let comedor = state?.comedorNombre;

  if (!semana || !comedor) {
    try {
      const stored = localStorage.getItem('orderDetails');
      if (stored) {
        const data = JSON.parse(stored);
        semana = data.semana;
        comedor = data.comedorNombre;
      }
    } catch { /* ignorar */ }
  }

  if (semana && comedor) {
    return {
      semana: {
        ...semana,
        fechaInicio: (semana.fechaInicio instanceof Date) ? semana.fechaInicio : new Date(semana.fechaInicio as string),
        fechaFin:    (semana.fechaFin    instanceof Date) ? semana.fechaFin    : new Date(semana.fechaFin    as string),
      } as PedidoSemana,
      comedorNombre: comedor as string,
    };
  }
  return null;
}

export function OrderDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const [datos] = useState(() => cargarDatosDetalle(location.state));
  const [selectedSemana, setSelectedSemana] = useState<PedidoSemana | null>(datos?.semana ?? null);
  const comedorNombre = datos?.comedorNombre ?? "";
  const [dishes] = useState<Dish[]>(() => loadDishes());

  if (!selectedSemana || !comedorNombre) {
    return (
      <div className="p-8 bg-[#f3f4f6] min-h-screen">
        <div className="text-center pt-20">
          <p className="text-gray-600 mb-4">No hay datos disponibles para mostrar</p>
          <Button onClick={() => navigate("/produccion/pedidos")} className="mt-4">
            Volver a Pedidos
          </Button>
        </div>
      </div>
    );
  }
  const formatDateRange = (start: Date, end: Date) => {
    return `${format(new Date(start), "d MMM", { locale: es })} - ${format(new Date(end), "d MMM yyyy", { locale: es })}`;
  };

  const handleEstadoChange = (
    dia: typeof diasSemana[number],
    comida: typeof tiposComida[number],
    estado: "Pendiente" | "Finalizado"
  ) => {
    const estadoAnterior = selectedSemana!.dias[dia][comida].estado;

    // Actualizar el estado
    setSelectedSemana({
      ...selectedSemana!,
      dias: {
        ...selectedSemana!.dias,
        [dia]: {
          ...selectedSemana!.dias[dia],
          [comida]: {
            ...selectedSemana!.dias[dia][comida],
            estado,
          },
        },
      },
    });

    // Si el nuevo estado es "Finalizado" y el anterior era "Pendiente", crear orden de producción
    if (estado === "Finalizado" && estadoAnterior === "Pendiente") {
      const pedidoDia = selectedSemana!.dias[dia][comida];

      // Calcular fecha específica del día (dentro de la semana)
      const diaIndex = diasSemana.indexOf(dia);
      const fecha = new Date(selectedSemana!.fechaInicio);
      fecha.setDate(fecha.getDate() + diaIndex);

      // Obtener platillos con sus nombres
      const platillos = pedidoDia.platillos.map(p => {
        const dish = dishes.find(d => d.id === p.id);
        return {
          id: p.id,
          nombre: dish?.nombre || "Platillo desconocido",
          cantidadPedida: p.cantidadPedida,
        };
      });

      // Generar empleados para cada platillo pedido
      const empleados: EmpleadoPedido[] = [];

      // Por ahora generamos 24 empleados mock distribuidos entre los platillos
      const totalEmpleados = 24;
      const platillosDisponibles = pedidoDia.platillos.map(p => {
        const dish = dishes.find(d => d.id === p.id);
        return dish?.nombre || "Platillo desconocido";
      });

      // Distribuir los 24 empleados entre los platillos disponibles
      for (let i = 0; i < totalEmpleados; i++) {
        const empleado = mockEmpleados[i % mockEmpleados.length];
        const platilloIndex = i % platillosDisponibles.length;

        empleados.push({
          nombre: empleado.nombre,
          numeroDocumento: empleado.numeroDocumento,
          telefono: empleado.telefono,
          platilloPedido: platillosDisponibles[platilloIndex],
        });
      }

      // Crear orden de producción
      const nuevaOrden = createProductionOrder({
        comedor: comedorNombre,
        capacidadComedor: 150,
        semana: selectedSemana!.semana,
        dia: diasSemanaLabels[dia],
        tipoComida: tiposComidaLabels[comida],
        fecha: fecha,
        platillos: platillos,
        empleados: empleados,
      });

      toast.success(
        `Orden de Producción ${nuevaOrden.codigo} creada para ${diasSemanaLabels[dia]} - ${tiposComidaLabels[comida]}`,
        { duration: 3000 }
      );
    }
  };

  const handleSaveChanges = () => {
    toast.success("Cambios guardados exitosamente");
    navigate("/produccion/pedidos");
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header con botón volver */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="mb-4 hover:bg-gray-100"
          onClick={() => navigate("/produccion/pedidos")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Pedidos
        </Button>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {comedorNombre} - Semana {selectedSemana!.semana}
            </h1>
            <p className="text-sm text-gray-600">
              {formatDateRange(selectedSemana!.fechaInicio, selectedSemana!.fechaFin)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de pedidos */}
      <Card className="border-orange-200 shadow-md">
        <CardContent className="p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-4 bg-orange-600 rounded-full"></div>
            Planificación de Platillos (6 días × 3 comidas)
          </h3>
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
                        const pedidoDia = selectedSemana!.dias[dia][comida];
                        return (
                          <td
                            key={`${dia}-${comida}`}
                            className="border-r last:border-r-0 border-t border-orange-200 p-1.5 align-top"
                          >
                            {/* Selector de estado */}
                            <Select
                              value={pedidoDia.estado}
                              onValueChange={(value: "Pendiente" | "Finalizado") =>
                                handleEstadoChange(dia, comida, value)
                              }
                            >
                              <SelectTrigger className="h-7 text-xs mb-1 border-gray-300">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pendiente">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                    Pendiente
                                  </div>
                                </SelectItem>
                                <SelectItem value="Finalizado">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    Finalizado
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            {/* Cantidad de platillos */}
                            <div className="text-center mb-1">
                              <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                                {pedidoDia.cantidad} ✓
                              </Badge>
                            </div>

                            {/* Lista de platillos con cantidades */}
                            {pedidoDia.platillos.length > 0 && (
                              <div className="flex flex-col gap-0.5">
                                {pedidoDia.platillos.map((platillo) => {
                                  const dish = dishes.find((d) => d.id === platillo.id);
                                  return dish ? (
                                    <div
                                      key={platillo.id}
                                      className="bg-blue-500 text-white text-[10px] px-1.5 py-1 rounded flex items-center justify-between gap-1"
                                    >
                                      <span className="truncate flex-1" title={dish.nombre}>
                                        {dish.nombre}
                                      </span>
                                      <span className="shrink-0 font-bold">
                                        {platillo.cantidadPedida}
                                      </span>
                                    </div>
                                  ) : null;
                                })}
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
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={() => navigate("/produccion/pedidos")}
          className="text-sm h-9"
        >
          Cancelar
        </Button>
        <Button
          className="bg-gradient-to-r from-[#e7000b] to-[#c8000a] hover:from-[#c8000a] hover:to-[#a80009] text-white text-sm h-9"
          onClick={handleSaveChanges}
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}