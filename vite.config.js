import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [svelte()],

  build: {
    outDir: "static/dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        svelte: path.resolve(__dirname, "assets/js/svelte/main.js"),
        search: path.resolve(__dirname, "assets/js/search.js"),
      },
      output: {
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "css/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
    manifest: true,
  },
});
