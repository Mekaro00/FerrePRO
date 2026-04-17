import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
    IconLayoutDashboard, 
    IconBox, 
    IconShoppingCart, 
    IconUsers, 
    IconTruckDelivery, 
    IconHelp, 
    IconLogout,
    IconSearch,
    IconBell,
    IconSettings,
    IconPlus,
    IconMenu2,
    IconX
} from '@tabler/icons-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import './AdminStyle.css';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Administracion() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    return (
        <div className="container-fluid admin-body p-0">
            <div className="row g-0">
                {/* SIDEBAR */}
                <nav className={"col-md-3 col-lg-2 sidebar-industrial " + (showSidebar ? "show" : "")}>
                    <div className="p-4 mb-4 d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="fw-bold mb-0" style={{color: '#ff6600'}}>FerrePro</h4>
                            <small className="text-muted fw-bold" style={{fontSize: '0.6rem'}}>SOLUCIONES EN CONSTRUCCIÓN Y FERRETERÍA</small>
                        </div>
                        <button className="btn d-md-none" onClick={toggleSidebar}>
                            <IconX size={24} />
                        </button>
                    </div>

                    <div className="nav flex-column mt-4">
                        <MenuItem to="/admin" label="DASHBOARD" icon={<IconLayoutDashboard size={20} />} active={location.pathname === '/admin'} />
                        <MenuItem to="/admin/inventario" label="INVENTARIO" icon={<IconBox size={20} />} active={location.pathname === '/admin/inventario'} />
                        <MenuItem to="/admin/ordenes" label="ÓRDENES" icon={<IconShoppingCart size={20} />} active={location.pathname === '/admin/ordenes'} />
                        <MenuItem to="/admin/clientes" label="CLIENTES" icon={<IconUsers size={20} />} active={location.pathname === '/admin/clientes'} />
                        <MenuItem to="/admin/proveedores" label="PROVEEDORES" icon={<IconTruckDelivery size={20} />} active={location.pathname === '/admin/proveedores'} />
                    </div>

                    <div className="mt-auto p-4" style={{marginTop: '50px'}}>
                        <div className="nav flex-column mb-4">
                            <a href="#" className="nav-link-industrial small"><IconHelp size={18} className="me-2"/> Ayuda</a>
                            <Link to="/login" className="nav-link-industrial small"><IconLogout size={18} className="me-2"/> Salir</Link>
                        </div>
                        <button className="btn btn-orange w-100 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2">
                             GENERAR REPORTE
                        </button>
                    </div>
                </nav>

                {/* MAIN CONTENT */}
                <main className="col-md-9 col-lg-10 main-content min-vh-100 ms-auto">
                    {/* TOP HEADER */}
                    <header className="bg-white p-3 border-bottom d-flex align-items-center justify-content-between px-4 sticky-top">
                        <div className="d-flex align-items-center gap-3 w-100">
                            <button className="btn d-md-none p-0" onClick={toggleSidebar}>
                                <IconMenu2 size={24} />
                            </button>
                            <div className="search-container d-flex align-items-center flex-grow-1 flex-md-grow-0">
                                <IconSearch size={18} className="text-muted me-2" />
                                <input type="text" className="search-input" placeholder="Buscar por SKU, nombre..." />
                            </div>
                        </div>
                        
                        <div className="d-flex align-items-center gap-2 gap-md-4">
                            <IconBell size={20} className="text-muted cursor-pointer d-none d-sm-block" />
                            <IconSettings size={20} className="text-muted cursor-pointer d-none d-sm-block" />
                            <div className="d-flex align-items-center gap-2 border-start ps-2 ps-md-4">
                                <div className="text-end d-none d-md-block">
                                    <p className="mb-0 fw-bold small">USUARIO ADMIN</p>
                                    <small className="text-muted">Principal</small>
                                </div>
                                <img src="/imagenes pagina ferreteria/Imagen de fondo inicio y logo/Logo.jpeg" className="rounded-circle" style={{width: '35px', height: '35px', objectFit: 'cover'}} alt="User" />
                            </div>
                        </div>
                    </header>

                    {/* DASHBOARD VIEW */}
                    <div className="p-3 p-md-5">
                        <Routes>
                            <Route path="/" element={<DashboardView />} />
                            <Route path="/inventario" element={<Placeholder title="Inventario" />} />
                            <Route path="/ordenes" element={<Placeholder title="Órdenes" />} />
                            <Route path="/clientes" element={<Placeholder title="Clientes" />} />
                            <Route path="/proveedores" element={<Placeholder title="Proveedores" />} />
                        </Routes>
                    </div>
                </main>
            </div>
            <div className="floating-add">
                <IconPlus size={24} />
            </div>
        </div>
    );
}

function MenuItem({ to, label, icon, active }) {
    return (
        <Link to={to} className={"nav-link-industrial " + (active ? "active" : "")}>
            <span className="me-3">{icon}</span> {label}
        </Link>
    );
}

