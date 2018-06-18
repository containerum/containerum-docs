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

<ul>
	<li><a href="#service"  style="color: black"><i>Service</i></a></li>

	<li><a href="#configmap"  style="color: black"><i>Configmap</i></a></li>
</ul>

Project - 

Deployment -

<br/>
<h4><a name="service">Service</a></h4>

Объект, предназначенный для связи приложений между собой или с внешним миром. Сервис может быть внутренним или внешним. Внутренний сервис соединяет деплойменты по внутренней сети kubernetes. Внешний сервис позволяет обращаться к деплою через всемирную сеть.

Service состоит из следующих полей:

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
      <td>myService</td>
    </tr>
    <tr>
      <td>deploy</td>
      <td>Target deployment. Необходимо выбрать приложение, к которому будет обращаться сервис.</td>
      <td>myDeployment</td>
    </tr>
    <tr>
    	<td>ports:</td>
    	<td>Список портов.</td>
    	<td></td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>portname</li>
    		</ul>
    	</td>
    	<td>Имя порта.</td>
    	<td>myPort</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>port</li>
    		</ul>
    	</td>
    	<td>Внешний порт. Для внешнего сервиса это порт, выброшенный во всемирную сеть. Для внутреннего сервиса это порт, по которому поды выбранного деплоя будут стучаться к другому деплою.</td>
    	<td>8080</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>target_port</li>
    		</ul>
    	</td>
    	<td>Внутренний порт. Порт деплоя, на котором запущено приложение. В Dockerfile этот порт в команде EXPOSE.</td>
    	<td>80</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>protocol</li>
    		</ul>
    	</td>
    	<td>Протокол порта. TCP или UDP.</td>
    	<td>TCP</td>
    </tr>
  </tbody>
</table>


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