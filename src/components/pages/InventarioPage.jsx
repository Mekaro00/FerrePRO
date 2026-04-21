import React, { useState } from 'react'
import { useEffect } from 'react'
import {
  IconBox,
  IconAlertTriangle,
  IconCoin,
  IconRefresh,
  IconSearch,
  IconFilter,
  IconDownload,
  IconPlus,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconCloudCheck,
  IconTools,
  IconDroplet,
  IconBolt
} from '@tabler/icons-react'

// --- Base de Datos (12 Productos) ---
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Taladro Percutor 20V Max',
    sku: 'HDW-5829-TL',
    category: 'Herramientas',
    stock: 42,
    maxStock: 60,
    price: '$180.000'
  },
  {
    id: 2,
    name: 'Cable THHN Calibre 12 - 100m',
    sku: 'ELEC-9201-CB',
    category: 'Electricidad',
    stock: 8,
    maxStock: 50,
    price: '$75.500'
  },
  {
    id: 3,
    name: 'Pintura Látex Interior Blanca 5G',
    sku: 'PNT-3044-LX',
    category: 'Pintura',
    stock: 156,
    maxStock: 200,
    price: '$124.000'
  },
  {
    id: 4,
    name: 'Bombilla LED 9W Luz Fría',
    sku: 'ELEC-4421-LB',
    category: 'Electricidad',
    stock: 0,
    maxStock: 100,
    price: '$4.500'
  },
  {
    id: 5,
    name: 'Tornillo Madera 2.5" (Caja 500)',
    sku: 'FJN-1120-SC',
    category: 'Fijaciones',
    stock: 210,
    maxStock: 300,
    price: '$32.200'
  },
  {
    id: 6,
    name: 'Esmeril Angular 4-1/2" 700W',
    sku: 'HDW-2210-ES',
    category: 'Herramientas',
    stock: 15,
    maxStock: 40,
    price: '$89.000'
  },
  {
    id: 7,
    name: 'Interruptor Termomagnético 20A',
    sku: 'ELEC-5562-BR',
    category: 'Electricidad',
    stock: 45,
    maxStock: 80,
    price: '$12.500'
  },
  {
    id: 8,
    name: 'Llave Ajustable 10" Acero',
    sku: 'HDW-0098-LL',
    category: 'Herramientas',
    stock: 5,
    maxStock: 30,
    price: '$24.90'
  },
  {
    id: 9,
    name: 'Pegamento PVC 1/4 Galón',
    sku: 'PNT-8812-PV',
    category: 'Pintura',
    stock: 12,
    maxStock: 50,
    price: '$18.000'
  },
  {
    id: 10,
    name: 'Multímetro Digital Pro',
    sku: 'ELEC-7733-MT',
    category: 'Electricidad',
    stock: 3,
    maxStock: 15,
    price: '$145.000'
  },
  {
    id: 11,
    name: 'Sierra Circular 7-1/4"',
    sku: 'HDW-4412-SR',
    category: 'Herramientas',
    stock: 22,
    maxStock: 40,
    price: '$210.000'
  },
  {
    id: 12,
    name: 'Kit Brocas Concreto (10 pcs)',
    sku: 'HDW-9901-BK',
    category: 'Herramientas',
    stock: 65,
    maxStock: 100,
    price: '$35.000'
  }
]

