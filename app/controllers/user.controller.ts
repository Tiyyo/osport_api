import { Request, Response } from 'express';
import UserModel from '../models/user.ts';

export default {

  getUser: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    const { emailOrUsername } = req.body;

    try {
      const user = await UserModel.findOne(emailOrUsername);
      return res.json(user);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erreur interne 500',
          error: error.message,
        });
      }
    }

    return res.status(201).json({ message: 'You get the user you asked' });
  },

  updateImage: async (req: Request, res: Response) => {
    const { id, imageUrl } = req.body;

    try {
      const user = await UserModel.patchImage(id, imageUrl);
      return res.json(user);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erreur interne 500',
          error: error.message,
        });
      }
    }

    return res.status(201).json({ message: 'You get the user you asked' });
  },

};
