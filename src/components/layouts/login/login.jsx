import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Credenciales de Administrador Maestro
    const ADMIN_USER = "admin@ferrepro.com";
    const ADMIN_PASS = "1234";

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios_ferrepro")) || [];
        const usuarioEncontrado = usuariosRegistrados.find(
            (u) => u.email === email && u.password === password
        );

        // 1. CASO: ES EL ADMINISTRADOR
        if (email === ADMIN_USER && password === ADMIN_PASS) {
            setError("");
            localStorage.setItem("sesion_activa", JSON.stringify({ nombres: "Admin", role: "admin" }));
            // Lo mandamos a la gestión de la ferretería
            navigate('/admin'); 
        } 
        // 2. CASO: ES UN USUARIO REGISTRADO (CLIENTE)
        else if (usuarioEncontrado) {
            setError("");
            localStorage.setItem("sesion_activa", JSON.stringify({ ...usuarioEncontrado, role: "cliente" }));
            // Lo mandamos a la tienda principal (Home)
            navigate('/'); 
        } 
        // 3. CASO: ERROR
        else {
            setError("Correo o contraseña incorrectos.");
        }
    };

    return (
        <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#fff8f0" }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-lg border-0 rounded-4">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <img
                                        src="/imagenes pagina ferreteria/Imagen de fondo inicio y logo/Logo.jpeg"
                                        alt="Logo FerrePro"
                                        className="mb-3"
                                        style={{ height: "80px", width: "auto" }}
                                    />
                                    <h2 className="fw-bold" style={{ color: "#e65100" }}>Iniciar Sesión</h2>
                                    <p className="text-muted small">Ingresa tus credenciales</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {error && <div className="alert alert-danger py-2 small">{error}</div>}
                                    
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold small">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100 py-3 fw-bold text-white shadow-sm"
                                        style={{ backgroundColor: "#e65100" }}
                                    >
                                        INGRESAR
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="mb-0 small text-muted">¿No tienes cuenta?</p>
                                    <button
                                        className="btn btn-link text-warning fw-bold text-decoration-none"
                                        onClick={() => navigate('/registro')}
                                    >
                                        Regístrate aquí
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}