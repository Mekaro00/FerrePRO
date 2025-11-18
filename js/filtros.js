
// 1. Seleccionar los filtros y el mensaje de texto

const filtros = document.querySelectorAll('.btn-filtro');
const mensaje = document.querySelector('#filter-selected-value');



// 2. Función que aplica el filtrado a las SECCIONES

function aplicarFiltro(valor) {

    const secciones = document.querySelectorAll('.articulo');

    secciones.forEach(seccion => {
        const modalidad = seccion.dataset.modalidad.toLowerCase();

        if (valor === "" || modalidad === valor) {
            seccion.style.display = "";
        } else {
            seccion.style.display = "none";
        }
    });
}



// 3. Activar filtro cuando cambia un <select>

filtros.forEach(filtro => {
    filtro.addEventListener('change', function () {

        const selectedValue = filtro.value.trim().toLowerCase();

        //mensaje.textContent = selectedValue
        //    ? `Has seleccionado: ${selectedValue}`
        //    : "";

        aplicarFiltro(selectedValue);
    });
});



// 4. Activar filtro cuando se hace clic en el navbar

const enlacesNav = document.querySelectorAll('a.nav-link, a.dropdown-item');

enlacesNav.forEach(link => {
    link.addEventListener('click', function (e) {

        const hash = this.getAttribute('href');

        // Solo filtrar si es un hash (#algo)
        if (hash.startsWith("#")) {
            e.preventDefault();

            const valorFiltro = hash.replace('#', '').trim().toLowerCase();

            aplicarFiltro(valorFiltro);

            // Scroll suave hacia la sección filtrada
            setTimeout(() => {
                document.querySelector(hash)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 250);
        }
    });
});
