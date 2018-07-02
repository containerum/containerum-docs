---
title: Kubernetes Configure Kubectl - Containerum
linktitle: Installation
description: Configure Kubectl

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 9

draft: false
---

# Конфигурирование kubectl для удаленного доступа

Сгененрируем kubeconfig для `kubectl` с основой на учетной записи `admin`.

Команды нужно запускать из той же директории, в которой генерировались сертификаты.

## Конфигурационный файл для admin

Каждый kubeconfig требует подключения к Kubernetes API Server. Для поддержки высокой доступности, будет использваться IP-адрес, назначенный не внешний балансировщик нагрузки.

Сгенерируем kubeconfig подходящий для аутентификации как пользователь `admin`:

```bash
{
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://${KUBERNETES_PUBLIC_ADDRESS}:6443

  kubectl config set-credentials admin \
    --client-certificate=admin.pem \
    --client-key=admin-key.pem

  kubectl config set-context kubernetes-the-hard-way \
    --cluster=kubernetes-the-hard-way \
    --user=admin

  kubectl config use-context kubernetes-the-hard-way
}
```

## Проверка

```bash
kubectl get componentstatuses
```

Вывод:

```
NAME                 STATUS    MESSAGE             ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-1               Healthy   {"health":"true"}
etcd-2               Healthy   {"health":"true"}
etcd-0               Healthy   {"health":"true"}
```

Перечислим ноды кластера:

```bash
kubectl get nodes
```

Вывод:

```
NAME       STATUS    ROLES     AGE       VERSION
worker-0   Ready     <none>    1m        v1.10.2
worker-1   Ready     <none>    1m        v1.10.2
worker-2   Ready     <none>    1m        v1.10.2
```
