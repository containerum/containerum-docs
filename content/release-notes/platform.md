---
title: Platform release notes
linktitle: Containerum Platform
description: Release notes for Containerum Platform

date: 2017-03-23

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

## Containerum 1.0.20 - released on 21.08.2018  

### New features

-  **Solutions**  

Now users can add their solutions to Containerum Platform. Solutions are pre-configured applications and application stacks that can be launched with a couple of clicks. Only admin users can add and delete solutions, but any user can launch them.

- Only an admin user can add a solution to the Platform. To do this, it is necessary to set a name, the path to a public repository on GitHub, add solution description in README.md and a .png image that will be used as a logo. The image name must be the same as the repo name, e.g. 'Grafana-Solution' and 'Grafana-Solution.png'. [Read more.](/manuals/solution)  

- Any user can see the list of all solutions on the Solutions tab.   

- Any user can view launched Solutions on the Project page.  

- Any user with `write` permission can launch solutions from both the list of solutions and solution pages. To launch a solution it is necessary to choose the Project, where it will be launched, and a name, which will be displayed on the Solutions tab in the Project. Users can also change any variable before launching the solution.  

- Solution templates can be deleted on the Solutions tab by admin user.  

- Any user with `write` permission can delete a launched Solution. Deleting a Solution also deletes all deployments and services associated with it.

- **Volumes**

Current release introduces Volume management. A Volume in Containerum Platform is a PersistentVolumeClaim in Kubernetes. To use Volumes, it is required to have a StorageClass and connect it to Containerum Platform on the Settings page.  

- Storage can only be added by admin user. To do it, enter the size and name of the corresponding StorageClass in Kubernetes.  

- The list of connected Storage instances is available on the Setting page. You can view their names, size and space utilization.  

- Only admin users can create Volumes. Like a majority of Containerum Platform objects, Volumes exist within a Project. To create a Volume it is necessary to enter its name, size and the Storage it will use.  

- The list of Volumes is available to all users with `write` permission in a Project. It is possible to choose one or several Volumes and mount them to containers. It allows saving application data when an app is restarted.  

- Only admin user can upgrade and Volume size. Downgrading is not supported.  

- Volumes can be deleted by an admin user on the Volumes tab.  

- Storage instance can be deleted on the Settings page provided that there are no running Volumes that use this Storage.

#### Email templates  

This release comes with standard email templates. They include registration confirmation, user activation, password reset and account deletion. To use them it is necessary to [connect an SMTP server.](/configuration/smtp_server)

#### Metrics

Aggregated node metrics are now available on the Dashboard. Users can view current CPU, RAM and Storage utilization as well as resource usage history for the last 6 hours. Resource utilization per each node can be accessed on the Per Nodes page on the Dashboard. Users can also see both the current usage and the history for the last 6 hours.

### Bug fixes

- PostgreSQL Migration conflicts - fixed
- User deactivation by admin user - fixed
- Settings page in non-admin account - fixed
- Routes in the Tour section on the Dashboard page - updated
