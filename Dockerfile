FROM node:22

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install

RUN yarn

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
