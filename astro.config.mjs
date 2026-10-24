import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://athandapp.com",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
