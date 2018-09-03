---
title: Create a Solution
linktitle: Solutions
description: How to create and add a solution to Containerum Platform.

categories: []
keywords: []

menu:
  docs:
    parent: "manuals"
    weight: 2
    identifier: manuals-solutions

draft: false
---


# How to create and add a solution to Containerum Platform

Solution is an object that allows launching and managing a preconfigured set of Deployments and Services.

A solution consists of a configuration file (`.containerum.json`) and object templates (Deployment и Solution) in json format. These files should be kept in the repo root.

##  Preparing configuration files
### .containerum.json structure
First, list the object template files:

```
"run":[
    {
      "type": “deployment", // deployment or service
      "config_file": “deploy.json" // name of the template file
    },
    …
 ]
```

Enter the default values for variables to be put in the templates:

```
"env": {
    "REDMINE_IMAGE": "redmine",
    "REDMINE_DEPLOY_NAME": "solution-redmine",
    "REDMINE_CPU": “200",
    "PG_IMAGE": “postgres",
    "HASH": "{{rand_string_minus 5}}",
    "POSTGRES_PASSWORD": "{{rand_string 8}}",
    …
 }
```

The string `"{{rand_string X}}”` will be replaced by a random set of symbols and numerals of X length.  E.g. `”{{rand_string 5}}”` will be changed to `“q3ukl”`.

The same applies to `“{{rand_string_minus X}}”`, only in this case with an addition of “-” symbol an the beginning of the string. E.g. `”{{rand_string_minus 5}}”` will change to `“-afkv6”`.

You can see an example of such a  .containerum.json file at https://github.com/containerum/redmine-postgresql-solution/blob/master/.containerum.json

### Resource templates
Resource templates are the templates of Containerum objects in json format.

Please see the objects used in Containerum Platform [here](/objects/object-types).
The values of variables should be specified as `{{.*VARIABLENAME*}}`.

**Before replacement**
```
{
  "containers": [{
    "image": "{{.REDMINE_IMAGE}}",
    "name": "{{.REDMINE_DEPLOY_NAME}}{{.HASH}}",
    "limits": {
      "cpu": {{.REDMINE_CPU}},
  …
```
**After replacement**
```
{
  "containers": [{
    "image": "redmine",
    "name": "solution-redmine-afkv6",
    "limits": {
      "cpu": 200,
  …
```

When a Solution is launched, it will use the default values from .containerum.json or, if applicable, the values set when launching the Solution.

A Deployment template must contain the following data:  
- Deployment name  
- Name of each container  
- Image for each container  
- Memory and CPU limits for each container  
- Environment variables  

A Service template must contain the following data:  
- Service name  
- Target deployment name  
- Ports  

**Deployment example:**  
https://github.com/containerum/redmine-postgresql-solution/blob/master/deploy-redmine.json  
**Internal Service example:**  
https://github.com/containerum/redmine-postgresql-solution/blob/master/service-pg.json  
**External Service example:**  
https://github.com/containerum/redmine-postgresql-solution/blob/master/service-redmine.json  

## Image requirements
A deployment can use any public image from DockerHub, which doesn’t require Docker privileged access.

Image version should be set as in Docker, e.g. nginx:1.15.0-alpine.
If version is not specified, Containerum will use the latest version.

## Repository requirements
A solution must be kept in a public repository on GitHub. You can add an image in the format "REPO_NAME.png" which will be used as an icon for the Solution.

## Solution examples
https://github.com/containerum/redmine-postgresql-solution - 2 Deployments, 2 Services  
https://github.com/containerum/MariaDB-solution - 1 Deployment, 1 Service

## Adding a Solution to Containerum platform
To add a Solution, go to Solutions tab and click `Add a Solution`:

<img src="/img/content/manuals/add-solution.png" width="100%"/>

Enter the name and GitHub repo address.

<img src="/img/content/manuals/add-solution-2.png" width="100%"/>

Note: The values in the parameters fields do not limit the resources used by the solution. They are included for reference only. The limits for containers are set in configuration yaml files as described above.
