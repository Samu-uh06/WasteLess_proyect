import { useState } from "react";
import { Calendar, Building2, UtensilsCrossed, Eye } from "lucide-react";
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

interface Comedor {
  id: number;
  nombre: string;
  semanas: PedidoSemana[];
}

interface Empresa {
  id: number;
  nombre: string;
  comedores: Comedor[];
}

const mockData: Empresa[] = [
  {
    id: 1,
    nombre: "Ecopetrol S.A.",
    comedores: [
      {
        id: 1,
        nombre: "Comedor Central - Ecopetrol",
        semanas: [
          {
            semana: 1,
            fechaInicio: new Date(2025, 2, 3),
            fechaFin: new Date(2025, 2, 8),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 10 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 25 },
                    { id: 2, cantidadPedida: 18 },
                    { id: 6, cantidadPedida: 30 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 12 },
                    { id: 5, cantidadPedida: 8 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 22 },
                    { id: 11, cantidadPedida: 25 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 20 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 28 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 14 },
                    { id: 5, cantidadPedida: 10 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 22 },
                    { id: 12, cantidadPedida: 12 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 23 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 26 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 20 },
                    { id: 11, cantidadPedida: 24 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 19 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 13 },
                    { id: 4, cantidadPedida: 10 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 21 },
                    { id: 12, cantidadPedida: 11 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 24 },
                    { id: 2, cantidadPedida: 19 },
                    { id: 6, cantidadPedida: 29 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 15 },
                    { id: 5, cantidadPedida: 9 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 23 },
                    { id: 11, cantidadPedida: 26 },
                    { id: 12, cantidadPedida: 13 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 25 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 16 },
                    { id: 4, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
            },
          },
          {
            semana: 2,
            fechaInicio: new Date(2025, 2, 10),
            fechaFin: new Date(2025, 2, 15),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 23 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 22 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 24 },
                    { id: 12, cantidadPedida: 14 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 26 },
                    { id: 2, cantidadPedida: 20 },
                    { id: 6, cantidadPedida: 31 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 5, cantidadPedida: 8 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 19 },
                    { id: 11, cantidadPedida: 25 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 24 },
                    { id: 2, cantidadPedida: 18 },
                    { id: 6, cantidadPedida: 29 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 14 },
                    { id: 4, cantidadPedida: 9 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 22 },
                    { id: 12, cantidadPedida: 12 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 28 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 20 },
                    { id: 11, cantidadPedida: 26 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 23 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 30 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 12 },
                    { id: 4, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 21 },
                    { id: 12, cantidadPedida: 11 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 25 },
                    { id: 2, cantidadPedida: 19 },
                    { id: 6, cantidadPedida: 32 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 14 },
                    { id: 4, cantidadPedida: 8 },
                  ],
                },
              },
            },
          },
          {
            semana: 3,
            fechaInicio: new Date(2025, 2, 17),
            fechaFin: new Date(2025, 2, 22),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 19 },
                    { id: 12, cantidadPedida: 9 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 26 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 20 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 18 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 24 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 21 },
                    { id: 12, cantidadPedida: 10 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 20 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 25 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 7 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 22 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 17 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 23 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 8 },
                    { id: 4, cantidadPedida: 6 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 11 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 22 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 12 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 19 },
                    { id: 11, cantidadPedida: 24 },
                    { id: 12, cantidadPedida: 12 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 19 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 22 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
            },
          },
          {
            semana: 4,
            fechaInicio: new Date(2025, 2, 24),
            fechaFin: new Date(2025, 2, 29),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 18 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 19 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 24 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 19 },
                    { id: 12, cantidadPedida: 10 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 20 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 25 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 20 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 26 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 7 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 21 },
                    { id: 12, cantidadPedida: 11 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 18 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 23 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 22 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 20 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 17 },
                    { id: 12, cantidadPedida: 9 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 22 },
                    { id: 2, cantidadPedida: 18 },
                    { id: 6, cantidadPedida: 28 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 12 },
                    { id: 4, cantidadPedida: 7 },
                  ],
                },
              },
            },
          },
        ],
      },
      {
        id: 2,
        nombre: "Comedor Norte - Ecopetrol",
        semanas: [
          {
            semana: 1,
            fechaInicio: new Date(2025, 2, 3),
            fechaFin: new Date(2025, 2, 8),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 12 },
                    { id: 11, cantidadPedida: 15 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 18 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 20 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 18 },
                    { id: 12, cantidadPedida: 8 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 17 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 9 },
                    { id: 4, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 19 },
                    { id: 12, cantidadPedida: 9 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 14 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 17 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 6 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 16 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 17 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 21 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 12 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 10 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 10 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
            },
          },
          {
            semana: 2,
            fechaInicio: new Date(2025, 2, 10),
            fechaFin: new Date(2025, 2, 15),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 11 },
                    { id: 11, cantidadPedida: 14 },
                    { id: 12, cantidadPedida: 7 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 16 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 20 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 12 },
                    { id: 11, cantidadPedida: 15 },
                    { id: 12, cantidadPedida: 8 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 17 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 7 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 17 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 16 },
                    { id: 12, cantidadPedida: 9 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 18 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 17 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 20 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 6 },
                  ],
                },
              },
            },
          },
          {
            semana: 3,
            fechaInicio: new Date(2025, 2, 17),
            fechaFin: new Date(2025, 2, 22),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 10 },
                    { id: 11, cantidadPedida: 13 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 14 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 17 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 7 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 12 },
                    { id: 11, cantidadPedida: 15 },
                    { id: 12, cantidadPedida: 7 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 13 },
                    { id: 2, cantidadPedida: 10 },
                    { id: 6, cantidadPedida: 16 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 11 },
                    { id: 11, cantidadPedida: 14 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 8 },
                    { id: 4, cantidadPedida: 6 },
                    { id: 5, cantidadPedida: 3 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 16 },
                    { id: 12, cantidadPedida: 8 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 14 },
                    { id: 2, cantidadPedida: 10 },
                    { id: 6, cantidadPedida: 17 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 7 },
                    { id: 4, cantidadPedida: 5 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 12 },
                    { id: 11, cantidadPedida: 15 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 17 },
                    { id: 12, cantidadPedida: 9 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 9 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 7 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
            },
          },
          {
            semana: 4,
            fechaInicio: new Date(2025, 2, 24),
            fechaFin: new Date(2025, 2, 29),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 9 },
                    { id: 11, cantidadPedida: 12 },
                    { id: 12, cantidadPedida: 6 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 13 },
                    { id: 2, cantidadPedida: 10 },
                    { id: 6, cantidadPedida: 16 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 6 },
                    { id: 5, cantidadPedida: 3 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 11 },
                    { id: 11, cantidadPedida: 14 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 8 },
                    { id: 5, cantidadPedida: 5 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 10 },
                    { id: 11, cantidadPedida: 13 },
                    { id: 12, cantidadPedida: 7 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 14 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 17 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 9 },
                    { id: 4, cantidadPedida: 6 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 12 },
                    { id: 11, cantidadPedida: 15 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 2, cantidadPedida: 9 },
                    { id: 6, cantidadPedida: 16 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 7 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 11 },
                    { id: 11, cantidadPedida: 14 },
                    { id: 12, cantidadPedida: 8 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 15 },
                    { id: 2, cantidadPedida: 11 },
                    { id: 6, cantidadPedida: 18 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 8 },
                    { id: 4, cantidadPedida: 6 },
                    { id: 5, cantidadPedida: 4 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 13 },
                    { id: 11, cantidadPedida: 16 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 16 },
                    { id: 2, cantidadPedida: 12 },
                    { id: 6, cantidadPedida: 19 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 5 },
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    nombre: "Universidad Nacional",
    comedores: [
      {
        id: 3,
        nombre: "Comedor Universidad Nacional",
        semanas: [
          {
            semana: 1,
            fechaInicio: new Date(2025, 2, 3),
            fechaFin: new Date(2025, 2, 8),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 25 },
                    { id: 11, cantidadPedida: 30 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 35 },
                    { id: 2, cantidadPedida: 28 },
                    { id: 6, cantidadPedida: 40 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 20 },
                    { id: 5, cantidadPedida: 15 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 22 },
                    { id: 11, cantidadPedida: 28 },
                    { id: 12, cantidadPedida: 18 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 32 },
                    { id: 2, cantidadPedida: 26 },
                    { id: 6, cantidadPedida: 38 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 18 },
                    { id: 5, cantidadPedida: 12 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 24 },
                    { id: 11, cantidadPedida: 29 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 30 },
                    { id: 2, cantidadPedida: 24 },
                    { id: 6, cantidadPedida: 36 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 16 },
                    { id: 4, cantidadPedida: 14 },
                    { id: 5, cantidadPedida: 10 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 21 },
                    { id: 11, cantidadPedida: 27 },
                    { id: 12, cantidadPedida: 17 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 28 },
                    { id: 2, cantidadPedida: 22 },
                    { id: 6, cantidadPedida: 34 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 15 },
                    { id: 4, cantidadPedida: 11 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Finalizado",
                  platillos: [
                    { id: 10, cantidadPedida: 23 },
                    { id: 11, cantidadPedida: 28 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 31 },
                    { id: 2, cantidadPedida: 25 },
                    { id: 6, cantidadPedida: 37 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 17 },
                    { id: 5, cantidadPedida: 13 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Finalizado",
                  platillos: [
                    { id: 9, cantidadPedida: 20 },
                    { id: 11, cantidadPedida: 26 },
                    { id: 12, cantidadPedida: 16 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 29 },
                    { id: 2, cantidadPedida: 23 },
                    { id: 6, cantidadPedida: 35 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 19 },
                    { id: 4, cantidadPedida: 13 },
                    { id: 5, cantidadPedida: 9 },
                  ],
                },
              },
            },
          },
          {
            semana: 2,
            fechaInicio: new Date(2025, 2, 10),
            fechaFin: new Date(2025, 2, 15),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 19 },
                    { id: 11, cantidadPedida: 25 },
                    { id: 12, cantidadPedida: 15 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 27 },
                    { id: 2, cantidadPedida: 21 },
                    { id: 6, cantidadPedida: 33 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 14 },
                    { id: 5, cantidadPedida: 10 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 22 },
                    { id: 11, cantidadPedida: 27 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 30 },
                    { id: 2, cantidadPedida: 24 },
                    { id: 6, cantidadPedida: 36 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 16 },
                    { id: 5, cantidadPedida: 11 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 20 },
                    { id: 11, cantidadPedida: 26 },
                    { id: 12, cantidadPedida: 16 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 28 },
                    { id: 2, cantidadPedida: 22 },
                    { id: 6, cantidadPedida: 34 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 15 },
                    { id: 4, cantidadPedida: 12 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 21 },
                    { id: 11, cantidadPedida: 25 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 26 },
                    { id: 2, cantidadPedida: 20 },
                    { id: 6, cantidadPedida: 32 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 13 },
                    { id: 5, cantidadPedida: 9 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 24 },
                    { id: 12, cantidadPedida: 14 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 29 },
                    { id: 2, cantidadPedida: 23 },
                    { id: 6, cantidadPedida: 35 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 14 },
                    { id: 4, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 8 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 20 },
                    { id: 11, cantidadPedida: 23 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 27 },
                    { id: 2, cantidadPedida: 21 },
                    { id: 6, cantidadPedida: 33 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 17 },
                    { id: 4, cantidadPedida: 10 },
                  ],
                },
              },
            },
          },
          {
            semana: 3,
            fechaInicio: new Date(2025, 2, 17),
            fechaFin: new Date(2025, 2, 22),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 22 },
                    { id: 12, cantidadPedida: 13 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 25 },
                    { id: 2, cantidadPedida: 19 },
                    { id: 6, cantidadPedida: 31 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 12 },
                    { id: 5, cantidadPedida: 8 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 19 },
                    { id: 11, cantidadPedida: 21 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 23 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 29 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 5, cantidadPedida: 9 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 12 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 24 },
                    { id: 2, cantidadPedida: 18 },
                    { id: 6, cantidadPedida: 30 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 19 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 22 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 28 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 10 },
                    { id: 4, cantidadPedida: 8 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 18 },
                    { id: 12, cantidadPedida: 11 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 23 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 29 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 14 },
                    { id: 5, cantidadPedida: 10 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 13 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 15 },
                    { id: 4, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
            },
          },
          {
            semana: 4,
            fechaInicio: new Date(2025, 2, 24),
            fechaFin: new Date(2025, 2, 29),
            dias: {
              lunes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 14 },
                    { id: 11, cantidadPedida: 17 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 20 },
                    { id: 2, cantidadPedida: 14 },
                    { id: 6, cantidadPedida: 26 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              martes: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 19 },
                    { id: 12, cantidadPedida: 12 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 22 },
                    { id: 2, cantidadPedida: 16 },
                    { id: 6, cantidadPedida: 28 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 11 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              miercoles: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 15 },
                    { id: 11, cantidadPedida: 18 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 19 },
                    { id: 2, cantidadPedida: 13 },
                    { id: 6, cantidadPedida: 25 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 12 },
                    { id: 4, cantidadPedida: 8 },
                  ],
                },
              },
              jueves: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 17 },
                    { id: 11, cantidadPedida: 20 },
                    { id: 12, cantidadPedida: 13 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 21 },
                    { id: 2, cantidadPedida: 15 },
                    { id: 6, cantidadPedida: 27 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 10 },
                    { id: 5, cantidadPedida: 6 },
                  ],
                },
              },
              viernes: {
                desayuno: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 9, cantidadPedida: 16 },
                    { id: 11, cantidadPedida: 19 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 8, cantidadPedida: 23 },
                    { id: 2, cantidadPedida: 17 },
                    { id: 6, cantidadPedida: 29 },
                  ],
                },
                cena: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 3, cantidadPedida: 11 },
                    { id: 4, cantidadPedida: 9 },
                    { id: 5, cantidadPedida: 7 },
                  ],
                },
              },
              sabado: {
                desayuno: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 10, cantidadPedida: 18 },
                    { id: 11, cantidadPedida: 21 },
                    { id: 12, cantidadPedida: 14 },
                  ],
                },
                almuerzo: {
                  cantidad: 3,
                  estado: "Pendiente",
                  platillos: [
                    { id: 1, cantidadPedida: 24 },
                    { id: 2, cantidadPedida: 18 },
                    { id: 6, cantidadPedida: 30 },
                  ],
                },
                cena: {
                  cantidad: 2,
                  estado: "Pendiente",
                  platillos: [
                    { id: 7, cantidadPedida: 13 },
                    { id: 4, cantidadPedida: 8 },
                  ],
                },
              },
            },
          },
        ],
      },
    ],
  },
];

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
  almuerzo: "🍽️",
  cena: "🌙",
};

