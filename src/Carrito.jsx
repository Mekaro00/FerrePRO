import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function Carrito({ items, onRemove }) {

  

  const navigate = useNavigate();

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Estado para manejar el método de pago seleccionado
  const [metodoPago, setMetodoPago] = useState('');

  // Cálculo del total
  const total = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handlePagar = () => {
    alert(`💳 Procesando pago por $${(item.precio || 0).toLocaleString("es-CO")} vía ${metodoPago.toUpperCase()}...\n\n¡Gracias por tu compra en FerrePRO!`);
    // Aquí podrías añadir la lógica para limpiar el carrito tras la compra
  };

  return (
    <div className="container" style={{ marginTop: "110px", marginBottom: "50px" }}>
      <div className="row g-4">
        
        {/* COLUMNA IZQUIERDA: LISTA DE PRODUCTOS */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h2 className="fw-bold mb-4">🛒 Mi Carrito</h2>

            {items.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted fs-5">Tu carrito está vacío actualmente.</p>
                <a href="/" className="btn btn-warning fw-bold px-4">Explorar Productos</a>
              </div>
            ) : (
              <ul className="list-group list-group-flush">
                {items.map(item => (
                  <li key={item.id} className="list-group-item d-flex align-items-center justify-content-between py-3 px-0 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "12px" }}
                      />
                      <div>
                        <strong className="d-block fs-5">{item.nombre}</strong>
                        <span className="text-muted">{item.cantidad} x ${(item.precio || 0).toLocaleString("es-CO")}</span>
                      </div>
                    </div>
                    <button 
                      className="btn btn-outline-danger btn-sm rounded-pill px-3" 
                      onClick={() => onRemove(item.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN Y MEDIOS DE PAGO */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-4 bg-light p-4">
            <h4 className="fw-bold mb-4">Resumen de Compra</h4>
            
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>${total.toLocaleString("es-CO")}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-4 fw-bold fs-4 border-top pt-2">
              <span>Total</span>
              <span style={{ color: "#e65100" }}>${total.toLocaleString("es-CO")}</span>
            </div>

            <hr />

            {/* SECCIÓN DE MEDIOS DE PAGO */}
            <h5 className="fw-bold mb-3 mt-2">Selecciona Medio de Pago</h5>
            
            <div className="mb-3">
              <div className={`form-check p-3 border rounded-3 mb-2 bg-white ${metodoPago === 'tarjeta' ? 'border-warning' : ''}`}>
                <input 
                  className="form-check-input" type="radio" name="pago" id="tarjeta" 
                  value="tarjeta" onChange={(e) => setMetodoPago(e.target.value)}
                />
                <label className="form-check-label fw-semibold w-100" htmlFor="tarjeta">
                  💳 Tarjeta de Crédito/Débito
                </label>
                
                {metodoPago === 'tarjeta' && (
                  <div className="mt-3 animate__animated animate__fadeIn">
                    <input type="text" className="form-control mb-2" placeholder="Número de tarjeta" />
                    <div className="row g-2">
                      <div className="col-7"><input type="text" className="form-control" placeholder="MM/AA" /></div>
                      <div className="col-5"><input type="text" className="form-control" placeholder="CVV" /></div>
                    </div>
                  </div>
                )}
              </div>

              <div className={`form-check p-3 border rounded-3 mb-2 bg-white ${metodoPago === 'pse' ? 'border-warning' : ''}`}>
                <input 
                  className="form-check-input" type="radio" name="pago" id="pse" 
                  value="pse" onChange={(e) => setMetodoPago(e.target.value)}
                />
                <label className="form-check-label fw-semibold w-100" htmlFor="pse">
                  🏦 PSE (Cuentas de Ahorro)
                </label>
              </div>

              <div className={`form-check p-3 border rounded-3 mb-2 bg-white ${metodoPago === 'efectivo' ? 'border-warning' : ''}`}>
                <input 
                  className="form-check-input" type="radio" name="pago" id="efectivo" 
                  value="efectivo" onChange={(e) => setMetodoPago(e.target.value)}
                />
                <label className="form-check-label fw-semibold w-100" htmlFor="efectivo">
                  💵 Efecty / Puntos de Pago
                </label>
              </div>
            </div>

            {/* BOTÓN FINALIZAR */}
            <button 
              className="btn btn-warning btn-lg w-100 fw-bold py-3 shadow-sm"
              disabled={items.length === 0 || !metodoPago}
              onClick={handlePagar}
              style={{ backgroundColor: "#e65100", borderColor: "#e65100", color: "white" }}
            >
              FINALIZAR Y PAGAR
            </button>
            
            <p className="text-center text-muted x-small mt-3">
              <i className="bi bi-shield-check"></i> Pago 100% seguro con tecnología FerrePRO
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

