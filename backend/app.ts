import cors from 'cors';
import express from 'express';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { userRouter } from './controllers/userRouter';
import { promptRouter } from './controllers/promptRouter';
import { setupMongoose } from './features/setupMongoose';

void (async () => {
  try {
    await setupMongoose();
  } catch (e) {
    console.log('Mongoose setup failed', e);
  }
})();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/prompt', promptRouter);

app.get('/ping', (_request, response) => {
  response.send('ping!');
});

app.post('/', (_request, response) => {
  void (async function (): Promise<void> {
    const text = await requestDummyPrompt();
    response.json(text);
  })();
});

export default app;
