---
titre: "Analyse d'appels d'offres par IA"
accroche: "Des dossiers de 160 pages synthétisés critère par critère"
badge: "Réalisé · CDC"
technos: ["Mistral Large", "prompt engineering", "few-shot", "chain of thought"]
ordre: 2
animation: "appels-offres"
couleur: "bleu"
resume:
  - label: "Contexte"
    valeur: "Dossiers jusqu'à 160 pages"
  - label: "Ma démarche"
    valeur: "Prompt structuré et formation des analystes"
  - label: "Techno"
    valeur: "Mistral Large"
  - label: "Résultat"
    valeur: "Gain de temps de lecture important"
---

## Contexte

La direction financière évalue des réponses à des appels d'offres (par exemple sur les obligations vertes) qui atteignent 160 pages, selon une grille de critères, sous-critères et items.

## Ma démarche

Avec Mistral Large, j'ai construit avec les analystes un prompt structuré : rôle, règles strictes (ne rien inventer, aucune note, signaler l'information absente), méthode en 4 étapes, et sortie en tableau comparable entre candidats. J'ai ensuite formé les analystes au prompt engineering (few-shot, chaîne de pensée).

## Résultats

Un gain de temps de lecture important et une grille d'analyse mieux structurée. J'ai aussi documenté les limites : perte de précision en fin de longs documents, omissions, hallucinations.

## Piste d'amélioration proposée

Une approche RAG : chercher d'abord les passages utiles, puis ne résumer que ceux-là.
