FROM node:22

RUN npm install yarn -g --force

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn set version berry

RUN yarn

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
