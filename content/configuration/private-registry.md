---
title: Add private registry - Containerum
linktitle: Add private registry
description: How to add a private registry to Containerum.

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

Containerum Platform allows using private Docker registries for container images through secrets. To create a Secret, choose an existing Project, go to `Secrets` tab and click on the `Create` button.

<img src="/img/content/configuration/project_create_secret.png" width="100%"/>

Fill in the fields:

- Secret Name - can include a-z, 0-9, -. Example: `gitlab`.

- Path to your private registry - must be a valid url. Example: `https://registry.containerum.net`

- Parameters to access your registry - it can be username, password, token, etc. Can include a-z, 0-9, -.

Click on the `Create secret` button.
<img src="/img/content/configuration/create_secret.png" width="100%"/>

Then go to `Deployments` tab and click on the `Create` button.

<img src="/img/content/configuration/deployment_secret.png" width="100%"/>

Now click `Add secret` button and choose the required secret from the list.

<img src="/img/content/configuration/add_secret_to_deploy.png" width="100%"/>

Now you can use the images from your private registry as Docker images for your deployments. Enter the full path to the image in the `Docker Image` field, for example: `registry.containerum.net/auth:v1.0.0`.

<img src="/img/content/configuration/add_secret_container.png" width="180%"/>
