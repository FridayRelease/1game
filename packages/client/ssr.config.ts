import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/entry-server.tsx'),
      name: 'Client',
      formats: ['cjs'],
    },
    outDir: 'dist/server',
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // svgr options
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@/assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@/components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: '@/api',
        replacement: fileURLToPath(new URL('./src/api', import.meta.url)),
      },
      {
        find: '@/layout',
        replacement: fileURLToPath(new URL('./src/layout', import.meta.url)),
      },
      {
        find: '@/types',
        replacement: fileURLToPath(new URL('./src/types', import.meta.url)),
      },
      {
        find: '@/hook',
        replacement: fileURLToPath(new URL('./src/types', import.meta.url)),
      },
      {
        find: '@/utils',
        replacement: fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
    ],
  },
});
