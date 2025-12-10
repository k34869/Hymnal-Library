import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";

// https://vite.dev/config/
export default defineConfig({
  // 构建后的资源路径使用相对路径
  base: "./",
  build: {
    rollupOptions: {
      output: {
        // 合并 Chunks
        manualChunks() {
          return "index";
        },
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith("mdui-"),
        },
      },
    }),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
