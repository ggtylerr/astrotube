FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash curl

RUN corepack enable

RUN yarn set version berry

COPY package.json yarn.lock ./

RUN yarn install --immutable

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
