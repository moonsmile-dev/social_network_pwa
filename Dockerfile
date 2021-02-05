FROM node:10-alpine

WORKDIR /opt/app

ENV NODE_ENV production

ADD package*.json ./
ADD yarn.lock ./

RUN yarn install

ADD . /opt/app

RUN yarn add --dev typescript @types/node @types/styled-components @types/uuid @testing-library/react babel-plugin-module-resolver sass-loader

RUN yarn install --dev && yarn build

EXPOSE 3000

CMD [ "yarn", "start:dev" ]
