import { defineConfig } from 'vite';
import { liveReload } from "vite-plugin-live-reload";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  output: {
    path: __dirname + "/dist",
  },
  build: {
    emptyOutDir: true,
  },
  plugins: [liveReload(), react()],
})
