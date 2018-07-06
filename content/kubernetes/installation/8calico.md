---
title: Calico Installation
linktitle: Calico
description: Installing Calico for network security in the cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 9

draft: false
---

# Install Calico

### Installing with the etcd datastore

If your cluster has RBAC enabled, execute the following command to configure the roles and bindings that Calico requires.

```bash
kubectl apply -f https://docs.projectcalico.org/v3.1/getting-started/kubernetes/installation/rbac.yaml
```

**Note**: You can also view the manifest in your browser.

Download the Calico networking manifest for etcd.

<!-- (TODO): change develop branch to master in link -->

```bash
curl -O https://raw.githubusercontent.com/containerum/containerum-docs/develop/content/files/calico.yaml
```

In the ConfigMap named calico-config, set the value of etcd_endpoints to the IP address and port of your etcd server.

**Tip**: You can specify more than one using commas as delimiters.

Prepare <a href="/files/calico.yaml" target="_blank">`calico.yaml`</a> file:

- Replace ${ETCD_NODE1_IP}, ${ETCD_NODE2_IP}, ${ETCD_NODE3_IP} to your real etcd node ips.
- To change the default IP range used for pods, modify the CALICO_IPV4POOL_CIDR section of the calico.yaml. In our case it is `10.200.0.0/16`
- Change interface in `IP_AUTODETECTION_METHOD` variable to your calico network interface
- Execute the command below to get kubernetes key:

```bash
KEY=$(cat /var/lib/kubernetes/kubernetes.key | base64 -w 0 )
CERT=$(cat /var/lib/kubernetes/kubernetes.crt | base64 -w 0 )
CA=$(cat /var/lib/kubernetes/ca.crt | base64 -w 0 )
```

- Replace `null` value in below variables into `calico.yaml`:
    + `etcd-key` variable to `${KEY}`
    + `etcd-cert` to `${CERT}`
    + `etcd-ca` to `${CA}`

Apply the manifest using the following command.

```bash
kubectl apply -f calico.yaml
```

Done!

Now you can proceed to [configuring DNS](/kubernetes/installation/9dns).
