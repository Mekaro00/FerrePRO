// Seleccionamos todos los filtros (los tres <select>)
const filtros = document.querySelectorAll('.btn-filtro');
const mensaje = document.querySelector('#filter-selected-value');
const productos = document.querySelectorAll('.articulo');

// Recorremos cada filtro para escuchar los cambios
filtros.forEach(filtro => {
  filtro.addEventListener('change', function () {
    const selectedValue = filtro.value;

    // Mostrar el valor seleccionado
    if (selectedValue) {
      mensaje.textContent = `Has seleccionado: ${selectedValue}`;
    } else {
      mensaje.textContent = '';
    }

    // Filtrar productos según la modalidad (atributo data-modalidad)
    productos.forEach(insumo => {
      const modalidad = insumo.dataset.modalidad;

      if (selectedValue === '' || modalidad === selectedValue) {
        insumo.style.display = 'block';
      } else {
        insumo.style.display = 'none';
      }
    });
  });
});
