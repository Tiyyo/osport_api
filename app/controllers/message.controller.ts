import { Request, Response } from 'express';
import Message from '../models/message.ts';
import checkParams from '../utils/checkParams.ts';

export default {
  getHistoric: async (req: Request, res: Response) => {
    const { id } = req.params;
    const event_id = checkParams(id);

    const historic = await Message.findMany(event_id);

    res.status(200).json({ message: 'Historic retrieved successfully', data: historic });
  },
  create: async (req: Request, res: Response) => {
    const { event_id, user_id, message } = req.body;

    console.log(event_id, user_id, message);

    // just for testing
    const event_id_testing = checkParams(event_id);
    const user_id_testing = checkParams(user_id);

    // when model is ready, we will
    // check if user is in the list of participants

    await Message.create({ event_id: event_id_testing, user_id: user_id_testing, message });

    res.status(201).json({ message: 'Message created successfully' });
  },
  update: async (req: Request, res: Response) => {
    const { id, message } = req.body;

    // just for testing
    const checkedId = checkParams(id);

    await Message.update(checkedId, message);

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
