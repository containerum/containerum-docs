---
title: External Service - Containerum
linktitle: External Service
description:

categories: []
keywords: []

menu:
  docs:
    parent: "web-panel"
    weight: 5

draft: false
---

# How to work with an External Service
- External service
- Service is an object, used by applications for communication with each other within Containerum ecosystem or with
    external applications. A service can be internal or external. An internal service connects deployments
    by the internal network of Kubernetes. External services allow users to access the deployment from the Internet.
    Each service can have several ports using TCP or UDP protocol.

- CRUD
    - Create
    
        To create an External service, you must go to an existing project, under the Services section and click the Create button.
        <img src="/img/content/web-panel/serviceInNS.png" width="100%"/>
        Select Deployment, then click on the EXTERNAL SERVICE switch and fill in the fields:
        - Service Name: helloworld-external-service
        - Ports Name: helloworld-port
        - Protocol type: TCP
        <img src="/img/content/web-panel/createExternalService.png" width="100%"/>
        Then click on the Create Service. Done
    - View
    
        You can View service in list of services (/projects/:idNamespace/services)
        <img src="/img/content/web-panel/getServicesList.png" width="100%"/>
        and specific service (/project/:idNamespace/services/:serviceName)
        <img src="/img/content/web-panel/getService.png" width="100%"/>
    - Update
    
        You can Update service in list of services or specific service, call the context menu
        or specific service and click update.
        <img src="/img/content/web-panel/callContextServiceMenuUpdate.png" width="100%"/>
        Then you will see the service update page.
        <img src="/img/content/web-panel/updateExternalService.png" width="100%"/>
        Changing all the required fields, click on UPDATE SERVICE
    - Delete
    
        You can Delete service in list of services or specific service, call the context menu
        or specific service and click delete.
        <img src="/img/content/web-panel/callContextServiceMenuDelete.png" width="100%"/>
        Attention! Deleting will happened immediately irrevocably.
- How to delete and where it leads

    If you delete External service, then you can not see what service is being thrown by the deployment
    on a certain port
- Connections and dependencies

    Connections: correct configuration of the deployment port, for correct operation
    
    Dependencies: project and deployment availability