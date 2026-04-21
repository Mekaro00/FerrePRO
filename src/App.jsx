import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar.jsx'
import { Home } from './components/home/Home.jsx';
import { Footer } from './components/Footer.jsx';
import { Login } from './components/layouts/login/login.jsx';
import Administracion from './components/layouts/Admin/Administracion.jsx';
import { Registro } from './Registro.jsx';
import { Carrito } from './Carrito.jsx';
import Contacto from './components/Contacto.jsx';

function App() {
 

    const [carrito, setCarrito] = useState([]);
    
        const agregarAlCarrito = (producto) => {
            console.log("AGREGANDO AL CARRITO:", producto);
    
            setCarrito(prev => {
                const existe = prev.find(item => item.id === producto.id);
    
                if (existe) {
                    return prev.map(item =>
                        item.id === producto.id
                            ? { ...item, cantidad: item.cantidad + 1 }
                            : item
                    );
                }
    
                return [...prev, { ...producto, cantidad: 1 }];
            });
        };
    
        const eliminarDelCarrito = (id) => {
            setCarrito(prev => prev.filter(item => item.id !== id));
        };

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
                        <Navbar 
                        carrito={carrito}
                        onCategoryFilter={handleCategoryFilter} />
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <Home
                                        onAdd={agregarAlCarrito} 
                                        categoryFilters={categoryFilters} 
                                        setCategoryFilters={setCategoryFilters} 
                                    />
                                } 
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/carrito" element={<Carrito items={carrito} onRemove={eliminarDelCarrito} />} />
                            <Route path="/registro" element={<Registro />} />
                            <Route path="/contacto" element={<Contacto />} />
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
