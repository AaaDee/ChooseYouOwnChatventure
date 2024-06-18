import express from 'express';

const app = express();


app.use(express.json());

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

export default app;