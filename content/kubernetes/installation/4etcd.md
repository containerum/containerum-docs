---
title: Kubernetes ETCD Installation - Containerum
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

#### Download and Install the etcd binaries


Download the official etcd binaries from the [coreos/etcd](https://github.com/coreos/etcd) project:

```bash
wget "https://github.com/coreos/etcd/releases/download/v3.3.5/etcd-v3.3.5-linux-amd64.tar.gz"
```

Extract and install the `etcd` server and the `etcdctl` command line utility:

```bash
{
  tar -xvf etcd-v3.3.5-linux-amd64.tar.gz
  sudo mv etcd-v3.3.5-linux-amd64/etcd* /usr/local/bin/
}
```

#### Configure the etcd server
Run:

```bash
{
  sudo mkdir -p /etc/etcd /var/lib/etcd
  sudo cp ca.pem kubernetes-key.pem kubernetes.pem /etc/etcd/
}
```

The node internal IP address will be used to receive client requests and communicate with other cluster members. The internal IP address for each node must be unique and should be stored in `INTERNAL_IP` variable.

Each etcd node must have a unique name within the cluster. Set the etcd node name to match the current node host name.

```bash
ETCD_NAME=$(hostname -s)
```

Create the `etcd.service` systemd unit file:

```bash
cat <<EOF | sudo tee /etc/systemd/system/etcd.service
[Unit]
Description=etcd
Documentation=https://github.com/coreos

[Service]
ExecStart=/usr/local/bin/etcd \\
  --name ${ETCD_NAME} \\
  --cert-file=/etc/etcd/kubernetes.pem \\
  --key-file=/etc/etcd/kubernetes-key.pem \\
  --peer-cert-file=/etc/etcd/kubernetes.pem \\
  --peer-key-file=/etc/etcd/kubernetes-key.pem \\
  --trusted-ca-file=/etc/etcd/ca.pem \\
  --peer-trusted-ca-file=/etc/etcd/ca.pem \\
  --peer-client-cert-auth \\
  --client-cert-auth \\
  --initial-advertise-peer-urls https://${INTERNAL_IP}:2380 \\
  --listen-peer-urls https://${INTERNAL_IP}:2380 \\
  --listen-client-urls https://${INTERNAL_IP}:2379,https://127.0.0.1:2379 \\
  --advertise-client-urls https://${INTERNAL_IP}:2379 \\
  --initial-cluster-token etcd-cluster-0 \\
  --initial-cluster controller-0=https://${WORKER_IP_1}:2380,controller-1=https://${WORKER_IP_2}:2380,controller-2=https://${WORKER_IP_3}:2380 \\
  --initial-cluster-state new \\
  --data-dir=/var/lib/etcd
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF
```

#### Launch the etcd server
Run:

```bash
{
  sudo systemctl daemon-reload
  sudo systemctl enable etcd
  sudo systemctl start etcd
}
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
