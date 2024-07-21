FROM node:20

WORKDIR /usr/src/app

# Set env variable
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "build"]