
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




import { Navbar } from './components/Navbar.jsx'
import { Home } from './components/home/Home.jsx';
import { Footer } from './components/Footer.jsx';
import { Login } from './components/layouts/login/login.jsx';
/*import { Admin } from './components/layouts/Admin/Administracion.jsx';*/

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
                {/* Puedes agregar más rutas aquí */}
                <Route path="/registro" element={<div style={{paddingTop: "80px"}}>Página de Registro (por crear)</div>} />
                {/* <Route path="/admin" element={<Admin />} /> */}
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;