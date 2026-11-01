// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { projetPlugin } from './src/plugins/projet-markdown.mjs';

// GitHub Pages : le dépôt DST-NDIAYE.github.io est servi à la racine, donc pas de `base`.
export default defineConfig({
  site: 'https://dst-ndiaye.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  markdown: {
    // Schémas et graphique des pages projets (voir src/plugins/projet-markdown.mjs)
    processor: satteri({ mdastPlugins: [projetPlugin] }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
