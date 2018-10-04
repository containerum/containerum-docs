---
title: Volumes - Containerum
linktitle: Volumes
description: How to create, update, view and delete a Volumes.

categories: []
keywords: []

menu:
  docs:
    parent: "objects"
    weight: 9

draft: false
---

# How to work with a Volume
## Description
Вольюм нужен для хранения информации, чтобы данные не терялись при перезапуске деплоймента

## Requirements
Для создания вольюма нужны проект и storage

## Create
To create a Volume, choose an existing Project, go to Volumes section and click on the `Create` button.
<img src="/img/content/objects/Volumes/projectVolumes.png" width="100%"/>

Выберите storage и введите размер вольюма  
<img src="/img/content/objects/Volumes/createVolume.png" width="100%"/>

Then click on the `Create Volume`. Done.

## View

You can view your Volumes in the `Volumes` tab on the `Project` page:

<img src="/img/content/objects/Volumes/viewVolumes.png" width="100%"/>


## Update

To resize a Volume, choose an existing Project, go to Volumes section and click `Resize` in the context menu of the Volume you want to resize.

<img src="/img/content/objects/Volumes/callContextVolumeMenuResize.png" width="100%"/>

## Delete

To delete a Volume, choose an existing Project, go to Volumes section and click `Resize` in the context menu of the Volume you want to delete.

<img src="/img/content/objects/Volumes/callContextVolumeMenuDelete.png" width="100%"/>
