// components/Sidebar.jsx
// Componente de sidebar compartido para todas las páginas de FerrePro.
//
// Uso:
//   import Sidebar from "../components/Sidebar";
//   <Sidebar onExpandChange={setSideOpen} />
//
// Props:
//   onExpandChange  →  (isOpen: boolean) => void   callback cuando cambia el estado

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Dashboard",  icon: "dashboard",      path: "/"            },
  { label: "Inventory",  icon: "inventory_2",    path: "/inventario"  },
  { label: "Orders",     icon: "shopping_cart",  path: "/ordenes"     },
  { label: "Customers",  icon: "group",          path: "/clientes"    },
  { label: "Suppliers",  icon: "local_shipping", path: "/proveedores" },
];

export default function Sidebar({ onExpandChange }) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [hovered,  setHovered]  = useState(false);

  const isOpen = expanded || hovered;

  const handleHover = (val) => {
    setHovered(val);
    onExpandChange?.(val || expanded);
  };

  const handleToggle = () => {
    setExpanded((prev) => {
      onExpandChange?.(!prev || hovered);
      return !prev;
    });
  };

  return (
    <aside
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="h-screen fixed left-0 top-0 z-50 bg-zinc-50 flex flex-col py-6 border-r border-zinc-200 overflow-hidden transition-all duration-300 ease-in-out"
      style={{ width: isOpen ? "16rem" : "4rem" }}
    >
      {/* ── Logo + botón toggle ── */}
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

        {/* Flecha — siempre visible */}
        <button
          onClick={handleToggle}
          title={expanded ? "Colapsar menú" : "Expandir menú"}
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

      {/* ── Nav Links ── */}
      <nav className="flex-1 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              title={!isOpen ? item.label : undefined}
              className={[
                "flex items-center py-3 transition-all duration-200 text-[11px] font-bold uppercase tracking-widest",
                isOpen ? "px-6 gap-3" : "px-0 justify-center",
                isActive
                  ? "text-orange-600 border-r-4 border-orange-500 bg-orange-50/50"
                  : "text-zinc-600 hover:text-orange-500 hover:bg-zinc-100",
              ].join(" ")}
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
            </Link>
          );
        })}
      </nav>

      {/* ── Links inferiores ── */}
      <div
        className={`mt-4 space-y-0.5 border-t border-zinc-200 pt-4 transition-all duration-300 ${
          isOpen ? "px-6" : "px-0"
        }`}
      >
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

      {/* ── CTA Button ── */}
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