export function Orders() {
  const navigate = useNavigate();
  const [empresas] = useState<Empresa[]>(mockData);

  const handleVerDetalle = (semana: PedidoSemana, comedorNombre: string) => {
    console.log("Orders - handleVerDetalle llamado con:", { semana, comedorNombre });
    // Serializar los datos en localStorage como fallback
    localStorage.setItem('orderDetails', JSON.stringify({ semana, comedorNombre }));
    navigate("/produccion/pedidos/detalle", {
      state: { semana, comedorNombre },
    });
  };

  const formatDateRange = (start: Date, end: Date) => {
    return `${format(start, "d MMM", { locale: es })} - ${format(end, "d MMM yyyy", { locale: es })}`;
  };

  return (
    <div className="p-8 bg-[#f3f4f6] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h1>
        <p className="text-sm text-gray-600">Gestiona pedidos por empresa, comedor y semana</p>
      </div>

      {/* Stats */}
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
              {empresas.length}
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
              {empresas.reduce((acc, emp) => acc + emp.comedores.length, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-gray-600">Semanas Planificadas</p>
              <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-3 rounded-xl shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-[#10b981] to-[#059669] bg-clip-text text-transparent">
              {empresas.reduce(
                (acc, emp) =>
                  acc + emp.comedores.reduce((sum, com) => sum + com.semanas.length, 0),
                0
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accordion de Empresas > Comedores > Semanas */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <Accordion type="multiple" className="w-full">
          {empresas.map((empresa) => (
            <AccordionItem key={empresa.id} value={`empresa-${empresa.id}`}>
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{empresa.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {empresa.comedores.length} comedor
                      {empresa.comedores.length !== 1 ? "es" : ""}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <Accordion type="multiple" className="w-full">
                  {empresa.comedores.map((comedor) => (
                    <AccordionItem
                      key={comedor.id}
                      value={`comedor-${comedor.id}`}
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
                              {comedor.semanas.length} semana
                              {comedor.semanas.length !== 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3">
                        <div className="space-y-2 mt-2">
                          {comedor.semanas.map((semana) => (
                            <div
                              key={semana.semana}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                                  <Calendar className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <p className="font-semibold text-sm text-gray-900">
                                    Semana {semana.semana}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {formatDateRange(semana.fechaInicio, semana.fechaFin)}
                                  </p>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-8 hover:bg-blue-50 hover:border-blue-300"
                                onClick={() => handleVerDetalle(semana, comedor.nombre)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                Ver Detalle
                              </Button>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>


    </div>
  );
}
