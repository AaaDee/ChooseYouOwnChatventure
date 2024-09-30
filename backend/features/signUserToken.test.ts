import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { signUserToken } from './signUserToken';
import { mockUser } from '../tests/mocks';

describe('Token signing', () => {
  // save environment for manipulation
  const OLD_ENV = process.env;

  beforeAll(() => {
    process.env = {};
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('fails without a valid secret', () => {
    expect(() => signUserToken(mockUser)).toThrowError('Secret');
  });
});
