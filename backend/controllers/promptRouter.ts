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
    const prompt = await requestStartPrompt();
    response.send(prompt);
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
    const prompt = await requestOngoingPrompt(chatHistory);
    response.send(prompt);
  })();
});

promptRouter.post('/dummy', (_request, response) => {
  response.send(mockEntry);
});

// For debug purposes
// promptRouter.get('/image', (_request, response) => {
//   void (async function (): Promise<void> {
//     const openai = getOpenAIClient();
//     const prompt = 'an illustration from a 70s/80s sword and sorcery novel';

//     const imageResponse = await openai.images.generate({
//       prompt,
//       n: 1,
//       quality: 'standard',
//       model: 'dall-e-3',
//       size: '1024x1024',
//       response_format: 'url'
//     });

//     response.send(imageResponse);
//   })();
// });

function getTokenFrom(request: Request): string {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return '';
}
