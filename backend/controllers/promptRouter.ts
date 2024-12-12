import express, { Response } from 'express';
import { requestStartPrompt } from '../openai/requestStartPrompt';
import { ChatHistory, ImageDescription } from '../types';
import { mockEntry } from '../tests/mocks';
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';
import { doesRequestHaveValidToken } from '../features/doesRequestHaveValidToken';
import { requestImage } from '../openai/requestImage';

export const promptRouter = express.Router();

promptRouter.post('/start', (request, response) => {
  void (async function (): Promise<void> {
    if (!doesRequestHaveValidToken(request)) {
      sendInvalidTokenResponse(response);
      return;
    }

    try {
      const prompt = await requestStartPrompt();
      response.send(prompt);
    } catch (error) {
      console.log('error in start request', error);
      response.status(500).send(error);
    }
  })();
});

promptRouter.post('/ongoing', (request, response) => {
  void (async function (): Promise<void> {
    if (!doesRequestHaveValidToken(request)) {
      sendInvalidTokenResponse(response);
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

promptRouter.post('/image', (request, response) => {
  void (async function (): Promise<void> {
    if (!doesRequestHaveValidToken(request)) {
      sendInvalidTokenResponse(response);
      return;
    }

    const description = ImageDescription.parse(request.body);

    try {
      const image = await requestImage(description.description);
      response.send(image);
    } catch (error) {
      response.status(500).send(error);
    }
  })();
});

promptRouter.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});

function sendInvalidTokenResponse(response: Response) {
  response.status(401).json({ error: 'token invalid' });
}
