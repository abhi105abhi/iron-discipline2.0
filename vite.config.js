import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Abhi ke liye icons hata rahe hain jab tak tu images add nahi karta
      manifest: {
        name: 'Iron Discipline',
        short_name: 'IronDisc',
        description: 'Masculine Performance Portal',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [] // Empty rakho abhi
      }
    })
  ],
})
