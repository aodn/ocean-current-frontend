/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  const proxyLog = Boolean(process.env.VITE_PROXY_LOG);
  const logProxy = (method: string, url: string, target: string | object) =>
    proxyLog &&
    console.log(`[proxy] ${method} ${url} -> ${typeof target === 'string' ? target : JSON.stringify(target)}${url}`); // eslint-disable-line no-console

  return defineConfig({
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
      !process.env.VITEST
        ? checker({
            typescript: true,
            eslint: {
              lintCommand: 'eslint --rule "no-console: off" "./src/**/*.{ts,tsx}"',
            },
          })
        : undefined,
      titlePlugin(mode),
      googleAnalyticsPlugin(),
      newRelicPlugin(),
      tailwindcss(),
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
    },
    server: {
      port: Number(process.env.VITE_PORT),
      open: Boolean(process.env.VITE_OPEN_BROWSER),
      proxy: {
        '/api/v1': {
          target: process.env.VITE_API_BACKEND_URL || 'https://oceancurrent.edge.aodn.org.au/api/v1',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (_, req) =>
              logProxy(req.method ?? 'UNKNOWN', req.url ?? 'UNKNOWN', options.target ?? 'UNKNOWN'),
            );
          },
        },
        '/resource': {
          target: process.env.VITE_API_EC2_PROXY_URL || 'https://oceancurrent.edge.aodn.org.au/resource',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/resource/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (_, req) =>
              logProxy(req.method ?? 'UNKNOWN', req.url ?? 'UNKNOWN', options.target ?? 'UNKNOWN'),
            );
          },
        },
        '/storage': {
          target: process.env.VITE_API_S3_PROXY_URL || 'https://oceancurrent.edge.aodn.org.au/storage',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/storage/, ''),
          configure: (proxy, options) => {
            proxy.on('proxyReq', (_, req) =>
              logProxy(req.method ?? 'UNKNOWN', req.url ?? 'UNKNOWN', options.target ?? 'UNKNOWN'),
            );
          },
        },
      },
    },
  });
};

const titlePlugin = (mode: string) => {
  const modeTitle: Record<string, string> = {
    development: '[DEV] IMOS-OceanCurrent',
    edge: '[EDGE] IMOS-OceanCurrent',
  };
  const title = process.env.VITE_APP_TITLE ?? modeTitle[mode] ?? null;
  return {
    name: 'vite-plugin-title',
    transformIndexHtml(html: string) {
      if (!title) return html;
      return html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
    },
  };
};

const googleAnalyticsPlugin = () => {
  return {
    name: 'vite-plugin-google-analytics',
    transformIndexHtml(html: string) {
      const gaId = process.env.VITE_GA_MEASUREMENT_ID;
      if (!gaId) return html;
      const gaScript = `
          <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          </script>
        `;
      return html.replace('<!-- google-analytics-js -->', gaScript);
    },
  };
};

const newRelicPlugin = () => {
  const isEnabled = Boolean(process.env.NEWRELIC_ENABLED);
  return {
    name: 'inject-prod-script',
    transformIndexHtml(html: string) {
      if (!isEnabled) return html;
      const script = '<script async src="/monitoring.js"></script>';
      return html.replace('<!-- new-relic-js -->', `${script}`);
    },
  };
};
