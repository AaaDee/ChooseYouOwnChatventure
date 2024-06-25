import express from 'express';
import cors from 'cors';
import { requestDummyResponse } from './openai/requestDummyResponse';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/ping', (_request, response) => {
  response.send('ping!');
});

app.post('/', (_request, response) => {
  void (async function (): Promise<void> {
    const text = await requestDummyResponse();
    response.json(text);
  })();
});

export default app;
