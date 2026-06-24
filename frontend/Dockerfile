FROM node:20

WORKDIR /usr/src/app

ENV VITE_BACKEND_URL=/api

# GTM container ID is inlined by Vite at build time, so it must be passed as a
# build arg (not via compose `environment:`, which only affects runtime).
# Provided by docker-compose from the gitignored root .env; defaults to empty,
# which disables GTM.
ARG VITE_GTM_ID
ENV VITE_GTM_ID=$VITE_GTM_ID

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "-s", "dist"]