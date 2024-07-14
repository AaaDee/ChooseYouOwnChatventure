import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/login', async (request, response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { username, password } = request.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const user = await User.findOne({ username });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const passwordCorrect =
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    user === null
      ? false // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      : await bcrypt.compare(password, user.passwordHash || '');

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const token = jwt.sign(userForToken, process.env.SECRET || '');

  response
    .status(200)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    .send({ token, username: user.username });
});

export default app;
