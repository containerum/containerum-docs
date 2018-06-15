---
title: User Manager - Containerum
linktitle: User manager
description: User manager is a service for managing users, groups, credentials, user and domain blacklists for Containerum.

categories: []
keywords: []

menu:
  docs:
    parent: "components"
    weight: 9
    identifier: platform-user-manager


draft: false
---

# User manager

User manager is a service for managing users, groups, credentials, user and domain blacklists for Containerum.

### Prerequisites

- MongoDB

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/user-manager
```
