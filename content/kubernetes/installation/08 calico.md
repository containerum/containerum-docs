---
title: Kubernetes Calico - Containerum
linktitle: Installation
description: Calico Installation

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 10

draft: false
---

# Calico installation

Installing with the etcd datastore

1. If your cluster has RBAC enabled, issue the following command to configure the roles and bindings that Calico requires.

```bash
kubectl apply -f https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/rbac.yaml
```

**Note**: You can also view the manifest in your browser.

2. Download the Calico networking manifest for etcd.

```bash
curl https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/hosted/calico.yaml -O
```

3. In the ConfigMap named calico-config, set the value of etcd_endpoints to the IP address and port of your etcd server.

**Tip**: You can specify more than one using commas as delimiters.

4. Prepare `calico.yaml` file:

- Replace ${ETCD_NODE1_IP}, ${ETCD_NODE2_IP}, ${ETCD_NODE3_IP} to your real etcd node ips.
- Execute the command below to get kubernetes key:

```bash
KEY=$(cat /var/lib/kubernetes/kubernetes-key.pem | base64 -w 0 )
CERT=$(cat /var/lib/kubernetes/kubernetes.pem | base64 -w 0 )
CA=$(cat /var/lib/kubernetes/ca.pem | base64 -w 0 )
```

- Replace `null` value in `etcd-key` variable to `${KEY}`, in `etcd-cert` to `${CERT}`, `etcd-ca` to `${CA}` in `calico.yaml`

5. Apply the manifest using the following command.

```bash
kubectl apply -f calico.yaml
```

