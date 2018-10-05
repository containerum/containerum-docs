---
title: Membership - Containerum
linktitle: Membership
description: How to create, manage, view and delete users.

categories: []
keywords: []

menu:
  docs:
    parent: "objects"
    weight: 11

draft: false
---

# How to work with a Membership

## Description

Membership страница управления всеми юзерами в системе, доступная только админу.
Для перехода на страницу мембершип нажмите на кнопку `мембершип` в контекстном меню пользователя
<img src="/img/content/objects/Membership/dashboardContextMenuMembership.png" width="100%"/>

## View Users

Вы можете увидеть список зарегистрированных пользователей.
<img src="/img/content/objects/Membership/viewUsers.png" width="100%"/>

## Create User
Для регистрации нового пользователя, нажмите кнопку `Add User`, заполните поле емейла, и нажмите кнопку `Add`.
После нажатия появится окно с паролем для созданного пользователя.
<img src="/img/content/objects/Membership/MembershipCreateUser.png" width="100%"/>

Также пользователь может самостоятельно зарегистрироваться в системе. Для этого, на странице логина, надо нажать `Sign up`
после чего ввести емейл и пароль. После нажатия на кнопку `Create account`, появится сообщение о необходимости активации админом
<img src="/img/content/objects/Membership/SignUp.png" width="100%"/>

Для активации, администратор зайдет на страницу `мембершип` и выберет опцию `Active` в выпадающем списке, выбранного пользователя.
<img src="/img/content/objects/Membership/ActivateUser.png" width="100%"/>

Активировать нового юзера, также можно зайдя на страницу юзера и нажав кнопку `Activate`
<img src="/img/content/objects/Membership/ActivateUserPage.png" width="100%"/>

## Manage User
Администратор может дать и убрать админский доступ у любого пользователя. Для этого надо на странице юзера поставить или убрать галочку с соответствующего поля.

<img src="/img/content/objects/Membership/UserPage.png" width="100%"/>

Здесь же можно сбросить пароль пользователю, нажав на кнопку `Reset Password`. После чего появится окно с новым паролем для пользователя.
<img src="/img/content/objects/Membership/MembershipCreateUser.png" width="100%"/>

## Добавление пользователя к проекту
Администратор может добавлять пользователей к проекту. Перейдите на страницу проекта, и нажмите кнопку *Manage Team*.
<img src="/img/content/objects/Membership/projectPage.png" width="100%"/>
Нажмите кнопку *Add User*, и введите эл.почту и уровень доступа к проекту WRITE или READ и нажмите кнопку *Add*
<img src="/img/content/objects/Membership/AddUserToProject.png" width="100%"/>
READ - может только видеть объекты внутри проекта.
WRITE - может управлять объектами внутри проекта, но не может изменять/удалять сам проект.
<img src="/img/content/objects/Membership/ProjectTeam.png" width="100%"/>

## Deactivation
Для деактивации пользователя, нажмите иконку корзины напротив выбранного пользователя или нажмите кнопку `Deactivate` на странице юзера. Then you will be asked to confirm User deactivation. Enter the user email and click `Deactivate`.
