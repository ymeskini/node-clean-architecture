FROM node:22-alpine

RUN npm install -g nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package-lock.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3001

CMD [ "nodemon", "-L" ]
