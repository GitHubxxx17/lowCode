import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from 'vite-plugin-imagemin';
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueJsx(),
    visualizer({
      open: true, //在默认用户代理中打开生成的文件
      gzipSize: true, // 分析图生成的文件名
      brotliSize: true, // 收集 brotli 大小并将其显示
      filename: "stats.html", // 分析图生成的文件名
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7, // 设置GIF图片的优化等级为7
        interlaced: false // 不启用交错扫描
      },
      optipng: {
        optimizationLevel: 7 // 设置PNG图片的优化等级为7
      },
      mozjpeg: {
        quality: 20 // 设置JPEG图片的质量为20
      },
      pngquant: {
        quality: [0.8, 0.9], // 设置PNG图片的质量范围为0.8到0.9之间
        speed: 4 // 设置PNG图片的优化速度为4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox' // 启用移除SVG视图框的插件
          },
          {
            name: 'removeEmptyAttrs',
            active: false // 不启用移除空属性的插件
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
    minify: "terser", // 启用 terser 压缩
    terserOptions: {
      compress: {
        pure_funcs: ["console.log"], // 只删除 console.log
        drop_debugger: true, // 删除 debugger
      },
    },
  },
});
