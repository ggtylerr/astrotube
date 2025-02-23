# AstroTube

A proof of concept YouTube frontend made in Astro, utilizing an API compatible with [Invidious.](https://invidious.io) Still very much a WIP.

## Bare metal setup
```sh
git clone https://github.com/ggtylerr/astrotube
cd astrotube
yarn set version berry

cp config.ts.example config.ts
# configure config.ts to your liking

cd frontend && yarn
cd ../backend && yarn
```

To run the frontend, run `yarn dev` or `yarn build && yarn preview` in the frontend directory.

To run the backend, run `yarn start` in the backend directory.

## Docker setup
```sh
git clone https://github.com/ggtylerr/astrotube
cd astrotube

cp config.ts.example config.ts
# configure config.ts to your liking

docker compose build
docker compose up -d
```