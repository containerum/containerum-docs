---
title: Solutions- Containerum
linktitle: Solutions
description: How to create, update, view and delete a Solutions.

categories: []
keywords: []

menu:
  docs:
    parent: "objects"
    weight: 10

draft: false
---

# How to work with a Solution
## Description
Солюшн - это заранее подготовленный шаблон для запуска объектов системы, таких как деплойменты и сервисы.

## Create
To create a Solution, choose an existing Project, go to Solutions section and click on the `Create` button.
<img src="/img/content/objects/Solutions/projectSolutions.png" width="100%"/>

Выберите нужный солюшен из списка и нажмите кнопку 'Deploy'.

<img src="/img/content/objects/Solutions/SolutionList.png" width="100%"/>

Выберите проект для солюшена и укажите имя солюшена.

<img src="/img/content/objects/Solutions/createSolution1.png" width="100%"/>

Проверьте данные и, при необходимости, исправьте переменные и значения.

<img src="/img/content/objects/Solutions/createSolution2.png" width="100%"/>

Then click on the `Deploy`. Done.
<img src="/img/content/objects/Solutions/SuccessSolutionRun.png" width="100%"/>

Также вы можете создать свой темплейт для солюшена, использовав данные из вашего репозитория на гитхабе.
Для этого перейдите во вкладку "солюшен" на дашборде и и нажмите кнопку "ADD A SOLUTION"
<img src="/img/content/objects/Solutions/viewGlobalSolutions.png" width="100%"/>

Заполните поля "Имя солюшена", "URL" и "Параметры"
<img src="/img/content/objects/Solutions/createSolutionTemplate.png" width="100%"/>

Then click on the `Add Solution`. Done. Ваш солюшен будет в конце списка солюшенов для дальнейшего использования.
<img src="/img/content/objects/Solutions/viewTemplates.png" width="100%"/>

Вы можете удалить ваш шаблон для солюшена нажав на крестик.

## View

You can view your Solutions in the `Solutions` tab on the `Project` page:

<img src="/img/content/objects/Solutions/viewSolutions.png" width="100%"/>

Автоматически созданные сервисы и деплойменты, можно увидеть перейдя по соответсвующим вкладкам на странице проекта.
<img src="/img/content/objects/Solutions/viewSolutionServices.png" width="100%"/>
<img src="/img/content/objects/Solutions/viewSolutionDeployments.png" width="100%"/>



## Update

Вы можете изменить параметры созданных сервисов и деплойментов из солюшена, перейдя по соответсвующим вкладкам на странице проекта и нажав `Update` в контекстном меню.
<img src="/img/content/objects/Solutions/viewSolutionServices.png" width="100%"/>
<img src="/img/content/objects/Solutions/viewSolutionDeployments.png" width="100%"/>
## Delete

To delete a Solution, choose an existing Project, go to Solutions section and click иконку корзины в выбранном солюшене.
Введите имя солюшена в поле и нажмите кнопку `Delete`

<img src="/img/content/objects/Solutions/SolutionMenuDelete.png" width="100%"/>
