import path from "path";
import { readdirSync } from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

const absolutePathAliases: Record<string, string> = {};

const srcPath = path.resolve("src");

const srcRootContent = readdirSync(srcPath, { withFileTypes: true }).map((directory) =>
  directory.name.replace(/(\.js){1}(x?)/, ""),
);

srcRootContent.forEach((directory) => {
  absolutePathAliases[directory] = path.join(srcPath, directory);
});

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      ...absolutePathAliases,
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
