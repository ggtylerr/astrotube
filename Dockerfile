FROM node:22

RUN npm install yarn -g --force

COPY package.json yarn.lock

RUN corepack prepare yarn@stable --activate

RUN yarn cache clean

RUN yarn install --immutable

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
