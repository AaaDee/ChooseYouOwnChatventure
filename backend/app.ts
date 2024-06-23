import express from 'express';
import { requestText } from './openai/requestText';
import OpenAI from 'openai';

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send('<h1>Hello World!</h1>');
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/', async (_request, response) => {
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY']
  });

  const text = await requestText('hi', openai.chat.completions);
  response.send(text);
});

export default app;
