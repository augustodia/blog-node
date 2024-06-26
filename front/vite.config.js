import {resolve} from 'path';
import {defineConfig, normalizePath} from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
       '@': normalizePath(resolve(__dirname, './src'))
     }
    },
  plugins: [vue()],
})
