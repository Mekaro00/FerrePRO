import React, { useState } from "react";
import { 
    IconUsers, 
    IconUserPlus, 
    IconDownload, 
    IconFilter, 
    IconMail, 
    IconPhone, 
    IconMapPin, 
    IconBolt, 
    IconTrendingUp, 
    IconDeviceAnalytics,
    IconAlertCircle,
    IconChevronRight,
    IconShoppingBag,
    IconHeadset
} from '@tabler/icons-react';

// --- Datos de Ejemplo ---
const CUSTOMERS = [
    { id: "CUST-9921", initials: "SM", name: "Steel Manufacturing Co.", email: "alvaro.s@steelmfg.com", phone: "+34 912 345 678", total: "$45,230.00", badge: "HIGH VALUE", badgeClass: "bg-orange-subtle text-orange", lastPurchase: "24 Oct, 2023" },
    { id: "CUST-8843", initials: "HL", name: "Heavy Lift Logistics", email: "m.garcia@heavylift.es", phone: "+34 931 002 991", total: "$12,150.50", badge: "ACTIVE", badgeClass: "bg-zinc-100 text-zinc-700", lastPurchase: "15 Nov, 2023" },
    { id: "CUST-7720", initials: "BC", name: "BuildCorp Solutions", email: "compras@buildcorp.com", phone: "+34 955 882 110", total: "$8,420.00", badge: "STANDARD", badgeClass: "bg-light text-muted", lastPurchase: "02 Nov, 2023" },
];

const FOOTER_METRICS = [
    { label: "Clientes Activos", value: "1,452", border: "#ff6600", sub: "+12% este trimestre", icon: <IconTrendingUp size={14}/>, subClass: "text-orange" },
    { label: "Valor Promedio", value: "$3,840", border: "#1a1a1a", sub: "Crecimiento constante", icon: <IconDeviceAnalytics size={14}/>, subClass: "text-muted" },
    { label: "Tasa Retención", value: "94.2%", border: "#cbd5e1", sub: "Nivel Élite", icon: null, subClass: "text-muted" },
    { label: "Facturas Pendientes", value: "24", border: "#ffb380", sub: "Acción requerida", icon: <IconAlertCircle size={14}/>, subClass: "text-danger" },
];

