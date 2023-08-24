import { Request, Response } from 'express';
import Message from '../models/message.ts';
import checkParams from '../utils/checkParams.ts';

export default {
  getHistoric: async (req: Request, res: Response) => {
    const { id } = req.params;
    const event_id = checkParams(id);

    const historic = await Message.findMany(event_id);

    res.status(200).json({ data: historic, message: 'Historic retrieved successfully' });
  },
  create: async (req: Request, res: Response) => {
    const { event_id, user_id, message } = req.body;

    await Message.create({ event_id, user_id, message });

    res.status(201).json({ message: 'Message created successfully' });
  },
  update: async (req: Request, res: Response) => {
    const { id, message } = req.body;

    await Message.update(id, message);

    res.status(204).json({ message: 'Message updated successfully' });
  },
  destroyOne: async (req: Request, res: Response) => {
    const { id } = req.params;
    const checkedId = checkParams(id);

    await Message.destroyOne(checkedId);

    res.status(204).json({ message: 'Message deleted successfully' });
  },
  destroyMany: async (req: Request, res: Response) => {
    const { id } = req.params;
    const event_id = checkParams(id);

    await Message.destroyMany(event_id);

    res.status(204).json({ message: 'Historic deleted successfully' });
  },

};
