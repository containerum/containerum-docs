---
title: Kubernetes DNS Cluster Add-on - Containerum
linktitle: Installation
description: DNS Cluster Add-on

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 11

draft: false
---

# Запускаем DNS Cluster Add-on

[DNS add-on](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) - основанный на DNS сервис обнаружения приложений запущенных в кластере Kubernetes.

## DNS Cluster Add-on

Deploy the `kube-dns` cluster add-on:

Запускаем `kube-dns`:

```bash
kubectl create -f https://storage.googleapis.com/kubernetes-the-hard-way/kube-dns.yaml
```

```
service "kube-dns" created
serviceaccount "kube-dns" created
configmap "kube-dns" created
deployment.extensions "kube-dns" created
```

Получаем список подов деплоя `kube-dns`:

```bash
kubectl get pods -l k8s-app=kube-dns -n kube-system
```

```
NAME                        READY     STATUS    RESTARTS   AGE
kube-dns-3097350089-gq015   3/3       Running   0          20s
```

## Проверка

Создаем `busybox` деплой:

```bash
kubectl run busybox --image=busybox --command -- sleep 3600
```

Перечислим поды `busybox`:

```bash
kubectl get pods -l run=busybox
```

```
NAME                       READY     STATUS    RESTARTS   AGE
busybox-2125412808-mt2vb   1/1       Running   0          15s
```

Получим полное имя подв `busybox`:

```bash
POD_NAME=$(kubectl get pods -l run=busybox -o jsonpath="{.items[0].metadata.name}")
```

Выполним DNS lookup для сервиса `kubernetes` внутри пода `busybox`:

```bash
kubectl exec -ti $POD_NAME -- nslookup kubernetes
```

```
Server:    10.32.0.10
Address 1: 10.32.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes
Address 1: 10.32.0.1 kubernetes.default.svc.cluster.local
```
