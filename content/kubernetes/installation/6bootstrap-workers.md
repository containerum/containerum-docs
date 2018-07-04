---
title: Bootstrapping Workers
linktitle: Bootstrap Workers
description: Bootstrapping three worker nodes for Kubernetes cluster.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 8

draft: false
---

# Initialize worker nodes

This section covers how to launch three worker nodes and install the following components: [runc](https://github.com/opencontainers/runc), [gVisor](https://github.com/google/gvisor), [container networking plugins](https://github.com/containernetworking/cni), [containerd](https://github.com/containerd/containerd), [kubelet](https://kubernetes.io/docs/admin/kubelet), [kube-proxy](https://kubernetes.io/docs/concepts/cluster-administration/proxies).

### Provision a worker node

Install the OS dependencies:

```bash
{{< highlight bash >}}

sudo yum update
sudo yum -y install socat conntrack ipset

{{< / highlight >}}
```

> `socat` enables support for `kubectl port-forward` command.

#### Download and install the binaries

```bash
{{< highlight bash >}}

curl -O https://github.com/kubernetes-incubator/cri-tools/releases/download/v1.0.0-beta.0/crictl-v1.0.0-beta.0-linux-amd64.tar.gz \
  https://storage.googleapis.com/kubernetes-the-hard-way/runsc \
  https://github.com/opencontainers/runc/releases/download/v1.0.0-rc5/runc.amd64 \
  https://github.com/containernetworking/plugins/releases/download/v0.6.0/cni-plugins-amd64-v0.6.0.tgz \
  https://github.com/containerd/containerd/releases/download/v1.1.0/containerd-1.1.0.linux-amd64.tar.gz
sudo yum install kubernetes-node-meta

{{< / highlight >}}
```

Create installation directories:

```bash
{{< highlight bash >}}

sudo mkdir -p \
  /etc/cni/net.d \
  /opt/cni/bin \
  /var/lib/kubelet \
  /var/lib/kube-proxy \
  /var/lib/kubernetes \
  /var/run/kubernetes

{{< / highlight >}}
```

Install:

```bash
{{< highlight bash >}}

chmod +x runc.amd64 runsc
sudo mv runc.amd64 runc
sudo mv runc runsc /usr/local/bin/
mkdir crictl
sudo tar -xvf crictl-v1.0.0-beta.0-linux-amd64.tar.gz -C crictl/
mv crictl/crictl /usr/local/bin/
mkdir cni  
sudo tar -xvf cni-plugins-amd64-v0.6.0.tgz -C cni/
mv cni/ /opt/cni/bin/
mkdir containerd/
sudo tar -xvf containerd-1.1.0.linux-amd64.tar.gz -C containerd/
sudo mv containerd/bin/* /bin/

{{< / highlight >}}
```

#### Configure the CNI network

Specify the Pod CIDR IP range for the current node:

<!-- (TODO): How do we specify POD_CIDR -->

```bash
POD_CIDR=POD_CIDR=10.200.0.0/16
```

Create the `bridge` network:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/cni/net.d/10-bridge.conf
{
    "cniVersion": "0.3.1",
    "name": "bridge",
    "type": "bridge",
    "bridge": "cnio0",
    "isGateway": true,
    "ipMasq": true,
    "ipam": {
        "type": "host-local",
        "ranges": [
          [{"subnet": "${POD_CIDR}"}]
        ],
        "routes": [{"dst": "0.0.0.0/0"}]
    }
}
EOF

{{< / highlight >}}
```

Create the `loopback` network:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/cni/net.d/99-loopback.conf
{
    "cniVersion": "0.3.1",
    "type": "loopback"
}
EOF

{{< / highlight >}}
```

#### Configure containerd

Create the `containerd` configuration file:

```bash
{{< highlight bash >}}

sudo mkdir -p /etc/containerd/

{{< / highlight >}}
```

```bash
{{< highlight bash >}}

cat << EOF | sudo tee /etc/containerd/config.toml
[plugins]
  [plugins.cri.containerd]
    snapshotter = "overlayfs"
    [plugins.cri.containerd.default_runtime]
      runtime_type = "io.containerd.runtime.v1.linux"
      runtime_engine = "/usr/local/bin/runc"
      runtime_root = ""
    [plugins.cri.containerd.untrusted_workload_runtime]
      runtime_type = "io.containerd.runtime.v1.linux"
      runtime_engine = "/usr/local/bin/runsc"
      runtime_root = "/run/containerd/runsc"
EOF

{{< / highlight >}}
```

Create the `containerd.service` systemd unit file:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/systemd/system/containerd.service
[Unit]
Description=containerd container runtime
Documentation=https://containerd.io
After=network.target

[Service]
ExecStartPre=/sbin/modprobe overlay
ExecStart=/bin/containerd
Restart=always
RestartSec=5
Delegate=yes
KillMode=process
OOMScoreAdjust=-999
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity

[Install]
WantedBy=multi-user.target
EOF

{{< / highlight >}}
```

#### Configure Kubelet

```bash
{{< highlight bash >}}

sudo cp ${HOSTNAME}-key.pem ${HOSTNAME}.pem /var/lib/kubelet/
sudo cp ${HOSTNAME}.kubeconfig /var/lib/kubelet/kubeconfig
sudo cp ca.pem /var/lib/kubernetes/

{{< / highlight >}}
```

#### Configure Kubernetes Proxy

```bash
{{< highlight bash >}}

sudo mv kube-proxy.kubeconfig /etc/kubernetes

{{< / highlight >}}
```

#### Start services on the slave nodes

```bash
{{< highlight bash >}}

sudo systemctl daemon-reload
sudo systemctl enable containerd kubelet kube-proxy
sudo systemctl start containerd kubelet kube-proxy

{{< / highlight >}}
```

> Don't forget to run all the commands on each node.

### Verification


Print the list of nodes:

```bash
kubectl get nodes --kubeconfig admin.kubeconfig
```

> Output

```
NAME       STATUS    ROLES     AGE       VERSION
worker-0   Ready     <none>    20s       v1.10.2
worker-1   Ready     <none>    20s       v1.10.2
worker-2   Ready     <none>    20s       v1.10.2
```

**Note**: Some nodes may have a status different from `Ready`. It's alright if some nodes are restarting.

Done!

Now you can proceed to [configuring kubectl](/kubernetes/installation/7configure-kubectl).
