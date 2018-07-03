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
Run each command from this section on each controller. Login to each controller via ssh.

## How to Install etcd
Standard CentOS 7 repositories contain etcd v. 3.2.18.

Run:
```
$ sudo yum install etcd
```

#### Configure the etcd server
Run:

```bash
sudo mkdir -p /etc/etcd /var/lib/etcd
sudo cp ca.pem kubernetes-key.pem kubernetes.pem /etc/etcd/
```

The node internal IP address will be used to receive client requests and communicate with other cluster members. The internal IP address for each node must be unique and should be stored in `INTERNAL_IP` variable.

Each etcd node must have a unique name within the cluster. Set the etcd node name to match the current node host name.

```bash
ETCD_NAME=$(hostname -s)
```

#### Single node etcd server config file

Edit config file `/etc/etcd/etcd.conf`:

```
ETCD_LISTEN_CLIENT_URLS="https://127.0.0.1:2379,https://${INTERNAL_IP}:2379"
ETCD_NAME=${ETCD_NAME}
ETCD_ADVERTISE_CLIENT_URLS="https://${INTERNAL_IP}:2379"
ETCD_INITIAL_CLUSTER_TOKEN="etcd-cluster-1"
ETCD_INITIAL_CLUSTER_STATE="new"
ETCD_CERT_FILE="/etc/etcd/kubernetes.pem"
ETCD_KEY_FILE="/etc/etcd/kubernetes-key.pem"
ETCD_CLIENT_CERT_AUTH="true"
ETCD_TRUSTED_CA_FILE="/etc/etcd/ca.pem"
```

#### etcd cluster config file

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

#### Launch the etcd server
Run:

```bash
sudo systemctl daemon-reload
sudo systemctl enable etcd
sudo systemctl start etcd
```

> Don't forget to run all the commands on each controller: `controller-0`, `controller-1`, and `controller-2`.

### Verification

List the etcd cluster member:

```bash
sudo ETCDCTL_API=3 etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/etcd/ca.pem \
  --cert=/etc/etcd/kubernetes.pem \
  --key=/etc/etcd/kubernetes-key.pem
```

> Output:

```
3a57933972cb5131, started, controller-2, https://10.240.0.12:2380, https://10.240.0.12:2379
f98dc20bce6225a0, started, controller-0, https://10.240.0.10:2380, https://10.240.0.10:2379
ffed16798470cab5, started, controller-1, https://10.240.0.11:2380, https://10.240.0.11:2379
```

Done!

Now you can proceed to [bootstrapping Kubernetes controllers](/kubernetes/installation/5bootstrap-controllers).
