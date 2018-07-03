---
title: Calico Installation
linktitle: Calico
description: Installing Calico for network security in the cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 10

draft: false
---

# Install Calico
Calico is a plugin for Kubernetes network security.

### Installing with the etcd datastore

If your cluster has RBAC enabled, execute the following command to configure the roles and bindings that Calico requires.

```bash
kubectl apply -f https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/rbac.yaml
```

**Note**: You can also view the manifest in your browser.

Download the Calico networking manifest for etcd.

```bash
curl https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/hosted/calico.yaml -O
```

In the ConfigMap named calico-config, set the value of etcd_endpoints to the IP address and port of your etcd server.

**Tip**: You can specify more than one using commas as delimiters.

Prepare <a href="/files/calico.yaml" target="_blank">`calico.yaml`</a> file:

- Replace ${ETCD_NODE1_IP}, ${ETCD_NODE2_IP}, ${ETCD_NODE3_IP} to your real etcd node ips.
- Execute the command below to get kubernetes key:

```bash
KEY=$(cat /var/lib/kubernetes/kubernetes-key.pem | base64 -w 0 )
CERT=$(cat /var/lib/kubernetes/kubernetes.pem | base64 -w 0 )
CA=$(cat /var/lib/kubernetes/ca.pem | base64 -w 0 )
```

- Replace `null` value in `etcd-key` variable to `${KEY}`, in `etcd-cert` to `${CERT}`, `etcd-ca` to `${CA}` in `calico.yaml`

Apply the manifest using the following command.

```bash
kubectl apply -f calico.yaml
```

Done!

Now you can proceed to [configuring DNS](/kubernetes/installation/9dns).
