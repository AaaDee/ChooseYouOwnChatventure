import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('../features/doesRequestHaveValidToken');
import { doesRequestHaveValidToken } from '../features/doesRequestHaveValidToken';

vi.mock('../openai/requestStartPrompt');
import { requestStartPrompt } from '../openai/requestStartPrompt';

vi.mock('../openai/requestOngoingPrompt');
import { requestOngoingPrompt } from '../openai/requestOngoingPrompt';

import { mockApp } from '../tests/mockApp';
import { mockEmptyChatHistory, mockPrompt } from '../tests/mocks';
const app = mockApp();

describe('Prompt Router', () => {
  beforeEach(() => {
    vi.mocked(doesRequestHaveValidToken).mockReturnValue(true);
  });

  test('Dummy prompt is sent correctly', async () => {
    const response = await app.post('/prompt/dummy');

    expect(response.body.id).toEqual('test');
  });

  test('Start prompt is sent correctly', async () => {
    vi.mocked(requestStartPrompt).mockResolvedValue(mockPrompt);
    const response = await app.post('/prompt/start');
    expect(response.body.entry.id).toEqual('test');
  });

  test('Start prompt returns 401 on invalid token ', async () => {
    vi.mocked(doesRequestHaveValidToken).mockReturnValue(false);
    const response = await app.post('/prompt/start');
    expect(response.status).toEqual(401);
  });

  test('Start prompt returns 500 on failed prompt', async () => {
    vi.mocked(requestStartPrompt).mockImplementation(() => {
      throw new Error('error');
    });
    const response = await app.post('/prompt/start');
    expect(response.status).toEqual(500);
  });

  test('Ongoing prompt is sent correctly', async () => {
    vi.mocked(requestOngoingPrompt).mockResolvedValue(mockPrompt);
    const response = await app
      .post('/prompt/ongoing')
      .send(mockEmptyChatHistory);
    expect(response.body.entry.id).toEqual('test');
  });

  test('Ongoing prompt returns 401 on invalid token ', async () => {
    vi.mocked(doesRequestHaveValidToken).mockReturnValue(false);
    const response = await app.post('/prompt/ongoing');
    expect(response.status).toEqual(401);
  });

  test('Ongoing prompt returns 500 on failed prompt', async () => {
    vi.mocked(requestOngoingPrompt).mockImplementation(() => {
      throw new Error('error');
    });
    const response = await app
      .post('/prompt/ongoing')
      .send(mockEmptyChatHistory);
    expect(response.status).toEqual(500);
  });
});
