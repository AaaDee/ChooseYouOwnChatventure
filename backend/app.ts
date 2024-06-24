import express from 'express';
import cors from 'cors';
import { requestDummyResponse } from './openai/requestDummyResponse';
import { getOpenAiCompletions } from './openai/getOpenAIClient';

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
    const completions = getOpenAiCompletions();
    const text = await requestDummyResponse(completions);
    response.json(text);
  })();
});

export default app;
