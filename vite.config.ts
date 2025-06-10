
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
      port: 24678,
    },
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    fs: {
      strict: false,
    },
  },
  plugins: [
    react({
      // Use default Fast Refresh behavior for react-swc
    }),
    componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependency pre-bundling for faster dev server
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-dialog',
      '@radix-ui/react-toast',
      '@tanstack/react-query',
    ],
    force: true,
  },
  // Improve build performance
  esbuild: {
    target: 'es2020',
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  // Cache optimization - force cache clear
  cacheDir: '.vite-cache',
  // Development optimizations
  define: {
    __DEV__: mode === 'development',
  },
  clearScreen: false,
}));
