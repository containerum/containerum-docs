---
title: Resource - Containerum
linktitle: Resource
description: Resource is a service that manages Kubernetes namespace objects (deployments, ingresses, etc.) in Containerum.

categories: []
keywords: []

menu:
  docs:
    parent: "components"
    weight: 4
    identifier: platform-resource


draft: false
---

# Resource

Resource is a service that manages Kubernetes namespace objects (deployments, ingresses, etc.) in Containerum.

### Prerequisites

- Kubernetes

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/resource
```
