// OrdenesPage.jsx
// Requiere en tu index.html:
//   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
//   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>

import { useState } from "react";

// ─── Datos ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Dashboard",  icon: "dashboard",      path: "/"            },
  { label: "Inventory",  icon: "inventory_2",    path: "/inventario"  },
  { label: "Orders",     icon: "shopping_cart",  path: "/ordenes"     },
  { label: "Customers",  icon: "group",          path: "/clientes"    },
  { label: "Suppliers",  icon: "local_shipping", path: "/proveedores" },
];

const METRICS = [
  { label: "Total Pendientes", value: "124",     accent: "bg-orange-600", badge: "+12%",  badgeColor: "text-red-600"    },
  { label: "En Camino",        value: "42",      accent: "bg-zinc-300",   badge: "Normal",badgeColor: "text-orange-600" },
  { label: "Pagados Hoy",      value: "$14,200", accent: "bg-orange-500", badge: "Peak",  badgeColor: "text-orange-600" },
  { label: "Tiempo Promedio",  value: "1.4d",    accent: "bg-zinc-800",   badge: "-0.2d", badgeColor: "text-orange-600" },
];

const ORDERS = [
  {
    id: "#PS-88291",
    clientInitials: "JS",
    clientName: "Jorge Sánchez",
    clientType: "person",
    date: "12 Oct 2023",
    total: "$1,450.00",
    status: "Pagado",
    statusStyle: "bg-green-100 text-green-700",
    methodIcon: "credit_card",
    method: "Visa **42",
  },
  {
    id: "#PS-88292",
    clientInitials: null,
    clientIcon: "corporate_fare",
    clientName: "Constructora Sigma",
    clientType: "company",
    date: "12 Oct 2023",
    total: "$8,900.50",
    status: "Pendiente",
    statusStyle: "bg-orange-100 text-orange-700",
    methodIcon: "account_balance",
    method: "Transferencia",
  },
  {
    id: "#PS-88293",
    clientInitials: "ML",
    clientName: "Marta López",
    clientType: "person",
    date: "11 Oct 2023",
    total: "$320.10",
    status: "Enviado",
    statusStyle: "bg-blue-100 text-blue-700",
    methodIcon: "payments",
    method: "Efectivo",
  },
];

const FILTERS = ["Todos", "Pendiente", "Pagado", "Enviado"];

const ACTIVITY_BARS = [
  { h: "50%", opacity: "bg-orange-600/20" },
  { h: "75%", opacity: "bg-orange-600/20" },
  { h: "66%", opacity: "bg-orange-600/40" },
  { h: "100%",opacity: "bg-orange-600/20" },
  { h: "50%", opacity: "bg-orange-600/60" },
  { h: "83%", opacity: "bg-orange-600"    },
  { h: "25%", opacity: "bg-orange-600/30" },
];



// ─── MetricCard ────────────────────────────────────────────────────────────────
function MetricCard({ label, value, accent, badge, badgeColor }) {
  return (
    <div className="bg-white p-5 rounded-xl flex flex-col justify-between relative overflow-hidden border border-zinc-200">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent}`} />
      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-black text-zinc-900" style={{ fontFamily: "Manrope, sans-serif" }}>{value}</span>
        <span className={`text-xs font-bold ${badgeColor}`}>{badge}</span>
      </div>
    </div>
  );
}

// ─── OrderRow ──────────────────────────────────────────────────────────────────
function OrderRow({ order }) {
  return (
    <tr className="hover:bg-zinc-50 transition-colors group">
      <td className="px-6 py-5">
        <span className="font-bold text-orange-600 text-sm">{order.id}</span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          {order.clientType === "company" ? (
            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">{order.clientIcon}</span>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-900 text-xs font-bold flex-shrink-0">
              {order.clientInitials}
            </div>
          )}
          <span className="text-sm font-semibold text-zinc-900">{order.clientName}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-zinc-500">{order.date}</td>
      <td className="px-6 py-5 text-sm font-bold text-zinc-900">{order.total}</td>
      <td className="px-6 py-5">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${order.statusStyle}`}>
          {order.status}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
          <span className="material-symbols-outlined text-[18px]">{order.methodIcon}</span>
          {order.method}
        </div>
      </td>
      <td className="px-6 py-5 text-right">
        <button className="p-1 hover:bg-zinc-200 rounded-md transition-colors">
          <span className="material-symbols-outlined text-zinc-400">more_vert</span>
        </button>
      </td>
    </tr>
  );
}

