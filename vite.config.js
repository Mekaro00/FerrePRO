import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Configuración limpia para Bootstrap
export default defineConfig({
  plugins: [react()],
})
