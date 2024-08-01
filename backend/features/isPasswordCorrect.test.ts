import { describe, expect, test } from 'vitest';
import { isPasswordCorrect } from './isPasswordCorrect';
import bcrypt from 'bcrypt';

const password = 'test';
const passwordHash = await bcrypt.hash(password, 1);

const user = {
  _id: '1',
  username: 'test',
  passwordHash
};

describe('Password checker', () => {
  test('returns true on correct password', async () => {
    const isCorrect = await isPasswordCorrect(user, 'test');
    expect(isCorrect).toBeTruthy();
  });

  test('returns false on incorrect password', async () => {
    const isCorrect = await isPasswordCorrect(user, 'test-test');
    expect(isCorrect).toBeFalsy();
  });
});