function DashboardView() {
    // Configuración de Chart.js para Rendimiento Semanal
    const barData = {
        labels: ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB', 'DOM'],
        datasets: [{
            label: 'Ventas',
            data: [12000, 19000, 15000, 25000, 28000, 21000, 14000],
            backgroundColor: (context) => {
                const index = context.dataIndex;
                return index === 4 ? '#ff6600' : '#E2E8F0';
            },
            borderRadius: 8,
            borderSkipped: false,
        }]
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1B2559',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: (context) => `$${context.raw.toLocaleString()}`
                }
            }
        },
        scales: {
            y: { display: false, grid: { display: false } },
            x: { grid: { display: false }, ticks: { font: { weight: 'bold', size: 10 }, color: '#A3AED0' } }
        }
    };

    return (
        <>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-end mb-4 gap-3">
                <div>
                    <h2 className="fw-bold mb-1">Resumen de Inventario</h2>
                    <p className="text-muted small">Estado en tiempo real de los activos de FerrePro.</p>
                </div>
                <div className="btn-group bg-white p-1 rounded-3 shadow-sm shadow-hover" role="group">
                    <button type="button" className="btn btn-sm btn-light fw-bold px-3">Diario</button>
                    <button type="button" className="btn btn-sm btn-white text-muted px-3">Semanal</button>
                    <button type="button" className="btn btn-sm btn-white text-muted px-3">Mensual</button>
                </div>
            </div>

            {/* TOP STAT CARDS */}
            <div className="row g-4 mb-5">
                <StatCard title="VENTAS TOTALES (HOY)" value="$45,280.00" sub="↗ +12.5% vs ayer" subColor="text-danger" />
                <StatCard title="PEDIDOS PENDIENTES" value="128" sub="🕒 24 en despacho" />
                <StatCard title="PRODUCTOS BAJO STOCK" value="14" sub="⚠️ Requiere atención" subColor="text-danger" />
                <StatCard title="TASA DE DESPACHO" value="98.2%" sub="✅ Optimizado" subColor="text-success" />
            </div>

            <div className="row g-4 mb-5">
                {/* WEEKLY PERFORMANCE CON CHART.JS */}
                <div className="col-lg-8">
                    <div className="card card-stat">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="fw-bold mb-0">Rendimiento Semanal</h5>
                            <button className="btn btn-light btn-sm text-muted fw-bold">Ver detalles</button>
                        </div>
                        <div style={{ height: '300px' }}>
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>

                {/* TODAY'S ORDERS */}
                <div className="col-lg-4">
                    <div className="card card-stat">
                        <h5 className="fw-bold mb-4">Pedidos de Hoy</h5>
                        <OrderItem id="ORD-4921" client="Ferretería Central S.A." total="$1,240.00" status="PENDIENTE" />
                        <OrderItem id="ORD-4920" client="Construcciones RM" total="$4,890.50" status="ENVIADO" />
                        <OrderItem id="ORD-4919" client="Suministros Industriales" total="$920.00" status="ENVIADO" />
                        <div className="mt-4 text-center">
                            <button className="btn btn-link text-decoration-none small fw-bold p-0" style={{color: '#ff6600'}}>Ver todos los pedidos</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* INVENTORY ALERTS */}
            <div className="card card-stat">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
                    <h5 className="fw-bold mb-0">Alertas de Inventario</h5>
                    <button className="btn btn-orange btn-sm shadow">Reponer Stock</button>
                </div>
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr className="small text-muted text-uppercase">
                                <th>PRODUCTO</th>
                                <th>CATEGORÍA</th>
                                <th>SKU</th>
                                <th>STOCK</th>
                                <th>ESTADO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AlertRow 
                                img="/public/imagenes pagina ferreteria/Herramientas electricas/Taladro_percusion.jpg"
                                name="Taladro Percutor 20V" 
                                cat="Herramientas Eléctricas" 
                                sku="HD-2049-X" 
                                stock="2 u." 
                                status="CRÍTICO" 
                                badge="badge-critical"
                            />
                            <AlertRow 
                                img="/public/imagenes pagina ferreteria/Ferreteria general/Tornilleria/Tornillo_rosca_maquina.webp"
                                name="Tornillos de Acero 2\" 
                                cat="Fijaciones" 
                                sku="SC-5502-S" 
                                stock="150 u." 
                                status="REORDENAR" 
                                badge="badge-reorder"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

function StatCard({ title, value, sub, subColor = "text-muted" }) {
    return (
        <div className="col-12 col-sm-6 col-xl-3">
            <div className="card card-stat">
                <span className="stat-title">{title}</span>
                <div className="stat-value my-2">{value}</div>
                <small className={subColor + " fw-bold small"}>{sub}</small>
            </div>
        </div>
    );
}

function OrderItem({ id, client, total, status }) {
    return (
        <div className="d-flex align-items-center gap-3 mb-4">
            <div className="bg-light p-2 rounded-4 text-center d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                 <IconBox size={20} className="text-muted" />
            </div>
            <div className="flex-grow-1 overflow-hidden">
                <div className="d-flex justify-content-between align-items-start">
                    <h6 className="mb-0 fw-bold text-truncate">{id}</h6>
                    <span className={"badge-status " + (status === 'PENDIENTE' ? 'badge-pending' : 'badge-shipped')}>{status}</span>
                </div>
                <small className="text-muted d-block text-truncate">{client}</small>
                <small className="fw-bold">{total}</small>
            </div>
        </div>
    );
}

function AlertRow({ img, name, cat, sku, stock, status, badge }) {
    return (
        <tr>
            <td>
                <div className="d-flex align-items-center gap-3">
                    <img src={img} style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '10px'}} alt={name} />
                    <span className="fw-bold small text-nowrap">{name}</span>
                </div>
            </td>
            <td className="small text-muted">{cat}</td>
            <td className="small font-monospace">{sku}</td>
            <td className="fw-bold small">{stock}</td>
            <td><span className={"badge-status " + badge}>{status}</span></td>
        </tr>
    );
}

function Placeholder({ title }) {
    return <div className="p-5 text-center bg-white rounded-4 shadow-sm"><h3>{title}</h3><p>Próximamente...</p></div>;
}
