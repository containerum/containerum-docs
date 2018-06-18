---
title: Object types - Containerum
linktitle: Object types
description: The core concepts of Containerum (project, deployment, ingress, etc.).

categories: []
keywords: []

menu:
  docs:
    parent: "getting-started"
    weight: 2

draft: false
---
<head>
  <style type="text/css">
  table {
  	border: 1px solid #0B0746;
  	border-collapse: collapse 
  }
   th { 
    background-color: #ebebeb;
    border: 1px solid #0B0746;
   }
   td {
   	border: 1px solid #0B0746;
   }
  </style>
</head>
<body>


# Object types
In Containerum a user can generally operate the following objects:


<br/>
<h4><a name="configmap">Configmap</a></h4>

Объект, который представляет собой хранилище ключ-значение. Он может содержать любые текстовые данные, будь то конфигурационные артефакты, сертификаты, ключи или переменные окружения. Данные хранятся в "чистом" виде, поэтому здесь следует хранить все, что не имеет дополнительных требований к безопасности.

Configmap состоит из следующих полей:

<table>
  <tbody>
    <tr>
      <th width="20%">Field</th>
      <th width="60%">Description</th>
      <th width="20%">Example</th>
    </tr>
    <tr>
      <td>name</td>
      <td>Имя объекта.</td>
      <td>myConfigmap</td>
    </tr>
    <tr>
      <td>data</td>
      <td>Объект, который содержит данные в формате key0:value0, key1:value1. В общем случае, ключем является имя загружаемого файла, а значением сам файл.</td>
      <td>1.txt:Hello World</td>
    </tr>
  </tbody>
</table>

</body>