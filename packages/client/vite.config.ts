import { defineConfig, UserConfigExport } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfigExport = {
    base: './',
    publicDir: false,
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
      ],
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };

  if (mode === 'client') {
    config = {
      ...config,
      server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
      },
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT || 3001,
      },
      build: {
        outDir: 'dist/client',
      },
      plugins: [
        ...config.plugins,
        viteStaticCopy({
          targets: [
            {
              src: path.resolve(__dirname, './public') + '/[!.]*', // 1️⃣
              dest: './assets', // 2️⃣
            },
          ],
        }),
      ],
    };
  }

  if (mode === 'ssr') {
    config = {
      ...config,
      build: {
        ssr: true,
        lib: {
          entry: path.resolve(__dirname, 'src/entry-ssr.tsx'),
          name: 'Client',
          formats: ['cjs'],
        },
        outDir: 'dist/ssr',
      },
      ssr: {
        format: 'cjs',
      },
    };
  }

  return config;
});
