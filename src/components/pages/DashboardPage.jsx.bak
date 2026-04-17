// DashboardPage.jsx
// Requiere en tu index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
//   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";

// ─── Datos ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard",  icon: "dashboard",      path: "/"            },
  { label: "Inventory",  icon: "inventory_2",    path: "/inventario"  },
  { label: "Orders",     icon: "shopping_cart",  path: "/ordenes"     },
  { label: "Customers",  icon: "group",          path: "/clientes"    },
  { label: "Suppliers",  icon: "local_shipping", path: "/proveedores" },
];

const METRICS = [
  {
    label: "Ventas Totales (Hoy)",
    value: "$45,280.00",
    accent: "bg-orange-600",
    sub: "+12.5% vs ayer",
    subIcon: "trending_up",
    subColor: "text-orange-600",
  },
  {
    label: "Pedidos Pendientes",
    value: "128",
    accent: "bg-zinc-400",
    sub: "24 en despacho",
    subIcon: "schedule",
    subColor: "text-zinc-600",
  },
  {
    label: "Productos Bajo Stock",
    value: "14",
    accent: "bg-red-500",
    sub: "Requiere atención",
    subIcon: "warning",
    subColor: "text-red-500",
  },
  {
    label: "Tasa de Despacho",
    value: "98.2%",
    accent: "bg-orange-500",
    sub: "Optimizado",
    subIcon: "verified",
    subColor: "text-orange-600",
  },
];

const CHART_BARS = [
  { day: "Lun", h: "40%",  active: false },
  { day: "Mar", h: "60%",  active: false },
  { day: "Mié", h: "45%",  active: false },
  { day: "Jue", h: "85%",  active: false },
  { day: "Vie", h: "95%",  active: true, label: "$28k" },
  { day: "Sáb", h: "70%",  active: false },
  { day: "Dom", h: "50%",  active: false },
];

const ORDERS_TODAY = [
  {
    id: "#ORD-4921",
    client: "Ferretería Central S.A.",
    amount: "$1,240.00",
    status: "PENDIENTE",
    statusStyle: "text-orange-700 bg-orange-100",
  },
  {
    id: "#ORD-4920",
    client: "Construcciones RM",
    amount: "$4,890.50",
    status: "Enviado",
    statusStyle: "text-zinc-600 bg-zinc-100",
  },
  {
    id: "#ORD-4919",
    client: "Suministros Industriales",
    amount: "$920.00",
    status: "Enviado",
    statusStyle: "text-zinc-600 bg-zinc-100",
  },
];

const LOW_STOCK = [
  {
    name: "Taladro Percutor 20V",
    category: "Herramientas Eléctricas",
    sku: "HD-2049-X",
    stock: "2 u.",
    statusLabel: "Crítico",
    statusStyle: "bg-red-100 text-red-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0jjvbA9Ms1Pa6TGPmxNg5V6jk0uJ9fvXDzmSULNstkeDKstg3ojYe39fNr-3T31I-MNCKvgTZ7MRvT5TyPOvfV5WyGoxN_AVN4nGrXNqZ0YyzvTKImUOnVEQfUNzy3HyuNMftDBbgGP65_pd7yp2ppl10aTVE93Gq52NpWmyPzJ1E3A9eOFcCFPqM7il-WWYvgaWi3a-ZefYi134yvpmSEw0WS0mHFBVLmTdC9SGp8S5-o_nHzHkB4KrEUoU1_ifCPV-Nwcj0193p",
  },
  {
    name: 'Tornillos de Acero 2"',
    category: "Fijaciones",
    sku: "SC-5502-S",
    stock: "150 u.",
    statusLabel: "Reordenar",
    statusStyle: "bg-orange-100 text-orange-700",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA55PTMeA7cxCrzScclsTp76B_9tL0SkKRvAYJJ2IMuGFLl1340VRFVgNtzm89_luJxZWd23H3-yR5wN4DmzaNvnSi_OXbL7cplju8JixjNTmGo8Yq-jy-La4JdbF6bSXO-jYG50cKpyEvFAp3PfS0jEO4QEjEjjxuQFDENLc4NExnVZ3t4fM2t_MJsQUQaSTgg5bie3G9G5c1A2KUyM2cXX-cEIxZcpGaJw_lytKMPd7E5HxkAPtov-CmRcb3KHPPjAqDuEtCBTqch",
  },
];


// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ sideW }) {
  return (
    <header
      className="w-full top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,28,28,0.06)] transition-all duration-300"
      style={{ paddingLeft: sideW }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[18px]">
            search
          </span>
          <input
            className="bg-zinc-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 w-64 transition-all"
            placeholder="Search blueprints, tools, SKUs..."
          />
        </div>

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
              <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider" style={{ fontFamily: "Manrope, sans-serif" }}>
                Admin User
              </p>
              <p className="text-[10px] text-zinc-500 font-medium">Lead Engineer</p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmekrfttTVVLfr4nCY5-jXEELzVvpnDj6KngJ_ZnybXC4OIPIsKg_SOoU8AEXZKnIHQ6g2tgctDxuZWtTvymD0fAihTBBsmq6hU5WPdqn777STCHQwv1J-c9i_Htp3g-sZygTsNUzpD15Fo_YGKhySmKlPX6HmN9lMNpkRH-OlqaU-_lmKvmMVB3kNe7R7OIunLgfMkDaJuDe5hJkMrRhn4IcM1SGz1yQZB1LPkmBjhEQMJ4_VC5MxkQWOlGiSFPvbKkOZhviosnDv"
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── MetricCard ────────────────────────────────────────────────────────────────
function MetricCard({ label, value, accent, sub, subIcon, subColor }) {
  return (
    <div className="bg-white p-6 rounded-xl relative overflow-hidden flex flex-col justify-between h-40 shadow-sm border border-zinc-200/50">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent}`} />
      <div>
        <p
          className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          {label}
        </p>
        <h3 className="text-2xl font-black text-zinc-900 mt-1" style={{ fontFamily: "Manrope, sans-serif" }}>
          {value}
        </h3>
      </div>
      <div className={`flex items-center gap-2 font-bold text-xs ${subColor}`}>
        <span className="material-symbols-outlined text-[14px]">{subIcon}</span>
        {sub}
      </div>
    </div>
  );
}

// ─── WeeklyChart ───────────────────────────────────────────────────────────────
// xl:col-span-2 → ocupa 2/3 del grid de 3 columnas en pantallas grandes
function WeeklyChart() {
  return (
    <div className="xl:col-span-2 bg-white rounded-xl p-8 shadow-sm border border-zinc-200/50">
      <div className="flex justify-between items-center mb-8">
        <h4 className="text-lg font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
          Rendimiento Semanal
        </h4>
        <button className="text-zinc-400 hover:text-zinc-600 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <div className="h-64 flex items-end justify-between gap-4 px-4">
        {CHART_BARS.map((bar) => (
          <div key={bar.day} className="flex-1 relative" style={{ height: bar.h }}>
            {bar.active && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded font-bold whitespace-nowrap">
                {bar.label}
              </div>
            )}
            <div
              className={`w-full h-full rounded-t-lg transition-all ${
                bar.active ? "bg-orange-600" : "bg-zinc-100 hover:bg-orange-500/20"
              }`}
            />
          </div>
        ))}
      </div>
      <div
        className="flex justify-between mt-4 px-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
        style={{ fontFamily: "Manrope, sans-serif" }}
      >
        {CHART_BARS.map((b) => (
          <span key={b.day}>{b.day}</span>
        ))}
      </div>
    </div>
  );
}

// ─── OrdersToday ───────────────────────────────────────────────────────────────
function OrdersToday() {
  return (
    <div className="bg-white rounded-xl p-8 flex flex-col shadow-sm border border-zinc-200/50">
      <h4 className="text-lg font-bold mb-6" style={{ fontFamily: "Manrope, sans-serif" }}>
        Pedidos de Hoy
      </h4>
      <div className="space-y-6 flex-1">
        {ORDERS_TODAY.map((order) => (
          <div key={order.id} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-orange-600 text-[20px]">shopping_bag</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm font-bold">{order.id}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${order.statusStyle}`}>
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 truncate">{order.client}</p>
              <p className="text-xs font-bold mt-1">{order.amount}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-8 text-center text-xs font-bold text-orange-600 hover:underline transition-all">
        Ver todos los pedidos
      </button>
    </div>
  );
}

// ─── LowStockTable ─────────────────────────────────────────────────────────────
function LowStockTable() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200/50">
      <div className="px-8 py-6 flex justify-between items-center border-b border-zinc-100">
        <h4 className="text-lg font-bold" style={{ fontFamily: "Manrope, sans-serif" }}>
          Alertas de Inventario
        </h4>
        <button className="text-xs font-bold bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors shadow-sm">
          Reponer Stock
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50">
              {["Producto", "Categoría", "SKU", "Stock Actual", "Estado"].map((col) => (
                <th
                  key={col}
                  className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {LOW_STOCK.map((item) => (
              <tr key={item.sku} className="hover:bg-zinc-50 transition-colors cursor-pointer">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-zinc-100 overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-bold">{item.name}</p>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm text-zinc-600">{item.category}</td>
                <td className="px-8 py-5 text-sm font-mono text-zinc-500">{item.sku}</td>
                <td className="px-8 py-5 text-sm font-bold">{item.stock}</td>
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase ${item.statusStyle}`}>
                    {item.statusLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── DashboardPage ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const location  = useLocation();
  const [period, setPeriod]     = useState("Daily");
  const [sideOpen, setSideOpen] = useState(false);

  const sideW = sideOpen ? "16rem" : "4rem";

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar onExpandChange={setSideOpen} />
      <TopBar sideW={sideW} />

      <main
        className="px-8 pb-12 min-h-screen transition-all duration-300"
        style={{ marginLeft: sideW }}
      >
        <div className="max-w-7xl mx-auto space-y-8 pt-8">

          {/* ── Headline ── */}
          <div className="flex flex-wrap justify-between items-end gap-4">
            <div>
              <h2
                className="text-3xl font-black text-zinc-900 tracking-tighter"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Inventory Overview
              </h2>
              <p className="text-zinc-500 font-medium">Real-time status of FerrePro Industrial assets.</p>
            </div>
            <div className="flex gap-0.5 bg-zinc-100 p-1 rounded-xl">
              {["Daily", "Weekly", "Monthly"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    period === p ? "bg-white shadow-sm text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* ── Métricas ──────────────────────────────────────────────────────
              · móvil  (<640px):  2 columnas
              · desktop (≥1280px): 4 columnas
              El sidebar ocupa 256px, por eso usamos xl en lugar de md/lg     */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {METRICS.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* ── Gráfico + Pedidos ──────────────────────────────────────────────
              · móvil  (<1280px): 1 columna → apilados
              · desktop (≥1280px): 3 columnas → chart ocupa 2/3, orders 1/3  */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <WeeklyChart />  {/* xl:col-span-2 dentro del componente */}
            <OrdersToday />
          </div>

          {/* ── Tabla inventario ── */}
          <LowStockTable />

        </div>
      </main>

      {/* ── FAB ── */}
      <button className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 hover:bg-orange-700 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