export default function InventarioPage () {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : PRODUCTS_DATA
  })
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('Todas')

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const [showForm, setShowForm] = useState(false)

  const [newProduct, setNewProduct] = useState({
    name: '',
    sku: '',
    category: 'Herramientas',
    stock: '',
    maxStock: '',
    price: ''
  })

  const [error, setError] = useState('')

  const handleAddProduct = () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.sku.trim() ||
      newProduct.stock === '' ||
      newProduct.maxStock === '' ||
      !newProduct.price.trim()
    ) {
      setError('Completa todos los campos')
      return
    }

    const productToAdd = {
      id: Date.now(),
      name: newProduct.name.trim(),
      sku: newProduct.sku.trim(),
      category: newProduct.category,
      stock: Number(newProduct.stock),
      maxStock: Number(newProduct.maxStock),
      price: newProduct.price.trim()
    }

    setProducts(prev => [productToAdd, ...prev])

    setNewProduct({
      name: '',
      sku: '',
      category: 'Herramientas',
      stock: '',
      maxStock: '',
      price: ''
    })

    setError('')
    setShowForm(false)
  }

  const handleEdit = id => {
    const product = products.find(p => p.id === id)
    setNewProduct(product)
    setShowForm(true)

    setProducts(products.filter(p => p.id !== id))
  }

  // ESTADOS PARA PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6 // Mostraremos de a 6 para probar el cambio de página

  // Lógica de Filtrado
  const filteredProducts = products.filter(
    p =>
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())) &&
      (filterCat === 'Todas' || p.category === filterCat)
  )

  // Lógica de Paginación Real
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const handleDelete = id => {
    if (window.confirm('¿Confirmas la eliminación?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  return (
    <div className='container-fluid pb-5 px-4'>
      {/* Header */}
      <div className='d-flex justify-content-between align-items-end mb-4 gap-3'>
        <div>
          <h2 className='fw-black tracking-tighter mb-0'>
            CONTROL DE INVENTARIO
          </h2>
          <p className='text-muted small mb-0'>Gestión de existencias</p>
        </div>
        <button
          className='btn btn-orange d-flex align-items-center gap-2 fw-bold shadow'
          onClick={() => setShowForm(!showForm)}
        >
          <IconPlus size={18} /> NUEVO ITEM
        </button>
      </div>

      {error && <div className='alert alert-danger py-2 mb-3'>{error}</div>}

      {showForm && (
        <div className='card border-0 shadow-sm mb-4'>
          <div className='card-body'>
            <h5 className='fw-bold mb-3'>Nuevo Producto</h5>

            <div className='row g-2'>
              <div className='col-md-3'>
                <input
                  className='form-control'
                  placeholder='Nombre'
                  value={newProduct.name}
                  onChange={e =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
              </div>

              <div className='col-md-2'>
                <input
                  className='form-control'
                  placeholder='SKU'
                  value={newProduct.sku}
                  onChange={e =>
                    setNewProduct({ ...newProduct, sku: e.target.value })
                  }
                />
              </div>

              <div className='col-md-2'>
                <select
                  className='form-select'
                  value={newProduct.category}
                  onChange={e =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                >
                  <option>Herramientas</option>
                  <option>Electricidad</option>
                  <option>Pintura</option>
                  <option>Fijaciones</option>
                </select>
              </div>

              <div className='col-md-1'>
                <input
                  className='form-control text-end'
                  type='number'
                  placeholder='Stock'
                  value={newProduct.stock}
                  onChange={e =>
                    setNewProduct({ ...newProduct, stock: e.target.value })
                  }
                />
              </div>

              <div className='col-md-1'>
                <input
                  className='form-control text-end'
                  type='number'
                  placeholder='Max'
                  value={newProduct.maxStock}
                  onChange={e =>
                    setNewProduct({ ...newProduct, maxStock: e.target.value })
                  }
                />
              </div>

              <div className='col-md-2'>
                <input
                  className='form-control'
                  type='number'
                  min='0'
                  step='0.01'
                  placeholder='Precio'
                  value={newProduct.price}
                  onChange={e =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value
                    })
                  }
                />
              </div>

              <div className='d-flex justify-content-end mt-3'>
                <button
                  className='btn btn-light me-2'
                  onClick={() => {
                    setShowForm(false)

                    setNewProduct({
                      name: '',
                      sku: '',
                      category: 'Herramientas',
                      stock: '',
                      maxStock: '',
                      price: ''
                    })

                    setError('')
                  }}
                >
                  Cancelar
                </button>

                <button
                  className='btn btn-orange px-4'
                  onClick={handleAddProduct}
                >
                  Guardar producto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className='card border-0 shadow-sm mb-4'>
        <div className='card-body bg-light rounded d-flex flex-wrap align-items-center gap-3'>
          <div
            className='input-group input-group-sm'
            style={{ maxWidth: '300px' }}
          >
            <span className='input-group-text bg-white'>
              <IconSearch size={16} />
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Buscar SKU o nombre...'
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <select
            className='form-select form-select-sm w-auto fw-bold'
            onChange={e => {
              setFilterCat(e.target.value)
              setCurrentPage(1)
            }}
          >
            <option value='Todas'>Todas las Categorías</option>
            <option value='Herramientas'>Herramientas</option>
            <option value='Electricidad'>Electricidad</option>
            <option value='Pintura'>Pintura</option>
            <option value='Fijaciones'>Fijaciones</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className='card border-0 shadow-sm overflow-hidden'>
        <div className='table-responsive'>
          <table className='table table-hover align-middle mb-0'>
            <thead className='bg-white border-bottom'>
              <tr
                className='small text-muted text-uppercase'
                style={{ fontSize: '0.65rem' }}
              >
                <th className='ps-4 py-3'>Referencia SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th className='text-end pe-4'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(p => (
                <tr key={p.id}>
                  <td className='ps-4'>
                    <code className='text-orange fw-bold'>{p.sku}</code>
                  </td>
                  <td className='fw-bold small'>{p.name}</td>
                  <td>
                    {/* TEXTO EN NEGRO (text-dark) */}
                    <span
                      className='badge bg-zinc-100 text-dark border fw-bold'
                      style={{ fontSize: '0.65rem' }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td style={{ minWidth: '140px' }}>
                    <div className='d-flex align-items-center gap-2'>
                      <div
                        className='progress flex-grow-1'
                        style={{ height: '6px' }}
                      >
                        <div
                          className={`progress-bar ${
                            p.stock <= 10 ? 'bg-danger' : 'bg-orange'
                          }`}
                          style={{ width: `${(p.stock / p.maxStock) * 100}%` }}
                        />
                      </div>

                      <small className='fw-bold text-nowrap'>
                        {p.stock} U.
                      </small>
                    </div>
                  </td>
                  <td className='fw-black small'>${p.price}</td>
                  <td className='text-end pe-4'>
                    <div className='btn-group border rounded bg-white'>
                      <button
                        className='btn btn-sm btn-white border-0'
                        onClick={() => handleEdit(p.id)}
                      >
                        <IconEdit size={16} />
                      </button>
                      <button
                        className='btn btn-sm btn-white border-0 text-danger'
                        onClick={() => handleDelete(p.id)}
                      >
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINACIÓN FUNCIONAL */}
        <div className='card-footer bg-white p-3 d-flex justify-content-between align-items-center'>
          <span className='small text-muted fw-bold'>
            Página {currentPage} de {totalPages || 1}
          </span>
          <div className='d-flex gap-1'>
            <button
              className='btn btn-sm btn-light border'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <IconChevronLeft size={16} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm ${
                  currentPage === i + 1 ? 'btn-orange' : 'btn-light border'
                } fw-bold px-3`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className='btn btn-sm btn-light border'
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              <IconChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
