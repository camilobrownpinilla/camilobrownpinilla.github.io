---
title: "HUBERT: Hyperbolic Transformer Encoder"
category: research
tags: [Hyperbolic Geometry, Transformers, Pretraining]
date: 2025-05-01
link: "https://github.com/camilobrownpinilla/hubert"
extraLinks:
  - label: Paper
    url: /papers/hubert.pdf
role: independent
featured: true
featuredImage: /images/projects/hyperbolic-bert.png
---

Built the first fully hyperbolic transformer-based BERT-style encoder (Lorentz model, 105M params). Used as the backbone for HUBERTFILTER, a pre-training data filtering algorithm that extends CoLoR-Filter by decoupling auxiliary scoring models from the target.

## Highlights

- Selected 3B pre-training tokens with HUBERTFILTER for a 150M OLMo target, outperforming the matched roBERTa-based Euclidean filter on both PALOMA perplexity and average downstream accuracy.
