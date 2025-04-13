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
For production, you can use the `docker-compose-prod.yml` and `config.ts` files, for example:
```sh
curl -O https://raw.githubusercontent.com/ggtylerr/astrotube/main/docker-compose-prod.yml -o docker-compose.yml
curl -O https://raw.githubusercontent.com/ggtylerr/astrotube/main/config.ts.example -o config.ts

# configure config.ts and docker-compose.yml to your liking

docker compose up -d
```

If you prefer to use `docker run` instead:
```sh
curl -O https://raw.githubusercontent.com/ggtylerr/astrotube/main/config.ts.example -o config.ts
# configure config.ts to your liking
docker run -d -p 4321:4321 -v ./config.ts:/app/config.ts --name astrotube-frontend ghcr.io/ggtylerr/astrotube:frontend-main
docker run -d -p 4949:4949 -v ./config.ts:/app/config.ts --name astrotube-backend ghcr.io/ggtylerr/astrotube:backend-main
```

For development:
```sh
git clone https://github.com/ggtylerr/astrotube
cd astrotube

cp config.ts.example config.ts
cp docker-compose-dev.yml docker-compose.yml
# configure config.ts & docker-compose.yml to your liking

docker compose build
docker compose up -d
```