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
# Object types
In Containerum a user can generally operate the following objects:

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
<ul>
	<li><a href="#project"  style="color: black"><i>Project</i></a></li>
	<li><a href="#deployment"  style="color: black"><i>Deployment</i></a></li>
	<li><a href="#pod"  style="color: black"><i>Pod</i></a></li>
	<li><a href="#service"  style="color: black"><i>Service</i></a></li>
	<li><a href="#ingress"  style="color: black"><i>Ingress</i></a></li>
	<li><a href="#configmap"  style="color: black"><i>Configmap</i></a></li>
</ul>

<br/>
<h4><a name="project">Project</a></h4>

Project is the main entity of Containerum system. To create a project user needs to allocate RAM and CPU resources on the server. Using <a href="https://github.com/containerum/containerum">self-hosted Containerum</a> user has a possibility to manage available resources as he considers. <a href="https://web.containerum.io">Containerum Online</a> has a few offers for users, that want to try system features and functionality. The remaining system objects(deployments, services, etc.) exist only within the project. As Containerum has teamwork, users can share their projects with different access levels and make a new generation software together.

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
		  	<td>Object identifier, that is actually real project name in Containerum system. Should be unique for every project.</td>
		  	<td>8d616b02-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
		  	<td>label</td>
		  	<td><i>string</i></td>
		  	<td>Object name, requested by user. Has no requirements to be unique, as Containerum API uses id field in routing.</td>
		  	<td>myNamespace</td>
		</tr>
		<tr>
			<td>owner</td>
			<td><i>uui4</i></td>
			<td>Identifier of project owner, that is user identifier inside Containerum system. It can be only one owner for a project.</td>
			<td>20b616d8-1ea7-4842-b8ec-c6e8226fda5b</td>
		</tr>
		<tr>
			<td>access</td>
			<td><i>string</i></td>
			<td>User access to the project. Available values: owner, write, read.</td>
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
			<td>Allocated CPU. To simplify user's calculation Containerum uses only mCPU quantity. mCPU = 10**-3 CPU.</td>
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
			<td>Allocated RAM. To simplify user's calculation Containerum uses only <a href="https://en.wikipedia.org/wiki/Mebibit">Mi</a> quantity of RAM.</td>
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
			<td>Used mCPU value.</td>
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
			<td>Used RAM value in Mi.</td>
			<td>100</td>
		</tr>		
	</tbody>
</table>

<br/>
<h4><a name="deployment">Deployment</a></h4> 

Deployment is an object that contains the configuration of the running applications. It has a large number of parameters, that can be set up during deployment creation, one of the main of them is container. Containers describe images, resources, environment variables, etc. that help user app to run properly. One or more applications can be started in one deployment. User can describe apps in separate deployments and connect them using <a href="#service">internal services</a> or describe apps as different containers belong to same deployment. In this case, applications are accessible to each other by the container name and port. User can connect <a href="#configmap">configmaps</a> to deployments to use configuration files, certificates, etc. Recently Containerum deployments have started to support the versioning. So when user update deployment image, the new version will be saved. User can get versions list, rename version, run every selected version, etc. Containerum uses semantic versioning for deployments.

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
		  	<td>Object name. Should be unique inside of project.</td>
		  	<td>myDeployment</td>
		</tr>
		<tr>
		  	<td>replicas</td>
		  	<td><i>uint</i></td>
		  	<td>Replicas count for app to run. Accessible values: 0..15. If user sets replicas up to 0, every pod for selected deployment will be terminated.</td>
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
			<td>Container name. Should be unique within deployment.</td>
			<td>myContainer</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>image</li>
				</ul>
			</td>
			<td><i>string</i></td>
			<td>App Docker image.</td>
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
			<td>Allocated CPU. To simplify user's calculation Containerum uses only mCPU quantity. mCPU = 10**-3 CPU.</td>
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
			<td>Allocated RAM. To simplify user's calculation Containerum uses only <a href="https://en.wikipedia.org/wiki/Mebibit">Mi</a> quantity of RAM.</td>
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
			<td>Environment name.</td>
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
			<td>Configmap name. Should be unique inside of project.</td>
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
			<td>Path for configmap to mount to. It is a path inside container file system.</td>
			<td>/home/user</td>
		</tr>
	</tbody>
</table>

<br/>
<h4><a name="pod">Pod</a></h4>

Pod is an object that represents one running <a href="#deployment"> deployment </a>replica. Although deployment contains configuration data, pod is actually running app. Pod can not exist without deployment, while deployment can have no one pod. When user creates a deployment with 4 replicas, 4 pods will be created. In this case, each of them occupies the amount of resources equal to the sum of containers of parent deployment. When user deletes a pod, a new one with the same configuration will be created. Pods are available for reading logs.

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
		  	<td>Object name. Should be unique inside of project.</td>
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
			<td>Port name. Should be unique within service.</td>
			<td>myPort</td>
		</tr>
		<tr>
			<td>
				<ul>
					<li>port</li>
				</ul>
			</td>
			<td><i>uint(11000-65535)</i></td>
			<td>External port. For the external service it is a port, that allows user to access the deployment via internet from outside the system. For the internal service it is a port, that allows selected deploy to communicate with another deployment.</td>
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

Ingress is an object that controls access to <a href="#service"> services </a> through DNS. Ingresses can work through unsecurity http or protected https protocol, so they have TLS-protocol support. User can order Containerum TLS certs or use his own. Ingresses can contain rules for routing across several domains and different paths. For example, path <i>hello.hub.containerum.io/</i> connects the service <i>svc0</i> of the main application, and path <i>hello.hub.containerum.io/blog</i> - the service <i>svc1</i> of the blog application.

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
		  	<td>Object name. Should be unique inside of project.</td>
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
			<td>URL Domain. Containerum Online offers only subdomains for hub.containerum.io, but on request our team can help to set up another domain.</td>
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
			<td>Target service. It is necessary to choose output service.</td>
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

Configmap is an object that represents a key-value storage. It can contain any text data, for example, configuration artifacts, certificates, keys or environment variables. Configmap data is stored without any encryptions, so you should add everything that does not have additional security requirements.

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
		  	<td>Object name. Should be unique inside of project.</td>
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