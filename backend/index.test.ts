import { describe, expect, test, vi } from 'vitest';

vi.mock('./features/setupMongoose');

import app from './app';
vi.mock('./app');

import './index';

describe('starting the app', () => {
  test('app.listen is called', () => {
    const mockApp = vi.mocked(app).mockImplementation(() => ({
      listen: jest
        .fn()
        .mockImplementation((_port, callback: () => void) => callback())
    }));

    expect(mockApp.listen).toHaveBeenCalled();
  });
});
