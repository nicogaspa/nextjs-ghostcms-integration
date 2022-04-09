FROM nginx:1.21.6
RUN apt-get update \
&& apt-get install certbot -y
COPY ./prod/nginx.conf /etc/nginx/nginx.conf

