import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@/assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: '@/components', replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
      { find: '@/api', replacement: fileURLToPath(new URL('./src/api', import.meta.url)) },
      { find: '@/layout', replacement: fileURLToPath(new URL('./src/layout', import.meta.url)) },
      { find: '@/types', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
      { find: '@/hook', replacement: fileURLToPath(new URL('./src/types', import.meta.url)) },
      { find: '@/utils', replacement: fileURLToPath(new URL('./src/utils', import.meta.url)) },
    ]
  }
})
