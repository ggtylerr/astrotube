# base
FROM node:22-alpine AS base
WORKDIR /app

RUN apk add --no-cache bash && corepack enable
COPY . .

RUN [ ! -f config.ts ] && cp config.ts.example config.ts || true

# frontend
FROM base AS frontend
WORKDIR /app/frontend

RUN sed -i '/^yarnPath:/d' .yarnrc.yml
RUN corepack prepare yarn@stable --activate
RUN yarn install --immutable

RUN npx astro telemetry disable # disable astro telemetry cause boooooo

EXPOSE 4321
CMD ["yarn", "dev", "--host", "0.0.0.0"]

# backend
FROM base AS backend
WORKDIR /app/backend

RUN ln -s /lib/libc.musl-x86_64.so.1 /lib/ld-linux-x86-64.so.2 # fix for uWS.js on alpine, thanks @dalisoft !

RUN sed -i '/^yarnPath:/d' .yarnrc.yml
RUN corepack prepare yarn@stable --activate
RUN yarn install --immutable

EXPOSE 4949
CMD ["yarn", "start"]