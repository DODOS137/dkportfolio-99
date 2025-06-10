
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: "/",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
      port: 24678,
    },
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  plugins: [
    react(),
    componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  // Simplified dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'lucide-react',
    ],
  },
  // Basic build settings
  esbuild: {
    target: 'es2020',
  },
});
