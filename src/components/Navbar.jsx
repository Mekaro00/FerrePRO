import { useNavigate } from 'react-router-dom'
import { IconShoppingCart, IconMenu2, IconUser } from '@tabler/icons-react'

export function Navbar({ onCategoryFilter, carrito, usuario, cerrarSesion }) {
  const navigate = useNavigate()

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  const handleClickCategoria = (filterName, value) => {
    onCategoryFilter(filterName, value)

    navigate('/', {
      state: { scrollToProductos: true }
    })
  }

  return (
    <nav className='navbar bg-dark navbar-dark fixed-top'>
      <div className='container-fluid'>
        {/* LOGO */}
        <a
          className='navbar-brand d-flex align-items-center'
          href='#'
          onClick={e => {
            e.preventDefault()
            navigate('/')
          }}
        >
          <img
            src='/imagenes pagina ferreteria/Imagen de fondo inicio y logo/Logo.jpeg'
            alt='Logo FerrePro'
            className='me-2 rounded'
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
          <span className='fw-bold'>FerrePro</span>
        </a>

        {/* ICONO DEL CARRITO */}
        <div className='d-flex align-items-center'>
          <button
            onClick={() => navigate('/carrito')}
            className='btn btn-outline-light me-3 position-relative border-0'
            title='Mi Carrito'
          >
            <IconShoppingCart size={24} />
            {totalItems > 0 && (
              <span
                className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                style={{ fontSize: '0.6rem' }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* BOTÓN PERFIL */}
          <button
            onClick={() => {
              if (usuario) {
                navigate('/perfil')
              } else {
                navigate('/login')
              }
            }}
            className='btn btn-outline-light me-2 border-0'
            title='Mi Perfil'
          >
            {usuario ? (
              <img
                src={`https://ui-avatars.com/api/?name=${usuario.nombres}&background=ff6600&color=fff`}
                style={{ width: 32, height: 32, borderRadius: '50%' }}
              />
            ) : (
              <IconUser size={24} />
            )}
          </button>

          {/* MENÚ HAMBURGUESA */}
          <button
            className='navbar-toggler border-0'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvasNavbar'
          >
            <IconMenu2 size={28} />
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

          <div
            className='offcanvas-body d-flex flex-column'
            style={{ height: '100%' }}
          >
            <ul className='navbar-nav pe-3'>
              {/* SECCIONES */}
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#herramientas-electricas'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('herramientas', 'electrica')
                  }}
                >
                  Herramientas eléctricas
                </a>
              </li>

              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#herramientas-manuales'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('herramientas', 'manuales')
                  }}
                >
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
                    <a
                      className='dropdown-item'
                      href='#adhesivos'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('insumos', 'adhesivos')
                      }}
                    >
                      Adhesivos
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#bisagras'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('insumos', 'bisagras')
                      }}
                    >
                      Bisagras y pasadores
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#manijas'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('insumos', 'cerraduras')
                      }}
                    >
                      Manijas y cerraduras
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#rodachines'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('insumos', 'ruedas')
                      }}
                    >
                      Rodachines y ruedas
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#tornilleria'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('insumos', 'tornilleria')
                      }}
                    >
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
                    <a
                      className='dropdown-item'
                      href='#cajas'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('construccion', 'cajas')
                      }}
                    >
                      Cajas eléctricas
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#canaletas'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('construccion', 'pvc')
                      }}
                    >
                      Canaletas y tubos conduit
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#conductores'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('construccion', 'conductores')
                      }}
                    >
                      Conductores
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#interruptores'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('construccion', 'interruptores')
                      }}
                    >
                      Interruptores y tomacorrientes
                    </a>
                  </li>
                  <li>
                    <a
                      className='dropdown-item'
                      href='#luminarias'
                      onClick={e => {
                        e.preventDefault()
                        handleClickCategoria('construccion', 'iluminacion')
                      }}
                    >
                      Luminarias y reflectores
                    </a>
                  </li>
                </ul>
              </li>

              {/* MÁS SECCIONES */}
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#pinturas-y-revestimientos'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('construccion', 'pintura')
                  }}
                >
                  Pinturas y revestimientos
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#medicion-y-nivelacion'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('herramientas', 'medicion')
                  }}
                >
                  Medición y nivelación
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#construccion-y-obra'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('construccion', 'construccion')
                  }}
                >
                  Construcción y obra
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#fontaneria-y-plomeria'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('construccion', 'fontaneria')
                  }}
                >
                  Fontanería y plomería
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#seguridad-industrial'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('insumos', 'seguridad')
                  }}
                >
                  Seguridad industrial
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#accesorios-para-el-hogar'
                  onClick={e => {
                    e.preventDefault()
                    handleClickCategoria('insumos', 'hogar')
                  }}
                >
                  Accesorios para el hogar
                </a>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  href='#contacto'
                  onClick={e => {
                    e.preventDefault()
                    navigate('/contacto')
                  }}
                >
                  Contacto
                </a>
              </li>
            </ul>
            {/* BOTÓN INICIAR SESIÓN ABAJO */}
            {usuario ? (
              <button
                className='btn btn-danger w-100 mt-auto fw-bold py-3'
                onClick={() => {
                  cerrarSesion()
                  navigate('/')
                }}
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                className='btn btn-orange w-100 mt-auto fw-bold py-3'
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  )
}
