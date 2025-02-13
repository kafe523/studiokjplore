// @ts-check
import { defineConfig } from "astro/config";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: "https://kafe523.github.io",
  base: "/studiokjplore",
  integrations: [db()],
});
