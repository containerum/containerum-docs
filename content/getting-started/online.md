---
title: Online Platform - Containerum
linktitle: Containerum Online
description: First steps to start using Containerum Online.

categories: []
keywords: []

menu:
  docs:
    parent: "getting-started"
    weight: 5

draft: false
---

# Getting started with Containerum Online
*First steps to start working with Containerum Online*

1.Registration

![Registration](/img/content/getting-started/online/registration.png)

Зарегистрируйтесь, введите адрес электронной почты и придумайте пароль, а также подтвердите что вы 
не являетесь роботом.

После регистрации вам придет письмо с ссылкой для подтверждения регистрации.

Перейдя по ней вы окажетесь на странице Dashboard

2.Billing

![moveToBilling](/img/content/getting-started/online/moveToBilling.png)

Теперь вам необходимо пополнить счёт вашего аккаунта, чтобы была возможность 
воспользоваться функционалом. Для этого выберите в выпадающем меню пункт Billing.

На странице Billing нажмите кнопку add funds, чтобы пополнить счёт через карту 
или с помощью PayPal.

![Billing](/img/content/getting-started/online/billing.png)

3.Create Project

Теперь создайте свой первый проект

Перейдите на вкладку Projects главного меню и нажмите add a project

![moveToCreateProject](/img/content/getting-started/online/moveToCreateProject.png)

Далее выбирайте необходимый для вашего проекта объём ресурсов

![chooseSize](/img/content/getting-started/online/chooseSize.png)

После того как вы создали проект нужно перейти на его страницу. Все свои проекты 
вы можете видеть на вкладке Project главного меню.

4.Create Deployment 

Теперь создайте Deployment. На вкладке Deployment нажмите create.

![createDepl1](/img/content/getting-started/online/createDepl1.png)

Введите имя вашего проекта, колиство реплик - 1.

![createDepl2](/img/content/getting-started/online/createDepl2.png)

Далее введите имя контейнера - hello.
Имя докер образа - containerum/helloworld.
Ресурсы процессора и памяти - 500.

После ввода всех необходимых параметров нажмите create deployment.

5.Create Service 

Теперь необходимо создать внешний сервис для вашего проекта

На вкладке Services вашего проекта нажмите кнопку create

![moveToCreateService](/img/content/getting-started/online/moveToCreateService.png)


Далее создаём внешний сервис

Вводите имя сервиса, имя порта и адрес порта равный 80 

![createService](/img/content/getting-started/online/createService.png)

Далее создаем домен для этого внешнего сервиса. Нажмите create domain.

![moveToCreateDomain](/img/content/getting-started/online/moveToCreateDomain.png)

6.Create Domain

Введите имя домена и отметьте использование протокола SSL

![createDomain](/img/content/getting-started/online/createDomain.png)

7.Result

После создания домена для внешнего сервиса переходим на вкладку Services 
вашего проекта заходите на страницу созданного сервиса

![moveToViewResult](/img/content/getting-started/online/moveToViewResult.png)

Далее чтобы увидть что базирутеся на созданной домене нажмите на поле link

![Result](/img/content/getting-started/online/result.png)

Поздравляем, вы только что успешно создали проект на нашей платформе.