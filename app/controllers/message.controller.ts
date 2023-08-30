import { Request, Response } from 'express';
import Message from '../models/message.ts';
import checkParams from '../utils/checkParams.ts';
// import Cache from '../service/cache.ts';

export default {
  getHistoric: async (req: Request, res: Response) => {
    const { id } = req.params;
    const event_id = checkParams(id);

    const historic = await Message.findMany(event_id);

    // await Cache.set(`chat${event_id}`, historic);

    res.status(200).json({ message: 'Historic retrieved successfully', data: historic });
  },
  create: async (req: Request, res: Response) => {
    const { event_id: event, user_id: user, message } = req.body;

    // await Cache.del([`chat${event_id}`]);

    await Message.create({ event, user, message });

    res.status(201).json({ message: 'Message created successfully' });
  },
  update: async (req: Request, res: Response) => {
    const {
      id,
      // eventId,
      message,
    } = req.body;

    // await Cache.del([`chat${eventId}`]);

    await Message.update(id, message);

    res.status(204).json({ message: 'Message updated successfully' });
  },
  destroyOne: async (req: Request, res: Response) => {
    const id = checkParams(req.params.id);

    const message = await Message.findOne(id);

    if (!message) return;

    // await Cache.del([`chat${message.event_id}`]);

    await Message.destroyOne(id);

    res.status(204).json({ message: 'Message deleted successfully' });
  },
  destroyMany: async (req: Request, res: Response) => {
    const event_id = checkParams(req.params.id);

    // await Cache.del([`chat${event_id}`]);

    await Message.destroyMany(event_id);

    res.status(204).json({ message: 'Historic deleted successfully' });
  },
};
