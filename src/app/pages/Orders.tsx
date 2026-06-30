import { useState, useEffect } from "react";
import { Calendar, Building2, UtensilsCrossed, Eye, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";
import {
  loadOrderCompanies,
  loadOrderDiningRooms,
  loadOrderWeeks,
  type ApiOrderCompany,
  type ApiOrderDiningRoom,
  type ApiOrderWeek,
} from "../services/ordersService";

export function Orders() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<ApiOrderCompany[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const [diningRooms, setDiningRooms] = useState<Record<number, ApiOrderDiningRoom[]>>({});
  const [loadingDiningRooms, setLoadingDiningRooms] = useState<Record<number, boolean>>({});

  const [weeks, setWeeks] = useState<Record<number, ApiOrderWeek[]>>({});
  const [loadingWeeks, setLoadingWeeks] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadOrderCompanies()
      .then(setCompanies)
      .catch(() => toast.error("No se pudieron cargar las empresas"))
      .finally(() => setLoadingCompanies(false));
  }, []);

  const ensureDiningRooms = (idEmpresa: number) => {
    if (diningRooms[idEmpresa] || loadingDiningRooms[idEmpresa]) return;
    setLoadingDiningRooms((prev) => ({ ...prev, [idEmpresa]: true }));
    loadOrderDiningRooms(idEmpresa)
      .then((data) => setDiningRooms((prev) => ({ ...prev, [idEmpresa]: data })))
      .catch(() => toast.error("No se pudieron cargar los comedores"))
      .finally(() => setLoadingDiningRooms((prev) => ({ ...prev, [idEmpresa]: false })));
  };

  const ensureWeeks = (idComedor: number) => {
    if (weeks[idComedor] || loadingWeeks[idComedor]) return;
    setLoadingWeeks((prev) => ({ ...prev, [idComedor]: true }));
    loadOrderWeeks(idComedor)
      .then((data) => setWeeks((prev) => ({ ...prev, [idComedor]: data })))
      .catch(() => toast.error("No se pudieron cargar las semanas"))
      .finally(() => setLoadingWeeks((prev) => ({ ...prev, [idComedor]: false })));
  };

  const handleVerDetalle = (week: ApiOrderWeek, comedorNombre: string, empresaNombre: string) => {
    const payload = { weekId: week.idPedido, comedorNombre, empresaNombre };
    localStorage.setItem("orderWeekDetail", JSON.stringify(payload));
    navigate("/produccion/pedidos/detalle", { state: payload });
  };

  const formatDateRange = (start: string, end: string) => {
    return `${format(new Date(start), "d MMM", { locale: es })} - ${format(new Date(end), "d MMM yyyy", { locale: es })}`;
  };

  const totalComedores = companies.reduce((acc, e) => acc + e.totalComedores, 0);
  const totalSemanas = Object.values(weeks).reduce((acc, w) => acc + w.length, 0);

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <p className="text-sm text-gray-600">Gestiona pedidos por empresa, comedor y semana</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Total Empresas</p>
              <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] p-3 rounded-xl shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#2563eb] bg-clip-text text-transparent">
              {companies.length}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Total Comedores</p>
              <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-3 rounded-xl shadow-md">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
              {totalComedores}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Semanas Cargadas</p>
              <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-3 rounded-xl shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
              {totalSemanas}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {loadingCompanies ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Cargando empresas...
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No hay pedidos registrados todavía.
          </div>
        ) : (
          <Accordion
            type="multiple"
            className="w-full"
            onValueChange={(values) => {
              values.forEach((v) => {
                const id = Number(v.replace("empresa-", ""));
                if (!Number.isNaN(id)) ensureDiningRooms(id);
              });
            }}
          >
            {companies.map((empresa) => (
              <AccordionItem key={empresa.idEmpresa} value={`empresa-${empresa.idEmpresa}`}>
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{empresa.nombre}</p>
                      <p className="text-sm text-gray-600">
                        {empresa.totalComedores} comedor{empresa.totalComedores !== 1 ? "es" : ""}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {loadingDiningRooms[empresa.idEmpresa] ? (
                    <div className="flex items-center text-sm text-gray-500 py-4 pl-4">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Cargando comedores...
                    </div>
                  ) : !diningRooms[empresa.idEmpresa]?.length ? (
                    <p className="text-sm text-gray-500 py-4 pl-4">Sin comedores con pedidos.</p>
                  ) : (
                    <Accordion
                      type="multiple"
                      className="w-full"
                      onValueChange={(values) => {
                        values.forEach((v) => {
                          const id = Number(v.replace("comedor-", ""));
                          if (!Number.isNaN(id)) ensureWeeks(id);
                        });
                      }}
                    >
                      {diningRooms[empresa.idEmpresa].map((comedor) => (
                        <AccordionItem
                          key={comedor.idComedor}
                          value={`comedor-${comedor.idComedor}`}
                          className="border-l-2 border-blue-200 ml-4"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-blue-50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                                <UtensilsCrossed className="w-4 h-4 text-orange-600" />
                              </div>
                              <div className="text-left">
                                <p className="font-semibold text-gray-900">{comedor.nombre}</p>
                                <p className="text-xs text-gray-600">
                                  {comedor.totalSemanas} semana{comedor.totalSemanas !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-3">
                            {loadingWeeks[comedor.idComedor] ? (
                              <div className="flex items-center text-sm text-gray-500 py-3 pl-2">
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Cargando semanas...
                              </div>
                            ) : !weeks[comedor.idComedor]?.length ? (
                              <p className="text-sm text-gray-500 py-3 pl-2">Sin semanas registradas.</p>
                            ) : (
                              <div className="space-y-2 mt-2">
                                {weeks[comedor.idComedor].map((week) => (
                                  <div
                                    key={week.idPedido}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                                        <Calendar className="w-4 h-4 text-green-600" />
                                      </div>
                                      <div>
                                        <p className="font-semibold text-sm text-gray-900">{week.semana}</p>
                                        <p className="text-xs text-gray-600">
                                          {formatDateRange(week.fechaInicio, week.fechaFin)}
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-xs h-8 hover:bg-blue-50 hover:border-blue-300"
                                      onClick={() => handleVerDetalle(week, comedor.nombre, empresa.nombre)}
                                    >
                                      <Eye className="w-3 h-3 mr-1" />
                                      Ver Detalle
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}