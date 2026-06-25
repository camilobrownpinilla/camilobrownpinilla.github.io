---
id: thesis-2026-amr-translation
title: "Structural Machine Translation with Meaning Graphs"
authors: [Camilo Brown-Pinilla, Melanie Weber]
venue: "Senior Thesis"
venueType: thesis
year: 2026
isFirstAuthor: true
links:
  paper: "https://dash.harvard.edu/entities/publication/cf958351-022d-4f5a-82cb-a50d647278ae"
---

Geometric Deep Learning (GDL) unifies diverse machine learning architectures under the principle of symmetry. By designing models to respect the invariances inherent in data, GDL achieves improved sample efficiency and robustness without relying on scale alone. Modern Natural Language Processing (NLP), by contrast, treats text as an unstructured sequence of tokens, relying on massive scale to implicitly discover linguistic regularities. In this thesis, we bridge these two paradigms by observing that meaning is an invariant of cross-lingual translation and that this invariance can be formalized and exploited in the GDL sense. Concretely, we use Abstract Meaning Representations (AMRs) as a language-independent canonical form to which sentences in any language are mapped, and embed these graphs into a space whose geometry reflects semantic structure. Because the canonical form abstracts away from surface-level linguistic variation, the resulting embeddings are translation-invariant by construction. We then inject these embeddings into pre-trained LLMs via Soft Prompt Tuning, conditioning translation on a geometric semantic signal using only four learned prefix tokens. Evaluated on translation across English paired with German, Spanish, Italian, and Chinese using the COMET metric, our augmented systems achieve scores matching or exceeding conventional LoRA fine-tuning while requiring roughly one-eighth the learnable parameters. These results suggest that explicitly encoding symmetry as an inductive bias offers a principled, parameter-efficient complement to the dominant paradigm of scale.
