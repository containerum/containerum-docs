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
   ul {
    margin-top: 0;
    margin-bottom: 0;
   }
  </style>
</head>
<body>


# Object types
In Containerum a user can generally operate the following objects:

<ul>
	<li><a href="#project"  style="color: black"><i>Project</i></a></li>
	<li><a href="#deployment"  style="color: black"><i>Deployment</i></a></li>
	<li><a href="#pod"  style="color: black"><i>Pod</i></a></li>
	<li><a href="#service"  style="color: black"><i>Service</i></a></li>
	<li><a href="#ingress"  style="color: black"><i>Ingress</i></a></li>
	<li><a href="#configmap"  style="color: black"><i>Configmap</i></a></li>
</ul>

<br/>
<h4><a name="">Project</a></h4>

Объект, представляющий неймспейс в системе kubernetes. Под проект выделяются ресурсы: оперативная память и cpu. Основная сущность, которой управляет система. Остальные объекты существуют только внутри проекта. Проект управляется при помощи идентификаторов, т.к. в системе kubernetes не могут существовать два неймспейса с одним именем.

Project состоит из следующих полей:

<table>
	<tbody>
		<tr>
		  	<th width="20%">Field</th>
		  	<th width="7%">Type</th>
		  	<th width="53%">Description</th>
		  	<th width="20%">Example</th>
		</tr>
		<tr>
		  	<td>id</td>
		  	<td><i>uui4</i></td>
		  	<td>Идентификатор объекта.</td>
		  	<td>8d616b02-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
		  	<td>label</td>
		  	<td><i>string</i></td>
		  	<td>Имя объекта, запрошенное пользователем.</td>
		  	<td>myNamespace</td>
		</tr>
		<tr>
			<td>owner</td>
			<td><i>uui4</i></td>
			<td>ID владельца проекта.</td>
			<td>20b616d8-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
			<td>access</td>
			<td><i>string</i></td>
			<td>Доступ пользователя к проекту.</td>
			<td>owner</td>
		</tr>
		<tr>
			<td>resources:</td>
			<td><i>object</i></td>
			<td colspan="2">Ресурсы, выделяемые под проект.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>hard:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Затребованные ресурсы.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>cpu</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Процессорное время.</td>
			<td>100</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>memory</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Оперативная память.</td>
			<td>128</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>used:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Занятые ресурсы.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>cpu</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Процессорное время.</td>
			<td>50</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>memory</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Оперативная память.</td>
			<td>100</td>
		</tr>		
	</tbody>
</table>

<br/>
<h4><a name="deployment">Deployment</a></h4>

Объект, который содержит конфигурацию запускаемых приложений. Имеет большое количество параметров, основными среди которых являются контейнеры. В контейнерах описываются образы для запуска, ресурсы, переменные окружения и др. В одном деплое может быть запущено одно или более приложений. В таком случае не требуется создавать <a href="#service">внутренний сервис</a>, приложения доступны друг другу по имени контейнера. 

Deployment состоит из следующих полей:

<table width="100%">
	<tbody>
		<tr>
		  	<th width="20%">Field</th>
		  	<th width="7%">Type</th>
		  	<th width="53%">Description</th>
		  	<th width="20%">Example</th>
		</tr>
		<tr>
		  	<td>name</td>
		  	<td><i>string</i></td>
		  	<td>Имя объекта.</td>
		  	<td>myDeployment</td>
		</tr>
		<tr>
		  	<td>replicas</td>
		  	<td><i>uint</i></td>
		  	<td>Количество реплик, в которых будут запускаться приложения.</td>
		 	 <td>1</td>
		</tr>
		<tr>
			<td>containers:</td>
			<td><i>array</i></td>
			<td colspan="2">Список контейнеров.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>name</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Имя контейнера.</td>
			<td>myContainer</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>image</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Образ запускаемого приложения.</td>
			<td>nginx</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>limits:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Ресурсы, выделяемые под контейнер.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>cpu</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Процессорное время.</td>
			<td>100</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>memory</li>
					</ul>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Оперативная память.</td>
			<td>128</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>env:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
			<td colspan="2">Список переменных окружения</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>name</li>
					</ul>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Имя переменной окружения</td>
			<td>CONTAINERUM_API</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>value</li>
					</ul>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Значение переменной окружения</td>
			<td>https://api.containerum.io</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>config_maps:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
			<td colspan="2">Список конфигмапов.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>name</li>
					</ul>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Имя конфигмапа</td>
			<td>myConfigmap</td>
		</tr>
		<tr>
			<td>
				<ul>
					<ul>
						<li>mount_path</li>
					</ul>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Путь в контейнере, куда монтируется конфигмап</td>
			<td>/home/user</td>
		</tr>
	</tbody>
