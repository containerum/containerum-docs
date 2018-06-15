---
title: Mail - Containerum
linktitle: Mail
description: Mail is a mail server and newsletter template manager.

categories: []
keywords: []

menu:
  docs:
    parent: "commands"
    weight: 8
    identifier: platform-mail


draft: false
---

# Mail

Mail is a mail server and template manager for Containerum.

### Features

- Direct mailing and newsletters
- Instant or scheduled mailing
- Storing templates
- Template management (creating, upgrading and deleting)

### Prerequisites

- Kubernetes

### Installation

Using Helm:

```
  helm repo add containerum https://charts.containerum.io
  helm repo update
  helm install containerum/mail
  ```
