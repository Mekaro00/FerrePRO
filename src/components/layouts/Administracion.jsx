// layouts/Administracion.jsx
// Layout principal del panel admin de FerrePro.
// Contiene Sidebar + TopBar fijos. El contenido de cada página
// se renderiza dentro del <Outlet /> sin redirigir a otra URL.
//
// Uso en App.jsx:
//   <Route path="/admin" element={<Administracion />}>
//     <Route index         element={<DashboardPage />} />
//     <Route path="inventario" element={<InventarioPage />} />
//     <Route path="ordenes"    element={<OrdenesPage />} />
//     <Route path="clientes"   element={<ClientesPage />} />
//     <Route path="proveedores" element={<ProveedoresPage />} />
//   </Route>

import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard",  icon: "dashboard",      path: "/admin"             },
  { label: "Inventory",  icon: "inventory_2",    path: "/admin/inventario"  },
  { label: "Orders",     icon: "shopping_cart",  path: "/admin/ordenes"     },
  { label: "Customers",  icon: "group",          path: "/admin/clientes"    },
  { label: "Suppliers",  icon: "local_shipping", path: "/admin/proveedores" },
];

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ isOpen, onToggle, onHover }) {
  return (
    <aside
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="h-screen fixed left-0 top-0 z-50 bg-zinc-50 flex flex-col py-6 border-r border-zinc-200 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? "16rem" : "4rem" }}
    >
      {/* Logo + toggle */}
      <div className="mb-8 px-3 flex items-center justify-between min-w-0">
        <div
          className="overflow-hidden transition-all duration-300 flex items-center gap-3"
          style={{ width: isOpen ? "148px" : 0, opacity: isOpen ? 1 : 0 }}
        >
          <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">construction</span>
          </div>
          <div>
            <h1
              className="text-lg font-black text-orange-600 leading-tight whitespace-nowrap"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              FerrePro
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
              Industrial Admin
            </p>
          </div>
        </div>

        <button
          onClick={onToggle}
          title={isOpen ? "Colapsar menú" : "Expandir menú"}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-zinc-100 transition-colors flex-shrink-0 ml-auto"
        >
          <span
            className="material-symbols-outlined text-zinc-400 text-[20px] transition-transform duration-300"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            chevron_right
          </span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // "end" solo en el Dashboard para que no quede activo en todas las rutas /admin/*
            end={item.path === "/admin"}
            title={!isOpen ? item.label : undefined}
            className={({ isActive }) =>
              [
                "flex items-center py-3 transition-all duration-200 text-[11px] font-bold uppercase tracking-widest",
                isOpen ? "px-6 gap-3" : "px-0 justify-center",
                isActive
                  ? "text-orange-600 border-r-4 border-orange-500 bg-orange-50/50"
                  : "text-zinc-600 hover:text-orange-500 hover:bg-zinc-100",
              ].join(" ")
            }
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            <span className="material-symbols-outlined text-[20px] flex-shrink-0">
              {item.icon}
            </span>
            <span
              className="whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{ width: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* Links inferiores */}
      <div className={`mt-4 space-y-0.5 border-t border-zinc-200 pt-4 ${isOpen ? "px-6" : "px-0"}`}>
        {[
          { label: "Help Center", icon: "help"   },
          { label: "Sign Out",    icon: "logout"  },
        ].map((item) => (
          <a
            key={item.label}
            href="#"
            title={!isOpen ? item.label : undefined}
            className={`flex items-center py-2 text-xs font-medium text-zinc-500 hover:text-orange-500 transition-all duration-200 ${
              isOpen ? "gap-3" : "justify-center"
            }`}
          >
            <span className="material-symbols-outlined text-[16px] flex-shrink-0">
              {item.icon}
            </span>
            <span
              className="whitespace-nowrap overflow-hidden transition-all duration-300"
              style={{ width: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            >
              {item.label}
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className={`mt-6 transition-all duration-300 ${isOpen ? "px-6" : "px-2"}`}>
        {isOpen ? (
          <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-700 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[16px]">assignment</span>
            Generate Report
          </button>
        ) : (
          <button
            title="Generate Report"
            className="w-full bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-orange-700 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">assignment</span>
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ sideW }) {
  // Título dinámico según la ruta actual
  const { pathname } = useLocation();
  const titles = {
    "/admin":             "Dashboard",
    "/admin/inventario":  "Inventory Management",
    "/admin/ordenes":     "Orders Management",
    "/admin/clientes":    "Client Directory",
    "/admin/proveedores": "Directorio de Proveedores",
  };
  const pageTitle = titles[pathname] ?? "FerrePro Admin";

  return (
    <header
      className="w-full top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,28,28,0.06)] transition-all duration-300"
      style={{ paddingLeft: sideW }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Título + búsqueda */}
        <div className="flex items-center gap-6">
          <span
            className="text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {pageTitle}
          </span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
              search
            </span>
            <input
              className="bg-zinc-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
              placeholder="Buscar..."
            />
          </div>
        </div>

        {/* Acciones + perfil */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="h-8 w-px bg-zinc-200" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p
                className="text-xs font-bold text-zinc-900 uppercase tracking-wider"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Admin User
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">Lead Engineer</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-orange-100 border-2 border-orange-500/10 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-orange-600">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Administracion — Layout principal ────────────────────────────────────────
export default function Administracion() {
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const isOpen = expanded || hovered;
  const sideW  = isOpen ? "16rem" : "4rem";

  const handleToggle = () => setExpanded((prev) => !prev);
  const handleHover  = (val) => setHovered(val);

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar fijo compartido */}
      <Sidebar
        isOpen={isOpen}
        onToggle={handleToggle}
        onHover={handleHover}
      />

      {/* TopBar pegajoso */}
      <TopBar sideW={sideW} />

      {/* Área de contenido — aquí se inyecta cada página */}
      <main
        className="pb-12 min-h-screen transition-all duration-300"
        style={{ marginLeft: sideW }}
      >
        <Outlet />
      </main>

    </div>
  );
}
