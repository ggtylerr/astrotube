FROM node:22

WORKDIR /usr/app
COPY ./ ./
RUN npm install

RUN yarn install

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
