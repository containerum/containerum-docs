---
title: Self-hosted Platform - Containerum
linktitle: Containerum self-hosted
description: The first steps to start using Containerum on-premises.

categories: []
keywords: []

menu:
  docs:
    parent: "getting-started"
    weight: 4

draft: false
---

# Getting started with Containerum self-hosted
Before installing Containerum make sure you have the following components:

[Docker](/kubernetes/prerequisites)
- Kubernetes 1.5 or higher
- Helm
- Installed Kubernetes Ingress Controller

or

- You can use [Let's Kube](https://github.com/containerum/letskube) utility to install the latest versions of Docker and Kubernetes on your VMs.

## How to install

To launch Containerum on your Kubernetes Cluster in demo mode run

```bash
helm repo add containerum https://charts.containerum.io
helm repo update
helm install containerum/containerum
```

To run a production-ready Containerum platform, [install](/platform/components) each Containerum component in manual mode.
