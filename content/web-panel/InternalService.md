---
title: Internal Service - Containerum
linktitle: Internal Service
description: How to create, update, view and delete an Internal service.

categories: []
keywords: []

menu:
  docs:
    parent: "web-panel"
    weight: 2

draft: false
---

# How to work with an Internal Service

Service is an object, used by applications for communication with each other within Containerum ecosystem or with external applications. A service can be internal or external. An internal service connects deployments by the internal
network of Kubernetes.

## Create

 To create an Internal service for a Deployment, choose an existing Project, go to Services section and click on the `Create` button.

<img src="/img/content/web-panel/InternalService/services.png" width="100%"/>

Please note, that each service has to be linked to a particular deployment. If there are no deployments in your project yet, you have to [create a deployment](web-panel/deployment) first.

Select a Deployment, then click on the `INTERNAL SERVICE` switch and fill in the fields:
<ul>
    <li>
        Name
    </li>
    <li>
      Port - for an internal service it is a port,
      that allows current deployment to communicate with another deployment within the cluster.  
    </li>
    <li>
      Target port - Internal port. The port of the target deployment that has to be connected with the current deployment.
      In Dockerfile this is a port from EXPOSE instruction  
    </li>
    <li>
        Port protocol
    </li>
</ul>

<img src="/img/content/web-panel/InternalService/createService.png" width="100%"/>


## View

You can view all services in the services tab (`/projects/:idNamespace/services`).

<img src="/img/content/web-panel/getServicesList.png" width="100%"/>

You can also click on a service and see detailed information like ports and linked deployments. (`/project/:idNamespace/services/:serviceName`).

<img src="/img/content/web-panel/InternalService/servicePage.png" width="100%"/>


## Update
You can update any service by clicking `Update` in the context menu on the Services tab or on a page with detailed information about the service.

<img src="/img/content/web-panel/callContextServiceMenuUpdate.png" width="100%"/>

You can change port parameters, delete or add new ports.

<img src="/img/content/web-panel/InternalService/updateService.png" width="100%"/>

After changing the required information, click on `UPDATE SERVICE`.

## Delete

You can Delete a service by clicking `Delete` in the context menu on the Services tab or on a page with detailed information about the service.

<img src="/img/content/web-panel/callContextServiceMenuDelete.png" width="100%"/>

Please, note: by clicking `Delete` you will delete the service immediately. This action cannot be undone.

# Connections and dependencies

When you delete an Internal Service you will also delete the connection between the deployments that were linked by this service.

Connections: specify correct ports of deployments to be connected.
Dependencies: project and deployment are required.
