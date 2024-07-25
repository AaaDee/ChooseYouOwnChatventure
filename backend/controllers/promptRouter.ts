import express from 'express';
import { requestStartPrompt } from '../openai/requestStartPrompt';
import { ChatHistory } from '../types';
import { mockEntry } from '../tests/mocks';
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';
import { doesRequestHaveValidToken } from '../features/doesRequestHaveValidToken';

export const promptRouter = express.Router();

promptRouter.post('/start', (request, response) => {
  void (async function (): Promise<void> {
    if (!doesRequestHaveValidToken(request)) {
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

promptRouter.post('/ongoing', (request, response) => {
  void (async function (): Promise<void> {
    if (!doesRequestHaveValidToken(request)) {
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
