---
title: Permissions - Containerum
linktitle: Permissions
description: Permissions is a service for Containerum that manages user access and enables teamwork.

categories: []
keywords: []

menu:
  docs:
    parent: "commands"
    weight: 5
    identifier: platform-permissions


draft: false
---

# Permissions

Permissions is a service for Containerum that manages user access and enables teamwork.

### Prerequisites

- Kubernetes

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/permissions
  ```
