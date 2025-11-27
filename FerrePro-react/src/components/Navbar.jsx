export function Navbar ({ onCategoryFilter }) {
  return (
    <nav className='navbar bg-dark navbar-dark fixed-top'>
      <div className='container-fluid'>
        {/* LOGO */}
        <a
          className='navbar-brand d-flex align-items-center'
          href='./Inicio.html'
        >
          <img
            src='/imagenes pagina ferreteria/Imagen de fondo inicio y logo/Logo.jpeg'
            alt='Logo FerrePro'
            className='me-2 rounded'
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          FerrePro
        </a>

        {/* ICONOS */}
        <div className='d-flex align-items-center'>
          <a href='carrito.html' className='btn btn-outline-light me-2'>
            🛒
          </a>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
            aria-controls='offcanvasNavbar'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
        </div>

        {/* OFFCANVAS MENU */}
        <div
          className='offcanvas offcanvas-end text-bg-dark'
          tabIndex='-1'
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
        >
          <div className='offcanvas-header'>
            <h5 className='offcanvas-title' id='offcanvasNavbarLabel'>
              Menú
            </h5>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>

          <div className='offcanvas-body'>
            <ul className='navbar-nav justify-content-end flex-grow-1 pe-3'>
              {/* SECCIONES */}
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#herramientas-electricas'
                  onClick={e => {
                    e.preventDefault()
                    onCategoryFilter('herramientas', 'electrica')
                  }}
                >
                  Herramientas eléctricas
                </a>
              </li>

              <li className='nav-item'>
                <a className='nav-link' href='#herramientas-manuales' onClick={(e) => { e.preventDefault(); onCategoryFilter('herramientas','manuales'); }}>
                  Herramientas manuales
                </a>
              </li>

              {/* FERRETERÍA GENERAL */}
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  Ferretería general
                </a>
                <ul className='dropdown-menu dropdown-menu-dark'>
                  <li>
                    <a className='dropdown-item' href='#adhesivos' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','adhesivos');}}>
                      Adhesivos
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#bisagras' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','bisagras');}}>
                      Bisagras y pasadores
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#manijas' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','cerraduras');}}>
                      Manijas y cerraduras
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#rodachines' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','ruedas');}}>
                      Rodachines y ruedas
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#tornilleria' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','tornilleria');}}>
                      Tornillería
                    </a>
                  </li>
                </ul>
              </li>

              {/* ELECTRICIDAD */}
              <li className='nav-item dropdown'>
                <a
                  className='nav-link dropdown-toggle'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  Electricidad
                </a>
                <ul className='dropdown-menu dropdown-menu-dark'>
                  <li>
                    <a className='dropdown-item' href='#cajas' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','cajas');}}>
                      Cajas eléctricas
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#canaletas' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','pvc');}}>
                      Canaletas y tubos conduit
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#conductores' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','conductores');}}>
                      Conductores
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#interruptores' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','interruptores');}}>
                      Interruptores y tomacorrientes
                    </a>
                  </li>
                  <li>
                    <a className='dropdown-item' href='#luminarias' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','iluminacion');}}>
                      Luminarias y reflectores
                    </a>
                  </li>
                </ul>
              </li>

              {/* MÁS SECCIONES */}
              <li className='nav-item'>
                <a className='nav-link' href='#pinturas-y-revestimientos' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','pintura');}}>
                  Pinturas y revestimientos
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#medicion-y-nivelacion' onClick={(e)=>{e.preventDefault(); onCategoryFilter('herramientas','medicion');}}>
                  Medición y nivelación
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#construccion-y-obra' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','construccion');}}>
                  Construcción y obra
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#fontaneria-y-plomeria' onClick={(e)=>{e.preventDefault(); onCategoryFilter('construccion','fontaneria');}}>
                  Fontanería y plomería
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#seguridad-industrial' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','seguridad');}}>
                  Seguridad industrial
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='#accesorios-para-el-hogar' onClick={(e)=>{e.preventDefault(); onCategoryFilter('insumos','hogar');}}>
                  Accesorios para el hogar
                </a>
              </li>
              <li className='nav-item'>
                <a className='nav-link' href='contacto.html'>
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
