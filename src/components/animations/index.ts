// Animation SVG de chaque projet, choisie par le champ `animation` du front-matter.
import Tri from './Tri.astro';
import AppelsOffres from './AppelsOffres.astro';
import Rag from './Rag.astro';
import Ocr from './Ocr.astro';
import Graphe from './Graphe.astro';
import JobHunter from './JobHunter.astro';

export const animations = {
  tri: Tri,
  'appels-offres': AppelsOffres,
  rag: Rag,
  ocr: Ocr,
  graphe: Graphe,
  jobhunter: JobHunter,
};
