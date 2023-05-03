import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import wasmPack from 'vite-plugin-wasm-pack'
import { serviceWorkerPlugin } from './plugins/service-worker'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  envDir: '../../',
  envPrefix: 'APP_',
  plugins: [
    wasm(),
    topLevelAwait(),
    wasmPack('../../cryptfns'),
    vue(),
    vueJsx(),
    serviceWorkerPlugin({
      filename: 'sw.ts'
    })
  ],
  optimizeDeps: {
    exclude: ['cryptfns'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '!': path.resolve(__dirname, 'services'),
      types: path.resolve(__dirname, 'types')
    }
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }
  }
  // server: {
  //   hmr: {
  //     host: 'localhost',
  //     port: 5173
  //   }
  // }
})