// ─── ActivityCard ──────────────────────────────────────────────────────────────
function ActivityCard() {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-zinc-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-black tracking-tight text-zinc-900" style={{ fontFamily: "Manrope, sans-serif" }}>
          Actividad de Pedidos (Últimas 24h)
        </h3>
        <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse inline-block" />
          En Vivo
        </span>
      </div>
      {/* Mini chart */}
      <div className="h-32 w-full bg-zinc-50 rounded-lg flex items-end px-4 py-2 gap-2">
        {ACTIVITY_BARS.map((bar, i) => (
          <div key={i} className={`flex-1 rounded-t ${bar.opacity}`} style={{ height: bar.h }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 text-center">
        {[{ label: "Mañana", val: "28" }, { label: "Tarde", val: "54" }, { label: "Noche", val: "12" }].map((s) => (
          <div key={s.label}>
            <p className="text-[10px] uppercase font-bold text-zinc-500">{s.label}</p>
            <p className="text-sm font-black text-zinc-900">{s.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SuggestionCard ────────────────────────────────────────────────────────────
function SuggestionCard() {
  return (
    <div className="bg-orange-600 text-white p-6 rounded-xl shadow-xl shadow-orange-600/20 flex flex-col justify-between">
      <div>
        <span className="material-symbols-outlined text-[32px] mb-4 block">bolt</span>
        <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
          Sugerencia de Inventario
        </h3>
        <p className="text-sm text-orange-50 leading-relaxed opacity-90">
          Detectamos un aumento del 15% en pedidos de "Válvulas Industriales". ¿Deseas automatizar un pedido a proveedor?
        </p>
      </div>
      <button className="mt-6 w-full bg-white text-orange-600 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-50 transition-colors active:scale-95">
        Revisar Stock
      </button>
    </div>
  );
}

// ─── OrdenesPage ───────────────────────────────────────────────────────────────
export default function OrdenesPage() {
  const [search, setSearch]     = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [sortBy, setSortBy]     = useState("Fecha (Reciente)");
  const [page, setPage]         = useState(1);

  // Filtrar pedidos
  const filtered = ORDERS.filter((o) => {
    const matchFilter = activeFilter === "Todos" || o.status === activeFilter;
    const matchSearch = search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="pt-8 px-8 pb-12">

          {/* ── Header ── */}
          <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-2" style={{ fontFamily: "Manrope, sans-serif" }}>
                Gestión de Pedidos
              </h2>
              <p className="text-zinc-500 font-medium">Visualización y control de flujo de órdenes activas.</p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white text-zinc-900 px-4 py-2.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 transition-colors font-semibold text-sm">
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                Exportar
              </button>
              <button className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg hover:bg-orange-700 transition-colors font-bold text-sm shadow-lg shadow-orange-600/20 active:scale-95">
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                Nuevo Pedido
              </button>
            </div>
          </div>

          {/* ── Métricas ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {METRICS.map((m) => <MetricCard key={m.label} {...m} />)}
          </div>

          {/* ── Tabla Card ── */}
          <section className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm">

            {/* Filter Bar */}
            <div className="p-4 bg-zinc-50/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => { setActiveFilter(f); setPage(1); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeFilter === f
                        ? "bg-orange-600 text-white"
                        : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-500"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex items-center text-xs font-bold text-zinc-500 uppercase tracking-tighter gap-1">
                <span className="material-symbols-outlined text-[16px]">sort</span>
                Ordenar por:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-xs font-bold text-zinc-900 ml-1 cursor-pointer"
                >
                  <option>Fecha (Reciente)</option>
                  <option>Total (Mayor)</option>
                  <option>Cliente</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50/30">
                    {["ID Pedido", "Cliente", "Fecha", "Total", "Estado", "Método", "Acciones"].map((col) => (
                      <th
                        key={col}
                        className={`px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest ${col === "Acciones" ? "text-right" : ""}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {filtered.length > 0 ? (
                    filtered.map((order) => <OrderRow key={order.id} order={order} />)
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center text-zinc-400 text-sm">
                        No se encontraron pedidos con los filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 bg-zinc-50/20 flex items-center justify-between border-t border-zinc-200">
              <span className="text-xs text-zinc-500 font-medium">
                Mostrando {filtered.length} de 1,240 resultados
              </span>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${page === p ? "bg-orange-600 text-white" : "hover:bg-zinc-100 text-zinc-600"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === 3}
                  className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-100 transition-colors disabled:opacity-30"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </section>

          {/* ── Bottom Cards ── */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ActivityCard />
            <SuggestionCard />
          </div>

        </div>

  );
}
