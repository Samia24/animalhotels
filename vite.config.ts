import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Quando o front chamar '/users', o Vite redireciona para o backend
      '/users': 'http://localhost:8080',
      '/tutores': 'http://localhost:8080',
      '/animais': 'http://localhost:8080',
    }
  }
})