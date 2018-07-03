---
title: Kubernetes Configure Kubectl
linktitle: Kubectl
description: Configuring the Kubernetes command line utility `kubectl`

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 9

draft: false
---

# Configure kubectl for remote access

Generate the kubeconfig file for `kubectl` based on `admin` user credentials.

Execute commands from the same directory used to generate the certificates.

### Create the configuration file for admin

Each kubeconfig requires connection to the Kubernetes API Server. To ensure high availability we will use the IP address assigned for the external load balancer.

Generate the kubeconfig file suitable for authenticating the `admin` user:

```bash
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
```

### Verification

```bash
kubectl get componentstatuses
```

Output:

```
NAME                 STATUS    MESSAGE             ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-1               Healthy   {"health":"true"}
etcd-2               Healthy   {"health":"true"}
etcd-0               Healthy   {"health":"true"}
```

Print the list of cluster nodes:

```bash
kubectl get nodes
```

Output:

```
NAME       STATUS    ROLES     AGE       VERSION
worker-0   Ready     <none>    1m        v1.10.2
worker-1   Ready     <none>    1m        v1.10.2
worker-2   Ready     <none>    1m        v1.10.2
```

Done!

Now you can proceed to [configuring Calico](/kubernetes/installation/8calico).
