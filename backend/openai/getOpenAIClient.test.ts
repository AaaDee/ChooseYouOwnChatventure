import { getOpenAIClient } from './getOpenAIClient';

describe('openai object', () => {
  // save environment for manipulation
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { OPENAI_API_KEY: 'dummy' };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('has chat property', () => {
    const openai = getOpenAIClient();
    expect(openai).toHaveProperty('chat');
  });
});
