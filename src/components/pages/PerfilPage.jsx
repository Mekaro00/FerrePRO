import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconUser,
  IconPackage,
  IconHeart,
  IconSettings,
  IconMapPin,
  IconCreditCard,
  IconChevronRight
} from '@tabler/icons-react'

export function PerfilPage ({ usuario, setUsuario, cerrarSesion }) {
  const [tabActiva, setTabActiva] = useState('compras')

  const handleGuardar = e => {
    e.preventDefault()

    const actualizado = {
      ...usuario,
      ...formData
    }

    // actualizar lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios_ferrepro')) || []

    const nuevosUsuarios = usuarios.map(u =>
      u.id === usuario.id ? actualizado : u
    )

    localStorage.setItem('usuarios_ferrepro', JSON.stringify(nuevosUsuarios))
    localStorage.setItem('sesion_activa', JSON.stringify(actualizado))

    setUsuario(actualizado)

    alert('Datos actualizados correctamente')
  }

  // Datos simulados
  const compras = [
    {
      id: '#FP-9021',
      fecha: '15 Abr 2026',
      total: 450000,
      estado: 'Entregado',
      color: 'success'
    },
    {
      id: '#FP-8845',
      fecha: '02 Abr 2026',
      total: 85000,
      estado: 'En camino',
      color: 'warning'
    }
  ]

  const deseos = [
    {
      id: 1,
      nombre: 'Amoladora Industrial',
      precio: 120000,
      imagen:
        'imagenes pagina ferreteria/Herramientas electricas/Amoladora.webp'
    }
  ]

  const [formData, setFormData] = useState({
    nombres: usuario.nombres || '',
    apellidos: usuario.apellidos || '',
    email: usuario.email || '',
    telefono: usuario.telefono || '',
    direccion: usuario.direccion || ''
  })

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Estado para manejo de contraseñas
  const [mostrarModalPassword, setMostrarModalPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  })

  const handlePasswordChange = e => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handleCambiarPassword = () => {
    const passwordActualHash = btoa(passwordData.actual)

    // validar contraseña actual
    if (usuario.password !== passwordActualHash) {
      alert('La contraseña actual es incorrecta')
      return
    }

    // validar nueva contraseña
    if (passwordData.nueva !== passwordData.confirmar) {
      alert('Las nuevas contraseñas no coinciden')
      return
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/

    if (!passwordRegex.test(passwordData.nueva)) {
      alert('La nueva contraseña no cumple los requisitos')
      return
    }

    const actualizado = {
      ...usuario,
      password: btoa(passwordData.nueva)
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios_ferrepro')) || []

    const nuevosUsuarios = usuarios.map(u =>
      u.id === usuario.id ? actualizado : u
    )

    localStorage.setItem('usuarios_ferrepro', JSON.stringify(nuevosUsuarios))
    localStorage.setItem('sesion_activa', JSON.stringify(actualizado))

    setUsuario(actualizado)

    alert('Contraseña actualizada correctamente')

    // limpiar campos
    setPasswordData({
      actual: '',
      nueva: '',
      confirmar: ''
    })
    setMostrarModalPassword(false)
  }

  return (
    <div
      className='container'
      style={{ paddingTop: '120px', minHeight: '90vh' }}
    >
      <div className='row g-4'>
        {/* Lateral Izquierdo: Resumen Usuario */}
        <div className='col-lg-4'>
          <div
            className='card border-0 shadow-sm p-4 text-center'
            style={{ borderRadius: '20px' }}
          >
            <div className='position-relative d-inline-block mx-auto mb-3'>
              <img
                src={`https://ui-avatars.com/api/?name=${usuario.nombres}&background=ff6600&color=fff&size=128`}
                className='rounded-circle border border-4 border-light shadow-sm'
                alt='Avatar'
              />
              <span
                className='position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-2'
                title='Online'
              ></span>
            </div>
            <h4 className='fw-bold mb-0'>
              {usuario.nombres} {usuario.apellidos}
            </h4>
            <p className='text-muted small'>Cliente VIP • Miembro desde 2025</p>

            <div className='list-group list-group-flush text-start mt-4'>
              <button
                onClick={() => setTabActiva('datos')}
                className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center gap-3 ${
                  tabActiva === 'datos' ? 'active bg-light text-dark' : ''
                }`}
              >
                <IconUser size={20} className='text-orange' /> Mis Datos
              </button>
              <button
                onClick={() => setTabActiva('compras')}
                className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center gap-3 ${
                  tabActiva === 'compras' ? 'active bg-light text-dark' : ''
                }`}
              >
                <IconPackage size={20} className='text-orange' /> Mis Compras
              </button>
              <button
                onClick={() => setTabActiva('deseos')}
                className={`list-group-item list-group-item-action border-0 rounded-3 mb-2 d-flex align-items-center gap-3 ${
                  tabActiva === 'deseos' ? 'active bg-light text-dark' : ''
                }`}
              >
                <IconHeart size={20} className='text-orange' /> Lista de Deseos
              </button>
              <button
                onClick={cerrarSesion}
                className='list-group-item list-group-item-action border-0 rounded-3 mt-4 d-flex align-items-center gap-3 text-danger'
              >
                <IconSettings size={20} className='text-danger' /> Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Lateral Derecho: Contenido Dinámico */}
        <div className='col-lg-8'>
          <div
            className='card border-0 shadow-sm p-4'
            style={{ borderRadius: '20px', minHeight: '450px' }}
          >
            {/* SECCIÓN: MIS COMPRAS */}
            {tabActiva === 'compras' && (
              <div>
                <h5 className='fw-bold mb-4 d-flex align-items-center gap-2'>
                  <IconPackage className='text-orange' /> Historial de Compras
                </h5>
                <div className='table-responsive'>
                  <table className='table align-middle'>
                    <thead className='table-light'>
                      <tr className='small text-muted'>
                        <th>PEDIDO</th>
                        <th>FECHA</th>
                        <th>TOTAL</th>
                        <th>ESTADO</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {compras.map(c => (
                        <tr key={c.id}>
                          <td className='fw-bold text-primary'>{c.id}</td>
                          <td className='small'>{c.fecha}</td>
                          <td className='fw-bold'>
                            ${c.total.toLocaleString()}
                          </td>
                          <td>
                            <span
                              className={`badge bg-${c.color} bg-opacity-10 text-${c.color} rounded-pill px-3`}
                            >
                              {c.estado}
                            </span>
                          </td>
                          <td>
                            <IconChevronRight
                              size={18}
                              className='text-muted'
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECCIÓN: LISTA DE DESEOS */}
            {tabActiva === 'deseos' && (
              <div>
                <h5 className='fw-bold mb-4 d-flex align-items-center gap-2'>
                  <IconHeart className='text-orange' /> Herramientas que Deseas
                </h5>
                <div className='row g-3'>
                  {deseos.map(d => (
                    <div key={d.id} className='col-md-6'>
                      <div className='d-flex align-items-center gap-3 p-3 border rounded-4'>
                        <img
                          src={d.imagen}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '10px'
                          }}
                          alt=''
                        />
                        <div className='flex-grow-1'>
                          <h6 className='mb-0 fw-bold'>{d.nombre}</h6>
                          <small className='text-primary fw-bold'>
                            ${d.precio.toLocaleString()}
                          </small>
                        </div>
                        <button className='btn btn-sm btn-outline-orange p-1 rounded-circle'>
                          🛒
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN: MIS DATOS */}
            {tabActiva === 'datos' && (
              <div>
                <h5 className='fw-bold mb-4 d-flex align-items-center gap-2'>
                  <IconSettings className='text-orange' /> Información Personal
                </h5>
                <form className='row g-3'>
                  <div className='col-md-6'>
                    <label className='form-label small fw-bold'>Nombres</label>
                    <input
                      name='nombres'
                      type='text'
                      value={formData.nombres}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>

                  <div className='col-md-6'>
                    <label className='form-label small fw-bold'>
                      Apellidos
                    </label>
                    <input
                      name='apellidos'
                      type='text'
                      value={formData.apellidos}
                      onChange={handleChange}
                      className='form-control'
                    />
                  </div>
                  <div className='col-md-6'>
                    <label className='form-label small fw-bold'>
                      Correo Electrónico
                    </label>
                    <input
                      name='email'
                      type='email'
                      className='form-control rounded-3'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='col-12'>
                    <label className='form-label small fw-bold'>
                      <IconMapPin size={16} /> Dirección de Entrega
                    </label>
                    <input
                      name='direccion'
                      type='text'
                      className='form-control rounded-3'
                      value={formData.direccion}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='col-12 d-flex justify-content-between align-items-center mt-4'>
                    <button
                      type='button'
                      onClick={() => setMostrarModalPassword(true)}
                      className='btn btn-outline-dark'
                    >
                      Cambiar Contraseña
                    </button>

                    <button
                      type='button'
                      onClick={handleGuardar}
                      className='btn btn-orange'
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      {mostrarModalPassword && (
        <div
          className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center'
          style={{
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999
          }}
        >
          <div
            className='bg-white p-4 rounded-4 shadow'
            style={{ width: '100%', maxWidth: '400px' }}
          >
            <h5 className='fw-bold mb-3'>Cambiar Contraseña</h5>

            <input
              type='password'
              name='actual'
              placeholder='Contraseña actual'
              className='form-control mb-3'
              value={passwordData.actual}
              onChange={handlePasswordChange}
            />

            <input
              type='password'
              name='nueva'
              placeholder='Nueva contraseña'
              className='form-control mb-3'
              value={passwordData.nueva}
              onChange={handlePasswordChange}
            />

            <input
              type='password'
              name='confirmar'
              placeholder='Confirmar contraseña'
              className='form-control mb-4'
              value={passwordData.confirmar}
              onChange={handlePasswordChange}
            />

            <div className='d-flex justify-content-end gap-2'>
              <button
                onClick={() => setMostrarModalPassword(false)}
                className='btn btn-light'
              >
                Cancelar
              </button>

              <button
                type='button'
                onClick={handleCambiarPassword}
                className='btn btn-orange'
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
