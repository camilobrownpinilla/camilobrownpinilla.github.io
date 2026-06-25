---
id: thurj-2025-pruner
title: "Explain This, Pruner! The Effect of Zero-Order Pruning on LLM Explainability and Curvature"
authors: [Camilo Brown-Pinilla, Joseph Bejjani, Daniel Ettel]
venue: "The Harvard Undergraduate Research Journal"
venueType: journal
year: 2025
status: published
isFirstAuthor: true
links:
  paper: "https://doi.org/10.62571/gujf5t1klb25jbcbde"
---

Large Language Models (LLMs) excel in language understanding and generation tasks but have significant memory and computation requirements. In addition, the size and complexity of LLMs pose challenges in XAI, an emerging field in ML concerned with the problem of explaining how a model arrives at its outputs. Model compression techniques such as pruning can be effective in reducing resource requirements and enabling more efficient inference in downstream tasks. However, it is not well understood if and how pruning of LLMs affects their explainability. Our work investigates this open problem. We identify faithfulness of explanations as a necessary metric in determining a model's explainability. We then evaluate the faithfulness of SHapley Additive exPlanations (SHAP) and Integrated Gradients (IG) explanations of variously pruned and non-pruned DistilBERT and RoBERTa models trained on the IMDb and Yelp Polarity datasets for binary sentiment classification. We find that while magnitude-based pruning does not significantly affect explanation faithfulness, random pruning can degrade explainability. Furthermore, our results indicate that explainability is primarily influenced by model architecture. We investigate the underlying geometry of the models to explain our results and find that depending on pruning method and target sparsity, high-curvature regions can emerge, potentially undermining explanation faithfulness.
