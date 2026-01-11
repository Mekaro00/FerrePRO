import { useId, useState } from 'react'

export function Formulario ({ onTextFilter, onSearch, onCategoryFilter }) {
  
  const idInput = useId()

  const [selectedCategories, setSelectedCategories] = useState({
    herramientas: '',
    insumos: '',
    construccion: ''
  })

  const handleSubmit = event => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const filters = {
      search: formData.get('search') || '',
      herramientas: formData.get('herramientas') || '',
      insumos: formData.get('insumos') || '',
      construccion: formData.get('construccion') || ''
    }

    onSearch(filters)
  }

  const handleTextChange = event => {
    const text = event.target.value
    onTextFilter(text)
  }

  const handleCategoryChange = event => {
    const { name, value } = event.target

    // dejar solo la categoría seleccionada y resetear las demás
    const nuevos = {
      herramientas: '',
      insumos: '',
      construccion: ''
    }
    nuevos[name] = value

    setSelectedCategories(nuevos)
    // enviamos el nombre del filtro y el valor elegido (App reseteará el resto)
    onCategoryFilter(name, value)
  }

  return (
    <section className='productos-search'>
      <h1>Busca el producto que necesitas</h1>
      <p>Explora miles de productos y herramientas que tenemos para ti.</p>

      <form onSubmit={handleSubmit} id='empleos-search-form' role='search'>
        <div className='search-bar'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='icon icon-tabler icons-tabler-outline icon-tabler-search'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
            <path d='M21 21l-6 -6' />
          </svg>

          <input
            name='search'
            id={idInput}
            type='text'
            placeholder='Buscar productos, herramientas'
            onChange={handleTextChange}
            value={/* control opcional: omitir si no hay texto */ undefined}
          />

          <button type='submit'>Buscar</button>
        </div>

        <div className='search-filters'>
          <select
            name='herramientas'
            value={selectedCategories.herramientas}
            onChange={handleCategoryChange}
            className='btn-filtro'
          >
            <option value=''>Herramientas de Construcción</option>
            <option value='electrica'>Herramientas Eléctricas</option>
            <option value='manuales'>Herramientas Manuales</option>
            <option value='medicion'>Herramientas de Medición</option>
          </select>

          <select
            name='insumos'
            value={selectedCategories.insumos}
            onChange={handleCategoryChange}
            className='btn-filtro'
          >
            <option value=''>Insumos y Accesorios</option>
            <option value='adhesivos'>Adhesivos</option>
            <option value='bisagras'>Bisagras y Pasadores</option>
            <option value='cerraduras'>Manijas y Cerraduras</option>
            <option value='ruedas'>Rodachines y Ruedas</option>
            <option value='tornilleria'>Tornillería</option>
            <option value='hogar'>Accesorios para el Hogar</option>
            <option value='seguridad'>Elementos de Seguridad</option>
          </select>

          <select
            name='construccion'
            value={selectedCategories.construccion}
            onChange={handleCategoryChange}
            className='btn-filtro'
          >
            <option value=''>Elementos de Construcción</option>
            <option value='construccion'>Construcción y Obras</option>
            <option value='pintura'>Pintura y Revestimientos</option>
            <option value='fontaneria'>Fontanería y Plomería</option>
            <optgroup label='Electricidad'>
              <option value='cajas'>Cajas eléctricas</option>
              <option value='pvc'>Canaletas y Tuberías</option>
              <option value='conductores'>Conductores</option>
              <option value='interruptores'>
                Interruptores y Tomacorrientes
              </option>
              <option value='iluminacion'>Luminarias y Reflectores</option>
            </optgroup>
          </select>
        </div>
      </form>
    </section>
  )
}
