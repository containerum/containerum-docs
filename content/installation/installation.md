---
title: Containerum installation
linktitle: Installation
description: How to install Containerum in Kubernetes cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 3
    identifier: containerum-install

draft: false
---


# Containerum installation

To launch Containerum on your Kubernetes Cluster without metrics collection run: 

```
helm repo add containerum https://charts.containerum.io
helm repo update
helm install containerum/containerum
```

To enable collecting resource utilization metrics, install Containerum with Prometheus Operator:

```
helm repo add containerum https://charts.containerum.io
helm repo update
helm install containerum/prometheus-operator
helm install containerum/containerum —set tags.monitoring=true
```

If you already have Prometheus in your cluster and want to use it to display node utilization in Containerum Platform, install Containerum Platform with the following parameters:

```
helm repo add containerum https://charts.containerum.io
helm repo update
helm install containerum/containerum —set nodemetrics.env.local.PROMETHEUS_ADDR=http://{PROMETHEUS_SVC_NAME}:{PROMETHEUS_SVC_PORT}
```

This will install the Containerum Platform and create two Ingresses to expose Containerum Platform. You can view the Ingresses with `kubectl get ingress`.

 To be able to reach Containerum Web UI and the API, add the machine IP address to /etc/hosts, e.g.:

 ```
 127.0.0.1 local.containerum.io api.local.containerum.io
 ```
 where ```127.0.0.1``` is the address of your machine with Containerum.

 Now you can access Containerum Web UI at ```local.containerum.io```. To manage your local Containerum platform via chkit CLI, set the API in chkit:
 ```
 chkit set api api.local.containerum.io
 ```

 Done!

You can now access Containerum Platform user the default credentials:  
login: ```admin@local.containerum.io```  
password: ```verystrongpassword```   
Don't forget to change the password right away!

Now [configure](/configuration/) Containerum Platform to make it ready for use in your cluster.
