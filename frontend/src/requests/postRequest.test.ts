import axios from 'axios';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { postRequest } from './postRequest';

vi.mock('axios');

describe('Post request', () => {
  beforeEach(() => {
    const localStorageMock = (() => {
      const store: Record<string, string> = {};
      return {
        getItem: vi.fn((key) => store[key] || null)
      };
    })();

    vi.stubGlobal('localStorage', localStorageMock);
  });

  test(' calls axios.post', async () => {
    const postMock = vi.spyOn(axios, 'post');
    await postRequest('test');
    expect(postMock).toBeCalled();
  });
});
