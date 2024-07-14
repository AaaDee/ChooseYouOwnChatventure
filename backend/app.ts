import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { requestStartPrompt } from './openai/requestStartPrompt';
import { requestOngoingPrompt } from './openai/requestOngoingPrompt';
import { mockEntry } from './tests/mocks';
import { User } from './models/user';

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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/user', async (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { username, password } = request.body;
  console.log(request.body);

  console.log(username, password);

  const saltRounds = 10;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    username,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    passwordHash
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

export default app;
