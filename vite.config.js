// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/3e8-editor.ts'),
      name: '3e8-editor',
      fileName: '3e8-editor',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})