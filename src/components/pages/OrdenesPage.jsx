import React, { useState } from "react";
import { 
    IconShoppingCart, 
    IconPlus, 
    IconDownload, 
    IconFilter, 
    IconCreditCard, 
    IconBuildingBank, 
    IconCash, 
    IconDotsVertical, 
    IconChevronLeft, 
    IconChevronRight,
    IconBolt,
    IconDeviceAnalytics
} from '@tabler/icons-react';

// --- Datos de Ejemplo ---
const METRICS = [
    { label: "Total Pendientes", value: "124", accent: "#ff6600", badge: "+12%", badgeClass: "text-danger" },
    { label: "En Camino", value: "42", accent: "#64748b", badge: "Normal", badgeClass: "text-orange" },
    { label: "Pagados Hoy", value: "$14,200", accent: "#ffb380", badge: "Peak", badgeClass: "text-orange" },
    { label: "Tiempo Promedio", value: "1.4d", accent: "#1a1a1a", badge: "-0.2d", badgeClass: "text-success" },
];

const ORDERS = [
    { id: "#PS-88291", client: "Jorge Sánchez", type: "person", initials: "JS", date: "12 Oct 2023", total: "$1,450.00", status: "PAGADO", statusClass: "bg-success-subtle text-success", method: "Visa **42", icon: <IconCreditCard size={16}/> },
    { id: "#PS-88292", client: "Constructora Sigma", type: "company", initials: null, date: "12 Oct 2023", total: "$8,900.50", status: "PENDIENTE", statusClass: "bg-orange-subtle text-orange", method: "Transferencia", icon: <IconBuildingBank size={16}/> },
    { id: "#PS-88293", client: "Marta López", type: "person", initials: "ML", date: "11 Oct 2023", total: "$320.10", status: "ENVIADO", statusClass: "bg-info-subtle text-info", method: "Efectivo", icon: <IconCash size={16}/> },
];

const FILTERS = ["Todos", "Pendiente", "Pagado", "Enviado"];

export default function OrdenesPage() {
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [search, setSearch] = useState("");

    const filtered = ORDERS.filter((o) => {
        const matchFilter = activeFilter === "Todos" || o.status.toLowerCase() === activeFilter.toLowerCase();
        const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.client.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    return (
        <div className="container-fluid pb-5">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                <div>
                    <h2 className="fw-bold mb-1">Gestión de Pedidos</h2>
                    <p className="text-muted small">Visualización y control de flujo de órdenes activas.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-light border d-flex align-items-center gap-2 fw-bold">
                        <IconDownload size={18} /> EXPORTAR
                    </button>
                    <button className="btn btn-orange shadow-sm d-flex align-items-center gap-2 fw-bold">
                        <IconPlus size={18} /> NUEVO PEDIDO
                    </button>
                </div>
            </div>

            {/* Métricas */}
            <div className="row g-4 mb-4">
                {METRICS.map((m, i) => (
                    <div className="col-md-3" key={i}>
                        <div className="card card-stat border-0 shadow-sm" style={{borderLeft: `4px solid ${m.accent}`}}>
                            <span className="text-muted fw-bold small text-uppercase" style={{fontSize: '0.6rem'}}>{m.label}</span>
                            <div className="d-flex align-items-center gap-2 mt-1">
                                <h3 className="fw-black mb-0">{m.value}</h3>
                                <small className={`${m.badgeClass} fw-bold`}>{m.badge}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabla de Pedidos */}
            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="card-header bg-white p-3 border-bottom d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2">
                        {FILTERS.map(f => (
                            <button 
                                key={f} 
                                onClick={() => setActiveFilter(f)}
                                className={`btn btn-sm rounded-pill px-3 fw-bold ${activeFilter === f ? 'btn-orange' : 'btn-light border'}`}
                                style={{fontSize: '0.7rem'}}
                            >
                                {f.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <div className="input-group input-group-sm" style={{width: '200px'}}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Buscar pedido..." 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="small text-muted text-uppercase">
                                <th className="ps-4">ID Pedido</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Estado</th>
                                <th>Método</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((order) => (
                                <tr key={order.id}>
                                    <td className="ps-4 fw-bold text-orange small">{order.id}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={`rounded-circle bg-light d-flex align-items-center justify-content-center fw-bold text-muted`} style={{width: '32px', height: '32px', fontSize: '0.7rem', border: '1px solid #eee'}}>
                                                {order.initials || "C"}
                                            </div>
                                            <span className="small fw-bold">{order.client}</span>
                                        </div>
                                    </td>
                                    <td className="small text-muted">{order.date}</td>
                                    <td className="small fw-black">{order.total}</td>
                                    <td>
                                        <span className={`badge ${order.statusClass} rounded-pill`} style={{fontSize: '0.6rem'}}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="small text-muted">
                                        <div className="d-flex align-items-center gap-1">
                                            {order.icon} {order.method}
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-light border"><IconDotsVertical size={16}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer bg-light p-3 d-flex justify-content-between align-items-center">
                    <small className="text-muted">Mostrando {filtered.length} resultados</small>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className="page-item disabled"><a className="page-link" href="#"><IconChevronLeft size={14}/></a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#"><IconChevronRight size={14}/></a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Bottom Cards */}
            <div className="row g-4 mt-2">
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                                <IconDeviceAnalytics className="text-orange" /> Actividad de Pedidos (Últimas 24h)
                            </h6>
                            <span className="badge bg-orange-subtle text-orange small animate-pulse">● EN VIVO</span>
                        </div>
                        <div className="bg-light rounded d-flex align-items-end justify-content-between px-4 py-2" style={{height: '100px'}}>
                            {[40, 70, 50, 90, 60, 100, 30].map((h, i) => (
                                <div key={i} className="bg-orange" style={{height: `${h}%`, width: '10%', borderRadius: '4px 4px 0 0', opacity: (h/100)}}></div>
                            ))}
                        </div>
                        <div className="row text-center mt-3">
                            <div className="col-4"><small className="text-muted d-block">Mañana</small><strong>28</strong></div>
                            <div className="col-4"><small className="text-muted d-block">Tarde</small><strong>54</strong></div>
                            <div className="col-4"><small className="text-muted d-block">Noche</small><strong>12</strong></div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card bg-orange text-white border-0 shadow p-4 h-100">
                        <IconBolt size={32} className="mb-3" />
                        <h5 className="fw-bold">Sugerencia de Inventario</h5>
                        <p className="small opacity-75">Detectamos un aumento del 15% en pedidos de "Válvulas Industriales". ¿Deseas automatizar un pedido?</p>
                        <button className="btn btn-light text-orange fw-bold btn-sm mt-auto">REVISAR STOCK</button>
                    </div>
                </div>
            </div>
        </div>
    );
}