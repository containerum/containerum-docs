---
title: Connecting SMTP server - Containerum
linktitle: Connect SMTP server
description: How to enable Containerum mail server.

categories: []
keywords: []

menu:
  docs:
    parent: "configuration"
    weight: 3
    identifier: smtpserver

draft: false
---

# Connecting SMTP server to Containerum mail manager

To enable user registrations and e-mail confirmation it is necessary to connect your SMTP server to Containerum mail service. Set environments CH_MAIL_SMTP_ADDR, CH_MAIL_SMTP_LOGIN, CH_MAIL_SMTP_PASSWORD during Containerum installation.

```bash
helm install containerum/containerum --set mail.env.global.CH_MAIL_SMTP_ADDR=mail:465 --set mail.env.global.CH_MAIL_SMTP_LOGIN=noreply@containerum.io --set mail.env.local.CH_MAIL_SMTP_PASSWORD=verystrongpassword
```

or use `helm upgrade`:

```bash
helm upgrade <YOUR_CONTAINERUM_RELEASE_NAME> --set mail.env.global.CH_MAIL_SMTP_ADDR=mail:465 --set mail.env.global.CH_MAIL_SMTP_LOGIN=noreply@containerum.io --set mail.env.local.CH_MAIL_SMTP_PASSWORD=verystrongpassword --set mail.env.global.CH_MAIL_SENDER_MAIL_SIMPLE=sender@containerum.io containerum/containerum
```

Don't forget to change:  
- `<YOUR_CONTAINERUM_RELEASE_NAME>` - your current helm release name (e.g. `busted-nightingale`)  
- `mail:465` - smtp server address and port  
- `noreply@containerum.io` - login  
- `verystrongpassword` - password
- `sender@containerum.io` - sender's email

If you are running a version of Containerum Platform that is not the latest stable release, don't forget to set the version with the `--version <VERSION>` flag.
