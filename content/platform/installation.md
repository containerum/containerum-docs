---
title: Installation - Containerum
linktitle: Containerum Installation
description:

categories: []
keywords: []

menu:
  docs:
    parent: "platform"
    weight: 2

draft: false
---


# Containerum installation

To install Containerum in your Kubernetes Cluster in demo mode run:

```
helm repo add containerum https://charts.containerum.io
helm repo update
helm install containerum/containerum
```

To run a production-ready Containerum platform, [install](/platform/components) each Containerum component in manual mode.
