---
title: Setting external IP - Containerum
linktitle: Set external IP
description: How to set node's external IP address.

categories: []
keywords: []

menu:
  docs:
    parent: "configuration"
    weight: 2
    identifier: externalip

draft: false
---


# Configuring Containerum external IP

To be able to access applications running in Containerum Platform, it is necessary to set the External IP of your machine(s).

Go to Settings.

<img src="/img/content/configuration/settings.png" width="100%"/>

Enter your machine external IP in "Add IP" section and click "Add IP" button.

<img src="/img/content/configuration/externalip.png" width="100%"/>


If you don't know your external IP address, the easiest way to find it is to run this command on your server:
```
$ curl ifconfig.me
```
