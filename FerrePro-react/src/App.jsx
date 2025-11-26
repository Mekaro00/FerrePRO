
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

 



import { Navbar } from './components/Navbar.jsx'
import { Carrusel } from './components/Carrusel.jsx'
import { Formulario } from './components/Formulario.jsx'
import { Paginación } from './components/Paginacion.jsx'
import { Footer } from './components/Footer.jsx'
import {ContainerProductos} from './components/ContenedorProductos.jsx';

import productosData from './productos.json';

const RESULT_PER_PAGE = 3;

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    
    // 1) obtener lista de categorías únicas (ordenada según aparición en productosData)
    const categorias = Array.from(new Set(productosData.map(p => p.categoria)));

    // 2) calcular total de páginas tomando en cuenta categorías
    const totalPages = Math.ceil(categorias.length / RESULT_PER_PAGE);

    // 3) categorías para la página actual
    const pagedCategories = categorias.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
    );

    // 4) obtener todos los productos que pertenezcan a las categorías de la página
    const pagedResults = productosData.filter(p => pagedCategories.includes(p.categoria));

    const handlePageChange = (Page) => {
        console.log("Página cambiada a:", Page);
        setCurrentPage(Page);
    }


    return (
        <>
            {/* NAVBAR */}
            <Navbar />

            {/* Contenido principal */}
            <main style={{ paddingTop: "80px", minHeight: "60vh" }}>
                
            <Carrusel />
            
            <Formulario />

            <ContainerProductos productosData={pagedResults} />

                {/* Paginación */}
                <Paginación currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </main>

            {/* FOOTER */}
            <Footer/>
        </>
    );
}

export default App;