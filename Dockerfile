FROM node:22

WORKDIR /app

RUN npm install yarn

COPY package.json yarn.lock ./

COPY config.ts.example config.ts ./

RUN corepack enable

RUN yarn set version berry

RUN yarn install

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
