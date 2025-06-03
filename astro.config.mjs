import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
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
  site: "https://your-domain.com",
  compressHTML: true,
});
