import { describe, test } from '@jest/globals';
import supertest from 'supertest';
import app from './app';
import { requestDummyPrompt } from './openai/requestDummyPrompt';

jest.mock('./openai/requestDummyPrompt');

const api = supertest(app);

describe('app works at basic level;', () => {
  test('ping is returned', async () => {
    await api.get('/ping').expect(200).expect('ping!');
  });

  test('post returns json content', async () => {
    const mockedRequest = jest.mocked(requestDummyPrompt);
    mockedRequest.mockResolvedValue('test');
    await api.post('/').expect('Content-Type', /application\/json/);
  });
});
