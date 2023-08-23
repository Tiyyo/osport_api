import { Request, Response } from 'express';
import UserModel from '../models/user.ts';

export default {

  getUser: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    const { id } = req.body;

    try {
      const user = await UserModel.getUserInfos(id);
      return res.json(user);
    } catch (error) {
      console.error(error);
      res.status(400);
    }

    return res.status(201).json({ message: 'You get the user you asked' });
  },

  updateImage: async (req: Request, res: Response) => {
    const { id, imageUrl } = req.body;

    try {
      const user = await UserModel.patchImage(id, imageUrl);
      return res.status(200).json({ message: 'The user has been updated', user });
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  },

};
