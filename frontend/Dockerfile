FROM node:16-alpine
# CET time
RUN ln -sf /usr/share/zoneinfo/CET /etc/localtime

WORKDIR /app/

ENV PATH /app/node_modules/.bin:$PATH
# Installing node_modules in a different folder
# to avoid having the container using the local (shared volume) one
# node_modules installed in Windows might not work in the Linux container enviroment
COPY ./package.json /app/
COPY ./yarn.lock /app/
RUN yarn install

# Copying source code
COPY . /app/

