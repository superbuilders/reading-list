import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    // Three.js and the procedural cover painters intentionally ship together.
    chunkSizeWarningLimit: 600,
  },
});
