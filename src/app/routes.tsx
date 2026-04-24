// ============================================================
// routes.tsx  (MODIFICADO)
// Ubicación: src/app/routes.tsx
//
// CAMBIOS:
// - ProtectedRoute ahora recibe prop "allowedRoles" para RBAC
// - Las rutas se dividen en 3 grupos según rol:
//     · Solo Administrador: dashboard, usuarios, roles
//     · Administrador + Gerente: platillos, planeación, producción
//     · Solo Empleado: rutas /mobile/*
// - /mobile/login y /mobile/register se mantienen públicas
// ============================================================

import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AdminLogin } from "./pages/AdminLogin";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { AccessManagement } from "./pages/AccessManagement";
import { Dishes } from "./pages/Dishes";
import { Companies } from "./pages/Companies";
import { Diners } from "./pages/Diners";
import { MenuManagement } from "./pages/MenuManagement";
import { CreateWeeklyMenu } from "./pages/CreateWeeklyMenu";
import { EditWeeklyMenu } from "./pages/EditWeeklyMenu";
import { ViewWeeklyMenu } from "./pages/ViewWeeklyMenu";
import { Orders } from "./pages/Orders";
import { OrderDetails } from "./pages/OrderDetails";
import { ProductionOrders } from "./pages/ProductionOrders";
import { Roles } from "./pages/Roles";
import { NotFound } from "./pages/NotFound";
import { MobileLogin } from "./pages/mobile/MobileLogin";
import { MobileRegister } from "./pages/mobile/MobileRegister";
import { MobileHome } from "./pages/mobile/MobileHome";
import { MobileWeeklyMenu } from "./pages/mobile/MobileWeeklyMenu";
import { MobileMyOrders } from "./pages/mobile/MobileMyOrders";
import { MobileProfile } from "./pages/mobile/MobileProfile";

export const router = createBrowserRouter([

  // ── Pública: login unificado para todos los roles ─────────
  {
    path: "/login",
    Component: AdminLogin,
  },

  // ── Solo ADMINISTRADOR ────────────────────────────────────
  // Dashboard, Usuarios, Roles (acceso exclusivo)
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["Administrador"]} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        Component: Layout,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
          {
            path: "usuarios/gestion",
            Component: Users,
          },
          {
            path: "usuarios/acceso",
            Component: AccessManagement,
          },
          {
            path: "configuracion/roles",
            Component: Roles,
          },
        ],
      },
    ],
  },

  // ── ADMINISTRADOR + GERENTE ───────────────────────────────
  // Platillos, Planeación, Producción
  {
    path: "/",
    element: <ProtectedRoute allowedRoles={["Administrador", "Gerente"]} />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        Component: Layout,
        children: [
          {
            path: "platillos/gestion",
            Component: Dishes,
          },
          {
            path: "planeacion/empresas",
            Component: Companies,
          },
          {
            path: "planeacion/comedores",
            Component: Diners,
          },
          {
            path: "planeacion/menu",
            Component: MenuManagement,
          },
          {
            path: "planeacion/menu/crear",
            Component: CreateWeeklyMenu,
          },
          {
            path: "planeacion/menu/editar",
            Component: EditWeeklyMenu,
          },
          {
            path: "planeacion/menu/ver",
            Component: ViewWeeklyMenu,
          },
          {
            path: "produccion/pedidos",
            Component: Orders,
          },
          {
            path: "produccion/pedidos/detalle",
            Component: OrderDetails,
          },
          {
            path: "produccion/ordenes",
            Component: ProductionOrders,
          },
        ],
      },
    ],
  },

  // ── Solo EMPLEADO: rutas mobile protegidas ────────────────
  {
    element: <ProtectedRoute allowedRoles={["Empleado"]} />,
    children: [
      {
        path: "/mobile/home",
        Component: MobileHome,
      },
      {
        path: "/mobile/weekly-menu",
        Component: MobileWeeklyMenu,
      },
      {
        path: "/mobile/my-orders",
        Component: MobileMyOrders,
      },
      {
        path: "/mobile/profile",
        Component: MobileProfile,
      },
    ],
  },

  // ── Públicas mobile (registro, sin sesión requerida) ──────
  {
    path: "/mobile/login",
    Component: MobileLogin,
  },
  {
    path: "/mobile/register",
    Component: MobileRegister,
  },

  // ── 404 ───────────────────────────────────────────────────
  {
    path: "*",
    Component: NotFound,
  },
]);