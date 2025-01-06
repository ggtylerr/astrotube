FROM node:21-alpine3.19

WORKDIR /app

COPY yarn.lock package.json ./

RUN yarn install

COPY ./ ./

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
