FROM node:22

WORKDIR /usr/app
COPY ./ ./
RUN npm install

RUN yarn set version berry

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
