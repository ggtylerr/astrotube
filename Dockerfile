FROM node:21

COPY ./ ./

RUN corepack prepare yarn@stable --activate

RUN yarn set version berry

RUN yarn

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
