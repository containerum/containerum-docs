---
title: UI
linktitle: UI
description: Containerum UI project is Web User Interface for Containerum.

categories: []
keywords: []

menu:
  docs:
    parent: "components"
    weight: 9
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

Congratulations! You've just installed Containerum Platform. To learn more about using Containerum, please see our [Web Panel Guide](/web-panel/) and [CLI Guide](/cli).
