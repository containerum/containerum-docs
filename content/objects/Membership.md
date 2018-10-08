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

# How to manage Membership

## Description

Membership page allows managing all users of Containerum Platform and is only available to admin users. To access the page click on the `Membership` button in the user context menu.
<img src="/img/content/objects/Membership/dashboardContextMenuMembership.png" width="100%"/>

## View Users

You can see the list of registered users.
<img src="/img/content/objects/Membership/viewUsers.png" width="100%"/>

## Create User
To register a new user, click `Add User`, enter user's email and click `Add`.
After that you will see a modal box with randomly generated user password.
<img src="/img/content/objects/Membership/MembershipCreateUser.png" width="100%"/>

Users can also register with Containerum Platform on their own by clicking `Sign up` on the login page. After users enter their email and password, their accounts need to be approved by an admin user.
<img src="/img/content/objects/Membership/SignUp.png" width="100%"/>

To activate an account, go to `Membership` page and set user's status to `active`.
<img src="/img/content/objects/Membership/ActivateUser.png" width="100%"/>

You can also click on the user's email and activate the account on the user page:
<img src="/img/content/objects/Membership/ActivateUserPage.png" width="100%"/>

## Manage User
Admin user can grant admin rights to any user and revoke them at any time on the Membership page.

<img src="/img/content/objects/Membership/UserPage.png" width="100%"/>

You can also reset user's password on this page by clicking `Reset Password` - this will reset the current password and generate a new one for the user.
<img src="/img/content/objects/Membership/MembershipCreateUser.png" width="100%"/>

## Adding users to projects
Admin can add users to projects. To do that go to the Project page and click on the *Manage Team* button.
<img src="/img/content/objects/Membership/projectPage.png" width="100%"/>
Then click *Add User*, enter user's email address, choose the permissions *READ* or  *WRITE* and click *Add*.
<img src="/img/content/objects/Membership/AddUserToProject.png" width="100%"/>
Users with READ permissions can only see objects within the project and cannot create or manage them.  
Users with WRITE permissions can manage objects within the project, but cannot resize/delete the Project.
<img src="/img/content/objects/Membership/ProjectTeam.png" width="100%"/>

## Deactivation
To deactivate a user, click on the bin icon to the right of the user's email or go to the User page and click 'Delete'. Then you will be asked to confirm User deactivation. Enter the user email and click `Delete`.
