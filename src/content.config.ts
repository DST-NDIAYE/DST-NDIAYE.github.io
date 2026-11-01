import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un fichier Markdown par projet dans src/content/projets/.
// Pour ajouter un projet : créer un nouveau fichier .md avec ce front-matter.
const projets = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projets' }),
  schema: z.object({
    titre: z.string(),
    accroche: z.string(),
    badge: z.string(),
    technos: z.array(z.string()),
    ordre: z.number().int(),
    animation: z.enum(['tri', 'rag', 'appels-offres', 'ocr', 'graphe', 'jobhunter']),
    couleur: z.enum(['bleu', 'vert', 'violet']),
    // Bandeau de résumé en haut de la page projet (3 ou 4 cases)
    resume: z.array(z.object({ label: z.string(), valeur: z.string() })).optional(),
    // Schéma d'architecture, affiché à la place de la ligne « **Schéma :** » du texte.
    // Une étape = un texte, ou un groupe d'étapes parallèles { groupe, branches }.
    schema: z.array(z.union([
      z.string(),
      z.object({ groupe: z.string(), branches: z.array(z.string()) }),
    ])).optional(),
    // Graphique en barres, affiché à la place de la ligne « **Graphique :** » du texte.
    comparaison: z.object({
      barres: z.array(z.object({
        label: z.string(),
        valeur: z.number(),
        final: z.number().optional(),
        mention: z.string().optional(),
      })),
      legende: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { projets };
