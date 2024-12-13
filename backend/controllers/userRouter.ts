import express from 'express';
import { User, UserMongooseSchema, UserSchema } from '../models/user';
import { UserInput } from '../types';
import { isPasswordCorrect } from '../features/isPasswordCorrect';
import { signUserToken } from '../features/signUserToken';

export const userRouter = express.Router();

// app.post('/user', (request, response) => {
//   void (async function (): Promise<void> {
//     const { username, password } = UserInput.parse(request.body);
//     const saltRounds = 10;

//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const user = new User({
//       username,
//       passwordHash
//     });

//     const savedUser = await user.save();

//     response.status(201).json(savedUser);
//   })();
// });

userRouter.post('/login', (request, response) => {
  void (async function (): Promise<void> {
    const { username, password } = UserInput.parse(request.body);
    console.log('logging in with', username);

    let user = null;
    try {
      const userEntry = (await User.findOne({
        username
      })) as UserMongooseSchema;
      if (userEntry) {
        user = userEntry?.toObject() as UserSchema | undefined;
      }
    } catch (error) {
      console.log('MongoDB error', error);
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

    console.log('sending token for', username);
    response.status(200).send({ token, username: verified_user.username });
  })();
});
