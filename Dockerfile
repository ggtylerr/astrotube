FROM node:22

RUN npm install yarn -g --force

COPY package.json yarn.lock

RUN yarn set version berry
RUN yarn install

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
