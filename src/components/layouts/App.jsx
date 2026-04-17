// App.jsx
// Enrutamiento principal de FerrePro.
// El layout <Administracion> envuelve todas las páginas del panel.
// React Router renderiza solo el <Outlet> cuando cambias de ruta,
// el Sidebar y TopBar NUNCA se desmontan → sin parpadeos ni recargas.

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Administracion from "./Administracion2.jsx";

// Páginas (cada una solo exporta su contenido, sin Sidebar propio)
import DashboardPage   from "../pages/DashboardPage.jsx";
import InventarioPage  from "../pages/InventarioPage.jsx";
import OrdenesPage     from "../pages/OrdenesPage.jsx";
import ClientesPage    from "../pages/ClientesPage.jsx";
import ProveedoresPage from "../pages/ProveedoresPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*
          Todas las rutas del admin viven dentro de /admin
          El layout <Administracion> se monta una sola vez.
          Solo el <Outlet> cambia al navegar.
        */}
        <Route path="/admin" element={<Administracion />}>

          {/* /admin  →  Dashboard (ruta índice) */}
          <Route index element={<DashboardPage />} />

          {/* /admin/inventario */}
          <Route path="inventario"  element={<InventarioPage />}  />

          {/* /admin/ordenes */}
          <Route path="ordenes"     element={<OrdenesPage />}     />

          {/* /admin/clientes */}
          <Route path="clientes"    element={<ClientesPage />}    />

          {/* /admin/proveedores */}
          <Route path="proveedores" element={<ProveedoresPage />} />

        </Route>

        {/* Redirige la raíz "/" al dashboard */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Ruta 404 — redirige al dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
