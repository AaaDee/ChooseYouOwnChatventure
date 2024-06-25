import { requestCompletions } from './requestCompletions';
import { ChatCompletionMessageParam } from 'openai/resources';
import { mockOpenAiCompletionResponse } from '../tests/mocks';

jest.mock('openai', () => {
  return function () {
    return {
      chat: {
        completions: {
          create: () => {
            return mockOpenAiCompletionResponse;
          }
        }
      }
    };
  };
});

test('Returns openai message', async () => {
  const messages = [] as ChatCompletionMessageParam[];
  const response = await requestCompletions(messages);
  expect(response).toEqual(
    mockOpenAiCompletionResponse.choices[0].message.content
  );
});
