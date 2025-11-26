

// Componente individual de producto
export function TarjetaProducto({ producto, onAgregarCarrito }) {
    return (
        <div className="col-md-3 producto" data-modalidad={producto.categoria}>
            <div className="card mb-4 shadow-sm">
                <img 
                    src={producto.imagen} 
                    className="card-img-top" 
                    alt={producto.alt || producto.nombre}
                />
                <div className="card-body">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">
                        ${producto.precio.toLocaleString('es-CO')}
                    </p>
                    <button 
                        className="btn btn-primary w-100"
                        onClick={() => onAgregarCarrito(producto.nombre, producto.precio)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}

// Componente de sección de categoría
export function SeccionCategoria({ categoria, productos, onAgregarCarrito }) {
    const idCategoria = categoria.toLowerCase().replace(/ /g, "-");
    
    return (
        <section 
            className="container py-5 articulo" 
            id={idCategoria}
            data-modalidad={productos[0]?.categoria}
        >
            <h2 className="titulo-categoria">{categoria}</h2>
            <div className="scroll-linea">
                {productos.map((producto, index) => (
                    <TarjetaProducto 
                        key={index}
                        producto={producto}
                        onAgregarCarrito={onAgregarCarrito}
                    />
                ))}
            </div>
        </section>
    );
}

