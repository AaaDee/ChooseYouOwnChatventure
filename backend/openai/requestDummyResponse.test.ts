import { requestCompletions } from './requestCompletions';
import { requestDummyResponse } from './requestDummyResponse';

jest.mock('./requestCompletions');

test('Returns string from the api', async () => {
  const completions_mock = jest.mocked(requestCompletions);
  completions_mock.mockResolvedValue('test');
  const text = await requestDummyResponse();
  expect(text).toEqual('test');
});
