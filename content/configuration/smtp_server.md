---
title: Connecting SMTP server
linktitle: Connect your SMTP server
description: How to turn on Containerum mail sending

categories: []
keywords: []

menu:
  docs:
    parent: "manuals"
    weight: 2
    identifier: smtpserver

draft: false
---

# Connecting SMTP server to Containerum mail manager

To connect your SMTP server to Containerum mail service set environments CH_MAIL_SMTP_ADDR, CH_MAIL_SMTP_LOGIN, CH_MAIL_SMTP_PASSWORD during Containerum installation

```bash
helm install containerum/containerum --set mail.env.global.CH_MAIL_SMTP_ADDR=mail:465 --set mail.env.global.CH_MAIL_SMTP_LOGIN=noreply@containerum.io --set mail.env.local.CH_MAIL_SMTP_PASSWORD=verystrongpassword
```

or update.

```bash
helm upgrade <YOUR_CONTAINERUM_RELEASE_NAME> --set mail.env.global.CH_MAIL_SMTP_ADDR=mail:465 --set mail.env.global.CH_MAIL_SMTP_LOGIN=noreply@containerum.io --set mail.env.local.CH_MAIL_SMTP_PASSWORD=verystrongpassword containerum/containerum
```