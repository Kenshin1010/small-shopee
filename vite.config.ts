import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginSass from "vite-plugin-sass-glob-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginSass()],
  esbuild: {
    target: ["chrome89", "edge89", "firefox89", "safari15"],
  },
});
