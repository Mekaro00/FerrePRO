
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

/* import data from './productos.json';

console.log(data); */

import { Navbar } from './components/Navbar.jsx'
import { Carrusel } from './components/Carrusel.jsx'
import { Formulario } from './components/Formulario.jsx'
import { Paginación } from './components/Paginacion.jsx'
import { Footer } from './components/Footer.jsx'

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

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

                {/* Paginación */}
                <Paginación currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />

            </main>

            {/* FOOTER */}
            <Footer/>
        </>
    );
}

export default App;