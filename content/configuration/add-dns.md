---
title: Add DNS record
linktitle: Add DNS record
description: Adding Let's Encrypt for automated certificate issuance.

categories: []
keywords: []

menu:
  docs:
    parent: "configuration"
    weight: 6
    identifier: add-dns

draft: false
---


# Adding DNS for domains in Containerum

## Adding DNS for Containerum
By default, Containerum Platform is accessible at local.containerum.io (see more at [Installation](/installation/installation)). Containerum Platform platform creates two Ingresses - one for the UI component and one for Containerum API. If you want to access Containerum Platform by a custom domain, change the Ingresses and the ui deployment with `kubectl edit` as follows:

Edit the  `ui` deployment, find `api.local.containerum.io` and change it to the custom API host.  
Edit the `api-gateway` ingress and change `api.local.containerum.io` to the custom API host.  
Edit the `ui` ingress and change `local.containerum.io` to the custom ui host that will be used to access Containerum Platform.

## Adding DNS for Domains in Containerum
When you create a Domain for a service inside Containerum Platform, it creates an Ingress to that service (`Domain` object in Containerum terms). To access the Ingress by a custom domain name, add DNS type A to your Domain Registrar. Set the IP of the machines where Containerum Platform is deployed. If you need to add another subdomain, you can either add another A Record type or a CNAME to the main domain.

Note: Using CNAMEs comes in handy when you change the IP address for the main domain. In this case it is enough to change the IP address for the main domain. In case of using A Record types you'll have to change the IP addresses manually for each subdomain.

Read more about how to work with domains in Containerum Platform [here](/objects/domains/).
