---
title: Kubernetes Certificates
linktitle: Certificates
description: Generation of certificated for etcd, kube-apiserver, kubelet, etc.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 4

draft: false
---

# Certs preparation and generation

> **Note**: All of steps in this article can be performed on your host machine on any other machine with the ssh access to all of your nodes.

### Containerum script

<a href="/files/gen-kube-ca.sh" target="_blank">`This script`</a> generates and maintains certificate infrastructure sufficient to run a Kubernetes cluster.

Arguments:

default              Initialize a CA and generate default set of certificates.
prepare file.csr     Generate an extra certificate signing request.
sign file.crt        Use CA to sign a CSR in file.csr. Result in file.crt.

The script does not remove or overwrite any files with non-zero length - it completes the structure to its full state by generating missing files from files they are dependent on.

For example, if you put files admin.key and ca.key into an empty directory, and call this script from there, the script will use .key files provided by you for generation of CA certificate and admin.csr (and, consequtively, admin.crt).

If you want to re-issue a certificate from the same .csr, remove just its .crt and re-run the script.

If you want to update certificate fields (i.e. commonName/CN, organization/O, etc.), you have to re-generate the certificate signing request.
Remove the related .crt and .csr files, edit .conf file to your pleasure and re-run the script.

If you want to restore a default config for CSR generation, remove the .conf file.

`./gen-kube-ca.sh default`


### cfssl
Create a root certificate with cfssl and generate certificates for etcd, kube-apiserver, kube-controller-manager, kube-scheduler, kubelet, and kube-proxy.

### Creating a CA
Create a configuration file and a private key for CA:

```bash
{{< highlight bash >}}

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
      "C": "LV",
      "L": "Riga",
      "O": "Kubernetes",
      "OU": "CA"
    }
  ]
}
EOF

cfssl gencert -initca ca-csr.json | cfssljson -bare ca

{{< / highlight >}}
```

### Client and server certificates
Create certificates for each Kubernetes component and a client certificate for `admin`

```bash
{{< highlight bash >}}

cat > admin-csr.json <<EOF
{
  "CN": "admin",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "system:masters",
      "OU": "Containerum"
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

{{< / highlight >}}
```



#### Generate a certificate for Kube Controller Manager
Generate a certificate:

```bash
{{< highlight bash >}}

cat > kube-controller-manager-csr.json <<EOF
{
  "CN": "system:kube-controller-manager",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "system:kube-controller-manager",
      "OU": "Containerum"
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

{{< / highlight >}}
```

#### Generate a certificate for Kube Scheduler
Generate a certificate:

```bash
{{< highlight bash >}}

cat > kube-scheduler-csr.json <<EOF
{
  "CN": "system:kube-scheduler",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "system:kube-scheduler",
      "OU": "Containerum"
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

{{< / highlight >}}
```

#### Generate a certificate for Kube API Server
To generate a certificate you need to provide a static IP address into the the list of domain names for Kubernetes API Server certificates. This will ensure the certificate can be validated by remote clients.

`10.32.0.1` is an IP address of Kubernetes API server instance in Cluster CIDR.

`MASTER_NODES_IP` is a sequence of all IP addresses of master nodes. In the case of one master node, only its IP address should be specified there.

Generate a certificate:

```bash
{{< highlight bash >}}

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
      "C": "LV",
      "L": "Riga",
      "O": "Kubernetes",
      "OU": "Containerum"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=10.32.0.1,${MASTER_NODES_IPS},${KUBERNETES_PUBLIC_ADDRESS},127.0.0.1,kubernetes.default \
  -profile=kubernetes \
  kubernetes-csr.json | cfssljson -bare kubernetes

{{< / highlight >}}
```

### The service account key pair

Kubernetes Controller Manager uses a key pair to create and sign tokens for the service account.

Run the script:

```bash
{{< highlight bash >}}

cat > service-account-csr.json <<EOF
{
  "CN": "service-accounts",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "Kubernetes",
      "OU": "Сontainerum"
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

```

#### Generate a certificate for Kubelet clients

Kubernetes uses a special mode of authorization, Node Authorizer, which also authorizes requests from Kubelet to API.
To authorize with Node Authorizer, Kubelet uses the credentials from the `system:nodes` group and the `system:node:${NODE_NAME}` username.
Create a certificate for each node to meet to Node Authorizer requirements.


Script example:

Specify the external and internal IP in `EXTERNAL_IP` and `INTERNAL_IP` correspondingly. If you don't have private network, you may use only `EXTERNAL_IP`.
${NODE_NAME} is the hostname of the node, for which a certificate is to be generated.

```bash
{{< highlight bash >}}

cat > ${NODE_NAME}-csr.json <<EOF
{
  "CN": "system:node:${NODE_NAME}",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "system:nodes",
      "OU": "Containerum"
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
  -hostname=${NODE_NAME},${EXTERNAL_IP},${INTERNAL_IP} \
  -profile=kubernetes \
  ${NODE_NAME}-csr.json | cfssljson -bare ${NODE_NAME}

{{< / highlight >}}
```

#### Generate a certificate for Kube Proxy
Generate a certificate:

```bash
{{< highlight bash >}}

cat > kube-proxy-csr.json <<EOF
{
  "CN": "system:kube-proxy",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "system:node-proxier",
      "OU": "Containerum"
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

{{< / highlight >}}
```

### Distribution of certificates for clients and servers

Copy the appropriate certificates and the private key to each node:

```bash
{{< highlight bash >}}

for instance in ${NODE_NAME_1} ${NODE_NAME_2} ${NODE_NAME_3}; do
  scp ca.pem ${instance}-key.pem ${instance}.pem ${instance}:~/
done

{{< / highlight >}}
```

Copy the appropriate certificates and the private key to each controller:

```bash
{{< highlight bash >}}

for instance in master-1 master-2 master-3; do
  scp ca.pem ca-key.pem kubernetes-key.pem kubernetes.pem \
    service-account-key.pem service-account.pem ${instance}:~/
done

{{< highlight bash >}}
```

Done!

Now you can proceed to [authentication kubeconfig files](/kubernetes/installation/3kubernetes-configuration-files).
