# The Pem is Mightier than the Sword

## About

This is a simple micro blog that provides the following functionalities:
* List of posts
* Create new posts
* Delete posts
* Update posts
* View individual posts

All posts created and updated are based attributed to Anonymous User

## Provides

* Centos 7 Box
* LEMP Stack
  * Nginx
  * PHP-FPM
  * SQLite

## Requires

* Ansible 1.8.1+
* Vagrant 1.8+
* Internet access for additional software download and installs

## Depends on

List of project specific system requirements.
* See requirements.yml

Frontend dependencies:
* jQuery 3.1.1+
* Bootstrap 3+

In addition, this uses the Creative theme found at: https://startbootstrap.com/template-overviews/creative/

## Setup

### Install / Update Ansible-Galaxy Roles

Run the following command to update your ansible galaxy roles (sudo if necessary):
```
sudo ansible-galaxy install -r requirements.yml --ignore-errors
```

### Add following line to your host machine /etc/hosts:

```
192.168.100.120 micro-blog.dev
```

If you are having issues with Ansible / Vagrant or would prefer to use your own web server please refer to the link below on how to configure Silex:
http://silex.sensiolabs.org/doc/master/web_servers.html

## Usage

### Dev

Start up the vagrant box:

```
vagrant up
```

### Nginx

* visit 192.168.100.120 for Nginx test page
* visit http://micro-blog.dev/api/posts to verify the micro-blog is configured correctly
