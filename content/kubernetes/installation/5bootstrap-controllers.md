---
title: Bootstrapping Controllers
linktitle: Bootstrap Controllers
description: Bootstrapping Kubernetes Control Plane and configuring high availability.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 7

draft: false
---

# Launch Kubernetes Control Plane

This section describes how to launch Kubernetes Control Plane on 3 nodes and configure high availability. It also demonstrates how to create an external load balancer to expose Kubernetes API for remote clients in the external network. The following components will be installed on each node: Kubernetes API Server, Scheduler, Controller Manager.

Don't forget to run all commands on all master nodes.

> **Note**: In the case of launching on the one host PUBLIC_KUBERNETES_IP(IP address of kubernetes load balancer) can be replaced to MASTER_IP

### Prepare Kubernetes Control Plane

Create a directory for Kubernetes configuration files:

```bash
{{< highlight bash >}}

sudo mkdir -p /etc/kubernetes/config

{{< / highlight >}}
```

#### Download and install the official Kubernetes binaries
Run:

```bash
{{< highlight bash >}}

curl -O "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-apiserver" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-controller-manager" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-scheduler" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kubectl"

{{< / highlight >}}
```

```bash
{{< highlight bash >}}

chmod +x kube-apiserver kube-controller-manager kube-scheduler kubectl
sudo mv kube-apiserver kube-controller-manager kube-scheduler kubectl /usr/local/bin/

{{< / highlight >}}
```

#### Configure the Kubernetes API Server

```bash
{{< highlight bash >}}

sudo mkdir -p /var/lib/kubernetes/

sudo cp ca.pem ca-key.pem kubernetes-key.pem kubernetes.pem \
  service-account-key.pem service-account.pem \
  encryption-config.yaml /var/lib/kubernetes/

{{< / highlight >}}
```

The node internal IP address will be used to manifest the API server as a cluster member. It must be set in `INTERNAL_IP` variable.

Сreate the `kube-apiserver.service` systemd unit file:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/systemd/system/kube-apiserver.service
[Unit]
Description=Kubernetes API Server
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-apiserver \\
  --advertise-address=${INTERNAL_IP} \\
  --allow-privileged=true \\
  --apiserver-count=3 \\
  --audit-log-maxage=30 \\
  --audit-log-maxbackup=3 \\
  --audit-log-maxsize=100 \\
  --audit-log-path=/var/log/audit.log \\
  --authorization-mode=Node,RBAC \\
  --bind-address=0.0.0.0 \\
  --client-ca-file=/var/lib/kubernetes/ca.pem \\
  --enable-admission-plugins=Initializers,NamespaceLifecycle,NodeRestriction,LimitRanger,ServiceAccount,DefaultStorageClass,ResourceQuota \\
  --enable-swagger-ui=true \\
  --etcd-cafile=/var/lib/kubernetes/ca.pem \\
  --etcd-certfile=/var/lib/kubernetes/kubernetes.pem \\
  --etcd-keyfile=/var/lib/kubernetes/kubernetes-key.pem \\
  -etcd-servers=https://${ETCD_NODE1_IP}:2379,https://${ETCD_NODE2_IP}:2379,https://${ETCD_NODE3_IP}:2379 \\
  --event-ttl=1h \\
  --kubelet-certificate-authority=/var/lib/kubernetes/ca.pem \\
  --kubelet-client-certificate=/var/lib/kubernetes/kubernetes.pem \\
  --kubelet-client-key=/var/lib/kubernetes/kubernetes-key.pem \\
  --kubelet-https=true \\
  --runtime-config=api/all \\
  --service-account-key-file=/var/lib/kubernetes/service-account.pem \\
  --service-cluster-ip-range=10.32.0.0/24 \\
  --service-node-port-range=30000-32767 \\
  --tls-cert-file=/var/lib/kubernetes/kubernetes.pem \\
  --tls-private-key-file=/var/lib/kubernetes/kubernetes-key.pem \\
  --v=2
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

{{< / highlight >}}
```

>**Note**: You may use --experimental-encryption-provider-config=/var/lib/kubernetes/encryption-config.yaml flag for secrets encryption, but you should be **aware**: this feature is quite experimental.

#### Configure Kubernetes Controller Manager

Move `kube-controller-manager.kubeconfig`

```bash
{{< highlight bash >}}

sudo mv kube-controller-manager.kubeconfig /var/lib/kubernetes/

{{< / highlight >}}
```

Create the `kube-controller-manager.service` systemd unit file:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/systemd/system/kube-controller-manager.service
[Unit]
Description=Kubernetes Controller Manager
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-controller-manager \\
  --address=0.0.0.0 \\
  --cluster-cidr=10.200.0.0/16 \\
  --cluster-name=kubernetes \\
  --cluster-signing-cert-file=/var/lib/kubernetes/ca.pem \\
  --cluster-signing-key-file=/var/lib/kubernetes/ca-key.pem \\
  --kubeconfig=/var/lib/kubernetes/kube-controller-manager.kubeconfig \\
  --leader-elect=true \\
  --root-ca-file=/var/lib/kubernetes/ca.pem \\
  --service-account-private-key-file=/var/lib/kubernetes/service-account-key.pem \\
  --service-cluster-ip-range=10.32.0.0/24 \\
  --use-service-account-credentials=true \\
  --v=2
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

{{< / highlight >}}
```

#### Configure Kubernetes Scheduler

Move `kube-scheduler.kubeconfig`:

```bash
{{< highlight bash >}}

sudo mv kube-scheduler.kubeconfig /var/lib/kubernetes/

{{< / highlight >}}
```

