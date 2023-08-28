import { Request, Response } from 'express';
import UserModel from '../models/user.ts';
import UserOnSport from '../models/user_on_sport.ts';
import checkParams from '../utils/checkParams.ts';
import { saveImageOnServer, deleteImageFromServer } from '../service/image.ts';
import Image from '../models/image.ts';

export default {

  getUser: async (req: Request, res: Response) => {
    // data should be validated before reaching this point
    // factory controller will handle the error throwing in database or createUser function
    const id = checkParams(req.params.id);
    const user = await UserModel.getUserInfos(id);
    return res.status(200).json({ message: 'User informations : ', data: user });
  },

  updateImage: async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!req.file) return res.status(200).json({ error: 'No image provided' });

    const image = req.file.buffer;

    const { relativePath, name } = await saveImageOnServer({
      buffer: image,
      height: 100,
      width: 100,
    });

    const imageStored = await Image.create({ title: name, url: relativePath });

    const user = await UserModel.getUserInfos(id);

    if (user.image_url) {
      const imageToDelete = await Image.findOne(user.image_url as string);
      await deleteImageFromServer(user.image_url as string);
    }
    const isUpdated = await UserModel.updateUser(id, { imageUrl: imageStored.url });

    return res.status(200).json({ message: 'User has been updated', data: isUpdated });
  },

  deleteUser: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    await UserModel.deleteUser(id);

    return res.status(200).json({ message: 'User has been deleted' });
  },

  updateUser: async (req: Request, res: Response) => {
    const { id, ...data } = req.body;

    const user = await UserModel.updateUser(id, data);

    return res.status(200).json({ message: 'User has been updated', data: user });
  },

  getSports: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const sports = await UserOnSport.getRatings(id);

    return res.status(200).json({ message: 'Sport(s) that the user master', data: sports });
  },
};
