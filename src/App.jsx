import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar.jsx'
import { Home } from './components/home/Home.jsx';
import { Footer } from './components/Footer.jsx';
import { Login } from './components/layouts/login/login.jsx';
import Administracion from './components/layouts/Admin/Administracion.jsx';

function App() {
    const [categoryFilters, setCategoryFilters] = useState({
        herramientas: "",
        insumos: "",
        construccion: ""
    });

    const handleCategoryFilter = (filterName, categoryValue) => {
        const nuevos = {
            herramientas: "",
            insumos: "",
            construccion: ""
        };
        nuevos[filterName] = categoryValue;
        setCategoryFilters(nuevos);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* RUTA PÚBLICA (Con Navbar y Footer de la tienda) */}
                <Route path="/*" element={
                    <>
                        <Navbar onCategoryFilter={handleCategoryFilter} />
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <Home 
                                        categoryFilters={categoryFilters} 
                                        setCategoryFilters={setCategoryFilters} 
                                    />
                                } 
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/registro" element={<div style={{paddingTop: "80px", minHeight: "60vh", textAlign: "center"}}>Página de Registro (por crear)</div>} />
                        </Routes>
                        <Footer />
                    </>
                } />

                {/* RUTA DE ADMINISTRACIÓN (Limpia, sin Navbar de tienda) */}
                <Route path="/admin/*" element={<Administracion />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
