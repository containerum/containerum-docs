---
title: Kubernetes Configuration - Containerum
linktitle: Installation
description: Kubernetes Configuration

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 5

draft: false
---

# Создание конфигурационных файлов аутентификации

## Конфигурационный файл аутентификации клиента

Создаем kubeconfig для `controller manager`, `kubelet`, `kube-proxy`, `scheduler` и пользователя `admin`.

### Публичный IP-адрес Kubernetes

Каждый файл kubeconfig требует Kubernetes API Server для подключения. Чтобы поддерживать высокую доступность IP-адрес, присвоенный внешнему балансировщику нагрузки, определяет какой Kubernetes API Server будет использован.

Retrieve the `kubernetes-the-hard-way` static IP address:

```bash
KUBERNETES_PUBLIC_ADDRESS=${PUBLIC_IP}
```

### Файл конфигурации kubelet

Когда создаются файлы конфигурации kubeconfig для kubelet, клиентский сертификат указывает, какое имя ноды kubelet должно быть использовано. Это позовляет kubelet убедиться, что авторизация Node Authorizer пройдет должным образом.

Создаем kubeconfig для каждого слейва:

```bash
for instance in worker-0 worker-1 worker-2; do
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://${KUBERNETES_PUBLIC_ADDRESS}:6443 \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-credentials system:node:${instance} \
    --client-certificate=${instance}.pem \
    --client-key=${instance}-key.pem \
    --embed-certs=true \
    --kubeconfig=${instance}.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=system:node:${instance} \
    --kubeconfig=${instance}.kubeconfig

  kubectl config use-context default --kubeconfig=${instance}.kubeconfig
done
```

### Конфигурация kube-proxy

Создание kubeconfig для kube-proxy:


```bash
{
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://${KUBERNETES_PUBLIC_ADDRESS}:6443 \
    --kubeconfig=kube-proxy.kubeconfig

  kubectl config set-credentials system:kube-proxy \
    --client-certificate=kube-proxy.pem \
    --client-key=kube-proxy-key.pem \
    --embed-certs=true \
    --kubeconfig=kube-proxy.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=system:kube-proxy \
    --kubeconfig=kube-proxy.kubeconfig

  kubectl config use-context default --kubeconfig=kube-proxy.kubeconfig
}
```

### Создание kubeconfig для `kube-controller-manager`

```bash
{
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://127.0.0.1:6443 \
    --kubeconfig=kube-controller-manager.kubeconfig

  kubectl config set-credentials system:kube-controller-manager \
    --client-certificate=kube-controller-manager.pem \
    --client-key=kube-controller-manager-key.pem \
    --embed-certs=true \
    --kubeconfig=kube-controller-manager.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=system:kube-controller-manager \
    --kubeconfig=kube-controller-manager.kubeconfig

  kubectl config use-context default --kubeconfig=kube-controller-manager.kubeconfig
}
```

### Конфигурационный файл kube-scheduler

```bash
{
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://127.0.0.1:6443 \
    --kubeconfig=kube-scheduler.kubeconfig

  kubectl config set-credentials system:kube-scheduler \
    --client-certificate=kube-scheduler.pem \
    --client-key=kube-scheduler-key.pem \
    --embed-certs=true \
    --kubeconfig=kube-scheduler.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=system:kube-scheduler \
    --kubeconfig=kube-scheduler.kubeconfig

  kubectl config use-context default --kubeconfig=kube-scheduler.kubeconfig
}
```

### Конфигурационный файл для пользователя admin

```bash
{
  kubectl config set-cluster kubernetes-the-hard-way \
    --certificate-authority=ca.pem \
    --embed-certs=true \
    --server=https://127.0.0.1:6443 \
    --kubeconfig=admin.kubeconfig

  kubectl config set-credentials admin \
    --client-certificate=admin.pem \
    --client-key=admin-key.pem \
    --embed-certs=true \
    --kubeconfig=admin.kubeconfig

  kubectl config set-context default \
    --cluster=kubernetes-the-hard-way \
    --user=admin \
    --kubeconfig=admin.kubeconfig

  kubectl config use-context default --kubeconfig=admin.kubeconfig
}
```

## Распределение файлов конфигурации

Скопируем соответсвующие файлы kubeconfig для `kubelet` и `kube-proxy` на каждый слейв:

```bash
for instance in worker-0 worker-1 worker-2; do
  scp ${instance}.kubeconfig kube-proxy.kubeconfig ${instance}:~/
done
```

Скопируем соответсвующие файлы kubeconfig для `kube-controller-manager` и `kube-scheduler` на каждый контроллер:

```bash
for instance in controller-0 controller-1 controller-2; do
  scp admin.kubeconfig kube-controller-manager.kubeconfig kube-scheduler.kubeconfig ${instance}:~/
done
```

# Создание конфигурационного файла для шифрования данных и ключа

Kubernetes хранит различные данные о состоянии кластера, конфигурации приложений и секреты. Kubernetes поддерживает возможность зашифровать все данные кластера.

## Ключ шифрования

Создаем ключ шифрования:

```bash
ENCRYPTION_KEY=$(head -c 32 /dev/urandom | base64)
```

## Конфигурационный файл

Создаем `encryption-config.yaml` со следующими параметрами:

```yaml
cat > encryption-config.yaml <<EOF
kind: EncryptionConfig
apiVersion: v1
resources:
  - resources:
      - secrets
    providers:
      - aescbc:
          keys:
            - name: key1
              secret: ${ENCRYPTION_KEY}
      - identity: {}
EOF
```

Копируем `encryption-config.yaml` на каждый контроллер:

```bash
for instance in controller-0 controller-1 controller-2; do
  scp encryption-config.yaml ${instance}:~/
done
```
