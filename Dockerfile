FROM node:22

WORKDIR /app

RUN npm install yarn

COPY package.json yarn.lock ./

RUN yarn set version berry

COPY . .

EXPOSE 4321

CMD [ "yarn", "dev" ]
