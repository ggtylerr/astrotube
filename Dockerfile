FROM node:22

RUN npm install --global yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN rm -rf node_modules **/node_modules
RUN yarn cache clean

RUN yarn install --immutable

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev"]
