import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

let outputDirectory;

const netlify404Page = {
  name: "netlify-static-404-page",
  configResolved(config) {
    outputDirectory = resolve(config.root, config.build.outDir);
  },
  async closeBundle() {
    if (!outputDirectory) {
      this.error("Could not resolve the Vite output directory.");
    }

    await copyFile(
      resolve(outputDirectory, "index.html"),
      resolve(outputDirectory, "404.html")
    );
  },
};

export default defineConfig({
  plugins: [react(), netlify404Page],
});
