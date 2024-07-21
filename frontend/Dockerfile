FROM node:20

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=/api

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "build"]