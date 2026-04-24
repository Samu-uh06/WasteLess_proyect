// ============================================================
// Sidebar.tsx  (MODIFICADO)
// Ubicación: src/app/components/Sidebar.tsx
//
// CAMBIOS:
// - Se importa canAccess y UserRole desde rbac.ts / auth.types.ts
// - Se define TODOS los navItems con su rol mínimo requerido
// - Se calcula itemsVisibles filtrando navItems según user.rol
// - El JSX ahora itera sobre itemsVisibles en lugar de navItems
// - Los hijos también se filtran individualmente por rol
// ============================================================

import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import svgPaths from "../../imports/Group3/svg-c97ivb3vyt";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { canAccess } from "../utils/rbac";
import { UserRole } from "../types/auth.types";

interface NavItem {
  path?: string;
  label: string;
  icon: React.ReactNode;
  children?: { path: string; label: string; icon: React.ReactNode }[];
}

// Dashboard Icon
const DashboardIcon = () => (
  <div className="relative shrink-0 size-[20px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p1fc96a00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p33089d00} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p49cfa80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p1cfbf300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  </div>
);

// Users Icon
const UsersIcon = () => (
  <div className="relative shrink-0 size-[20px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p25397b80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p2c4f400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p2241fff0} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.pae3c380} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  </div>
);

// Dishes Icon
const DishesIcon = () => (
  <div className="relative shrink-0 size-[20px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p304ac280} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M5 14.1667H15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  </div>
);

// Planning Icon (Calendar)
const PlanningIcon = () => (
  <div className="h-[20px] relative shrink-0 w-[19.844px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.8438 20">
      <g>
        <path d="M6.61458 1.73177V5.03906" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65365" />
        <path d="M13.2292 1.73177V5.03906" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65365" />
        <path d={svgPaths.p33418440} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65365" />
        <path d="M2.48047 8.34635H17.3633" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.65365" />
      </g>
    </svg>
  </div>
);

// Production Icon
const ProductionIcon = () => (
  <div className="relative shrink-0 size-[20px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.p31104300} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p1b3f8200} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M10 9.16667H13.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M10 13.3333H13.3333" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M6.66667 9.16667H6.675" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M6.66667 13.3333H6.675" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  </div>
);

// Settings Icon
const SettingsIcon = () => (
  <div className="relative shrink-0 size-[20px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
      <g>
        <path d={svgPaths.ped54800} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p3b27f100} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
    </svg>
  </div>
);

// Chevron Down Icon
const ChevronDownIcon = () => (
  <div className="relative shrink-0 size-[17.988px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9883 17.9883">
      <g>
        <path d={svgPaths.p3255e900} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49902" />
      </g>
    </svg>
  </div>
);

