// InventarioPage.jsx
// Usa el layout compartido NavFootAdmi.jsx
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
  {
    label: "Total SKUs",
    value: "1,482",
    accent: "bg-orange-600",
    badge: "+4%",
    badgeStyle: "text-orange-600 bg-orange-50",
  },
  {
    label: "Low Stock Alerts",
    value: "24",
    accent: "bg-red-600",
    badge: "Urgent",
    badgeStyle: "text-red-600 bg-red-50",
  },
  {
    label: "Inventory Value",
    value: "$842.5k",
    accent: "bg-zinc-900",
    badge: "USD",
    badgeStyle: "text-zinc-500 bg-transparent",
  },
  {
    label: "Monthly Turnover",
    value: "3.2x",
    accent: "bg-orange-500",
    badge: "Optimal",
    badgeStyle: "text-emerald-600 bg-emerald-50",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Taladro Percutor 20V Max",
    sku: "HDW-5829-TL",
    category: "Herramientas",
    stock: 42,
    maxStock: 60,
    stockLabel: "42 unidades",
    stockColor: "text-zinc-900",
    barColor: "bg-orange-600",
    barWidth: "70%",
    price: "$189.99",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9wKnsHSHcDD0IzbgikSWdSwtoGNLVY0Ii45H2bR70cn-gY3Z19n5Brwgrf9xpeja6YbbUG4P3xu1kYaYde12oQG9gFYJl4zXt7e_wBGX1JOi3Xu9EUhWkbcBUiR5TBNCifw-5puZsBu9zSsYo2uj-KRv7zWjdszsj4v3XKRugsxussJMBNX9l04MMsnq_bnpV1g0XLs43FcI30tBCCL0Ci5Wv6DWz0aCMLPvfq9MuIbscDVYXrs7q9bBefQ29tRAKUXwS1mR7ppxt",
    outOfStock: false,
  },
  {
    id: 2,
    name: "Cable THHN Calibre 12 - 100m",
    sku: "ELEC-9201-CB",
    category: "Electricidad",
    stock: 8,
    maxStock: 60,
    stockLabel: "8 unidades",
    stockColor: "text-red-600",
    barColor: "bg-red-600",
    barWidth: "20%",
    price: "$75.50",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPK8cnZxYeK14Z8BlvbIFcXRg56Vs_ZYY222SKXNEISzcJ9cKuWq0IKcrjB4NjwXcVff9DSyCFDEcKy2ncBPS8ubXA6tRz-BKFZls_1RW0iYZ9O281d0AmQkX24Gmjrd4Zcj6aVTeBuHQZmgkrZEDACrctERpsB91LiSftC3S9BCew8hhiTKFCpXRE8WAeiC7o9VIHiE3Wca8qccLcrsIhcV2Lfcc5p4aNgfJLEPocvxFkokY1q7KOIyRo9KD2KR5l3IwXOMluX1zE",
    outOfStock: false,
  },
  {
    id: 3,
    name: "Pintura Látex Interior Blanca 5G",
    sku: "PNT-3044-LX",
    category: "Pintura",
    stock: 156,
    maxStock: 180,
    stockLabel: "156 unidades",
    stockColor: "text-zinc-900",
    barColor: "bg-emerald-600",
    barWidth: "90%",
    price: "$124.00",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA0xaloJAaszL94k7ZeVG4TAkOz8ef5WUNKHBRn5vK5pJR2qzNtftlTvcgmxttmmhU4fDH3V5-UHL0M8YKwEZy92vH7L6c6N_nRPRQo4D64QOcy0Q-OBoY3sJC7oWWnLNRsEo9cd_T0bNeNyuqQe8-udXUoHBo_r5moQhKrcDy78S1PkCM9qWF0YTV8dxPSn6TBJ9hhBhLtoZpOtFof5AeecCkSGD4mgnpd_MWXAFmq6NutGehorSDAIbnlK7JrGZ1a5MyHggKXOrjI",
    outOfStock: false,
  },
  {
    id: 4,
    name: 'Tornillo Madera 2.5" (Caja 500)',
    sku: "FJN-1120-SC",
    category: "Fijaciones",
    stock: 210,
    maxStock: 210,
    stockLabel: "210 unidades",
    stockColor: "text-zinc-900",
    barColor: "bg-emerald-600",
    barWidth: "100%",
    price: "$32.25",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZNBIcTAf05qU96bGoiKnuMvNBUMjXoSvvM8PKLaTIbZ9vXIFy2SnBE_gR46sFCi19tifuikOMuvETO7eurrQ5a_PQIxdx5isGrthW8d5_SRk5Db05KNEKLBSI7XWX2kAn_74zdaUmS5mIgsyMaDQ-fJK8C7Fk3X-JtKfS8iIz4eztYG2mCo2tRHiQX1ZnTYBbyDKC9BVuqXXC809XyX5wMzukCTsY1JJgCcjf_T29YkU-cyydgq78n4uZ2qbLiIWYH-06FEhh368Q",
    outOfStock: false,
  },
  {
    id: 5,
    name: "Bombilla LED 9W Luz Fría",
    sku: "ELEC-4421-LB",
    category: "Electricidad",
    stock: 0,
    maxStock: 100,
    stockLabel: "Agotado",
    stockColor: "text-red-600 font-bold",
    barColor: "bg-red-600",
    barWidth: "0%",
    price: "$4.99",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7fViS_tU98bpUAJHhN35y3tc9Twh18OnCic83t0FG8jauNxeQbQoZswTd9EoP41fo6-cnnmSEtz89QJiLFGAar7WAKaIUZc2khg6iOyFX_gMGSd_RUMlTcTg_hvb6lBRDP1YEmbgQ2CHmIhN4HGAFlz22W4xLyEs7X3l1Ibshl9NvFRIdXlhzTOytU2g5zSdXB7ruSCEeCE75tZhQv_kP8J6xWy0CNZ-yCJyrftWBHmUw3iNK6zhlTBwLHTqkEBfXwBHDgYM133WZ",
    outOfStock: true,
  },
];



// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ sideW }) {
  return (
    <header className="w-full top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,28,28,0.06)] transition-all duration-300" style={{ paddingLeft: sideW }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[16px]">search</span>
          <input className="w-full bg-zinc-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600/20 placeholder:text-zinc-500" placeholder="Search industrial inventory..." />
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors active:scale-95">
            <span className="material-symbols-outlined text-orange-600">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-zinc-100 transition-colors active:scale-95">
            <span className="material-symbols-outlined text-orange-600">settings</span>
          </button>
          <div className="h-8 w-8 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZjdoDT1wVQLAQXYIi0DZCmf2nG9xAjNwSZXPUFOII1huqeOVEazLbt-W1LrPQPo3sW4nl876hPdVVREDUO1S6jDOzo2a-RrO0i1tmk4iNM5xJ6-kr9Qb2nBlfmWFxX7jJbrcvtWs3VYq6V2JY7Hro5pqlw51-8cx5Gzldct8GJVYCGJCaVno9sY8_bPpeYy8pA4HFf9v4v7QK-oKX4I4F0qZ6u_YoVX7cpi8lC_WAfelK4b6Ld9dV8483fsmnztgYIwgeV0R5HzuX" alt="Admin" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── MetricCard ────────────────────────────────────────────────────────────────
function MetricCard({ label, value, accent, badge, badgeStyle }) {
  return (
    <div className="bg-white p-6 rounded-xl relative overflow-hidden flex flex-col justify-between border border-zinc-200">
      <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${accent}`} />
      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest" style={{ fontFamily: "Manrope, sans-serif" }}>{label}</span>
      <div className="flex items-end justify-between mt-2">
        <span className="text-2xl font-black text-zinc-900" style={{ fontFamily: "Manrope, sans-serif" }}>{value}</span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${badgeStyle}`}>{badge}</span>
      </div>
    </div>
  );
}

// ─── ProductRow ────────────────────────────────────────────────────────────────
function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="group hover:bg-zinc-50 transition-colors duration-150">
      {/* Imagen */}
      <td className="py-4 px-6">
        <div className={`w-12 h-12 rounded-lg bg-zinc-100 overflow-hidden border border-zinc-200 ${product.outOfStock ? "grayscale opacity-60" : ""}`}>
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </td>
      {/* Nombre + SKU */}
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-zinc-900">{product.name}</span>
          <span className="text-xs text-zinc-500">SKU: {product.sku}</span>
        </div>
      </td>
      {/* Categoría */}
      <td className="py-4 px-6">
        <span className="text-[10px] px-2.5 py-1 bg-orange-50 text-orange-600 font-bold rounded-full uppercase">
          {product.category}
        </span>
      </td>
      {/* Stock + barra */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${product.stockColor}`}>{product.stockLabel}</span>
          <div className={`w-12 h-1.5 rounded-full overflow-hidden ${product.outOfStock ? "bg-red-100" : "bg-zinc-100"}`}>
            <div className={`h-full ${product.barColor}`} style={{ width: product.barWidth }} />
          </div>
        </div>
      </td>
      {/* Precio */}
      <td className="py-4 px-6 font-bold text-sm">{product.price}</td>
      {/* Acciones */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(product)} className="p-1.5 rounded-md hover:bg-zinc-100 text-zinc-500 transition-colors">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button onClick={() => onDelete(product.id)} className="p-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, total, perPage, onPage, onPerPage }) {
  const totalPages = Math.ceil(total / perPage);
  return (
    <div className="py-4 px-8 bg-zinc-50 flex items-center justify-between border-t border-zinc-100">
      <div className="flex gap-2">
        <button
          onClick={() => onPage(page - 1)} disabled={page === 1}
          className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:bg-zinc-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
        {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => (
          <button
            key={p} onClick={() => onPage(p)}
            className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${page === p ? "bg-orange-600 text-white" : "bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-700"}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => onPage(page + 1)} disabled={page === totalPages}
          className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-500 disabled:opacity-30 hover:bg-zinc-50 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-zinc-500">Items per page</span>
        <select
          value={perPage} onChange={(e) => onPerPage(Number(e.target.value))}
          className="bg-white border border-zinc-200 text-xs rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-orange-600 cursor-pointer"
        >
          {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>
    </div>
  );
}

// ─── InventarioPage ────────────────────────────────────────────────────────────
export default function InventarioPage() {
  const [search, setSearch]         = useState("");
  const [filterCat, setFilterCat]   = useState("Todas");
  const [filterStock, setFilterStock] = useState("Stock");
  const [page, setPage]             = useState(1);
  const [perPage, setPerPage]       = useState(10);
  const [products, setProducts]     = useState(PRODUCTS);

  // Filtrado
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat    = filterCat === "Todas" || p.category === filterCat;
    const matchStock  =
      filterStock === "Stock"      ? true :
      filterStock === "En Stock"   ? p.stock > 10 :
      filterStock === "Bajo Stock" ? p.stock > 0 && p.stock <= 10 :
      filterStock === "Agotado"    ? p.stock === 0 : true;
    return matchSearch && matchCat && matchStock;
  });

  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));
  const handleEdit   = (product) => alert(`Editar: ${product.name}`); // reemplaza con tu modal

  const CATEGORIES = ["Todas", "Herramientas", "Electricidad", "Pintura", "Fijaciones"];
  const STOCK_OPTS  = ["Stock", "En Stock", "Bajo Stock", "Agotado"];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">

      {/* ── Page Header ── */}
      <div className="flex flex-wrap items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Inventory Management
          </h2>
          <p className="text-zinc-500 mt-1">Control and monitor your warehouse levels with industrial precision.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-lg text-sm font-semibold hover:bg-zinc-50 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Export CSV
              </button>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 active:scale-[0.98] transition-all shadow-lg shadow-orange-600/10">
                <span className="material-symbols-outlined">add</span>
                Añadir Producto
              </button>
            </div>
          </div>

          {/* ── Métricas ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {METRICS.map((m) => <MetricCard key={m.label} {...m} />)}
          </div>

          {/* ── Filtros ── */}
          <div className="bg-zinc-100 p-4 rounded-xl mb-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-zinc-200">
              <span className="material-symbols-outlined text-[16px] text-zinc-500">filter_list</span>
              <span className="text-sm font-semibold">Filter by:</span>
            </div>

            {/* Búsqueda en filtros */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-[16px]">search</span>
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="bg-white border-none text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-600 w-48"
                placeholder="Buscar producto..."
              />
            </div>

            <select
              value={filterCat}
              onChange={(e) => { setFilterCat(e.target.value); setPage(1); }}
              className="bg-white border-none text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-600 cursor-pointer"
            >
              {CATEGORIES.map((c) => <option key={c}>{c === "Todas" ? `Categoría: ${c}` : c}</option>)}
            </select>

            <select
              value={filterStock}
              onChange={(e) => { setFilterStock(e.target.value); setPage(1); }}
              className="bg-white border-none text-sm rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-orange-600 cursor-pointer"
            >
              {STOCK_OPTS.map((s) => <option key={s}>{s === "Stock" ? `Disponibilidad: ${s}` : s}</option>)}
            </select>

            <div className="ml-auto">
              <span className="text-xs font-medium text-zinc-500">
                Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length} products
              </span>
            </div>
          </div>

          {/* ── Tabla ── */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50">
                    {["Imagen", "Nombre del Producto", "Categoría", "Stock", "Precio", "Acciones"].map((col) => (
                      <th
                        key={col}
                        className={`py-4 px-6 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.05em] ${col === "Acciones" ? "text-right" : ""}`}
                        style={{ fontFamily: "Manrope, sans-serif" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filtered.slice((page - 1) * perPage, page * perPage).length > 0 ? (
                    filtered.slice((page - 1) * perPage, page * perPage).map((p) => (
                      <ProductRow key={p.id} product={p} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-zinc-400 text-sm">
                        No se encontraron productos con los filtros aplicados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <Pagination
              page={page}
              total={filtered.length}
              perPage={perPage}
              onPage={setPage}
              onPerPage={(n) => { setPerPage(n); setPage(1); }}
            />
          </div>

          {/* ── Footer ── */}
          <footer className="mt-12 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-xs">
            <div className="flex items-center gap-8">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-orange-600">verified</span>
                System Sync: 10:45 AM
              </span>
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">cloud_done</span>
                All databases reachable
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-orange-600 transition-colors">Manual de Usuario</a>
              <a href="#" className="hover:text-orange-600 transition-colors">Reportar Error</a>
              <span className="text-zinc-300">|</span>
              <span>© 2024 FerrePro Industrial Systems</span>
            </div>
          </footer>
        </div>

  );
}
