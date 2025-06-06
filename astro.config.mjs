import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    starlight({
      title: "Easy AI Apps",
      social: [
        {
          label: "GitHub",
          href: "https://github.com/yourusername/ai-app-landing",
          icon: "github",
        },
      ],
      sidebar: [
        {
          label: "Introduction",
          autogenerate: { directory: "introduction" },
        },
        {
          label: "Quick Start",
          autogenerate: {
            directory: "quick-start",
          },
        },
      ],
    }),
  ],

  site: "https://easyapp.site",
  compressHTML: true,

  adapter: node({
    mode: "standalone",
  }),
});