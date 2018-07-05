---
title: CFSSL Installation
linktitle: CFSSL
description: Installing CFSSL for PKI infrastructure and TLS certificates.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 3

draft: false
---


# cfssl setup

Cfssl and cfssljson utilities are required for PKI infrastructure and TLS certificates.

Download and install cfssl and cfssljson from the official repositories:

```
{{< highlight bash >}}
curl -O https://pkg.cfssl.org/R1.2/cfssl_linux-amd64 \
    -O https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
chmod +x cfssl_linux-amd64 cfssljson_linux-amd64
sudo mv cfssl_linux-amd64 /usr/local/bin/cfssl
sudo mv cfssljson_linux-amd64 /usr/local/bin/cfssljson
{{< / highlight >}}
```

Make sure that cfssl version is 1.2.0 or higher:

```
{{< highlight bash >}}
cfssl version

> Version: 1.2.0
>  Revision: dev
>   Runtime: go1.6
{{< / highlight >}}
```

> Cfssljson cannot print version to the command line.

### Install kubectl

Kubectl communicates with Kubernetes API server. Install and setup kubectl from the official binaries:

```
{{< highlight bash >}}
curl -O https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kubectl
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
{{< / highlight >}}
```

Make sure that kubectl version is 1.10.2 or higher:

```
{{< highlight bash >}}
kubectl version --client

Client Version: version.Info{Major:"1", Minor:"10", GitVersion:"v1.10.2", GitCommit:"81753b10df112992bf51bbc2c2f85208aad78335", GitTreeState:"clean", BuildDate:"2018-04-27T09:22:21Z", GoVersion:"go1.9.3", Compiler:"gc", Platform:"linux/amd64"}
{{< / highlight >}}
```
Done!

Now you can proceed to [Certificate configuration](/kubernetes/installation/2certificates).
