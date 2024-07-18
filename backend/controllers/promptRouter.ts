import express from 'express';
import { requestStartPrompt } from '../openai/requestStartPrompt';
import { ChatHistory } from '../types';
import { mockEntry } from '../tests/mocks';
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';

export const promptRouter = express.Router();

promptRouter.post('/start', (_request, response) => {
  void (async function (): Promise<void> {
    const prompt = await requestStartPrompt();
    response.send(prompt);
  })();
});

promptRouter.post('/ongoing', (request, response) => {
  void (async function (): Promise<void> {
    const chatHistory = ChatHistory.parse(request.body);
    const prompt = await requestOngoingPrompt(chatHistory);
    response.send(prompt);
  })();
});

promptRouter.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});
