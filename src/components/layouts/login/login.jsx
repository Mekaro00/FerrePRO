import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Credenciales válidas hardcodeadas
    const USUARIO = "admin@ferrepro.com";
    const PASSWORD = "1234";

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación simple sin base de datos
        if (email === USUARIO && password === PASSWORD) {
            setError("");
            navigate('/admin'); // Redirige al dashboard admin
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div style={{ paddingTop: "80px", minHeight: "100vh", backgroundColor: "#fff8f0" }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card shadow-lg border-0">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <img
                                        src="/imagenes pagina ferreteria/Imagen de fondo inicio y logo/Logo.jpeg"
                                        alt="Logo FerrePro"
                                        className="mb-3"
                                        style={{ height: "80px", width: "auto", objectFit: "contain" }}
                                    />
                                    <h2 className="fw-bold" style={{ color: "#e65100" }}>Iniciar Sesión</h2>
                                    <p className="text-muted">Bienvenido a FerrePro</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-bold">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="tu@email.com"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-bold">
                                            Contraseña
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="contraseña"
                                            required
                                        />
                                    </div>

                                    <div className="mb-3 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="remember"
                                        />
                                        <label className="form-check-label" htmlFor="remember">
                                            Recordarme
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-bold"
                                    >
                                        Iniciar Sesión
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <a href="#" className="text-decoration-none" style={{ color: "#e65100" }}>
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="mb-2">¿No tienes cuenta?</p>
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => navigate('/registro')}
                                    >
                                        Crear cuenta nueva
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-link text-muted"
                                        onClick={() => navigate('/')}
                                    >
                                        ← Volver al inicio
                                    </button>
                                </div>

                                {/* <hr className="my-4" /> */}

                                {/* <div className="text-center mt-3">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/admin')}
                                    >
                                        Administrador
                                    </button>
                                </div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}