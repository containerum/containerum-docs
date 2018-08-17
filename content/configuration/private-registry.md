---
title: Add private registry - Containerum
linktitle: Add private registry
description: How to add private registry to Containerum.

categories: []
keywords: []

menu:
  docs:
    parent: "configuration"
    weight: 3
    identifier: privateregistry

draft: false
---


# Adding private registry to Containerum

Containerum Platform allows using private Docker registry for container images through secrets. To create an Secret, choose an existing Project, go to Secrets section and click on the Create button.

<img src="/img/content/configuration/project_create_secret.png" width="100%"/>

Fill in the fields:

- Secret Name - can include a-z, 0-9, -. Example: `gitlab`.

- Path to your private registry - must be valid url. Example: `https://registry.containerum.net`

- Parameters to access your registry - it can be username, password, token, etc. Can include a-z, 0-9, -.

<img src="/img/content/configuration/create_secret.png" width="100%"/>

Then go to Deployments section and click on the Create button. 

<img src="/img/content/configuration/deployment_secret.png" width="100%"/>

Now click Add secret button and choose desired secret from list.

<img src="/img/content/configuration/add_secret_to_deploy.png" width="100%"/>

Finally you can use images from your private registry as Docker images for your deployments. Enter full path to image, for example: `registry.containerum.net/auth:v1.0.0`.