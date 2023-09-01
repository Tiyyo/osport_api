import { Request, Response } from 'express';
import UserModel from '../models/user.js';
import Image from '../models/image.js';
import UserOnSport from '../models/user_on_sport.js';
// import type { AllowedUserUpdate } from '../@types/index.d.ts';
import { deleteImageFromServer, saveImageOnServer } from '../service/image.js';
import checkParams from '../utils/checkParams.js';
import logger from '../helpers/logger.js';

// // To block user who want to modify his own id, createdAt, updatedAt, or image_id
// // const isAllowedUserUpdate = (data: any): data is AllowedUserUpdate => (
// //   (data.username !== undefined && typeof data.username === 'string')
// //   || (data.email !== undefined && typeof data.email === 'string')
// //   || (data.password !== undefined && typeof data.password === 'string')
// // );

export default {

  getUser: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    const id = checkParams(req.params.id);

    const user = await UserModel.getUserInfos(id);

    return res.status(200).json({ message: 'User informations', data: user });
  },
  updateImage: async (req: Request, res: Response) => {
    const { id } = req.body; //  form-data so id is a string
    if (!req.file) return res.status(200).json({ error: 'No image provided' });
    const error: any = {

    };

    const image = req.file.buffer;

    const { relativePath, name } = await saveImageOnServer({
      buffer: image,
      height: 100,
      width: 100,
    });

    const imageStored = await Image.create({ title: name, url: relativePath });

    const user = await UserModel.getUserInfos(Number(id));

    if (user.image_url) {
      // const imageToDelete = await Image.findOne(user.image_url as string);
      try {
        await deleteImageFromServer(user.image_url as string);
      } catch (err: any) {
        logger.error(err);
        error.image = 'Error while deleting image from server';
      }
    }

    const isUpdated = await UserModel.updateUser(Number(id), { imageUrl: imageStored.url });

    return res.status(200).json({ message: 'User has been updated', data: isUpdated, error });
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    await UserModel.deleteUser(id);

    return res.status(200).json({ message: 'User has been deleted' });
  },

  updateUser: async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    console.log('Controller is called');

    const user = await UserModel.updateUser(id, data);

    return res.status(200).json({ message: 'User has been updated', data: user });
  },
  getSports: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    // Will be replaced with later Zod validation
    if (typeof id !== 'number') {
      return res.status(400).json({ message: 'Invalid data provided' });
    }

    const sports = await UserOnSport.getRatings(id);

    return res.status(200).json({ message: 'Sport(s) that the user master', data: sports });
  },

};
