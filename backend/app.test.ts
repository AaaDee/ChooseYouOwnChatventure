import { describe, test } from '@jest/globals';
import supertest from 'supertest';
import app from './app';
import { requestDummyPrompt } from './openai/requestDummyPrompt';

jest.mock('./openai/requestDummyResponse');

const api = supertest(app);

describe('app works at basic level;', () => {
  test('hello world is returned', async () => {
    await api.get('/').expect(200).expect('<h1>Hello World!</h1>');
  });

  test('ping is returned', async () => {
    await api.get('/ping').expect(200).expect('ping!');
  });

  test('post returns json content', async () => {
    const mockedRequest = jest.mocked(requestDummyPrompt);
    mockedRequest.mockResolvedValue('test');
    await api.post('/').expect('Content-Type', /application\/json/);
  });
});
