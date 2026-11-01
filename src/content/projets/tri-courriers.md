---
titre: "Tri automatique des courriers"
accroche: "Près de 9 courriers sur 10 orientés automatiquement vers le bon service"
badge: "Réalisé · CDC"
technos: ["Python", "Pandas", "Scikit-learn", "spaCy", "NLTK", "TF-IDF", "Stacking", "imbalanced-learn", "Dataiku"]
ordre: 1
animation: "tri"
couleur: "bleu"
resume:
  - label: "Contexte"
    valeur: "Près de 148 000 courriers par an"
  - label: "Données"
    valeur: "4 442 courriers, plus de 35 catégories"
  - label: "Technos"
    valeur: "TF-IDF, Stacking, Dataiku"
  - label: "Résultat"
    valeur: "87 % d'accuracy"
schema:
  - "courrier scanné"
  - "OCR"
  - "nettoyage NLP"
  - "TF-IDF"
  - groupe: "3 modèles"
    branches: ["Gradient Boosting", "Naive Bayes", "SVC"]
  - "régression logistique"
  - "catégorie"
  - "bon service"
comparaison:
  barres:
    - label: "FastText"
      valeur: 73
    - label: "TF-IDF par sous-caractères"
      valeur: 83
    - label: "TF-IDF + Stacking"
      valeur: 82
      final: 87
      mention: "modèle retenu"
  legende: "Comparaison réalisée pendant le mémoire ; 87 % : résultat final en fin d'alternance."
---

## Contexte

La Direction des politiques sociales reçoit près de 148 000 courriers numérisés par an. Chacun devait être lu par un gestionnaire pour identifier la demande et l'orienter vers le bon service.

## Objectif

Prédire automatiquement la catégorie d'un courrier (type d'usager, motif, sous-motif) dès sa réception.

## Ma démarche

1. Données : fusion de deux sources (236 000 courriers), retrait des manuscrits mal lus par l'OCR, rééquilibrage des catégories. Jeu final : 4 442 courriers sur plus de 35 catégories.
2. Nettoyage NLP : recollage des mots coupés par l'OCR (regex), stopwords enrichis (prénoms, communes, formules de politesse), lemmatisation avec spaCy.
3. Vectorisation TF-IDF (unigrammes et bigrammes, 7 000 termes).
4. Stacking : Gradient Boosting, Naive Bayes et SVC, combinés par une régression logistique. Hyperparamètres optimisés par RandomizedSearchCV sur le F1-score.
5. Livraison du modèle en production, puis migration du pipeline sur Dataiku.

**Schéma :** courrier scanné → OCR → nettoyage NLP → TF-IDF → 3 modèles (Gradient Boosting, Naive Bayes, SVC) → régression logistique → catégorie → bon service.

## Résultats

82 % d'accuracy sur 917 courriers de test lors de l'ajout de 7 motifs, puis 87 % après de nouvelles itérations d'évaluation et d'amélioration. F1 jusqu'à 0,99 sur les catégories au vocabulaire précis.

## Comparaison des approches

**Graphique :** FastText 73 %, TF-IDF par sous-caractères 83 %, TF-IDF + Stacking 82 % puis 87 %.
