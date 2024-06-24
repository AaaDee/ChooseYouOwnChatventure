/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, test } from '@jest/globals';
import supertest from 'supertest';
import app from './app';
import { getOpenAIClient } from './openai/getOpenAIClient';
import { mockChoices } from './tests/mocks';

jest.mock('./openai/getOpenAIClient');

const api = supertest(app);

describe('app works at basic level;', () => {
  test('hello world is returned', async () => {
    await api.get('/').expect(200).expect('<h1>Hello World!</h1>');
  });

  test('ping is returned', async () => {
    await api.get('/ping').expect(200).expect('ping!');
  });

  test('post returns json content', async () => {
    const mock_create = jest.fn().mockResolvedValue(mockChoices);

    const mock_api_client = {
      test: 'hi!',
      chat: {
        completions: {
          create: mock_create
        }
      }
    };

    const openai_get_mock = getOpenAIClient as any;
    openai_get_mock.mockReturnValue(mock_api_client);
    await api.post('/').expect('Content-Type', /application\/json/);
  });
});
