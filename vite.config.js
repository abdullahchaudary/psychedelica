import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: ['/favicon/android-chrome-192x192.png', 'apple-touch-icon.png', '/favicon/android-chrome-384x384.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        clientsClaim: true,
        skipWaiting: true
      },
      manifest: {
        name: 'Psychedelica',
        short_name: 'Psychedelica',
        description: 'Stunning 3D visuals and reactive soundscapes',
        theme_color: '#7ed321',
        background_color: '#000000',
        display: 'fullscreen',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/favicon/android-chrome-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
