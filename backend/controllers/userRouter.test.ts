import { describe, test, vi } from 'vitest';
import { mockApp } from '../tests/mockApp';

vi.mock('../models/user');
import { User } from '../models/user';

vi.mock('../features/isPasswordCorrect');
import { isPasswordCorrect } from '../features/isPasswordCorrect';

vi.mock('../features/signUserToken');
import { signUserToken } from '../features/signUserToken';

const app = mockApp();

vi.spyOn(User, 'findOne').mockResolvedValue({
  _id: '123',
  username: 'user',
  passwordHash: 'test'
});

vi.mocked(signUserToken).mockReturnValue('test');

describe('Login', () => {
  test('Successful login returns 200', async () => {
    vi.mocked(isPasswordCorrect).mockResolvedValue(true);
    vi.mocked(signUserToken).mockReturnValue('test');

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(200);
  });

  test('Successful login returns 401', async () => {
    vi.mocked(isPasswordCorrect).mockResolvedValue(false);

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(401);
  });
});
