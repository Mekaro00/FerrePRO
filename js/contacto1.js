document.getElementById('btnEnviar').addEventListener('click', function () {
  const nombre = document.getElementById('floatingInput').value.trim()
  const correo = document.getElementById('floatingEmail').value.trim()
  const telefono = document.getElementById('floatingTel').value.trim()
  const consulta = document.getElementById('floatingSelect').value.trim()
  const mensaje = document.getElementById('floatingTextarea').value.trim()

  if (!nombre || !correo || !telefono || !consulta || !mensaje) {
    alert('Por favor, completa todos los campos antes de enviar el mensaje.')
    return // No ejecuta el resto si hay campos vacíos
  }

  // Si todos los campos están llenos:
  document.getElementById('floatingInput').value = ''
  document.getElementById('floatingEmail').value = ''
  document.getElementById('floatingTel').value = ''
  document.getElementById('floatingSelect').value = ''
  document.getElementById('floatingTextarea').value = ''

  const confirmation = document.getElementById('confirmationMessage')
  confirmation.textContent = '✅ Tu mensaje ha sido enviado con éxito.'
  confirmation.style.display = 'block'

  setTimeout(() => {
    confirmation.style.display = 'none'
  }, 5000)
})
