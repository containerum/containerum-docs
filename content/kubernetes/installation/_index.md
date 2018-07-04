---
title: Kubernetes Components Installation - Containerum
linktitle: Overview
description: Bootsrapping Kubernetes components from binaries.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 2
    identifier: kube-inst-overview

draft: false
---


# Kubernetes installation overview

Setting up a high availability Kubernetes cluster consists of several steps:

- install cffsl
Cfssl and cfssljson utilities are required for PKI infrastructure and TLS certificates.

- configure certificates
Generating certificates for certain IP, nodes, hostnames, etc. Certificates are needed for traffic encryption.

- configure authentication files for Kubernetes components
Authentication files are required for communication between Kubernetes components.

- bootstrap etcd
Etcd is a key-value store where Kubernetes stores cluster state information.

- bootstrap controllers
Launching a master node (Kubernetes Control Plane) and configuring high availability. It also demonstrates how to create an external load balancer to expose Kubernetes API for remote clients in the external network.

- bootstrap workers
Launching worker nodes. You can launch as many workers as you need.

- configure kubectl
Kubectl is a CLI tool for Kubernetes.

- install calico
Calico is a plugin for Kubernetes network security.

- configure DNS add-on
[DNS add-on](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/) is a DNS-based service discovery to applications running in the Kubernetes cluster.

- run smoke tests
This section describes how to run a full set of tests to make sure that the Kubernetes cluster functions correctly.
