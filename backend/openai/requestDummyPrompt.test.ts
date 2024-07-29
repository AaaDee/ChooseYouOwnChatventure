import { expect, test, vi } from 'vitest';

import { mockEntry } from '../tests/mocks';
import { requestCompletions } from './requestCompletions';
import { requestDummyPrompt } from './requestDummyPrompt';

vi.mock('./requestCompletions');

test('Returns string from the api', async () => {
  const completions_mock = vi.mocked(requestCompletions);
  completions_mock.mockResolvedValue(mockEntry);
  const response = await requestDummyPrompt();
  expect(response).toEqual('testing texting');
});
