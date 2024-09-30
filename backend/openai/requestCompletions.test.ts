import { afterEach, describe, expect, test, vi } from 'vitest';
import { getOpenAIClient } from './getOpenAIClient';

vi.mock('./getOpenAIClient');

import OpenAI from 'openai';
import { mockJsonStringResponse } from '../tests/mocks';
import { requestCompletions } from './requestCompletions';

const mockResponse = {
  choices: [{ message: { content: mockJsonStringResponse } }]
};

const badResponse = {
  choices: [{ message: { content: 'notAJSON' } }]
};

describe('Text requests', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Returns generated text', async () => {
    const mockCreate = vi.fn().mockResolvedValue(mockResponse);
    mockOpenAI(mockCreate);
    const text = await requestCompletions([]);
    expect(text.content).toEqual('test');
  });

  test('Retries after poorly formatted respones', async () => {
    const mockCreate = vi
      .fn()
      .mockResolvedValueOnce(badResponse)
      .mockResolvedValue(mockResponse);

    mockOpenAI(mockCreate);
    const text = await requestCompletions([]);
    expect(text.content).toEqual('test');
  });

  test('Fails eventually', async () => {
    const mockCreate = vi.fn().mockResolvedValue(badResponse);
    mockOpenAI(mockCreate);
    await expect(requestCompletions([])).rejects.toThrowError('completion');
  });
});

function mockOpenAI(mock: () => object) {
  vi.mocked(getOpenAIClient).mockReturnValue({
    chat: {
      completions: {
        create: mock
      }
    }
  } as unknown as OpenAI); // inform Typescript that the conversion is intentional
}
