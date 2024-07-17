import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { UserInput } from '../types';

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

    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      response.status(401).json({
        error: 'invalid username or password'
      });
      return;
    }

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET || ''); // todo add check for process.env

    response.status(200).send({ token, username: user.username });
  })();
});
