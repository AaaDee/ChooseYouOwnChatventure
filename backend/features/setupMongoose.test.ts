import mongoose from 'mongoose';
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { setupMongoose } from './setupMongoose';

vi.mock('mongoose');

describe('Mongoose setup', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { MONGODB_URI: 'test' };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('connect is called', async () => {
    const mongooseSpy = vi.spyOn(mongoose, 'connect');
    await setupMongoose();
    expect(mongooseSpy).toHaveBeenCalled();
  });

  test('Missing uri fails', async () => {
    process.env = {};
    await expect(setupMongoose()).rejects.toThrow('missing');
  });

  test('Connection error are reported', async () => {
    vi.spyOn(mongoose, 'connect').mockImplementation(() => {
      throw new Error('error');
    });

    const consoleSpy = vi
      .spyOn(global.console, 'warn')
      .mockImplementation(() => {});

    await setupMongoose();
    expect(consoleSpy).toHaveBeenCalled();
  });
});
