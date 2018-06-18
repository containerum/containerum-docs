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

Project is the main entity of the Containerum system. To create a project your need to allocate RAM and CPU resources on host nodes. Using self-hosted Containerum you can manage your available resources as you consider it necessary. <a href="https://web.containerum.io">Containerum Online</a> has a few offers for users, that want to try system features and functionality. The remaining system objects(deployments, services, etc.) exist only within the project. As Containerum has teamwork, you can allow any registered user to access your project or receive access to projects of other users.

Project consists of the following fields:

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
		  	<td>Object identifier.</td>
		  	<td>8d616b02-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
		  	<td>label</td>
		  	<td><i>string</i></td>
		  	<td>Object name, requested by user.</td>
		  	<td>myNamespace</td>
		</tr>
		<tr>
			<td>owner</td>
			<td><i>uui4</i></td>
			<td>Identifier of project owner.</td>
			<td>20b616d8-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
			<td>access</td>
			<td><i>string</i></td>
			<td>User access to the project. Values: owner, write, read.</td>
			<td>owner</td>
		</tr>
		<tr>
			<td>resources:</td>
			<td><i>object</i></td>
			<td colspan="2">Resources allocated for the project.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>hard:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Requested resources.</td>
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
			<td>Allocated CPU.</td>
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
			<td>Allocated RAM.</td>
			<td>128</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>used:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Currently used resources.</td>
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
			<td>Used CPU.</td>
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
			<td>Used RAM.</td>
			<td>100</td>
		</tr>		
	</tbody>
</table>

<br/>
<h4><a name="deployment">Deployment</a></h4> 

Deployment is an object that contains the configuration of the running applications. It has a large number of parameters, one of the main of them is container. Containers describe images, resources, environment variables, and so on. One or more applications can be started in one deployment. In this case, you do not need to create an <a href="#service"> internal service </a>, the applications are accessible to each other by the container name.

Deployment consists of the following fields:

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
		  	<td>Object name.</td>
		  	<td>myDeployment</td>
		</tr>
		<tr>
		  	<td>replicas</td>
		  	<td><i>uint</i></td>
		  	<td>Replicas count for app to run.</td>
		 	 <td>1</td>
		</tr>
		<tr>
			<td>containers:</td>
			<td><i>array</i></td>
			<td colspan="2">Container list.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>name</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Container name.</td>
			<td>myContainer</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>image</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>App image.</td>
			<td>nginx</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>limits:</li>
				</ul>
			</td>
			<td><i>object</i></td>
			<td colspan="2">Resources allocated for container.</td>
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
			<td>Allocated CPU.</td>
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
			<td>Allocated RAM.</td>
			<td>128</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>env:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
			<td colspan="2">Environments list</td>
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
			<td>Environment name</td>
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
			<td>Environment value</td>
			<td>https://api.containerum.io</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>config_maps:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
			<td colspan="2">Configmap list.</td>
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
			<td>Configmap name</td>
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
			<td>Path for configmap to mount to.</td>
			<td>/home/user</td>
		</tr>
	</tbody>
</table>

<br/>
<h4><a name="pod">Pod</a></h4>

Pod is an object that represents one running <a href="#deployment"> deployment </a>replica. When user creates a deployment with 4 replicas, 4 pods will be created. In this case, each of them occupies the amount of resources equal to the sum of containers of parent deployment. When user deletes a pod, a new one with the same configuration will be created. Pods are available for reading logs.

<br/>
<h4><a name="service">Service</a></h4>

Service is an object, used for communication between <a href="#deployment"> applications </a> with each other or with the outside world. The service can be internal or external. The internal service connects deployments by internal network of k8s. External service allows you to access the deployment via internet from outside the system. Each service can have several ports running over TCP or UDP protocol.

Service consists of the following fields:

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
		  	<td>Object name.</td>
		  	<td>myService</td>
		</tr>
		<tr>
		  	<td>deploy</td>
		  	<td><i>string</i></td>
		  	<td>Target deployment. It is necessary to choose output app.</td>
		  	<td>myDeployment</td>
		</tr>
		<tr>
			<td>ports:</td>
			<td><i>array objects</i></td>
			<td colspan="2">Ports list.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>portname</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Port name.</td>
			<td>myPort</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>port</li>
				</ul>
			</td>
			<td><i>uint(11000-65535)</i></td>
			<td>External port. For the external service it is a port, that allows you to access the deployment via internet from outside the system. For the internal service it is a port, that allows selected deploy to communicate with another deployment.</td>
			<td>8080</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>target_port</li>
				</ul>
			</td>
			<td><i>uint(1-65535)</i></td>
			<td>Internal port. The port of deployment, where running app exists. In Dockerfile this is a port from EXPOSE instruction.</td>
			<td>80</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>protocol</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>Port protocol. TCP or UDP accepted.</td>
			<td>TCP</td>
		</tr>
	</tbody>
</table>

<br/>
<h4><a name="ingress">Ingress</a></h4>

Ingress is an object that controls access to <a href="#service"> services </a> through domains. Ingresses have tls support. They can contain rules for routing across several domains and different paths. For example, path <i>hello.hub.containerum.io/</i> connects the service <i>svc0</i> of the main application, and path <i>hello.hub.containerum.io/blog</i> - the service <i>svc1</i> of the blog application.

Ingress consists of the following fields:

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
		  	<td>Object name.</td>
		  	<td>myIngress</td>
		</tr>
		<tr>
		  	<td>rules:</td>
		  	<td><i>array objects</i></td>
		  	<td colspan="2">Routing rules list.</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>host</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>URL Domain.</td>
			<td>hello.hub.containerum.io</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>tls_secret</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>TLS support. If supported, secret name should be specified.</td>
			<td>tls-cert</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>path:</li>
				</ul>
			</td>
			<td><i>array objects</i></td>
			<td colspan="2">Paths list.</td>
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

Configmap is an object that represents a key-value store. It can contain any text data, for example, configuration artifacts, certificates, keys or environment variables. Configmap data is stored without any encryptions, so you should store everything that does not have additional security requirements.

Configmap consists of the following fields:

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
		  	<td>Object name.</td>
		  	<td>myConfigmap</td>
		</tr>
		<tr>
		  	<td>data</td>
		  	<td><i>object</i></td>
		  	<td>Data, that contains information in the key-value format, like key0:value0, key1:value1. In general, the key is the name of the downloaded file, and the value is the file data.</td>
		  	<td>1.txt:Hello World</td>
		</tr>
	</tbody>
</table>

</body>