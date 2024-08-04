import { describe, expect, test, vi } from 'vitest';

vi.mock('./getOpenAIClient');
import { getOpenAIClient } from './getOpenAIClient';

import { requestImage } from './requestImage';
import OpenAI from 'openai';

const mockResponse = { data: [{ b64_json: 'test' }] };

describe('Image requests', () => {
  test('Returns the generated image', async () => {
    vi.mocked(getOpenAIClient).mockReturnValue({
      images: {
        generate: vi.fn().mockResolvedValue(mockResponse)
      }
    } as unknown as OpenAI); // inform Typescript that the conversion is intentional

    const image = await requestImage('test');
    expect(image).toEqual('test');
  });
});
