import express, { Request } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { requestStartPrompt } from '../openai/requestStartPrompt';
import { ChatHistory } from '../types';
import { mockEntry } from '../tests/mocks';
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';

export const promptRouter = express.Router();

promptRouter.post('/start', (request, response) => {
  void (async function (): Promise<void> {
    const decodedToken = jsonwebtoken.verify(
      getTokenFrom(request),
      process.env.SECRET || ''
    ) as JwtPayload;
    if (!decodedToken.id) {
      response.status(401).json({ error: 'token invalid' });
      return;
    }

    try {
      const prompt = await requestStartPrompt();
      response.send(prompt);
    } catch (error) {
      response.status(500).send(error);
    }
  })();
});

// todo fix token
promptRouter.post('/ongoing', (request, response) => {
  void (async function (): Promise<void> {
    const decodedToken = jsonwebtoken.verify(
      getTokenFrom(request),
      process.env.SECRET || ''
    ) as JwtPayload;
    if (!decodedToken.id) {
      response.status(401).json({ error: 'token invalid' });
      return;
    }

    const chatHistory = ChatHistory.parse(request.body);

    try {
      const prompt = await requestOngoingPrompt(chatHistory);
      response.send(prompt);
    } catch (error) {
      response.status(500).send(error);
    }
  })();
});

promptRouter.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});

function getTokenFrom(request: Request): string {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return '';
}
