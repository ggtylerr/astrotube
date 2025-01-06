FROM node:22

RUN corepack enable

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack prepare yarn@stable --activate

RUN yarn install

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
