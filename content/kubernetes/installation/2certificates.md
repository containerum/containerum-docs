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

You can generate certificates using Containerum script or cfssl.

> **Note**: All of steps in this article can be performed on your host machine on any other machine with the ssh access to all of your nodes.

### Generate certs with Containerum script

<a href="/files/gen-kube-ca.sh" target="_blank">This script</a> generates and maintains certificate infrastructure sufficient to run a Kubernetes cluster.

Arguments:

default - Initialize a CA and generate default set of certificates.  
prepare file.csr - Generate an extra certificate signing request.  
sign file.crt - Use CA to sign a CSR in file.csr. Result in file.crt.

The script does not remove or overwrite any files with non-zero length - it completes the structure to its full state by generating missing files from files they are dependent on.

For example, if you put files admin.key and ca.key into an empty directory, and call this script from there, the script will use .key files provided by you for generation of CA certificate and admin.csr (and, consequtively, admin.crt).

If you want to re-issue a certificate from the same .csr, remove just its .crt and re-run the script.

If you want to update certificate fields (i.e. commonName/CN, organization/O, etc.), you have to re-generate the certificate signing request.
Remove the related .crt and .csr files, edit .conf file to your pleasure and re-run the script.

If you want to restore a default config for CSR generation, remove the .conf file.

#### Use cases

Run this command to generate all certs:
`./gen-kube-ca.sh default`

Run this command to create `.conf` file.
`./gen-kube-ca.sh prepare worker-1.conf`

Edit `worker-1.conf` file for your case:

```
[req]
default_md = sha256
prompt = no
utf8 = yes
req_extensions = req_exts
distinguished_name = dn

[dn]
CN = default_commonName  # replace with worker-1
O = default_organization # replace with system:nodes

[req_exts]
subjectAltName = IP:$INTERNAL_IP, IP:$EXTERNAL_IP, DNS:$DOMAIN_NAME
```

Then run this command to prepare `.csr` file:
`./gen-kube-ca.sh prepare worker-1.csr`

And run this command to sign certificate:
`./gen-kube-ca.sh sign worker-1.crt`


### Generate certs with cfssl
Create a root certificate with cfssl and generate certificates for etcd, kube-apiserver, kube-controller-manager, kube-scheduler, kubelet, and kube-proxy.

#### Installing cfssl and cfssljson

Download and install the binaries from the official repositories:

```
{{< highlight bash >}}
curl -O https://pkg.cfssl.org/R1.2/cfssl_linux-amd64 \
    https://pkg.cfssl.org/R1.2/cfssljson_linux-amd64
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

> cfssljson cannot print version to the command line.


#### Creating a CA
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

#### Client and server certificates
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

#### Generate a certificate for ETCD
To generate a certificate you need to provide a static IP address into the the list of domain names for ETCD certificates.

`ETCD_NODE-1_IP`, `ETCD_NODE-2_IP`, `ETCD_NODE-3_IP` are IP addresses of instances in internal network, on which etcd have been installed. It will be used to communicate with other cluster peers and serve client requests.

Generate a certificate:

```bash
{{< highlight bash >}}

cat > etcd-csr.json <<EOF
{
  "CN": "ETCD",
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "LV",
      "L": "Riga",
      "O": "ETCD",
      "OU": "Containerum"
    }
  ]
}
EOF

cfssl gencert \
  -ca=ca.pem \
  -ca-key=ca-key.pem \
  -config=ca-config.json \
  -hostname=${ETCD_NODE-1_IP},${ETCD_NODE-2_IP},${ETCD_NODE-3_IP},127.0.0.1 \
  -profile=etcd \
  etcd-csr.json | cfssljson -bare etcd

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

{{< / highlight >}}
```

#### Generate a certificate for Kubelet clients

Kubernetes uses a special mode of authorization, Node Authorizer, which also authorizes requests from Kubelet to API.
To authorize with Node Authorizer, Kubelet uses the credentials from the `system:nodes` group and the `system:node:${HOSTNAME}` username.
Create a certificate for each node to meet to Node Authorizer requirements.


Script example:

Specify the external and internal IP in `EXTERNAL_IP` and `INTERNAL_IP` correspondingly. If you don't have private network, you may use only `EXTERNAL_IP`.
${HOSTNAME} is the hostname of the node, for which a certificate is to be generated.

```bash
{{< highlight bash >}}

cat > ${HOSTNAME}-csr.json <<EOF
{
  "CN": "system:node:${HOSTNAME}",
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
  -hostname=${HOSTNAME},${EXTERNAL_IP},${INTERNAL_IP} \
  -profile=kubernetes \
  ${HOSTNAME}-csr.json | cfssljson -bare ${HOSTNAME}

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

Apply the traditional naming scheme to certificate files:

```bash
{{< highlight bash >}}
for f in *-key.pem; do mv -vi "$f" "${f%-key.pem}.key"; done
for f in *.pem; do mv -vi "$f" "${f%.pem}.crt"; done
{{< / highlight >}}
```

Copy the appropriate certificates and the private key to each node:

```bash
{{< highlight bash >}}

for instance in worker-1 worker-2 worker-3; do
  scp ca.crt ${instance}.crt ${instance}.key ${instance}:~/
done

{{< / highlight >}}
```

Copy the appropriate certificates and the private key to each controller:

```bash
{{< highlight bash >}}

for instance in master-1 master-2 master-3; do
  scp ca.crt ca.key kubernetes.crt kubernetes.key \
    service-account.crt service-account.key ${instance}:~/
done

{{< / highlight >}}
```

Done!

Now you can proceed to [authentication kubeconfig files](/kubernetes/installation/3kubernetes-configuration-files).
