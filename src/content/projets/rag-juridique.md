---
titre: "Assistant RAG juridique"
accroche: "Retrouver les réponses déjà traitées et les textes juridiques qui les justifient"
badge: "Réalisé · CDC"
technos: ["BGE-M3", "FAISS", "Mistral Large", "LangChain", "Python", "PyMuPDF", "OCR"]
ordre: 3
animation: "rag"
couleur: "bleu"
resume:
  - label: "Contexte"
    valeur: "E-mails historiques et textes réglementaires"
  - label: "Ma contribution"
    valeur: "Préparation des données et pipeline jusqu'à la récupération des passages"
  - label: "Technos"
    valeur: "BGE-M3, FAISS, Mistral Large"
schema:
  - "question"
  - "embedding"
  - groupe: "2 index FAISS"
    branches: ["e-mails", "textes juridiques"]
  - "meilleurs passages"
  - "Mistral Large"
  - "réponse avec sources"
  - "validation du juriste"
---

## Contexte

Des juristes reçoivent des questions qui demandent de consulter deux types de sources : des réponses déjà traitées, dans des e-mails historiques classés par fonds, thème et sous-thème, et des textes réglementaires, dans des PDF. Chercher manuellement dans les deux prend du temps.

## Objectif

Un assistant qui retrouve les passages utiles dans les deux sources et propose une réponse appuyée sur eux. Le juriste garde la validation finale, et l'assistant doit signaler quand les sources ne suffisent pas plutôt qu'inventer.

## Ma contribution

Surtout la préparation des données et le pipeline jusqu'à la récupération des passages.

1. Extraction du texte des PDF, avec OCR quand le document est scanné.
2. Nettoyage des documents et des e-mails.
3. Découpage en segments (chunks) avec chevauchement, pour ne pas couper une information en deux.
4. Calcul des embeddings avec BGE-M3.
5. Deux index FAISS séparés : un pour les e-mails, un pour les textes juridiques.
6. À chaque question, recherche dans les deux index, puis envoi des meilleurs passages et de la question à Mistral Large, avec un prompt qui impose de s'appuyer sur ce contexte.

**Schéma :** question → embedding → 2 index FAISS en parallèle (e-mails, textes juridiques) → meilleurs passages → Mistral Large → réponse avec sources → validation du juriste.

## Pourquoi deux index ?

Les e-mails apportent le raisonnement déjà appliqué à des cas réels, les textes juridiques apportent la justification. Les séparer permet de savoir d'où vient chaque passage.

## Limites identifiées

Qualité de l'OCR, taille des chunks, passages proches par le sens mais pas applicables juridiquement, risque d'hallucination, textes à tenir à jour.
