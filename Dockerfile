FROM node:18-alpine

WORKDIR /app

RUN npm install -g yarn

RUN yarn set version berry

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
