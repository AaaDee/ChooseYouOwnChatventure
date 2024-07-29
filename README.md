# Choose Your Own Chatventure

A website for AI-generated sword and sorcery adventures.

Currently hosted at [chooseyourownchatventure.net](https://chooseyourownchatventure.net)

## Project structure and overview

The project repo contains the code for both frontend and backend. The backend uses Node and Express, and the frontend uses React. Both are written in Typescript and tested using Jest.

There is a CI/CD pipeline using GitHub Actions [here](./.github/workflows). The project is first tested for functionality and linting, and then pushed to an image on DockerHub. The images are watched in the production server and pulled on updates.

The production server is a self-configured cloud server.

## Running the project locally

To run the project locally, you will need an [OpenAI api key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key) and a [MongoDB url for a working instance](https://www.mongodb.com/docs/manual/reference/connection-string/).

For configuration, copy the .env-template files in the backend and frontend folders into .env files, and update the content. 

After this, the easiest way to run the project locally is using Docker Compose. This command pulls the respective images from Dockerhub:

```
docker compose -f docker-compose-dev.yml up
```

Alternatively, you can start both frontend and backend by installing the dependencies with `npm install` and then running `npm start` in the respective folders.

