import bcrypt from 'bcrypt';
import { UserSchema } from '../models/user';

export async function isPasswordCorrect(
  user: UserSchema,
  password: string
): Promise<boolean> {
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  return passwordCorrect;
}
