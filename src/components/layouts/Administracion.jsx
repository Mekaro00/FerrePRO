import { NavFootAdmi } from "../layouts/NavFootAdmi";



export function Administracion () {
    return(
        <NavFootAdmi pageTitle="Administración" showFab={false}>
            <ContenidoAdministracion />
            <div className="space-y-8">
                <MetricsGrid />
                <ChartSection />
                <LowStockTable />
            </div>
        </NavFootAdmi>
    )
}

function ContenidoAdministracion () {
    return(

        <div className="container py-3">
            <h1>Administración</h1>
            <p>Bienvenido a la sección de administración. Aquí puedes gestionar tus productos, pedidos y clientes.</p>
        </div>
    )
}