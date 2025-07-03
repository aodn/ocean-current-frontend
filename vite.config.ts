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

  return defineConfig({
    plugins: [
      react(),
      !process.env.VITEST
        ? checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint --rule "no-console: off" "./src/**/*.{ts,tsx}"',
            },
          })
        : undefined,
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: Number(process.env.VITE_PORT),
      open: Boolean(process.env.VITE_OPEN_BROWSER),
      proxy: {
        '/ec2': {
          target: 'https://oceancurrent.aodn.org.au',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ec2/, ''),
        },
        '/s3': {
          target: process.env.VITE_API_S3_PROXY_URL || 'https://oceancurrent.edge.aodn.org.au/storage',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/s3/, ''),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
      include: ['src/**/*.test.[jt]s?(x)'],
      deps: {
        optimizer: {
          web: {
            include: ['vitest-canvas-mock'],
          },
        },
      },
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.?(c|m)[jt]s?(x)'],
        exclude: ['src/styles', 'src/types', '**/*.d.ts', '**/*.types.ts'],
      },
    },
  });
};
