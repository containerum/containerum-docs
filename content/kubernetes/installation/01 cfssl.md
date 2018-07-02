---
title: Kubernetes Installation CFSSL - Containerum
linktitle: Installation
description: CFSSL Installation

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 3

draft: false
---


### Установка CFSSL

Утилиты cfssl и cfssljson будут нужны для PKI инфраструктуры и создания TLS сертификатов.

Скачаем и установим cfssl и cfssljson из официального репозитория:

```bash
$ yum install -y wget
$ wget https://pkg.cfssl.org/R1.2/cfssl_linux-amd64 \
     https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
$ chmod +x cfssl_linux-amd64 cfssljson_linux-amd64
$ sudo mv cfssl_linux-amd64 /usr/local/bin/cfssl
$ sudo mv cfssljson_linux-amd64 /usr/local/bin/cfssljson
```

Проверяем, что установленная версия cfssl 1.2.0 или выше5:

```bash
$ cfssl version
Version: 1.2.0
Revision: dev
Runtime: go1.6
```

Cfssljson не поддерживает вывод его версии в командную строку.

### Установка kubectl

Kubectl используется для взаимодействия с API сервером Kubernetes. Скачайте и установите kubectl из официальных бинарных файлов:

```bash
$ wget https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kubectl
$ chmod +x kubectl
$ sudo mv kubectl /usr/local/bin/
```

И удостоверяемся что версия kubectl 1.10.2 или выше

```bash
$ kubectl version --client
Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.2", GitCommit:"81753b10df112992bf51bbc2c2f85208aad78335", GitTreeState:"clean", BuildDate:"2018-04-27T09:22:21Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}
```
