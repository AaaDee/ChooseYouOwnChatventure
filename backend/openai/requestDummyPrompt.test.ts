import { requestCompletions } from './requestCompletions';
import { requestDummyPrompt } from './requestDummyPrompt';

jest.mock('./requestCompletions');

test('Returns string from the api', async () => {
  const completions_mock = jest.mocked(requestCompletions);
  completions_mock.mockResolvedValue('test');
  const text = await requestDummyPrompt();
  expect(text).toEqual('test');
});
