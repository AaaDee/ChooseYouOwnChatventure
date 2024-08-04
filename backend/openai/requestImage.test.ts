import { describe, expect, test, vi } from 'vitest';

vi.mock('./getOpenAIClient');
import { getOpenAIClient } from './getOpenAIClient';

import { requestImage } from './requestImage';
import OpenAI from 'openai';

const mockResponse = { data: [{ b64_json: 'test' }] };

describe('Image requests', () => {
  test('Returns the generated image', async () => {
    const mockGenerate = vi.fn().mockResolvedValue(mockResponse);
    mockOpenai(mockGenerate);

    const image = await requestImage('test');
    expect(image).toEqual('test');
  });

  test('Fails when no image is created', async () => {
    const failingMockGenerate = vi.fn().mockImplementation(() => {
      throw new Error('error');
    });
    mockOpenai(failingMockGenerate);
    await expect(requestImage('test')).rejects.toThrowError('image');
  });
});

function mockOpenai(mock: () => object) {
  vi.mocked(getOpenAIClient).mockReturnValue({
    images: {
      generate: mock
    }
  } as unknown as OpenAI); // inform Typescript that the conversion is intentional
}
