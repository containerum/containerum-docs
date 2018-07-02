---
title: Kubernetes Certificates - Containerum
linktitle: Installation
description: Certificates

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 4

draft: false
---

# Подгтовка и создание сертификатов

С помощью cfssl создаем корневой сертификат и на его основе генерируем сертификаты для etcd, kube-apiserver, kube-controller-manager, kube-scheduler, kubelet, kube-proxy.

## Создание CA

Создаем файл конфигурации для CA и приватного ключа:

```bash
{

cat > ca-config.json <<EOF
{
  "signing": {
    "default": {
      "expiry": "8760h"
    },
    "profiles": {
      "kubernetes": {
        "usages": ["signing", "key encipherment", "server auth", "client auth"],
        "expiry": "8760h"
      }
    }
  }
}
EOF

cat > ca-csr.json <<EOF
{
  "CN": "Kubernetes",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "Kubernetes",
      "OU": "CA",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert -initca ca-csr.json | cfssljson -bare ca

}
```

## Сертификаты для сервера и клиента

Создаем сертификаты для каждого компонента Kubernetes и клиентский сертификат для пользователя Kubernetes `admin`

```bash
{

cat > admin-csr.json <<EOF
{
  "CN": "admin",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "system:masters",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  admin-csr.json | cfssljson -bare admin

}
```

### Сертификаты для клиентов Kubelet

Kubernetes использует особый вид авторизации - Node Authorizer, который также принимает запросы к API от Kubelet. Для авторизации через Node Authorizer Kubelet должен использовать учетные данные указанные в группе `system:nodes` и именем пользователя `system:node:<nodeName>`. Создадим сертификаты для каждой ноды, которая соответствует параметрам Node Authorizer.

Пример скрипта.

В переменных `EXTERNAL_IP` и `INTERNAL_IP` указываем внешний и приватный IP-адрес соответсвенно.
<nodeName> - hostname ноды, для которой гененрируем сертификат.

```bash
cat > <nodeName>-csr.json <<EOF
{
  "CN": "system:node:<nodeName>",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "system:nodes",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

EXTERNAL_IP=
INTERNAL_IP=

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=<nodeName>,${EXTERNAL_IP},${INTERNAL_IP} \
  -profile=kubernetes \
  <nodeName>-csr.json | cfssljson -bare <nodeName>
done
```

### Сертификат для Kube Controller Manager


```bash
{

cat > kube-controller-manager-csr.json <<EOF
{
  "CN": "system:kube-controller-manager",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "system:kube-controller-manager",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-controller-manager-csr.json | cfssljson -bare kube-controller-manager

}
```

### Сертификат для Kube Proxy

```bash
{

cat > kube-proxy-csr.json <<EOF
{
  "CN": "system:kube-proxy",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "system:node-proxier",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-proxy-csr.json | cfssljson -bare kube-proxy

}
```

### Сертификат для Kube Scheduler

```bash
{

cat > kube-scheduler-csr.json <<EOF
{
  "CN": "system:kube-scheduler",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "system:kube-scheduler",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  kube-scheduler-csr.json | cfssljson -bare kube-scheduler

}
```

### Сертификат для Kube API Server

Для сертификата потребуется статичный IP-адрес, который должен быть включен в список доменных имен Kubernetes API Server. Это будет гарантировать, что сертификат будет одобрен удаленными клиентами.

Скрипт для создания сертификата:

```bash
{

KUBERNETES_PUBLIC_ADDRESS=${PUBLIC_IP}
cat > kubernetes-csr.json <<EOF
{
  "CN": "kubernetes",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "Kubernetes",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=10.32.0.1, ${MASTER_NODES_IPS}, ${ETC_NODE_IP}, ${KUBERNETES_PUBLIC_ADDRESS},127.0.0.1,kubernetes.default \
  -profile=kubernetes \
  kubernetes-csr.json | cfssljson -bare kubernetes

}
```

## Пара ключей для сервис-аккаунта

Kubernetes Controller Manager оперирует парой ключей для создания и подписывание токенов для сервис-аккаунта.

Скрипт:

```bash
{

cat > service-account-csr.json <<EOF
{
  "CN": "service-accounts",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "US",
      "L": "Portland",
      "O": "Kubernetes",
      "OU": "Kubernetes The Hard Way",
      "ST": "Oregon"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -profile=kubernetes \
  service-account-csr.json | cfssljson -bare service-account

}
```

## Распределение сертификатов для клиентов и серверов

Скопируйте соответствующие сертификаты и приватные ключи на каждую ноду

```bash
for instance in <nodeName>-1 <nodeName>-2; do
  scp ca.pem <nodeName>-key.pem <nodeName>.pem <nodeName>:~/
done
```

Скопируйте соответствующие сертификаты и приватные ключи на каждый контроллер:

```bash
for instance in controller-1 controller-2; do
  scp ca.pem ca-key.pem kubernetes-key.pem kubernetes.pem \
    service-account-key.pem service-account.pem <nodeName>:~/
done
```