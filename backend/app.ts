import express from 'express';
import { requestText } from './openai/requestText';
import OpenAI from 'openai';
import cors from 'cors';

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
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const text = await requestText('hi', openai.chat.completions);
    response.json(text);
  })();
});

export default app;