</table>

<br/>
<h4><a name="pod">Pod</a></h4>

Объект, представляющий собой одну работающую реплику <a href="#deployment">деплоя</a>. При создании деплоя с 4 репликами, создаются 4 пода. При этом каждый из них занимает количество ресурсов, равное сумме контейнеров деплоя. При удалении пода, запускается новый такой же под. Доступен для чтения логов.

<br/>
<h4><a name="service">Service</a></h4>

Объект, предназначенный для связи <a href="#deployment">приложений</a> между собой или с внешним миром. Сервис может быть внутренним или внешним. Внутренний сервис соединяет деплойменты по внутренней сети kubernetes. Внешний сервис позволяет обращаться к деплою через всемирную сеть. Каждый сервис может иметь несколько портов, работающих по TCP или UDP протоколу.

Service состоит из следующих полей:

<table>
	<tbody>
		<tr>
		  	<th width="20%">Field</th>
		  	<th width="7%">Type</th>
		  	<th width="53%">Description</th>
		  	<th width="20%">Example</th>
		</tr>
		<tr>
		  	<td>name</td>
		  	<td><i>string</i></td>
		  	<td>Имя объекта.</td>
		  	<td>myService</td>
		</tr>
		<tr>
		  	<td>deploy</td>
		  	<td><i>string</i></td>
		  	<td>Target deployment. Необходимо выбрать приложение, к которому будет обращаться сервис.</td>
		  	<td>myDeployment</td>
		</tr>
		<tr>
			<td>ports:</td>
			<td><i>array objects</i></td>
			<td colspan="2">Список портов.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>portname</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Имя порта.</td>
			<td>myPort</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>port</li>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Внешний порт. Для внешнего сервиса это порт, выброшенный во всемирную сеть. Для внутреннего сервиса это порт, по которому поды выбранного деплоя будут стучаться к другому деплою.</td>
			<td>8080</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>target_port</li>
				</ul>
			</td>
			<td><i>uint</i></td>
			<td>Внутренний порт. Порт деплоя, на котором запущено приложение. В Dockerfile этот порт в команде EXPOSE.</td>
			<td>80</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>protocol</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Протокол порта. TCP или UDP.</td>
			<td>TCP</td>
		</tr>
	</tbody>
</table>

<br/>
<h4><a name="ingress">Ingress</a></h4>

Объект, управляющий доступом к <a href="#service">сервисам</a> через домены. Имеет поддержку tls. Может содержать правила для роутинга по нескольким доменам и по разным путям. Например, path hello.hub.containerum.io/ ведет к сервису svc0 основного приложения, а path hello.hub.containerum.io/blog - к svc1 приложения blog.

Ingress состоит из следующих полей:

<table width="100%">
	<tbody>
		<tr>
		  	<th width="20%">Field</th>
		  	<th width="7%">Type</th>
		  	<th width="53%">Description</th>
		  	<th width="20%">Example</th>
		</tr>
		<tr>
		  	<td>name</td>
		  	<td><i>string</i></td>
		  	<td>Имя объекта.</td>
		  	<td>myIngress</td>
		</tr>
		<tr>
		  	<td>rules:</td>
		  	<td><i>array objects</i></td>
		  	<td colspan="2">Список правил для роутинга.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>host</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>URL Domain. Домен, по которому будет вестись обращение.</td>
			<td>hello.hub.containerum.io</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>tls_secret</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Поддержка tls. Если есть, указывается имя секрета с сертификатом.</td>
			<td>tls-cert</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>path:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
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
			<td><i>string</i></td>
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
			<td><i>string</i></td>
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
			<td><i>uint(11000-65535)</i></td>
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
		  	<th width="7%">Type</th>
		  	<th width="53%">Description</th>
		  	<th width="20%">Example</th>
		</tr>
		<tr>
		  	<td>name</td>
		  	<td><i>string</i></td>
		  	<td>Имя объекта.</td>
		  	<td>myConfigmap</td>
		</tr>
		<tr>
		  	<td>data</td>
		  	<td><i>object</i></td>
		  	<td>Объект, который содержит данные в формате key0:value0, key1:value1. В общем случае, ключем является имя загружаемого файла, а значением сам файл.</td>
		  	<td>1.txt:Hello World</td>
		</tr>
	</tbody>
</table>

</body>