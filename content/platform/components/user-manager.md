---
title: User Manager
linktitle: User manager
description: User manager is a service for managing users, groups, credentials, user and domain blacklists.

categories: []
keywords: []

menu:
  docs:
    parent: "components"
    weight: 3
    identifier: platform-user-manager


draft: false
---

# User manager

User manager is a service for managing users, groups, credentials, user and blacklists.

### Prerequisites

- MongoDB

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/user-manager
```

Now you can proceed to [installing the resource component](/platform/components/resource).
