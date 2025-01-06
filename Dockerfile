FROM node:22

RUN npm install yarn -g --force
RUN yarn --c

WORKDIR /app

COPY package.json yarn.lock

RUN corepack prepare yarn@stable --activate

RUN rm -rf node_modules **/node_modules
RUN yarn cache clean

RUN yarn install --immutable

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
