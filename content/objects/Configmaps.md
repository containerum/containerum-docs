---
title: Configmaps - Containerum
linktitle: Configmaps
description: How to create, update, view and delete a Configmaps.

categories: []
keywords: []

menu:
  docs:
    parent: "objects"
    weight: 8

draft: false
---

# How to work with a Configmap

## Description

Configmap is an object that is basically a key-value storage. It can contain any text data, for example, configuration artifacts, certificates, keys or environment variables. Configmap data is stored without any encryption, so you should only add the data that does not have additional security requirements.

## Create
To create a ConfigMap, choose an existing Project, go to ConfigMaps section and click on the `Create` button.
<img src="/img/content/objects/Configmaps/projectConfigmaps.png" width="100%"/>

You can also create a ConfigMap by clicking `ConfigMaps` in the `TOOLS` tab on the Dashboard.
<img src="/img/content/objects/Configmaps/configmapTools.png" width="100%"/>

Заполните поле `Name of ConfigMap`
Файл для вашей конфигмапы вы можете добавить вручную заполнив поля `Имя файла` и `Конфигурация`. Вы можете добавить несколько файлов нажав кнопку `+FILE`. Также вы можете загрузить готовый файл с конфигурацией нажав кнопку `Add File`.
<img src="/img/content/objects/Configmaps/createConfigmap.png" width="100%"/>

Then click on the `Create ConfigMap`. Done.

## View

You can view your Configmaps in the `ConfigMaps` tab on the `Project` page:

<img src="/img/content/objects/Configmaps/viewConfigmaps.png" width="100%"/>

You can also view the ConfigMaps across **all** projects on the `ConfigMaps` page (`/tools => /configmap`):

<img src="/img/content/objects/Configmaps/globalViewConfigmaps.png" width="100%"/>

## Update

Once created, a ConfigMap cannot be updated.

## Delete

To delete a ConfigMap go to the ConfigMaps tab on the `Project` page and click `Delete` in the context menu of the ConfigMap you want to delete.

<img src="/img/content/objects/Configmaps/deleteConfigmap.png" width="100%"/>

You can also delete Configmaps on the `Configmaps` page (`/tools => /configmap`).

<img src="/img/content/objects/Configmaps/globalDeleteConfigmap.png" width="100%"/>
