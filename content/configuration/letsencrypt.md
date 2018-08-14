---
title: Add Let's Encrypt certificates
linktitle: Add Let's Encrypt
description: Adding Let's Encrypt for automated certificate issuance.

categories: []
keywords: []

menu:
  docs:
    parent: "configuration"
    weight: 5
    identifier: letsencrypt

draft: false
---


# Adding Let's Ecnrypt

Containerum Platform allows issuing Let's Encrypt certificates for domains automatically.
To allow this feature, install Let's Encrypt with Helm:

```
helm install stable/cert-manager
```

Create a ClusterIssue:

```
apiVersion: certmanager.k8s.io/v1alpha1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: YOUR-EMAIL
    http01: {}
    privateKeySecretRef:
      key: ""
      name: letsencrypt-prod
    server: https://acme-v01.api.letsencrypt.org/directory
```
Note: change YOUR-EMAIL to your email. Let's Encrypt will use this address to send notifications.

Then run:
```
kubectl create -f clusterissuer.yaml
```

Read more about Let's Encrypt rules and rate limits [here](https://letsencrypt.org/docs/rate-limits/).
