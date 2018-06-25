---
title: Internal Service - Containerum
linktitle: Internal Service
description:

categories: []
keywords: []

menu:
  docs:
    parent: "web-panel"
    weight: 3

draft: false
---

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
Вы можете обновить или удалить сервис.

При обновлении вам будет предложенно изменить параметры порта, а также
добавитьили удалить порты.

<img src="/img/content/web-panel/InternalService/updateService.png" width="100%"/>

## Delete

После удаления внутреннего сервиса разорвется связь между deployments, 
которые он соединял.
