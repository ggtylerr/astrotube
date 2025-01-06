FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash curl

RUN corepack enable && corepack prepare yarn@4.4.0 --activate

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
