---
title: Kubernetes Bootstrap Controllers - Containerum
linktitle: Installation
description: Bootstrap Controllers

categories: []
keywords: []

menu:
  docs:
    parent: "installation"
    weight: 7

draft: false
---

# Запуск Kubernetes Control Plane

В данном разделе будет описан процесса запуска Kubernetes Control Plane на 3 машинах и настройки их под обеспечение высокой доступности. Также будет продемонстрирован процесс создания внешнего балансировщика нагрузки, который откроет Kubernetes API во внешнюю сеть для подключения удаленных клиентов. На каждой ноде будут установлены следующие компоненты: Kubernetes API Server, Scheduler, Controller Manager.

## Подготовка

Команды должны выполняться на всех контроллерах.

## Подготовка Kubernetes Control Plane

Создаем директорию для файлов конифигураций Kubernetes:

```bash
sudo mkdir -p /etc/kubernetes/config
```

### Скачиваем и устанавливаем официальные бинарники Kubernetes

```bash
wget "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-apiserver" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-controller-manager" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kube-scheduler" \
  "https://storage.googleapis.com/kubernetes-release/release/v1.10.2/bin/linux/amd64/kubectl"
```

```bash
{
  chmod +x kube-apiserver kube-controller-manager kube-scheduler kubectl
  sudo mv kube-apiserver kube-controller-manager kube-scheduler kubectl /usr/local/bin/
}
```

### Конфигурируем Kubernetes API Server

```bash
{
  sudo mkdir -p /var/lib/kubernetes/

  sudo mv ca.pem ca-key.pem kubernetes-key.pem kubernetes.pem \
    service-account-key.pem service-account.pem \
    encryption-config.yaml /var/lib/kubernetes/
}
```

Внутренний IP-адрес машины будет использован чтобы объявлять API сервер членом кластера и должен быть объявлен в переменной `INTERNAL_IP`.

Создаем юнит systemd `kube-apiserver.service`:

```bash
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
  --etcd-servers=https://${NODE1_INTERNAL_IP}:2379,https://${NODE2_INTERNAL_IP}:2379,https://${NODE3_INTERNAL_IP}:2379 \\
  --event-ttl=1h \\
  --experimental-encryption-provider-config=/var/lib/kubernetes/encryption-config.yaml \\
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
```

### Конфигурируем Kubernetes Controller Manager

Перемещаем `kube-controller-manager.kubeconfig`

```bash
sudo mv kube-controller-manager.kubeconfig /var/lib/kubernetes/
```

Созадем юнит systemd `kube-controller-manager.service`:

```bash
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
```

### Конфигурируем Kubernetes Scheduler

Перемещаем `kube-scheduler.kubeconfig`:

```bash
sudo mv kube-scheduler.kubeconfig /var/lib/kubernetes/
```

Создаем файл конфигурации `kube-scheduler.yaml`:

```bash
cat <<EOF | sudo tee /etc/kubernetes/config/kube-scheduler.yaml
apiVersion: componentconfig/v1alpha1
kind: KubeSchedulerConfiguration
clientConnection:
  kubeconfig: "/var/lib/kubernetes/kube-scheduler.kubeconfig"
leaderElection:
  leaderElect: true
EOF
```

Создаем юнит systemd `kube-scheduler.service`:

```bash
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
```

### Запускаем Controller Services

```bash
{
  sudo systemctl daemon-reload
  sudo systemctl enable kube-apiserver kube-controller-manager kube-scheduler
  sudo systemctl start kube-apiserver kube-controller-manager kube-scheduler
}
```

> Инициализация Kubernetes API Server может занять около 10 секунд или болеее.

### Включение HTTP Health Checks

С помощью [Google Network Load Balancer](https://cloud.google.com/compute/docs/load-balancing/network) будет настроена сеть между тремя серверами API и позволит каждому из них устанавливать TLS соединения и подтверждать клиентские сертификаты. Network Load Balancer поддерживает только HTTP health check, HTTPS не поддерживается. Это можно исправить с помощью nginx, который будет использоваться как прокси. Установим и сконфигурируем nginx так, чтобы он мог принимать запрости health check на 80-й порт и проксировал запрос на `https://127.0.0.1:6443/healthz`.

> Эндпоинт `/healthz` не запрашивает авторизации.

Устанавливаем nginx:

```bash
sudo yum install -y nginx
```

В `/etc/nginx/nginx.conf` добавляем следующее:

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
sudo setsebool -P httpd_can_network_connect=on
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Проверка

```bash
kubectl get componentstatuses --kubeconfig admin.kubeconfig
```

```
NAME                 STATUS    MESSAGE              ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-2               Healthy   {"health": "true"}
etcd-0               Healthy   {"health": "true"}
etcd-1               Healthy   {"health": "true"}
```

Проверим прокси nginx HTTP health check:

```bash
curl -H "Host: kubernetes.default.svc.cluster.local" -i http://127.0.0.1/healthz
```

```
HTTP/1.1 200 OK
Server: nginx/1.14.0 (Ubuntu)
Date: Mon, 14 May 2018 13:45:39 GMT
Content-Type: text/plain; charset=utf-8
Content-Length: 2
Connection: keep-alive

ok
```

> Эти команды нужно выполнять на каждой ноде.

## RBAC for Kubelet Authorization

## Настройка RBAC для авторизации в kubelet

Настройка прав доступа RBAC, которая позволяет Kubernetes API Server получать доступ к Kubelet API на каждой ноде слейвов. Доступ к Kubelet API необходим для пллучения метрик, логов и запуска команд в подах.

Создаем `system:kube-apiserver-to-kubelet` [ClusterRole](https://kubernetes.io/docs/admin/authorization/rbac/#role-and-clusterrole) с разрешением доступа к Kubelet API и выполняем основные задачи связанные с управлением подами:

```bash
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
```

Kubernetes API аутентифицируется в kubelet как пользователь `kubernetes`, используя клиентский сертификат определяемый флагом `--kubelet-client-certificate`.

Назначим `system:kube-apiserver-to-kubelet` ClusterRole для пользователя`kubernetes`:

```bash
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
```

### Проверка

Сделайте HTTP запрос для получении версии Kubernetes:

```bash
curl --cacert ca.pem https://${KUBERNETES_PUBLIC_ADDRESS}:6443/version
```

Вывод:

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