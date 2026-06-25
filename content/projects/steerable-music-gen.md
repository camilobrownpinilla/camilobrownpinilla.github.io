---
title: "From Linear Directions to Musical Expressions: Evaluating Model Steering in Music Generation"
category: research
tags: [Interpretability, Model Steering]
date: 2025-08-01
link: /papers/steerable-music-gen.pdf
role: lead
featured: true
featuredImage: /images/projects/alejandros-angel.png
---

We conduct a large-scale evaluation of model steering methods for music generation, adapting techniques from NLP (DiffMean, PCA, SFT, ReFT-r1, Probing) and introducing Direct Policy Optimization (DPO) and Concept Distillation as novel approaches. Evaluated on MusicGen-medium across musical concepts like genre, tempo, and timbre, we find that method performance depends heavily on the steering concept and that concept distillation achieves the best steering strength while balancing generation quality.

## Highlights

- Adapted and benchmarked 10 activation-steering techniques across 8 musical concepts on MusicGen-medium, measuring both controllability (CLAP) and generation quality (FAD).
- Introduced Direct Policy Optimization (DPO) and Concept Distillation as novel steering methods; concept distillation achieves the best strength/quality trade-off.
- Built a training and evaluation pipeline supporting 100+ steered model variants.
