import { expect, test, vi } from 'vitest';
import axios from 'axios';
import { postRequest } from './postRequest';

vi.mock('axios');

test('Post request calls axios.post', async () => {
  const postMock = vi.spyOn(axios, 'post');
  await postRequest('test');
  expect(postMock).toBeCalled();
});
