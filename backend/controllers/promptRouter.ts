import express from 'express';
import { requestStartPrompt } from '../openai/requestStartPrompt';
import { ChatHistory } from '../types';
import { mockEntry } from '../tests/mocks';
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';
import { getOpenAIClient } from '../openai/getOpenAIClient';

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

// For debug purposes
promptRouter.get('/image', (_request, response) => {
  void (async function (): Promise<void> {
    const openai = getOpenAIClient();
    const prompt = 'an illustration from a 70s/80s sword and sorcery novel';

    const imageResponse = await openai.images.generate({
      prompt,
      n: 1,
      quality: 'standard',
      model: 'dall-e-3',
      size: '1024x1024',
      response_format: 'url'
    });

    response.send(imageResponse);
  })();
});
