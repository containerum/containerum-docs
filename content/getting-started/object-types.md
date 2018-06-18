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
	<li><a href="#ingress"  style="color: black"><i>Ingress</i></a></li>
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
    	<td colspan="2">Список портов.</td>
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
<h4><a name="ingress">Ingress</a></h4>

Объект, управляющий доступом к сервисам через домены. Имеет поддержку tls. Может содержать правила для роутинга по нескольким доменам и по разным путям. Например, url hello.hub.containerum.io/ ведет к сервису svc0 основного приложения, а url hello.hub.containerum.io/blog - к svc1 приложения blog.

Ingress состоит из следующих полей:

<table width="100%">
  <tbody>
    <tr>
      <th width="20%">Field</th>
      <th width="60%">Description</th>
      <th width="20%">Example</th>
    </tr>
    <tr>
      <td>name</td>
      <td>Имя объекта.</td>
      <td>myIngress</td>
    </tr>
    <tr>
      <td>rules:</td>
      <td colspan="2">Список правил для роутинга.</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>host</li>
    		</ul>
    	</td>
    	<td>URL Domain. Домен, по которому будет вестись обращение.</td>
    	<td>hello.hub.containerum.io</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>tls_secret</li>
    		</ul>
    	</td>
    	<td>Поддержка tls. Если есть, указывается имя секрета с сертификатом.</td>
    	<td>tls-cert</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<li>path:</li>
    		</ul>
    	</td>
    	<td colspan="2">Список путей.</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<ul>
    				<li>path</li>
    			</ul>
    		</ul>
    	</td>
    	<td>URL path.</td>
    	<td>/project</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<ul>
    				<li>service_name</li>
    			</ul>
    		</ul>
    	</td>
    	<td>Target service.</td>
    	<td>myService</td>
    </tr>
    <tr>
    	<td>
    		<ul>
    			<ul>
    				<li>service_port</li>
    			</ul>
    		</ul>
    	</td>
    	<td>Target port of selected service.</td>
    	<td>8080</td>
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