---
title: Kubernetes ETCD Installation
linktitle: Etcd
description: Installing and configuring an etcd cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 6

draft: false
---

# Bootstrapping the etcd cluster
Kubernetes stores cluster state information in etcd. This section covers how to launch a 3-node etcd cluster, configure high availability and secure remote access.


### Bootstrapping an etcd Cluster Member
Run each command from this section on each instance, that you would like to use as etcd node. As it described in [prerequirements](../prerequirements.md), you may install etcd to either master node instances or separate instances.

Login to each that instance via ssh.

#### Install the etcd package

Run to install etcd from official repo:
```bash
{{< highlight bash >}}

sudo yum install etcd

{{< / highlight >}}
```

#### Configure the etcd server

Run:
```bash
{{< highlight bash >}}

sudo cp ca.pem kubernetes-key.pem kubernetes.pem /etc/etcd/

{{< / highlight >}}
```

`ETCD_NODE-1_IP`, `ETCD_NODE-2_IP`, `ETCD_NODE-3_IP` are IP addresses of instances in internal network, on which etcd have been installed. It will be used to communicate with other cluster peers and serve client requests.
In case of etcd installation to master nodes `ETCD_NODE-1_IP` is equal to `MASTER-1_INTERNAL_IP` etc.
`INTERNAL_IP` is an IP address of current instance in internal network.

Each etcd node must have a unique name within the cluster. Set the etcd node name to match the current node host name.

```bash
ETCD_NAME=$(hostname -s)
```

Edit etcd config that is on the path `/etc/etcd/etcd.conf`. You should uncomment lines below and replace its value with variables retrieved above:
```
ETCD_LISTEN_PEER_URLS="https://${INTERNAL_IP}:2380"
ETCD_LISTEN_CLIENT_URLS="https://127.0.0.1:2379,https://${INTERNAL_IP}:2379"
ETCD_NAME=${ETCD_NAME}
ETCD_INITIAL_ADVERTISE_PEER_URLS="https://${INTERNAL_IP}:2380"
ETCD_ADVERTISE_CLIENT_URLS="https://${INTERNAL_IP}:2379"
ETCD_INITIAL_CLUSTER="master-1=https://${ETCD_NODE-1_IP}:2380,master-2=https://${ETCD_NODE-2_IP}:2380,master-3=https://${ETCD_NODE-3_IP}:2380"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-1"
ETCD_INITIAL_CLUSTER_STATE="new"
ETCD_CERT_FILE="/etc/etcd/kubernetes.pem"
ETCD_KEY_FILE="/etc/etcd/kubernetes-key.pem"
ETCD_CLIENT_CERT_AUTH="true"
ETCD_TRUSTED_CA_FILE="/etc/etcd/ca.pem"
ETCD_PEER_CERT_FILE="/etc/etcd/kubernetes.pem"
ETCD_PEER_KEY_FILE="/etc/etcd/kubernetes-key.pem"
ETCD_PEER_CLIENT_CERT_AUTH="true"
ETCD_PEER_TRUSTED_CA_FILE="/etc/etcd/ca.pem"
```

> **Note**: In the case of one etcd node `ETCD_LISTEN_PEER_URLS`, `ETCD_INITIAL_ADVERTISE_PEER_URLS`, `ETCD_INITIAL_CLUSTER`, `ETCD_PEER_CERT_FILE`, `ETCD_PEER_KEY_FILE`, `ETCD_PEER_CLIENT_CERT_AUTH`, `ETCD_PEER_TRUSTED_CA_FILE`, `ETCD_PEER_CLIENT_CERT_AUTH` variables are not required to provide.

#### Launch the etcd server

Run:

```bash
{{< highlight bash >}}

sudo systemctl daemon-reload
sudo systemctl enable etcd
sudo systemctl start etcd

{{< / highlight >}}
```

### Verification

List the etcd cluster member:

```bash
{{< highlight bash >}}

sudo ETCDCTL_API=3 etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/etcd/ca.pem \
  --cert=/etc/etcd/kubernetes.pem \
  --key=/etc/etcd/kubernetes-key.pem

{{< / highlight >}}
```

> Output:

```
3471148b2d70b86c, started, master-2, https://172.16.150.2:2380, https://172.16.150.2:2379
b4214d8293e72630, started, master-3, https://172.16.150.3:2380, https://172.16.150.3:2379
f6fc911b19984e4c, started, master-1, https://172.16.150.1:2380, https://172.16.150.1:2379
```

Done!

Now you can proceed to [bootstrapping Kubernetes controllers](/kubernetes/installation/5bootstrap-controllers).