// Roles Icon (checkmark in shield)
const RolesIcon = () => (
  <div className="relative shrink-0 size-[17.988px]">
    <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9883 17.9883">
      <g clipPath="url(#clip0_168_31325)">
        <path d={svgPaths.pa7e0c80} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49902" />
      </g>
      <defs>
        <clipPath id="clip0_168_31325">
          <rect fill="white" height="17.9883" width="17.9883" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

// Todos los items de navegación — se filtrarán según el rol del usuario
const navItems: NavItem[] = [
  { path: "/", label: "Dashboard", icon: <DashboardIcon /> },
  {
    label: "Usuarios",
    icon: <UsersIcon />,
    children: [
      { path: "/usuarios/gestion", label: "Gestión de usuarios", icon: <></> },
    ],
  },
  {
    label: "Platillos",
    icon: <DishesIcon />,
    children: [
      { path: "/platillos/gestion", label: "Gestión de platillos", icon: <></> },
    ],
  },
  {
    label: "Planeación Gastronómica",
    icon: <PlanningIcon />,
    children: [
      { path: "/planeacion/empresas",  label: "Gestión de empresas",  icon: <></> },
      { path: "/planeacion/comedores", label: "Gestión de comedores", icon: <></> },
      { path: "/planeacion/menu",      label: "Gestión de menú",      icon: <></> },
    ],
  },
  {
    label: "Gestión de Producción",
    icon: <ProductionIcon />,
    children: [
      { path: "/produccion/pedidos", label: "Gestión de pedidos",             icon: <></> },
      { path: "/produccion/ordenes", label: "Gestión de orden de producción", icon: <></> },
    ],
  },
  {
    label: "Configuración",
    icon: <SettingsIcon />,
    children: [
      { path: "/configuracion/roles", label: "Gestión de roles", icon: <RolesIcon /> },
    ],
  },
];

export function Sidebar({ onLogout }: { onLogout?: () => void }) {
  const { user } = useAuth();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // ── Filtrar menú según el rol del usuario ─────────────────
  const itemsVisibles: NavItem[] = navItems
    .map((item) => {
      if (!user) return null;

      const rol = user.rol as UserRole;

      // Item con ruta directa (ej: Dashboard)
      if (item.path) {
        return canAccess(rol, item.path) ? item : null;
      }

      // Item con hijos: filtrar solo los hijos accesibles
      if (item.children) {
        const hijosVisibles = item.children.filter((child) =>
          canAccess(rol, child.path)
        );
        // Si ningún hijo es accesible, ocultar el grupo completo
        if (hijosVisibles.length === 0) return null;
        return { ...item, children: hijosVisibles };
      }

      return null;
    })
    .filter(Boolean) as NavItem[];
  // ─────────────────────────────────────────────────────────

  useEffect(() => {
    itemsVisibles.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => location.pathname === child.path
        );
        if (hasActiveChild && !expandedItems.includes(item.label)) {
          setExpandedItems((prev) => [...prev, item.label]);
        }
      }
    });
  }, [location.pathname]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string, children?: { path: string }[]) => {
    if (path) return location.pathname === path;
    if (children) return children.some((child) => location.pathname === child.path);
    return false;
  };

  const isChildActive = (childPath: string) => location.pathname === childPath;

  return (
    <aside className="w-[288px] bg-[#111827] text-white flex flex-col shrink-0">
      {/* Header with Logo */}
      <div className="h-[93.203px] border-b border-[#1e2939] px-6 pt-6 pb-[1.25px]">
        <div className="flex items-center gap-3">
          <div
            className="relative rounded-full shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] shrink-0 size-[40px]"
            style={{ backgroundImage: "linear-gradient(135deg, rgb(231, 0, 11) 0%, rgb(255, 105, 0) 100%)" }}
          >
            <div className="flex items-center justify-center size-full">
              <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[28px] text-[18px] text-white">W</p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[28px] text-[18px] text-white">WasteLess</p>
            <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] text-[#99a1af] text-[12px]">Sistema de gestión</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="flex flex-col gap-2">
          {itemsVisibles.map((item) => {
            const expanded = expandedItems.includes(item.label);
            const active   = isActive(item.path, item.children);

            return (
              <div key={item.label}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-[10px] transition-colors ${
                      active
                        ? "bg-[#e7000b] text-white"
                        : "text-[#d1d5dc] hover:bg-[#1f2937]"
                    }`}
                  >
                    <div className="text-[#d1d5dc]">{item.icon}</div>
                    <span className="font-['Arimo:Bold',sans-serif] font-bold text-[16px]">{item.label}</span>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className={`w-full flex items-center justify-between px-4 rounded-[10px] transition-colors ${
                        item.label === "Planeación Gastronómica" ? "py-3 h-[72px]" : "py-3 h-[48px]"
                      } ${
                        active
                          ? "text-white"
                          : "text-[#d1d5dc] hover:bg-[#1f2937]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-[#d1d5dc]">{item.icon}</div>
                        <span className={`font-['Arimo:Bold',sans-serif] font-bold text-[16px] ${
                          item.label === "Planeación Gastronómica" ? "max-w-[101px]" : ""
                        }`}>{item.label}</span>
                      </div>
                      <div className="text-[#d1d5dc]">
                        <ChevronDownIcon />
                      </div>
                    </button>
                    {expanded && item.children && (
                      <div className="ml-4 mt-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] transition-colors mb-1 ${
                              isChildActive(child.path)
                                ? "bg-[#e7000b] text-white"
                                : "text-[#99a1af] hover:bg-[#1f2937] hover:text-white"
                            }`}
                          >
                            {child.label === "Gestión de roles" && child.icon}
                            <span className="font-['Arimo:Bold',sans-serif] font-bold text-[14px]">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* User Profile + Logout */}
      <div className="p-4 border-t border-[#1e2939]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#e7000b]">
            <span className="font-['Arimo:Bold',sans-serif] font-bold text-[16px] text-white">
              {user?.nombre?.charAt(0) ?? "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-['Arimo:Bold',sans-serif] font-bold text-[14px] text-white leading-[20px] truncate">
              {user?.nombre ?? "Administrador"}
            </p>
            <p className="font-['Arimo:Bold',sans-serif] font-bold text-[12px] text-[#99a1af] leading-[16px]">
              {user?.rol ?? "Admin"}
            </p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Cerrar sesión"
              className="text-[#99a1af] hover:text-white hover:bg-[#1f2937] p-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}