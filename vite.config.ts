/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };
  const plugins = [
    react(),
    !process.env.VITEST
      ? checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint --rule "no-console: off" "./src/**/*.{ts,tsx}"',
          },
        })
      : undefined,
  ];

  if (mode === 'production') {
    plugins.push({
      name: 'inject-prod-script',
      transformIndexHtml(html) {
        const script = `<script async src="/monitoring.js"></script>`;
        return html.replace('</head>', `${script}</head>`);
      },
    });
  }

  return defineConfig({
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(process.env.VITE_PORT),
      open: Boolean(process.env.VITE_OPEN_BROWSER),
      proxy: {
        '/api/v1': {
          target: process.env.VITE_API_BACKEND_URL || 'http://localhost:8080/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ''),
        },
        '/resource': {
          target: process.env.VITE_API_EC2_PROXY_URL || 'https://oceancurrent.edge.aodn.org.au/resource',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/resource/, ''),
        },
        '/storage': {
          target: process.env.VITE_API_S3_PROXY_URL || 'https://oceancurrent.edge.aodn.org.au/storage',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/storage/, ''),
        },
      },
    },
  });
};
