import { Request, Response } from 'express';
import UserModel from '../models/user.ts';
import type { AllowedUserUpdate } from '../@types/index.d.ts';

// To block user who want to modify his own id, createdAt, updatedAt, or image_id
const isAllowedUserUpdate = (data: any): data is AllowedUserUpdate => (
  (data.username !== undefined && typeof data.username === 'string')
  || (data.email !== undefined && typeof data.email === 'string')
  || (data.password !== undefined && typeof data.password === 'string')
);

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
      return res.status(400).json({ message: 'An error occured while updating the user image' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const deletedUser = await UserModel.deleteUser(id);
      return res.status(200).json({ message: `${deletedUser} has been deleted` });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'An error occured while deleting the user' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    const { data }: { data: AllowedUserUpdate } = req.body;

    if (!isAllowedUserUpdate(data)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
      const user = await UserModel.updateUser(id, data);
      return res.status(200).json({ message: 'The user has been updated', user });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: 'An error occured while updating the user' });
    }
  },

  getSports: async (req: Request, res: Response) => {
    const { id } = req.body;

    if (typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    try {
      const sports = await UserModel.getSports(id);
      return res.status(200).json({ message: 'Sport(s) that the user master', sports });
    } catch (error) {
      console.error(error);
      return res.status(400);
    }
  },

};
