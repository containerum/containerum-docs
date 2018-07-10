---
title: Intro
linktitle: Intro
description: Description of variables, that will be used in these docs, and description of network configuration

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 2

draft: false
---

# Variables

## IP addresses

- `KUBERNETES_PUBLIC_IP` is an IP address of Kubernetes load balancer in a public network. In the case of one node it have a value of `EXTERNAL_IP` of master node
<!-- - `PUBLIC_IP` is equal to `KUBERNETES_PUBLIC_IP` -->
- `EXTERNAL_IP` is an IP address of instance in external network
- `INTERNAL_IP` is an IP address of instance in internal network
- `MASTER_NODES_IP` is a sequence of all IP addresses of master nodes. In the case of the only node have a value of `EXTERNAL_IP` of master node.
- `ETCD_NODE_IP` is an IP address of etcd node. In the case of multiple etcd node it may be declared as `ETCD_NODE_1_IP`, `ETCD_NODE_2_IP` etc.

- `POD_CIDR` is a range of IP addresses for pods

## Hostnames

- `HOSTNAME` is the hostname of the node.
- `NODE_NAME` is the name of node. Most of all equals to `HOSTNAME`
- `ETCD_NAME` is the hostname of instance, on which etcd have been installed

# Инфо про сетку

Все хосты кластера должны иметь возможность обращаться друг к другу по имени. В нашем случае будет достаточно внести следующие записи в /etc/hosts на каждом сервере:
192.168.0.4 master
192.168.0.5 node-1
192.168.0.6 node-2

И конечно же установить для каждого сервера свой hostname. Для ноды с ролью и именем master:
```bash
hostnamectl set-hostname master
```
Для вычислительных узлов node-1 и node-2 сделайте по аналогии самостоятельно.

Также настраиваем сетевые интерфейсы для публичной и приватной сети:

- публичный eth0:

```
BOOTPROTO=none
DEFROUTE=yes
DEVICE=eth0
GATEWAY=192.168.0.1
IPADDR=192.168.0.2
MTU=1500
NETMASK=255.255.255.0
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
```

- приватный eth1:

```
BOOTPROTO=none
DEVICE=eth1
IPADDR=10.0.10.1
MTU=1500
NETMASK=255.255.255.0
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
```

# Containerum RPM repository

## Repository definition

Put this in /etc/yum.repos.d/exonlab.repo
```
[exonlab-kubernetes110-testing]
name=Exon lab kubernetes testing repo for CentOS
baseurl=http://repo.containerum.io/centos/7/x86_64/
skip_if_unavailable=False
gpgcheck=1
repo_gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-exonlab
enabled=1
enabled_metadata=1

```

## GPG package signing key

```
sudo curl -o /etc/pki/rpm-gpg/RPM-GPG-KEY-exonlab
```

Key fingerprint: `2ED4 CBD2 309F 2C75 1642  CA7B 4E39 9E04 3CDA 4338`
