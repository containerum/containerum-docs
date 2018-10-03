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


# Adding DNS for domains
When you create a Domain for a service, Containerum Platform creates an Ingress to that service. To access the Ingress by a custom domain name, add DNS type A to your Domain Registrar. Set the IP of the machines where Containerum Platform is deployed. If you need to add another subdomain, you can either add another A Record type or a CNAME to the main domain.

Note: Using CNAMEs comes handy when you change the IP address for the main domain. In this case it is enough to change the IP address for the main domain. In case of using A Record types you'll have to change the IP addresses manually for each subdomain.
