// ProveedoresPage.jsx
// Requiere en tu index.html o index.css:
//   <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
//   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
// Y en tu tailwind.config.js asegúrate de tener los colores y fuentes del diseño FerrePro.

import { useState } from "react";

// ─── Datos de ejemplo ──────────────────────────────────────────────────────────
const SUPPLIERS = [
  {
    id: "PROV-1029",
    name: "Industrial Aceros S.A.",
    icon: "build",
    iconBg: "bg-zinc-900",
    iconColor: "text-white",
    category: "Tornillería",
    categoryStyle: "bg-orange-100 text-orange-800",
    contact: "Ing. Roberto Méndez",
    role: "Gerente de Cuentas",
    phone: "+52 555 123 4567",
    status: "Activo",
    statusDot: "bg-orange-600",
  },
  {
    id: "PROV-2055",
    name: "Cementos del Norte",
    icon: "layers",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    category: "Cemento",
    categoryStyle: "bg-zinc-100 text-zinc-700",
    contact: "Alicia Vargas",
    role: "Logística",
    phone: "+52 812 987 6543",
    status: "Activo",
    statusDot: "bg-orange-600",
  },
  {
    id: "PROV-0988",
    name: "Pinturas Estructurales",
    icon: "format_paint",
    iconBg: "bg-orange-600",
    iconColor: "text-white",
    category: "Acabados",
    categoryStyle: "bg-zinc-100 text-zinc-700",
    contact: "Marcos Ruiz",
    role: "Ventas Senior",
    phone: "+52 333 444 5555",
    status: "En Revisión",
    statusDot: "bg-zinc-400",
  },
  {
    id: "PROV-3310",
    name: "Electricidad Global",
    icon: "electric_bolt",
    iconBg: "bg-zinc-400",
    iconColor: "text-white",
    category: "Eléctrico",
    categoryStyle: "bg-zinc-100 text-zinc-700",
    contact: "Samuel Torres",
    role: "Distribución",
    phone: "+52 555 999 0011",
    status: "Inactivo",
    statusDot: "bg-red-600",
  },
];

// ─── Métricas ──────────────────────────────────────────────────────────────────
const METRICS = [
  {
    label: "Total Proveedores",
    value: "42",
    accent: "bg-orange-600",
    sub: "+3 este trimestre",
    subIcon: "trending_up",
    subColor: "text-orange-600",
  },
  {
    label: "Órdenes Pendientes",
    value: "12",
    accent: "bg-zinc-400",
    sub: "8 críticas",
    subIcon: "pending_actions",
    subColor: "text-zinc-500",
    subIconColor: "text-orange-500",
  },
  {
    label: "Categorías Activas",
    value: "14",
    accent: "bg-orange-200",
    sub: "Suministro constante",
    subIcon: "category",
    subColor: "text-zinc-500",
    subIconColor: "text-orange-500",
  },
  {
    label: "Contratos por Vencer",
    value: "03",
    accent: "bg-red-600",
    sub: "Renovación requerida",
    subIcon: "warning",
    subColor: "text-red-600",
  },
];

// ─── NavItems ──────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Dashboard", icon: "dashboard", path: "/" },
  { label: "Inventory", icon: "inventory_2", path: "/inventario" },
  { label: "Orders", icon: "shopping_cart", path: "/ordenes" },
  { label: "Customers", icon: "group", path: "/clientes" },
  { label: "Suppliers", icon: "local_shipping", path: "/proveedores", active: true },
];



// ─── MetricCard ────────────────────────────────────────────────────────────────
function MetricCard({ label, value, accent, sub, subIcon, subColor, subIconColor }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accent}`} />
      <p className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase mb-2">
        {label}
      </p>
      <h3 className="text-4xl font-black text-zinc-900" style={{ fontFamily: "Manrope, sans-serif" }}>
        {value}
      </h3>
      <div className={`mt-4 flex items-center text-xs font-semibold ${subColor}`}>
        <span className={`material-symbols-outlined text-[16px] mr-1 ${subIconColor || subColor}`}>
          {subIcon}
        </span>
        {sub}
      </div>
    </div>
  );
}

// ─── SupplierRow ───────────────────────────────────────────────────────────────
function SupplierRow({ supplier }) {
  return (
    <tr className="hover:bg-orange-50/30 transition-colors group">
      {/* Nombre */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded flex items-center justify-center ${supplier.iconBg}`}>
            <span className={`material-symbols-outlined text-[18px] ${supplier.iconColor}`}>
              {supplier.icon}
            </span>
          </div>
          <div>
            <p className="font-bold text-zinc-900 text-sm">{supplier.name}</p>
            <p className="text-xs text-zinc-500" style={{ fontFamily: "Manrope, sans-serif" }}>
              ID: {supplier.id}
            </p>
          </div>
        </div>
      </td>
      {/* Categoría */}
      <td className="px-6 py-5">
        <span
          className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-tight ${supplier.categoryStyle}`}
        >
          {supplier.category}
        </span>
      </td>
      {/* Contacto */}
      <td className="px-6 py-5">
        <p className="text-sm font-medium text-zinc-900">{supplier.contact}</p>
        <p className="text-xs text-zinc-500">{supplier.role}</p>
      </td>
      {/* Teléfono */}
      <td className="px-6 py-5 text-sm font-mono text-zinc-600">{supplier.phone}</td>
      {/* Estado */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${supplier.statusDot}`} />
          <span className="text-xs font-bold uppercase tracking-tight text-zinc-900">
            {supplier.status}
          </span>
        </div>
      </td>
      {/* Acciones */}
      <td className="px-6 py-5">
        <button className="text-zinc-400 hover:text-orange-600 transition-colors">
          <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </td>
    </tr>
  );
}

