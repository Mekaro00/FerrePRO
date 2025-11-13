fetch("./JSON/productos.json")
    .then(response => {
        return response.json();
    })
    .then((productos) => {
        productos.forEach(producto => {
            const seccion = document.createElement('section');
            seccion.className = 'articulo';
            seccion.dataset.categoria = productos.data.categoria

            seccion.innerHTML = `<h2>Herramientas Eléctricas</h2>
                <div class="scroll-linea">

                    <div class="producto"
                        data-modalidad="herramientas-electricas">
                        <div class="card mb-4 shadow-sm">
                            <${imagen}>
                            <div class="card-body">
                                <h5 class="card-title">${nombre}</h5>
                                <p class="card-text">${precio}</p>
                                <button class="btn btn-primary w-100"
                                    onclick="agregarAlCarrito(${nombre}, ${precio})">Agregar
                                    al carrito</button>
                            </div>
                        </div>
                    </div>`;

        });
    });