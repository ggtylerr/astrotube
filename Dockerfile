FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn set version berry

RUN yarn

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
