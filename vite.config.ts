import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget';
  
  if (isWidget) {
    // Widget library build configuration
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'SmartTrace',
          fileName: (format) => `smart-trace.${format === 'es' ? 'es.js' : 'umd.cjs'}`
        },
        rollupOptions: {
          // Don't externalize React for UMD build - bundle it in
          external: [],
          output: {
            globals: {},
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return 'smarttrace.css';
              }
              return assetInfo.name || 'asset';
            }
          }
        },
        target: 'es2015',
        minify: 'esbuild'
      },
      define: {
        global: 'globalThis',
        'process.env.NODE_ENV': '"production"'
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      }
    };
  }

  // Default build configuration for admin dashboard and examples
  return {
    plugins: [
      react(),
      {
        name: 'admin-spa-middleware',
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            // Handle all /admin routes to serve admin.html for client-side routing
            if (req.url?.startsWith('/admin')) {
              req.url = '/admin.html';
            }
            next();
          });
        }
      }
    ],
    build: {
      rollupOptions: {
        input: {
          // Main widget entry
          main: resolve(__dirname, 'index.html'),
          // Admin dashboard entry
          admin: resolve(__dirname, 'admin.html'),
          // Example/demo entry
          example: resolve(__dirname, 'example.html'),
        },
        output: {
          // Separate chunks for different entries
          manualChunks: {
            vendor: ['react', 'react-dom'],
            admin: ['./src/components/AdminDashboard.tsx'],
            widget: ['./src/components/TimeMachineWidget.tsx']
          }
        }
      },
      target: 'es2015',
      minify: 'esbuild'
    },
    define: {
      global: 'globalThis',
      'process.env.NODE_ENV': '"development"'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 5173,
      open: '/admin.html' // Open admin by default in dev mode
    }
  };
});
