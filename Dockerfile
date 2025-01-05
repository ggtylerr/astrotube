FROM node:18

WORKDIR /app

RUN npm install -g yarn@berry

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 4321

RUN cp config.ts.example config.ts

CMD ["yarn", "dev"]
