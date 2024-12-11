import { describe, expect, test, vi } from 'vitest';

vi.mock('./features/setupMongoose');

import app from './app';
vi.mock('./app');

import { callback } from './index';

describe('starting the app', () => {
  test('app.listen is called', () => {
    const mockApp = vi.mocked(app).mockImplementation(() => {
      return {
        listen: vi.fn()
      };
    });

    expect(mockApp.listen).toHaveBeenCalled();
  });

  test('callback uses log', () => {
    const spy = vi.spyOn(global.console, 'log');
    callback(3001)();
    expect(spy).toHaveBeenCalled();
  });
});
