const filtro = document.querySelector('#filtro-herramientas')
const mensaje = document.querySelector('#filter-selected-value')
const productos = document.querySelectorAll('.articulo')//

filtro.addEventListener('change', function () {
    const selectedValue = filtro.value//

    if (selectedValue) {
        mensaje.textContent = `Has seleccionado: ${selectedValue}`
    } else {
        mensaje.textContent = ''
    }

    productos.forEach(insumo => {
        const modalidad = insumo.dataset.modalidad//

        if (selectedValue === '' || modalidad === selectedValue) {
            insumo.style.display = 'block'
        } else {
            insumo.style.display = 'none'
        }
    })
})