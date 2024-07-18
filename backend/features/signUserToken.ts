import jsonwebtoken from 'jsonwebtoken';
import { User } from '../types';

export function signUserToken(user: User) {
  if (!process.env.SECRET) {
    throw new Error('Secret missing from env');
  }

  const token = jsonwebtoken.sign(user, process.env.SECRET);
  return token;
}
