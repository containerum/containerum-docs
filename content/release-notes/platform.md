---
title: Platform release notes
linktitle: Containerum Platform
description: Release notes for Containerum Platform

date: 2018-08-21

categories: ["top"]
keywords: []

menu:
  docs:
    parent: "release-notes"
    weight: 2

weight: 2
draft: false
---


# Containerum Platform Release Notes  

## Containerum 1.2.0 - released on 4.09.2018  

### New features

#### Import cluster to Containerum

Now Containerum Platform can import and manage Kubernetes resources. It means that namespaces, deployments, etc. that had already been created in Kubernetes clusters before Containerum Platform installation can be managed via Containerum. To import the resources go to `Settings` and click `Import`. You can specify which namespaces should not be imported by the following parameter during installation via Helm:
```
--set kube-importer.env.global.CH_KUBE_IMPORTER_EXCLUDED_NS="default,kube-system"
```

#### Mail templates

It is possible to connect an smtp server to use mail templates. By default Containerum Platform features five templates: registration confirmation, account activation, password change, password reset, and account deletion.


#### Prometheus-operator requirement removed

Now Containerum Platform doesn't require prometheus-operator for metrics.  

To enable node utilizatin metrics you can install Prometheus with Containerum or use a Prometheus instance that has already been deployed in your cluster. Containerum Platform is compatible with Prometheus `6.7.4` from the official Helm repository. To enable your Prometheus set the following tag when installing Containerum Platform:
```
--set nodemetrics.env.local.PROMETHEUS_ADDR=http://{PROMETHEUS_SVC_NAME}:{PROMETHEUS_SVC_PORT}
```

#### Warnings

Containerum Platform informs users in case an External IP or Storage have not been configured when attempting to create a Service or a Volume accordingly.

#### Groups

When adding members to groups, Admin users can choose members from the list of existing users.

### Bug fixes

- Icon failure from solution page removed
- Check free space on storage - added
- Used Storage calculation - fixed
- Ingress host validation - fixed
- Active button from volume tab on project page for the role "user" - removed

## Containerum 1.1.0 - released on 21.08.2018  

### New features

#### Solutions

Now users can add their solutions to Containerum Platform. Solutions are pre-configured applications and application stacks that can be launched with a couple of clicks. Only admin users can add and delete solutions, but any user can launch them.

- Only an admin user can add a solution to the Platform. To do this, it is necessary to set a name, the path to a public repository on GitHub, add solution description in README.md and a .png image that will be used as a logo. The image name must be the same as the repo name, e.g. 'Grafana-Solution' and 'Grafana-Solution.png'. [Read more.](/manuals/solution)  

- Any user can see the list of all solutions on the Solutions tab.   

- Any user can view launched Solutions on the Project page.  

- Any user with `write` permission can launch solutions from both the list of solutions and solution pages. To launch a solution it is necessary to choose the Project, where it will be launched, and a name, which will be displayed on the Solutions tab in the Project. Users can also change any variable before launching the solution.  

- Solution templates can be deleted on the Solutions tab by admin user.  

- Any user with `write` permission can delete a launched Solution. Deleting a Solution also deletes all deployments and services associated with it.

#### Volumes

Current release introduces Volume management. A Volume in Containerum Platform is a PersistentVolumeClaim in Kubernetes. To use Volumes, it is required to have a StorageClass and connect it to Containerum Platform on the Settings page.  

- Storage can only be added by admin user. To do it, enter the size and name of the corresponding StorageClass in Kubernetes.  

- The list of connected Storage instances is available on the Setting page. You can view their names, size and space utilization.  


- Only admin users can create Volumes. Like a majority of Containerum Platform objects, Volumes exist within a Project. To create a Volume it is necessary to enter its name, size and the Storage it will use.  

- The list of Volumes is available to all users with `write` permission in a Project. It is possible to choose one or several Volumes and mount them to containers. It allows saving application data when an app is restarted.  

- Only admin user can upgrade and Volume size. Downgrading is not supported.  

- Volumes can be deleted by an admin user on the Volumes tab.  

- Storage instance can be deleted on the Settings page provided that there are no running Volumes that use this Storage.

#### Metrics

Aggregated node metrics are now available on the Dashboard. Users can view current CPU, RAM and Storage utilization as well as resource usage history for the last 6 hours. Resource utilization per each node can be accessed on the Per Nodes page on the Dashboard. Users can also see both the current usage and the history for the last 6 hours.

### Bug fixes

- PostgreSQL Migration conflicts - fixed
- User deactivation by admin user - fixed
- Settings page in non-admin account - fixed
- Routes in the Tour section on the Dashboard page - updated
