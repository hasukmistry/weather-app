import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import dotenv from 'dotenv'
import type { ClientRequest } from 'http'

dotenv.config()

const proxyTarget = 'https://api.openweathermap.org'
const apiKey = process.env.VITE_OPEN_WEATHER_API_KEY || ''

const attachApiKey = (proxyReq: ClientRequest) => {
  const url = new URL(proxyReq.path!, proxyTarget)
  url.searchParams.set('appid', apiKey || '')
  proxyReq.path = url.pathname + url.search
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue(), vueJsx(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/weather': {
        target: proxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weather/, '/data/2.5/weather'),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => attachApiKey(proxyReq))
        },
      },
      '/api/forecast/daily': {
        target: proxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/forecast\/daily/, '/data/2.5/forecast'),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => attachApiKey(proxyReq))
        },
      },
      '/api/geo': {
        target: proxyTarget,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/geo/, '/geo/1.0/direct'),
        secure: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => attachApiKey(proxyReq))
        },
      },
    },
  },
})
