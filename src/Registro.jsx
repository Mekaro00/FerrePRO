import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Registro = () => {
  // 1. Definimos los estados para capturar la información
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  // 2. Función para manejar los cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Función principal de registro
  const handleRegistro = (e) => {
    e.preventDefault(); // CRÍTICO: Evita que la página se recargue

    // Validación básica de contraseñas
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Guardamos en el localStorage (Persistencia temporal para tu proyecto ADSO)
    // Usamos el email como llave para poder registrar varios usuarios si quieres
    const usuariosExistentes = JSON.parse(localStorage.getItem("usuarios_ferrepro")) || [];
    
    // Verificamos si el correo ya existe
    if (usuariosExistentes.find(u => u.email === formData.email)) {
      alert("Este correo ya está registrado");
      return;
    }

    usuariosExistentes.push(formData);
    localStorage.setItem("usuarios_ferrepro", JSON.stringify(usuariosExistentes));

    alert("¡Cuenta creada con éxito! Ahora inicia sesión.");
    
    // Redirigimos al Login usando el router de React (sin recargar)
    navigate("/login");
  };

  return (
    <div className="container" style={{ marginTop: "120px", marginBottom: "80px" }}>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-header bg-warning text-dark text-center py-4 rounded-top-4">
              <h3 className="fw-bold mb-0">🛠️ Únete a FerrePRO</h3>
              <p className="mb-0">Crea tu cuenta para gestionar tus compras</p>
            </div>
            
            <div className="card-body p-5 bg-white">
              <form onSubmit={handleRegistro}> {/* Manejamos el envío aquí */}
                <h6 className="text-muted text-uppercase fw-bold mb-3" style={{ fontSize: '0.8rem' }}>Información Personal</h6>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Nombres</label>
                    <input 
                      type="text" name="nombres" className="form-control form-control-lg fs-6" 
                      placeholder="Ej: Juan" required onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Apellidos</label>
                    <input 
                      type="text" name="apellidos" className="form-control form-control-lg fs-6" 
                      placeholder="Ej: Pérez" required onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Número de Teléfono</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">+57</span>
                    <input 
                      type="tel" name="telefono" className="form-control form-control-lg fs-6" 
                      placeholder="300 123 4567" onChange={handleChange} 
                    />
                  </div>
                </div>

                <h6 className="text-muted text-uppercase fw-bold mt-4 mb-3" style={{ fontSize: '0.8rem' }}>Acceso a la Cuenta</h6>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Correo Electrónico</label>
                  <input 
                    type="email" name="email" className="form-control form-control-lg fs-6" 
                    placeholder="nombre@correo.com" required onChange={handleChange} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Contraseña</label>
                    <input 
                      type="password" name="password" className="form-control form-control-lg fs-6" 
                      placeholder="••••••••" required onChange={handleChange} 
                    />
                  </div>
                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-semibold">Confirmar</label>
                    <input 
                      type="password" name="confirmPassword" className="form-control form-control-lg fs-6" 
                      placeholder="••••••••" required onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="mb-4 form-check">
                  <input type="checkbox" className="form-check-input" id="terms" required />
                  <label className="form-check-label small text-muted" htmlFor="terms">
                    Acepto los términos de servicio y la política de tratamiento de datos.
                  </label>
                </div>

                <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold shadow-sm rounded-3 py-3">
                  CREAR MI CUENTA
                </button>
              </form>
            </div>

            <div className="card-footer bg-light text-center py-3 rounded-bottom-4">
              <span className="text-muted small">¿Ya tienes cuenta? </span>
              <button onClick={() => navigate("/login")} className="btn btn-link p-0 text-decoration-none fw-bold text-warning">
                Inicia sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};