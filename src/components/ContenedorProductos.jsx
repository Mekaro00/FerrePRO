import { SeccionCategoria } from './TarjetaProductos.jsx';
import { useState, useEffect } from 'react';

export function ContainerProductos({ productosData, onAdd }) {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // ESTADO PARA LA ALERTA DE ÉXITO
    const [alerta, setAlerta] = useState({ visible: false, productoNombre: '' });

    useEffect(() => {
        try {
            setProductos(productosData);
            setLoading(false);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            setError(err.message || 'Error al cargar productos');
            setLoading(false);
        }
    }, [productosData]);

    // FUNCIÓN INTERNA PARA MOSTRAR LA ALERTA
    const handleAgregarConNotificacion = (producto) => {
        // Ejecutamos la función original que viene por props
        onAdd(producto);

        // Mostrar notificación
        setAlerta({ visible: true, productoNombre: producto.nombre });

        // Se oculta automáticamente después de 2 segundos
        setTimeout(() => {
            setAlerta({ visible: false, productoNombre: '' });
        }, 2000);
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
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando FerrePRO...</span>
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
        <div id="productos-ferreteria" className="position-relative">
            
            {/* NOTIFICACIÓN FLOTANTE (TOAST) */}
            {alerta.visible && (
                <div 
                    className="position-fixed top-0 end-0 m-4 shadow-lg animate__animated animate__fadeInRight" 
                    style={{ 
                        zIndex: 9999, 
                        minWidth: '250px',
                        marginTop: '100px' // Para que no lo tape el Navbar
                    }}
                >
                    <div className="alert alert-success d-flex align-items-center border-0 bg-success text-white mb-0 p-3 rounded-4">
                        <div className="me-2 fs-4">✅</div>
                        <div>
                            <strong className="d-block">¡Agregado!</strong>
                            <small>{alerta.productoNombre} ya está en el carrito.</small>
                        </div>
                    </div>
                </div>
            )}

            {Object.keys(gruposProductos).map((categoria) => (
                <SeccionCategoria
                    key={categoria}
                    categoria={categoria}
                    productos={gruposProductos[categoria]}
                    onAdd={handleAgregarConNotificacion} 
                />
            ))}
        </div>
    );
}