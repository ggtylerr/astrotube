FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn set version berry

COPY . .

RUN cp config.ts.example config.ts

RUN yarn install --immutable

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
