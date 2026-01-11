import { SeccionCategoria } from './TarjetaProductos.jsx';
import { useState, useEffect } from 'react';



export function ContainerProductos({ productosData }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setProductos(productosData);
            setLoading(false);
        } catch (err) {
            console.error("Error al cargar productos desde el bundle:", err);
            setError(err.message || 'Error al cargar productos');
            setLoading(false);
        }
    }, [productosData]);

    const agregarAlCarrito = (nombre, precio) => {
        console.log(`Agregado al carrito: ${nombre} - $${precio}`);
        alert(`${nombre} agregado al carrito por $${precio.toLocaleString('es-CO')}`);
    };

    const gruposProductos = productos.reduce((grupos, producto) => {
        const categoria = producto.categoria;
        if (!grupos[categoria]) grupos[categoria] = [];
        grupos[categoria].push(producto);
        return grupos;
    }, {});

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando productos...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger" role="alert">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div id="productos-ferreteria">
            {Object.keys(gruposProductos).map((categoria) => (
                <SeccionCategoria
                    key={categoria}
                    categoria={categoria}
                    productos={gruposProductos[categoria]}
                    onAgregarCarrito={agregarAlCarrito}
                />
            ))}
        </div>
    );
}