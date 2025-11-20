//const container = document.querySelector('#productos-ferreteria');
//
//
//
//fetch("./JSON/productos.json")
//   .then(response => {
//       return response.json();
//   })
//   .then((productos) => {
//       productos.forEach(producto => {
//           const seccion = document.createElement('section');
//           seccion.className = 'articulo';
//           seccion.dataset.categoria = producto.data.categoria
//
//           seccion.innerHTML = `<h2>${producto.categoria}</h2>
//               <div class="scroll-linea">
//
//                   <div class="producto"
//                       data-modalidad="herramientas-electricas">
//                       <div class="card mb-4 shadow-sm">
//                           <img src="${producto.imagen}"
//                               class="card-img-top" alt="${producto.nombre}">
//                           <div class="card-body">
//                               <h5 class="card-title">${producto.nombre}</h5>
//                               <p class="card-text">${producto.precio}</p>
//                               <button class="btn btn-primary w-100"
//                                   onclick="agregarAlCarrito(${producto.nombre}, ${producto.precio})">Agregar
//                                   al carrito</button>
//                           </div>
//                       </div>
//                   </div>`;
//
//           container.appendChild(seccion);
//
//       });
//   });

const contenedor = document.querySelector('#productos-ferreteria');

fetch("./JSON/productos.json")
    .then(res => res.json())
    .then(productos => {

        // Agrupar productos según la categoría grande del JSON
        const grupos = {};

        productos.forEach(producto => {
            const categoria = producto.categoria; // Categoría grande
            if (!grupos[categoria]) {
                grupos[categoria] = [];
            }

            grupos[categoria].push(producto);
        });

        // Crear secciones por cada categoría detectada
        Object.keys(grupos).forEach(categoria => {

            const seccion = document.createElement("section");

            
            // La sección se filtra por el data corto
            const modalidadData = grupos[categoria][0].data.categoria;

            seccion.className = "container py-5 articulo";
            seccion.dataset.modalidad = modalidadData;

            // Convertir categoría en ID apto para HTML
            const idCategoria = categoria.toLowerCase().replace(/ /g, "-");
            seccion.id = idCategoria;

            seccion.innerHTML = `
                <h2 class="titulo-categoria">${categoria}</h2>
                <div class="scroll-linea"></div>
            `;

            contenedor.appendChild(seccion);

            const lista = seccion.querySelector(".scroll-linea");

            // Generar tarjetas dentro de la sección
            grupos[categoria].forEach(producto => {

                const card = document.createElement("div");
                card.classList.add("col-md-3", "producto");

                // cada producto también tiene su data.categoria
                card.dataset.modalidad = producto.data.categoria;

                card.innerHTML = `
                    <div class="card mb-4 shadow-sm">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.alt}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio.toLocaleString('es-CO')}</p>
                            <button class="btn btn-primary w-100"
                                onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                `;

                lista.appendChild(card);
            });

        });
    })
    .catch(error => console.error("Error al cargar productos:", error));

