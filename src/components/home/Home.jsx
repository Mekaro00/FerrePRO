import { useState } from 'react';
import { Carrusel } from '../Carrusel.jsx';
import { Formulario } from '../Formulario.jsx';
import { Paginación } from '../Paginacion.jsx';
import { ContainerProductos } from '../ContenedorProductos.jsx';
import productos from '../../productos.json';

const RESULT_PER_PAGE = 3;

export function Home({ categoryFilters, setCategoryFilters }) {
    const [textFilter, setTextFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    
    // 1) Filtrar productos por nombre (tiempo real)
    const productosFiltradosPorTexto = textFilter.trim() === ""
        ? null
        : productos.filter(producto =>
            producto.nombre.toLowerCase().includes(textFilter.toLowerCase())
        );

    //2) categoría activa (solo una por diseño)
    const categoriaActiva = Object.values(categoryFilters).find(v => v && v !== "") || "";

    // si hay texto -> usamos productosFiltradosPorTexto (ignorar selects)
    // si no hay texto -> si hay categoriaActiva aplicarla, si no mostrar todos
    const productosPorCategoria = productosFiltradosPorTexto
        ? productosFiltradosPorTexto
        : (categoriaActiva
            ? productos.filter(p => (p.data?.categoria || p.categoria) === categoriaActiva)
            : productos
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
    };

    const handleSearch = () => {};

    const handleTextFilter = (newText) => {
        setTextFilter(newText);
        setCurrentPage(1);

        if (newText.trim() === "") {
            setCategoryFilters({
                herramientas: "",
                insumos: "",
                construccion: ""
            });
        }
    };

    const handleCategoryFilter = (filterName, categoryValue) => {
        const nuevos = {
            herramientas: "",
            insumos: "",
            construccion: ""
        };
        nuevos[filterName] = categoryValue;
        setCategoryFilters(nuevos);
        setTextFilter("");
        setCurrentPage(1);
    };

    return (
        <main style={{ paddingTop: "80px", minHeight: "60vh" }}>
            <Carrusel />
            <Formulario 
                onSearch={handleSearch} 
                onTextFilter={handleTextFilter} 
                onCategoryFilter={handleCategoryFilter} 
            />
            <ContainerProductos productosData={pagedResults} />
            <Paginación 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
            />
        </main>
    );
}