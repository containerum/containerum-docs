# Getting started with Containerum
Here are the fist steps to launch your first application on Containerum.

##### 1. Create a Deployment

Let's create your first Deployment. We will use nginx. Click *Create* on the *Deployment* page.
To use an image from a private registry, add a Secret for the deployment. You can find the instructions
 [here](https://docs.containerum.com/configuration/private-registry/).

<img src="/img/content/getting-started/user/UsercreateDepl1.png" width="100%"/>

Enter the following data:  
- container name - nginx-container.  
- docker image you want to use - nginx.  
- CPU (in mCPU) and RAM (in Mi) - 500.  

<img src="/img/content/getting-started/user/UsercreateDepl2.png" width="100%"/>


Then click *Create deployment*.

##### 2. Create a Service

Now let's create an external service for your project to make it accessible from the outside.

On the *Services* tab click *Create*.

<img src="/img/content/getting-started/user/UsermoveToCreateService.png" width="100%"/>


Now create an external service.

Choose the target deployment, enter the service name, port name and port number (80).

<img src="/img/content/getting-started/user/UsercreateService.png" width="100%"/>

Done!

##### 3. How to access an application by External IP.

Let's access the application by External IP. Go to the *Services* tab on the Project page.
<img src="/img/content/getting-started/user/UserserviceTab.png" width="100%"/>
Go the the Service page by clicking on the service and then click on the *Link* with the port.
<img src="/img/content/getting-started/user/Userservice.png" width="100%"/>
Done! You have accessed nginx by the external IP.
<img src="/img/content/getting-started/user/Usernginx.png" width="100%"/>


Please, see [docs](https://docs.containerum.com) for more details about using Containerum Platform.
