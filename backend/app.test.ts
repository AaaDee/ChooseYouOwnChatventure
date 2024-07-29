import { describe, test, vi } from 'vitest';
import { requestDummyPrompt } from './openai/requestDummyPrompt';
import { mockApp } from './tests/mockApp';

vi.mock('./openai/requestDummyPrompt');

const app = mockApp();

describe('app works at basic level;', () => {
  test('ping is returned', async () => {
    await app.get('/ping').expect(200).expect('ping!');
  });

  test('post returns json content', async () => {
    const mockedRequest = vi.mocked(requestDummyPrompt);
    mockedRequest.mockResolvedValue('test');
    await app.post('/').expect('Content-Type', /application\/json/);
  });
});
