# nextjs-ghostcms-integration

This repository is intended for demostration purposes and should not be used in a production environment.  
It demonstrates how to integrate the usage of a nextjs frontend, while having a headless Ghost CMS instance.

It uses Nginx to serve both services.

#### What is Next JS
[Next.js](https://nextjs.org/) is a React framework for serverside rendered websites.
Using it gives the developer complete freedom to create and a wide access to many templates and libraries readily available.

#### What is Ghost CMS
[Ghost](https://ghost.org/) is a CMS platform that can be used both in its hosted version and in the open-source
headless version.
This example uses the latter to provide the website admin's the Ghost UI, a separate access to create and edit blog posts.

#### What is Nginx
[NGINX](https://www.nginx.com/) is a web service used for load balancing, proxy serving and more.

### How does everything work together?
In this example every one of these 3 services is hosted in a Docker container, the user will only access the NGINX server, 
it will then use its proxy functionalities to redirect traffic to both the 'frontend' next service and to the 'cms' ghost service
based on URL path rules.

  
The frontend will interact with ghost through the [content API](https://ghost.org/docs/content-api/) or the [admin API](https://ghost.org/docs/admin-api/)



## Instructions
#### For local development:
1. Change your local hosts file by adding the following line: `127.0.0.1 dev.yourwebsite.com`
2. `docker-compose -f docker-compose.yml -f docker-compose-local.yml up`
3. navigate to *dev.yourwebsite.com* to access the frontend service and to *dev.yourwebsite.com/blog/ghost* to access the ghost backend
4. for the Ghost API to work you'll need to create an integration in the Ghost UI.  
  under Settings > Integrations > Add custom integration  
  then copy the content and admin key under the env variables in the frontend/.env.local file
  