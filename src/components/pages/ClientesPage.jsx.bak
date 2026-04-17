// ClientesPage.jsx
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

const CUSTOMERS = [
  {
    id: "CUST-9921",
    initials: "SM",
    name: "Steel Manufacturing Co.",
    email: "alvaro.s@steelmfg.com",
    phone: "+34 912 345 678",
    total: "€45,230.00",
    badge: "High Value",
    badgeBg: "bg-orange-50 text-orange-700 border border-orange-100",
    lastPurchase: "24 Oct, 2023",
  },
  {
    id: "CUST-8843",
    initials: "HL",
    name: "Heavy Lift Logistics",
    email: "m.garcia@heavylift.es",
    phone: "+34 931 002 991",
    total: "€12,150.50",
    badge: "Active",
    badgeBg: "bg-zinc-100 text-zinc-700",
    lastPurchase: "15 Nov, 2023",
  },
  {
    id: "CUST-7720",
    initials: "BC",
    name: "BuildCorp Solutions",
    email: "compras@buildcorp.com",
    phone: "+34 955 882 110",
    total: "€8,420.00",
    badge: "Standard",
    badgeBg: "bg-zinc-100 text-zinc-500",
    lastPurchase: "02 Nov, 2023",
  },
];

const FOOTER_METRICS = [
  {
    label: "Total Active Clients",
    value: "1,452",
    accent: "border-orange-600",
    sub: "+12% this quarter",
    subIcon: "trending_up",
    subColor: "text-orange-600",
  },
  {
    label: "Avg. Order Value",
    value: "€3,840",
    accent: "border-zinc-900",
    sub: "Steady growth",
    subIcon: "analytics",
    subColor: "text-zinc-600",
  },
  {
    label: "Retention Rate",
    value: "94.2%",
    accent: "border-zinc-400",
    sub: "Elite tier benchmark",
    subIcon: null,
    subColor: "text-zinc-500",
  },
  {
    label: "Pending Invoices",
    value: "24",
    accent: "border-orange-200",
    sub: "Action required",
    subIcon: "priority_high",
    subColor: "text-orange-700",
  },
];

const TIMELINE = [
  {
    icon: "shopping_bag",
    iconColor: "text-orange-600",
    accent: "border-orange-600",
    title: "New Order #8821",
    sub: "2 hours ago • €4,200.00",
  },
  {
    icon: "support_agent",
    iconColor: "text-zinc-600",
    accent: "border-zinc-400",
    title: "Ticket Resolved",
    sub: "Yesterday • Logistics Query",
  },
];



