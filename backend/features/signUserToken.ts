import jsonwebtoken from 'jsonwebtoken';
import { UserSchema } from '../models/user';

export function signUserToken(user: UserSchema) {
  if (!process.env.SECRET) {
    throw new Error('Secret missing from env');
  }

  const token = jsonwebtoken.sign(
    { _id: user._id, username: user.username },
    process.env.SECRET
  );
  return token;
}
