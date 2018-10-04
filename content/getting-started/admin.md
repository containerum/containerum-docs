# Getting started with Containerum
Here are the fist steps to launch your first application on Containerum.

##### 1.Create a Project

Now create your first Project.

Go to the Projects tab and click *Add a project*.

<img src="/img/content/getting-started/admin/moveToCreateProject.png" width="100%"/>

Заполните поля имя и параметры вычислительных ресурсов проекта.

<img src="/img/content/getting-started/admin/chooseSize.png" width="100%"/>


Now that you have created a Project you can go the Project page.

You can access all your Projects at the Projects tab in the main menu.

##### 2. Create a Deployment

Let's create your first Deployment. Click *Create* on the *Deployment* page.

<img src="/img/content/getting-started/admin/createDepl1.png" width="100%"/>

Для того чтобы использовать образ из приватного регистра, вы можете прикрепить секрет к деплойменту. Инструкция по созданию секрета доступна по этой ссылке: https://docs.containerum.com/configuration/private-registry/

Enter the Deployment name and the number of replicas - 1.

<img src="/img/content/getting-started/admin/createDepl2.png" width="100%"/>

Enter the following data:
- container name - nginx-container.
- docker image you want to use - nginx.
- CPU (in mCPU) and RAM (in Mi) - 500.



Then click *Create deployment*.

##### 3. Create a Service

Now let's create an external service for your project to make it accessible from the outside.

On the *Services* tab click *Create*.

<img src="/img/content/getting-started/admin/moveToCreateService.png" width="100%"/>


Now create an external service.

Choose the target deployment, enter the service name, port name and port address (80).

<img src="/img/content/getting-started/admin/createService.png" width="100%"/>

Done!

##### 4. Как посмотреть запущенное приложение по внешнему IP.

Теперь давайте посмотрим запущенное приложение по внешнему IP. Перейдите во вкладку *Services* на странице проекта.
<img src="/img/content/getting-started/admin/serviceTab.png" width="100%"/>
Далее перейдите на страницу внешнего сервиса и нажмите на сформированную ссылку *Link* на списке портов.  
<img src="/img/content/getting-started/admin/service.png" width="100%"/>
Готово! Вы увидите окно приветствия у сервиса nginx.
<img src="/img/content/getting-started/admin/nginx.png" width="100%"/>

##### 5. Как добавить пользователя в систему.
Чтобы добавить нового пользователя в систему, пройдите на страницу *Membership* и во вкладке *Users* нажмите кнопку *Add User*. Введите эл.почту нового юзера и нажмите *Add* Появится модальное окно с паролем для нового пользователя.
##### 6. Как добавить пользователя в проект.
Чтобы добавить пользователя в проект, пройдите на страницу проекта и нажмите кнопку *Manage Team*. Далее нажмите кнопку *Add User*. Введите эл.почту юзера, выберите уровень доступа и нажмите *Add*.










##### 6. Create a Domain

Now let's create a domain for this external service. Click *Create domain*.

<img src="/img/content/getting-started/admin/serviceTab.png" width="100%"/>

Enter the domain name and check *Enable SSL Security* box.

<img src="/img/content/getting-started/admin/createDomain.png" width="100%"/>

##### 7. Go to the domain page

Go to the *Tools* tab in the main menu and choose *Domains*. You will see the list of your domains.

<img src="/img/content/getting-started/admin/domains.png" width="100%"/>

Click on the domain or enter the address manually in a new tab to see your application.

<img src="/img/content/getting-started/admin/result.png" width="100%"/>


Congratulations! You've just created a Project and launched an application on Containerum Online Platform.
