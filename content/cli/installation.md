---
title: CLI
linktitle: Install
description:

categories: []
keywords: []

menu:
  docs:
    parent: "cli"
    weight: 2

weight: 2

draft: false
---

# Installation

You can download binaries for [MacOs](https://web.api.containerum.io:5000/download/chkit?os=mac_x64), [Ubuntu x32](https://web.api.containerum.io:5000/download/chkit?os=linux_x86), [Ubuntu x64](https://web.api.containerum.io:5000/download/chkit?os=linux_x64), [Windows x32](https://web.api.containerum.io:5000/download/chkit?os=windows_x86) and [Windows x64](https://web.api.containerum.io:5000/download/chkit?os=windows_x64).
Extract the file to any directory.

for **Ubuntu** and **MacOs**:
```
$ tar -xvf your_archive.tar -C /path/to/destination/dir/
```
Run the client from `/path/to/destination/dir/`:
```
$ ./chkit
```
</br></br>
*Note*: 
to run the client on Ubuntu from any directory, link it to one of the directories set in `$PATH`:
```
$ echo $PATH
```
to run the client on MacOs from any directory,  set the path to chkit in `.bash_profile` and update environment variables with `source` command.

### Example
For **Ubuntu** and **MacOs**:

Copy the path to chkit

`/Users/containerum/Downloads`

where `containerum` – user name

and make changes to `.bash_profile` (for **MacOs**) or to `.bashrc` (for **Ubuntu**)
```
export PATH="/Users/containerum/Downloads:${PATH}"
```
update environment variables for **MacOs**:
```
$ source .bash_profile
```
or for **Ubuntu**:
```
$ source .bashrc
```
Now you can run the client with a simple command from any directory:
```
$ chkit
```
