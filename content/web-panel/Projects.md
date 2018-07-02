---
title: Project - Containerum
linktitle: Project
description: How to create, update, view and delete an Project.
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

# How to work with an Project

Project is the main object of Containerum system.
To create a project a user needs to allocate RAM and CPU 
resources to the project. With Containerum self-hosted a 
user can allocate as much of the available server resources
as necessary. Containerum Online offers several preconfigured 
options (custom configurations available upon request).
All other system objects (deployments, services, etc.) 
exist only within a Project. As part of teamwork, 
project owners can share their projects with other users 
and set access levels to create new software together.

## Create

Если у вас еще нет ни одного проета нажмите create project на Dashboard

<img src="/img/content/web-panel/project/createProjectDashboard.png" width="100%"/>

or зайти на вкладку project главного меню и там добавьте проект

<img src="/img/content/web-panel/project/createProject.png" width="100%"/>

Далее выберите подходящий объём ресурсов для вашего проекта

<img src="/img/content/web-panel/project/size.png" width="100%"/>

Вот и всё, вы создали свой проект.

## View

Список всех ваших проектов вы можете видеть на Dashboard

<img src="/img/content/web-panel/project/projectsDashboard.png" width="100%"/>

or на вкладке projects главного меню

<img src="/img/content/web-panel/project/projects.png" width="100%"/>

## Update 

Вы можете изменить размер используемых ресурсов проекта, выбрав 
соответствующий пункт меню  либо на Dashboard 

<img src="/img/content/web-panel/project/resizeDashboard.png" width="100%"/>

либо на вкладке project главного меню 

<img src="/img/content/web-panel/project/resizeProjects.png" width="100%"/>

либо на странице самого проекта

<img src="/img/content/web-panel/project/resizeProject.png" width="100%"/>

далее выберете новый размер ресурсов.

## Delete

Удалить проект вы можете либо на вкладке project главного меню 

<img src="/img/content/web-panel/project/resizeProjects.png" width="100%"/>

либо на странице самого проекта

<img src="/img/content/web-panel/project/resizeProject.png" width="100%"/>

После удаления проекта удаляются все принадлежащие ему Deployments,
Services, Domains, Configmaps and Solutions.