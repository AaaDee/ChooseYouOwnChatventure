import { describe, test, vi } from 'vitest';
import { mockApp } from '../tests/mockApp';

vi.mock('../models/user');
import { User } from '../models/user';

vi.mock('../features/isPasswordCorrect');
import { isPasswordCorrect } from '../features/isPasswordCorrect';

vi.mock('../features/signUserToken');
import { signUserToken } from '../features/signUserToken';
import { suppressErrorLogsFromTest } from '../tests/utils';

const app = mockApp();

const mockUser = {
  _id: '123',
  username: 'user',
  passwordHash: 'test'
};

vi.spyOn(User, 'findOne').mockResolvedValue({
  ...mockUser,
  toObject: () => mockUser
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

  test('Incorrect password returns 401', async () => {
    vi.mocked(isPasswordCorrect).mockResolvedValue(false);

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(401);
  });

  test('MongoDB errors are caught with 500', async () => {
    vi.spyOn(User, 'findOne').mockImplementation(() => {
      throw new Error('error');
    });

    // suppress errors from console as these are expected here
    suppressErrorLogsFromTest();

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(500);
  });

  test('No user found causes rejection', async () => {
    vi.spyOn(User, 'findOne').mockResolvedValue(null);

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(401);
  });
});
