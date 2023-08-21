import { Request, Response } from 'express';
import { createUser, login } from '../service/auth/auth.ts';

export default {
  register: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    // so no need to extra validation here
    const data = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    await createUser(data);

    res.status(201).json({ message: 'User created successfully' });
  },
  signin: async (req: Request, res: Response) => {
    // data should be validated before reaching this point

    const data = {
      emailOrUsername: req.body.emailOrUsername,
      password: req.body.password,
    };

    const { accessToken } = await login(data);

    // maybe find a random string to use as a key
    res.cookie('accessToken', accessToken, {
      httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 + 1000,
    });

    res.status(200).json({ message: 'User logged in successfully' });
  },
  validate: async (req: Request, res: Response) => {
    // if request got here it means the token is valid
    // so we can send the user data
    const { decoded } = req.body;

    res.status(200).json({ message: 'User is logged in', userInfos: decoded[0] });
  },
  logout: async (_req: Request, res: Response) => {
    // do something to invalidate the token

    res.clearCookie('accessToken');

    res.status(200).json({ message: 'User logged out successfully' });
  },
};
