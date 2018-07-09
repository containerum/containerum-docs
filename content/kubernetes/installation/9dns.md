---
title: Kubernetes DNS Cluster Add-on
linktitle: DNS Cluster
description: Launching service discovery to applications running inside the Kubernetes cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 10

draft: false
---

# Launch DNS Cluster Add-on

### DNS Cluster Add-on

Deploy the `kube-dns` cluster add-on:

Launch `kube-dns`:

```bash
kubectl create -f https://raw.githubusercontent.com/containerum/containerum-docs/develop/content/files/kube-dns.yaml
```

```
service "kube-dns" created
serviceaccount "kube-dns" created
configmap "kube-dns" created
deployment.extensions "kube-dns" created
```

List the pods of the `kube-dns` deployment:

```bash
kubectl get pods -l k8s-app=kube-dns -n kube-system
```

```
NAME                        READY     STATUS    RESTARTS   AGE
kube-dns-3097350089-gq015   3/3       Running   0          20s
```

### Verification

Create a `busybox` deployment:

```bash
kubectl run busybox --image=busybox --command -- sleep 3600
```

List the pods of the `busybox` deployment:

```bash
kubectl get pods -l run=busybox
```

```
NAME                       READY     STATUS    RESTARTS   AGE
busybox-2125412808-mt2vb   1/1       Running   0          15s
```

Get the full name of the `busybox` pod:

```bash
POD_NAME=$(kubectl get pods -l run=busybox -o jsonpath="{.items[0].metadata.name}")
```

Execute a DNS lookup for the `kubernetes` service inside the `busybox` pod:

```bash
kubectl exec -ti $POD_NAME -- nslookup kubernetes
```

```
Server:    10.96.0.10
Address 1: 10.96.0.10 kube-dns.kube-system.svc.cluster.local

Name:      kubernetes
Address 1: 10.96.0.1 kubernetes.default.svc.cluster.local
```

Congratulations! You've just bootstrapped your Kubernetes cluster.

Now it's time to [run tests](/kubernetes/installation/10smoketest) to make sure the cluster is up and running.
