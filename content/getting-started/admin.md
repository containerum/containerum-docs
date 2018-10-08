# Getting started with Containerum
Here are the fist steps to launch your first application on Containerum.

##### 1. Create a Project

To start launching and managing applications on Containerum you need to create a Project.

Go to the Projects tab and click *Add a project*.

<img src="/img/content/getting-started/admin/moveToCreateProject.png" width="100%"/>

Fill in the required fields: project name, CPU and RAM that you want to allocate to the project.

<img src="/img/content/getting-started/admin/chooseSize.png" width="100%"/>


Now that you have created a Project you can go to the Project page.

You can access all your Projects on the Projects tab in the main menu.

##### 2. Create a Deployment

Let's create your first Deployment. We will use nginx. Click *Create* on the *Deployment* page.
To use an image from a private registry, add a Secret for the deployment. You can find the instructions
 [here](https://docs.containerum.com/configuration/private-registry/).

Enter the Deployment name and the number of replicas, e.g., 1.

<img src="/img/content/getting-started/admin/createDepl1.png" width="100%"/>


Enter the following data:  
- container name - nginx-container.  
- docker image you want to use - nginx.  
- CPU (in mCPU) and RAM (in Mi) - 500.  

<img src="/img/content/getting-started/admin/createDepl2.png" width="100%"/>


Then click *Create deployment*.

##### 3. Create a Service

Now let's create an external service for your application to make it accessible from the outside.

Click *Create* on the *Services* tab.

<img src="/img/content/getting-started/admin/moveToCreateService.png" width="100%"/>


Choose the target deployment, enter the service name, port name and port number (80).

<img src="/img/content/getting-started/admin/createService.png" width="100%"/>

Done!

##### 4. How to access an application by External IP.

Let's access the application by External IP. Go to the *Services* tab on the Project page.
<img src="/img/content/getting-started/admin/serviceTab.png" width="100%"/>
Go the the Service page by clicking on the service and then click on the *Link* with the port.
<img src="/img/content/getting-started/admin/service.png" width="100%"/>
Done! You have accessed nginx by the external IP.
<img src="/img/content/getting-started/admin/nginx.png" width="100%"/>



##### 5. How to add a new user.
To add a new user to Containerum, go to *Membership* page and click on the *Add User* button on *Users* tab. Enter the email of a new user and click *Add*. After that you will see a modal box with randomly generated user password.

<img src="/img/content/objects/Membership/MembershipCreateUser.png" width="100%"/>

##### 6. How to add a user to a project.
To add a user to a project, go to the Project page and click on the *Manage Team* button.
<img src="/img/content/objects/Membership/projectPage.png" width="100%"/>

Then click *Add User*, enter user's email address, choose the permissions (*read*, *write*) and click *Add*.
<img src="/img/content/objects/Membership/AddUserToProject.png" width="100%"/>


Please, see [docs](https://docs.containerum.com) for more details about configuring and using Containerum Platform.
