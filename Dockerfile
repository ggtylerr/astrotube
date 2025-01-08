FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache bash && corepack enable

COPY . .

RUN sed -i '/^yarnPath:/d' .yarnrc.yml

RUN corepack prepare yarn@berry --activate

RUN yarn install --immutable

RUN [ ! -f config.ts ] && cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
