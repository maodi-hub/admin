import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { visualizer } from "rollup-plugin-visualizer";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true,
  },
  plugins: [
    vue(),
    vueJsx(),
    visualizer(),
    viteCompression(),
    ViteImageOptimizer()
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    },
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    outDir: "dist",
    assetsInlineLimit: 2000,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router'],
          'element-plus': ['element-plus', "@element-plus/icons-vue"],
          'excel-export': ['table-excel'],
        },
        // Static resource classification and packaging
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  assetsInclude: ["**/*.xlsx"],
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia','element-plus', "@element-plus/icons-vue"]
  }
});
