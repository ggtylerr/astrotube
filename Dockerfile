FROM node:21-alpine3.19

COPY yarn.lock package.json ./

RUN yarn set version berry

RUN yarn

COPY ./ ./

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