export default function ClientesPage() {
    const [page, setPage] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState(CUSTOMERS[0]);

    return (
        <div className="container-fluid pb-5">
            {/* Header con Breadcrumb */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                <div>
                    <nav className="small text-uppercase fw-black mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>
                        <span className="text-muted">Directorio</span>
                        <IconChevronRight size={10} className="mx-1 text-muted" />
                        <span className="text-orange">Clientes</span>
                    </nav>
                    <h2 className="fw-black tracking-tighter mb-0">Directorio de Clientes</h2>
                    <p className="text-muted small">Gestión de cuentas industriales y análisis de historial.</p>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-light border d-flex align-items-center gap-2 fw-bold small">
                        <IconDownload size={18} /> EXPORTAR CSV
                    </button>
                    <button className="btn btn-dark d-flex align-items-center gap-2 fw-bold small shadow-sm">
                        <IconUserPlus size={18} /> NUEVO CLIENTE
                    </button>
                </div>
            </div>

            <div className="row g-4">
                {/* Tabla de Clientes (8 cols) */}
                <div className="col-xl-8">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center border-bottom">
                            <h6 className="fw-bold mb-0">Cuentas Activas</h6>
                            <button className="btn btn-sm btn-light border"><IconFilter size={16}/></button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr className="small text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>
                                        <th className="ps-4">Cliente</th>
                                        <th>Contacto</th>
                                        <th>Total Compras</th>
                                        <th>Última Compra</th>
                                        <th className="text-end pe-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CUSTOMERS.map((c) => (
                                        <tr 
                                            key={c.id} 
                                            onClick={() => setSelectedCustomer(c)}
                                            style={{ cursor: 'pointer' }}
                                            className={selectedCustomer?.id === c.id ? "table-active" : ""}
                                        >
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="bg-orange-subtle text-orange rounded fw-bold d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px' }}>
                                                        {c.initials}
                                                    </div>
                                                    <div>
                                                        <div className="small fw-bold text-dark">{c.name}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>#{c.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="small fw-medium text-dark">{c.email}</div>
                                                <div className="text-muted small">{c.phone}</div>
                                            </td>
                                            <td>
                                                <div className="small fw-black">{c.total}</div>
                                                <span className={`badge ${c.badgeClass}`} style={{ fontSize: '0.6rem' }}>{c.badge}</span>
                                            </td>
                                            <td className="small text-dark">{c.lastPurchase}</td>
                                            <td className="text-end pe-4">
                                                <IconChevronRight size={18} className="text-muted opacity-50" />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer bg-white p-3 d-flex justify-content-between align-items-center border-top">
                            <small className="text-muted">Mostrando 1-3 de 156 clientes</small>
                            <div className="btn-group btn-group-sm">
                                {[1, 2, 3].map(p => (
                                    <button key={p} className={`btn ${page === p ? 'btn-orange' : 'btn-light border'}`} onClick={() => setPage(p)}>{p}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel Derecho - Detalle (4 cols) */}
                <div className="col-xl-4">
                    <div className="card bg-dark text-white border-0 shadow mb-4 p-4 overflow-hidden position-relative">
                        <div className="position-relative z-index-1">
                            <span className="badge bg-orange text-white mb-3" style={{ fontSize: '0.6rem' }}>ENFOQUE CUENTA CLAVE</span>
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <h3 className="fw-black">Advanced<br />Robotics S.A.</h3>
                                <div className="bg-orange p-3 rounded-circle shadow">
                                    <IconBolt size={24} />
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between border-bottom border-secondary pb-2 mb-2">
                                    <small className="text-muted">Total Compras</small>
                                    <span className="fw-bold">$124,500.00</span>
                                </div>
                                <div className="d-flex justify-content-between border-bottom border-secondary pb-2">
                                    <small className="text-muted">Crédito Disponible</small>
                                    <span className="fw-bold text-orange">$50,000.00</span>
                                </div>
                            </div>
                            <button className="btn btn-white w-100 fw-bold small py-2">VER PERFIL DETALLADO</button>
                        </div>
                        <div className="position-absolute end-0 bottom-0 bg-orange opacity-10 rounded-circle" style={{ width: '150px', height: '150px', transform: 'translate(20%, 20%)', filter: 'blur(50px)' }}></div>
                    </div>

                    <div className="card border-0 shadow-sm p-4 mb-4">
                        <h6 className="small fw-black text-muted text-uppercase mb-4">Detalles de Contacto</h6>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-light border p-2 rounded"><IconMail size={18}/></div>
                                <div>
                                    <div className="text-muted fw-bold" style={{ fontSize: '0.65rem' }}>EMAIL PRINCIPAL</div>
                                    <div className="small fw-bold">orders@adv-robotics.com</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-light border p-2 rounded"><IconPhone size={18}/></div>
                                <div>
                                    <div className="text-muted fw-bold" style={{ fontSize: '0.65rem' }}>TELÉFONO</div>
                                    <div className="small fw-bold">+34 934 112 000</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-light border p-2 rounded"><IconMapPin size={18}/></div>
                                <div>
                                    <div className="text-muted fw-bold" style={{ fontSize: '0.65rem' }}>OFICINA</div>
                                    <div className="small fw-bold">Bogotá, Zona Industrial</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-light border-0 p-4">
                        <h6 className="small fw-black text-muted text-uppercase mb-3">Línea de Tiempo</h6>
                        <div className="d-flex flex-column gap-2">
                            <div className="bg-white p-2 rounded border-start border-orange border-4 shadow-sm d-flex align-items-center gap-2">
                                <IconShoppingBag size={16} className="text-orange" />
                                <div style={{ fontSize: '0.75rem' }}>
                                    <div className="fw-bold">Nuevo Pedido #8821</div>
                                    <div className="text-muted">Hace 2 horas • $4,200.00</div>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded border-start border-secondary border-4 shadow-sm d-flex align-items-center gap-2">
                                <IconHeadset size={16} className="text-muted" />
                                <div style={{ fontSize: '0.75rem' }}>
                                    <div className="fw-bold">Ticket Resuelto</div>
                                    <div className="text-muted">Ayer • Consulta Logística</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Metrics */}
            <div className="row g-4 mt-2">
                {FOOTER_METRICS.map((m, i) => (
                    <div className="col-md-3" key={i}>
                        <div className="card border-0 shadow-sm p-4" style={{ borderLeft: `4px solid ${m.border}` }}>
                            <small className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem' }}>{m.label}</small>
                            <h3 className="fw-black my-1">{m.value}</h3>
                            <div className={`d-flex align-items-center gap-1 small fw-bold ${m.subClass}`}>
                                {m.icon} {m.sub}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}