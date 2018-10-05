# Getting started with Containerum
Here are the fist steps to launch your first application on Containerum.

##### 2. Create a Deployment

Let's create your first Deployment. Click *Create* on the *Deployment* page.

<img src="/img/content/getting-started/user/UsercreateDepl1.png" width="100%"/>

Для того чтобы использовать образ из приватного регистра, вы можете прикрепить секрет к деплойменту. Инструкция по созданию секрета доступна по этой ссылке: https://docs.containerum.com/configuration/private-registry/

Enter the Deployment name and the number of replicas - 1.

<img src="/img/content/getting-started/user/UsercreateDepl2.png" width="100%"/>

Enter the following data:
- container name - nginx-container.
- docker image you want to use - nginx.
- CPU (in mCPU) and RAM (in Mi) - 500.



Then click *Create deployment*.

##### 3. Create a Service

Now let's create an external service for your project to make it accessible from the outside.

On the *Services* tab click *Create*.

<img src="/img/content/getting-started/user/UsermoveToCreateService.png" width="100%"/>


Now create an external service.

Choose the target deployment, enter the service name, port name and port address (80).

<img src="/img/content/getting-started/user/UsercreateService.png" width="100%"/>

Done!

##### 4. Как посмотреть запущенное приложение по внешнему IP.

Теперь давайте посмотрим запущенное приложение по внешнему IP. Перейдите во вкладку *Services* на странице проекта.
<img src="/img/content/getting-started/user/UserserviceTab.png" width="100%"/>
Далее перейдите на страницу внешнего сервиса и нажмите на сформированную ссылку *Link* на списке портов.  
<img src="/img/content/getting-started/user/Userservice.png" width="100%"/>
Готово! Вы увидите окно приветствия у сервиса nginx.
<img src="/img/content/getting-started/user/Usernginx.png" width="100%"/>
