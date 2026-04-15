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
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";




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
