import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), starlight({
    title: '',
  })],
  site: 'https://your-domain.com',
  compressHTML: true
});