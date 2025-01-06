FROM node:22-alpine

COPY package.json yarn.lock .yarnrc.yml ./

RUN apk add nodejs-current && corepack disable && npm install

RUN yarn set version berry

COPY . .

RUN cp config.ts.example config.ts

EXPOSE 4321

CMD ["yarn", "dev", "--host", "0.0.0.0"]
