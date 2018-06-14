# Documentation for Containerum project

[![Build Status](https://travis-ci.org/containerum/containerum-docs.svg?branch=master)](https://travis-ci.org/containerum/containerum-docs)


## Requirements
* [Hugo](https://github.com/gohugoio/hugo) > v0.39
* [YARN](https://yarnpkg.com)


## Run locally
```
  gulp
  hugo serve --bind 0.0.0.0
```


## Build
```
  gulp build
  hugo
```

## Contribution

1. All *static* files should be put in **static_src** folder
2. All images for content should be put in corresponding folder in **static_src/img/content**.
E.g. To use *img.png* in */content/release-notes/cli.md*, the path for the picture should be */static_src/img/content/release-notes/cli/img.png*.
