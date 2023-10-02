// vite.config.ts
import { defineConfig } from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import viteCompression from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/vite-plugin-compression/dist/index.mjs";
import { ViteImageOptimizer } from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { visualizer } from "file:///C:/Users/17488/Desktop/v3_template/admin-template/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\17488\\Desktop\\v3_template\\admin-template";
var vite_config_default = defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9527,
    open: true
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
      "@": resolve(__vite_injected_original_dirname, "./src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
    }
  },
  build: {
    target: "es2015",
    minify: "esbuild",
    outDir: "dist",
    assetsInlineLimit: 2e3,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue", "pinia", "vue-router"],
          "element-plus": ["element-plus", "@element-plus/icons-vue"],
          xlsx: ["xlsx"],
          "file-saver": ["file-saver"]
        },
        // Static resource classification and packaging
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  assetsInclude: ["**/*.xlsx"],
  optimizeDeps: {
    include: ["vue", "vue-router", "pinia", "element-plus", "@element-plus/icons-vue"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxNzQ4OFxcXFxEZXNrdG9wXFxcXHYzX3RlbXBsYXRlXFxcXGFkbWluLXRlbXBsYXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwxNzQ4OFxcXFxEZXNrdG9wXFxcXHYzX3RlbXBsYXRlXFxcXGFkbWluLXRlbXBsYXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy8xNzQ4OC9EZXNrdG9wL3YzX3RlbXBsYXRlL2FkbWluLXRlbXBsYXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XHJcbmltcG9ydCB2dWVKc3ggZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjtcclxuaW1wb3J0IHZpdGVDb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbic7XHJcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gJ3ZpdGUtcGx1Z2luLWltYWdlLW9wdGltaXplcic7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XHJcblxyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgc2VydmVyOiB7XHJcbiAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuICAgIHBvcnQ6IDk1MjcsXHJcbiAgICBvcGVuOiB0cnVlLFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgIHZpdGVDb21wcmVzc2lvbigpLFxyXG4gICAgVml0ZUltYWdlT3B0aW1pemVyKClcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgXCJ2dWUtaTE4blwiOiBcInZ1ZS1pMThuL2Rpc3QvdnVlLWkxOG4uY2pzLmpzXCJcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzMjAxNVwiLFxyXG4gICAgbWluaWZ5OiBcImVzYnVpbGRcIixcclxuICAgIG91dERpcjogXCJkaXN0XCIsXHJcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogMjAwMCxcclxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiB0cnVlLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIHZ1ZTogWyd2dWUnLCAncGluaWEnLCAndnVlLXJvdXRlciddLFxyXG4gICAgICAgICAgJ2VsZW1lbnQtcGx1cyc6IFsnZWxlbWVudC1wbHVzJywgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiXSxcclxuICAgICAgICAgIHhsc3g6IFsneGxzeCddLFxyXG4gICAgICAgICAgJ2ZpbGUtc2F2ZXInOiBbJ2ZpbGUtc2F2ZXInXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8gU3RhdGljIHJlc291cmNlIGNsYXNzaWZpY2F0aW9uIGFuZCBwYWNrYWdpbmdcclxuICAgICAgICBjaHVua0ZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6IFwiYXNzZXRzL1tleHRdL1tuYW1lXS1baGFzaF0uW2V4dF1cIixcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLnhsc3hcIl0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJywnZWxlbWVudC1wbHVzJywgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiXVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVYsU0FBUyxvQkFBb0I7QUFDOVcsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLHFCQUFxQjtBQUM1QixTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLGtCQUFrQjtBQUUzQixTQUFTLGVBQWU7QUFQeEIsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQy9CLFlBQVk7QUFBQSxJQUNkO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsbUJBQW1CO0FBQUEsSUFDbkIsc0JBQXNCO0FBQUEsSUFDdEIsdUJBQXVCO0FBQUEsSUFDdkIsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osS0FBSyxDQUFDLE9BQU8sU0FBUyxZQUFZO0FBQUEsVUFDbEMsZ0JBQWdCLENBQUMsZ0JBQWdCLHlCQUF5QjtBQUFBLFVBQzFELE1BQU0sQ0FBQyxNQUFNO0FBQUEsVUFDYixjQUFjLENBQUMsWUFBWTtBQUFBLFFBQzdCO0FBQUE7QUFBQSxRQUVBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGVBQWUsQ0FBQyxXQUFXO0FBQUEsRUFDM0IsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLE9BQU8sY0FBYyxTQUFRLGdCQUFnQix5QkFBeUI7QUFBQSxFQUNsRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
