import { defineConfig, UserConfigExport } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfigExport = {
    base: 'assets',
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
      publicDir: 'public',
      server: {
        port: Number(process.env.CLIENT_PORT) || 3000,
      },
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT || 3001,
      },
      build: {
        outDir: 'dist/client',
        rollupOptions: {
          output: {
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',

            assetFileNames: ({ name }) => {
              if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
                return 'img/[name]-[hash][extname]';
              }

              if (/\.css$/.test(name ?? '')) {
                return 'css/[name]-[hash][extname]';
              }

              // default value
              // ref: https://rollupjs.org/guide/en/#outputassetfilenames
              return '[name]-[hash][extname]';
            },
          },
        },
      },
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
