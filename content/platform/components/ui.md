---
title: UI - Containerum
linktitle: UI
description: Containerum UI project is Web User Interface for Containerum.

categories: []
keywords: []

menu:
  docs:
    parent: "commands"
    weight: 3
    identifier: platform-ui


draft: false
---

# UI

Containerum UI project is Web User Interface for Containerum.

### Prerequisites

- Kubernetes

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/ui
```
