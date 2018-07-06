---
title: Bootstrapping Controllers
linktitle: Bootstrap Controllers
description: Bootstrapping Kubernetes Control Plane and configuring high availability.

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 6

draft: false
---

# Launch Kubernetes Control Plane

The following components should be installed on each master node: Kubernetes API Server, Scheduler, Controller Manager.

> **Don't forget to run all commands on all master nodes.**

> **Note**: In the case of launching on the one host PUBLIC_KUBERNETES_IP(IP address of kubernetes load balancer) can be replaced to MASTER_IP

### Prepare Kubernetes Control Plane

Create a directory for Kubernetes configuration files:

```bash
{{< highlight bash >}}

sudo mkdir -p /etc/kubernetes/config

{{< / highlight >}}
```

#### Install Kubernetes master node meta-package
Run:

```bash
{{< highlight bash >}}

sudo yum install kubernetes-master-meta

{{< / highlight >}}
```

#### Configure the Kubernetes API Server

```bash
{{< highlight bash >}}

sudo cp ca.crt ca.key kubernetes.crt kubernetes.key \
  service-account.crt service-account.key \
  encryption-config.yaml /etc/kubernetes/pki/

{{< / highlight >}}
```

Examine the default kube-apiserver.service systemd unit with `systemctl cat kube-apiserver.service`.
If you know the default flags don’t match your setup, copy the unit into `/etc/systemd/system/kube-apiserver.server` and make your changes there.

Otherwise, just update the `/etc/sysconfig/kube-apiserver` file with appropriate IP addresses.

The node internal IP address will be used to manifest the API server as a cluster member. It must be set in `ADVERTISE_ADDRESS` variable.

>**Note**: You may use --experimental-encryption-provider-config=/var/lib/kubernetes/encryption-config.yaml flag for secrets encryption, but you should be **aware**: this feature is quite experimental.

#### Configure Kubernetes Controller Manager

Move `kube-controller-manager.kubeconfig`

```bash
{{< highlight bash >}}

sudo mv kube-controller-manager.kubeconfig /etc/kubernetes

{{< / highlight >}}
```

Modify default values in `/etc/sysconfig/kube-controller-manager`.

#### Configure Kubernetes Scheduler

Move `kube-scheduler.kubeconfig`:

```bash
{{< highlight bash >}}

sudo mv kube-scheduler.kubeconfig /etc/kubernetes

{{< / highlight >}}
```

#### Launch Controller Services
Run:

```bash
{{< highlight bash >}}

sudo systemctl enable kube-apiserver kube-controller-manager kube-scheduler
sudo systemctl start kube-apiserver kube-controller-manager kube-scheduler

{{< / highlight >}}
```

> It can take about 10 seconds or more to initialize the Kubernetes API Server.

#### Enable HTTP Health Checks

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
     proxy_ssl_trusted_certificate /var/lib/kubernetes/ca.crt;
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
curl --cacert ca.crt https://${KUBERNETES_PUBLIC_IP}:6443/version
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

Now you can proceed to [configuring kubectl](/kubernetes/installation/6configure-kubectl).

