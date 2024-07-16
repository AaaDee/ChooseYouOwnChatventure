import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { requestStartPrompt } from './openai/requestStartPrompt';
import { requestOngoingPrompt } from './openai/requestOngoingPrompt';
import { mockEntry } from './tests/mocks';
import { User } from './models/user';
import { UserInput } from './types';

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

// app.post('/user', (request, response) => {
//   void (async function (): Promise<void> {
//     const { username, password } = UserInput.parse(request.body);
//     const saltRounds = 10;

//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const user = new User({
//       username,
//       passwordHash
//     });

//     const savedUser = await user.save();

//     response.status(201).json(savedUser);
//   })();
// });

app.post('/login', (request, response) => {
  void (async function (): Promise<void> {
    const { username, password } = UserInput.parse(request.body);

    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid username or password'
      });
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET || ''); // todo add check for process.env

    response.status(200).send({ token, username: user.username });
  })();
});

export default app;
