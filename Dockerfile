FROM node:22

WORKDIR /app

RUN npm install -g yarn --force

COPY package.json yarn.lock ./

RUN yarn set version berry

RUN yarn install

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
