import { mockApp } from '../tests/mockApp';

jest.mock('../models/user');
import { User } from '../models/user';

jest.mock('../features/isPasswordCorrect');
import { isPasswordCorrect } from '../features/isPasswordCorrect';

jest.mock('../features/signUserToken');
import { signUserToken } from '../features/signUserToken';

const app = mockApp();

jest
  .spyOn(User, 'findOne')
  .mockResolvedValue({ _id: '123', username: 'user', passwordHash: 'test' });

jest.mocked(signUserToken).mockReturnValue('test');

describe('Login', () => {
  test('Successful login returns 200', async () => {
    jest.mocked(isPasswordCorrect).mockResolvedValue(true);
    jest.mocked(signUserToken).mockReturnValue('test');

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(200);
  });

  test('Successful login returns 401', async () => {
    jest.mocked(isPasswordCorrect).mockResolvedValue(false);

    await app
      .post('/user/login')
      .send({ username: 'test', password: 'test' })
      .expect(401);
  });
});
