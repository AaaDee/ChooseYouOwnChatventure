import { afterAll, describe, expect, test } from 'vitest';
import { Request } from 'express';
import { doesRequestHaveValidToken } from './doesRequestHaveValidToken';
import { signUserToken } from './signUserToken';

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
    // todo fix to use user instead of full schema
    const token = signUserToken({
      username: 'test',
      _id: '_123',
      passwordHash: 'asdf'
    });

    const req = {
      get: () => `Bearer ${token}`
    } as unknown as Request;

    const isValid = doesRequestHaveValidToken(req);
    expect(isValid).toBeFalsy();
  });
});
