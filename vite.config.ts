
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
      usePolling: false,
      interval: 50,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
  },
  plugins: [
    react({
      // Enable Fast Refresh (correct option name)
      refresh: true,
      // Optimize for development
      jsxImportSource: "@emotion/react",
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
    force: mode === 'development',
  },
  // Improve build performance
  esbuild: {
    target: 'es2020',
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  // Cache optimization
  cacheDir: '.vite',
  // Development optimizations
  define: {
    __DEV__: mode === 'development',
  },
}));
