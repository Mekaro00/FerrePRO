import React, { useState } from "react";
import { 
    IconTruckDelivery, 
    IconPlus, 
    IconPhone, 
    IconMail, 
    IconFilter, 
    IconDownload, 
    IconDots,
    IconTrendingUp,
    IconAlertTriangle,
    IconCategory,
    IconClock
} from '@tabler/icons-react';

// --- Datos de ejemplo ---
const SUPPLIERS = [
    { id: "PROV-1029", name: "Industrial Aceros S.A.", category: "Tornillería", contact: "Ing. Roberto Méndez", role: "Gerente", phone: "+57 310 123 4567", status: "ACTIVO", badge: "bg-success" },
    { id: "PROV-2055", name: "Cementos del Norte", category: "Cemento", contact: "Alicia Vargas", role: "Logística", phone: "+57 320 987 6543", status: "ACTIVO", badge: "bg-success" },
    { id: "PROV-0988", name: "Pinturas Estructurales", category: "Acabados", contact: "Marcos Ruiz", role: "Ventas", phone: "+57 315 444 5555", status: "REVISIÓN", badge: "bg-warning text-dark" },
    { id: "PROV-3310", name: "Electricidad Global", category: "Eléctrico", contact: "Samuel Torres", role: "Distribución", phone: "+57 300 999 0011", status: "INACTIVO", badge: "bg-danger" },
];

export default function ProveedoresPage() {
    const [search, setSearch] = useState("");

    const filtered = SUPPLIERS.filter(
        (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container-fluid">
            {/* Header */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
                <div>
                    <h2 className="fw-bold mb-1">Gestión de Proveedores</h2>
                    <p className="text-muted small">Control de suministros y relaciones comerciales FerrePro.</p>
                </div>
                <button className="btn btn-orange shadow-sm d-flex align-items-center gap-2 fw-bold py-2 px-4">
                    <IconPlus size={20} /> REGISTRAR NUEVO PROVEEDOR
                </button>
            </div>

            {/* Métricas */}
            <div className="row g-4 mb-5">
                <StatCard title="TOTAL PROVEEDORES" value="42" sub="+3 este mes" icon={<IconTrendingUp size={20}/>} color="#ff6600" />
                <StatCard title="ÓRDENES PENDIENTES" value="12" sub="8 críticas" icon={<IconClock size={20}/>} color="#64748b" />
                <StatCard title="CATEGORÍAS" value="14" sub="Suministro constante" icon={<IconCategory size={20}/>} color="#ffb380" />
                <StatCard title="POR VENCER" value="03" sub="Renovación requerida" icon={<IconAlertTriangle size={20}/>} color="#dc3545" />
            </div>

            {/* Tabla de Proveedores */}
            <div className="card card-stat border-0 shadow-sm overflow-hidden">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                    <h5 className="fw-bold mb-0">Directorio Detallado</h5>
                    <div className="d-flex gap-2">
                        <div className="input-group input-group-sm" style={{width: '250px'}}>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Buscar proveedor..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-sm btn-light border"><IconFilter size={18}/></button>
                        <button className="btn btn-sm btn-light border"><IconDownload size={18}/></button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="small text-muted text-uppercase">
                                <th className="ps-4">Nombre de la Empresa</th>
                                <th>Categoría</th>
                                <th>Contacto Principal</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th className="text-end pe-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-light p-2 rounded text-dark border">
                                                <IconTruckDelivery size={20} />
                                            </div>
                                            <div>
                                                <div className="fw-bold small">{s.name}</div>
                                                <div className="text-muted" style={{fontSize: '0.7rem'}}>ID: {s.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="badge bg-warning-subtle text-dark border border-warning-subtle px-3" style={{fontSize: '0.65rem'}}>
                                            {s.category}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="fw-bold small">{s.contact}</div>
                                        <div className="text-muted small">{s.role}</div>
                                    </td>
                                    <td className="small font-monospace text-muted">{s.phone}</td>
                                    <td>
                                        <span className={`badge ${s.badge} rounded-pill`} style={{fontSize: '0.6rem'}}>
                                            {s.status}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-sm btn-light border me-1"><IconPhone size={16}/></button>
                                        <button className="btn btn-sm btn-outline-dark"><IconDots size={16}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center">
                    <small className="text-muted">Mostrando {filtered.length} de 42 proveedores</small>
                    <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary px-3">Anterior</button>
                        <button className="btn btn-sm btn-orange px-3">Siguiente</button>
                    </div>
                </div>
            </div>

            {/* Banner Inferior */}
            <div className="row g-4 mt-2 mb-5">
                <div className="col-lg-8">
                    <div className="card text-white border-0 shadow-lg position-relative overflow-hidden" style={{minHeight: '200px', background: 'linear-gradient(45deg, #1a1a1a, #4a4a4a)'}}>
                        <div className="card-body p-5 position-relative" style={{zIndex: 2}}>
                            <span className="badge bg-orange mb-3">DESTACADO DEL MES</span>
                            <h3 className="fw-black">Acero Vanguardia: Nuevo Acuerdo</h3>
                            <p className="opacity-75 w-75">Precios preferenciales FerrePro en toda la línea de perfiles estructurales vigentes hasta diciembre.</p>
                        </div>
                        <IconTruckDelivery size={150} className="position-absolute end-0 bottom-0 opacity-10 m-n4" />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card h-100 border-0 shadow-sm p-4 bg-orange-subtle border-start border-orange border-4">
                        <h6 className="text-orange fw-bold small mb-3">SOPORTE ESTRATÉGICO</h6>
                        <h5 className="fw-bold">¿Necesitas ayuda con un nuevo alta?</h5>
                        <p className="text-muted small">Nuestro equipo de adquisiciones revisa las solicitudes en menos de 24 horas hábiles.</p>
                        <a href="#" className="text-orange fw-bold small text-decoration-none mt-auto">Manual de proveedores →</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Componente para las tarjetas de métricas
function StatCard({ title, value, sub, icon, color }) {
    return (
        <div className="col-12 col-sm-6 col-xl-3">
            <div className="card card-stat border-0 shadow-sm" style={{borderLeft: `5px solid ${color}`}}>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <p className="text-muted fw-bold mb-1" style={{fontSize: '0.65rem'}}>{title}</p>
                        <h3 className="fw-black mb-1">{value}</h3>
                        <small className="text-muted fw-bold" style={{fontSize: '0.7rem'}}>{sub}</small>
                    </div>
                    <div className="p-2 rounded-3" style={{backgroundColor: `${color}15`, color: color}}>
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );
}