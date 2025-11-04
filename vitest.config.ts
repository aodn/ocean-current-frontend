import path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'prefixIds',
              params: {
                prefixIds: true,
                prefixClassNames: false,
              },
            },
          ],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
