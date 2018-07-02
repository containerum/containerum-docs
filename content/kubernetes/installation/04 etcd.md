---
title: Kubernetes ETCD Installation - Containerum
linktitle: Installation
description: ETCD Installation

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 6

draft: false
---

# Загрузка кластера etcd

Kubernetes components are stateless and store cluster state in [etcd](https://github.com/coreos/etcd). In this lab you will bootstrap a three node etcd cluster and configure it for high availability and secure remote access.

Компоненты Kubernetes не хранят информацию о своем состоянии самостоятельно, а записывают ее в etcd. Сейчас мы запустим кластер etcd из трех нод и настроим его высокую доступность и защищенный удаленный доступ.

## Prerequisites

## Подготовка
<!--

The commands in this lab must be run on each controller instance: `controller-0`, `controller-1`, and `controller-2`. Login to each controller instance using the `gcloud` command. Example:

Команды из этого манула должны быть запущены на каждом контроллере. Зайдите на каждый из них.

```
gcloud compute ssh controller-0
```
 -->

<!--
### Running commands in parallel with tmux

[tmux](https://github.com/tmux/tmux/wiki) can be used to run commands on multiple compute instances at the same time. See the [Running commands in parallel with tmux](01-prerequisites.md#running-commands-in-parallel-with-tmux) section in the Prerequisites lab.
 -->

## Bootstrapping an etcd Cluster Member

### Download and Install the etcd Binaries

### Загрузка бинарных файлов etcd и их установка

Download the official etcd release binaries from the [coreos/etcd](https://github.com/coreos/etcd) GitHub project:

Скачайте официальные бинарные файлы etcd с гитхаба [coreos/etcd](https://github.com/coreos/etcd):

```bash
wget "https://github.com/coreos/etcd/releases/download/v3.3.5/etcd-v3.3.5-linux-amd64.tar.gz"
```

Extract and install the `etcd` server and the `etcdctl` command line utility:

Распакуйте и установите сервер `etcd` и утилиту для командной строки `etcdctl`:

```bash
{
  tar -xvf etcd-v3.3.5-linux-amd64.tar.gz
  sudo mv etcd-v3.3.5-linux-amd64/etcd* /usr/local/bin/
}
```

### Configure the etcd Server

### Настройка сервера etcd

```bash
{
  sudo mkdir -p /etc/etcd /var/lib/etcd
  sudo cp ca.pem kubernetes-key.pem kubernetes.pem /etc/etcd/
}
```

The instance internal IP address will be used to serve client requests and communicate with etcd cluster peers. Foreach cluster node internal IP should be unique and `INTERNAL_IP` variable should store it.

Внутренний IP-адрес машины будет использоваться, чтобы принимать запросы клиента и коммуницировать с остальными участниками кластера. Для каждой машины внутренний IP-адрес уникален и указывается отдельно в переменную `INTERNAL_IP`.

Each etcd member must have a unique name within an etcd cluster. Set the etcd name to match the hostname of the current compute instance:

У каждой ноды etcd должно быть уникальное имя внутри кластера, укажите имя ноды etcd так, чтобы оно совпадало с именем хоста машины:

```bash
ETCD_NAME=$(hostname -s)
```

Create the `etcd.service` systemd unit file:

Создайте systemd юнит `etcd.service`:

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

### Запустите etcd сервер

```bash
{
  sudo systemctl daemon-reload
  sudo systemctl enable etcd
  sudo systemctl start etcd
}
```

> Remember to run the above commands on each controller node: `controller-0`, `controller-1`, and `controller-2`.

## Проверка

Список участников кластера etcd:

```bash
sudo ETCDCTL_API=3 etcdctl member list \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/etcd/ca.pem \
  --cert=/etc/etcd/kubernetes.pem \
  --key=/etc/etcd/kubernetes-key.pem
```

> Вывод

```
3a57933972cb5131, started, controller-2, https://10.240.0.12:2380, https://10.240.0.12:2379
f98dc20bce6225a0, started, controller-0, https://10.240.0.10:2380, https://10.240.0.10:2379
ffed16798470cab5, started, controller-1, https://10.240.0.11:2380, https://10.240.0.11:2379
```
