---
title: Internal Service - Containerum
linktitle: Internal Service
description: How to create, update, view and delete an Internal service.
description:

categories: []
keywords: []

menu:
  docs:
    parent: "web-panel"
    weight: 2
    weight: 3

draft: false
---

# How to work with an Internal Service

Service is an object, used by applications for communication with each other within Containerum ecosystem or with external applications. A service can be internal or external. An internal service connects deployments by the internal
network of Kubernetes.
To create a Service a project and a deployment are required.

### Create

 To create an Internal service for a Deployment, choose an existing Project, go to Services section and click on the `Create` button.

<img src="/img/content/web-panel/InternalService/services.png" width="100%"/>

Please note, that each service has to be linked to a particular deployment. If there are no deployments in your project yet, you have to [create a deployment](web-panel/deployment) first.

Select a Deployment, then click on the `INTERNAL SERVICE` switch and fill in the fields:
<ul>
    <li>
        Name (example: my-1-internal-service)
    </li>
    <li>
      Port - for an internal service it is a port,
      that allows current deployment to communicate with another deployment within the cluster (example: 8080)  
    </li>
    <li>
      Target port - Internal port. The port of the target deployment that has to be connected with the current deployment.
      In Dockerfile this is a port from EXPOSE instruction (example: 80)  
    </li>
    <li>
        Port protocol (example: TCP)
    </li>
</ul>

<img src="/img/content/web-panel/InternalService/createService.png" width="100%"/>


### View
You can view all services in the services tab (`/projects/:idNamespace/services`).

<img src="/img/content/web-panel/InternalService/services.png" width="100%"/>

You can also click on a service and see detailed information like ports and linked deployments. (`/project/:idNamespace/services/:serviceName`).

<img src="/img/content/web-panel/InternalService/servicePage.png" width="100%"/>


### Update
You can update any service by clicking `Update` in the context menu on the Services tab or on a page with detailed information about the service.

<img src="/img/content/web-panel/InternalService/updateInternalService.png" width="100%"/>

You can change port parameters, delete or add new ports.

<img src="/img/content/web-panel/InternalService/updateService.png" width="100%"/>

After changing the required information, click on `UPDATE SERVICE`.

### Delete
You can Delete a service by clicking `Delete` in the context menu on the Services tab or on a page with detailed information about the service.

<img src="/img/content/web-panel/InternalService/updateInternalService.png" width="100%"/>

Please, note: by clicking `Delete` you will delete the service immediately. This action cannot be undone.
When you delete an Internal Service you will also delete the connection between deployments that were linked by this service.
# How to create Internal Service

Internal Service

Service is an object,
 used by applications for communication 
 with each other within Containerum ecosystem or with 
 external applications. A service can be internal or external.
 An internal service connects deployments by the internal
network of Kubernetes.

## Create

Для того чтобы создать внутренний сервис, перейдите на вкладку Services
проекта в котором вы работаете.

<img src="/img/content/web-panel/InternalService/services.png" width="100%"/>

Здесь отображаются как внутренние, так и внешние сервисы проекта.

Далее нажмите кнопку Create.Вы перейдете на страницу создания сервисов.

<img src="/img/content/web-panel/InternalService/createService.png" width="100%"/>

Обратите внимаение, какой бы вы сервис не захотели создать, он должен будет 
привязан к какому-либо deployment. Так что если в вашем проекте еще нет 
ни одного deployment, нужно сначала <a href="">создать deployment</a> ,а далее переходить
к созданию сервиса.

Теперь выберете deployment или оставьте его по-умолчанию, заполните следующие поля:

<ul>
    <li>
        Name
    </li>
    <li>
      Port - for an internal service it is a port,
      that allows a chosen deployment to communicate with another deployment within the cluster.  
    </li>
    <li>
      Target port - Internal port. The port of deployment, where a running app is launched.
      In Dockerfile this is a port from EXPOSE instruction  
    </li>
    <li>
        Port protocol
    </li>
</ul>

## View 

После создания перейдем страницу сервиса. Тут две вкладки - ports and linked deployment.

<img src="/img/content/web-panel/InternalService/servicePage.png" width="100%"/>

## Update 

При обновлении вам будет предложенно изменить параметры порта, а также
добавитьили удалить порты.

<img src="/img/content/web-panel/InternalService/updateService.png" width="100%"/>

## Delete

После удаления внутреннего сервиса разорвется связь между deployments, 
которые он соединял.
