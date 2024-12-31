// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react()],

  adapter: node({
    mode: 'standalone'
  })
});