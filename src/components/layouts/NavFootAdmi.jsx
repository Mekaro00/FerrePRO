// NavFootAdmi.jsx
// Layout compartido para todas las páginas del admin de FerrePro.
// Uso:
//   import NavFootAdmi from "../layouts/NavFootAdmi";
//   <NavFootAdmi><TuPagina /></NavFootAdmi>
//
// Requiere en tu index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
//   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
//
// Requiere: react-router-dom  → npm install react-router-dom

import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

// ─── Configuración de navegación ──────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard",  icon: "dashboard",      path: "/"             },
  { label: "Inventory",  icon: "inventory_2",    path: "/inventario"   },
  { label: "Orders",     icon: "shopping_cart",  path: "/ordenes"      },
  { label: "Customers",  icon: "group",          path: "/clientes"     },
  { label: "Suppliers",  icon: "local_shipping", path: "/proveedores"  },
];

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ currentPath }) {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 z-50 bg-zinc-50 flex flex-col py-6 border-r border-zinc-200">
      {/* Logo */}
      <div className="mb-8 px-6">
        <h1
          className="text-lg font-black text-orange-600"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          FerrePro
        </h1>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
          Industrial Admin
        </p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={
                isActive
                  ? "flex items-center gap-3 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-orange-600 border-r-4 border-orange-500 bg-orange-50/50 transition-all duration-200"
                  : "flex items-center gap-3 px-6 py-3 text-[11px] uppercase tracking-widest text-zinc-600 hover:text-orange-500 hover:bg-zinc-100 transition-all duration-200"
              }
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Links */}
      <div className="px-6 mt-4 space-y-0.5 border-t border-zinc-200 pt-4">
        <a
          href="#"
          className="flex items-center gap-3 py-2 text-xs font-medium text-zinc-500 hover:text-orange-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">help</span>
          Help Center
        </a>
        <a
          href="#"
          className="flex items-center gap-3 py-2 text-xs font-medium text-zinc-500 hover:text-orange-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Sign Out
        </a>
      </div>

      {/* CTA Button */}
      <div className="mt-4 px-6">
        <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-700 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[16px]">assignment</span>
          Generate Report
        </button>
      </div>
    </aside>
  );
}

// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ pageTitle, search, onSearch }) {
  return (
    <header className="w-full top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,28,28,0.06)]">
      <div className="flex items-center justify-between px-6 py-3 pl-72">
        {/* Left: título + búsqueda */}
        <div className="flex items-center gap-6">
          {pageTitle && (
            <span
              className="text-xl font-bold tracking-tight text-zinc-900"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {pageTitle}
            </span>
          )}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
              search
            </span>
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="bg-zinc-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64 transition-all"
              placeholder="Search blueprints, tools, SKUs..."
            />
          </div>
        </div>

        {/* Right: acciones + perfil */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 transition-colors rounded-full active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 transition-colors rounded-full active:scale-95">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div className="h-8 w-px bg-zinc-100" />
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
            <div className="w-10 h-10 rounded-full bg-orange-100 border-2 border-orange-500/10 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-orange-600">person</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── FAB (botón flotante) ──────────────────────────────────────────────────────
function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-orange-700 active:scale-95 transition-transform"
      aria-label="Agregar nuevo elemento"
    >
      <span className="material-symbols-outlined">add</span>
    </button>
  );
}

// ─── NavFootAdmi — Layout principal ───────────────────────────────────────────
//
// Props:
//   children     → contenido de la página
//   pageTitle    → título que aparece en el TopBar (opcional)
//   showFab      → mostrar el botón flotante +  (default: true)
//   onFabClick   → acción del botón flotante    (opcional)
//
// Ejemplo de uso:
//   <NavFootAdmi pageTitle="Gestión de Proveedores" showFab onFabClick={() => setModal(true)}>
//     <ContenidoDeLaPagina />
//   </NavFootAdmi>
//
export default function NavFootAdmi({
  children,
  pageTitle = "",
  showFab = true,
  onFabClick,
}) {
  const location = useLocation();
  const [search, setSearch] = useState("");

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar fijo */}
      <Sidebar currentPath={location.pathname} />

      {/* TopBar pegajoso */}
      <TopBar
        pageTitle={pageTitle}
        search={search}
        onSearch={setSearch}
      />

      {/* Contenido de la página */}
      <main className="ml-64 px-8 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto pt-8">
          {children}
        </div>
      </main>

      {/* Botón flotante */}
      {showFab && <FAB onClick={onFabClick} />}
    </div>
  );
}