// ─── ProveedoresPage ───────────────────────────────────────────────────────────
export default function ProveedoresPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = SUPPLIERS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-zinc-900"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Gestión de Proveedores
          </h2>
          <p className="text-zinc-500 mt-1">
            Control de suministros y relaciones comerciales industriales FerrePro.
          </p>
        </div>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-orange-700 transition-all active:scale-[0.98] shadow-md shadow-orange-600/20">
          <span className="material-symbols-outlined">person_add</span>
          Registrar Nuevo Proveedor
        </button>
      </div>

      {/* ── Métricas ── */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {METRICS.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>

        {/* ── Tabla ── */}
        <div className="bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
          {/* Tabla header */}
          <div className="p-6 flex items-center justify-between border-b border-zinc-100">
            <h3
              className="font-bold text-lg text-zinc-900"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Directorio Detallado
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                <span className="material-symbols-outlined text-zinc-500">filter_list</span>
              </button>
              <button className="p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                <span className="material-symbols-outlined text-zinc-500">file_download</span>
              </button>
            </div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50">
                {[
                  "Nombre de la Empresa",
                  "Categoría",
                  "Contacto Principal",
                  "Teléfono",
                  "Estado",
                  "Acciones",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map((s) => <SupplierRow key={s.id} supplier={s} />)
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400 text-sm">
                    No se encontraron proveedores para "{search}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginación */}
          <div className="p-6 bg-zinc-50 flex justify-between items-center border-t border-zinc-100">
            <span className="text-xs text-zinc-500 font-medium">
              Mostrando {filtered.length} de 42 proveedores registrados
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-xs font-bold border border-zinc-300 rounded hover:bg-white transition-colors text-zinc-700 disabled:opacity-40"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-xs font-bold bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* ── Tarjetas inferiores ── */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured card */}
          <div className="md:col-span-2 relative h-72 rounded-xl overflow-hidden group shadow-lg">
            {/* Fondo de imagen (reemplaza el src con el tuyo) */}
            <div className="absolute inset-0 bg-zinc-800 group-hover:scale-105 transition-transform duration-1000">
              {/* Puedes poner aquí un <img> con tu imagen real */}
              <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-700 to-orange-900 opacity-80" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/40 to-transparent flex flex-col justify-center p-10">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest w-fit mb-4 shadow-sm">
                Destacado del Mes
              </span>
              <h4
                className="text-2xl font-black text-white max-w-sm leading-tight"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                Acero Vanguardia: Nuevo acuerdo de distribución exclusiva
              </h4>
              <p className="text-zinc-200 mt-2 max-w-xs text-sm">
                Precios preferenciales FerrePro en toda la línea de perfiles estructurales
                vigentes hasta diciembre.
              </p>
            </div>
          </div>

          {/* Support card */}
          <div className="bg-orange-50 rounded-xl p-8 flex flex-col justify-between border border-orange-100 shadow-sm">
            <div>
              <h5 className="text-xs font-bold text-orange-600 tracking-widest uppercase mb-4">
                Soporte Estratégico
              </h5>
              <p
                className="font-bold text-zinc-900 text-lg"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                ¿Necesitas ayuda con un nuevo alta?
              </p>
              <p className="text-sm text-zinc-600 mt-3 leading-relaxed">
                Nuestro equipo de adquisiciones revisa las solicitudes en menos de 24 horas hábiles.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center text-orange-600 font-bold text-sm gap-1 group mt-6"
            >
              Manual de proveedores
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
          </div>
        </div>
    </div>
  );
}
