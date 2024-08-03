import { describe, expect, test, vi } from 'vitest';
import { mockEntry } from '../tests/mocks';

import { requestStartPrompt } from './requestStartPrompt';

vi.mock('./requestCompletions');
import { requestCompletions } from './requestCompletions';

describe('Start prompt request', () => {
  test('Returns start prompt correctly', async () => {
    vi.mocked(requestCompletions).mockResolvedValue(mockEntry);
    const responsePrompt = await requestStartPrompt();
    expect(mockEntry).toEqual(responsePrompt.entry);
  });

  test('Throws error on failing completion', async () => {
    vi.mocked(requestCompletions).mockImplementation(() => {
      throw new Error('error');
    });
    await expect(requestStartPrompt()).rejects.toThrowError('completion');
  });
});
