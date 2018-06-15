---
title: Auth - Containerum
linktitle: Auth
description: Auth is a OAuth authentication server for Containerum that handles user authorization and token management.

categories: []
keywords: []

menu:
  docs:
    parent: "commands"
    weight: 7
    identifier: platform-auth


draft: false
---

# Auth
Auth is a OAuth authentication server for Containerum that handles user authorization and token management.

### Features

Creates access tokens and refreshes tokens
Runs in In-Memory DB
Makes asynchronous DB snapshots
Checks token by Fingerprint and User Agent
Collects user access levels for existing tokens and user roles
Saves user IP

### Prerequisites

- Kubernetes

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/auth
  ```
