import { useState, useEffect, useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

// Componente individual de producto
export function TarjetaProducto ({ producto, onAgregarCarrito }) {
  return (
    <div className='producto' style={{ minWidth: '250px', flex: '0 0 auto' }}>
      <div className='card mb-4 shadow-sm'>
        <img
          src={producto.imagen}
          className='card-img-top'
          alt={producto.alt || producto.nombre}
        />
        <div className='card-body'>
          <h5 className='card-title'>{producto.nombre}</h5>
          <p className='card-text'>
            ${producto.precio.toLocaleString('es-CO')}
          </p>
          <button
            className='btn btn-primary w-100'
            onClick={() => onAgregarCarrito(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente de sección de categoría
export function SeccionCategoria({ categoria, productos, onAgregarCarrito }) {
  const idCategoria = categoria.toLowerCase().replace(/ /g, '-');
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (!container) return; // 🔥 protección

    const scrollAmount = 300;

    container.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section
      className="container py-5 articulo position-relative"
      id={idCategoria}
    >
      <h2 className="titulo-categoria">{categoria}</h2>

      {/* IZQUIERDA */}
      <button
        className="scroll-btn position-absolute top-50 start-0 translate-middle-y z-3"
        onClick={() => scroll('left')}
      >
        <IconChevronLeft size={28} stroke={2} />
      </button>

      {/* CONTENEDOR SCROLL (🔥 ESTO FALTABA) */}
      <div ref={scrollRef} className="scroll-linea px-5">
        {productos.map((producto, index) => (
          <TarjetaProducto
            key={index}
            producto={producto}
            onAgregarCarrito={onAgregarCarrito}
          />
        ))}
      </div>

      {/* DERECHA */}
      <button
        className="scroll-btn position-absolute top-50 end-0 translate-middle-y z-3"
        onClick={() => scroll('right')}
      >
        <IconChevronRight size={28} stroke={2} />
      </button>
    </section>
  );
}