Create the `kube-scheduler.yaml` configuration file:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/kubernetes/config/kube-scheduler.yaml
apiVersion: componentconfig/v1alpha1
kind: KubeSchedulerConfiguration
clientConnection:
  kubeconfig: "/var/lib/kubernetes/kube-scheduler.kubeconfig"
leaderElection:
  leaderElect: true
EOF

{{< / highlight >}}
```

Create the `kube-scheduler.service` systemd unit file:

```bash
{{< highlight bash >}}

cat <<EOF | sudo tee /etc/systemd/system/kube-scheduler.service
[Unit]
Description=Kubernetes Scheduler
Documentation=https://github.com/kubernetes/kubernetes

[Service]
ExecStart=/usr/local/bin/kube-scheduler \\
  --config=/etc/kubernetes/config/kube-scheduler.yaml \\
  --v=2
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

{{< / highlight >}}
```

#### Launch Controller Services
Run:

```bash
{{< highlight bash >}}

sudo systemctl daemon-reload
sudo systemctl enable kube-apiserver kube-controller-manager kube-scheduler
sudo systemctl start kube-apiserver kube-controller-manager kube-scheduler

{{< / highlight >}}
```

> It can take about 10 seconds or more to initialize the Kubernetes API Server.

#### Enable HTTP Health Checks

[Google Network Load Balancer](https://cloud.google.com/compute/docs/load-balancing/network) will be used to configure the network between the three API servers. It will allow each of them to terminate TLS connection and validate client certificates.
 Network Load Balancer supports only HTTP health checks, HTTPS is not supported. This can be fixed with nginx which will serve as a proxy. Install and configure nginx to accept health checks on port 80 and proxy the request to `https://127.0.0.1:6443/healthz`.

> The `/healthz` endpoint doesn't require authorization.


Execute below command to add `epel-release` repo:

```bash
{{< highlight bash >}}

sudo yum install epel-release

{{< / highlight >}}
```

Install nginx:

```bash
{{< highlight bash >}}

sudo yum install -y nginx

{{< / highlight >}}
```

Add the following lines to `/etc/nginx/nginx.conf`:

```
server {
  listen      80;
  server_name kubernetes.default.svc.cluster.local;

  location /healthz {
     proxy_pass                    https://127.0.0.1:6443/healthz;
     proxy_ssl_trusted_certificate /var/lib/kubernetes/ca.pem;
  }
}
```

```bash
{{< highlight bash >}}

sudo setsebool -P httpd_can_network_connect=on
sudo systemctl restart nginx
sudo systemctl enable nginx

{{< / highlight >}}
```

#### Verification
Run:

```bash
{{< highlight bash >}}

kubectl get componentstatuses --kubeconfig admin.kubeconfig

{{< / highlight >}}
```

> Output:

```
NAME                 STATUS    MESSAGE              ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-2               Healthy   {"health": "true"}
etcd-0               Healthy   {"health": "true"}
etcd-1               Healthy   {"health": "true"}
```

Verify the nginx HTTP health check:

```bash
curl -H "Host: kubernetes.default.svc.cluster.local" -i http://127.0.0.1/healthz
```

> Output:

```
HTTP/1.1 200 OK
Server: nginx/1.14.0 (Ubuntu)
Date: Mon, 14 May 2018 13:45:39 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 2
Connection: keep-alive

ok
```

> Don't forget to run all commands on each node.

### RBAC for Kubelet Authorization

Configure RBAC permissions that will allow Kubernetes API Server to access Kubelet API on each worker node. Access to Kubelet API is required to get metrics, logs, and execute commands in pods.

Create `system:kube-apiserver-to-kubelet` [ClusterRole](https://kubernetes.io/docs/admin/authorization/rbac/#role-and-clusterrole), allow access to Kubelet API and execute the key tasks associated with managing pods:

```bash
{{< highlight bash >}}

cat <<EOF | kubectl apply --kubeconfig admin.kubeconfig -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRole
metadata:
  annotations:
    rbac.authorization.kubernetes.io/autoupdate: "true"
  labels:
    kubernetes.io/bootstrapping: rbac-defaults
  name: system:kube-apiserver-to-kubelet
rules:
  - apiGroups:
      - ""
    resources:
      - nodes/proxy
      - nodes/stats
      - nodes/log
      - nodes/spec
      - nodes/metrics
    verbs:
      - "*"
EOF


{{< / highlight >}}
```

Kubernetes API authenticates to kubelet as `kubernetes` user, using the client certificate defined by the `--kubelet-client-certificate` flag.

Bind the `system:kube-apiserver-to-kubelet` ClusterRole for the `kubernetes` user:

```bash
{{< highlight bash >}}

cat <<EOF | kubectl apply --kubeconfig admin.kubeconfig -f -
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: system:kube-apiserver
  namespace: ""
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:kube-apiserver-to-kubelet
subjects:
  - apiGroup: rbac.authorization.k8s.io
    kind: User
    name: kubernetes
EOF


{{< / highlight >}}
```

#### Verification

Make an HTTP request to print Kubernetes version:

```bash
curl --cacert ca.pem https://${KUBERNETES_PUBLIC_ADDRESS}:6443/version
```

Output:

```json
{
  "major": "1",
  "minor": "10",
  "gitVersion": "v1.10.2",
  "gitCommit": "81753b10df112992bf51bbc2c2f85208aad78335",
  "gitTreeState": "clean",
  "buildDate": "2018-04-27T09:10:24Z",
  "goVersion": "go1.9.3",
  "compiler": "gc",
  "platform": "linux/amd64"
}
```

Done!

Now you can proceed to [bootstrapping worker nodes](/kubernetes/installation/6bootstrap-workers).
