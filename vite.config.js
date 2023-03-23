// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from "vite-plugin-dts"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/Editor.ts'),
      name: 'Editor',
      fileName: 'Editor',
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
})