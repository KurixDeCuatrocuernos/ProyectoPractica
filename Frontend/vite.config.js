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



        '/signin': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/signin/, '/api/usuarios/signin'),
        },
        '/check_user': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/check_user/, '/api/usuarios/check_user'),
        },
        '/logout': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/logout/, '/api/usuarios/logout'),
        },
        '/get_current_data': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_current_data/, '/api/usuarios/get_current_data'),
        },
        '/check_log': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/check_log/, '/api/usuarios/check_log'),
        },
        '/get_current_name': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_current_name/, '/api/usuarios/get_current_name'),
        },
        '/new_user_submit': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/new_user_submit/, '/api/usuarios/new_user_submit'),
        },
        '/get_all_users': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_all_users/, '/api/usuarios/post_usuarios'),
        },


        '/get_all_bills': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_all_bills/, '/api/facturas/get_bills')
        },
        '/get_my_bills': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_my_bills/, '/api/facturas/get_current_user_bills')
        },
        '/get_saved_bills': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_saved_bills/, '/api/facturas/get_saved_bills')
        },
        '/post_new_bill': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/post_new_bill/, '/api/facturas/post_new_bill')
        },


        '/get_roles': {
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_roles/, '/api/role/post_roles')
        },


        '/get_types':{
          target: backendUri,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/get_types/, '/api/bills_type/post_types')
        },
      },
    },
  }
})
