FROM node:22-alpine

COPY package.json yarn.lock ./

RUN apk add nodejs-current && corepack enable

RUN yarn set version berry

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
