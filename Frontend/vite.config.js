import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  // Cargar las variables del .env
  const env = loadEnv(mode, process.cwd());

  const backendUri = env.VITE_API_URI;

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/testConnectionFactura': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/testConnectionFactura/, '/api/facturas/testConnection'),
        },
        '/testConnectionTipoFactura': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/testConnectionTipoFactura/, '/api/bills_type/testConnection'),
        },
        '/testConnectionCliente': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/testConnectionCliente/, '/api/clientes/testConnection'),
        },
        '/testConnectionProveedores': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/testConnectionProveedores/, '/api/proveedores/testConnection'),
        },
        '/testConnectionUsuarios': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/testConnectionUsuarios/, '/api/usuarios/testConnection'),
        },
      },
    },
  }
})