// ─── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ sideW }) {
  return (
    <header className="w-full top-0 sticky z-40 bg-white/80 backdrop-blur-md shadow-[0_8px_24px_rgba(26,28,28,0.06)] transition-all duration-300" style={{ paddingLeft: sideW }}>
      <div className="flex items-center justify-between px-6 py-3">
        <div className="relative w-1/3">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-[16px]">search</span>
          <input className="w-full bg-zinc-100 border-none rounded-lg pl-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-600/40 transition-all" placeholder="Search customers, SKUs, invoices..." />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full transition-colors active:scale-95">
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
          <div className="h-6 w-px bg-zinc-200 mx-2" />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-zinc-900">Admin</p>
              <p className="text-[10px] text-zinc-500">FerrePro Industrial</p>
            </div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCb_N5mmQr6ZqBVbUwpbLlK50ys6ERx7r5NS1KFnw6MZ36mhv0z5036TMaKM3o0NtDiqv9X9MvsIqFlJ_yHmrgwFlDlG5ExPf9C7fT1cJDGxnbA3XvksLxyxdQUY0wi1UZuRY3StlreR7tH5yq5HsJbEU2FHP2TzRa6JABkgqnVEDPwN9mX-fSMlcbmxSrl1Ma9uYO7lwcT2EmwjLatH-PD0FR9KA55MSH7YQ9KVHSBODhPSFtrK57YMRyknzFPG4PKLpVN-QOD48t2"
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border border-zinc-200"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── CustomerRow ───────────────────────────────────────────────────────────────
function CustomerRow({ customer, onSelect, isSelected }) {
  return (
    <tr
      onClick={() => onSelect(customer)}
      className={`hover:bg-zinc-50/50 transition-colors group cursor-pointer ${isSelected ? "bg-orange-50/30" : ""}`}
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm flex-shrink-0">
            {customer.initials}
          </div>
          <div>
            <p className="font-bold text-sm text-zinc-900">{customer.name}</p>
            <p className="text-xs text-zinc-500">ID: #{customer.id}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <p className="text-sm text-zinc-900 font-medium">{customer.email}</p>
        <p className="text-xs text-zinc-500">{customer.phone}</p>
      </td>
      <td className="px-6 py-5">
        <p className="text-sm font-extrabold text-zinc-900">{customer.total}</p>
        <span className={`text-[10px] font-bold inline-block px-1.5 py-0.5 rounded mt-0.5 ${customer.badgeBg}`}>
          {customer.badge}
        </span>
      </td>
      <td className="px-6 py-5 text-sm text-zinc-900">{customer.lastPurchase}</td>
      <td className="px-6 py-5 text-right">
        <button className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-orange-600 transition-all">
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </td>
    </tr>
  );
}

// ─── KeyAccountCard ────────────────────────────────────────────────────────────
function KeyAccountCard() {
  return (
    <div className="bg-zinc-900 text-white rounded-xl p-8 relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-widest bg-orange-600 px-2 py-1 rounded-sm mb-4 inline-block">
          Key Account Focus
        </span>
        <div className="flex items-start justify-between mb-8">
          <h3 className="text-3xl font-black leading-tight" style={{ fontFamily: "Manrope, sans-serif" }}>
            Advanced<br />Robotics S.A.
          </h3>
          <div className="w-14 h-14 rounded-full bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30 flex-shrink-0">
            <span className="material-symbols-outlined text-white">bolt</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-zinc-400 text-xs">Total Compras</span>
            <span className="font-extrabold">€124,500.00</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-zinc-400 text-xs">Crédito Disponible</span>
            <span className="font-extrabold text-orange-400">€50,000.00</span>
          </div>
        </div>
        <button className="mt-8 w-full bg-white text-zinc-900 py-3 rounded-lg font-bold text-sm hover:bg-zinc-100 transition-colors">
          Ver Perfil Detallado
        </button>
      </div>
      {/* Glow decorativo */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}

// ─── ContactDetails ────────────────────────────────────────────────────────────
function ContactDetails() {
  const items = [
    { icon: "alternate_email", label: "Primary Email", value: "orders@adv-robotics.com" },
    { icon: "call",            label: "Phone",         value: "+34 934 112 000"          },
    { icon: "location_on",     label: "Office",        value: "Barcelona, Tech Hub"       },
  ];
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200">
      <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Contact Details</h4>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.label} className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-zinc-900 text-[18px]">{item.icon}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{item.label}</p>
              <p className="text-sm font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ActivityTimeline ──────────────────────────────────────────────────────────
function ActivityTimeline() {
  return (
    <div className="bg-zinc-100/50 border border-zinc-200 rounded-xl p-6">
      <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Activity Timeline</h4>
      <div className="space-y-3">
        {TIMELINE.map((item) => (
          <div key={item.title} className={`p-3 bg-white rounded-lg border-l-4 ${item.accent} shadow-sm flex items-center gap-3`}>
            <span className={`material-symbols-outlined text-[18px] ${item.iconColor}`}>{item.icon}</span>
            <div className="text-xs">
              <p className="font-bold">{item.title}</p>
              <p className="text-zinc-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FooterMetricCard ──────────────────────────────────────────────────────────
function FooterMetricCard({ label, value, accent, sub, subIcon, subColor }) {
  return (
    <div className={`bg-white p-6 rounded-xl border border-zinc-200 border-l-4 ${accent} shadow-sm`}>
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-extrabold" style={{ fontFamily: "Manrope, sans-serif" }}>{value}</p>
      <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 ${subColor}`}>
        {subIcon && <span className="material-symbols-outlined text-[12px]">{subIcon}</span>}
        {sub}
      </p>
    </div>
  );
}

// ─── ClientesPage ──────────────────────────────────────────────────────────────
export default function ClientesPage() {
  const location = useLocation();
  const [sideOpen, setSideOpen]       = useState(false);
  const [page, setPage]               = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const sideW = sideOpen ? "16rem" : "4rem";

  return (
    <div className="bg-zinc-50 text-zinc-900 min-h-screen" style={{ fontFamily: "Inter, sans-serif" }}>
      <Sidebar onExpandChange={setSideOpen} />
      <TopBar sideW={sideW} />

      <main className="pb-12 min-h-screen transition-all duration-300" style={{ marginLeft: sideW }}>
        <div className="p-8">

          {/* ── Page Header ── */}
          <div className="flex flex-wrap justify-between items-end mb-10 gap-4">
            <div>
              {/* Breadcrumb */}
              <nav className="flex gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 items-center">
                <span>Directory</span>
                <span className="material-symbols-outlined text-[12px] leading-none">chevron_right</span>
                <span className="text-orange-600">Customers</span>
              </nav>
              <h2 className="text-4xl font-extrabold tracking-tighter text-zinc-900" style={{ fontFamily: "Manrope, sans-serif" }}>
                Client Directory
              </h2>
              <p className="text-zinc-500 mt-1">Manage industrial accounts and order history analytics.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-zinc-100 text-zinc-900 font-bold rounded-lg hover:bg-zinc-200 transition-all flex items-center gap-2 text-sm border border-zinc-200">
                <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
              </button>
              <button className="px-6 py-3 bg-zinc-900 text-white font-bold rounded-lg hover:bg-black active:scale-95 transition-all flex items-center gap-2 text-sm shadow-xl shadow-zinc-900/10">
                <span className="material-symbols-outlined">person_add</span> New Customer
              </button>
            </div>
          </div>

          {/* ── Layout principal ── */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* ── Tabla 8 cols ── */}
            <div className="xl:col-span-8 bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-200">
              <div className="p-6 flex justify-between items-center bg-zinc-50/50">
                <h3 className="font-bold text-lg tracking-tight" style={{ fontFamily: "Manrope, sans-serif" }}>Active Accounts</h3>
                <button className="p-2 rounded-lg bg-white border border-zinc-200 hover:bg-zinc-50 transition-colors">
                  <span className="material-symbols-outlined text-[18px]">filter_list</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      {["Cliente", "Contacto", "Total Compras", "Última Compra", ""].map((col) => (
                        <th key={col} className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {CUSTOMERS.map((c) => (
                      <CustomerRow
                        key={c.id}
                        customer={c}
                        onSelect={setSelectedCustomer}
                        isSelected={selectedCustomer?.id === c.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Paginación */}
              <div className="p-6 flex justify-between items-center border-t border-zinc-100">
                <p className="text-xs text-zinc-500 font-medium">Mostrando 1-3 de 156 clientes</p>
                <div className="flex gap-1">
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${page === p ? "bg-orange-600 text-white shadow-sm" : "hover:bg-zinc-100 text-zinc-500"}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Panel derecho 4 cols ── */}
            <div className="xl:col-span-4 space-y-6">
              <KeyAccountCard />
              <ContactDetails />
              <ActivityTimeline />
            </div>
          </div>

          {/* ── Footer Metrics ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
            {FOOTER_METRICS.map((m) => (
              <FooterMetricCard key={m.label} {...m} />
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
