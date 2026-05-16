import { fileURLToPath, URL } from 'node:url'
import visualizer from 'rollup-plugin-visualizer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true, // 打包完成后自动打开浏览器展示页面
      gzipSize: true, // 显示 gzip 压缩后的大小
      brotliSize: true, // 显示 brotli 压缩后的大小
      filename: 'stats.html' // 生成的分析文件名称
    }),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  esbuild: {
    drop: ['console'],
    minify: true,
  },
  base: '/shopvue3/',
  build: {
    rollupOptions: {
      output: {
        experimentalMinChunkSize: 20 * 1024, // 合并小文件
        // 只拆分【全量引入、不更新】的核心库
        manualChunks(id) {
          // 必拆：框架核心
          if (id.includes('pinia')) return 'pinia'
          if (id.includes('vue-router')) return 'vue-router'
          // 必拆：通用工具库
          if (id.includes('axios')) return 'axios'
          if (id.includes('dayjs')) return 'dayjs'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
