# Variables

## IP addresses

- `KUBERNETES_PUBLIC_IP` is an IP address of Kubernetes load balancer in a public network. In the case of one node it have a value of `EXTERNAL_IP` of master node
<!-- - `PUBLIC_IP` is equal to `KUBERNETES_PUBLIC_IP` -->
- `EXTERNAL_IP` is an IP address of instance in external network
- `INTERNAL_IP` is an IP address of instance in internal network
- `MASTER_NODES_IP` is a sequence of all IP addresses of master nodes. In the case of the only node have a value of `EXTERNAL_IP` of master node.
- `ETCD_NODE_IP` is an IP address of etcd node. In the case of multiple etcd node it may be declared as `ETCD_NODE-1_IP`, `ETCD_NODE-2_IP` etc.

- `POD_CIDR` is a range of IP addresses for pods

## Hostnames

- `HOSTNAME` is the hostname of the node.
- `NODE_NAME` is the name of node. Most of all equals to `HOSTNAME`
- `ETCD_NAME` is the hostname of instance, on which etcd have been installed