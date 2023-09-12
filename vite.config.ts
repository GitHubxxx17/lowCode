import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import viteImagemin from "vite-plugin-imagemin";
import compression from "vite-plugin-compression";
// import {autoComplete,Plugin as importToCDN} from 'vite-plugin-cdn-import'
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
        interlaced: false, // 不启用交错扫描
      },
      optipng: {
        optimizationLevel: 7, // 设置PNG图片的优化等级为7
      },
      mozjpeg: {
        quality: 20, // 设置JPEG图片的质量为20
      },
      pngquant: {
        quality: [0.8, 0.9], // 设置PNG图片的质量范围为0.8到0.9之间
        speed: 4, // 设置PNG图片的优化速度为4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox", // 启用移除SVG视图框的插件
          },
          {
            name: "removeEmptyAttrs",
            active: false, // 不启用移除空属性的插件
          },
        ],
      },
    }),
    compression({
      algorithm: "gzip", // 指定压缩算法为gzip,[ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      // ext: ".gz", // 指定压缩后的文件扩展名为.gz
      threshold: 1024, // 仅对文件大小大于threshold的文件进行压缩，默认为10KB
      deleteOriginFile: false, // 是否删除原始文件，默认为false
      compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用插件
    }),
    // 第三方库CDN引入
    // importToCDN({
    //   prodUrl: "https://unpkg.com/{name}@{path}",
    //   modules: [
    //     autoComplete('axios'),
    //     {
    //       name: "vue-router",
    //       var: "VueRouter",
    //       path: "4.2.2",
    //     },
    //     {
    //       name: "element-plus",
    //       var: "ElementPlus",
    //       path: "2.3.6",
    //       css: "2.3.6/dist/index.css",
    //     },
    //     {
    //       name: "@element-plus/icons-vue",
    //       var: "ElementPlusIconsVue", // 根据main.js中定义的来
    //       path: "2.1.0",
    //     },
    //     {
    //       name: "pinia",
    //       var: "Pinia",
    //       path: "2.1.3",
    //     },
    //   ],
    // }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
  build: {
    // 文件超过500Kb解决办法
    chunkSizeWarningLimit: 1024 * 50,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 通过拆分包的方式将所有来自node_modules的模块打包到单独的chunk中
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        // 设置chunk的文件名格式
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split("/")
            : [];
          const fileName1 =
            facadeModuleId[facadeModuleId.length - 2] || "[name]";
          // 根据chunk的facadeModuleId（入口模块的相对路径）生成chunk的文件名
          return `js/${fileName1}/[name].[hash].js`;
        },
        // 设置入口文件的文件名格式
        entryFileNames: "js/[name].[hash].js",
        // 设置静态资源文件的文件名格式
        assetFileNames: "[ext]/[name].[hash:4].[ext]",
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
