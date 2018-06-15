---
title: Build CLI - Containerum
linktitle: Build CLI
description:

categories: []
keywords: []

menu:
  docs:
    parent: "cli"
    weight: 4

draft: false
---

# How to build chkit
If you change Containerum API to use in your projects, you may need to make changes to chkit CLI.

To get chkit source:

```
go get -u -v github.com/containerum/chkit
or
```

```bash
# in $GOPATH/src/containerum
git clone https://github.com/containerum/chkit.git
```

To build chkit from sources:

``` bash
cd $GOPATH/src/containerum/chkit
make single_release CONTAINERUM_API="https://api.containerum.io"  
# or your Containerum API URL
```
then extract executable from tar.gz archive to ```./build to $GOPATH/bin or another $PATH dir```.
