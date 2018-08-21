---
title: Containerum requirements
linktitle: Rеquirements
description: Applications and components necessary for Containerum installation.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 2

draft: false
---

# Containerum requirements

Before installing Containerum make sure you have the following components:

- [Docker](/kubernetes/prerequisites)  
Note: if you have installed Kubernetes using [Containerum Kubernetes Package](/kubernetes), there's no need to install Docker.
- [Kubernetes](/kubernetes/) 1.5 or higher  
Note: You can also use [Let's Kube](https://github.com/containerum/letskube) utility to install the latest versions of Docker and Kubernetes on your VMs.  
- Helm
- Installed Kubernetes [Ingress Controller](https://github.com/containerum/containerum/blob/master/ingress.md)


Note: In case you use only one node, make sure Kubernetes is able to schedule pods on the master:

```
kubectl taint nodes --all node-role.kubernetes.io/master-
```
