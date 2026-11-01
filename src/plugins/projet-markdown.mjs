// Plugin Markdown des pages projets : remplace la ligne « **Schéma :** … » par le schéma
// d'architecture, et « **Graphique :** … » par le graphique en barres, à partir du front-matter.
// Le HTML est généré au build : il s'affiche même sans JavaScript.

import { defineMdastPlugin } from 'satteri';

const echapper = (texte) =>
  String(texte).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ %/g, '\u00a0%');

const fleche =
  '<span class="schema-fleche" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>';

function schemaHtml(etapes) {
  const items = etapes.map((etape, i) => {
    const contenu = typeof etape === 'string'
      ? `<span class="schema-boite">${echapper(etape)}</span>`
      : `<div class="schema-groupe"><span class="schema-groupe-titre">${echapper(etape.groupe)}</span>`
        + `<ul class="schema-branches">${etape.branches.map((b) => `<li class="schema-boite">${echapper(b)}</li>`).join('')}</ul></div>`;
    return `<li class="schema-etape" data-step>${i > 0 ? fleche : ''}${contenu}</li>`;
  });
  return `<figure class="schema" data-schema><figcaption class="schema-label">Architecture</figcaption>`
    + `<ol class="schema-flux">${items.join('')}</ol></figure>`;
}

function graphiqueHtml({ barres, legende }) {
  const lignes = barres.map((b) => {
    const valeur = b.final ? `${b.valeur}\u00a0% → ${b.final}\u00a0%` : `${b.valeur}\u00a0%`;
    const mention = b.mention ? ` <span class="barre-mention">${echapper(b.mention)}</span>` : '';
    const extension = b.final
      ? `<span class="barre-extension" style="--debut:${b.valeur}%;--fin:${b.final}%"></span>`
      : '';
    return `<li class="barre${b.mention ? ' barre-retenue' : ''}">`
      + `<span class="barre-tete"><span class="barre-label">${echapper(b.label)}${mention}</span><span class="barre-valeur">${valeur}</span></span>`
      + `<span class="barre-piste" aria-hidden="true"><span class="barre-rempli" style="--v:${b.valeur}%"></span>${extension}</span>`
      + `</li>`;
  });
  return `<figure class="graphique" data-graphique><ul class="graphique-barres">${lignes.join('')}</ul>`
    + (legende ? `<figcaption class="graphique-legende">${echapper(legende)}</figcaption>` : '')
    + `</figure>`;
}

export const projetPlugin = defineMdastPlugin({
  name: 'projet-schema-graphique',
  paragraph(noeud, ctx) {
    const frontmatter = ctx.data.astro?.frontmatter ?? {};
    const texte = ctx.textContent(noeud).trim();
    if (texte.startsWith('Schéma :') && frontmatter.schema) {
      ctx.replaceNode(noeud, { type: 'html', value: schemaHtml(frontmatter.schema) });
    } else if (texte.startsWith('Graphique :') && frontmatter.comparaison) {
      ctx.replaceNode(noeud, { type: 'html', value: graphiqueHtml(frontmatter.comparaison) });
    }
  },
});
