FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache yarn

COPY package.json yarn.lock ./

RUN yarn set version berry

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
