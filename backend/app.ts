import express from 'express';
import cors from 'cors';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { requestStartPrompt } from './openai/requestStartPrompt';
import { requestOngoingPrompt } from './openai/requestOngoingPrompt';
import { mockEntry } from './tests/mocks';

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
    const text = await requestDummyPrompt();
    response.json(text);
  })();
});

app.post('/start', (_request, response) => {
  void (async function (): Promise<void> {
    const prompt = await requestStartPrompt();
    response.send(prompt);
  })();
});

app.post('/ongoing', (request, response) => {
  void (async function (): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const prompt = await requestOngoingPrompt(request.body); // todo validate
    response.send(prompt);
  })();
});

app.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});

export default app;
