import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  mockChatHistoryOneChoice,
  mockEmptyChatHistory,
  mockEntry
} from '../tests/mocks';

import { requestOngoingPrompt } from './requestOngoingPrompt';

vi.mock('./requestCompletions');
import { requestCompletions } from './requestCompletions';

describe('Ongoing prompt request', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Returns Ongoing prompt correctly', async () => {
    vi.mocked(requestCompletions).mockResolvedValue(mockEntry);
    const responsePrompt = await requestOngoingPrompt(mockEmptyChatHistory);
    expect(mockEntry).toEqual(responsePrompt.entry);
  });

  test('Throws error on failing completion', async () => {
    vi.mocked(requestCompletions).mockImplementation(() => {
      throw new Error('error');
    });
    await expect(
      requestOngoingPrompt(mockEmptyChatHistory)
    ).rejects.toThrowError('completion');
  });

  test('Correct number of entries in parsed message history', async () => {
    const spy = vi.mocked(requestCompletions).mockResolvedValue(mockEntry);
    await requestOngoingPrompt(mockChatHistoryOneChoice);
    expect(spy.mock.calls[0][0].length).toEqual(3);
  });
});
