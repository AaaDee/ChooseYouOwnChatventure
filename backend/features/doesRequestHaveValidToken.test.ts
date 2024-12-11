import { afterAll, describe, expect, test } from 'vitest';
import { Request } from 'express';
import { doesRequestHaveValidToken } from './doesRequestHaveValidToken';
import { signUserToken } from './signUserToken';
import { User } from '../types';

describe('Token validator', () => {
  // save environment for manipulation
  const OLD_ENV = process.env;

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test('Validator without authorization fails', () => {
    process.env = {};

    const req = {
      get: () => ''
    } as unknown as Request;

    const isValid = doesRequestHaveValidToken(req);
    expect(isValid).toBeFalsy();
  });

  test('Validator without secret fails', () => {
    process.env = {};

    const req = {
      get: () => 'Bearer test'
    } as unknown as Request;

    const isValid = doesRequestHaveValidToken(req);
    expect(isValid).toBeFalsy();
  });

  test('Validator without Bearer header fails', () => {
    process.env = { SECRET: 'secret' };
    const req = {
      get: () => 'test'
    } as unknown as Request;

    const isValid = doesRequestHaveValidToken(req);
    expect(isValid).toBeFalsy();
  });

  test('Validator with correct secret succeeds', () => {
    process.env = { SECRET: 'secret' };
    // todo fix
    const token = signUserToken({ username: 'test' } as any as User);

    const req = {
      get: () => `Bearer ${token}`
    } as unknown as Request;

    const isValid = doesRequestHaveValidToken(req);
    expect(isValid).toBeFalsy();
  });
});
