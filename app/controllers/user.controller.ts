import { Request, Response } from 'express';
import UserModel from '../models/user.ts';
import UserOnSport from '../models/user_on_sport.ts';
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
    const user = await UserModel.getUserInfos(Number(id));
    return res.status(200).json({ message: 'User informations : ', data: user });
  },

  updateImage: async (req: Request, res: Response) => {
    const { id, imageUrl } = req.body;
    const user = await UserModel.patchImage(id, imageUrl);
    return res.status(200).json({ message: 'The user has been updated', data: user });
  },

  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    const deletedUser = await UserModel.deleteUser(id);
    return res.status(200).json({ message: `${deletedUser} has been deleted` });
  },

  updateUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    const { data }: { data: AllowedUserUpdate } = req.body;

    // Will be replaced with later Zod validation
    if (!isAllowedUserUpdate(data)) {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const user = await UserModel.updateUser(id, data);
    return res.status(200).json({ message: 'The user has been updated', data: user });
  },

  getSports: async (req: Request, res: Response) => {
    const { id } = req.body;

    // Will be replaced with later Zod validation
    if (typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const sports = await UserOnSport.getSports(id);
    return res.status(200).json({ message: 'Sport(s) that the user master', data: sports });
  },

};
