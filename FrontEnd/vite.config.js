import { liveReload } from "vite-plugin-live-reload";
import { defineConfig } from "vite";

const config = defineConfig({
  output: {
    path: __dirname + "/dist",
  },
  build: {
    emptyOutDir: true,
  },
  plugins: [liveReload()],
});

export default config;
