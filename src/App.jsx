
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
    const [textFilter, setTextFilter] = useState("");
    const [categoryFilters, setCategoryFilters] = useState({
        herramientas: "",
        insumos: "",
        construccion: ""
    });
    const [currentPage, setCurrentPage] = useState(1);
    
    // 1) Filtrar productos por nombre (tiempo real)
    const productosFiltradosPorTexto = textFilter.trim() === ""
        ? null
        : productosData.filter(producto =>
            producto.nombre.toLowerCase().includes(textFilter.toLowerCase())
        );

    //2) categoría activa (solo una por diseño)
    const categoriaActiva = Object.values(categoryFilters).find(v => v && v !== "") || "";

    // si hay texto -> usamos productosFiltradosPorTexto (ignorar selects)
    // si no hay texto -> si hay categoriaActiva aplicarla, si no mostrar todos
    const productosPorCategoria = productosFiltradosPorTexto
        ? productosFiltradosPorTexto
        : (categoriaActiva
            ? productosData.filter(p => (p.data?.categoria || p.categoria) === categoriaActiva)
            : productosData
        );

    // 3) obtener lista de categorías únicas desde productosPorCategoria (para paginación por categorías)
    const categorias = Array.from(new Set(productosPorCategoria.map(p => p.categoria)));

    // 4) calcular total de páginas tomando en cuenta categorías
    const totalPages = Math.max(1, Math.ceil(categorias.length / RESULT_PER_PAGE));

    // 5) categorías para la página actual
    const pagedCategories = categorias.slice(
        (currentPage - 1) * RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
    );

    // 6) obtener todos los productos que pertenezcan a las categorías de la página actual
    const pagedResults = productosPorCategoria.filter(p => pagedCategories.includes(p.categoria));

    

    const handlePageChange = (Page) => {
        setCurrentPage(Page);
    }

    const handleSearch = () => {}

    const handleTextFilter = (newText) => {
        setTextFilter(newText);
        setCurrentPage(1); // resetear a la primera página al cambiar el filtro de texto

        if (newText.trim() === "") {
            // si el texto quedó vacío, reiniciamos filtros de select para dejar la página como al iniciar
            setCategoryFilters({
                herramientas: "",
                insumos: "",
                construccion: ""
            });
        }
    }

    const handleCategoryFilter = (filterName, categoryValue) => {
        // Resetear todas y dejar solo la que seleccionó el usuario
        const nuevos = {
            herramientas: "",
            insumos: "",
            construccion: ""
        };
        nuevos[filterName] = categoryValue;
        setCategoryFilters(nuevos);
        setTextFilter(""); // al seleccionar categoría limpiar la búsqueda de texto
        setCurrentPage(1);
    }

    return (
        <>
            {/* NAVBAR */}
            <Navbar onCategoryFilter={handleCategoryFilter}/>

            {/* Contenido principal */}
            <main style={{ paddingTop: "80px", minHeight: "60vh" }}>
                
            <Carrusel />
            
            <Formulario onSearch={handleSearch} onTextFilter={handleTextFilter} onCategoryFilter={handleCategoryFilter} />

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