import {describe, expect, test} from '@jest/globals';

import * as supertest from 'supertest';

import app from '../app';
const api = supertest(app)

describe('testing works', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(1+2).toBe(3);
  });

  test('hello world is returned', async () => {
    await api
      .get('/')
      .expect(200)
      .expect('<h1>Hello World!</h1>'
)
  });
});

