FROM node:22

COPY package.json yarn.lock

RUN npm install yarn -g --force

RUN yarn set version berry

COPY . .

RUN yarn

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
