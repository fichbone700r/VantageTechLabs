import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/proxy/sre': {
        target: 'https://sre.cl/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/proxy\/sre/, ''),
        secure: false, // In case of self-signed certs issues, though sre.cl has valid cert
      }
    }
  }
})
