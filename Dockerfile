FROM node:16-alpine

RUN yarn global add nodemon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/

RUN yarn install

COPY . /usr/src/app

EXPOSE 3001

CMD [ "nodemon", "-L" ]