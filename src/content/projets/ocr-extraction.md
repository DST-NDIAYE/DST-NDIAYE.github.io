---
titre: "OCR et extraction de données"
accroche: "Des formulaires scannés à l'envers, redressés et lus"
badge: "Réalisé · CDC"
technos: ["Python", "PyMuPDF", "Tesseract", "EasyOCR", "regex", "Dataiku"]
ordre: 4
animation: "ocr"
couleur: "bleu"
resume:
  - label: "Contexte"
    valeur: "Formulaires scannés de travers ou à l'envers"
  - label: "Extraction"
    valeur: "Nom, e-mail, SIRET"
  - label: "Technos"
    valeur: "Tesseract, EasyOCR, PyMuPDF"
schema:
  - "document"
  - "4 orientations testées"
  - "page redressée"
  - groupe: "extraction"
    branches: ["nom", "e-mail", "SIRET"]
---

## Contexte

Des formulaires envoyés par les usagers, souvent scannés de travers ou à l'envers.

## Ma démarche

Classification des documents par mots-clés (regex). Redressement automatique : la page est testée dans les 4 orientations et on garde celle qui donne le plus de mots valides. Puis extraction du nom, de l'e-mail et du numéro SIRET.

**Schéma :** document → 4 orientations testées → page redressée → extraction nom, e-mail, SIRET.
