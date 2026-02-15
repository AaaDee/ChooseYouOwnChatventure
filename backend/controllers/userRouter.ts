import express from 'express';
import 'express-async-errors';
import { isPasswordCorrect } from '../features/isPasswordCorrect';
import { signUserToken } from '../features/signUserToken';
import { User, UserMongooseSchema, UserSchema } from '../models/user';
import { UserInput } from '../types';
import { asyncHandler } from './asyncHandler';

export const userRouter = express.Router();

userRouter.post('/create', (_, response) => {
  // Due to access to the paid OpenAPI keys in the backend, user creation is currently disabled.
  return response.status(501).json({
    error: 'Not Implemented',
    message: 'User registration is currently under development.'
  });

  // Previously implemented user creation code is temporarily removed, but can be found from
  // the commit history (e.g. commit eb59b70b68979cf9bd6d762c412f2d0cd9798051)
});

userRouter.post(
  '/login',
  asyncHandler(async (request, response) => {
    const { username, password } = UserInput.parse(request.body);

    let user = null;
    try {
      const userEntry = (await User.findOne({
        username
      })) as UserMongooseSchema;
      if (userEntry) {
        user = userEntry?.toObject() as UserSchema | undefined;
      }
    } catch (error) {
      console.error('MongoDB error', error);
      response.status(500).json({
        error: 'unable to access database'
      });
      return;
    }

    const passwordCorrect = user
      ? await isPasswordCorrect(user, password)
      : false;

    if (!passwordCorrect) {
      response.status(401).json({
        error: 'invalid username or password'
      });
      return;
    }

    const verified_user = user as UserSchema; // user != undefined checked earlier
    const token = signUserToken(verified_user);

    response.status(200).send({ token, username: verified_user.username });
  })
);
