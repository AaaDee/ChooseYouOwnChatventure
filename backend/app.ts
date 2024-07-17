import cors from 'cors';
import express from 'express';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { requestStartPrompt } from './openai/requestStartPrompt';
import { requestOngoingPrompt } from './openai/requestOngoingPrompt';
import { mockEntry } from './tests/mocks';
import { userRouter } from './controllers/userRouter';
import { ChatHistory } from './types';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

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
    const chatHistory = ChatHistory.parse(request.body);
    const prompt = await requestOngoingPrompt(chatHistory);
    response.send(prompt);
  })();
});

app.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});

export default app;
